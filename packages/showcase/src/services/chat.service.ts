import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type UserPresenceStatus = 'online' | 'busy' | 'away' | 'offline'

export interface ChatParticipant {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  status: UserPresenceStatus
  lastSeen?: string
  isTyping?: boolean
}

export interface ChatAttachment {
  id: string
  name: string
  size: number
  type: 'image' | 'file'
  url: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  attachments?: ChatAttachment[]
  status: 'sent' | 'delivered' | 'read'
  isStarred?: boolean
}

export interface Conversation {
  id: string
  type: 'direct' | 'group'
  title?: string
  participant: ChatParticipant // Main peer or primary contact for direct
  lastMessage?: {
    content: string
    timestamp: string
    senderId: string
    unread: boolean
  }
  unreadCount: number
  isPinned?: boolean
  isMuted?: boolean
}

// ─── Current Logged-in User Profile Mock ──────────────────────────────────────
export const CURRENT_USER: ChatParticipant = {
  id: 'usr-self',
  name: 'Alex Morgan',
  email: 'alex.morgan@nala.dev',
  avatar: '/img/avatar.webp',
  role: 'Lead Architect',
  status: 'online',
}

// ─── In-memory Mock Conversations ───────────────────────────────────────────
const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    type: 'direct',
    participant: {
      id: 'usr-sarah',
      name: 'Sarah Chen',
      email: 'sarah.chen@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&auto=format&fit=crop&q=80',
      role: 'Frontend Engineer',
      status: 'online',
    },
    lastMessage: {
      content: 'I pushed the updated Unovis chart components to main 🚀',
      timestamp: '2026-09-03T15:20:00Z',
      senderId: 'usr-sarah',
      unread: true,
    },
    unreadCount: 2,
    isPinned: true,
  },
  {
    id: 'conv-2',
    type: 'direct',
    participant: {
      id: 'usr-marcus',
      name: 'Marcus Vance',
      email: 'marcus.vance@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
      role: 'Backend Lead',
      status: 'busy',
    },
    lastMessage: {
      content: 'The RBAC token rotation endpoint is now live on staging.',
      timestamp: '2026-09-03T14:45:00Z',
      senderId: 'usr-marcus',
      unread: false,
    },
    unreadCount: 0,
    isPinned: true,
  },
  {
    id: 'conv-3',
    type: 'direct',
    participant: {
      id: 'usr-elena',
      name: 'Elena Rostova',
      email: 'elena.r@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&auto=format&fit=crop&q=80',
      role: 'Product Designer',
      status: 'away',
      lastSeen: '10m ago',
    },
    lastMessage: {
      content: 'Could you review the new dark mode contrast tweaks on Figma?',
      timestamp: '2026-09-03T12:10:00Z',
      senderId: 'usr-self',
      unread: false,
    },
    unreadCount: 0,
    isPinned: false,
  },
  {
    id: 'conv-4',
    type: 'direct',
    participant: {
      id: 'usr-david',
      name: 'David Kim',
      email: 'david.kim@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=128&auto=format&fit=crop&q=80',
      role: 'DevOps Engineer',
      status: 'offline',
      lastSeen: '2h ago',
    },
    lastMessage: {
      content: 'Docker container build times are reduced by 40% with multi-stage caching.',
      timestamp: '2026-09-02T18:30:00Z',
      senderId: 'usr-david',
      unread: false,
    },
    unreadCount: 0,
    isPinned: false,
  },
]

