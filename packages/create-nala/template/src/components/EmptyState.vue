<script setup lang="ts">
import type { Component } from 'vue'
import { Inbox } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'

interface Props {
  /** Lucide icon component or custom icon */
  icon?: Component
  /** Main heading */
  title: string
  /** Descriptive explanation or guidance */
  description?: string
  /** Optional badge text */
  badge?: string
  /** Compact padding variant for in-card or widget usage */
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  icon: Inbox,
  description: '',
  badge: '',
  compact: false,
})
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-border/80 bg-muted/10',
      compact ? 'py-8 px-4' : 'py-14 px-6'
    ]"
    role="status"
  >
    <!-- Icon Container -->
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 border border-border/60 text-muted-foreground shadow-2xs">
      <component :is="icon" class="h-6 w-6 stroke-[1.75]" />
    </div>

    <!-- Optional Badge -->
    <div v-if="badge" class="mb-2">
      <Badge variant="outline" class="text-[11px] font-mono px-2 py-0.5">
        {{ badge }}
      </Badge>
    </div>

    <!-- Title & Description -->
    <h3 class="text-sm font-semibold text-foreground tracking-tight">
      {{ title }}
    </h3>
    <p v-if="description" class="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
      {{ description }}
    </p>

    <!-- Action Slot (Buttons, Recovery links, etc.) -->
    <div v-if="$slots.actions" class="mt-5 flex flex-wrap items-center justify-center gap-2.5">
      <slot name="actions" />
    </div>
  </div>
</template>
