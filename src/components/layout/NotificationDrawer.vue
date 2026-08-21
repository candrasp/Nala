<script setup lang="ts">
import {
  Bell,
  CheckCheck,
  UserPlus,
  ShieldAlert,
  FileText,
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

export interface NotificationItem {
  id: number
  title: string
  description: string
  time: string
  unread: boolean
  icon: any
  iconBg: string
}

const notifications = ref<NotificationItem[]>([
  {
    id: 1,
    title: 'New user registered',
    description: 'Sarah Connor created a new account.',
    time: '5 min ago',
    unread: true,
    icon: UserPlus,
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: 'Security Alert',
    description: 'Multiple failed login attempts detected on IP 192.168.1.1.',
    time: '25 min ago',
    unread: true,
    icon: ShieldAlert,
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    id: 3,
    title: 'Monthly Report Ready',
    description: 'Financial report for July has been generated successfully.',
    time: '2 hours ago',
    unread: false,
    icon: FileText,
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
])

const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length)

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.unread = false))
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
          v-if="unreadCount > 0"
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
                v-if="unreadCount > 0"
                class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
              >
                {{ unreadCount }} new
              </span>
            </div>
            <button
              v-if="unreadCount > 0"
              @click="markAllAsRead"
              class="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCheck class="h-3.5 w-3.5" />
              <span>Mark all as read</span>
            </button>
          </div>
          <SheetDescription class="sr-only">
            List of recent system notifications and security alerts
          </SheetDescription>
        </SheetHeader>

        <div class="divide-y divide-border overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div
            v-for="item in notifications"
            :key="item.id"
            class="p-4 transition-colors hover:bg-muted/40 flex items-start gap-3 relative cursor-pointer"
            :class="{ 'bg-muted/20': item.unread }"
          >
            <div
              v-if="item.unread"
              class="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
            />
            <div :class="['p-2 rounded-full shrink-0 flex items-center justify-center', item.iconBg]">
              <component :is="item.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1 space-y-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p class="text-sm font-medium text-foreground leading-tight truncate">
                  {{ item.title }}
                </p>
                <div class="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                  <Clock class="h-3 w-3" />
                  <span>{{ item.time }}</span>
                </div>
              </div>
              <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>

          <div v-if="notifications.length === 0" class="p-8 text-center text-muted-foreground text-sm">
            No notifications yet.
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-border bg-muted/20">
        <SheetClose as-child>
          <Button variant="outline" class="w-full">
            Close Notifications
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
</template>
