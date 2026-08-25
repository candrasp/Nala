<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Activity,
  Shield,
  ChevronsUpDown,
  AlertCircle,
  GitCommit,
  Rocket,
  Settings2,
  Package,
  Truck,
  CheckCircle2,
  CreditCard,
  SlidersHorizontal,
} from '@lucide/vue'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Stepper } from '@/components/ui/stepper'
import { Timeline } from '@/components/ui/timeline'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import PageHeader from '@/components/PageHeader.vue'
import CodePreview from '@/components/CodePreview.vue'

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

// ─── 3. Collapsible Filter State ─────────────────────────────────────────────
const isCollapsibleOpen = ref(true)

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
    description: "Let's Encrypt wildcard certificate for *.nala.dev renewed for 90 days.",
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
    description: 'Commit 8f19da2: "feat: add accordion and calendar primitives" pushed by @developer.',
    time: '8 hours ago',
    icon: GitCommit,
    status: 'neutral' as const,
    badge: 'GitHub',
  },
]

const orderTrackingEvents = [
  {
    id: 'ord-1',
    title: 'Package Delivered to Doorstep',
    description: 'Signed by recipient at 548 Market St, San Francisco, CA.',
    time: 'Today, 2:45 PM',
    icon: CheckCircle2,
    status: 'success' as const,
    badge: 'Completed',
  },
  {
    id: 'ord-2',
    title: 'Out for Delivery via Express Courier',
    description: 'Courier driver #84 is in transit with 4 stops remaining.',
    time: 'Today, 9:15 AM',
    icon: Truck,
    status: 'info' as const,
    badge: 'In Transit',
  },
  {
    id: 'ord-3',
    title: 'Custom Hardware Kit Packaged',
    description: 'Hardware tokens and NFC security keys boxed at fulfillment hub.',
    time: 'Yesterday, 6:30 PM',
    icon: Package,
    status: 'neutral' as const,
    badge: 'Warehouse',
  },
  {
    id: 'ord-4',
    title: 'Payment Authorized & Invoice Settled',
    description: 'Billed $499.00 USD via Visa •••• 4242.',
    time: 'Aug 24, 11:00 AM',
    icon: CreditCard,
    status: 'success' as const,
    badge: 'Paid',
  },
]

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
</Tabs>`

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
</div>`

const breadcrumbsSnippet = `<!-- Breadcrumb Hierarchical Navigation -->
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
      <BreadcrumbPage>Navigation & Flow</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`

const paginationSnippet = `<!-- Numbered & Previous/Next Pagination -->
<div class="flex items-center gap-1">
  <Button variant="outline" size="icon" :disabled="currentPage === 1" @click="currentPage--">
    <ChevronLeft class="h-4 w-4" />
  </Button>
  <Button v-for="p in [1, 2, 3, 4, 5]" :key="p" variant="ghost" :class="{ 'bg-primary text-primary-foreground': currentPage === p }" @click="currentPage = p">
    {{ p }}
  </Button>
  <Button variant="outline" size="icon" :disabled="currentPage === totalPages" @click="currentPage++">
    <ChevronRight class="h-4 w-4" />
  </Button>
</div>`

const accordionSnippet = `<!-- Accordion Primitives (Single or Multiple) -->
<Accordion type="single" collapsible default-value="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is the query throughput limit?</AccordionTrigger>
    <AccordionContent>
      Serverless functions allow up to 10,000 invocations per minute on the Pro tier.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How does Point-in-Time Recovery work?</AccordionTrigger>
    <AccordionContent>
      PITR creates continuous WAL log archives, allowing recovery to any specific second in the past 7 days.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const collapsibleSnippet = `<!-- Collapsible Primitive Panel -->
<Collapsible v-model:open="isOpen">
  <div class="flex items-center justify-between p-3 border rounded-lg">
    <span>Filter Options</span>
    <CollapsibleTrigger as-child>
      <Button variant="ghost" size="sm">Toggle</Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent class="p-3 border-x border-b rounded-b-lg">
    Expandable filter content here...
  </CollapsibleContent>
