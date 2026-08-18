<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Activity,
  Shield,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  GitCommit,
  Rocket,
  Settings2,
  Key,
  Globe,
  Search,
} from '@lucide/vue'

// ─── 1. Stepper / Wizard State ────────────────────────────────────────────────
const currentStep = ref(2)

const wizardSteps = [
  { id: 1, title: 'Project Details', description: 'Name & repository' },
  { id: 2, title: 'Environment Config', description: 'Database & secrets' },
  { id: 3, title: 'Compute & Scaling', description: 'Nodes & memory' },
  { id: 4, title: 'Review & Deploy', description: 'Final verification' },
]

// ─── 2. Vertical Tabs State ──────────────────────────────────────────────────
const activeVerticalTab = ref('general')

// ─── 3. Accordions State ─────────────────────────────────────────────────────
const activeAccordion = ref<string | null>('item-1')

function toggleAccordion(item: string) {
  activeAccordion.value = activeAccordion.value === item ? null : item
}

// ─── 4. Pagination State ─────────────────────────────────────────────────────
const currentPage = ref(3)
const totalPages = ref(10)

// ─── 5. Timeline Events Data ─────────────────────────────────────────────────
const deploymentEvents = [
  {
    id: 1,
    title: 'Production Release v2.4.0 Deployed',
    description: 'Automated rolling update completed with zero downtime across 8 edge clusters.',
    time: '12 min ago',
    icon: Rocket,
    status: 'success' as const,
    badge: 'Production',
  },
  {
    id: 2,
    title: 'Database Migration: Add tenant_id index',
    description: 'Postgres schema migration executed in 142ms on cluster pg-master-01.',
    time: '45 min ago',
    icon: Database,
    status: 'info' as const,
    badge: 'PostgreSQL',
  },
  {
    id: 3,
    title: 'SSL Certificate Auto-Renewed',
    description: 'Let\'s Encrypt wildcard certificate for *.supabase.co renewed for 90 days.',
    time: '3 hours ago',
    icon: Shield,
    status: 'neutral' as const,
    badge: 'Security',
  },
  {
    id: 4,
    title: 'High Ingress Throughput Spike',
    description: 'Ingress traffic peaked at 48.2k req/sec. Auto-scaled +4 replica containers.',
    time: '5 hours ago',
    icon: AlertCircle,
    status: 'warning' as const,
    badge: 'Autoscale',
  },
  {
    id: 5,
    title: 'Git Commit Synced to Main Branch',
    description: 'Commit 8f19da2: "refactor: upgrade to tailwind v4 and smooth splines" pushed by @developer.',
    time: '8 hours ago',
    icon: GitCommit,
    status: 'neutral' as const,
    badge: 'GitHub',
  },
]

// ─── 6. Command Search Demo State ────────────────────────────────────────────
const commandSearch = ref('')
const commandList = [
  { group: 'Navigation', items: [
    { title: 'Go to Dashboard', shortcut: 'G D', icon: Activity },
    { title: 'User Management', shortcut: 'G U', icon: Settings2 },
    { title: 'Project Settings', shortcut: 'G S', icon: Key },
  ]},
  { group: 'Actions', items: [
    { title: 'Create New Database Table', shortcut: '⌘ N', icon: Database },
    { title: 'Generate API Secret Key', shortcut: '⌥ K', icon: Key },
    { title: 'Deploy to Staging', shortcut: '⇧ ⌘ D', icon: Rocket },
  ]},
]

