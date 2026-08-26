<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
} from '@/components/ui/chart'
import {
  TrendingUp,
  Download,
  Calendar,
} from '@lucide/vue'

// ─── 1. Area Chart (Multi-Series with Period Switcher) ────────────────────────
const selectedPeriod = ref<'7d' | '30d' | '90d'>('30d')

interface TimeSeriesPoint {
  label: string
  current: number
  previous: number
}

const areaData: Record<'7d' | '30d' | '90d', TimeSeriesPoint[]> = {
  '7d': [
    { label: 'Mon', current: 3200, previous: 2800 },
    { label: 'Tue', current: 4100, previous: 3300 },
    { label: 'Wed', current: 5400, previous: 4200 },
    { label: 'Thu', current: 6200, previous: 4900 },
    { label: 'Fri', current: 8800, previous: 6700 },
    { label: 'Sat', current: 7500, previous: 6400 },
    { label: 'Sun', current: 9600, previous: 7100 },
  ],
  '30d': [
    { label: 'Day 1', current: 3100, previous: 2500 },
    { label: 'Day 5', current: 3400, previous: 3100 },
    { label: 'Day 10', current: 5600, previous: 4100 },
    { label: 'Day 15', current: 6400, previous: 4900 },
    { label: 'Day 20', current: 7300, previous: 5600 },
    { label: 'Day 25', current: 8700, previous: 6900 },
    { label: 'Day 30', current: 11800, previous: 8400 },
  ],
  '90d': [
    { label: 'Week 1', current: 12000, previous: 9500 },
    { label: 'Week 3', current: 13800, previous: 12200 },
    { label: 'Week 6', current: 22400, previous: 16200 },
    { label: 'Week 9', current: 32400, previous: 22800 },
    { label: 'Week 12', current: 46500, previous: 31200 },
  ],
}

const currentSeries = computed(() => areaData[selectedPeriod.value])

// ─── 2. Bar Chart (Daily Requests & Target) ───────────────────────────────────
const barMode = ref<'grouped' | 'stacked'>('grouped')
const barData = ref([
  { day: 'Mon', requests: 480, target: 400 },
  { day: 'Tue', requests: 640, target: 500 },
  { day: 'Wed', requests: 590, target: 520 },
  { day: 'Thu', requests: 820, target: 600 },
  { day: 'Fri', requests: 960, target: 700 },
  { day: 'Sat', requests: 520, target: 450 },
  { day: 'Sun', requests: 460, target: 420 },
])

// ─── 3. Donut Chart (Storage Distribution) ───────────────────────────────────
const storageData = ref([
  { name: 'Postgres DB', value: 52.4 },
  { name: 'Media Files', value: 34.8 },
  { name: 'WAL Logs', value: 17.4 },
  { name: 'Read Cache', value: 11.6 },
])

// ─── 4. Line Chart (Latency & Throughput) ─────────────────────────────────────
const latencyData = ref([
  { time: '12:00', api: 28, worker: 14 },
  { time: '12:10', api: 32, worker: 16 },
  { time: '12:20', api: 45, worker: 18 },
  { time: '12:30', api: 38, worker: 15 },
  { time: '12:40', api: 52, worker: 24 },
  { time: '12:50', api: 41, worker: 19 },
  { time: '13:00', api: 34, worker: 16 },
])

// ─── Code Snippets for Documentation ─────────────────────────────────────────
const areaSnippet = `<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart'

const data = [
  { label: 'Mon', current: 3200, previous: 2800 },
  { label: 'Tue', current: 4100, previous: 3300 },
  // ...
]
<\/script>

<template>
  <div class="h-72 w-full">
    <AreaChart
      :data="data"
      index="label"
      :categories="['current', 'previous']"
      :colors="['var(--primary)', '#3b82f6']"
      showTooltip
      showLegend
    />
  </div>
</template>`

const barSnippet = `<script setup lang="ts">
import { BarChart } from '@/components/ui/chart'

const data = [
  { day: 'Mon', requests: 480, target: 400 },
  { day: 'Tue', requests: 640, target: 500 },
  // ...
]
<\/script>

<template>
  <div class="h-64 w-full">
    <BarChart
      :data="data"
      index="day"
      :categories="['requests', 'target']"
      :colors="['var(--primary)', '#3b82f6']"
      type="grouped"
      showTooltip
      showLegend
    />
  </div>
</template>`

const donutSnippet = `<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart'

const data = [
  { name: 'Postgres DB', value: 52.4 },
  { name: 'Media Files', value: 34.8 },
  // ...
]
<\/script>

<template>
  <div class="h-64 w-full">
    <DonutChart
      :data="data"
      index="name"
      category="value"
      :valueFormatter="(val) => \`\${val} GB\`"
      showTooltip
      showLegend
    />
  </div>
</template>`

