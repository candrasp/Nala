import { apiClient } from '@/lib/axios'
import type { ApiResponse, PaginatedResponse } from './types'

export interface UserItem {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Developer' | 'Editor' | 'Viewer'
  status: 'Active' | 'Pending' | 'Suspended'
  twoFactor: boolean
  avatar: string
  initials: string
  lastActive: string
  createdAt: string
}

export interface UserQueryParams {
  search?: string
  role?: string
  status?: string
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CreateUserPayload {
  name: string
  email: string
  role: 'Admin' | 'Developer' | 'Editor' | 'Viewer'
  status?: 'Active' | 'Pending' | 'Suspended'
  twoFactor?: boolean
  avatar?: string
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

// ─── Default Seed Users for Fallback ──────────────────────────────────────────
const INITIAL_USERS: UserItem[] = [
  {
    id: 'usr-1',
    name: 'Olivia Martin',
    email: 'olivia.martin@supabase.io',
    role: 'Admin',
    status: 'Active',
    twoFactor: true,
    avatar: '',
    initials: 'OM',
    lastActive: 'Just now',
    createdAt: 'Jan 12, 2026',
  },
  {
    id: 'usr-2',
    name: 'Jackson Lee',
    email: 'jackson.lee@supabase.io',
    role: 'Developer',
    status: 'Active',
    twoFactor: true,
    avatar: '',
    initials: 'JL',
    lastActive: '5 mins ago',
    createdAt: 'Feb 03, 2026',
  },
  {
    id: 'usr-3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@supabase.io',
    role: 'Editor',
    status: 'Pending',
    twoFactor: false,
    avatar: '',
    initials: 'IN',
    lastActive: '2 hours ago',
    createdAt: 'Feb 18, 2026',
  },
  {
    id: 'usr-4',
    name: 'William Chen',
    email: 'william.chen@supabase.io',
    role: 'Viewer',
    status: 'Suspended',
    twoFactor: false,
    avatar: '',
    initials: 'WC',
    lastActive: '3 days ago',
    createdAt: 'Dec 05, 2025',
  },
  {
    id: 'usr-5',
    name: 'Sofia Davis',
    email: 'sofia.davis@supabase.io',
    role: 'Developer',
    status: 'Active',
    twoFactor: true,
    avatar: '',
    initials: 'SD',
    lastActive: '1 day ago',
    createdAt: 'Jan 28, 2026',
  },
  {
    id: 'usr-6',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@imf-ops.com',
    role: 'Admin',
    status: 'Active',
    twoFactor: true,
    avatar: '',
    initials: 'EH',
    lastActive: '10 mins ago',
    createdAt: 'Feb 10, 2026',
  },
  {
    id: 'usr-7',
    name: 'Maya Lin',
    email: 'maya.lin@studio.design',
    role: 'Editor',
    status: 'Active',
    twoFactor: false,
    avatar: '',
    initials: 'ML',
    lastActive: '4 hours ago',
    createdAt: 'Jan 15, 2026',
  },
]

const LOCAL_STORAGE_USERS_KEY = 'nala_users_db'

function getLocalUsers(): UserItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Ignore JSON parse errors
  }
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS))
  return INITIAL_USERS
}

function saveLocalUsers(users: UserItem[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * User Management API Service
 * Handles HTTP requests to `/users` with automatic local store fallback.
 */
export const userService = {
  /**
   * Fetch all users or paginated list
   */
  async getUsers(params?: UserQueryParams): Promise<UserItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<UserItem[]> | PaginatedResponse<UserItem> | UserItem[]>(
        '/users',
        { params, skipToast: true },
      )

      if (Array.isArray(res)) return res
      if ('data' in res && Array.isArray(res.data)) return res.data
      return getLocalUsers()
    } catch {
      // Offline fallback: filter local users based on query
      let users = getLocalUsers()
      if (params?.search) {
        const q = params.search.toLowerCase()
        users = users.filter(
          (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
        )
      }
      if (params?.role && params.role !== 'all') {
        users = users.filter((u) => u.role === params.role)
      }
      if (params?.status && params.status !== 'all') {
        users = users.filter((u) => u.status === params.status)
      }
      return users
    }
  },

  /**
   * Get single user by ID
   */
  async getUserById(id: string): Promise<UserItem> {
    try {
      const res = await apiClient.get<ApiResponse<UserItem> | UserItem>(`/users/${id}`, {
        skipToast: true,
      })
      return 'data' in res && res.data ? res.data : (res as UserItem)
    } catch {
      const user = getLocalUsers().find((u) => u.id === id)
      if (!user) throw new Error('User not found')
      return user
    }
  },

  /**
   * Create a new user
   */
  async createUser(payload: CreateUserPayload): Promise<UserItem> {
    const initials = payload.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    try {
      const res = await apiClient.post<ApiResponse<UserItem> | UserItem>('/users', payload)
      const created = 'data' in res && res.data ? res.data : (res as UserItem)
      return created
    } catch {
      // Local fallback
      const newUser: UserItem = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        status: payload.status ?? 'Active',
        twoFactor: payload.twoFactor ?? false,
        avatar: payload.avatar ?? '',
        initials,
        lastActive: 'Just now',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      }

      const users = getLocalUsers()
      users.unshift(newUser)
      saveLocalUsers(users)
      return newUser
    }
  },

  /**
   * Update existing user
   */
  async updateUser(id: string, payload: UpdateUserPayload): Promise<UserItem> {
    try {
      const res = await apiClient.put<ApiResponse<UserItem> | UserItem>(`/users/${id}`, payload)
      return 'data' in res && res.data ? res.data : (res as UserItem)
    } catch {
      const users = getLocalUsers()
      const index = users.findIndex((u) => u.id === id)
      if (index === -1) throw new Error('User not found')

      const updated: UserItem = {
        ...users[index],
        ...payload,
        initials: payload.name
          ? payload.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : users[index].initials,
      }

      users[index] = updated
      saveLocalUsers(users)
      return updated
    }
  },

  /**
   * Delete user by ID
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${id}`)
    } catch {
      const users = getLocalUsers().filter((u) => u.id !== id)
      saveLocalUsers(users)
    }
  },
}
