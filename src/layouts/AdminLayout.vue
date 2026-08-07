<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Command,
  CheckCheck,
  UserPlus,
  ShieldAlert,
  FileText,
  Clock,
} from '@lucide/vue'
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

const mode = useColorMode({
  selector: 'html',
  attribute: 'class',
  emitAuto: true,
  modes: {
    auto: '',
    dark: 'dark',
    light: '',
  },
})

const notifications = ref([
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

const route = useRoute()
const authStore = useAuthStore()

const pageTitle = computed(() => {
  if (route.name === 'dashboard') return 'Dashboard'
  if (route.name === 'users') return 'User Management'
  if (route.name === 'settings') return 'Settings'
  return 'Admin'
})

const navigation = [
  { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Users', routeName: 'users', href: '/users', icon: Users },
  { name: 'Settings', routeName: 'settings', href: '/settings', icon: Settings },
]
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader class="h-16 border-b border-sidebar-border p-2 flex items-center justify-center">
        <div class="flex items-center gap-3 font-semibold text-lg overflow-hidden w-full group-data-[collapsible=icon]:justify-center">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command class="h-5 w-5" />
          </div>
          <span class="truncate group-data-[collapsible=icon]:hidden">Nala Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent class="py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu class="gap-1">
            <SidebarMenuItem v-for="item in navigation" :key="item.name">
              <SidebarMenuButton
                as-child
                :is-active="route.name === item.routeName"
                :tooltip="item.name"
              >
                <router-link :to="item.href">
                  <component :is="item.icon" class="h-4 w-4 shrink-0" />
                  <span>{{ item.name }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter class="border-t border-sidebar-border p-2 flex items-center justify-center">
        <div class="flex items-center gap-3 overflow-hidden w-full group-data-[collapsible=icon]:justify-center">
          <Avatar class="h-9 w-9 shrink-0 border">
            <AvatarImage :src="authStore.user?.avatar ?? ''" class="object-cover" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div class="flex flex-col text-left text-xs truncate group-data-[collapsible=icon]:hidden">
            <span class="font-medium text-sidebar-foreground truncate">{{ authStore.user?.name }}</span>
            <span class="text-muted-foreground truncate">{{ authStore.user?.email }}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>

      <!-- Main Inset Content -->
      <SidebarInset class="flex flex-col min-h-0">
        <!-- Top Navigation Header (fixed/sticky) -->
        <header class="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
          <div class="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" class="h-4 hidden sm:block" />
            <Breadcrumb class="hidden sm:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink to="/">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{{ pageTitle }}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div class="flex items-center gap-3">
            <Sheet>
              <SheetTrigger as-child>
                <button class="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer" aria-label="Open notifications">
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
                          class="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-medium"
                        >
                          {{ unreadCount }} new
                        </span>
                      </div>
                      <Button
                        v-if="unreadCount > 0"
                        variant="ghost"
                        size="sm"
                        class="text-[11px] text-muted-foreground hover:text-foreground gap-1 h-7 px-2"
                        @click="markAllAsRead"
                      >
                        <CheckCheck class="h-3 w-3" />
                        Mark all as read
                      </Button>
                    </div>
                  </SheetHeader>

                  <!-- Notification Items List -->
                  <div class="divide-y divide-border overflow-y-auto max-h-[calc(100vh-140px)]">
                    <div
                      v-for="item in notifications"
                      :key="item.id"
                      class="flex items-start gap-4 p-4 transition-colors hover:bg-accent/40 cursor-pointer"
                      :class="{ 'bg-muted/30': item.unread }"
                      @click="item.unread = false"
                    >
                      <div
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        :class="item.iconBg"
                      >
                        <component :is="item.icon" class="h-4 w-4" />
                      </div>
                      <div class="flex-1 space-y-1">
                        <div class="flex items-center justify-between">
                          <p class="text-sm font-medium leading-none" :class="{ 'font-semibold': item.unread }">
                            {{ item.title }}
                          </p>
                          <span class="flex items-center text-[11px] text-muted-foreground gap-1">
                            <Clock class="h-3 w-3" />
                            {{ item.time }}
                          </span>
                        </div>
                        <p class="text-xs text-muted-foreground leading-relaxed">
                          {{ item.description }}
                        </p>
                      </div>
                      <span v-if="item.unread" class="h-2 w-2 rounded-full bg-primary shrink-0 mt-1"></span>
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

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <button class="flex items-center gap-2 rounded-full p-1 hover:bg-accent transition-colors">
                  <Avatar class="h-8 w-8 border">
                    <AvatarImage :src="authStore.user?.avatar ?? ''" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                  <ChevronDown class="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56">
                <DropdownMenuLabel class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">{{ authStore.user?.name }}</p>
                    <p class="text-xs leading-none text-muted-foreground">{{ authStore.user?.email }}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="$router.push('/settings')">
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel class="text-xs text-muted-foreground font-normal px-2 py-1.5">Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup v-model="mode">
                  <DropdownMenuRadioItem value="auto">
                    System
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="authStore.logout(); $router.push('/auth/login')">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <!-- Page Content View (scrollable) -->
        <main class="flex-1 overflow-y-auto p-6 bg-background" style="scrollbar-gutter: stable;">
          <RouterView />
        </main>
      </SidebarInset>
  </SidebarProvider>
</template>
