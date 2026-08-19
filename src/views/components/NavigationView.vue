<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Stepper } from '@/components/ui/stepper'
import { Timeline } from '@/components/ui/timeline'
import { Kbd } from '@/components/ui/kbd'

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
const activeUnderlineTab = ref('analytics')

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
    description: "Let's Encrypt wildcard certificate for *.supabase.co renewed for 90 days.",
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
    description: 'Commit 8f19da2: "refactor: upgrade to tailwind v4" pushed by @developer.',
    time: '8 hours ago',
    icon: GitCommit,
    status: 'neutral' as const,
    badge: 'GitHub',
  },
]

// ─── 6. Command Search Demo State ────────────────────────────────────────────
const commandSearch = ref('')
const commandList = [
  {
    group: 'Navigation',
    items: [
      { title: 'Go to Dashboard', shortcut: 'G D', icon: Activity },
      { title: 'User Management', shortcut: 'G U', icon: Settings2 },
      { title: 'Project Settings', shortcut: 'G S', icon: Key },
    ],
  },
  {
    group: 'Actions',
    items: [
      { title: 'Create New Database Table', shortcut: '⌘ N', icon: Database },
      { title: 'Generate API Secret Key', shortcut: '⌥ K', icon: Key },
      { title: 'Deploy to Staging', shortcut: '⇧ ⌘ D', icon: Rocket },
    ],
  },
]

const filteredCommandList = computed(() => {
  if (!commandSearch.value) return commandList
  const q = commandSearch.value.toLowerCase()
  return commandList
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => i.title.toLowerCase().includes(q) || i.shortcut.toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.items.length > 0)
})

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const stepperSnippet = `<!-- Multi-Step Wizard / Stepper Flow -->
<script setup lang="ts">
const currentStep = ref(2)
const steps = [
  { id: 1, title: 'Project Details', description: 'Name & repository' },
  { id: 2, title: 'Environment Config', description: 'Database & secrets' },
  { id: 3, title: 'Compute & Scaling', description: 'Nodes & memory' },
  { id: 4, title: 'Review & Deploy', description: 'Final verification' },
]
<\/script>

<div class="space-y-6">
  <Stepper :steps="steps" v-model="currentStep" />

  <!-- Step Content Container -->
  <div class="p-6 rounded-xl border border-border bg-muted/10">
    <p class="text-sm font-semibold">Active Step: {{ currentStep }}</p>
  </div>

  <!-- Navigation Action Buttons -->
  <div class="flex justify-between">
    <Button
      variant="outline"
      size="sm"
      :disabled="currentStep === 1"
      @click="currentStep = Math.max(1, currentStep - 1)"
    >
      Previous
    </Button>
    <Button
      size="sm"
      :disabled="currentStep === steps.length"
      @click="currentStep = Math.min(steps.length, currentStep + 1)"
    >
      Continue Next
    </Button>
  </div>
</div>`

const tabsSnippet = `<!-- Standard Horizontal Tabs & Underline Tabs -->

<!-- 1. Default Pill Tabs -->
<Tabs default-value="overview">
  <TabsList class="grid grid-cols-3 w-full">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="schema">Schema</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="overview" class="p-4 border rounded-lg">
    <p class="text-xs">Cluster health: 99.99% uptime.</p>
  </TabsContent>
  <TabsContent value="schema" class="p-4 border rounded-lg">
    <p class="text-xs">24 active tables configured.</p>
  </TabsContent>
  <TabsContent value="security" class="p-4 border rounded-lg">
    <p class="text-xs">TLS 1.3 encryption enabled.</p>
  </TabsContent>
</Tabs>

<!-- 2. Clean Underline Tabs -->
<div class="flex border-b border-border gap-6">
  <button
    class="pb-2 text-xs font-medium border-b-2 transition-colors"
    :class="activeTab === 'tab1' ? 'border-primary text-foreground font-semibold' : 'border-transparent text-muted-foreground'"
  >
    Analytics
  </button>
</div>`

const verticalTabsSnippet = `<!-- Vertical Tabs Navigation Layout -->
<div class="flex flex-col sm:flex-row gap-6">
  <!-- Tab Trigger List (Sidebar) -->
  <div class="w-full sm:w-48 flex flex-col gap-1 border-r border-border sm:pr-4">
    <button
      @click="activeTab = 'general'"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors"
      :class="activeTab === 'general' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:bg-accent'"
    >
      <Settings2 class="h-4 w-4" />
      General Settings
    </button>
  </div>

  <!-- Tab Body View -->
  <div class="flex-1 p-2">
    <p class="text-xs text-muted-foreground">Manage organization profile & preferences.</p>
  </div>
</div>`

