<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
  size?: "sm" | "default" | "lg"
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
})
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="
      cn(
        'inline-flex items-center justify-center font-mono font-medium select-none rounded border border-border bg-muted/60 text-muted-foreground shadow-2xs transition-colors',
        size === 'sm' && 'h-4.5 min-w-4.5 px-1 text-[10px]',
        size === 'default' && 'h-5 min-w-5 px-1.5 text-[11px]',
        size === 'lg' && 'h-6 min-w-6 px-2 text-xs',
        props.class
      )
    "
  >
    <slot />
  </kbd>
</template>
