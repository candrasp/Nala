<script setup lang="ts">
import { Search, Pin } from '@lucide/vue'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useChatStore } from '@/stores/chat'
import type { UserPresenceStatus } from '@/services/chat.service'

const chatStore = useChatStore()

const statusColorMap: Record<UserPresenceStatus, string> = {
  online: 'bg-emerald-500 ring-2 ring-background',
  busy: 'bg-rose-500 ring-2 ring-background',
  away: 'bg-amber-500 ring-2 ring-background',
  offline: 'bg-zinc-400 ring-2 ring-background',
}

function formatTime(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}
</script>

<template>
  <aside class="w-full lg:w-80 xl:w-88 flex flex-col border-r border-border bg-card/60 shrink-0">
    <!-- Sidebar Header & Current User Info -->
    <div class="p-3.5 border-b border-border space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="relative">
            <Avatar class="h-9 w-9 border border-border">
              <AvatarImage :src="chatStore.currentUser.avatar" :alt="chatStore.currentUser.name" />
              <AvatarFallback class="text-xs bg-primary/10 text-primary font-bold">AM</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-foreground truncate">{{ chatStore.currentUser.name }}</p>
            <p class="text-[10px] text-muted-foreground truncate">{{ chatStore.currentUser.role }}</p>
          </div>
        </div>

        <Badge v-if="chatStore.totalUnreadCount > 0" variant="secondary" shape="pill" class="text-[10px] font-mono font-medium px-2 py-0.5">
          {{ chatStore.totalUnreadCount }} unread
        </Badge>
      </div>

      <!-- Conversation Search Bar -->
      <InputGroup>
        <InputIcon side="left">
          <Search class="h-3.5 w-3.5 text-muted-foreground" />
        </InputIcon>
        <Input
          v-model="chatStore.searchQuery"
          placeholder="Search conversations..."
          class="pl-8 h-8 text-xs bg-background/90"
        />
      </InputGroup>
    </div>

    <!-- Conversation List -->
    <div class="flex-1 overflow-y-auto p-2 space-y-1">
      <button
        v-for="conv in chatStore.filteredConversations"
        :key="conv.id"
        class="w-full p-2.5 rounded-xl flex items-start gap-3 transition-all duration-200 text-left cursor-pointer group"
        :class="[
          chatStore.activeConversationId === conv.id
            ? 'bg-primary/10 text-foreground border border-primary/20 shadow-2xs'
            : 'hover:bg-muted/60 text-muted-foreground border border-transparent',
        ]"
        @click="chatStore.selectConversation(conv.id)"
      >
        <!-- Participant Avatar with Presence Dot -->
        <div class="relative shrink-0 mt-0.5">
          <Avatar class="h-10 w-10 border border-border/80">
            <AvatarImage :src="conv.participant.avatar" :alt="conv.participant.name" />
            <AvatarFallback class="text-xs bg-primary/10 text-primary font-bold">
              {{ conv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2) }}
            </AvatarFallback>
          </Avatar>
          <span
            class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full"
            :class="statusColorMap[conv.participant.status]"
          />
        </div>

        <!-- Chat Details & Snippet -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-xs font-semibold text-foreground truncate">{{ conv.participant.name }}</span>
              <Pin v-if="conv.isPinned" class="h-2.5 w-2.5 text-muted-foreground/80 shrink-0" />
            </div>
            <span v-if="conv.lastMessage" class="text-[10px] font-mono text-muted-foreground/80 shrink-0">
              {{ formatTime(conv.lastMessage.timestamp) }}
            </span>
          </div>

          <p class="text-[11px] text-muted-foreground truncate leading-relaxed">
            <span v-if="conv.lastMessage?.senderId === chatStore.currentUser.id" class="text-foreground/70 font-medium">You: </span>
            {{ conv.lastMessage?.content || 'No messages yet' }}
          </p>
        </div>

        <!-- Unread Badge Dot -->
        <div v-if="conv.unreadCount > 0" class="shrink-0 self-center">
          <span class="h-4 min-w-4 px-1 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
            {{ conv.unreadCount }}
          </span>
        </div>
      </button>

      <!-- Empty Filter State -->
      <div v-if="chatStore.filteredConversations.length === 0" class="py-10 text-center text-xs text-muted-foreground">
        No conversations matching "{{ chatStore.searchQuery }}"
      </div>
    </div>
  </aside>
</template>
