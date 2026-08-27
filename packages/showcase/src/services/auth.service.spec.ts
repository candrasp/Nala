import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authService, type LoginCredentials } from './auth.service'
import { apiClient, tokenStorage } from '@/lib/axios'

vi.mock('@/lib/axios', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
  tokenStorage: {
    getAccessToken: vi.fn(),
    setAccessToken: vi.fn(),
    getRefreshToken: vi.fn(),
    setRefreshToken: vi.fn(),
    clearTokens: vi.fn(),
  },
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('stores tokens and returns data when login succeeds', async () => {
    const mockApiResponse = {
      user: {
        id: 'u1',
        name: 'Super Admin',
        email: 'super@nala.dev',
        avatar: '',
        role: 'Admin',
      },
      accessToken: 'real_access_token_123',
      refreshToken: 'real_refresh_token_123',
    }

    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockApiResponse })

    const credentials: LoginCredentials = {
      email: 'super@nala.dev',
      password: 'Password123!',
    }

    const result = await authService.login(credentials)

    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', credentials)
    expect(tokenStorage.setAccessToken).toHaveBeenCalledWith('real_access_token_123')
    expect(tokenStorage.setRefreshToken).toHaveBeenCalledWith('real_refresh_token_123')
    expect(result.user.email).toBe('super@nala.dev')
  })

  it('provides fallback mock auth data when backend API is offline', async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('Network Error'))

    const credentials: LoginCredentials = {
      email: 'john@example.com',
      password: 'password',
    }

    const result = await authService.login(credentials)

    expect(tokenStorage.setAccessToken).toHaveBeenCalled()
    expect(result.user.email).toBe('john@example.com')
    expect(result.user.name).toBe('john')
    expect(result.accessToken).toContain('mock_jwt_access_')
  })

  it('calls clearTokens on logout even if backend API fails', async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('500 Internal Server Error'))

    await authService.logout()

    expect(apiClient.post).toHaveBeenCalledWith('/auth/logout', {}, { skipToast: true })
    expect(tokenStorage.clearTokens).toHaveBeenCalledTimes(1)
  })

  it('fetches user profile via getProfile', async () => {
    const mockProfile = {
      id: 'usr_1',
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: '/img/avatar.webp',
      role: 'Administrator',
    }

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProfile })

    const result = await authService.getProfile()
    expect(apiClient.get).toHaveBeenCalledWith('/auth/me')
    expect(result.name).toBe('Admin User')
  })
})
