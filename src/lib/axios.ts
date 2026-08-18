/**
 * Axios Instance & Interceptors Boilerplate
 * -----------------------------------------
 * Customize this file to connect to your backend API.
 *
 * Usage:
 *   import { api } from '@/lib/axios'
 *   const { data } = await api.get('/users')
 */

import axios from 'axios'

// ─── Create Instance ──────────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Automatically attach the Bearer token from localStorage (or your auth store).
api.interceptors.request.use(
  (config) => {
    // Option A — read from localStorage directly:
    const token = localStorage.getItem('auth_token')

    // Option B — read from your Pinia auth store:
    // (Note: Pinia stores can't be used outside of Vue components
    //  without getActivePinia(). If needed, import and call getActivePinia
    //  or stick with localStorage.)
    // import { useAuthStore } from '@/stores/auth'
    // const token = useAuthStore().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Handle common error responses globally.
api.interceptors.response.use(
  // Pass through successful responses unchanged
  (response) => response,

  // Handle errors
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      // Token expired or invalid → clear session and redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/auth/login'
    }

    if (status === 403) {
      // Access denied → redirect to unauthorized page
      window.location.href = '/errors/403'
    }

    if (status === 500) {
      // Server error → optionally redirect or show a global toast
      // import { toast } from 'vue-sonner'
      // toast.error('An unexpected server error occurred. Please try again.')
    }

    return Promise.reject(error)
  },
)

export default api
