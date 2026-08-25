import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  notificationService,
  type NotificationItem,
} from '@/services/notification.service'
import { toast } from '@/components/ui/sonner'

export type NotificationFilterTab = 'all' | 'unread' | 'system' | 'mention' | 'security'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<NotificationItem[]>([])
  const isLoading = ref<boolean>(false)
  const activeTab = ref<NotificationFilterTab>('all')
  const searchQuery = ref<string>('')
  const selectedIds = ref<string[]>([])

  // ─── Computed Getters ────────────────────────────────────────────────────────
  const unreadCount = computed<number>(() => {
    return notifications.value.filter((n) => n.unread).length
  })

  const filteredNotifications = computed<NotificationItem[]>(() => {
    return notifications.value.filter((item) => {
      // 1. Tab Filter
      if (activeTab.value === 'unread' && !item.unread) return false
      if (activeTab.value === 'system' && item.type !== 'system') return false
      if (activeTab.value === 'mention' && item.type !== 'mention') return false
      if (activeTab.value === 'security' && item.type !== 'security') return false

      // 2. Search Query Filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesCategory = item.category.toLowerCase().includes(query)
        const matchesActor = item.actorName ? item.actorName.toLowerCase().includes(query) : false
        return matchesTitle || matchesDesc || matchesCategory || matchesActor
      }

      return true
    })
  })

  const isAllSelected = computed<boolean>(() => {
    if (filteredNotifications.value.length === 0) return false
    return filteredNotifications.value.every((n) => selectedIds.value.includes(n.id))
  })

  // ─── Actions ─────────────────────────────────────────────────────────────────

  /**
   * Load notifications from service
   */
  async function loadNotifications() {
    isLoading.value = true
    try {
      notifications.value = await notificationService.getNotifications()
    } catch {
      toast.error('Failed to load notifications.')
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mark a single notification as read
   */
  async function markAsRead(id: string) {
    const item = notifications.value.find((n) => n.id === id)
    if (!item || !item.unread) return

    item.unread = false
    try {
      await notificationService.markAsRead(id)
    } catch {
      // Revert if request failed
      item.unread = true
      toast.error('Failed to update notification status.')
    }
  }

  /**
   * Toggle unread status of a single notification
   */
  async function toggleRead(id: string) {
    const item = notifications.value.find((n) => n.id === id)
    if (!item) return

    const previousState = item.unread
    item.unread = !item.unread

    try {
      if (item.unread) {
        // Toggle back to unread
        toast.info('Marked as unread.')
      } else {
        await notificationService.markAsRead(id)
        toast.success('Marked as read.')
      }
    } catch {
      item.unread = previousState
      toast.error('Failed to update notification.')
    }
  }

  /**
   * Mark all notifications as read
   */
  async function markAllAsRead() {
    const previousUnreadCount = unreadCount.value
    if (previousUnreadCount === 0) return

    notifications.value.forEach((n) => {
      n.unread = false
    })

    try {
      await notificationService.markAllAsRead()
      toast.success('All notifications marked as read.')
    } catch {
      toast.error('Failed to mark all as read.')
    }
  }

  /**
   * Delete single notification
   */
  async function deleteNotification(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index === -1) return

    const [removed] = notifications.value.splice(index, 1)
    selectedIds.value = selectedIds.value.filter((selId) => selId !== id)

    try {
      await notificationService.deleteNotification(id)
      toast.success('Notification removed.')
    } catch {
      notifications.value.splice(index, 0, removed)
      toast.error('Failed to delete notification.')
    }
  }

  /**
   * Mark currently selected notifications as read
   */
  async function markSelectedAsRead() {
    if (selectedIds.value.length === 0) return

    const targetIds = [...selectedIds.value]
    targetIds.forEach((id) => {
      const item = notifications.value.find((n) => n.id === id)
      if (item) item.unread = false
    })

    try {
      await Promise.all(targetIds.map((id) => notificationService.markAsRead(id)))
      toast.success(`${targetIds.length} notification(s) marked as read.`)
      selectedIds.value = []
    } catch {
      toast.error('Failed to update selected notifications.')
    }
  }

  /**
   * Delete currently selected notifications
   */
  async function deleteSelected() {
    if (selectedIds.value.length === 0) return

    const count = selectedIds.value.length
    const idsToDelete = new Set(selectedIds.value)
    const backup = [...notifications.value]

    notifications.value = notifications.value.filter((n) => !idsToDelete.has(n.id))
    selectedIds.value = []

    try {
      await Promise.all([...idsToDelete].map((id) => notificationService.deleteNotification(id)))
      toast.success(`${count} notification(s) deleted.`)
    } catch {
      notifications.value = backup
      toast.error('Failed to delete selected notifications.')
    }
  }

  /**
   * Clear all read notifications
   */
  async function clearAllRead() {
    const readCount = notifications.value.filter((n) => !n.unread).length
    if (readCount === 0) {
      toast.info('No read notifications to clear.')
      return
    }

    const backup = [...notifications.value]
    notifications.value = notifications.value.filter((n) => n.unread)
    selectedIds.value = []

    try {
      await notificationService.clearReadNotifications()
      toast.success(`Cleared ${readCount} read notification(s).`)
    } catch {
      notifications.value = backup
      toast.error('Failed to clear read notifications.')
    }
  }

  /**
   * Selection helpers
   */
  function toggleSelect(id: string) {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter((i) => i !== id)
    } else {
      selectedIds.value.push(id)
    }
  }

  function toggleSelectAll() {
    if (isAllSelected.value) {
      selectedIds.value = []
    } else {
      selectedIds.value = filteredNotifications.value.map((n) => n.id)
    }
  }

  function clearSelection() {
    selectedIds.value = []
  }

  return {
    notifications,
    isLoading,
    activeTab,
    searchQuery,
    selectedIds,
    unreadCount,
    filteredNotifications,
    isAllSelected,
    loadNotifications,
    markAsRead,
    toggleRead,
    markAllAsRead,
    deleteNotification,
    markSelectedAsRead,
    deleteSelected,
    clearAllRead,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
  }
})
