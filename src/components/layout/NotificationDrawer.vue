<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Bell,
  CheckCheck,
  ShieldAlert,
  MessageSquare,
  Server,
  Sparkles,
  ExternalLink,
  Clock,
} from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useNotificationStore } from '@/stores/notification'
import { useFormatter } from '@/composables/useFormatter'

const router = useRouter()
const notificationStore = useNotificationStore()
const fmt = useFormatter()

onMounted(() => {
  if (notificationStore.notifications.length === 0) {
    notificationStore.loadNotifications()
  }
})

function getIcon(type: string) {
  switch (type) {
    case 'security':
      return ShieldAlert
    case 'mention':
      return MessageSquare
    case 'system':
      return Server
    default:
      return Sparkles
  }
}

function getIconBg(type: string) {
  switch (type) {
    case 'security':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    case 'mention':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    case 'system':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    default:
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  }
}

function handleNotificationClick(id: string, actionUrl?: string) {
  notificationStore.markAsRead(id)
  if (actionUrl) {
    router.push(actionUrl)
  }
}

function navigateToInbox() {
  router.push('/notifications')
}
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <button
        class="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
        aria-label="Open notifications"
      >
        <Bell class="h-5 w-5" />
        <span
          v-if="notificationStore.unreadCount > 0"
          class="absolute top-1.5 right-1.5 flex h-2 w-2"
        >
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
        </span>
      </button>
    </SheetTrigger>

    <SheetContent side="right" class="w-full sm:max-w-md p-0 flex flex-col justify-between">
      <div>
        <SheetHeader class="px-4 py-3 border-b border-border">
          <div class="flex items-center justify-between pr-6">
            <div class="flex items-center gap-2">
              <SheetTitle class="text-base font-semibold">Notifications</SheetTitle>
              <span
                v-if="notificationStore.unreadCount > 0"
                class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
              >
                {{ notificationStore.unreadCount }} new
              </span>
            </div>
            <button
              v-if="notificationStore.unreadCount > 0"
              @click="notificationStore.markAllAsRead"
              class="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCheck class="h-3.5 w-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>
          <SheetDescription class="sr-only">
            List of recent system notifications, mentions, and security alerts
          </SheetDescription>
        </SheetHeader>

        <div class="divide-y divide-border overflow-y-auto max-h-[calc(100vh-10rem)]">
          <div
            v-for="item in notificationStore.notifications"
            :key="item.id"
            @click="handleNotificationClick(item.id, item.actionUrl)"
            class="p-4 transition-colors hover:bg-muted/40 flex items-start gap-3 relative cursor-pointer border-l-2"
            :class="item.unread ? 'bg-primary/5 dark:bg-primary/6 border-l-primary' : 'border-l-transparent'"
          >
            <div class="relative shrink-0">
              <div :class="['p-2 rounded-full flex items-center justify-center', getIconBg(item.type)]">
                <component :is="getIcon(item.type)" class="h-4 w-4" />
              </div>
              <span
                v-if="item.unread"
                class="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card shadow-xs"
              />
            </div>
            <div class="flex-1 space-y-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-medium text-foreground leading-tight truncate" :class="{ 'font-semibold': item.unread }">
                  {{ item.title }}
                </p>
                <div class="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                  <Clock class="h-3 w-3" />
                  <span>{{ fmt.relative(item.createdAt) }}</span>
                </div>
              </div>
              <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div v-if="notificationStore.notifications.length === 0" class="p-8 text-center text-muted-foreground text-sm">
            No notifications yet.
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-border bg-muted/20 flex items-center gap-2">
        <SheetClose as-child>
          <Button variant="default" class="flex-1 text-xs gap-1.5" @click="navigateToInbox">
            <ExternalLink class="h-3.5 w-3.5" />
            View All in Inbox
          </Button>
        </SheetClose>
        <SheetClose as-child>
          <Button variant="outline" class="text-xs">
            Close
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</template>
