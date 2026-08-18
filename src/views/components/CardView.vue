<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  ExternalLink,
  Sparkles,
} from '@lucide/vue'
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
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Cards & Surfaces</h1>
        <p class="text-sm text-muted-foreground">
          Card layouts, surface elevations, top highlight borders, ambient glow effects, and flush edge-to-edge footers.
        </p>
      </div>
    </div>

    <!-- 1. Supabase Style KPI / Metric Cards -->
    <div>
      <h3 class="text-sm font-semibold text-foreground mb-3">Metric & KPI Stats Cards</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Metric Card 1 -->
        <Card class="highlight-card shadow-xs">
          <CardContent class="p-5 space-y-2">
            <div class="flex items-center justify-between">
              <span class="label-mono">Total API Requests</span>
              <Activity class="h-4 w-4 text-primary" />
            </div>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-bold tracking-tight text-foreground">1.48M</h2>
              <span class="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-0.5">
                <TrendingUp class="h-3.5 w-3.5" />
                +14.2%
              </span>
            </div>
            <p class="text-xs text-muted-foreground">Compared to last 30 days</p>
          </CardContent>
        </Card>

        <!-- Metric Card 2 -->
        <Card class="highlight-card shadow-xs">
          <CardContent class="p-5 space-y-2">
            <div class="flex items-center justify-between">
              <span class="label-mono">Active Connections</span>
              <Users class="h-4 w-4 text-primary" />
            </div>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-bold tracking-tight text-foreground">842</h2>
              <span class="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-0.5">
                <TrendingUp class="h-3.5 w-3.5" />
                +5.8%
              </span>
            </div>
            <p class="text-xs text-muted-foreground">Pool capacity at 42%</p>
          </CardContent>
        </Card>

        <!-- Metric Card 3 -->
        <Card class="highlight-card shadow-xs">
          <CardContent class="p-5 space-y-2">
            <div class="flex items-center justify-between">
              <span class="label-mono">Database Latency</span>
              <Database class="h-4 w-4 text-muted-foreground" />
            </div>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-bold tracking-tight text-foreground">12.4 ms</h2>
              <span class="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 gap-0.5">
                <TrendingDown class="h-3.5 w-3.5" />
                -2.1 ms
              </span>
            </div>
            <p class="text-xs text-muted-foreground">Average query execution</p>
          </CardContent>
        </Card>

        <!-- Metric Card 4 -->
        <Card class="highlight-card shadow-xs">
          <CardContent class="p-5 space-y-2">
            <div class="flex items-center justify-between">
              <span class="label-mono">Cluster CPU Load</span>
              <Cpu class="h-4 w-4 text-muted-foreground" />
            </div>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-bold tracking-tight text-foreground">18.5%</h2>
              <span class="status-dot"></span>
            </div>
            <p class="text-xs text-muted-foreground">Optimal performance zone</p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- 2. Ambient Glow & Highlight Cards -->
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

    <!-- 3. Flush Edge-to-Edge Layout Card -->
    <div>
      <h3 class="text-sm font-semibold text-foreground mb-3">Flush Edge-to-Edge Card Layout</h3>
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <div class="p-6 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 class="text-base font-semibold text-foreground">Cluster Storage & Backups</h4>
            <p class="text-xs text-muted-foreground mt-0.5">Automated backups are stored in geo-redundant S3 buckets.</p>
          </div>
          <span class="label-mono">EU-WEST-1</span>
        </div>

        <div class="p-6 space-y-4">
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
        </div>

        <div class="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <span class="text-xs text-muted-foreground">Last backup snapshot completed 28 minutes ago</span>
          <Button size="sm" variant="outline">Manage Storage</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
