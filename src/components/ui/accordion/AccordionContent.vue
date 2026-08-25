<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { AccordionContent } from "reka-ui"

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AccordionContent
    v-bind="props"
    data-slot="accordion-content"
    class="overflow-hidden text-xs data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pb-4 pt-0 text-muted-foreground leading-relaxed', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
