<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Dot } from "@lucide/vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Primitive
    data-slot="pin-input-separator"
    v-bind="props"
    :class="cn('text-muted-foreground flex items-center justify-center', props.class)"
  >
    <slot>
      <Dot class="size-4" />
    </slot>
  </Primitive>
</template>
