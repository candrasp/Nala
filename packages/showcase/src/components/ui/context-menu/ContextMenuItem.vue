<script setup lang="ts">
import type { ContextMenuItemEmits, ContextMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ContextMenuItem, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends ContextMenuItemProps {
  class?: HTMLAttributes["class"]
  inset?: boolean
  variant?: "default" | "destructive"
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})
const emits = defineEmits<ContextMenuItemEmits>()

const delegatedProps = reactiveOmit(props, "class", "inset", "variant")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    v-bind="forwarded"
    :class="cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-3.5 shrink-0 [&_svg]:shrink-0',
      inset && 'pl-8',
      variant === 'destructive' && 'text-destructive focus:bg-destructive/10 focus:text-destructive',
      props.class
    )"
  >
    <slot />
  </ContextMenuItem>
</template>
