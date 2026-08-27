<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ToggleVariants } from "@/components/ui/toggle"
import { provide } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"
import { TOGGLE_GROUP_INJECTION_KEY } from "."

interface Props extends ToggleGroupRootProps {
  class?: HTMLAttributes["class"]
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
})

const emits = defineEmits<ToggleGroupRootEmits>()

provide(TOGGLE_GROUP_INJECTION_KEY, {
  variant: props.variant,
  size: props.size,
})

const delegatedProps = reactiveOmit(props, "class", "variant", "size")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    v-bind="forwarded"
    :class="cn('inline-flex items-center justify-center gap-1 rounded-md', props.class)"
  >
    <slot />
  </ToggleGroupRoot>
</template>
