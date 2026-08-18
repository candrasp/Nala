<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { LoadingBar } from '@/components/ui/loading-bar'
</script>

<template>
  <LoadingBar />
  <RouterView />
  <Toaster position="top-right" rich-colors close-button />
</template>
