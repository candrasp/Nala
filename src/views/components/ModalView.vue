<script setup lang="ts">
import { ref } from 'vue'
import {
  Trash2,
  AlertTriangle,
  Sparkles,
  Plus,
  Server,
  Layers,
  ScrollText,
  CheckCircle2,
  Settings,
  PanelRight,
} from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

// Dialog open states
const isFormDialogOpen = ref(false)
const isScrollableOpen = ref(false)
const isLargeDialogOpen = ref(false)
const isSheetOpen = ref(false)
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

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const basicDialogSnippet = `<!-- Basic Information Dialog -->
<Dialog>
  <DialogTrigger as-child>
    <Button variant="secondary">View Architecture</Button>
  </DialogTrigger>
  <DialogContent class="sm:max-w-170">
    <DialogHeader>
      <DialogTitle>Cluster Topology & Scaling</DialogTitle>
      <DialogDescription>
        Overview of current load-balanced nodes across Europe zones.
      </DialogDescription>
    </DialogHeader>

    <!-- Content grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
      <div class="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
        <span class="label-mono">Primary Node</span>
        <p class="text-sm font-semibold">eu-central-1a</p>
        <p class="text-xs text-muted-foreground">16 vCPU · 64GB RAM</p>
      </div>
    </div>

    <DialogFooter>
      <DialogClose as-child>
        <Button variant="outline">Close Overview</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const alertDialogSnippet = `<!-- Confirmation Alert Dialog (Destructive) -->
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
        This action cannot be undone. This will permanently delete your
        cluster, all tables, triggers, and automated backups.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction class="bg-destructive hover:bg-destructive/90 text-white">
        Yes, Delete Everything
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

const formDialogSnippet = `<!-- Form in Dialog -->
<script setup lang="ts">
const isOpen = ref(false)
const projectName = ref('')
const isCreating = ref(false)
const isCreated = ref(false)

function handleCreate() {
  isCreating.value = true
  setTimeout(() => {
    isCreating.value = false
    isCreated.value = true
    setTimeout(() => { isOpen.value = false }, 1200)
  }, 1000)
}
<\/script>

<Dialog v-model:open="isOpen">
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
        Configure your new PostgreSQL instance on the Supabase cloud.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4 py-2">
      <div class="space-y-1.5">
        <Label for="db-name">Database Name</Label>
        <Input id="db-name" v-model="projectName" placeholder="production-db-cluster" />
      </div>
      <div class="space-y-1.5">
        <Label for="db-desc">Notes / Tags</Label>
        <Textarea id="db-desc" :rows="3" placeholder="Primary database for API service..." />
      </div>
    </div>

    <DialogFooter>
      <DialogClose as-child>
        <Button variant="outline" type="button">Cancel</Button>
      </DialogClose>
      <Button :disabled="!projectName || isCreating" @click="handleCreate" class="gap-1.5">
        <CheckCircle2 v-if="isCreated" class="h-3.5 w-3.5" />
        <Sparkles v-else class="h-3.5 w-3.5" />
        {{ isCreated ? 'Created!' : isCreating ? 'Provisioning...' : 'Provision Database' }}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const scrollableDialogSnippet = `<!-- Scrollable Content Dialog (fixed header/footer + scrollable body) -->
