<script setup lang="ts">
import { ref } from 'vue'
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  RefreshCw,
  Loader2,
  Zap,
} from '@lucide/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

const showLoadingSkeleton = ref(true)
const progressValue = ref(65)
const isAsyncSubmitting = ref(false)

function simulateLoading() {
  showLoadingSkeleton.value = true
  setTimeout(() => {
    showLoadingSkeleton.value = false
  }, 2000)
}

function simulateSubmit() {
  isAsyncSubmitting.value = true
  setTimeout(() => {
    isAsyncSubmitting.value = false
  }, 2000)
}

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const alertBannersSnippet = `<!-- Semantic Alert Banners (Info, Success, Warning, Destructive) -->

<!-- Info Banner -->
<Alert variant="info">
  <Info class="h-4 w-4" />
  <AlertTitle class="font-semibold">Automatic Backup Scheduled</AlertTitle>
  <AlertDescription class="text-xs">
    A routine snapshot will begin tonight at 02:00 UTC with zero downtime.
  </AlertDescription>
</Alert>

<!-- Success Banner -->
<Alert variant="success">
  <CheckCircle2 class="h-4 w-4" />
  <AlertTitle class="font-semibold">Database Migration Completed</AlertTitle>
  <AlertDescription class="text-xs">
    3 schema updates applied successfully across all read replicas.
  </AlertDescription>
</Alert>

<!-- Warning Banner -->
<Alert variant="warning">
  <AlertTriangle class="h-4 w-4" />
  <AlertTitle class="font-semibold">Connection Threshold Warning</AlertTitle>
  <AlertDescription class="text-xs">
    Cluster pool usage is at 84%. Consider scaling PgBouncer compute.
  </AlertDescription>
</Alert>

<!-- Destructive Banner -->
<Alert variant="destructive">
  <AlertCircle class="h-4 w-4" />
  <AlertTitle class="font-semibold">Replica Synchronization Failed</AlertTitle>
  <AlertDescription class="text-xs">
    Node eu-central-1c is unresponsive. Traffic routed to secondary failover.
  </AlertDescription>
</Alert>`

const skeletonSnippet = `<!-- Skeleton Loading Placeholders -->
<div v-if="isLoading" class="space-y-4">
  <!-- Profile / Avatar Skeleton -->
  <div class="flex items-center space-x-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-48" />
      <Skeleton class="h-3 w-32" />
    </div>
  </div>

  <!-- Content & Text Line Skeletons -->
  <div class="space-y-2 pt-2">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-5/6" />
    <Skeleton class="h-4 w-3/4" />
  </div>

  <!-- Table Row Skeletons -->
  <div class="space-y-2 pt-2">
    <Skeleton class="h-10 w-full" />
    <Skeleton class="h-10 w-full" />
  </div>
</div>`

const progressBarSnippet = `<!-- Progress Bars (Determinate & Indeterminate) -->

<!-- Determinate Progress with Value -->
<div class="space-y-1.5">
  <div class="flex justify-between text-xs font-mono">
    <span>Storage Capacity</span>
    <span>65%</span>
  </div>
  <Progress :model-value="65" />
</div>

<!-- High-Load Progress (Color Variant) -->
<div class="space-y-1.5">
  <div class="flex justify-between text-xs font-mono">
    <span>Memory Allocation</span>
    <span class="text-amber-500 font-semibold">88%</span>
  </div>
  <Progress :model-value="88" class="[&>[data-slot=progress-indicator]]:bg-amber-500" />
</div>

<!-- Indeterminate Animated Bar -->
<div class="space-y-1.5">
  <div class="flex justify-between text-xs font-mono">
    <span>Synchronizing Nodes...</span>
  </div>
  <div class="relative h-2 w-full overflow-hidden rounded-full bg-muted">
    <div class="h-full w-1/3 rounded-full bg-primary animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
</div>`

