import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  authService,
  type LoginCredentials,
  type UserProfile,
  type UpdateProfilePayload,
} from '@/services/auth.service'
import { tokenStorage } from '@/lib/axios'

export interface User extends UserProfile {}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>({
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/img/avatar.webp',
    role: 'Administrator',
    username: 'admin',
    timezone: 'utc-7',
    company: 'Nala Corp',
    jobTitle: 'Lead Software Architect',
    location: 'San Francisco, CA',
    phone: '+1 (555) 234-5678',
    bio: 'Lead engineer and design systems advocate building modern enterprise interfaces.',
    github: 'candrasp',
    twitter: 'candrasp',
    linkedin: 'candrasp',
    website: 'https://nala.dev',
    createdAt: '2025-01-15T00:00:00.000Z',
  })

  const isLoading = ref<boolean>(false)
  const isAuthenticated = computed<boolean>(() => !!user.value || !!tokenStorage.getAccessToken())

  /**
   * Set user data directly
   */
  function setUser(userData: User | null) {
    user.value = userData
  }

  /**
   * Login with email and password via auth service
   */
  async function login(credentials: LoginCredentials): Promise<User> {
    isLoading.value = true
    try {
      const res = await authService.login(credentials)
      user.value = res.user
      return res.user
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update current user profile
   */
  async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
    isLoading.value = true
    try {
      const updated = await authService.updateProfile(payload)
      user.value = {
        ...(user.value || {}),
        ...updated,
      } as User
      return user.value
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete user account with safeguard verification
   */
  async function deleteAccount(password: string): Promise<boolean> {
    isLoading.value = true
    try {
      await authService.deleteAccount(password)
      user.value = null
      return true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Logout user and clear tokens
   */
  async function logout() {
    isLoading.value = true
    try {
      await authService.logout()
    } finally {
      user.value = null
      isLoading.value = false
    }
  }

  /**
   * Refresh/Fetch user profile from server
   */
  async function fetchProfile(): Promise<User | null> {
    if (!tokenStorage.getAccessToken()) return null
    isLoading.value = true
    try {
      const profile = await authService.getProfile()
      user.value = profile
      return profile
    } catch {
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    login,
    logout,
    fetchProfile,
    updateProfile,
    deleteAccount,
  }
})
