<script setup lang="ts">
import type { ContextMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ContextMenuLabel } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends ContextMenuLabelProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, "class", "inset")
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    v-bind="delegatedProps"
    :class="cn('text-foreground px-2 py-1.5 text-xs font-semibold', inset && 'pl-8', props.class)"
  >
    <slot />
  </ContextMenuLabel>
</template>
