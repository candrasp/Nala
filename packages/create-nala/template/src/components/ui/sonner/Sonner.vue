<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CheckCircle2, Info, Loader2, AlertCircle, AlertTriangle } from "@lucide/vue"
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<ToasterProps>(), {
  position: "top-right",
  richColors: false,
})

const defaultToastOptions = {
  classes: {
    toast:
      'group toast flex items-center gap-3 w-full bg-card/95 text-foreground border border-border/80 shadow-lg backdrop-blur-md px-4 py-3 rounded-lg text-xs transition-all',
    title: 'text-xs font-semibold text-foreground tracking-tight',
    description: '!text-zinc-600 dark:!text-zinc-300 text-[11.5px] leading-relaxed mt-0.5 font-normal',
    actionButton:
      'bg-primary text-primary-foreground text-[11px] font-medium px-2.5 py-1 rounded shadow-2xs hover:bg-primary/90 transition-colors',
    cancelButton:
      'bg-muted text-muted-foreground text-[11px] font-medium px-2.5 py-1 rounded hover:bg-muted/80 transition-colors',
    success:
      '!border-emerald-500/30 !bg-emerald-500/[0.04] dark:!bg-emerald-950/[0.2] !text-foreground',
    info:
      '!border-blue-500/30 !bg-blue-500/[0.04] dark:!bg-blue-950/[0.2] !text-foreground',
    warning:
      '!border-amber-500/30 !bg-amber-500/[0.04] dark:!bg-amber-950/[0.2] !text-foreground',
    error:
      '!border-rose-500/30 !bg-rose-500/[0.04] dark:!bg-rose-950/[0.2] !text-foreground',
  },
}

const computedToastOptions = computed(() => ({
  ...defaultToastOptions,
  ...props.toastOptions,
  classes: {
    ...defaultToastOptions.classes,
    ...props.toastOptions?.classes,
  },
}))
</script>

<template>
  <Sonner
    v-bind="props"
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    :toast-options="computedToastOptions"
    :close-button="false"
  >
    <template #success-icon>
      <CheckCircle2 class="h-4 w-4 text-emerald-500 shrink-0" />
    </template>
    <template #info-icon>
      <Info class="h-4 w-4 text-blue-500 shrink-0" />
    </template>
    <template #warning-icon>
      <AlertTriangle class="h-4 w-4 text-amber-500 shrink-0" />
    </template>
    <template #error-icon>
      <AlertCircle class="h-4 w-4 text-rose-500 shrink-0" />
    </template>
    <template #loading-icon>
      <Loader2 class="h-4 w-4 text-primary animate-spin shrink-0" />
    </template>
  </Sonner>
</template>
