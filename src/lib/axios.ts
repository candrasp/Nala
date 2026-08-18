/**
 * Enterprise Axios Client & Interceptor Layer
 * -------------------------------------------
 * Features:
 * - Base URL & timeout configuration
 * - Automatic Bearer token injection
 * - Silent Token Refresh queue with 401 auto-retry
 * - Global Error Toasts via vue-sonner (toggleable with `skipToast`)
 * - Global Route / API Loading Bar integration
 * - TypeScript Generics support for typed responses
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { toast } from '@/components/ui/sonner'
import { loadingBar } from '@/lib/loading-bar'

// ─── Custom Request Config Type ───────────────────────────────────────────────
export interface CustomRequestConfig extends AxiosRequestConfig {
  /** Skip auto toast notification on error */
  skipToast?: boolean
  /** Skip Bearer authorization header injection */
  skipAuth?: boolean
  /** Skip global loading bar progress */
  skipLoading?: boolean
  /** Internal retry flag for 401 token refresh */
  _retry?: boolean
}

interface CustomInternalRequestConfig extends InternalAxiosRequestConfig {
  skipToast?: boolean
  skipAuth?: boolean
  skipLoading?: boolean
  _retry?: boolean
}

// ─── Storage Keys & Helpers ───────────────────────────────────────────────────
export const TOKEN_KEY = 'auth_token'
export const REFRESH_TOKEN_KEY = 'auth_refresh_token'

export const tokenStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  setAccessToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },
  clearTokens() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

// ─── Create Instance ──────────────────────────────────────────────────────────
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Token Refresh Queue Manager ──────────────────────────────────────────────
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config: CustomInternalRequestConfig) => {
    // 1. Trigger global loading bar
    if (!config.skipLoading) {
      loadingBar.start()
    }

    // 2. Attach Authorization token
    if (!config.skipAuth) {
      const token = tokenStorage.getAccessToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error: AxiosError) => {
    loadingBar.fail()
    return Promise.reject(error)
  },
)

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config as CustomInternalRequestConfig
    if (!config.skipLoading) {
      loadingBar.finish()
    }
    return response
  },
  async (error: AxiosError<{ message?: string; error?: string }>) => {
    const originalRequest = error.config as CustomInternalRequestConfig | undefined
    const status = error.response?.status

    if (!originalRequest?.skipLoading) {
      loadingBar.fail()
    }

    // ─── 1. Handle 401 Unauthorized & Silent Token Refresh ─────────────────
    if (status === 401 && originalRequest && !originalRequest._retry) {
      const refreshToken = tokenStorage.getRefreshToken()

      // If no refresh token available or request was to auth/refresh itself
      if (!refreshToken || originalRequest.url?.includes('/auth/refresh')) {
        tokenStorage.clearTokens()
        if (!originalRequest.skipToast) {
          toast.error('Session expired. Please log in again.')
        }
        if (window.location.pathname !== '/auth/login') {
          window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
        }
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // Queue this request while refresh is in flight
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Execute token refresh call
        const response = await axios.post<{
          accessToken: string
          refreshToken?: string
        }>(
          `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data
        tokenStorage.setAccessToken(accessToken)
        if (newRefreshToken) {
          tokenStorage.setRefreshToken(newRefreshToken)
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }

        processQueue(null, accessToken)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        tokenStorage.clearTokens()
        toast.error('Session has ended. Please sign in again.')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // ─── 2. Handle 403 Forbidden ──────────────────────────────────────────
    if (status === 403) {
      if (!originalRequest?.skipToast) {
        toast.error('Access denied. You do not have permission for this action.')
      }
    }

    // ─── 3. Handle 500+ Server Errors & Network Errors ────────────────────
    if (!originalRequest?.skipToast) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (status ? `Server error (${status}). Please try again later.` : 'Network connection failed. Please check your internet.')

      if (status !== 401 && status !== 403) {
        toast.error(serverMessage)
      }
    }

    return Promise.reject(error)
  },
)

// ─── Typed API Client Helper Wrapper ──────────────────────────────────────────
export const apiClient = {
  get<T = unknown>(url: string, config?: CustomRequestConfig): Promise<T> {
    return api.get<T, AxiosResponse<T>>(url, config).then((res) => res.data)
  },
  post<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig): Promise<T> {
    return api.post<T, AxiosResponse<T>>(url, data, config).then((res) => res.data)
  },
  put<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig): Promise<T> {
    return api.put<T, AxiosResponse<T>>(url, data, config).then((res) => res.data)
  },
  patch<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig): Promise<T> {
    return api.patch<T, AxiosResponse<T>>(url, data, config).then((res) => res.data)
  },
  delete<T = unknown>(url: string, config?: CustomRequestConfig): Promise<T> {
    return api.delete<T, AxiosResponse<T>>(url, config).then((res) => res.data)
  },
}

export default api
