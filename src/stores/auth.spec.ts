import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

vi.mock('@/services/auth.service', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn().mockResolvedValue(undefined),
    getProfile: vi.fn(),
    refreshToken: vi.fn(),
  },
}))

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('initializes with default mock user and isAuthenticated as true', () => {
    const authStore = useAuthStore()
    expect(authStore.user).not.toBeNull()
    expect(authStore.user?.email).toBe('admin@example.com')
    expect(authStore.isAuthenticated).toBe(true)
  })

  it('clears user on logout', async () => {
    const authStore = useAuthStore()
    await authStore.logout()
    expect(authStore.user).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })

  it('updates user when setUser is called', () => {
    const authStore = useAuthStore()
    authStore.setUser({
      id: '99',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: '/img/avatar.webp',
      role: 'Staff',
      username: 'janedoe',
      timezone: 'utc-7',
      company: 'Nala Corp',
    })

    expect(authStore.user?.id).toBe('99')
    expect(authStore.user?.name).toBe('Jane Doe')
    expect(authStore.isAuthenticated).toBe(true)
  })
})
