import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type LoginCredentials, type UserProfile } from '@/services/auth.service'
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
  }
})