<Dialog>
  <DialogTrigger as-child>
    <Button variant="outline" class="gap-1.5">
      <ScrollText class="h-3.5 w-3.5" />
      View SLA Agreement
    </Button>
  </DialogTrigger>

  <!-- Key: flex flex-col + max-h + overflow-hidden on DialogContent -->
  <DialogContent class="sm:max-w-137.5 max-h-[85vh] flex flex-col p-0 overflow-hidden">
    <!-- Fixed Header -->
    <DialogHeader class="p-6 pb-2 border-b border-border">
      <DialogTitle>Enterprise Service Level Agreement</DialogTitle>
      <DialogDescription>Updated terms — 99.99% uptime guarantees.</DialogDescription>
    </DialogHeader>

    <!-- Scrollable Body -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed text-muted-foreground">
      <h4 class="text-sm font-semibold text-foreground">1. Uptime Commitment</h4>
      <p>Supabase commits to 99.99% multi-region availability...</p>
    </div>

    <!-- Fixed Footer -->
    <DialogFooter class="p-4 border-t border-border bg-muted/20">
      <DialogClose as-child>
        <Button variant="default">I Understand</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const sheetSnippet = `<!-- Drawer / Sheet Panel (slides in from the right) -->
<Sheet>
  <SheetTrigger as-child>
    <Button variant="outline" class="gap-1.5">
      <PanelRight class="h-3.5 w-3.5" />
      Open Settings Panel
    </Button>
  </SheetTrigger>

  <!-- side="right" | "left" | "top" | "bottom" -->
  <SheetContent side="right" class="w-full sm:max-w-md p-0 flex flex-col h-full">
    <SheetHeader class="p-6 pb-4 border-b border-border text-left">
      <SheetTitle class="flex items-center gap-2 text-base font-semibold">
        <Settings class="h-4 w-4 text-primary" />
        Cluster Settings
      </SheetTitle>
      <SheetDescription class="text-xs text-muted-foreground mt-0.5">
        Adjust resource limits and auto-scaling rules for eu-central-1a.
      </SheetDescription>
    </SheetHeader>

    <!-- Scrollable body content -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4">
      <div class="space-y-1.5">
        <Label for="max-conn" class="text-xs font-medium">Max Connections</Label>
        <Input id="max-conn" type="number" placeholder="200" class="h-9 text-xs" />
      </div>
      <div class="space-y-1.5">
        <Label for="pool-mode" class="text-xs font-medium">Pool Mode</Label>
        <Input id="pool-mode" placeholder="transaction" class="h-9 text-xs" />
      </div>
      <div class="space-y-1.5">
        <Label for="region" class="text-xs font-medium">Primary Region</Label>
        <Input id="region" placeholder="eu-central-1" class="h-9 text-xs" />
      </div>
      <div class="space-y-1.5">
        <Label for="replicas" class="text-xs font-medium">Read Replicas</Label>
        <Input id="replicas" type="number" placeholder="2" class="h-9 text-xs" />
      </div>
    </div>

    <SheetFooter class="p-4 border-t border-border bg-muted/20 flex flex-col gap-2">
      <Button class="w-full" size="sm">Save Settings</Button>
      <SheetClose as-child>
        <Button variant="outline" size="sm" class="w-full">Discard Changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Modals & Dialogs"
      description="Accessible overlay dialogs, confirmation alerts, action modals, and scrollable sheets powered by Reka UI."
      badge="Component Showcase"
    />

    <!-- 1. Basic Information Dialog -->
    <CodePreview
      title="Basic Information Dialog"
      description="Wide-width modal for displaying read-only data grids, analytics overviews, or cluster topology at a glance."
      :code="basicDialogSnippet"
    >
      <Dialog v-model:open="isLargeDialogOpen">
        <DialogTrigger as-child>
          <Button variant="secondary" class="gap-1.5">
            <Layers class="h-3.5 w-3.5" />
            Cluster Topology
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-170">
          <DialogHeader>
            <DialogTitle>Cluster Topology &amp; Scaling</DialogTitle>
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
    </CodePreview>

    <!-- 2. Confirm / Alert Dialog (Destructive) -->
    <CodePreview
      title="Confirmation Alert Dialog"
      description="High-friction modal for critical, irreversible operations. Uses AlertDialog primitives for enforced keyboard-accessible confirmation."
      :code="alertDialogSnippet"
    >
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
              This action cannot be undone. This will permanently delete your cluster, all tables,
              triggers, and automated backups from AWS eu-central-1.
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
    </CodePreview>

    <!-- 3. Form in Dialog -->
    <CodePreview
      title="Form Action Dialog"
      description="Modal with interactive form inputs, async loading states, and optimistic success feedback. Ideal for create/edit CRUD operations."
      :code="formDialogSnippet"
    >
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
              <Textarea
                id="db-desc"
                v-model="projectDesc"
                :rows="3"
                placeholder="Primary database for API service..."
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button
              :disabled="!projectName || isCreating"
              class="gap-1.5"
              @click="handleCreateProject"
            >
              <CheckCircle2 v-if="isCreated" class="h-3.5 w-3.5" />
              <Sparkles v-else class="h-3.5 w-3.5" />
              {{ isCreated ? 'Created!' : isCreating ? 'Provisioning...' : 'Provision Database' }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CodePreview>

    <!-- 4. Scrollable Content Dialog -->
    <CodePreview
      title="Scrollable Content Dialog"
      description="Fixed header + footer with an independently scrollable body. Perfect for Terms of Service, changelogs, SLAs, or audit logs."
      :code="scrollableDialogSnippet"
    >
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
              Supabase commits to providing 99.99% multi-region database cluster availability during
              any monthly billing cycle. In the event of an unplanned failover event, replicas in
              alternate availability zones will take over master traffic within 5 seconds.
            </p>
            <h4 class="text-sm font-semibold text-foreground">2. Point-in-Time Recovery (PITR)</h4>
            <p>
              Write-ahead logs (WAL) are streamed continuously to encrypted cloud storage with a
              1-second Recovery Point Objective (RPO) and 15-minute Recovery Time Objective (RTO).
            </p>
            <h4 class="text-sm font-semibold text-foreground">3. Security Compliance &amp; Audits</h4>
            <p>
              All underlying server hardware conforms to SOC2 Type II, ISO 27001, and HIPAA
              compliance frameworks with AES-256 data-at-rest encryption.
            </p>
            <h4 class="text-sm font-semibold text-foreground">4. Support Response Times</h4>
            <p>
              Priority 1 tickets receive dedicated response from site reliability engineers within
              15 minutes, 24 hours a day, 365 days a year.
            </p>
          </div>

          <DialogFooter class="p-4 border-t border-border bg-muted/20">
            <DialogClose as-child>
              <Button variant="default">I Understand</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CodePreview>

    <!-- 5. Drawer / Sheet Panel -->
    <CodePreview
      title="Drawer / Sheet Panel"
      description="Slides in from any edge (right, left, top, bottom). Ideal for settings panels, detail drawers, filter sidebars, and quick-edit forms."
      :code="sheetSnippet"
    >
      <Sheet v-model:open="isSheetOpen">
        <SheetTrigger as-child>
          <Button variant="outline" class="gap-1.5">
            <PanelRight class="h-3.5 w-3.5" />
            Open Settings Panel
          </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-full sm:max-w-md p-0 flex flex-col h-full">
          <SheetHeader class="p-6 pb-4 border-b border-border text-left">
            <SheetTitle class="flex items-center gap-2 text-base font-semibold">
              <Settings class="h-4 w-4 text-primary" />
              Cluster Settings
            </SheetTitle>
            <SheetDescription class="text-xs text-muted-foreground mt-0.5">
              Adjust resource limits and auto-scaling rules for eu-central-1a.
            </SheetDescription>
          </SheetHeader>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div class="space-y-1.5">
              <Label for="sheet-max-conn" class="text-xs font-medium">Max Connections</Label>
              <Input id="sheet-max-conn" type="number" placeholder="200" class="h-9 text-xs" />
            </div>
            <div class="space-y-1.5">
              <Label for="sheet-pool-mode" class="text-xs font-medium">Pool Mode</Label>
              <Input id="sheet-pool-mode" placeholder="transaction" class="h-9 text-xs" />
            </div>
            <div class="space-y-1.5">
              <Label for="sheet-region" class="text-xs font-medium">Primary Region</Label>
              <Input id="sheet-region" placeholder="eu-central-1" class="h-9 text-xs" />
            </div>
            <div class="space-y-1.5">
              <Label for="sheet-replicas" class="text-xs font-medium">Read Replicas</Label>
              <Input id="sheet-replicas" type="number" placeholder="2" class="h-9 text-xs" />
            </div>
          </div>

          <SheetFooter class="p-4 border-t border-border bg-muted/20 flex flex-col gap-2">
            <Button class="w-full" size="sm">Save Settings</Button>
            <SheetClose as-child>
              <Button variant="outline" size="sm" class="w-full">Discard Changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </CodePreview>
  </div>
</template>
