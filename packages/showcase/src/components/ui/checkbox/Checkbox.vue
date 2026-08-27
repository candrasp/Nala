<script setup lang="ts">
import type { CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Check } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends /* @vue-ignore */ CheckboxRootProps {
  class?: HTMLAttributes["class"]
  checked?: boolean | 'indeterminate'
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean | 'indeterminate'): void
  (e: 'update:checked', value: boolean | 'indeterminate'): void
}>()

const delegatedProps = reactiveOmit(props, "class", "checked", "modelValue")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const internalValue = computed({
  get: () => {
    if (props.checked !== undefined) {
      return props.checked
    }
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val as boolean | 'indeterminate')
    emits('update:checked', val as boolean | 'indeterminate')
  },
})
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    v-model="internalValue"
    :class="
      cn('peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-md border shadow-xs transition-shadow outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
         props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Check class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
