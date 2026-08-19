<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /**
   * Maximum number of avatars to display before a "+N" overflow chip.
   * @default Infinity (show all)
   */
  max?: number
  /**
   * Horizontal overlap between stacked avatars (negative space-x).
   * Uses Tailwind sizing scale values (e.g. 2, 3, 4).
   * @default 3
   */
  overlap?: 2 | 3 | 4
}>()

// Map overlap number → Tailwind negative space-x class
const overlapClass: Record<number, string> = {
  2: "-space-x-2",
  3: "-space-x-3",
  4: "-space-x-4",
}

const gap = computed(() => overlapClass[props.overlap ?? 3] ?? "-space-x-3")

// Count children via slots to apply the overflow chip
const slots = useSlots()
const children = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return defaultSlot.flatMap((vnode) =>
    Array.isArray(vnode.children) ? vnode.children : [vnode],
  )
})

const maxVisible = computed(() => props.max ?? Infinity)
const overflowCount = computed(() =>
  Math.max(0, children.value.length - maxVisible.value),
)
const visibleChildren = computed(() => children.value.slice(0, maxVisible.value))
</script>

<template>
  <div
    data-slot="avatar-group"
    :class="cn('flex items-center p-0.5', gap, props.class)"
  >
    <!-- Render only up to `max` avatars -->
    <component
      :is="child"
      v-for="(child, i) in visibleChildren"
      :key="i"
      class="ring-2 ring-background rounded-full"
    />

    <!-- Overflow chip: +N more -->
    <div
      v-if="overflowCount > 0"
      class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-background text-xs font-semibold text-muted-foreground"
      :title="`${overflowCount} more`"
      :aria-label="`${overflowCount} more members`"
    >
      +{{ overflowCount }}
    </div>
  </div>
</template>