const breadcrumbsSnippet = `<!-- Hierarchical Breadcrumb Navigation Trail -->
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
</Breadcrumb>`

const paginationSnippet = `<!-- Numbered & Previous/Next Pagination -->
<script setup lang="ts">
const currentPage = ref(3)
const totalPages = ref(10)
<\/script>

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
    :class="{ 'bg-primary text-primary-foreground font-semibold': currentPage === p }"
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
</div>`

const timelineSnippet = `<!-- Chronological Activity Timeline Component -->
<Timeline :items="deploymentEvents" />`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Navigation & Flow"
      description="Multi-step wizards, tab navigations, hierarchical breadcrumbs, numbered paginations, and audit timelines."
      badge="Component Showcase"
    />

    <!-- 1. MULTI-STEP WIZARD / STEPPER -->
    <CodePreview
      title="Multi-Step Flow / Stepper"
      description="Interactive multi-step progress indicator with step status, labels, numbers, and validation controls."
      :code="stepperSnippet"
    >
      <div class="space-y-6">
        <Stepper :steps="wizardSteps" v-model="currentStep" class="pb-2" />

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
      </div>
    </CodePreview>

    <!-- 2. TABS: HORIZONTAL & UNDERLINE -->
    <CodePreview
      title="Tabs (Pill, Underline & Default Variants)"
      description="Tabbed view switches supporting standard pill triggers, custom border underline indicators, and nested content panels."
      :code="tabsSnippet"
    >
      <div class="space-y-6">
        <!-- Underline Tabs Demo -->
        <div class="space-y-3">
          <span class="label-mono">Underline Tab Bar</span>
          <div class="flex border-b border-border gap-6">
            <button
              type="button"
              @click="activeUnderlineTab = 'analytics'"
              class="pb-2 text-xs font-medium border-b-2 transition-colors cursor-pointer"
              :class="
                activeUnderlineTab === 'analytics'
                  ? 'border-primary text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              "
            >
              Analytics &amp; Queries
            </button>
            <button
              type="button"
              @click="activeUnderlineTab = 'traffic'"
              class="pb-2 text-xs font-medium border-b-2 transition-colors cursor-pointer"
              :class="
                activeUnderlineTab === 'traffic'
                  ? 'border-primary text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              "
            >
              Network Ingress
            </button>
            <button
              type="button"
              @click="activeUnderlineTab = 'backups'"
              class="pb-2 text-xs font-medium border-b-2 transition-colors cursor-pointer"
              :class="
                activeUnderlineTab === 'backups'
                  ? 'border-primary text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              "
            >
              WAL Backups
            </button>
          </div>

          <div class="p-4 rounded-lg border border-border bg-muted/10 text-xs text-muted-foreground">
            <p v-if="activeUnderlineTab === 'analytics'">Active queries: 14 running across 2 worker pools.</p>
            <p v-else-if="activeUnderlineTab === 'traffic'">Peak ingress bandwidth: 4.8 Gbps via Frankfurt POP.</p>
            <p v-else>Latest snapshot created 18 mins ago (RPO 1 second).</p>
          </div>
        </div>

        <!-- Standard Pill Tabs -->
        <div class="space-y-3 pt-2">
          <span class="label-mono">Standard Pill Tabs</span>
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
        </div>
      </div>
    </CodePreview>

    <!-- 3. VERTICAL TABS LAYOUT -->
    <CodePreview
      title="Vertical Tabs Navigation"
      description="Sidebar tab triggers stacked vertically, ideal for dense settings consoles and account management."
      :code="verticalTabsSnippet"
    >
      <div class="flex flex-col sm:flex-row gap-6 min-h-56">
        <!-- Vertical Tab Sidebar Trigger List -->
        <div class="w-full sm:w-48 flex flex-col gap-1 border-r border-border sm:pr-4">
          <button
            type="button"
            @click="activeVerticalTab = 'general'"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
            :class="
              activeVerticalTab === 'general'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            "
          >
            <Settings2 class="h-4 w-4 shrink-0" />
            General Settings
          </button>
          <button
            type="button"
            @click="activeVerticalTab = 'database'"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
            :class="
              activeVerticalTab === 'database'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            "
          >
            <Database class="h-4 w-4 shrink-0" />
            Database Engine
          </button>
          <button
            type="button"
            @click="activeVerticalTab = 'security'"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
            :class="
              activeVerticalTab === 'security'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            "
          >
            <Shield class="h-4 w-4 shrink-0" />
            Security &amp; SSL
          </button>
          <button
            type="button"
            @click="activeVerticalTab = 'domains'"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer"
            :class="
              activeVerticalTab === 'domains'
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            "
          >
            <Globe class="h-4 w-4 shrink-0" />
            Custom Domains
          </button>
        </div>

        <!-- Vertical Tab Body Content -->
        <div class="flex-1 space-y-2 p-2">
          <div v-if="activeVerticalTab === 'general'" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">Project General Preferences</h4>
            <p class="text-xs text-muted-foreground">
              Manage organization profile, timezone default (UTC+7), and team collaboration permissions.
            </p>
          </div>
          <div v-else-if="activeVerticalTab === 'database'" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">PostgreSQL Engine 16.3</h4>
            <p class="text-xs text-muted-foreground">
              Connection pooler (PgBouncer) running at 98.4% efficiency with 120 max concurrent connections.
            </p>
          </div>
          <div v-else-if="activeVerticalTab === 'security'" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">Hardware 2FA &amp; Passkeys</h4>
            <p class="text-xs text-muted-foreground">
              Enforce WebAuthn passkeys across all organization administrators and developer roles.
            </p>
          </div>
          <div v-else class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">Cloudflare CNAME Records</h4>
            <p class="text-xs text-muted-foreground">
              Your custom domain api.nala-admin.com is verified and serving traffic over HTTPS.
            </p>
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 4. BREADCRUMBS & PAGINATION (2-COL) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Breadcrumbs -->
      <CodePreview
        title="Hierarchical Breadcrumbs"
        description="Location trail that displays deep navigation hierarchy and clickable parent routes."
        :code="breadcrumbsSnippet"
      >
        <div class="p-2">
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
        </div>
      </CodePreview>

      <!-- Pagination -->
      <CodePreview
        title="Pagination Controls"
        description="Numbered page switcher with active states and previous/next navigation buttons."
        :code="paginationSnippet"
      >
        <div class="flex flex-col items-center justify-center gap-3 py-2">
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
          <span class="font-mono text-xs text-muted-foreground">Page {{ currentPage }} of {{ totalPages }}</span>
        </div>
      </CodePreview>
    </div>

    <!-- 5. TIMELINE & ACCORDIONS (2-COL) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Activity Timeline -->
      <CodePreview
        title="Activity Audit Timeline"
        description="Chronological event list with status badges, icons, and relative timestamps."
        :code="timelineSnippet"
      >
        <Timeline :items="deploymentEvents" />
      </CodePreview>

      <!-- Collapsible Accordions -->
      <CodePreview
        title="Collapsible Accordions"
        description="CSS Grid animated expanding accordions with smooth caret rotation."
        code="<!-- Accordion Item -->
