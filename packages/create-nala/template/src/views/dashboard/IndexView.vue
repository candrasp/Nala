<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader.vue'
import {
  Users,
  DollarSign,
  UserPlus,
  Activity,
  ArrowUpRight,
  Sparkles,
  Layers,
  Code2,
} from '@lucide/vue'

// ─── KPI Stats ────────────────────────────────────────────────────────────────
const stats = [
  {
    title: 'Total Revenue',
    value: '$48,295',
    change: '+12.5%',
    changeLabel: 'vs last month',
    positive: true,
    icon: DollarSign,
    color: 'text-emerald-500',
  },
  {
    title: 'Active Users',
    value: '14,832',
    change: '+8.2%',
    changeLabel: 'vs last month',
    positive: true,
    icon: Users,
    color: 'text-primary',
  },
  {
    title: 'New Signups',
    value: '2,741',
    change: '+23.1%',
    changeLabel: 'this week',
    positive: true,
    icon: UserPlus,
    color: 'text-violet-500',
  },
  {
    title: 'System Health',
    value: '99.98%',
    change: 'Operational',
    changeLabel: 'all systems nominal',
    positive: true,
    icon: Activity,
    color: 'text-emerald-500',
  },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <PageHeader
      title="Dashboard"
      description="Welcome back to your Nala application overview."
    >
      <template #actions>
        <Button size="sm" class="gap-1.5 cursor-pointer">
          <Sparkles class="h-4 w-4" />
          <span>New Action</span>
        </Button>
      </template>
    </PageHeader>

    <!-- KPI Metric Cards Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="stat in stats"
        :key="stat.title"
        class="relative overflow-hidden transition-all duration-200 hover:shadow-md"
      >
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            {{ stat.title }}
          </CardTitle>
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
            <component :is="stat.icon" class="h-4 w-4" :class="stat.color" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold tracking-tight text-foreground">
            {{ stat.value }}
          </div>
          <div class="mt-1 flex items-center text-xs text-muted-foreground">
            <span
              class="inline-flex items-center font-medium mr-1"
              :class="stat.positive ? 'text-emerald-500' : 'text-amber-500'"
            >
              <ArrowUpRight class="h-3 w-3 mr-0.5" />
              {{ stat.change }}
            </span>
            <span>{{ stat.changeLabel }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Starter Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers class="h-4 w-4" />
            </div>
            <div>
              <CardTitle class="text-base">Ready-to-use UI Primitives</CardTitle>
              <CardDescription>Over 34+ accessible components preconfigured.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-3">
          <p>
            Build your pages with standardized Reka UI primitives styled with Tailwind CSS v4 in
            <code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">src/components/ui/</code>.
          </p>
          <div class="pt-2">
            <router-link to="/_blank">
              <Button variant="outline" size="sm" class="gap-1.5">
                <Code2 class="h-4 w-4" />
                <span>Open Blank Template</span>
              </Button>
            </router-link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Sparkles class="h-4 w-4" />
            </div>
            <div>
              <CardTitle class="text-base">Enterprise Service Layer</CardTitle>
              <CardDescription>Axios client with typed request interceptors.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-3">
          <p>
            Easily connect your real REST or GraphQL APIs using the modular architecture in
            <code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">src/services/</code>.
          </p>
          <p class="text-xs text-muted-foreground">
            Includes automatic token injection, global error toast handling, and full TypeScript typing.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