// ─── In-memory Mock Messages ────────────────────────────────────────────────
const mockMessages: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'msg-101',
      conversationId: 'conv-1',
      senderId: 'usr-sarah',
      content: 'Hey Alex! Did you get a chance to inspect the new Tailwind v4 theme color tokens?',
      timestamp: '2026-09-03T15:10:00Z',
      status: 'read',
    },
    {
      id: 'msg-102',
      conversationId: 'conv-1',
      senderId: 'usr-self',
      content: 'Yes! OKLCH variables look extremely clean and the dark mode gradients are much sharper.',
      timestamp: '2026-09-03T15:12:00Z',
      status: 'read',
    },
    {
      id: 'msg-103',
      conversationId: 'conv-1',
      senderId: 'usr-sarah',
      content: 'Awesome. I also attached the updated chart layout screenshot for the Analytics dashboard:',
      timestamp: '2026-09-03T15:15:00Z',
      attachments: [
        {
          id: 'att-1',
          name: 'analytics-preview.webp',
          size: 420000,
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        },
      ],
      status: 'read',
    },
    {
      id: 'msg-104',
      conversationId: 'conv-1',
      senderId: 'usr-sarah',
      content: 'I pushed the updated Unovis chart components to main 🚀',
      timestamp: '2026-09-03T15:20:00Z',
      status: 'delivered',
    },
  ],
  'conv-2': [
    {
      id: 'msg-201',
      conversationId: 'conv-2',
      senderId: 'usr-self',
      content: 'Hi Marcus, how is the silent token refresh interceptor performing?',
      timestamp: '2026-09-03T14:30:00Z',
      status: 'read',
    },
    {
      id: 'msg-202',
      conversationId: 'conv-2',
      senderId: 'usr-marcus',
      content: 'The RBAC token rotation endpoint is now live on staging.',
      timestamp: '2026-09-03T14:45:00Z',
      status: 'read',
    },
  ],
  'conv-3': [
    {
      id: 'msg-301',
      conversationId: 'conv-3',
      senderId: 'usr-elena',
      content: 'Hi Alex! The design team just updated the typography scale & micro-interactions.',
      timestamp: '2026-09-03T12:00:00Z',
      status: 'read',
    },
    {
      id: 'msg-302',
      conversationId: 'conv-3',
      senderId: 'usr-self',
      content: 'Could you review the new dark mode contrast tweaks on Figma?',
      timestamp: '2026-09-03T12:10:00Z',
      status: 'read',
    },
  ],
  'conv-4': [
    {
      id: 'msg-401',
      conversationId: 'conv-4',
      senderId: 'usr-david',
      content: 'Docker container build times are reduced by 40% with multi-stage caching.',
      timestamp: '2026-09-02T18:30:00Z',
      status: 'read',
    },
  ],
}

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    // DEV short-circuit: skip network request entirely when no backend is available
    if (import.meta.env.DEV) return [...mockConversations]
    try {
      const res = await apiClient.get<ApiResponse<Conversation[]> | Conversation[]>('/chat/conversations')
      return Array.isArray(res) ? res : res.data
    } catch {
      throw new Error('Failed to load conversations')
    }
  },

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    // DEV short-circuit: skip network request entirely when no backend is available
    if (import.meta.env.DEV) return [...(mockMessages[conversationId] || [])]
    try {
      const res = await apiClient.get<ApiResponse<ChatMessage[]> | ChatMessage[]>(`/chat/conversations/${conversationId}/messages`)
      return Array.isArray(res) ? res : res.data
    } catch {
      throw new Error('Failed to load messages')
    }
  },

  async sendMessage(conversationId: string, content: string, attachments?: ChatAttachment[]): Promise<ChatMessage> {
    if (import.meta.env.DEV) {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: CURRENT_USER.id,
        content,
        timestamp: new Date().toISOString(),
        attachments,
        status: 'sent',
      }
      if (!mockMessages[conversationId]) {
        mockMessages[conversationId] = []
      }
      mockMessages[conversationId].push(newMsg)
      const conv = mockConversations.find(c => c.id === conversationId)
      if (conv) {
        conv.lastMessage = {
          content,
          timestamp: newMsg.timestamp,
          senderId: CURRENT_USER.id,
          unread: false,
        }
      }
      return newMsg
    }
    try {
      return await apiClient.post<ChatMessage>(`/chat/conversations/${conversationId}/messages`, {
        content,
        attachments,
      })
    } catch {
      throw new Error('Failed to send message')
    }
  },

  async markAsRead(conversationId: string): Promise<void> {
    if (import.meta.env.DEV) {
      const conv = mockConversations.find(c => c.id === conversationId)
      if (conv) {
        conv.unreadCount = 0
        if (conv.lastMessage) {
          conv.lastMessage.unread = false
        }
      }
      return
    }
    try {
      await apiClient.post(`/chat/conversations/${conversationId}/read`)
    } catch {
      throw new Error('Failed to mark conversation as read')
    }
  },
}
