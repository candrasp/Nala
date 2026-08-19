<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    flush?: boolean
  }>(),
  {
    flush: false,
  },
)
</script>

<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col rounded-lg border shadow-xs',
        props.flush ? 'overflow-hidden py-0 gap-0' : 'py-6 gap-6',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