const spinnersSnippet = `<!-- Spinner & Loading Indicators -->

<!-- Button with Async Loading State -->
<Button :disabled="isSubmitting" @click="handleSubmit">
  <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin mr-2" />
  {{ isSubmitting ? 'Synchronizing...' : 'Save Configuration' }}
</Button>

<!-- Spinner Sizes Scale -->
<div class="flex items-center gap-4">
  <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
  <Loader2 class="h-6 w-6 animate-spin text-primary" />
  <Loader2 class="h-8 w-8 animate-spin text-primary" />
</div>

<!-- Live Pulse Radar Status Dots -->
<div class="flex items-center gap-4">
  <span class="status-dot" title="Operational"></span>
  <span class="status-dot status-dot-amber" title="High Latency"></span>
  <span class="status-dot status-dot-blue" title="Syncing"></span>
  <span class="status-dot status-dot-red" title="Offline"></span>
</div>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Feedback & Loading"
      description="Contextual alert banners, progress bars, shimmer skeleton placeholders, and animated loading spinners."
      badge="Component Showcase"
    >
      <template #actions>
        <Button size="sm" variant="outline" class="gap-1.5" @click="simulateLoading">
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': showLoadingSkeleton }" />
          Simulate Loading (2s)
        </Button>
      </template>
    </PageHeader>

    <!-- 1. Alert Banners -->
    <CodePreview
      title="Alert Banners (Info, Success, Warning, Destructive)"
      description="Semantic contextual banners for operational updates, warnings, errors, and success confirmations."
      :code="alertBannersSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Info Alert -->
        <Alert variant="info">
          <Info class="h-4 w-4" />
          <AlertTitle class="font-semibold">Automatic Backup Scheduled</AlertTitle>
          <AlertDescription class="text-xs">
            A routine daily snapshot will begin tonight at 02:00 UTC with zero downtime.
          </AlertDescription>
        </Alert>

        <!-- Success Alert -->
        <Alert variant="success">
          <CheckCircle2 class="h-4 w-4" />
          <AlertTitle class="font-semibold">Database Migration Completed</AlertTitle>
          <AlertDescription class="text-xs">
            3 schema migrations applied successfully across all read replicas.
          </AlertDescription>
        </Alert>

        <!-- Warning Alert -->
        <Alert variant="warning">
          <AlertTriangle class="h-4 w-4" />
          <AlertTitle class="font-semibold">Connection Threshold Warning</AlertTitle>
          <AlertDescription class="text-xs">
            Cluster pool usage is at 84%. Consider scaling your PgBouncer compute instance.
          </AlertDescription>
        </Alert>

        <!-- Destructive Alert -->
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle class="font-semibold">Replica Synchronization Failed</AlertTitle>
          <AlertDescription class="text-xs">
            Node eu-central-1c is unresponsive. Traffic routed to secondary failover.
          </AlertDescription>
        </Alert>
      </div>
    </CodePreview>

    <!-- 2. Skeleton Loaders -->
    <CodePreview
      title="Skeleton Loaders"
      description="Shimmer placeholder shapes that mimic the layout while asynchronous data or API requests are resolving."
      :code="skeletonSnippet"
    >
      <div v-if="showLoadingSkeleton" class="space-y-6">
        <!-- Avatar & Heading Skeleton -->
        <div class="flex items-center space-x-4">
          <Skeleton class="h-12 w-12 rounded-full" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-48" />
            <Skeleton class="h-3 w-32" />
          </div>
        </div>

        <!-- Text Block Skeleton -->
        <div class="space-y-2">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-5/6" />
          <Skeleton class="h-4 w-2/3" />
        </div>

        <!-- Table Row Skeletons -->
        <div class="space-y-2 pt-2">
          <Skeleton class="h-10 w-full rounded-md" />
          <Skeleton class="h-10 w-full rounded-md" />
          <Skeleton class="h-10 w-full rounded-md" />
        </div>
      </div>

      <div v-else class="p-6 rounded-lg border border-border bg-muted/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold text-foreground">Real-time Data Loaded</p>
            <p class="text-xs text-muted-foreground">All cluster telemetry metrics synchronized successfully.</p>
          </div>
        </div>
        <Button size="sm" variant="outline" @click="showLoadingSkeleton = true">
          Show Skeletons Again
        </Button>
      </div>
    </CodePreview>

    <!-- 3. Progress Bars -->
    <CodePreview
      title="Progress Bars"
      description="Determinate percentage indicators, high-capacity color variants, and animated indeterminate loaders."
      :code="progressBarSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Determinate Progress -->
        <div class="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-muted-foreground">Disk Storage</span>
              <span class="font-semibold text-foreground">{{ progressValue }}%</span>
            </div>
            <Progress :model-value="progressValue" />
          </div>

          <div class="flex items-center gap-2 pt-2">
            <Button size="xs" variant="outline" @click="progressValue = Math.max(0, progressValue - 15)">-15%</Button>
            <Button size="xs" variant="outline" @click="progressValue = Math.min(100, progressValue + 15)">+15%</Button>
            <Button size="xs" variant="secondary" @click="progressValue = 100">Complete</Button>
          </div>
        </div>

        <!-- High-Capacity & Warning Bars -->
        <div class="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-muted-foreground">Memory Usage</span>
              <span class="text-amber-500 font-semibold">88%</span>
            </div>
            <Progress :model-value="88" class="*:data-[slot=progress-indicator]:bg-amber-500" />
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-muted-foreground">CPU Load</span>
              <span class="text-red-500 font-semibold">96%</span>
            </div>
            <Progress :model-value="96" class="*:data-[slot=progress-indicator]:bg-red-500" />
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 4. Spinners & Status Indicators -->
    <CodePreview
      title="Spinners & Live Pulse Indicators"
      description="Animated SVG spinners with sizing scale, asynchronous button triggers, and radar pulse status dots."
      :code="spinnersSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Button with Async Spinner -->
        <div class="p-4 rounded-lg border border-border bg-muted/10 space-y-3">
          <span class="label-mono">Interactive Button</span>
          <div>
            <Button :disabled="isAsyncSubmitting" class="gap-1.5 w-full" @click="simulateSubmit">
              <Loader2 v-if="isAsyncSubmitting" class="h-3.5 w-3.5 animate-spin" />
              <Zap v-else class="h-3.5 w-3.5" />
              {{ isAsyncSubmitting ? 'Provisioning...' : 'Provision Server' }}
            </Button>
          </div>
        </div>

        <!-- Sizing Scale -->
        <div class="p-4 rounded-lg border border-border bg-muted/10 space-y-3">
          <span class="label-mono">Spinner Scale</span>
          <div class="flex items-center justify-around pt-2">
            <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
            <Loader2 class="h-6 w-6 animate-spin text-primary" />
            <Loader2 class="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>

        <!-- Status Dots -->
        <div class="p-4 rounded-lg border border-border bg-muted/10 space-y-3">
          <span class="label-mono">Radar Status Dots</span>
          <div class="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div class="flex items-center gap-2">
              <span class="status-dot"></span>
              <span>Online</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="status-dot status-dot-amber"></span>
              <span>Degraded</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="status-dot status-dot-blue"></span>
              <span>Syncing</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="status-dot status-dot-red"></span>
              <span>Outage</span>
            </div>
          </div>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