const filteredCommandList = computed(() => {
  if (!commandSearch.value) return commandList
  const q = commandSearch.value.toLowerCase()
  return commandList
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => i.title.toLowerCase().includes(q) || i.shortcut.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0)
})
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
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Navigation &amp; Flow</h1>
        <p class="text-sm text-muted-foreground">
          Steppers, vertical tabs, timeline audit logs, collapsible accordions, and keyboard shortcut triggers.
        </p>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 1. MULTI-STEP WIZARD / STEPPER                                        -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card class="shadow-sm overflow-hidden py-0 gap-0">
      <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle class="text-base font-semibold">Multi-Step Flow / Stepper</CardTitle>
          <CardDescription class="text-xs">
            Interactive progress indicators with step status, numbers, and validation flow.
          </CardDescription>
        </div>
        <span class="label-mono text-primary font-bold">
          STEP {{ currentStep }} OF {{ wizardSteps.length }}
        </span>
      </CardHeader>
      <CardContent class="p-6 space-y-6">
        <!-- Stepper Component -->
        <Stepper
          :steps="wizardSteps"
          v-model="currentStep"
          class="pb-2"
        />

        <!-- Step Content Area Card -->
        <div class="rounded-xl border border-border bg-muted/10 p-6 min-h-36 flex flex-col justify-between">
          <div v-if="currentStep === 1" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-primary inline-block"></span>
              Step 1: Project Details &amp; Workspace
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Define your repository name, organization ownership, and base template configuration.
            </p>
          </div>

          <div v-else-if="currentStep === 2" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-primary inline-block"></span>
              Step 2: Environment &amp; Secret Variables
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Inject SSL keys, PostgreSQL connection strings, and JWT auth secret tokens.
            </p>
          </div>

          <div v-else-if="currentStep === 3" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-primary inline-block"></span>
              Step 3: Compute Sizing &amp; Node Allocation
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Choose dedicated vCPU units, memory allocation, and read replica multi-region failover.
            </p>
          </div>

          <div v-else class="space-y-2">
            <h4 class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 class="h-4 w-4" />
              Step 4: Verification &amp; Instant Deployment
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              All health checks passed. Your cluster is ready to deploy with zero downtime.
            </p>
          </div>

          <!-- Wizard Action Buttons -->
          <div class="flex items-center justify-between pt-4 mt-4 border-t border-border/60">
            <Button
              variant="outline"
              size="sm"
              :disabled="currentStep === 1"
              @click="currentStep = Math.max(1, currentStep - 1)"
              class="gap-1.5 text-xs"
            >
              <ChevronLeft class="h-3.5 w-3.5" />
              Previous Step
            </Button>

            <div class="flex items-center gap-2">
              <Button
                v-if="currentStep < wizardSteps.length"
                size="sm"
                @click="currentStep = Math.min(wizardSteps.length, currentStep + 1)"
                class="gap-1.5 text-xs"
              >
                Continue Next
                <ChevronRight class="h-3.5 w-3.5" />
              </Button>
              <Button
                v-else
                size="sm"
                class="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                @click="currentStep = 1"
              >
                <Rocket class="h-3.5 w-3.5" />
                Finish &amp; Deploy
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 2. VERTICAL TABS & HORIZONTAL TABS (2-COL)                            -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Vertical Tabs Variant -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Vertical Tabs Layout</CardTitle>
          <CardDescription class="text-xs">
            Side navigation tab triggers ideal for settings panels and nested dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <div class="flex flex-col sm:flex-row gap-6 min-h-56">
            <!-- Vertical Tab Sidebar Trigger List -->
            <div class="w-full sm:w-48 flex flex-col gap-1 border-r border-border sm:pr-4">
              <button
                type="button"
                @click="activeVerticalTab = 'general'"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
                :class="activeVerticalTab === 'general' ? 'bg-primary text-primary-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <Settings2 class="h-4 w-4 shrink-0" />
                General Settings
              </button>
              <button
                type="button"
                @click="activeVerticalTab = 'database'"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
                :class="activeVerticalTab === 'database' ? 'bg-primary text-primary-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <Database class="h-4 w-4 shrink-0" />
                Database Engine
              </button>
              <button
                type="button"
                @click="activeVerticalTab = 'security'"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
                :class="activeVerticalTab === 'security' ? 'bg-primary text-primary-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <Shield class="h-4 w-4 shrink-0" />
                Security &amp; SSL
              </button>
              <button
                type="button"
                @click="activeVerticalTab = 'domains'"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
                :class="activeVerticalTab === 'domains' ? 'bg-primary text-primary-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
              >
                <Globe class="h-4 w-4 shrink-0" />
                Custom Domains
              </button>
            </div>

            <!-- Vertical Tab Body Content -->
            <div class="flex-1 space-y-2 p-2">
              <div v-if="activeVerticalTab === 'general'" class="space-y-2">
                <h4 class="text-sm font-semibold text-foreground">Project General Preferences</h4>
                <p class="text-xs text-muted-foreground">Manage organization profile, timezone default (UTC+7), and team collaboration permissions.</p>
              </div>
              <div v-else-if="activeVerticalTab === 'database'" class="space-y-2">
                <h4 class="text-sm font-semibold text-foreground">PostgreSQL Engine 16.3</h4>
                <p class="text-xs text-muted-foreground">Connection pooler (PgBouncer) running at 98.4% efficiency with 120 max concurrent connections.</p>
              </div>
              <div v-else-if="activeVerticalTab === 'security'" class="space-y-2">
                <h4 class="text-sm font-semibold text-foreground">Hardware 2FA &amp; Passkeys</h4>
                <p class="text-xs text-muted-foreground">Enforce WebAuthn passkeys across all organization administrators and developer roles.</p>
              </div>
              <div v-else class="space-y-2">
                <h4 class="text-sm font-semibold text-foreground">Cloudflare CNAME Records</h4>
                <p class="text-xs text-muted-foreground">Your custom domain api.nala-admin.com is verified and serving traffic over HTTPS.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Standard Horizontal Tabs -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Standard Horizontal Tabs</CardTitle>
          <CardDescription class="text-xs">
            Smooth pill tab triggers with icons and animated view switching.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <Tabs default-value="overview" class="w-full space-y-4">
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="overview" class="gap-1.5 text-xs">
                <Activity class="h-3.5 w-3.5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tables" class="gap-1.5 text-xs">
                <Database class="h-3.5 w-3.5" />
                Schema
              </TabsTrigger>
              <TabsTrigger value="security" class="gap-1.5 text-xs">
                <Shield class="h-3.5 w-3.5" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" class="p-4 rounded-lg border border-border bg-muted/10 space-y-2">
              <h4 class="text-sm font-semibold text-foreground">Cluster Performance</h4>
              <p class="text-xs text-muted-foreground">
                99.99% query success rate over 14.8M transactions in the past 30 days.
              </p>
            </TabsContent>

            <TabsContent value="tables" class="p-4 rounded-lg border border-border bg-muted/10 space-y-2">
              <h4 class="text-sm font-semibold text-foreground">Database Schema</h4>
              <p class="text-xs text-muted-foreground">
                24 active tables, 8 foreign key relations, and 3 materialized views configured.
              </p>
            </TabsContent>

            <TabsContent value="security" class="p-4 rounded-lg border border-border bg-muted/10 space-y-2">
              <h4 class="text-sm font-semibold text-foreground">TLS &amp; Network Policies</h4>
              <p class="text-xs text-muted-foreground">
                TLS 1.3 enforced. IP allowlist enabled for 4 VPC subnets.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 3. TIMELINE AUDIT LOG & ACCORDIONS (2-COL)                            -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Activity Timeline Component -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-semibold">Chronological Activity Timeline</CardTitle>
            <CardDescription class="text-xs">Live deployment logs &amp; system audit trail.</CardDescription>
          </div>
          <span class="status-dot"></span>
        </CardHeader>
        <CardContent class="p-6">
          <Timeline :items="deploymentEvents" />
        </CardContent>
      </Card>

      <!-- Smooth Collapsible Accordions -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Collapsible Accordions</CardTitle>
          <CardDescription class="text-xs">
            Hardware-accelerated CSS Grid 60fps expandable panels with rotated caret highlights.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6 space-y-3">
          <!-- Item 1 -->
          <div class="border border-border rounded-lg overflow-hidden transition-colors" :class="{ 'bg-muted/10 border-primary/40': activeAccordion === 'item-1' }">
            <button
              @click="toggleAccordion('item-1')"
              class="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <span>What is the query rate limit on serverless edge functions?</span>
              <ChevronDown
                class="h-4 w-4 text-muted-foreground transition-transform duration-300 ease-out shrink-0"
                :class="{ 'rotate-180 text-primary': activeAccordion === 'item-1' }"
              />
            </button>
            <div
              class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
              :class="activeAccordion === 'item-1' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                  Serverless functions allow up to 10,000 invocations per minute on the Pro Tier, with automatic bursting capabilities during high-traffic spikes without cold-starts.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="border border-border rounded-lg overflow-hidden transition-colors" :class="{ 'bg-muted/10 border-primary/40': activeAccordion === 'item-2' }">
            <button
              @click="toggleAccordion('item-2')"
              class="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <span>How does Point-in-Time Recovery (PITR) work?</span>
              <ChevronDown
                class="h-4 w-4 text-muted-foreground transition-transform duration-300 ease-out shrink-0"
                :class="{ 'rotate-180 text-primary': activeAccordion === 'item-2' }"
              />
            </button>
            <div
              class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
              :class="activeAccordion === 'item-2' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                  PITR creates continuous WAL log archives, allowing you to restore your database state to any specific second in the past 7 days with zero loss.
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="border border-border rounded-lg overflow-hidden transition-colors" :class="{ 'bg-muted/10 border-primary/40': activeAccordion === 'item-3' }">
            <button
              @click="toggleAccordion('item-3')"
              class="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <span>Are read replicas synchronized in real time?</span>
              <ChevronDown
                class="h-4 w-4 text-muted-foreground transition-transform duration-300 ease-out shrink-0"
                :class="{ 'rotate-180 text-primary': activeAccordion === 'item-3' }"
              />
            </button>
            <div
              class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
              :class="activeAccordion === 'item-3' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="overflow-hidden">
                <div class="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                  Yes, read replicas utilize streaming physical replication with typical replication lag under 25 milliseconds globally.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 4. COMMAND PALETTE DEMO & KEYBOARD SHORTCUTS <KBD>                    -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Command Palette Inline Demo -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Command Palette Showcase</CardTitle>
          <CardDescription class="text-xs">
            Searchable command executor built on the Command primitive with hotkey mapping.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6 space-y-4">
          <!-- Command box wrapper -->
          <div class="rounded-xl border border-border bg-background shadow-xs overflow-hidden">
            <div class="flex items-center border-b border-border px-3 py-2">
              <Search class="mr-2 h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
              <input
                v-model="commandSearch"
                placeholder="Type a command or jump to page..."
                class="flex h-8 w-full rounded-md bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>

            <!-- Command items list -->
            <div class="max-h-52 overflow-y-auto p-2 space-y-3">
              <div v-if="filteredCommandList.length === 0" class="py-4 text-center text-xs text-muted-foreground">
                No matching command found.
              </div>

              <div v-for="group in filteredCommandList" :key="group.group" class="space-y-1">
                <div class="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {{ group.group }}
                </div>
                <button
                  v-for="item in group.items"
                  :key="item.title"
                  type="button"
                  class="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <component :is="item.icon" class="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{{ item.title }}</span>
                  </div>
                  <Kbd size="sm">{{ item.shortcut }}</Kbd>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Keyboard Shortcuts Reference Table -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Keyboard Shortcuts (`&lt;Kbd&gt;`)</CardTitle>
          <CardDescription class="text-xs">
            Clean, accessible keyboard key badges for hotkey tooltips and cheat-sheets.
          </CardDescription>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between py-1.5 border-b border-border/60 text-xs">
              <span class="text-muted-foreground">Quick Search Palette</span>
              <div class="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>K</Kbd>
              </div>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/60 text-xs">
              <span class="text-muted-foreground">Toggle Collapsible Sidebar</span>
              <div class="flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </div>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/60 text-xs">
              <span class="text-muted-foreground">Open Notification Panel</span>
              <div class="flex items-center gap-1">
                <Kbd>⇧</Kbd>
                <span>+</span>
                <Kbd>N</Kbd>
              </div>
            </div>

            <div class="flex items-center justify-between py-1.5 border-b border-border/60 text-xs">
              <span class="text-muted-foreground">Save Configuration Form</span>
              <div class="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>S</Kbd>
              </div>
            </div>

            <div class="flex items-center justify-between py-1.5 text-xs">
              <span class="text-muted-foreground">Close Active Modal / Drawer</span>
              <Kbd>Esc</Kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 5. BREADCRUMBS & PAGINATION                                           -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Breadcrumbs Card -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Hierarchical Breadcrumbs</CardTitle>
          <CardDescription class="text-xs">Location trails and deep route context.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="/components/navigation">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Navigation &amp; Flow</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>

      <!-- Pagination Card -->
      <Card class="shadow-sm overflow-hidden py-0 gap-0">
        <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-semibold">Pagination Controls</CardTitle>
            <CardDescription class="text-xs">Page switching with numeric buttons.</CardDescription>
          </div>
          <span class="font-mono text-xs text-muted-foreground">Page {{ currentPage }} of {{ totalPages }}</span>
        </CardHeader>
        <CardContent class="p-6 flex items-center justify-center">
          <div class="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8"
              :disabled="currentPage === 1"
              @click="currentPage = Math.max(1, currentPage - 1)"
            >
              <ChevronLeft class="h-4 w-4" />
            </Button>

            <Button
              v-for="p in [1, 2, 3, 4, 5]"
              :key="p"
              variant="ghost"
              size="sm"
              class="h-8 w-8 p-0 text-xs font-mono"
              :class="{ 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90': currentPage === p }"
              @click="currentPage = p"
            >
              {{ p }}
            </Button>

            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8"
              :disabled="currentPage === totalPages"
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
            >
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
