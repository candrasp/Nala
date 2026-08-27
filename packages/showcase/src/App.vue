<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { LoadingBar } from '@/components/ui/loading-bar'
import { useThemeConfig } from '@/composables/useThemeConfig'

// Initialize dynamic theme & layout variables globally
useThemeConfig()
</script>

<template>
  <LoadingBar />
  <RouterView />
  <Toaster position="top-right" rich-colors close-button />
</template>
