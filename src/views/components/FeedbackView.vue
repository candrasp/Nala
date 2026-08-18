<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertCircle,
  CheckCircle2,
  Info,
  RefreshCw,
  Terminal,
} from '@lucide/vue'

const showLoadingSkeleton = ref(true)

function toggleLoading() {
  showLoadingSkeleton.value = true
  setTimeout(() => {
    showLoadingSkeleton.value = false
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Component Showcase</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Feedback & Loading</h1>
        <p class="text-sm text-muted-foreground">
          Alert callouts, live pulse radar indicators, shimmer badges, and skeleton loading state placeholders.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0">
        <Button size="sm" variant="outline" @click="toggleLoading" class="gap-1.5">
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': showLoadingSkeleton }" />
          Simulate Loading (2s)
        </Button>
      </div>
    </div>

    <!-- 1. Live Pulse Radar Status Dots -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Live Pulse Radar Status Dots</CardTitle>
        <CardDescription>
          Subtle animated radar pulses (.status-dot) for displaying real-time system metrics, cluster health, and websocket states.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
            <div class="space-y-1">
              <span class="label-mono">PostgreSQL API</span>
              <p class="text-sm font-semibold text-foreground">Operational</p>
            </div>
            <span class="status-dot"></span>
          </div>

          <div class="p-4 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
            <div class="space-y-1">
              <span class="label-mono">Replication Node</span>
              <p class="text-sm font-semibold text-foreground">High Latency</p>
            </div>
            <span class="status-dot status-dot-amber"></span>
          </div>

          <div class="p-4 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
            <div class="space-y-1">
              <span class="label-mono">Auth Service</span>
              <p class="text-sm font-semibold text-foreground">Syncing Schema</p>
            </div>
            <span class="status-dot status-dot-blue"></span>
          </div>

          <div class="p-4 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
            <div class="space-y-1">
              <span class="label-mono">Staging Cluster</span>
              <p class="text-sm font-semibold text-foreground">Offline</p>
            </div>
            <span class="status-dot status-dot-red"></span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 2. Alert Callouts -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Alert Callout Messages</CardTitle>
        <CardDescription>
          Contextual notification banners for operational warnings, critical errors, and success updates.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <!-- Default / Info Alert -->
        <Alert>
          <Info class="h-4 w-4 text-primary" />
          <AlertTitle class="font-semibold">Automatic Point-In-Time Backup Scheduled</AlertTitle>
          <AlertDescription class="text-xs text-muted-foreground">
            A routine daily backup snapshot will begin tonight at 02:00 UTC. No downtime is expected.
          </AlertDescription>
        </Alert>

        <!-- Destructive Alert -->
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle class="font-semibold">Connection Pool Limit Exceeded</AlertTitle>
          <AlertDescription class="text-xs">
            Cluster eu-central-1 has reached 98% maximum concurrent client connections. Consider upgrading your PgBouncer pool size.
          </AlertDescription>
        </Alert>

        <!-- Terminal / Code Alert -->
        <Alert class="border-border bg-muted/40 font-mono">
          <Terminal class="h-4 w-4 text-muted-foreground" />
          <AlertTitle class="text-xs font-semibold text-foreground">CLI Migrations Ready</AlertTitle>
          <AlertDescription class="text-xs text-muted-foreground">
            Run <code class="text-foreground bg-muted px-1.5 py-0.5 rounded border">supabase db push</code> to apply 3 pending schema migrations.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>

    <!-- 3. Skeleton Loading State Placeholders -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Skeleton Loading Placeholders</CardTitle>
        <CardDescription>
          Animated placeholder shapes that minimize perceived latency while waiting for async API responses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="showLoadingSkeleton" class="space-y-4">
          <!-- Card Skeleton -->
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-62.5" />
              <Skeleton class="h-4 w-50" />
            </div>
          </div>

          <!-- Table Rows Skeleton -->
          <div class="space-y-2 pt-4">
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
        </div>

        <div v-else class="p-6 rounded-lg border border-border bg-muted/20 flex items-center justify-between">
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
      </CardContent>
    </Card>
  </div>
</template>
