<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { ChevronDown } from "@lucide/vue"
import {
  AccordionHeader,
  AccordionTrigger,
} from "reka-ui"

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AccordionHeader class="flex" data-slot="accordion-header">
    <AccordionTrigger
      v-bind="props"
      data-slot="accordion-trigger"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-xs font-semibold transition-all hover:underline text-left cursor-pointer [&[data-state=open]>svg]:rotate-180 text-foreground',
          props.class
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown
          class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
