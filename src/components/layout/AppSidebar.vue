<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Bell,
  Activity,
  CreditCard,
  Palette,
  Type,
  Sparkles,
  Binary,
  MousePointerClick,
  Tag,
  Layers,
  FormInput,
  Table2,
  AreaChart,
  AppWindow,
  SlidersHorizontal,
  BellDot,
  BellRing,
  Compass,
  LogIn,
  UserRound,
  KeyRound,
  ScanLine,
  LockKeyhole,
  MailCheck,
  FileCode2,
  FileQuestion,
  ServerCrash,
  ShieldAlert,
  ShieldCheck,
  Settings,
  User,
  ExternalLink,
} from '@lucide/vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarControl,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface NavItem {
  name: string
  routeName: string
  href: string
  icon: any
}

const route = useRoute()

// Auto-close sidebar on mobile when navigating
const closeMobileSidebar = () => {
  const triggerBtn = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
  if (window.innerWidth <= 768 && triggerBtn) {
    triggerBtn.click()
  }
}

// 1. Overview Group
const mainNav: NavItem[] = [
  { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Notifications', routeName: 'notifications', href: '/notifications', icon: Bell },
  { name: 'Activity Log', routeName: 'activity', href: '/activity', icon: Activity },
  { name: 'Roles & Permissions', routeName: 'roles', href: '/roles', icon: ShieldCheck },
  { name: 'Billing & Invoices', routeName: 'billing', href: '/billing', icon: CreditCard },
  { name: 'Users', routeName: 'users', href: '/users', icon: Users },
]

// 2. Design System Group
const designSystemNav: NavItem[] = [
  { name: 'Color Tokens', routeName: 'components-colors', href: '/components/colors', icon: Palette },
  { name: 'Typography', routeName: 'components-typography', href: '/components/typography', icon: Type },
  { name: 'Icons Directory', routeName: 'components-icons', href: '/components/icons', icon: Sparkles },
  { name: 'Formatters & Utils', routeName: 'components-formatters', href: '/components/formatters', icon: Binary },
]

// 3. UI Components Group
const componentNav: NavItem[] = [
  { name: 'Buttons', routeName: 'components-buttons', href: '/components/buttons', icon: MousePointerClick },
  { name: 'Badges & Avatars', routeName: 'components-badges', href: '/components/badges', icon: Tag },
  { name: 'Cards & Surfaces', routeName: 'components-cards', href: '/components/cards', icon: Layers },
  { name: 'Form & Inputs', routeName: 'components-forms', href: '/components/forms', icon: FormInput },
  { name: 'Data Tables', routeName: 'components-tables', href: '/components/tables', icon: Table2 },
  { name: 'Charts & Analytics', routeName: 'components-charts', href: '/components/charts', icon: AreaChart },
  { name: 'Modals & Dialogs', routeName: 'components-modals', href: '/components/modals', icon: AppWindow },
  { name: 'Overlays & Drawers', routeName: 'components-overlays', href: '/components/overlays', icon: SlidersHorizontal },
  { name: 'Toast & Alerts', routeName: 'components-toasts', href: '/components/toasts', icon: BellDot },
  { name: 'Feedback & Loading', routeName: 'components-feedback', href: '/components/feedback', icon: BellRing },
  { name: 'Navigation & Flow', routeName: 'components-navigation', href: '/components/navigation', icon: Compass },
]

// 4. Authentication Group
const authNav: NavItem[] = [
  { name: 'Login', routeName: 'login', href: '/auth/login', icon: LogIn },
  { name: 'Register', routeName: 'register', href: '/auth/register', icon: UserRound },
  { name: 'Forgot Password', routeName: 'forgot-password', href: '/auth/forgot-password', icon: KeyRound },
  { name: 'Verify OTP', routeName: 'verify-otp', href: '/auth/verify-otp', icon: ScanLine },
  { name: 'Reset Password', routeName: 'reset-password', href: '/auth/reset-password', icon: LockKeyhole },
  { name: 'Confirm Email', routeName: 'confirm-email', href: '/auth/confirm-email', icon: MailCheck },
]

// 5. Pages Group
const pagesNav: NavItem[] = [
  { name: 'Blank Page', routeName: 'starter-blank', href: '/starter/blank', icon: FileCode2 },
  { name: '404 Not Found', routeName: 'not-found', href: '/errors/404', icon: FileQuestion },
  { name: '500 Server Error', routeName: 'server-error', href: '/errors/500', icon: ServerCrash },
  { name: '403 Access Denied', routeName: 'unauthorized', href: '/errors/403', icon: ShieldAlert },
]

// 6. System Group
const systemNav: NavItem[] = [
  { name: 'Profile', routeName: 'profile', href: '/profile', icon: User },
  { name: 'Settings', routeName: 'settings', href: '/settings', icon: Settings },
]
</script>

<template>
  <Sidebar collapsible="icon" class="top-14 h-[calc(100svh-3.5rem)]">
    <SidebarContent class="py-2 space-y-0">
      <!-- 1. Overview Group -->
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

      <!-- 2. Design System Group -->
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

      <!-- 3. UI Components Group -->
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

      <!-- 4. Auth Pages Group -->
      <SidebarGroup class="py-1 px-2">
        <SidebarGroupLabel class="text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70">
          Authentication
        </SidebarGroupLabel>
        <SidebarMenu class="gap-0.5">
          <SidebarMenuItem v-for="item in authNav" :key="item.name">
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

      <!-- 5. Pages Group -->
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

      <!-- 6. System Group -->
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
      <div class="flex items-center justify-between gap-1">
        <SidebarControl />

        <TooltipProvider :delay-duration="150">
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="https://github.com/candrasp/Nala"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:p-0"
                aria-label="GitHub Repository"
              >
                <!-- GitHub Icon SVG -->
                <svg
                  class="h-4 w-4 shrink-0 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span class="truncate group-data-[collapsible=icon]:hidden">GitHub</span>
                <ExternalLink class="h-3 w-3 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right" :side-offset="8" class="group-data-[collapsible=icon]:block hidden text-xs">
              GitHub Repository
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
