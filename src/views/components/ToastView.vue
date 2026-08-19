<script setup lang="ts">
import { toast } from '@/components/ui/sonner'
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  RotateCcw,
  Sparkles,
  Zap,
  Clock,
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
        if (Math.random() > 0.3) {
          resolve({ name: 'pg-production-main' })
        } else {
          reject(new Error('Connection timeout'))
        }
      }, 2500)
    })

  toast.promise(simulatedDeploy, {
    loading: 'Provisioning dedicated Postgres replica in eu-central-1...',
    success: (data: { name: string }) => `Database replica ${data.name} is ready!`,
    error: 'Provisioning failed. Please retry in a few moments.',
  })
}

function showCustomToast() {
  toast('Telemetry Streaming Active', {
    description: 'WebSocket connection established with pg-metrics-live.',
    duration: 6000,
    cancel: {
      label: 'Dismiss',
      onClick: () => {},
    },
    action: {
      label: 'View Logs',
      onClick: () => {
        toast.info('Redirecting to telemetry logs...')
      },
    },
  })
}

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const semanticToastsSnippet = `<!-- Semantic Toast Notifications (Success, Error, Info, Warning) -->
<script setup lang="ts">
import { toast } from '@/components/ui/sonner'

// 1. Success Toast
function handleSuccess() {
  toast.success('Production deployment completed', {
    description: 'All 48 edge functions deployed and live in 12ms.',
  })
}

// 2. Error Toast
function handleError() {
  toast.error('SSL Certificate Renewal Failed', {
    description: 'DNS challenge failed for domain api.production.io.',
  })
}

// 3. Info Toast
function handleInfo() {
  toast.info('New CLI SDK available', {
    description: 'Antigravity CLI v2.4.0 is available.',
  })
}

// 4. Warning Toast
function handleWarning() {
  toast.warning('Approaching monthly compute quota', {
    description: 'You have used 85% of your allocated CPU credits.',
  })
}
<\/script>

<div class="flex flex-wrap gap-2.5">
  <Button variant="outline" size="sm" @click="handleSuccess">Success Toast</Button>
  <Button variant="outline" size="sm" @click="handleError">Error Toast</Button>
  <Button variant="outline" size="sm" @click="handleInfo">Info Toast</Button>
  <Button variant="outline" size="sm" @click="handleWarning">Warning Toast</Button>
</div>`

const promiseToastSnippet = `<!-- Promise Toast (Loading → Success / Error) -->
<script setup lang="ts">
import { toast } from '@/components/ui/sonner'

function deployReplica() {
  const asyncTask = () =>
    new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3
          ? resolve({ name: 'pg-production-main' })
          : reject(new Error('Timeout'))
      }, 2500)
    })

  toast.promise(asyncTask, {
    loading: 'Provisioning dedicated Postgres replica...',
    success: (data) => \`Database replica \${data.name} is ready!\`,
    error: 'Provisioning failed. Please retry in a few moments.',
  })
}
<\/script>

<Button size="sm" @click="deployReplica">
  Simulate Async Promise Toast
</Button>`

const actionToastSnippet = `<!-- Toast with Interactive Action & Undo Callbacks -->
<script setup lang="ts">
import { toast } from '@/components/ui/sonner'

function deleteRecord() {
  toast('Database snapshot deleted', {
    description: 'Snapshot snapshot-2026-03-01 moved to trash.',
    action: {
      label: 'Undo',
      onClick: () => {
        toast.success('Snapshot restored successfully!')
      },
    },
  })
}
<\/script>

<Button size="sm" variant="outline" @click="deleteRecord">
  Trigger Toast with Action
</Button>`

const customToastSnippet = `<!-- Multi-Action Toast with Action & Cancel Buttons -->
<script setup lang="ts">
import { toast } from '@/components/ui/sonner'

function showAdvancedToast() {
  toast('Telemetry Streaming Active', {
    description: 'WebSocket connection established with pg-metrics-live.',
    duration: 6000,
    cancel: {
      label: 'Dismiss',
      onClick: () => {},
    },
    action: {
      label: 'View Logs',
      onClick: () => toast.info('Redirecting to telemetry logs...'),
    },
  })
}
<\/script>

<Button size="sm" variant="secondary" @click="showAdvancedToast">
  Multi-Action Toast
</Button>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Toast Notifications"
      description="Lightweight, accessible toast feedback powered by Vue Sonner and styled with OKLCH design tokens."
      badge="Component Showcase"
    />

    <!-- 1. Semantic Toast Variants -->
    <CodePreview
      title="Semantic Toast Variants"
      description="Standard notification callouts featuring contextual icons, status colors, and optional multi-line descriptions."
      :code="semanticToastsSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" class="text-xs gap-1.5" @click="showDefaultToast">
            <Sparkles class="h-3.5 w-3.5" />
            Default Toast
          </Button>
          <Button variant="outline" size="sm" class="text-xs gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700" @click="showSuccessToast">
            <CheckCircle2 class="h-3.5 w-3.5" />
            Success Toast
          </Button>
          <Button variant="outline" size="sm" class="text-xs gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700" @click="showInfoToast">
            <Info class="h-3.5 w-3.5" />
            Info Toast
          </Button>
          <Button variant="outline" size="sm" class="text-xs gap-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700" @click="showWarningToast">
            <AlertTriangle class="h-3.5 w-3.5" />
            Warning Toast
          </Button>
          <Button variant="outline" size="sm" class="text-xs gap-1.5 text-red-600 dark:text-red-400 hover:text-red-700" @click="showErrorToast">
            <AlertCircle class="h-3.5 w-3.5" />
            Error Toast
          </Button>
        </div>
        <p class="text-xs text-muted-foreground">
          Click any button above to trigger an animated toast notification in the corner of your screen.
        </p>
      </div>
    </CodePreview>

    <!-- 2. Promise Toast -->
    <CodePreview
      title="Promise Toast (Async Loading State)"
      description="Automatically tracks an asynchronous Promise and transitions from a pending spinner to success or error."
      :code="promiseToastSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <Button size="sm" class="gap-1.5" @click="showPromiseToast">
            <Zap class="h-3.5 w-3.5" />
            Simulate Async Provisioning
          </Button>
        </div>
        <p class="text-xs text-muted-foreground">
          Simulates a 2.5-second async cloud provisioning task with live loading, success, or fallback error states.
        </p>
      </div>
    </CodePreview>

    <!-- 3. Toast with Action Button -->
    <CodePreview
      title="Toast with Action Button"
      description="Toasts containing clickable action buttons, undo triggers, or custom navigation handlers."
      :code="actionToastSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" class="gap-1.5" @click="showActionToast">
            <RotateCcw class="h-3.5 w-3.5" />
            Delete Snapshot (with Undo)
          </Button>
        </div>
        <p class="text-xs text-muted-foreground">
          Clicking the Undo action inside the notification triggers a follow-up success confirmation.
        </p>
      </div>
    </CodePreview>

    <!-- 4. Advanced Multi-Action Toast -->
    <CodePreview
      title="Multi-Action & Custom Duration Toast"
      description="Extended notifications with custom timeout durations, primary action links, and explicit dismiss buttons."
      :code="customToastSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" class="gap-1.5" @click="showCustomToast">
            <Clock class="h-3.5 w-3.5" />
            Trigger 6-Second Telemetry Toast
          </Button>
        </div>
        <p class="text-xs text-muted-foreground">
          Features a 6-second auto-close duration alongside simultaneous "View Logs" and "Dismiss" controls.
        </p>
      </div>
    </CodePreview>
  </div>
</template>
