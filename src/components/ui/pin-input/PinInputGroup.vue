<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Primitive
    data-slot="pin-input-group"
    v-bind="props"
    :class="cn('flex items-center gap-2', props.class)"
  >
    <slot />
  </Primitive>
</template>
