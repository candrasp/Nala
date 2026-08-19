<script setup lang="ts">
import {
  Activity,
  Database,
  Cpu,
  Server,
  ShieldCheck,
  Zap,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  HardDrive,
} from '@lucide/vue'

// Code Snippets for Documentation
const basicCardSnippet = `<Card class="shadow-sm">
  <CardHeader>
    <CardTitle>Project Settings</CardTitle>
    <CardDescription>Manage workspace preferences and deployment targets.</CardDescription>
  </CardHeader>
  <CardContent class="text-sm text-muted-foreground">
    <p>Configure automated deployments, branch protection rules, and environment variables.</p>
  </CardContent>
  <CardFooter class="flex justify-between border-t pt-4">
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Save Changes</Button>
  </CardFooter>
</Card>`

const kpiCardsSnippet = `<!-- 4-Column Metric Stats Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card class="highlight-card shadow-xs">
    <CardContent class="p-5 space-y-2">
      <div class="flex items-center justify-between">
        <span class="label-mono">Total API Requests</span>
        <Activity class="h-4 w-4 text-primary" />
      </div>
      <div class="flex items-baseline justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-foreground">1.48M</h2>
        <span class="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-0.5">
          <TrendingUp class="h-3.5 w-3.5" /> +14.2%
        </span>
      </div>
      <p class="text-xs text-muted-foreground">Compared to last 30 days</p>
    </CardContent>
  </Card>

  <Card class="highlight-card shadow-xs">
    <CardContent class="p-5 space-y-2">
      <div class="flex items-center justify-between">
        <span class="label-mono">Active Connections</span>
        <Users class="h-4 w-4 text-primary" />
      </div>
      <div class="flex items-baseline justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-foreground">842</h2>
        <span class="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-0.5">
          <TrendingUp class="h-3.5 w-3.5" /> +5.8%
        </span>
      </div>
      <p class="text-xs text-muted-foreground">Pool capacity at 42%</p>
    </CardContent>
  </Card>
</div>`

const flushCardSnippet = `<!-- Flush Edge-to-Edge Layout Card -->
<Card flush class="shadow-sm border">
  <!-- Tinted Header -->
  <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <CardTitle class="text-base font-semibold">Cluster Storage & Backups</CardTitle>
      <CardDescription class="text-xs mt-0.5">Automated backups stored in geo-redundant S3 buckets.</CardDescription>
    </div>
    <span class="label-mono">EU-WEST-1</span>
  </CardHeader>

  <!-- Content Workspace -->
  <CardContent class="p-6 space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-lg border border-border bg-background space-y-1">
        <span class="label-mono">Total Volume</span>
        <p class="text-xl font-bold text-foreground">250 GB</p>
        <p class="text-xs text-muted-foreground">NVMe SSD Allocated</p>
      </div>
      <div class="p-4 rounded-lg border border-border bg-background space-y-1">
        <span class="label-mono">Disk Used</span>
        <p class="text-xl font-bold text-foreground">64.2 GB</p>
        <p class="text-xs text-muted-foreground">25.6% Utilization</p>
      </div>
      <div class="p-4 rounded-lg border border-border bg-background space-y-1">
        <span class="label-mono">IOPS Limit</span>
        <p class="text-xl font-bold text-foreground">3,000 IOPS</p>
        <p class="text-xs text-muted-foreground">Burst up to 6,000</p>
      </div>
    </div>
  </CardContent>

  <!-- Flush Footer -->
  <CardFooter class="p-4 border-t border-border bg-muted/20 flex items-center justify-between">
    <span class="text-xs text-muted-foreground">Last backup completed 28 minutes ago</span>
    <Button size="sm" variant="outline">Manage Storage</Button>
  </CardFooter>
</Card>`

const interactiveCardsSnippet = `<!-- Interactive Action Cards with Hover Lift -->
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <Card class="p-5 border hover:border-primary/50 transition-all cursor-pointer hover:shadow-md group">
    <div class="flex items-start justify-between">
      <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Database class="h-5 w-5" />
      </div>
      <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
    <h3 class="font-semibold text-foreground mt-3 group-hover:text-primary transition-colors">PostgreSQL Database</h3>
    <p class="text-xs text-muted-foreground mt-1">Dedicated cloud database instance with automated failover.</p>
  </Card>

  <Card class="p-5 border hover:border-emerald-500/50 transition-all cursor-pointer hover:shadow-md group">
    <div class="flex items-start justify-between">
      <div class="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        <ShieldCheck class="h-5 w-5" />
      </div>
      <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
    <h3 class="font-semibold text-foreground mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Security & 2FA Auth</h3>
    <p class="text-xs text-muted-foreground mt-1">Enterprise SSO, RBAC permission scopes, and biometric keys.</p>
  </Card>

  <Card class="p-5 border hover:border-amber-500/50 transition-all cursor-pointer hover:shadow-md group">
    <div class="flex items-start justify-between">
      <div class="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
        <HardDrive class="h-5 w-5" />
      </div>
      <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
    <h3 class="font-semibold text-foreground mt-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Object Storage</h3>
    <p class="text-xs text-muted-foreground mt-1">S3-compatible distributed storage for media assets and files.</p>
  </Card>
</div>`

