<script setup lang="ts">
import type { PinInputInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PinInputInput, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes["class"] }>()
const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PinInputInput
    data-slot="pin-input-input"
    v-bind="forwarded"
    :class="
      cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-sm font-mono font-medium shadow-xs transition-all outline-hidden focus:z-10 focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        props.class
      )
    "
  />
</template>
