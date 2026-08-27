<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title?: string
  description?: string
  badge?: string
  statusDot?: boolean
  headingTag?: 'h1' | 'h2'
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<PageHeaderProps>(), {
  title: '',
  description: '',
  badge: '',
  statusDot: true,
  headingTag: 'h1',
})
</script>

<template>
  <div
    data-slot="page-header"
    :class="cn('flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between', props.class)"
  >
    <div>
      <div v-if="props.badge || $slots.badge" class="flex items-center gap-2">
        <slot name="badge">
          <span class="label-mono">{{ props.badge }}</span>
        </slot>
        <span v-if="props.statusDot" class="status-dot" />
      </div>

      <component
        :is="props.headingTag"
        class="text-2xl font-bold tracking-tight text-foreground mt-1"
      >
        <slot name="title">{{ props.title }}</slot>
      </component>

      <p
        v-if="props.description || $slots.description"
        class="text-sm text-muted-foreground"
      >
        <slot name="description">{{ props.description }}</slot>
      </p>
    </div>

    <div
      v-if="$slots.actions || $slots.default"
      class="flex items-center gap-2 pt-2 sm:pt-0 shrink-0"
    >
      <slot name="actions">
        <slot />
      </slot>
    </div>
  </div>
</template>
