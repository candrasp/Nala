<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CommandSearchDialog from '@/components/layout/CommandSearchDialog.vue'

const isSearchOpen = ref(false)

// Global keyboard shortcut: Ctrl+K or Cmd+K
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
</script>

<template>
  <SidebarProvider class="min-h-svh h-svh w-full overflow-hidden flex flex-col pt-14">
    <!-- Top Navigation Header (Fixed at top) -->
    <AppNavbar @open-search="isSearchOpen = true" />

    <!-- Main Container below Navbar -->
    <div class="flex flex-1 min-h-0 min-w-0 w-full relative">
      <!-- Left Sidebar Navigation -->
      <AppSidebar />

      <!-- Main Scrollable Inset Page View -->
      <SidebarInset class="flex flex-col min-h-0 min-w-0 max-w-full overflow-x-hidden flex-1">
        <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-background">
          <RouterView />
        </main>
      </SidebarInset>
    </div>

    <!-- Quick Search Dialog Modal (Ctrl+K) -->
    <CommandSearchDialog v-model:open="isSearchOpen" />
  </SidebarProvider>
</template>
