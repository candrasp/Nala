<script setup lang="ts">
import type { ContextMenuSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ChevronRight } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { ContextMenuSubTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends ContextMenuSubTriggerProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, "class", "inset")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    v-bind="forwarded"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-3.5 shrink-0 [&_svg]:shrink-0',
      inset && 'pl-8',
      props.class
    )"
  >
    <slot />
    <ChevronRight class="ml-auto" />
  </ContextMenuSubTrigger>
</template>
