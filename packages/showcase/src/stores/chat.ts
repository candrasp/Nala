import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  chatService,
  CURRENT_USER,
  type Conversation,
  type ChatMessage,
  type ChatParticipant,
  type ChatAttachment,
} from '@/services/chat.service'
import { toast } from '@/components/ui/sonner'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref<ChatParticipant>(CURRENT_USER)
  const conversations = ref<Conversation[]>([])
  const activeConversationId = ref<string>('conv-1')
  const messages = ref<Record<string, ChatMessage[]>>({})
  const isLoading = ref<boolean>(false)
  const isSending = ref<boolean>(false)
  const isPeerTyping = ref<boolean>(false)

  // Search filter
  const searchQuery = ref<string>('')

  // ─── Computed ──────────────────────────────────────────────────────────────
  const activeConversation = computed(() => {
    return conversations.value.find(c => c.id === activeConversationId.value) || null
  })

  const currentMessages = computed(() => {
    return messages.value[activeConversationId.value] || []
  })

  const totalUnreadCount = computed(() => {
    return conversations.value.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0)
  })

  const filteredConversations = computed(() => {
    if (!searchQuery.value.trim()) return conversations.value
    const q = searchQuery.value.toLowerCase()
    return conversations.value.filter((c) => {
      const name = c.participant.name.toLowerCase()
      const role = c.participant.role.toLowerCase()
      const lastMsg = c.lastMessage?.content.toLowerCase() || ''
      return name.includes(q) || role.includes(q) || lastMsg.includes(q)
    })
  })

  // ─── Actions ───────────────────────────────────────────────────────────────
  async function loadConversations() {
    isLoading.value = true
    try {
      conversations.value = await chatService.getConversations()
      if (conversations.value.length > 0 && !activeConversationId.value) {
        activeConversationId.value = conversations.value[0].id
      }
      if (activeConversationId.value) {
        await loadMessages(activeConversationId.value)
      }
    } catch {
      toast.error('Failed to load chat conversations.')
    } finally {
      isLoading.value = false
    }
  }

  async function selectConversation(id: string) {
    activeConversationId.value = id
    await loadMessages(id)
    await chatService.markAsRead(id)
    const conv = conversations.value.find(c => c.id === id)
    if (conv) {
      conv.unreadCount = 0
    }
  }

  async function loadMessages(conversationId: string) {
    try {
      const msgList = await chatService.getMessages(conversationId)
      messages.value[conversationId] = msgList
    } catch {
      toast.error('Failed to load message thread.')
    }
  }

  async function sendMessage(content: string, attachments?: ChatAttachment[]) {
    if (!content.trim() && (!attachments || attachments.length === 0)) return
    if (!activeConversationId.value) return

    isSending.value = true
    const convId = activeConversationId.value

    try {
      const newMsg = await chatService.sendMessage(convId, content, attachments)
      if (!messages.value[convId]) {
        messages.value[convId] = []
      }
      messages.value[convId].push(newMsg)

      // Auto mock peer reply after 2.5s to show typing indicator and live feel
      triggerSimulatedReply(convId)
    } catch {
      toast.error('Failed to send message.')
    } finally {
      isSending.value = false
    }
  }

  function triggerSimulatedReply(convId: string) {
    const conv = conversations.value.find(c => c.id === convId)
    if (!conv) return

    // Show typing after 1s
    setTimeout(() => {
      if (activeConversationId.value === convId) {
        isPeerTyping.value = true
      }
    }, 900)

    // Send reply after 2.5s
    setTimeout(() => {
      isPeerTyping.value = false
      const replies = [
        'Got it! That looks super sharp and perfectly aligned with our design system.',
        'Thanks for the update Alex, reviewing the pull request right now.',
        'Understood! I will sync these changes with the rest of the engineering team.',
        'Awesome work! Let me run the automated smoke test on staging.',
      ]
      const randomReply = replies[Math.floor(Math.random() * replies.length)]

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        conversationId: convId,
        senderId: conv.participant.id,
        content: randomReply,
        timestamp: new Date().toISOString(),
        status: 'delivered',
      }

      if (!messages.value[convId]) {
        messages.value[convId] = []
      }
      messages.value[convId].push(replyMsg)

      // Update conversation last message
      conv.lastMessage = {
        content: randomReply,
        timestamp: replyMsg.timestamp,
        senderId: conv.participant.id,
        unread: false,
      }
    }, 2800)
  }

  return {
    currentUser,
    conversations,
    activeConversationId,
    messages,
    isLoading,
    isSending,
    isPeerTyping,
    searchQuery,
    activeConversation,
    currentMessages,
    totalUnreadCount,
    filteredConversations,
    loadConversations,
    selectConversation,
    loadMessages,
    sendMessage,
  }
})