const lineSnippet = `<script setup lang="ts">
import { LineChart } from '@/components/ui/chart'

const data = [
  { time: '12:00', api: 28, worker: 14 },
  { time: '12:10', api: 32, worker: 16 },
  // ...
]
<\/script>

<template>
  <div class="h-64 w-full">
    <LineChart
      :data="data"
      index="time"
      :categories="['api', 'worker']"
      :colors="['#10b981', '#8b5cf6']"
      showTooltip
      showLegend
    />
  </div>
</template>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Charts &amp; Visualizations"
      description="Production-ready, declarative chart primitives powered by @unovis/vue and styled with Tailwind CSS tokens &amp; CSS variables."
      badge="Data Visualization"
    >
      <template #actions>
        <Button variant="outline" size="sm" class="gap-1.5 text-xs shadow-2xs">
          <Calendar class="h-3.5 w-3.5" />
          Select Range
        </Button>
        <Button size="sm" class="gap-1.5 text-xs shadow-2xs">
          <Download class="h-3.5 w-3.5" />
          Export Dataset
        </Button>
      </template>
    </PageHeader>

    <!-- 1. MULTI-SERIES AREA CHART -->
    <CodePreview
      title="Multi-Series Area Chart"
      description="Smooth spline area chart with gradient opacity, reactive period switching, and crosshair tooltip."
      :code="areaSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-border/60">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-semibold text-foreground">Traffic Volume &amp; Ingress</h4>
              <Badge variant="success" shape="pill" class="text-[10px]">
                <TrendingUp class="h-3 w-3 mr-1" />
                +28.4%
              </Badge>
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">Comparing current timeframe against previous baseline period.</p>
          </div>

          <!-- Timeframe Switcher -->
          <div class="inline-flex rounded-lg border border-border p-0.5 bg-muted/40 text-xs shadow-2xs">
            <button
              v-for="p in (['7d', '30d', '90d'] as const)"
              :key="p"
              class="px-3 py-1 rounded-md font-medium transition-all cursor-pointer"
              :class="selectedPeriod === p ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
              @click="selectedPeriod = p"
            >
              {{ p.toUpperCase() }}
            </button>
          </div>
        </div>

        <div class="h-72 w-full pt-2">
          <AreaChart
            :data="currentSeries"
            index="label"
            :categories="['current', 'previous']"
            :colors="['var(--primary)', '#3b82f6']"
            showTooltip
            showLegend
            class="h-full"
          />
        </div>
      </div>
    </CodePreview>

    <!-- 2. BAR CHART -->
    <CodePreview
      title="Grouped &amp; Stacked Bar Chart"
      description="High-density discrete metric comparison with customizable bar grouping and rounded corners."
      :code="barSnippet"
    >
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-border/60">
          <div>
            <h4 class="text-sm font-semibold text-foreground">Daily Request Throughput</h4>
            <p class="text-xs text-muted-foreground mt-0.5">Volume of API requests vs SLA target capacity.</p>
          </div>

          <!-- Mode Toggle -->
          <div class="inline-flex rounded-lg border border-border p-0.5 bg-muted/40 text-xs shadow-2xs">
            <button
              class="px-3 py-1 rounded-md font-medium transition-all cursor-pointer capitalize"
              :class="barMode === 'grouped' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
              @click="barMode = 'grouped'"
            >
              Grouped
            </button>
            <button
              class="px-3 py-1 rounded-md font-medium transition-all cursor-pointer capitalize"
              :class="barMode === 'stacked' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
              @click="barMode = 'stacked'"
            >
              Stacked
            </button>
          </div>
        </div>

        <div class="h-64 w-full pt-2">
          <BarChart
            :data="barData"
            index="day"
            :categories="['requests', 'target']"
            :colors="['var(--primary)', '#3b82f6']"
            :type="barMode"
            showTooltip
            showLegend
            class="h-full"
          />
        </div>
      </div>
    </CodePreview>

    <!-- 3. DONUT & LINE CHARTS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Donut Chart -->
      <CodePreview
        title="Donut Distribution Chart"
        description="Segmented proportional breakdown with interactive hover highlight."
        :code="donutSnippet"
      >
        <div class="space-y-4">
          <div class="pb-2 border-b border-border/60">
            <h4 class="text-sm font-semibold text-foreground">Storage Allocation</h4>
            <p class="text-xs text-muted-foreground mt-0.5">Capacity distribution across persistent volumes.</p>
          </div>

          <div class="h-60 w-full flex items-center justify-center">
            <DonutChart
              :data="storageData"
              index="name"
              category="value"
              :valueFormatter="(val) => `${val} GB`"
              showTooltip
              showLegend
              class="h-full"
            />
          </div>
        </div>
      </CodePreview>

      <!-- Line Chart -->
      <CodePreview
        title="Multi-Series Line Chart"
        description="Continuous telemetry time-series with multiple data streams."
        :code="lineSnippet"
      >
        <div class="space-y-4">
          <div class="pb-2 border-b border-border/60">
            <h4 class="text-sm font-semibold text-foreground">API Latency Telemetry (ms)</h4>
            <p class="text-xs text-muted-foreground mt-0.5">Real-time p95 response times across cluster nodes.</p>
          </div>

          <div class="h-60 w-full pt-2">
            <LineChart
              :data="latencyData"
              index="time"
              :categories="['api', 'worker']"
              :colors="['#10b981', '#8b5cf6']"
              showTooltip
              showLegend
              class="h-full"
            />
          </div>
        </div>
      </CodePreview>
    </div>
  </div>
</template>
