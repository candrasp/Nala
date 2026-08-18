<script setup lang="ts">
import { loadingBar } from '@/lib/loading-bar'
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loadingBar.visible.value"
      class="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none overflow-hidden"
    >
      <div
        class="h-full transition-all duration-200 ease-out shadow-sm"
        :class="[
          loadingBar.status.value === 'error'
            ? 'bg-destructive shadow-destructive/50'
            : 'bg-primary shadow-primary/50',
        ]"
        :style="{
          width: `${loadingBar.progress.value}%`,
        }"
      >
        <!-- Subtle glowing leading edge -->
        <div
          class="absolute top-0 right-0 h-full w-24 opacity-75 blur-[1px]"
          :class="[
            loadingBar.status.value === 'error'
              ? 'bg-destructive/80'
              : 'bg-primary/80',
          ]"
        />
      </div>
    </div>
  </Transition>
</template>
