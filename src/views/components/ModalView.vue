<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Trash2,
  AlertTriangle,
  Sparkles,
  Plus,
  Server,
  Layers,
  ScrollText,
  CheckCircle2,
} from '@lucide/vue'

// Dialog open states
const isFormDialogOpen = ref(false)
const isLargeDialogOpen = ref(false)
const isScrollableOpen = ref(false)
const projectName = ref('')
const projectDesc = ref('')
const isCreating = ref(false)
const isCreated = ref(false)

function handleCreateProject() {
  isCreating.value = true
  setTimeout(() => {
    isCreating.value = false
    isCreated.value = true
    setTimeout(() => {
      isCreated.value = false
      isFormDialogOpen.value = false
      projectName.value = ''
      projectDesc.value = ''
    }, 1200)
  }, 1000)
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
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Modals & Dialogs</h1>
        <p class="text-sm text-muted-foreground">
          Accessible overlay dialogs, confirmation alerts, action modals, and scrollable sheets powered by Reka UI.
        </p>
      </div>
    </div>

    <!-- 1. Standard Interactive Dialogs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Create Resource Modal -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Form Action Dialog</CardTitle>
          <CardDescription>
            Clean modal containing interactive form inputs, validation, and action buttons.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-xs text-muted-foreground">
            Click the button below to open a modal form with focus management and backdrop blur.
          </p>

          <Dialog v-model:open="isFormDialogOpen">
            <DialogTrigger as-child>
              <Button class="gap-1.5">
                <Plus class="h-3.5 w-3.5" />
                Create New Database
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-120">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                  <Server class="h-4 w-4 text-primary" />
                  Create Production Database
                </DialogTitle>
                <DialogDescription>
                  Configure your new PostgreSQL instance on the Supabase cloud infrastructure.
                </DialogDescription>
              </DialogHeader>

              <div class="space-y-4 py-2">
                <div class="space-y-1.5">
                  <Label for="db-name">Database Name</Label>
                  <Input id="db-name" v-model="projectName" placeholder="production-db-cluster" />
                </div>
                <div class="space-y-1.5">
                  <Label for="db-desc">Notes / Tags</Label>
                  <Textarea id="db-desc" v-model="projectDesc" rows="3" placeholder="Primary database for API service..." />
                </div>
              </div>

              <DialogFooter>
                <DialogClose as-child>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button :disabled="!projectName || isCreating" @click="handleCreateProject" class="gap-1.5">
                  <CheckCircle2 v-if="isCreated" class="h-3.5 w-3.5" />
                  <Sparkles v-else class="h-3.5 w-3.5" />
                  {{ isCreated ? 'Created!' : isCreating ? 'Provisioning...' : 'Provision Database' }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <!-- Confirmation Alert Dialog (Destructive) -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Confirmation Alert Dialog</CardTitle>
          <CardDescription>
            High-friction modal designed for critical, irreversible actions like deleting records.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-xs text-muted-foreground">
            Prompts user confirmation before performing destructive API requests.
          </p>

          <div class="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="destructive" class="gap-1.5">
                  <Trash2 class="h-3.5 w-3.5" />
                  Delete Project
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div class="flex items-center gap-2 text-destructive">
                    <AlertTriangle class="h-5 w-5" />
                    <AlertDialogTitle>Delete this database permanently?</AlertDialogTitle>
                  </div>
                  <AlertDialogDescription class="text-sm">
                    This action cannot be undone. This will permanently delete your cluster, all tables, triggers, and automated backups from AWS eu-central-1.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-white">
                    Yes, Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 2. Large & Scrollable Modals -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Scrollable Terms / Log Dialog -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Scrollable Content Dialog</CardTitle>
          <CardDescription>
            Modal with long content and fixed header/footer for agreements, logs, or policies.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-xs text-muted-foreground">
            Ensures proper viewport scrolling without breaking mobile keyboard boundaries.
          </p>

          <Dialog v-model:open="isScrollableOpen">
            <DialogTrigger as-child>
              <Button variant="outline" class="gap-1.5">
                <ScrollText class="h-3.5 w-3.5" />
                View SLA Agreement
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-137.5 max-h-[85vh] flex flex-col p-0 overflow-hidden">
              <DialogHeader class="p-6 pb-2 border-b border-border">
                <DialogTitle>Enterprise Service Level Agreement</DialogTitle>
                <DialogDescription>
                  Updated terms regarding 99.99% database uptime and failover guarantees.
                </DialogDescription>
              </DialogHeader>

              <div class="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed text-muted-foreground">
                <h4 class="text-sm font-semibold text-foreground">1. Uptime Commitment</h4>
                <p>
                  Supabase commits to providing 99.99% multi-region database cluster availability during any monthly billing cycle. In the event of an unplanned failover event, replicas in alternate availability zones will take over master traffic within 5 seconds.
                </p>
                <h4 class="text-sm font-semibold text-foreground">2. Point-in-Time Recovery (PITR)</h4>
                <p>
                  Write-ahead logs (WAL) are streamed continuously to encrypted cloud storage with a 1-second Recovery Point Objective (RPO) and 15-minute Recovery Time Objective (RTO).
                </p>
                <h4 class="text-sm font-semibold text-foreground">3. Security Compliance & Audits</h4>
                <p>
                  All underlying server hardware conforms to SOC2 Type II, ISO 27001, and HIPAA compliance frameworks with AES-256 data-at-rest encryption.
                </p>
                <h4 class="text-sm font-semibold text-foreground">4. Support Response Times</h4>
                <p>
                  Priority 1 tickets receive dedicated response from site reliability engineers within 15 minutes, 24 hours a day, 365 days a year.
                </p>
              </div>

              <DialogFooter class="p-4 border-t border-border bg-muted/20">
                <DialogClose as-child>
                  <Button variant="default">I Understand</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <!-- Multi-Step / Large Size Dialog -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Wide Architecture Dialog</CardTitle>
          <CardDescription>
            Expanded width modal (up to 700px) for analytics graphs or complex tables.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-xs text-muted-foreground">
            Spacious modal width with balanced grid layout for detailed configuration.
          </p>

          <Dialog v-model:open="isLargeDialogOpen">
            <DialogTrigger as-child>
              <Button variant="secondary" class="gap-1.5">
                <Layers class="h-3.5 w-3.5" />
                Cluster Topology
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-170">
              <DialogHeader>
                <DialogTitle>Cluster Topology & Scaling</DialogTitle>
                <DialogDescription>
                  Overview of current load-balanced nodes across Europe zones.
                </DialogDescription>
              </DialogHeader>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
                <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="label-mono">Primary Node</span>
                    <span class="status-dot"></span>
                  </div>
                  <p class="text-sm font-semibold text-foreground">eu-central-1a</p>
                  <p class="text-xs text-muted-foreground">16 vCPU • 64GB RAM</p>
                </div>
                <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="label-mono">Read Replica 1</span>
                    <span class="status-dot"></span>
                  </div>
                  <p class="text-sm font-semibold text-foreground">eu-central-1b</p>
                  <p class="text-xs text-muted-foreground">8 vCPU • 32GB RAM</p>
                </div>
                <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="label-mono">Read Replica 2</span>
                    <span class="status-dot"></span>
                  </div>
                  <p class="text-sm font-semibold text-foreground">eu-central-1c</p>
                  <p class="text-xs text-muted-foreground">8 vCPU • 32GB RAM</p>
                </div>
              </div>

              <DialogFooter>
                <DialogClose as-child>
                  <Button variant="outline">Close Overview</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
