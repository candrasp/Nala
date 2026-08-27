<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="context-menu-shortcut"
    :class="cn('text-muted-foreground ml-auto text-[10px] tracking-widest uppercase font-mono', props.class)"
  >
    <slot />
  </span>
</template>
