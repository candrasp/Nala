<script setup lang="ts">
import { RouterView } from 'vue-router'
import { usePreferredDark } from '@vueuse/core'
import { watchEffect, onUnmounted } from 'vue'

// Strictly follow OS system preference (dark / light) on all auth pages
const prefersDark = usePreferredDark()
const previousTheme = localStorage.getItem('vueuse-color-scheme')

watchEffect(() => {
  if (prefersDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Restore stored admin theme preference when navigating away from auth layout
onUnmounted(() => {
  if (previousTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (previousTheme === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    if (prefersDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})
</script>

<template>
  <div class="flex min-h-dvh w-full flex-col items-center justify-start pt-8 pb-12 px-4 sm:justify-center sm:py-8 sm:px-6 bg-muted/40 transition-colors duration-200 overflow-y-auto">
    <RouterView />
  </div>
</template>
