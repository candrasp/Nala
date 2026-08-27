<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    side?: "left" | "right"
  }>(),
  {
    side: "left",
  },
)
</script>

<template>
  <div
    data-slot="input-addon"
    :class="
      cn(
        'inline-flex items-center px-3 text-xs text-muted-foreground bg-muted border border-input h-9 select-none shrink-0',
        props.side === 'left' ? 'rounded-l-md border-r-0' : 'rounded-r-md border-l-0',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
