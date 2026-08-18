<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Settings,
  MousePointerClick,
  FormInput,
  AppWindow,
  Layers,
  Table2,
  SlidersHorizontal,
  BellRing,
  Compass,
  Tag,
  BellDot,
  AreaChart,
  FileCode2,
  Type,
  Palette,
  Sparkles,
  FileQuestion,
  ServerCrash,
  LogOut,
  Bell,
  ChevronDown,
  CheckCheck,
  UserPlus,
  ShieldAlert,
  FileText,
  Clock,
  Search,
} from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const isSearchOpen = ref(false)
const searchQuery = ref('')

// Shortcut Ctrl + K or Cmd + K dengan e.preventDefault() agar tidak bentrok dengan browser
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault()
    isSearchOpen.value = !isSearchOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const mainNav = [
  { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Users', routeName: 'users', href: '/users', icon: Users },
]

const componentNav = [
  { name: 'Buttons', routeName: 'components-buttons', href: '/components/buttons', icon: MousePointerClick },
  { name: 'Form & Inputs', routeName: 'components-forms', href: '/components/forms', icon: FormInput },
  { name: 'Modals & Dialogs', routeName: 'components-modals', href: '/components/modals', icon: AppWindow },
  { name: 'Cards & Surfaces', routeName: 'components-cards', href: '/components/cards', icon: Layers },
  { name: 'Data Tables', routeName: 'components-tables', href: '/components/tables', icon: Table2 },
  { name: 'Charts & Analytics', routeName: 'components-charts', href: '/components/charts', icon: AreaChart },
  { name: 'Overlays & Drawers', routeName: 'components-overlays', href: '/components/overlays', icon: SlidersHorizontal },
  { name: 'Feedback & Loading', routeName: 'components-feedback', href: '/components/feedback', icon: BellRing },
  { name: 'Badges & Avatars', routeName: 'components-badges', href: '/components/badges', icon: Tag },
  { name: 'Toast & Alerts', routeName: 'components-toasts', href: '/components/toasts', icon: BellDot },
  { name: 'Navigation & Flow', routeName: 'components-navigation', href: '/components/navigation', icon: Compass },
]

const designSystemNav = [
  { name: 'Typography', routeName: 'components-typography', href: '/components/typography', icon: Type },
  { name: 'Color Tokens', routeName: 'components-colors', href: '/components/colors', icon: Palette },
  { name: 'Icons Directory', routeName: 'components-icons', href: '/components/icons', icon: Sparkles },
]

const pagesNav = [
  { name: 'Blank Page', routeName: 'starter-blank', href: '/starter/blank', icon: FileCode2 },
  { name: '404 Not Found', routeName: 'not-found', href: '/errors/404', icon: FileQuestion },
  { name: '500 Server Error', routeName: 'server-error', href: '/errors/500', icon: ServerCrash },
  { name: '403 Access Denied', routeName: 'unauthorized', href: '/errors/403', icon: ShieldAlert },
]

const systemNav = [
  { name: 'Settings', routeName: 'settings', href: '/settings', icon: Settings },
]

const searchItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard, category: 'Overview' },
  { title: 'User Management', href: '/users', icon: Users, category: 'Overview' },
  { title: 'Buttons', href: '/components/buttons', icon: MousePointerClick, category: 'UI Components' },
  { title: 'Form & Inputs', href: '/components/forms', icon: FormInput, category: 'UI Components' },
  { title: 'Modals & Dialogs', href: '/components/modals', icon: AppWindow, category: 'UI Components' },
  { title: 'Cards & Surfaces', href: '/components/cards', icon: Layers, category: 'UI Components' },
  { title: 'Data Tables', href: '/components/tables', icon: Table2, category: 'UI Components' },
  { title: 'Charts & Analytics', href: '/components/charts', icon: AreaChart, category: 'UI Components' },
  { title: 'Overlays & Drawers', href: '/components/overlays', icon: SlidersHorizontal, category: 'UI Components' },
  { title: 'Feedback & Loading', href: '/components/feedback', icon: BellRing, category: 'UI Components' },
  { title: 'Badges & Avatars', href: '/components/badges', icon: Tag, category: 'UI Components' },
  { title: 'Toast & Alerts', href: '/components/toasts', icon: BellDot, category: 'UI Components' },
  { title: 'Navigation & Flow', href: '/components/navigation', icon: Compass, category: 'UI Components' },
  { title: 'Typography', href: '/components/typography', icon: Type, category: 'Design System' },
  { title: 'Color Tokens', href: '/components/colors', icon: Palette, category: 'Design System' },
  { title: 'Icon Directory', href: '/components/icons', icon: Sparkles, category: 'Design System' },
  { title: 'Blank Starter Page', href: '/starter/blank', icon: FileCode2, category: 'Pages' },
  { title: '404 Not Found Page', href: '/errors/404', icon: FileQuestion, category: 'Pages' },
  { title: '500 Server Error Page', href: '/errors/500', icon: ServerCrash, category: 'Pages' },
  { title: '403 Access Denied', href: '/errors/403', icon: ShieldAlert, category: 'Pages' },
  { title: 'Settings', href: '/settings', icon: Settings, category: 'System' },
]

