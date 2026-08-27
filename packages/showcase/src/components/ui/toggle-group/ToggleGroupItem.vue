<script setup lang="ts">
import type { ToggleGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ToggleVariants } from "@/components/ui/toggle"
import { inject } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToggleGroupItem, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import { TOGGLE_GROUP_INJECTION_KEY } from "."

interface Props extends ToggleGroupItemProps {
  class?: HTMLAttributes["class"]
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
}

const props = defineProps<Props>()

const context = inject(TOGGLE_GROUP_INJECTION_KEY, {
  variant: "default",
  size: "default",
})

const delegatedProps = reactiveOmit(props, "class", "variant", "size")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    data-slot="toggle-group-item"
    v-bind="forwarded"
    :class="cn(
      toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }),
      props.class
    )"
  >
    <slot />
  </ToggleGroupItem>
</template>
