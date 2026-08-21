<script setup lang="ts">
import {
  Search,
  ChevronDown,
  Settings,
  LogOut,
} from '@lucide/vue'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import AppLogo from '@/components/AppLogo.vue'
import NotificationDrawer from '@/components/layout/NotificationDrawer.vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'open-search'): void
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

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
  if (route.name === 'components-formatters') return 'Formatters & Utils'
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
  if (route.name === 'login') return 'Login'
  if (route.name === 'register') return 'Register'
  if (route.name === 'forgot-password') return 'Forgot Password'
  if (route.name === 'verify-otp') return 'Verify OTP'
  if (route.name === 'reset-password') return 'Reset Password'
  if (route.name === 'confirm-email') return 'Confirm Email'
  return 'Admin'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background/80 pr-4 sm:pr-6 backdrop-blur-md">
    <!-- Left: App Logo, Sidebar Toggle & Breadcrumb -->
    <div class="flex items-center gap-1 sm:gap-2 min-w-0">
      <!-- Logo container matched to collapsed sidebar column width -->
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

    <!-- Right: Search Command Trigger, Notification Drawer & User Profile Dropdown -->
    <div class="flex items-center gap-2 sm:gap-3 shrink-0">
      <!-- Search Command Trigger Button -->
      <button
        @click="emit('open-search')"
        class="flex items-center gap-2 rounded-full border border-input bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:px-3.5"
      >
        <Search class="h-3.5 w-3.5 shrink-0" />
        <span class="hidden sm:inline">Search...</span>
        <span class="hidden sm:inline pointer-events-none ml-1 text-xs font-normal text-muted-foreground">
          Ctrl K
        </span>
      </button>

      <!-- Notifications Sheet Drawer -->
      <NotificationDrawer />

      <!-- User Profile & Theme Dropdown Menu -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button class="flex items-center gap-2 rounded-full p-1 hover:bg-accent transition-colors cursor-pointer">
            <Avatar class="h-8 w-8 border">
              <AvatarImage :src="authStore.user?.avatar || '/img/avatar.webp'" alt="User profile" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <ChevronDown class="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">{{ authStore.user?.name || 'Administrator' }}</p>
              <p class="text-xs leading-none text-muted-foreground">{{ authStore.user?.email || 'admin@nala.design' }}</p>
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
          <DropdownMenuItem @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