const glowCardsSnippet = `<!-- Pro Ambient Glow Card -->
<Card class="glow-area border-primary/30 shadow-sm relative">
  <CardHeader class="relative z-10">
    <div class="flex items-center gap-2 text-primary">
      <Zap class="h-4 w-4" />
      <span class="label-mono text-primary font-semibold">Pro Feature</span>
    </div>
    <CardTitle class="text-lg font-bold mt-1">Realtime Broadcast Channels</CardTitle>
    <CardDescription>Ambient radial glow backdrop (.glow-area) for highlighting premium upgrades.</CardDescription>
  </CardHeader>
  <CardContent class="relative z-10 space-y-3 text-xs text-muted-foreground">
    <p>Listen to PostgreSQL database changes in realtime over encrypted WebSockets with low latency.</p>
    <div class="flex items-center gap-2 pt-2">
      <Button size="sm" class="gap-1.5"><Sparkles class="h-3.5 w-3.5" /> Enable Realtime</Button>
    </div>
  </CardContent>
</Card>

<!-- Mesh Pattern Card -->
<Card class="bg-grid-pattern shadow-sm">
  <CardHeader>
    <div class="flex items-center gap-2 text-muted-foreground">
      <ShieldCheck class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      <span class="label-mono">Subtle Mesh Pattern</span>
    </div>
    <CardTitle class="text-lg font-bold mt-1">Mesh Background Pattern</CardTitle>
    <CardDescription>Card styled with modern 24px subtle grid lines (.bg-grid-pattern).</CardDescription>
  </CardHeader>
  <CardContent class="space-y-3 text-xs text-muted-foreground">
    <p>Automatically harmonizes with light & dark theme surfaces using alpha-channel OKLCH tokens.</p>
  </CardContent>
</Card>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Cards & Surfaces"
      description="Card layouts, surface elevations, top highlight borders, ambient glow effects, and flush edge-to-edge footers with copy-ready code snippets."
      badge="UI Component"
    />

    <!-- 1. Basic Card -->
    <CodePreview
      title="Basic Card Structure"
      description="Standard card with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter."
      :code="basicCardSnippet"
    >
      <div class="max-w-xl">
        <Card class="shadow-sm">
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Manage workspace preferences and deployment targets.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            <p>Configure automated deployments, branch protection rules, and environment variables.</p>
          </CardContent>
          <CardFooter class="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </CodePreview>

    <!-- 2. Metric & KPI Stats Cards -->
    <CodePreview
      title="Metric & KPI Stats Cards"
      description="High-density metric summary cards with top highlight border (.highlight-card) and indicator icons."
      :code="kpiCardsSnippet"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Metric 1 -->
        <Card class="shadow-sm">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Total API Requests</CardTitle>
            <Activity class="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-foreground">2,845,920</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span class="text-emerald-500 font-semibold inline-flex items-center">
                <ArrowUpRight class="h-3 w-3" /> +14.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <!-- Metric 2 -->
        <Card class="shadow-sm">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Active Connections</CardTitle>
            <Server class="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-foreground">14,290</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span class="text-emerald-500 font-semibold inline-flex items-center">
                <ArrowUpRight class="h-3 w-3" /> +4.8%
              </span>
              concurrent websockets
            </p>
          </CardContent>
        </Card>

        <!-- Metric 3 -->
        <Card class="shadow-sm">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Database Latency</CardTitle>
            <Database class="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-foreground">1.42 ms</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span class="text-emerald-500 font-semibold inline-flex items-center">
                <ArrowDownRight class="h-3 w-3" /> -0.3ms
              </span>
              p95 response time
            </p>
          </CardContent>
        </Card>

        <!-- Metric 4 -->
        <Card class="shadow-sm">
          <CardHeader class="flex flex-row items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">Cluster CPU Load</CardTitle>
            <Cpu class="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-foreground">28.4%</div>
            <p class="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span class="text-muted-foreground font-normal">8 nodes operational</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </CodePreview>

    <!-- 3. Flush Edge-to-Edge Layout Card -->
    <CodePreview
      title="Flush Edge-to-Edge Layout Card"
      description="Card with borderless flush headers & footers (Card flush) ideal for complex dashboard tables and widgets."
      :code="flushCardSnippet"
    >
      <Card flush class="shadow-sm border">
        <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle class="text-base font-semibold">Cluster Storage & Backups</CardTitle>
            <CardDescription class="text-xs mt-0.5">Automated backups are stored in geo-redundant S3 buckets.</CardDescription>
          </div>
          <span class="label-mono">EU-WEST-1</span>
        </CardHeader>

        <CardContent class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border border-border bg-background space-y-1">
              <span class="label-mono">Total Volume</span>
              <p class="text-xl font-bold text-foreground">250 GB</p>
              <p class="text-xs text-muted-foreground">NVMe SSD Allocated</p>
            </div>
            <div class="p-4 rounded-lg border border-border bg-background space-y-1">
              <span class="label-mono">Disk Used</span>
              <p class="text-xl font-bold text-foreground">64.2 GB</p>
              <p class="text-xs text-muted-foreground">25.6% Utilization</p>
            </div>
            <div class="p-4 rounded-lg border border-border bg-background space-y-1">
              <span class="label-mono">IOPS Limit</span>
              <p class="text-xl font-bold text-foreground">3,000 IOPS</p>
              <p class="text-xs text-muted-foreground">Burst up to 6,000</p>
            </div>
          </div>
        </CardContent>

        <CardFooter class="p-4 border-t border-border bg-muted/20 flex items-center justify-between">
          <span class="text-xs text-muted-foreground">Last backup snapshot completed 28 minutes ago</span>
          <Button size="sm" variant="outline">Manage Storage</Button>
        </CardFooter>
      </Card>
    </CodePreview>

    <!-- 4. Interactive Action & Hover Cards -->
    <CodePreview
      title="Interactive Action Cards"
      description="Clickable cards with hover borders, lift states, and integrated action triggers."
      :code="interactiveCardsSnippet"
    >
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card class="p-5 border hover:border-primary/50 transition-all cursor-pointer hover:shadow-md group">
          <div class="flex items-start justify-between">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Database class="h-5 w-5" />
            </div>
            <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 class="font-semibold text-foreground mt-3 group-hover:text-primary transition-colors">PostgreSQL Database</h3>
          <p class="text-xs text-muted-foreground mt-1">Dedicated cloud database instance with automated failover.</p>
        </Card>

        <Card class="p-5 border hover:border-emerald-500/50 transition-all cursor-pointer hover:shadow-md group">
          <div class="flex items-start justify-between">
            <div class="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck class="h-5 w-5" />
            </div>
            <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 class="font-semibold text-foreground mt-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Security & 2FA Auth</h3>
          <p class="text-xs text-muted-foreground mt-1">Enterprise SSO, RBAC permission scopes, and biometric keys.</p>
        </Card>

        <Card class="p-5 border hover:border-amber-500/50 transition-all cursor-pointer hover:shadow-md group">
          <div class="flex items-start justify-between">
            <div class="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <HardDrive class="h-5 w-5" />
            </div>
            <ArrowUpRight class="h-4 w-4 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 class="font-semibold text-foreground mt-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Object Storage</h3>
          <p class="text-xs text-muted-foreground mt-1">S3-compatible distributed storage for media assets and files.</p>
        </Card>
      </div>
    </CodePreview>

    <!-- 5. Ambient Glow & Highlight Cards -->
    <CodePreview
      title="Ambient Glow & Background Patterns"
      description="Specialized surface elevations featuring radial glow highlights (.glow-area) and subtle grid mesh (.bg-grid-pattern)."
      :code="glowCardsSnippet"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Glow Card -->
        <Card class="glow-area border-primary/30 shadow-sm relative">
          <CardHeader class="relative z-10">
            <div class="flex items-center gap-2 text-primary">
              <Zap class="h-4 w-4" />
              <span class="label-mono text-primary font-semibold">Pro Feature Highlight</span>
            </div>
            <CardTitle class="text-lg font-bold mt-1">Realtime Broadcast Channels</CardTitle>
            <CardDescription>
              Card featuring an ambient radial glow backdrop (.glow-area) for highlighting premium upgrades and featured metrics.
            </CardDescription>
          </CardHeader>
          <CardContent class="relative z-10 space-y-3 text-xs text-muted-foreground">
            <p>
              Listen to PostgreSQL database changes in realtime over encrypted WebSockets with low latency and automatic reconnection.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <Button size="sm" class="gap-1.5">
                <Sparkles class="h-3.5 w-3.5" />
                Enable Realtime
              </Button>
              <Button variant="outline" size="sm" class="gap-1.5">
                Documentation
                <ExternalLink class="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Pattern Grid Card -->
        <Card class="bg-grid-pattern shadow-sm">
          <CardHeader>
            <div class="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck class="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span class="label-mono">Subtle Mesh Pattern</span>
            </div>
            <CardTitle class="text-lg font-bold mt-1">Mesh Background Pattern</CardTitle>
            <CardDescription>
              Card styled with modern 24px subtle grid lines (.bg-grid-pattern) for hero cards and empty states.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-3 text-xs text-muted-foreground">
            <p>
              Automatically harmonizes with light & dark theme surfaces using alpha-channel OKLCH tokens.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <Button variant="secondary" size="sm">
                Explore Grid Utilities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CodePreview>
  </div>
</template>

