<script setup lang="ts">
import {
  LayoutDashboard,
  FileCode2,
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

// 1. Navigation Items
const mainNav: NavItem[] = [
  { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Blank Page', routeName: 'starter-blank', href: '/_blank', icon: FileCode2 },
]
</script>

<template>
  <Sidebar collapsible="icon" class="top-14 h-[calc(100svh-3.5rem)]">
    <SidebarContent class="py-2 space-y-0">
      <!-- Main Navigation Group -->
      <SidebarGroup class="py-1 px-2">
        <SidebarGroupLabel class="text-[10.5px] font-semibold tracking-wider uppercase text-sidebar-foreground/80">
          Navigation
        </SidebarGroupLabel>
        <SidebarMenu class="gap-0.5">
          <SidebarMenuItem v-for="item in mainNav" :key="item.name">
            <SidebarMenuButton
              as-child
              :is-active="route.name === item.routeName"
              :tooltip="item.name"
            >
              <router-link
                :to="item.href"
                class="relative"
                :class="{ 'font-semibold text-sidebar-accent-foreground': route.name === item.routeName }"
                @click="closeMobileSidebar"
              >
                <span
                  v-if="route.name === item.routeName"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary"
                  aria-hidden="true"
                />
                <component :is="item.icon" class="h-4 w-4 shrink-0" />
                <span>{{ item.name }}</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <!-- Sidebar Footer -->
    <SidebarFooter class="border-t border-sidebar-border p-2">
      <div class="flex items-center justify-between w-full">
        <SidebarControl />
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
