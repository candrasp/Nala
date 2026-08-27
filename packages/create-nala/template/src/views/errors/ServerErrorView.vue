<script setup lang="ts">
import {
  ServerCrash,
  RefreshCw,
  Home,
  Activity,
  Copy,
  Check,
} from '@lucide/vue'

const isReloading = ref(false)
const copiedTrace = ref(false)
const traceId = ref('req_8f19da240b91_fra')

const handleReload = () => {
  isReloading.value = true
  setTimeout(() => {
    window.location.reload()
  }, 600)
}

const copyTraceId = () => {
  navigator.clipboard.writeText(traceId.value)
  copiedTrace.value = true
  setTimeout(() => {
    copiedTrace.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4 text-center sm:p-8">
    <div class="w-full max-w-lg space-y-6">
      <!-- Icon & Status Badge -->
      <div class="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-8 ring-amber-500/5">
        <ServerCrash class="h-12 w-12" />
        <span class="absolute -bottom-2.5 rounded-full bg-amber-600 text-white px-3 py-0.5 text-[11px] font-bold tracking-wider uppercase shadow-xs">
          500 Error
        </span>
      </div>

      <!-- Main Copy -->
      <div class="space-y-2">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Internal Server Error
        </h1>
        <p class="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Our gateway encountered an unexpected exception while processing this request. Our engineering team has been automatically notified.
        </p>
      </div>

      <!-- Diagnostic Trace ID Card -->
      <div class="rounded-xl border border-border bg-card p-3 max-w-sm mx-auto flex items-center justify-between text-xs font-mono shadow-2xs">
        <div class="flex items-center gap-2 text-muted-foreground">
          <span class="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Trace:</span>
          <span class="text-foreground font-semibold">{{ traceId }}</span>
        </div>
        <button
          type="button"
          @click="copyTraceId"
          class="text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-1"
          title="Copy Trace ID"
        >
          <Check v-if="copiedTrace" class="h-3.5 w-3.5 text-emerald-500" />
          <Copy v-else class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-col gap-2.5 sm:flex-row sm:justify-center pt-2">
        <Button
          variant="outline"
          class="gap-2 cursor-pointer"
          :disabled="isReloading"
          @click="handleReload"
        >
          <RefreshCw class="h-4 w-4" :class="{ 'animate-spin': isReloading }" />
          {{ isReloading ? 'Reloading...' : 'Try Again' }}
        </Button>
        <Button as-child class="gap-2 cursor-pointer">
          <router-link to="/">
            <Home class="h-4 w-4" />
            Back to Dashboard
          </router-link>
        </Button>
      </div>

      <!-- System Health Hint -->
      <div class="pt-6 border-t border-border/60">
        <div class="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Activity class="h-3.5 w-3.5 text-emerald-500" />
          <span>All global systems are operating nominally.</span>
          <router-link to="/components/charts" class="font-medium text-primary hover:underline transition-colors">
            View Status
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