</Collapsible>`

const timelineSnippet = `<!-- Multi-Track Activity Timeline -->
<Timeline :items="deploymentEvents" />`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Navigation & Flow"
      description="Multi-step wizards, tab navigations, hierarchical breadcrumbs, collapsible accordions, and audit timelines."
      badge="Component Showcase"
    />

    <!-- 1. MULTI-STEP WIZARD / STEPPER -->
    <CodePreview
      title="Multi-Step Flow / Stepper"
      description="Interactive multi-step progress indicator with step status, labels, numbers, and validation controls."
      :code="stepperSnippet"
    >
      <div class="space-y-8">
        <!-- Interactive Stepper Track -->
        <Stepper :steps="wizardSteps" v-model="currentStep" />

        <!-- Mock Content for Active Step -->
        <div class="p-6 rounded-xl border border-border bg-muted/10 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-foreground">
              Step {{ currentStep }}: {{ wizardSteps[currentStep - 1]?.title }}
            </h4>
            <span class="badge-blue text-xs font-mono">
              {{ wizardSteps[currentStep - 1]?.description }}
            </span>
          </div>

          <!-- Dynamic Mock Panel based on active step -->
          <div v-if="currentStep === 1" class="text-xs text-muted-foreground space-y-2">
            <p>Configure repository origin, repository name (<code class="font-mono text-primary">nala-admin-core</code>), and branch synchronization rules.</p>
          </div>
          <div v-else-if="currentStep === 2" class="text-xs text-muted-foreground space-y-2">
            <p>Define PostgreSQL database connection pooling strings, SSL mode, and JWT signing secrets.</p>
          </div>
          <div v-else-if="currentStep === 3" class="text-xs text-muted-foreground space-y-2">
            <p>Select instance compute tier: <strong class="text-foreground">2 vCPU / 4GB RAM</strong> with horizontal auto-scaling enabled up to 6 replicas.</p>
          </div>
          <div v-else class="text-xs text-muted-foreground space-y-2">
            <p>All configuration checks passed. Ready to initiate blue-green cluster rollout.</p>
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="currentStep === 1"
            @click="currentStep = Math.max(1, currentStep - 1)"
          >
            <ChevronLeft class="h-4 w-4" />
            Previous Step
          </Button>

          <div class="flex items-center gap-2">
            <Button
              v-if="currentStep < wizardSteps.length"
              size="sm"
              class="text-xs gap-1.5"
              @click="currentStep = Math.min(wizardSteps.length, currentStep + 1)"
            >
              Next Step
              <ChevronRight class="h-4 w-4" />
            </Button>
            <Button
              v-else
              variant="default"
              size="sm"
              class="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Rocket class="h-4 w-4" />
              Deploy Project
            </Button>
          </div>
        </div>
      </div>
    </CodePreview>

    <!-- 2. HORIZONTAL & UNDERLINE TABS -->
    <CodePreview
      title="Horizontal & Underline Tabs"
      description="Tabbed navigation switches for organizing dense configuration views and contextual dashboards."
      :code="tabsSnippet"
    >
      <div class="space-y-6">
        <!-- Clean Underline Tabs -->
        <div class="space-y-3">
          <span class="label-mono">Underline Indicator Tabs</span>
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
              Real-Time Telemetry
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
              Edge Bandwidth
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
            Security &amp; 2FA
          </button>
        </div>

        <!-- Vertical Tab Content Pane -->
        <div class="flex-1 p-4 rounded-xl border border-border bg-muted/10">
          <div v-if="activeVerticalTab === 'general'" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">Global Instance Parameters</h4>
            <p class="text-xs text-muted-foreground">
              Configure telemetry reporting frequency, debug log verbosity, and maintenance windows.
            </p>
          </div>
          <div v-else-if="activeVerticalTab === 'database'" class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">PgBouncer Connection Pooling</h4>
            <p class="text-xs text-muted-foreground">
              Connection pooler running at 98.4% efficiency with 120 max concurrent connections.
            </p>
          </div>
          <div v-else class="space-y-2">
            <h4 class="text-sm font-semibold text-foreground">Hardware 2FA &amp; Passkeys</h4>
            <p class="text-xs text-muted-foreground">
              Enforce WebAuthn passkeys across all organization administrators and developer roles.
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
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components/navigation">Components</BreadcrumbLink>
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

    <!-- 5. ACCORDIONS & COLLAPSIBLES (2-COL) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Reka UI Accordion Primitive -->
      <CodePreview
        title="Accordion Primitives (<Accordion>)"
        description="Expandable question lists with animated height transitions and rotating chevrons."
        :code="accordionSnippet"
      >
        <div class="p-1">
          <Accordion type="single" collapsible default-value="faq-1" class="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is the query rate limit on edge functions?</AccordionTrigger>
              <AccordionContent>
                Serverless edge functions allow up to 10,000 invocations per minute on the Pro tier, with automatic burst scaling across global edge nodes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2">
              <AccordionTrigger>How does Point-in-Time Recovery (PITR) work?</AccordionTrigger>
              <AccordionContent>
                PITR creates continuous WAL log archives, allowing you to restore your PostgreSQL database state to any specific second in the past 7 days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger>Are database backups encrypted at rest?</AccordionTrigger>
              <AccordionContent>
                Yes, all physical snapshot archives are encrypted using AES-256-GCM customer-managed encryption keys (CMEK) with automatic KMS key rotation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CodePreview>

      <!-- Collapsible Panel Primitive -->
      <CodePreview
        title="Collapsible Filter Panel (<Collapsible>)"
        description="Single collapsible card container for expandable filters, sidebars, and drawer widgets."
        :code="collapsibleSnippet"
      >
        <div class="space-y-3 p-1">
          <Collapsible v-model:open="isCollapsibleOpen" class="border rounded-xl bg-card overflow-hidden">
            <div class="flex items-center justify-between p-4 bg-muted/20">
              <div class="flex items-center gap-2">
                <SlidersHorizontal class="h-4 w-4 text-primary" />
                <span class="text-xs font-bold text-foreground">Advanced Query Parameters</span>
              </div>
              <CollapsibleTrigger as-child>
                <Button variant="ghost" size="icon-xs" class="h-7 w-7">
                  <ChevronsUpDown class="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent class="p-4 pt-2 text-xs text-muted-foreground border-t space-y-2">
              <p>Configure custom timeout limits, retry backoff multipliers, and replica read-pool overrides.</p>
              <div class="flex items-center gap-2 pt-1">
                <Badge variant="outline" class="text-[10px]">Pool: Master + 2 Read Replicas</Badge>
                <Badge variant="success" shape="pill" dot class="text-[10px]">Healthy</Badge>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CodePreview>
    </div>

    <!-- 6. MULTI-TRACK ACTIVITY TIMELINES (2-COL) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 1. Activity Audit Timeline -->
      <CodePreview
        title="CI/CD & Deployment Timeline"
        description="Chronological event pipeline with status badges, contextual icons, and relative timestamps."
        :code="timelineSnippet"
      >
        <Timeline :items="deploymentEvents" />
      </CodePreview>

      <!-- 2. Order Fulfillment / Milestone Timeline -->
      <CodePreview
        title="Order Tracking & Milestones"
        description="Step-by-step physical delivery and purchase milestone flow."
        :code="timelineSnippet"
      >
        <Timeline :items="orderTrackingEvents" />
      </CodePreview>
    </div>
  </div>
</template>
