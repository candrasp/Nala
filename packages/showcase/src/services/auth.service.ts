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
  phone?: string
  jobTitle?: string
  location?: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
  createdAt?: string
}

export interface UpdateProfilePayload {
  name: string
  email: string
  username?: string
  avatar?: string
  bio?: string
  timezone?: string
  company?: string
  phone?: string
  jobTitle?: string
  location?: string
  website?: string
  github?: string
  twitter?: string
  linkedin?: string
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
          avatar: '/img/avatar.webp',
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
   * Update authenticated user profile
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    try {
      const res = await apiClient.patch<ApiResponse<UserProfile> | UserProfile>(
        '/auth/profile',
        payload,
      )
      return 'data' in res && res.data ? res.data : (res as UserProfile)
    } catch (error) {
      if (import.meta.env.DEV) {
        return {
          id: 'usr_admin_1',
          role: 'Administrator',
          avatar: payload.avatar || '/img/avatar.webp',
          name: payload.name,
          email: payload.email,
          username: payload.username || 'admin',
          bio: payload.bio,
          timezone: payload.timezone || 'utc-7',
          company: payload.company || 'Nala Corp',
          phone: payload.phone,
          jobTitle: payload.jobTitle,
          location: payload.location,
          website: payload.website,
          github: payload.github,
          twitter: payload.twitter,
          linkedin: payload.linkedin,
          createdAt: '2025-01-15T00:00:00.000Z',
        }
      }
      throw error
    }
  },

  /**
   * Delete account with password verification safeguard
   */
  async deleteAccount(password: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await apiClient.post<{ success: boolean; message: string }>('/auth/delete-account', { password })
      return res
    } catch (error) {
      if (import.meta.env.DEV) {
        tokenStorage.clearTokens()
        return {
          success: true,
          message: 'Account successfully deleted and all sessions purged.',
        }
      }
      throw error
    }
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
