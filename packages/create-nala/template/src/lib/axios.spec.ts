import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { api, tokenStorage } from './axios'

vi.mock('@/components/ui/sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
  },
}))

vi.mock('@/lib/loading-bar', () => ({
  loadingBar: {
    start: vi.fn(),
    finish: vi.fn(),
    fail: vi.fn(),
  },
}))

describe('Axios Client & Token Storage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('manages accessToken and refreshToken in storage', () => {
    tokenStorage.setAccessToken('access_token_abc')
    tokenStorage.setRefreshToken('refresh_token_xyz')

    expect(tokenStorage.getAccessToken()).toBe('access_token_abc')
    expect(tokenStorage.getRefreshToken()).toBe('refresh_token_xyz')

    tokenStorage.clearTokens()
    expect(tokenStorage.getAccessToken()).toBeNull()
    expect(tokenStorage.getRefreshToken()).toBeNull()
  })

  it('has base configuration with JSON content type', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
    expect(api.defaults.timeout).toBe(15000)
  })
})
