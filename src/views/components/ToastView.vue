<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  RotateCcw,
  Sparkles,
  Zap,
} from '@lucide/vue'

// ─── Toast Trigger Handlers ───────────────────────────────────────────────────
function showDefaultToast() {
  toast('Database cluster initiated', {
    description: 'Instance pg-fra-01 is preparing in eu-central-1.',
  })
}

function showSuccessToast() {
  toast.success('Production deployment completed', {
    description: 'All 48 edge functions deployed and live in 12ms.',
  })
}

function showInfoToast() {
  toast.info('New CLI SDK available', {
    description: 'Antigravity CLI v2.4.0 is available. Run agy update to install.',
  })
}

function showWarningToast() {
  toast.warning('Approaching monthly compute quota', {
    description: 'You have used 85% of your allocated CPU credits for March.',
  })
}

function showErrorToast() {
  toast.error('SSL Certificate Renewal Failed', {
    description: 'DNS challenge failed for domain api.production.io.',
  })
}

function showActionToast() {
  toast('Database snapshot deleted', {
    description: 'Snapshot snapshot-2026-03-01 has been moved to trash.',
    action: {
      label: 'Undo',
      onClick: () => {
        toast.success('Snapshot restored successfully!')
      },
    },
  })
}

function showPromiseToast() {
  const simulatedDeploy = () =>
    new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve({ name: 'pg-production-main' })
        } else {
          reject(new Error('Connection timeout'))
        }
      }, 2500)
    })

  toast.promise(simulatedDeploy, {
    loading: 'Provisioning dedicated Postgres replica...',
    success: (data: { name: string }) => `Database replica ${data.name} is ready!`,
    error: 'Provisioning failed. Please retry in a few moments.',
  })
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
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Toast &amp; Notifications</h1>
        <p class="text-sm text-muted-foreground">
          Lightweight, accessible toast feedback powered by Vue Sonner and styled with Supabase design tokens.
        </p>
      </div>
    </div>

    <!-- Toast Triggers Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2">

      <!-- 1. Semantic Toast Variants -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Semantic Toast Variants</CardTitle>
          <CardDescription class="text-xs">Standard notifications with contextual icons and rich color accents.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 space-y-3">
          <div class="flex flex-wrap gap-2.5">
            <Button variant="outline" size="sm" class="text-xs gap-1.5" @click="showDefaultToast">
              <Sparkles class="h-3.5 w-3.5" />
              Default Toast
            </Button>
            <Button variant="outline" size="sm" class="text-xs gap-1.5 text-emerald-600 dark:text-emerald-400" @click="showSuccessToast">
              <CheckCircle2 class="h-3.5 w-3.5" />
              Success Toast
            </Button>
            <Button variant="outline" size="sm" class="text-xs gap-1.5 text-blue-600 dark:text-blue-400" @click="showInfoToast">
              <Info class="h-3.5 w-3.5" />
              Info Toast
            </Button>
          </div>

          <div class="flex flex-wrap gap-2.5 pt-1">
            <Button variant="outline" size="sm" class="text-xs gap-1.5 text-amber-600 dark:text-amber-400" @click="showWarningToast">
              <AlertTriangle class="h-3.5 w-3.5" />
              Warning Toast
            </Button>
            <Button variant="outline" size="sm" class="text-xs gap-1.5 text-red-600 dark:text-red-400" @click="showErrorToast">
              <AlertCircle class="h-3.5 w-3.5" />
              Error Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- 2. Interactive & Async Toasts -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Actions &amp; Async Promises</CardTitle>
          <CardDescription class="text-xs">Toasts featuring callback action buttons and live promise resolution.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 space-y-4">
          <div class="flex flex-wrap gap-3">
            <Button size="sm" class="text-xs gap-1.5" @click="showActionToast">
              <RotateCcw class="h-3.5 w-3.5" />
              Toast with Undo Action
            </Button>
            <Button variant="secondary" size="sm" class="text-xs gap-1.5" @click="showPromiseToast">
              <Zap class="h-3.5 w-3.5" />
              Async Promise Loading
            </Button>
          </div>

          <p class="text-[11px] text-muted-foreground leading-relaxed">
            Click <strong>Async Promise Loading</strong> to observe live pending, success, and error state transitions.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
