<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
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
  Settings,
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
      <SidebarControl />
    </SidebarFooter>
  </Sidebar>
</template>
