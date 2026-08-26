<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CommandSearchDialog from '@/components/layout/CommandSearchDialog.vue'
import ThemeCustomizer from '@/components/layout/ThemeCustomizer.vue'
import { useThemeConfig } from '@/composables/useThemeConfig'

const isSearchOpen = ref(false)
const { themeConfig } = useThemeConfig()
const showThemeCustomizer = import.meta.env.VITE_SHOW_THEME_CUSTOMIZER !== 'false'

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
  <SidebarProvider class="h-dvh max-h-dvh min-h-0 w-full overflow-hidden flex flex-col pt-14">
    <!-- Top Navigation Header (Fixed at top) -->
    <AppNavbar @open-search="isSearchOpen = true" />

    <!-- Main Container below Navbar -->
    <div class="flex flex-1 min-h-0 min-w-0 w-full relative overflow-hidden">
      <!-- Left Sidebar Navigation -->
      <AppSidebar />

      <!-- Main Scrollable Inset Page View -->
      <SidebarInset class="flex flex-col min-h-0 min-w-0 max-w-full overflow-hidden flex-1">
        <main class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-background">
          <div :class="themeConfig.contentWidth === 'boxed' ? 'max-w-7xl mx-auto w-full transition-all duration-300' : 'w-full transition-all duration-300'">
            <RouterView v-slot="{ Component }">
              <Transition name="page" mode="out-in">
                <component :is="Component" />
              </Transition>
            </RouterView>
          </div>
        </main>
      </SidebarInset>
    </div>

    <!-- Quick Search Dialog Modal (Ctrl+K) -->
    <CommandSearchDialog v-model:open="isSearchOpen" />

    <!-- Live Theme & Layout Configurator Drawer -->
    <ThemeCustomizer v-if="showThemeCustomizer" />
  </SidebarProvider>
</template>
