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
    data-slot="input-icon"
    :class="
      cn(
        'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground pointer-events-none [&>svg]:size-4',
        props.side === 'left' ? 'left-3' : 'right-3',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
