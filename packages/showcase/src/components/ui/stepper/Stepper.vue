<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface Step {
  id: number | string
  title: string
  description?: string
}

interface Props {
  steps: Step[]
  modelValue: number
  class?: HTMLAttributes["class"]
  orientation?: "horizontal" | "vertical"
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void
}>()

const setStep = (stepIndex: number) => {
  emit("update:modelValue", stepIndex)
}
</script>

<template>
  <div
    data-slot="stepper"
    :class="
      cn(
        'w-full',
        orientation === 'horizontal' ? 'flex items-center justify-between' : 'flex flex-col gap-4',
        props.class
      )
    "
  >
    <div
      v-for="(step, index) in steps"
      :key="step.id"
      class="flex items-center flex-1 last:flex-none relative"
      :class="orientation === 'vertical' ? 'flex-col items-start' : ''"
    >
      <!-- Step Trigger -->
      <button
        type="button"
        @click="setStep(index + 1)"
        class="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
      >
        <!-- Step Indicator Circle -->
        <span
          class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold font-mono transition-all duration-300 shadow-2xs"
          :class="[
            index + 1 < modelValue
              ? 'bg-primary text-primary-foreground'
              : index + 1 === modelValue
              ? 'bg-primary/10 text-primary border-2 border-primary ring-4 ring-primary/10'
              : 'border border-border bg-muted/40 text-muted-foreground group-hover:border-muted-foreground/50'
          ]"
        >
          <!-- Checkmark for completed -->
          <svg
            v-if="index + 1 < modelValue"
            class="h-4 w-4 stroke-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </span>

        <!-- Step Labels -->
        <div class="space-y-0.5">
          <p
            class="text-xs font-medium transition-colors"
            :class="[
              index + 1 <= modelValue ? 'text-foreground font-semibold' : 'text-muted-foreground'
            ]"
          >
            {{ step.title }}
          </p>
          <p v-if="step.description" class="text-[11px] text-muted-foreground hidden sm:block">
            {{ step.description }}
          </p>
        </div>
      </button>

      <!-- Connecting Separator Line (if not last) -->
      <div
        v-if="index < steps.length - 1 && orientation === 'horizontal'"
        class="flex-1 mx-3 h-0.5 transition-colors duration-300"
        :class="index + 1 < modelValue ? 'bg-primary' : 'bg-border'"
      />
    </div>
  </div>
</template>
