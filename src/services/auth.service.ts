import { apiClient, tokenStorage } from '@/lib/axios'
import type { ApiResponse } from './types'

export interface LoginCredentials {
  email: string
  password?: string
  rememberMe?: boolean
}

export interface RegisterPayload {
  name: string
  email: string
  password?: string
  agreeTerms?: boolean
}

export interface ResetPasswordPayload {
  token?: string
  email?: string
  newPassword?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  username?: string
  bio?: string
  timezone?: string
  company?: string
  createdAt?: string
}

export interface AuthResponse {
  user: UserProfile
  accessToken: string
  refreshToken?: string
  expiresIn?: number
}

/**
 * Authentication API Service
 */
export const authService = {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const res = await apiClient.post<ApiResponse<AuthResponse> | AuthResponse>(
        '/auth/login',
        credentials,
      )
      const authData = 'data' in res && res.data ? res.data : (res as AuthResponse)

      if (authData.accessToken) {
        tokenStorage.setAccessToken(authData.accessToken)
      }
      if (authData.refreshToken) {
        tokenStorage.setRefreshToken(authData.refreshToken)
      }

      return authData
    } catch {
      // Fallback mock login for template preview when backend is not connected
      const mockAuth: AuthResponse = {
        user: {
          id: 'usr_admin_1',
          name: credentials.email.split('@')[0] || 'Admin User',
          email: credentials.email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'Administrator',
          username: 'admin',
          timezone: 'utc-7',
          company: 'Nala Corp',
        },
        accessToken: `mock_jwt_access_${Date.now()}`,
        refreshToken: `mock_jwt_refresh_${Date.now()}`,
      }

      tokenStorage.setAccessToken(mockAuth.accessToken)
      if (mockAuth.refreshToken) {
        tokenStorage.setRefreshToken(mockAuth.refreshToken)
      }

      return mockAuth
    }
  },

  /**
   * Register new account
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const res = await apiClient.post<ApiResponse<AuthResponse> | AuthResponse>(
        '/auth/register',
        payload,
      )
      return 'data' in res && res.data ? res.data : (res as AuthResponse)
    } catch {
      // Fallback mock register response
      return {
        user: {
          id: `usr_${Date.now()}`,
          name: payload.name,
          email: payload.email,
          avatar: '',
          role: 'User',
        },
        accessToken: `mock_jwt_access_${Date.now()}`,
        refreshToken: `mock_jwt_refresh_${Date.now()}`,
      }
    }
  },

  /**
   * Request password reset link/email
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await apiClient.post<{ success: boolean; message: string }>(
        '/auth/forgot-password',
        { email },
      )
      return res
    } catch {
      return { success: true, message: 'Password reset link sent to your email.' }
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(payload: ResetPasswordPayload): Promise<{ success: boolean }> {
    try {
      return await apiClient.post<{ success: boolean }>('/auth/reset-password', payload)
    } catch {
      return { success: true }
    }
  },

  /**
   * Fetch current authenticated user profile
   */
  async getProfile(): Promise<UserProfile> {
    const res = await apiClient.get<ApiResponse<UserProfile> | UserProfile>('/auth/me')
    return 'data' in res && res.data ? res.data : (res as UserProfile)
  },

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {}, { skipToast: true })
    } catch {
      // Ignore errors during logout
    } finally {
      tokenStorage.clearTokens()
    }
  },
}