const filteredSearchItems = computed(() => {
  if (!searchQuery.value) return searchItems
  return searchItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const navigateTo = (href: string) => {
  isSearchOpen.value = false
  searchQuery.value = ''
  router.push(href)
}

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
// Auto-close sidebar di mobile saat link navigasi diklik
const closeMobileSidebar = () => {
  const triggerBtn = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
  // Tutup sidebar jika sedang terbuka di layar mobile (window width <= 768px)
  if (window.innerWidth <= 768 && triggerBtn) {
    triggerBtn.click()
  }
}

const pageTitle = computed(() => {
  if (route.name === 'dashboard') return 'Dashboard'
  if (route.name === 'users') return 'User Management'
  if (route.name === 'components-buttons' || route.name === 'buttons') return 'Buttons'
  if (route.name === 'components-forms') return 'Form & Inputs'
  if (route.name === 'components-modals') return 'Modals & Dialogs'
  if (route.name === 'components-cards') return 'Cards & Surfaces'
  if (route.name === 'components-tables') return 'Data Tables'
  if (route.name === 'components-charts') return 'Charts & Analytics'
  if (route.name === 'components-overlays') return 'Overlays & Drawers'
  if (route.name === 'components-feedback') return 'Feedback & Loading'
  if (route.name === 'components-badges') return 'Badges & Avatars'
  if (route.name === 'components-toasts') return 'Toast & Alerts'
  if (route.name === 'components-navigation') return 'Navigation & Flow'
  if (route.name === 'components-typography') return 'Typography'
  if (route.name === 'components-colors') return 'Color Tokens'
  if (route.name === 'components-icons') return 'Icon Set & Glyphs'
  if (route.name === 'starter-blank') return 'Blank Page'
  if (route.name === 'settings') return 'Settings'
  if (route.name === 'not-found' || route.name === 'catch-all-not-found') return '404 Not Found'
  if (route.name === 'server-error') return '500 Server Error'
  if (route.name === 'unauthorized') return '403 Access Denied'
  return 'Admin'
})
</script>

<template>
  <SidebarProvider class="min-h-svh h-svh w-full overflow-hidden flex flex-col pt-14">
    <!-- Top Navigation Header (Fixed at top) -->
    <header class="fixed inset-x-0 top-0 z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 pr-4 sm:pr-6 backdrop-blur-md">
      <div class="flex items-center gap-1 sm:gap-2 min-w-0">
        <!-- Logo container perfectly matched to collapsed sidebar column width (w-14 = 56px = 3.5rem) -->
        <div class="flex h-14 w-14 shrink-0 items-center justify-center">
          <router-link to="/" class="flex items-center justify-center text-primary hover:opacity-85 transition-opacity" aria-label="Nala Home">
            <AppLogo class="h-6 w-6" />
          </router-link>
        </div>
        <SidebarTrigger class="md:hidden" />
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

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <!-- Search Command Trigger Button -->
        <button
          @click="isSearchOpen = true"
          class="flex items-center gap-2 rounded-full border border-input bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:px-3.5"
        >
          <Search class="h-3.5 w-3.5 shrink-0" />
          <span class="hidden sm:inline">Search...</span>
          <span class="hidden sm:inline pointer-events-none ml-1 text-xs font-normal text-muted-foreground">
            Ctrl K
          </span>
        </button>

        <!-- Search Modal Dialog -->
        <Dialog v-model:open="isSearchOpen">
          <DialogContent class="p-0 w-[calc(100%-2rem)] sm:w-full max-w-lg overflow-hidden gap-0 top-16 sm:top-20 translate-y-0">
            <DialogHeader class="sr-only">
              <DialogTitle>Quick Search</DialogTitle>
              <DialogDescription>Search pages and commands in Nala admin</DialogDescription>
            </DialogHeader>
            <div class="flex items-center border-b border-border px-3">
              <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                v-model="searchQuery"
                placeholder="Type a command or search page..."
                class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div class="max-h-75 overflow-y-auto p-2">
              <div v-if="filteredSearchItems.length === 0" class="py-6 text-center text-sm text-muted-foreground">
                No results found for "{{ searchQuery }}".
              </div>
              <div v-else class="space-y-1">
                <div class="px-2 py-1.5 text-[11px] font-medium text-muted-foreground">
                  Navigation & Pages
                </div>
                <button
                  v-for="item in filteredSearchItems"
                  :key="item.href"
                  @click="navigateTo(item.href)"
                  class="w-full flex items-center justify-between rounded-md px-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <component :is="item.icon" class="h-4 w-4 text-muted-foreground" />
                    <span>{{ item.title }}</span>
                  </div>
                  <span class="text-[11px] text-muted-foreground">{{ item.category }}</span>
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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

    <!-- Main Container below Navbar -->
    <div class="flex flex-1 min-h-0 min-w-0 w-full relative">
      <Sidebar collapsible="icon" class="top-14 h-[calc(100svh-3.5rem)]">
        <SidebarContent class="py-2 space-y-0">
          <!-- Overview Group -->
          <SidebarGroup class="py-1 px-2">
            <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
              Overview
            </SidebarGroupLabel>
            <SidebarMenu class="gap-0.5">
              <SidebarMenuItem v-for="item in mainNav" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.routeName"
                  :tooltip="item.name"
                >
                  <router-link :to="item.href" @click="closeMobileSidebar">
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <!-- UI Components Group -->
          <SidebarGroup class="py-1 px-2">
            <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
              UI Components
            </SidebarGroupLabel>
            <SidebarMenu class="gap-0.5">
              <SidebarMenuItem v-for="item in componentNav" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.routeName || (item.routeName === 'components-buttons' && route.name === 'buttons')"
                  :tooltip="item.name"
                >
                  <router-link :to="item.href" @click="closeMobileSidebar">
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <!-- Design System Group -->
          <SidebarGroup class="py-1 px-2">
            <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
              Design System
            </SidebarGroupLabel>
            <SidebarMenu class="gap-0.5">
              <SidebarMenuItem v-for="item in designSystemNav" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.routeName"
                  :tooltip="item.name"
                >
                  <router-link :to="item.href" @click="closeMobileSidebar">
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <!-- Pages Group -->
          <SidebarGroup class="py-1 px-2">
            <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
              Pages
            </SidebarGroupLabel>
            <SidebarMenu class="gap-0.5">
              <SidebarMenuItem v-for="item in pagesNav" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.routeName"
                  :tooltip="item.name"
                >
                  <router-link :to="item.href" @click="closeMobileSidebar">
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <!-- System Group -->
          <SidebarGroup class="py-1 px-2">
            <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
              System
            </SidebarGroupLabel>
            <SidebarMenu class="gap-0.5">
              <SidebarMenuItem v-for="item in systemNav" :key="item.name">
                <SidebarMenuButton
                  as-child
                  :is-active="route.name === item.routeName"
                  :tooltip="item.name"
                >
                  <router-link :to="item.href" @click="closeMobileSidebar">
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter class="border-t border-sidebar-border p-2">
          <SidebarControl />
        </SidebarFooter>
      </Sidebar>

      <!-- Main Inset Content -->
      <SidebarInset class="flex flex-col min-h-0 min-w-0 max-w-full overflow-x-hidden flex-1">
        <!-- Page Content View (scrollable) -->
        <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-background">
          <RouterView />
        </main>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>
