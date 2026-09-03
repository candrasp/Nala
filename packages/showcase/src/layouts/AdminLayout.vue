<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CommandSearchDialog from '@/components/layout/CommandSearchDialog.vue'
import KeyboardShortcutsDialog from '@/components/layout/KeyboardShortcutsDialog.vue'
import ThemeCustomizer from '@/components/layout/ThemeCustomizer.vue'
import { useThemeConfig } from '@/composables/useThemeConfig'

const isSearchOpen = ref(false)
const isShortcutsOpen = ref(false)
const { themeConfig } = useThemeConfig()
const showThemeCustomizer = import.meta.env.VITE_SHOW_THEME_CUSTOMIZER !== 'false'

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

// Global keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
  // Ignore key events when user is typing inside form elements
  const target = e.target as HTMLElement
  const isFormElement = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable

  // 1. Quick Search: Ctrl+K or Cmd+K
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault()
    isSearchOpen.value = !isSearchOpen.value
    return
  }

  // 2. Theme Toggle: Ctrl+Shift+L or Cmd+Shift+L
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
    e.preventDefault()
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    return
  }

  // 3. Shortcuts Helper: '?' when not typing in input
  if (e.key === '?' && !isFormElement && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault()
    isShortcutsOpen.value = !isShortcutsOpen.value
    return
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
    <AppNavbar
      @open-search="isSearchOpen = true"
      @open-shortcuts="isShortcutsOpen = true"
    />

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

    <!-- Keyboard Shortcuts Helper Modal (?) -->
    <KeyboardShortcutsDialog v-model:open="isShortcutsOpen" />

    <!-- Live Theme & Layout Configurator Drawer -->
    <ThemeCustomizer v-if="showThemeCustomizer" />
  </SidebarProvider>
</template>
