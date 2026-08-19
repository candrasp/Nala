<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BadgeVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { badgeVariants } from "."

const props = defineProps<
  PrimitiveProps & {
    variant?: BadgeVariants["variant"]
    /** Shape scale: 'default' (rounded-md) | 'pill' (rounded-full) */
    shape?: BadgeVariants["shape"]
    /** Show a small colored status dot inside the badge */
    dot?: boolean
    /** Animate the dot with animate-pulse (requires dot=true) */
    pulse?: boolean
    class?: HTMLAttributes["class"]
  }
>()

const delegatedProps = reactiveOmit(props, "class", "dot", "pulse", "shape")
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(badgeVariants({ variant, shape }), props.class)"
    v-bind="delegatedProps"
  >
    <!-- Integrated status dot indicator -->
    <span
      v-if="dot"
      :class="cn('h-1.5 w-1.5 rounded-full bg-current shrink-0', pulse && 'animate-pulse')"
      aria-hidden="true"
    />
    <slot />
  </Primitive>
</template>
