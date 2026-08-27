import { describe, it, expect, beforeEach, vi } from 'vitest'
import { userService, type CreateUserPayload, type UpdateUserPayload } from './user.service'
import { apiClient } from '@/lib/axios'

vi.mock('@/lib/axios', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches paginated users with query params', async () => {
    const mockData = [
      {
        id: 'usr-1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'Admin' as const,
        status: 'Active' as const,
        twoFactor: true,
        avatar: '',
        initials: 'TU',
        lastActive: 'Just now',
        createdAt: 'Jan 1, 2026',
      },
    ]

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData })

    const result = await userService.getUsers({ page: 1, perPage: 10, search: 'Test' })
    expect(apiClient.get).toHaveBeenCalledWith('/users', {
      params: { page: 1, perPage: 10, search: 'Test' },
      skipToast: true,
    })
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Test User')
  })

  it('uses mock fallback when getUsers API fails', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network Error'))

    const result = await userService.getUsers({ search: 'Olivia' })
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].name).toContain('Olivia')
  })

  it('creates user with initials generated when avatar is not provided', async () => {
    const payload: CreateUserPayload = {
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      role: 'Developer',
      status: 'Active',
      twoFactor: false,
    }

    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('Dev Mode Offline'))

    const created = await userService.createUser(payload)
    expect(created.name).toBe('Sarah Connor')
    expect(created.initials).toBe('SC')
    expect(created.id).toBeDefined()
  })

  it('updates existing user attributes correctly', async () => {
    const updatePayload: UpdateUserPayload = {
      role: 'Admin',
      status: 'Suspended',
    }

    vi.mocked(apiClient.patch).mockRejectedValueOnce(new Error('Dev Mode Offline'))

    const updated = await userService.updateUser('usr-1', updatePayload)
    expect(updated.role).toBe('Admin')
    expect(updated.status).toBe('Suspended')
  })

  it('deletes user by id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: { success: true } })

    await expect(userService.deleteUser('usr-1')).resolves.not.toThrow()
    expect(apiClient.delete).toHaveBeenCalledWith('/users/usr-1')
  })
})