<div class='border rounded-lg overflow-hidden'>
  <button @click='toggle' class='w-full flex justify-between p-4'>
    <span>Question Title</span>
    <ChevronDown :class='{ &quot;rotate-180&quot;: isOpen }' />
  </button>
  <div v-show='isOpen' class='p-4 pt-0 text-xs text-muted-foreground'>
    Answer details...
  </div>
</div>"
      >
        <div class="space-y-3">
          <div
            class="border border-border rounded-lg overflow-hidden transition-colors"
            :class="{ 'bg-muted/10 border-primary/40': activeAccordion === 'item-1' }"
          >
            <button
              @click="toggleAccordion('item-1')"
              class="w-full flex items-center justify-between p-4 text-left font-medium text-sm text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <span>What is the query rate limit on edge functions?</span>
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
                  Serverless functions allow up to 10,000 invocations per minute on the Pro Tier, with automatic bursting capabilities.
                </div>
              </div>
            </div>
          </div>

          <div
            class="border border-border rounded-lg overflow-hidden transition-colors"
            :class="{ 'bg-muted/10 border-primary/40': activeAccordion === 'item-2' }"
          >
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
                  PITR creates continuous WAL log archives, allowing you to restore your database state to any specific second in the past 7 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </CodePreview>
    </div>
  </div>
</template>
