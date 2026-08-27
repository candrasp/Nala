<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  time: string
  icon?: Component
  iconColor?: string
  status?: "success" | "warning" | "error" | "info" | "neutral"
  badge?: string
}

interface Props {
  items: TimelineItem[]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <div data-slot="timeline" :class="cn('relative space-y-6', props.class)">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="relative flex gap-4 group"
    >
      <!-- Vertical connecting line (between nodes) -->
      <div
        v-if="index < items.length - 1"
        class="absolute left-4 top-8 -bottom-6 w-0.5 bg-border group-hover:bg-primary/40 transition-colors"
      />

      <!-- Node Marker / Icon -->
      <div
        class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background shadow-2xs transition-transform group-hover:scale-110"
        :class="[
          item.status === 'success' && 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
          item.status === 'warning' && 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10',
          item.status === 'error' && 'border-destructive/30 text-destructive bg-destructive/10',
          item.status === 'info' && 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10',
          (!item.status || item.status === 'neutral') && 'border-border text-muted-foreground bg-muted/40',
        ]"
      >
        <component :is="item.icon" v-if="item.icon" class="h-4 w-4" />
        <span v-else class="h-2 w-2 rounded-full bg-current" />
      </div>

      <!-- Content Details -->
      <div class="flex-1 space-y-1 pt-0.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <h4 class="text-xs font-semibold text-foreground">{{ item.title }}</h4>
            <span
              v-if="item.badge"
              class="rounded-full bg-muted px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground"
            >
              {{ item.badge }}
            </span>
          </div>
          <span class="text-[11px] font-mono text-muted-foreground">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="text-xs text-muted-foreground leading-relaxed">
          {{ item.description }}
        </p>
        <slot name="extra" :item="item" />
      </div>
    </div>
  </div>
</template>
