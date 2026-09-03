<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Sparkles,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useChatStore } from '@/stores/chat'
import type { UserPresenceStatus } from '@/services/chat.service'

const chatStore = useChatStore()
const messageInput = ref('')
const messagesContainer = ref<HTMLDivElement | null>(null)

const statusLabelMap: Record<UserPresenceStatus, { label: string; class: string }> = {
  online: { label: 'Online', class: 'text-emerald-500' },
  busy: { label: 'In a meeting', class: 'text-rose-500' },
  away: { label: 'Away', class: 'text-amber-500' },
  offline: { label: 'Offline', class: 'text-muted-foreground' },
}

function formatMessageTime(isoString: string): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(
  () => [chatStore.currentMessages.length, chatStore.isPeerTyping],
  () => {
    scrollToBottom()
  },
  { deep: true, immediate: true }
)

const handleSend = async () => {
  if (!messageInput.value.trim() || chatStore.isSending) return
  const text = messageInput.value
  messageInput.value = ''
  await chatStore.sendMessage(text)
  scrollToBottom()
}

const sendPresetSuggestion = (preset: string) => {
  messageInput.value = preset
  handleSend()
}
</script>

<template>
  <main class="flex-1 flex flex-col min-w-0 bg-background/50 backdrop-blur-xs relative overflow-hidden">
    <!-- Active Header Bar -->
    <header v-if="chatStore.activeConversation" class="p-3.5 border-b border-border bg-card/60 flex items-center justify-between gap-3 shrink-0">
      <div class="flex items-center gap-3 min-w-0">
        <div class="relative shrink-0">
          <Avatar class="h-10 w-10 border border-border">
            <AvatarImage :src="chatStore.activeConversation.participant.avatar" :alt="chatStore.activeConversation.participant.name" />
            <AvatarFallback class="text-xs bg-primary/10 text-primary font-bold">
              {{ chatStore.activeConversation.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2) }}
            </AvatarFallback>
          </Avatar>
          <span
            class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background"
            :class="[
              chatStore.activeConversation.participant.status === 'online' ? 'bg-emerald-500' : '',
              chatStore.activeConversation.participant.status === 'busy' ? 'bg-rose-500' : '',
              chatStore.activeConversation.participant.status === 'away' ? 'bg-amber-500' : '',
              chatStore.activeConversation.participant.status === 'offline' ? 'bg-zinc-400' : '',
            ]"
          />
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="text-xs sm:text-sm font-semibold text-foreground truncate">
              {{ chatStore.activeConversation.participant.name }}
            </h3>
            <Badge variant="outline" shape="pill" class="text-[10px] px-1.5 py-0 h-4 border-primary/20 text-primary">
              {{ chatStore.activeConversation.participant.role }}
            </Badge>
          </div>
          <p class="text-[11px] flex items-center gap-1.5">
            <span :class="statusLabelMap[chatStore.activeConversation.participant.status].class" class="font-medium">
              {{ statusLabelMap[chatStore.activeConversation.participant.status].label }}
            </span>
            <span v-if="chatStore.activeConversation.participant.lastSeen" class="text-muted-foreground">
              · {{ chatStore.activeConversation.participant.lastSeen }}
            </span>
          </p>
        </div>
      </div>

      <!-- Header Actions -->
      <div class="flex items-center gap-1">
        <Button variant="ghost" size="icon-xs" class="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer" title="Start Voice Call">
          <Phone class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-xs" class="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer" title="Start Video Call">
          <Video class="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon-xs" class="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer">
              <MoreVertical class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem class="text-xs cursor-pointer">View Profile</DropdownMenuItem>
            <DropdownMenuItem class="text-xs cursor-pointer">Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem class="text-xs cursor-pointer text-destructive focus:text-destructive">Clear History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <!-- Message Stream Area -->
    <div
      ref="messagesContainer"
      class="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 min-h-0 scroll-smooth"
    >
      <!-- Date Divider -->
      <div class="flex items-center justify-center my-2">
        <span class="text-[10.5px] font-mono text-muted-foreground/80 bg-muted/60 px-3 py-0.5 rounded-full border border-border/40">
          Today, September 3
        </span>
      </div>

      <!-- Message Bubbles -->
      <div
        v-for="msg in chatStore.currentMessages"
        :key="msg.id"
        class="flex gap-2.5 max-w-[85%] sm:max-w-[75%]"
        :class="msg.senderId === chatStore.currentUser.id ? 'ml-auto flex-row-reverse' : 'mr-auto'"
      >
        <!-- Peer Avatar -->
        <Avatar
          v-if="msg.senderId !== chatStore.currentUser.id"
          class="h-7 w-7 border shrink-0 mt-0.5"
        >
          <AvatarImage :src="chatStore.activeConversation?.participant.avatar || ''" />
          <AvatarFallback class="text-[9px] bg-primary/10 text-primary font-bold">U</AvatarFallback>
        </Avatar>

        <div class="space-y-1">
          <!-- Text Bubble -->
          <div
            class="px-3.5 py-2.5 rounded-2xl text-xs sm:text-[12.5px] leading-relaxed wrap-break-word shadow-2xs"
            :class="[
              msg.senderId === chatStore.currentUser.id
                ? 'bg-primary text-primary-foreground rounded-tr-xs'
                : 'bg-muted/80 text-foreground border border-border/60 rounded-tl-xs',
            ]"
          >
            <!-- Attachment preview if any -->
            <div v-if="msg.attachments && msg.attachments.length > 0" class="mb-2 space-y-1.5">
              <div
                v-for="att in msg.attachments"
                :key="att.id"
                class="rounded-lg overflow-hidden border border-border/60 max-w-sm"
              >
                <img v-if="att.type === 'image'" :src="att.url" :alt="att.name" class="w-full object-cover max-h-56" />
              </div>
            </div>

            <p>{{ msg.content }}</p>
          </div>

          <!-- Timestamp and Read Receipts -->
          <div
            class="flex items-center gap-1 text-[10px] text-muted-foreground/70 font-mono px-1"
            :class="msg.senderId === chatStore.currentUser.id ? 'justify-end' : 'justify-start'"
          >
            <span>{{ formatMessageTime(msg.timestamp) }}</span>
            <span v-if="msg.senderId === chatStore.currentUser.id">
              <CheckCheck v-if="msg.status === 'read'" class="h-3 w-3 text-primary inline" />
              <Check v-else class="h-3 w-3 inline" />
            </span>
          </div>
        </div>
      </div>

      <!-- Live Typing Indicator Bubble -->
      <div v-if="chatStore.isPeerTyping" class="flex items-center gap-2 mr-auto animate-fade-in">
        <Avatar class="h-7 w-7 border shrink-0">
          <AvatarImage :src="chatStore.activeConversation?.participant.avatar || ''" />
          <AvatarFallback class="text-[9px]">U</AvatarFallback>
        </Avatar>
        <div class="bg-muted/80 border border-border/60 rounded-2xl rounded-tl-xs px-3.5 py-2 flex items-center gap-1 shadow-2xs">
          <span class="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style="animation-delay: 0ms" />
          <span class="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style="animation-delay: 150ms" />
          <span class="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style="animation-delay: 300ms" />
        </div>
      </div>
    </div>

    <!-- Smart Preset Quick Replies -->
    <div class="px-4 py-1.5 flex items-center gap-2 overflow-x-auto border-t border-border/40 bg-card/20">
      <span class="text-[10.5px] text-muted-foreground shrink-0 flex items-center gap-1 font-medium">
        <Sparkles class="h-3 w-3 text-primary" />
        Quick replies:
      </span>
      <button
        class="text-[11px] px-2.5 py-0.5 rounded-full bg-muted/60 text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer shrink-0 border border-border/60"
        @click="sendPresetSuggestion('LGTM! Ready to merge into production.')"
      >
        👍 LGTM, ready to merge
      </button>
      <button
        class="text-[11px] px-2.5 py-0.5 rounded-full bg-muted/60 text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer shrink-0 border border-border/60"
        @click="sendPresetSuggestion('Checking the logs and metrics right now.')"
      >
        🔍 Checking logs & metrics
      </button>
      <button
        class="text-[11px] px-2.5 py-0.5 rounded-full bg-muted/60 text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer shrink-0 border border-border/60"
        @click="sendPresetSuggestion('Sounds great, let\'s schedule a quick demo call.')"
      >
        📅 Let's schedule a demo
      </button>
    </div>

    <!-- Chat Input Toolbar Area -->
    <footer class="p-3 sm:p-4 border-t border-border bg-card/60 shrink-0">
      <form @submit.prevent="handleSend" class="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          class="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
          title="Attach File"
        >
          <Paperclip class="h-4 w-4" />
        </Button>

        <Input
          v-model="messageInput"
          placeholder="Type a message or press Enter to send..."
          class="h-9 text-xs flex-1 bg-background"
          @keydown.enter.exact.prevent="handleSend"
        />

        <Button
          type="submit"
          size="icon-xs"
          class="h-9 w-9 cursor-pointer shrink-0 shadow-xs"
          :disabled="!messageInput.trim() || chatStore.isSending"
        >
          <Send class="h-4 w-4" />
        </Button>
      </form>
    </footer>
  </main>
</template>
