<script setup lang="ts">
import { PanelLeft } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar, type SidebarControlMode } from './utils'

const { sidebarMode, setSidebarMode, setIsMenuOpen } = useSidebar()

const onOpenChange = (open: boolean) => {
  setIsMenuOpen(open)
}
</script>

<template>
  <DropdownMenu @update:open="onOpenChange">
    <DropdownMenuTrigger as-child>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Sidebar control"
        title="Sidebar control"
      >
        <PanelLeft class="h-4 w-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" align="start" :side-offset="8" class="w-48">
      <DropdownMenuLabel class="text-xs font-medium text-muted-foreground px-2 py-1.5">
        Sidebar control
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup
        :model-value="sidebarMode"
        @update:model-value="(val) => setSidebarMode(val as SidebarControlMode)"
      >
        <DropdownMenuRadioItem value="expanded" class="cursor-pointer">
          Expanded
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="hover" class="cursor-pointer">
          Expand on hover
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
