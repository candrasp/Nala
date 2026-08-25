<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  CheckCheck,
  Trash2,
  Search,
  ShieldAlert,
  MessageSquare,
  Server,
  Sparkles,
  ExternalLink,
  Mail,
  MailOpen,
  Settings,
  Inbox,
  Check,
  Clock,
  Info,
} from '@lucide/vue'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PageHeader from '@/components/PageHeader.vue'
import { useNotificationStore, type NotificationFilterTab } from '@/stores/notification'
import { useFormatter } from '@/composables/useFormatter'

const router = useRouter()
const notificationStore = useNotificationStore()
const fmt = useFormatter()

onMounted(() => {
  if (notificationStore.notifications.length === 0) {
    notificationStore.loadNotifications()
  }
})

// ─── Filter Tabs Definition ───────────────────────────────────────────────────
const filterTabs = [
  { id: 'all' as NotificationFilterTab, label: 'All' },
  { id: 'unread' as NotificationFilterTab, label: 'Unread' },
  { id: 'security' as NotificationFilterTab, label: 'Security' },
  { id: 'mention' as NotificationFilterTab, label: 'Mentions' },
  { id: 'system' as NotificationFilterTab, label: 'System' },
]

// ─── Helper Functions ─────────────────────────────────────────────────────────

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

function getIconColorClasses(type: string) {
  switch (type) {
    case 'security':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    case 'mention':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    case 'system':
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    default:
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  }
}

function getCategoryBadgeVariant(type: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (type) {
    case 'security':
      return 'warning'
    case 'mention':
      return 'info'
    case 'system':
      return 'success'
    default:
      return 'outline'
  }
}

