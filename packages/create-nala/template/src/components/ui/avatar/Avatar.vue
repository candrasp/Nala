<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { AvatarRoot } from "reka-ui"
import { cn } from "@/lib/utils"

/** Presence status shown as a colored pip at bottom-right of the avatar */
type AvatarStatus = "online" | "busy" | "away" | "offline"

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground/60",
}

const statusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  busy: "Do Not Disturb",
  away: "Away",
  offline: "Offline",
}

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Presence status indicator. Renders a colored pip at bottom-right. */
  status?: AvatarStatus
}>()
</script>

<template>
  <div :class="cn('relative inline-flex size-8 shrink-0 rounded-full', props.class)">
    <AvatarRoot
      data-slot="avatar"
      class="flex size-full overflow-hidden rounded-full"
    >
      <slot />
    </AvatarRoot>

    <!-- Presence status pip -->
    <span
      v-if="status"
      :title="statusLabels[status]"
      :class="cn(
        'absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background',
        statusClasses[status],
      )"
      aria-hidden="true"
    />
  </div>
</template>
