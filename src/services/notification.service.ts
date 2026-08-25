import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type NotificationType = 'system' | 'security' | 'mention' | 'update'

export interface NotificationItem {
  id: string
  title: string
  description: string
  type: NotificationType
  category: string
  createdAt: string
  unread: boolean
  actionUrl?: string
  actionLabel?: string
  actorName?: string
  actorAvatar?: string
}

// In-memory mock notifications for development
const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Security Alert: New Sign-in from Chrome on Windows',
    description: 'We detected a new login from IP 198.51.100.12 (Frankfurt, DE). If this wasn\'t you, please change your password immediately.',
    type: 'security',
    category: 'Security',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    unread: true,
    actionUrl: '/settings',
    actionLabel: 'Review Security',
  },
  {
    id: 'notif-2',
    title: 'Sarah Connor mentioned you in #core-architecture',
    description: '@admin Could you please review the new OAuth token refresh middleware when you have a moment?',
    type: 'mention',
    category: 'Mentions',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    unread: true,
    actorName: 'Sarah Connor',
    actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    actionUrl: '/users',
    actionLabel: 'View Mention',
  },
  {
    id: 'notif-3',
    title: 'Production Database Backup Completed',
    description: 'Daily automated snapshot `snap_prod_2026_08_25` succeeded (Compressed size: 1.42 GB). All integrity checks passed.',
    type: 'system',
    category: 'System',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    unread: true,
    actionUrl: '/dashboard',
    actionLabel: 'View Metrics',
  },
  {
    id: 'notif-4',
    title: 'Alex Rivera requested role upgrade to Administrator',
    description: 'Staff engineer Alex Rivera submitted a permission elevation request for the staging cluster.',
    type: 'mention',
    category: 'Team',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    unread: false,
    actorName: 'Alex Rivera',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    actionUrl: '/users',
    actionLabel: 'Manage Roles',
  },
  {
    id: 'notif-5',
    title: 'Nala Design System v1.3 Released',
    description: 'New Profile & Account View, Formatter Utilities, and enhanced Data Table filtering are now active in this workspace.',
    type: 'update',
    category: 'Product Update',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    unread: false,
    actionUrl: '/profile',
    actionLabel: 'Explore v1.3',
  },
  {
    id: 'notif-6',
    title: 'API Rate Limit Warning on Key `sb_live_prod`',
    description: 'Traffic from external edge webhook exceeded 85% of standard tier throughput limit (8,500 req/min).',
    type: 'system',
    category: 'System',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    unread: false,
    actionUrl: '/settings',
    actionLabel: 'Inspect API Keys',
  },
]

export const notificationService = {
  /**
   * Fetch list of notifications
   */
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<NotificationItem[]> | NotificationItem[]>('/notifications', { skipToast: true })
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        return [...mockNotifications]
      }
      throw error
    }
  },

  /**
   * Mark single notification as read
   */
  async markAsRead(id: string): Promise<void> {
    try {
      await apiClient.patch(`/notifications/${id}/read`, undefined, { skipToast: true })
    } catch (error) {
      if (import.meta.env.DEV) {
        const item = mockNotifications.find((n) => n.id === id)
        if (item) item.unread = false
        return
      }
      throw error
    }
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    try {
      await apiClient.post('/notifications/mark-all-read', undefined, { skipToast: true })
    } catch (error) {
      if (import.meta.env.DEV) {
        mockNotifications.forEach((n) => {
          n.unread = false
        })
        return
      }
      throw error
    }
  },

  /**
   * Delete single notification
   */
  async deleteNotification(id: string): Promise<void> {
    try {
      await apiClient.delete(`/notifications/${id}`, { skipToast: true })
    } catch (error) {
      if (import.meta.env.DEV) {
        const idx = mockNotifications.findIndex((n) => n.id === id)
        if (idx !== -1) mockNotifications.splice(idx, 1)
        return
      }
      throw error
    }
  },

  /**
   * Clear all read notifications
   */
  async clearReadNotifications(): Promise<void> {
    try {
      await apiClient.delete('/notifications/clear-read', { skipToast: true })
    } catch (error) {
      if (import.meta.env.DEV) {
        const unreadOnly = mockNotifications.filter((n) => n.unread)
        mockNotifications.length = 0
        mockNotifications.push(...unreadOnly)
        return
      }
      throw error
    }
  },
}