function handleFollowAction(url?: string) {
  if (url) {
    router.push(url)
  }
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Top Standard PageHeader -->
    <PageHeader
      title="Notifications Center"
      description="Manage administrative event logs, security advisories, team mentions, and release alerts."
      badge="Inbox & Activity"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="notificationStore.unreadCount === 0"
            @click="notificationStore.markAllAsRead"
          >
            <CheckCheck class="h-3.5 w-3.5" />
            Mark All Read
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5 text-muted-foreground hover:text-destructive"
            @click="notificationStore.clearAllRead"
          >
            <Trash2 class="h-3.5 w-3.5" />
            Clear Read
          </Button>

          <Button
            variant="ghost"
            size="sm"
            class="text-xs gap-1.5"
            @click="router.push('/settings')"
          >
            <Settings class="h-3.5 w-3.5" />
            Preferences
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- Main Content Container Card -->
    <Card flush class="shadow-sm border overflow-hidden">
      <!-- Toolbar Header with Tabs and Search -->
      <CardHeader section class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            v-for="tab in filterTabs"
            :key="tab.id"
            type="button"
            @click="notificationStore.activeTab = tab.id"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            :class="notificationStore.activeTab === tab.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'"
          >
            <span>{{ tab.label }}</span>
            <span
              v-if="tab.id === 'all'"
              class="px-1.5 py-0.2 rounded-full text-[10px]"
              :class="notificationStore.activeTab === 'all' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'"
            >
              {{ notificationStore.notifications.length }}
            </span>
            <span
              v-else-if="tab.id === 'unread' && notificationStore.unreadCount > 0"
              class="px-1.5 py-0.2 rounded-full text-[10px]"
              :class="notificationStore.activeTab === 'unread' ? 'bg-primary-foreground text-primary font-bold' : 'bg-destructive/15 text-destructive font-semibold'"
            >
              {{ notificationStore.unreadCount }}
            </span>
          </button>
        </div>

        <!-- Search Input -->
        <div class="w-full md:w-72 shrink-0">
          <InputGroup>
            <InputIcon side="left">
              <Search class="h-3.5 w-3.5" />
            </InputIcon>
            <Input
              v-model="notificationStore.searchQuery"
              placeholder="Search notifications..."
              class="pl-9 h-8 text-xs bg-background"
            />
          </InputGroup>
        </div>
      </CardHeader>

      <!-- Batch Selection Bar (Conditional) -->
      <div
        v-if="notificationStore.selectedIds.length > 0"
        class="bg-muted/80 border-b px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div class="flex items-center gap-2">
          <span class="font-medium text-foreground">
            {{ notificationStore.selectedIds.length }} notification(s) selected
          </span>
        </div>

        <div class="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            class="h-7 text-xs gap-1.5"
            @click="notificationStore.markSelectedAsRead"
          >
            <Check class="h-3 w-3" />
            Mark Selected as Read
          </Button>

          <Button
            size="sm"
            variant="destructive"
            class="h-7 text-xs gap-1.5"
            @click="notificationStore.deleteSelected"
          >
            <Trash2 class="h-3 w-3" />
            Delete Selected
          </Button>

          <Button
            size="sm"
            variant="ghost"
            class="h-7 text-xs text-muted-foreground"
            @click="notificationStore.clearSelection"
          >
            Deselect All
          </Button>
        </div>
      </div>

      <!-- Select All Row -->
      <div
        v-if="notificationStore.filteredNotifications.length > 0"
        class="px-6 py-2 border-b bg-muted/20 flex items-center justify-between text-xs text-muted-foreground"
      >
        <div class="flex items-center gap-3">
          <Checkbox
            :checked="notificationStore.isAllSelected"
            @update:checked="notificationStore.toggleSelectAll"
            aria-label="Select all notifications"
          />
          <span class="text-[11px] font-medium">Select All</span>
        </div>

        <span class="text-[11px]">
          Showing {{ notificationStore.filteredNotifications.length }} item(s)
        </span>
      </div>

      <!-- Notifications List Content -->
      <CardContent class="p-0">
        <div class="divide-y divide-border">
          <div
            v-for="item in notificationStore.filteredNotifications"
            :key="item.id"
            class="p-4 sm:p-5 transition-colors hover:bg-muted/30 flex items-start gap-3 sm:gap-4 relative group"
            :class="{ 'bg-muted/15': item.unread }"
          >
            <!-- Unread Pill Dot -->
            <div
              v-if="item.unread"
              class="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
            />

            <!-- Item Checkbox -->
            <div class="pt-1">
              <Checkbox
                :checked="notificationStore.selectedIds.includes(item.id)"
                @update:checked="notificationStore.toggleSelect(item.id)"
                :aria-label="`Select ${item.title}`"
              />
            </div>

            <!-- Avatar or Type Icon -->
            <div class="shrink-0 pt-0.5">
              <Avatar v-if="item.actorAvatar" class="h-9 w-9 border shadow-xs">
                <AvatarImage :src="item.actorAvatar" :alt="item.actorName || 'User'" />
                <AvatarFallback>{{ fmt.initials(item.actorName || 'User') }}</AvatarFallback>
              </Avatar>

              <div
                v-else
                :class="['h-9 w-9 rounded-lg border flex items-center justify-center shadow-xs', getIconColorClasses(item.type)]"
              >
                <component :is="getIcon(item.type)" class="h-4 w-4" />
              </div>
            </div>

            <!-- Notification Body -->
            <div class="flex-1 space-y-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                <div class="flex flex-wrap items-center gap-2 min-w-0">
                  <span
                    class="text-sm font-medium text-foreground leading-tight"
                    :class="{ 'font-bold': item.unread }"
                  >
                    {{ item.title }}
                  </span>
                  <Badge :variant="getCategoryBadgeVariant(item.type)" shape="pill" class="text-[10px] py-0 px-2 font-medium">
                    {{ item.category }}
                  </Badge>
                </div>

                <div class="flex items-center gap-1.5 text-[11px] text-muted-foreground shrink-0">
                  <Clock class="h-3 w-3" />
                  <span>{{ fmt.relative(item.createdAt) }}</span>
                </div>
              </div>

              <p class="text-xs text-muted-foreground leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Optional Action Link -->
              <div v-if="item.actionUrl" class="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="h-7 text-xs gap-1.5 bg-background shadow-xs hover:bg-accent"
                  @click="handleFollowAction(item.actionUrl)"
                >
                  <span>{{ item.actionLabel || 'View Details' }}</span>
                  <ExternalLink class="h-3 w-3 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <!-- Row Action Buttons (Visible on hover on desktop, always visible on mobile) -->
            <div class="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                class="text-muted-foreground hover:text-foreground"
                :title="item.unread ? 'Mark as read' : 'Mark as unread'"
                @click="notificationStore.toggleRead(item.id)"
              >
                <component :is="item.unread ? MailOpen : Mail" class="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="ghost"
                size="icon-sm"
                class="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Delete notification"
                @click="notificationStore.deleteNotification(item.id)"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <!-- Empty State: No notifications in filter/search -->
          <div
            v-if="notificationStore.filteredNotifications.length === 0"
            class="py-16 px-6 text-center space-y-3"
          >
            <div class="h-12 w-12 rounded-full bg-muted/60 border flex items-center justify-center mx-auto text-muted-foreground">
              <Inbox v-if="!notificationStore.searchQuery" class="h-6 w-6" />
              <Search v-else class="h-6 w-6" />
            </div>

            <div class="space-y-1 max-w-sm mx-auto">
              <h3 class="text-sm font-semibold text-foreground">
                <template v-if="notificationStore.searchQuery">
                  No notifications match "{{ notificationStore.searchQuery }}"
                </template>
                <template v-else-if="notificationStore.activeTab === 'unread'">
                  All caught up!
                </template>
                <template v-else>
                  No notifications in this category
                </template>
              </h3>
              <p class="text-xs text-muted-foreground">
                <template v-if="notificationStore.searchQuery">
                  Try clearing your search query or adjusting your category filters.
                </template>
                <template v-else-if="notificationStore.activeTab === 'unread'">
                  You have read all urgent messages and security notices.
                </template>
                <template v-else>
                  New updates and mentions will automatically appear in your inbox.
                </template>
              </p>
            </div>

            <div v-if="notificationStore.searchQuery" class="pt-2">
              <Button
                variant="outline"
                size="sm"
                class="text-xs"
                @click="notificationStore.searchQuery = ''"
              >
                Clear Search Query
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <!-- Footer Info -->
      <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <div class="flex items-center gap-1.5">
          <Info class="h-3.5 w-3.5 text-primary" />
          <span>Notifications are retained for 30 days before being automatically archived.</span>
        </div>

        <div>
          <span>{{ notificationStore.unreadCount }} unread notification(s)</span>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
