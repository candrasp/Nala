<script setup lang="ts">
import type { CollapsibleContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { CollapsibleContent } from "reka-ui"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    data-slot="collapsible-content"
    :class="cn('overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down', props.class)"
  >
    <slot />
  </CollapsibleContent>
</template>
