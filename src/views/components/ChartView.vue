<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Download,
  Calendar,
} from '@lucide/vue'

// ─── 1. Fluid Multi-Series Area Chart ─────────────────────────────────────────
const selectedPeriod = ref<'7d' | '30d' | '90d'>('30d')
const hoveredPoint = ref<{
  x: number
  y: number
  percentX: number
  label: string
  current: number
  previous: number
} | null>(null)

interface TimeSeriesPoint {
  label: string
  current: number
  previous: number
}

const areaData: Record<'7d' | '30d' | '90d', TimeSeriesPoint[]> = {
  '7d': [
    { label: 'Mon 00:00', current: 3200, previous: 2800 },
    { label: 'Mon 08:00', current: 4100, previous: 3300 },
    { label: 'Tue 00:00', current: 3800, previous: 3600 },
    { label: 'Tue 12:00', current: 5400, previous: 4200 },
    { label: 'Wed 00:00', current: 4900, previous: 4600 },
    { label: 'Wed 12:00', current: 6200, previous: 4900 },
    { label: 'Thu 00:00', current: 5800, previous: 5100 },
    { label: 'Thu 12:00', current: 7400, previous: 5600 },
    { label: 'Fri 00:00', current: 6900, previous: 6000 },
    { label: 'Fri 12:00', current: 8800, previous: 6700 },
    { label: 'Sat 00:00', current: 7500, previous: 6400 },
    { label: 'Sat 12:00', current: 6200, previous: 5900 },
    { label: 'Sun 00:00', current: 7800, previous: 6300 },
    { label: 'Sun 12:00', current: 9600, previous: 7100 },
  ],
  '30d': [
    { label: 'Day 1', current: 3100, previous: 2500 },
    { label: 'Day 3', current: 3600, previous: 2900 },
    { label: 'Day 5', current: 3400, previous: 3100 },
    { label: 'Day 7', current: 4500, previous: 3500 },
    { label: 'Day 9', current: 4200, previous: 3800 },
    { label: 'Day 11', current: 5600, previous: 4100 },
    { label: 'Day 13', current: 5200, previous: 4600 },
    { label: 'Day 15', current: 6400, previous: 4900 },
    { label: 'Day 17', current: 6100, previous: 5300 },
    { label: 'Day 19', current: 7300, previous: 5600 },
    { label: 'Day 21', current: 6900, previous: 6100 },
    { label: 'Day 23', current: 8200, previous: 6400 },
    { label: 'Day 25', current: 8700, previous: 6900 },
    { label: 'Day 27', current: 9400, previous: 7400 },
    { label: 'Day 29', current: 10600, previous: 7900 },
    { label: 'Day 30', current: 11800, previous: 8400 },
  ],
  '90d': [
    { label: 'Week 1', current: 12000, previous: 9500 },
    { label: 'Week 2', current: 14500, previous: 11000 },
    { label: 'Week 3', current: 13800, previous: 12200 },
    { label: 'Week 4', current: 16800, previous: 13500 },
    { label: 'Week 5', current: 19200, previous: 14800 },
    { label: 'Week 6', current: 22400, previous: 16200 },
    { label: 'Week 7', current: 25600, previous: 18100 },
    { label: 'Week 8', current: 28900, previous: 20400 },
    { label: 'Week 9', current: 32400, previous: 22800 },
    { label: 'Week 10', current: 36800, previous: 25100 },
    { label: 'Week 11', current: 41200, previous: 28400 },
    { label: 'Week 12', current: 46500, previous: 31200 },
  ],
}

const currentSeries = computed(() => areaData[selectedPeriod.value])

// High-fidelity spline computation using Centripetal Catmull-Rom with tension
function generateSpline(
  data: TimeSeriesPoint[],
  key: 'current' | 'previous',
  svgWidth: number,
  svgHeight: number
) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.current, d.previous))) * 1.12 || 1
  const step = svgWidth / (data.length - 1)
  const paddingBottom = 20
  const paddingTop = 25
  const usableHeight = svgHeight - paddingBottom - paddingTop

  const points = data.map((d, i) => {
    const val = d[key]
    const x = i * step
    const y = svgHeight - paddingBottom - (val / maxVal) * usableHeight
    return { x, y, label: d.label, current: d.current, previous: d.previous }
  })

  // Monotone/Catmull-Rom curve builder with tension 0.35
  const tension = 0.35
  let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = i < points.length - 2 ? points[i + 2] : p2

    const cp1x = p1.x + (p2.x - p0.x) * tension
    const cp1y = p1.y + (p2.y - p0.y) * tension
    const cp2x = p2.x - (p3.x - p1.x) * tension
    const cp2y = p2.y - (p3.y - p1.y) * tension

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }

  const fillPath = `${path} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`

  return { path, fillPath, points, maxVal }
}

const svgChart = computed(() => {
  const svgW = 900
  const svgH = 260
  const primary = generateSpline(currentSeries.value, 'current', svgW, svgH)
  const comparison = generateSpline(currentSeries.value, 'previous', svgW, svgH)
  return { svgW, svgH, primary, comparison }
})

function onChartMouseMove(e: MouseEvent) {
  const svgEl = e.currentTarget as SVGElement
  const rect = svgEl.getBoundingClientRect()
  const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  const percentX = mouseX / rect.width
  const points = svgChart.value.primary.points

  // Find closest point by index
  const index = Math.round(percentX * (points.length - 1))
  const pt = points[index]
  if (pt) {
    hoveredPoint.value = {
      x: pt.x,
      y: pt.y,
      percentX: (pt.x / svgChart.value.svgW) * 100,
      label: pt.label,
      current: pt.current,
      previous: pt.previous,
    }
  }
}

function onChartMouseLeave() {
  hoveredPoint.value = null
}

// ─── 2. Smooth Bar Chart (Daily Traffic & Success Rate) ───────────────────────
const barData = ref([
  { day: 'Mon', requests: 480, growth: '+14%' },
  { day: 'Tue', requests: 640, growth: '+22%' },
  { day: 'Wed', requests: 590, growth: '+18%' },
  { day: 'Thu', requests: 820, growth: '+34%' },
  { day: 'Fri', requests: 960, growth: '+41%' },
  { day: 'Sat', requests: 520, growth: '+12%' },
  { day: 'Sun', requests: 460, growth: '+8%' },
])

const maxBarValue = computed(() => Math.max(...barData.value.map((b) => b.requests)) * 1.15)
const activeBarIndex = ref<number | null>(4) // default Friday active

// ─── 3. Segmented Donut Chart (Storage Usage) ─────────────────────────────────
const storageData = ref([
  { label: 'Postgres Core DB', size: '52.4 GB', percent: 45, strokeColor: 'oklch(0.696 0.17 162.48)', colorClass: 'bg-emerald-500' },
  { label: 'Media & File Storage', size: '34.8 GB', percent: 30, strokeColor: 'oklch(0.6 0.16 240)', colorClass: 'bg-blue-500' },
  { label: 'WAL Logs & PITR', size: '17.4 GB', percent: 15, strokeColor: 'oklch(0.75 0.16 70)', colorClass: 'bg-amber-500' },
  { label: 'Index & Read Cache', size: '11.6 GB', percent: 10, strokeColor: 'oklch(0.65 0.2 300)', colorClass: 'bg-purple-500' },
])

const donutRadius = 42
const donutCircumference = 2 * Math.PI * donutRadius
const activeDonutIndex = ref<number | null>(null)

const donutSegments = computed(() => {
  let offset = 0
  const gap = 3 // visual separation gap between segments
  return storageData.value.map((item, idx) => {
    const rawLen = (item.percent / 100) * donutCircumference
    const strokeDasharray = `${Math.max(0, rawLen - gap)} ${donutCircumference}`
    const strokeDashoffset = -offset
    offset += rawLen
    return { ...item, strokeDasharray, strokeDashoffset, idx }
  })
})

// ─── 4. Live Edge Telemetry Wave ──────────────────────────────────────────────
const liveWavePoints = ref<number[]>([12, 14, 13, 16, 15, 19, 18, 14, 16, 17, 15, 21, 19, 14, 15, 18, 16, 13, 14, 15])
const currentPing = computed(() => liveWavePoints.value[liveWavePoints.value.length - 1])

const smoothWavePath = computed(() => {
  const pts = liveWavePoints.value
  const w = 500
  const h = 70
  const step = w / (pts.length - 1)
  const min = 10
  const max = 25

  const coords = pts.map((val, i) => ({
    x: i * step,
    y: h - ((val - min) / (max - min)) * (h - 15) - 8,
  }))

  let path = `M ${coords[0].x} ${coords[0].y}`
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const midX = (p1.x + p2.x) / 2
    path += ` Q ${p1.x} ${p1.y}, ${midX} ${(p1.y + p2.y) / 2} T ${p2.x} ${p2.y}`
  }

  const fill = `${path} L ${w} ${h} L 0 ${h} Z`
  return { path, fill }
})
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Telemetry &amp; Insights</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Charts &amp; Visualizations</h1>
        <p class="text-sm text-muted-foreground">
          Fluid, hardware-accelerated SVG graphs with multi-series curves and interactive hover tracking.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0 shrink-0">
        <Button variant="outline" size="sm" class="gap-1.5 text-xs">
          <Calendar class="h-3.5 w-3.5" />
          Select Range
        </Button>
        <Button size="sm" class="gap-1.5 text-xs">
          <Download class="h-3.5 w-3.5" />
          Export Dataset
        </Button>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 1. FLUID INTERACTIVE AREA WAVE GRAPH                                  -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
      <!-- Chart Card Header -->
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <CardTitle class="text-base font-semibold">Total Revenue &amp; Traffic Volume</CardTitle>
            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp class="h-3 w-3" />
              +28.4% vs prev period
            </span>
          </div>
          <CardDescription class="text-xs mt-1">
            Comparing current active timeframe against preceding baseline metrics.
          </CardDescription>
        </div>

        <div class="flex items-center gap-3">
          <!-- Series Legend -->
          <div class="hidden sm:flex items-center gap-3 text-xs mr-2">
            <span class="flex items-center gap-1.5 text-foreground font-medium">
              <span class="h-2 w-5 rounded-full bg-primary inline-block"></span>
              Current
            </span>
            <span class="flex items-center gap-1.5 text-muted-foreground">
              <span class="h-0.5 w-4 border-t border-dashed border-muted-foreground/70 inline-block"></span>
              Previous
            </span>
          </div>

          <!-- Period Buttons -->
          <div class="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border">
            <Button
              v-for="p in (['7d', '30d', '90d'] as const)"
              :key="p"
              variant="ghost"
              size="sm"
              class="h-7 px-3 text-xs transition-all duration-200"
              :class="{ 'bg-background text-foreground shadow-xs font-semibold': selectedPeriod === p }"
              @click="selectedPeriod = p"
            >
              {{ p.toUpperCase() }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Area Chart SVG Container -->
      <CardContent class="p-6">
        <div class="relative w-full h-80 select-none">
          <!-- Background Grid Matrix & Axis Scale -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-muted-foreground/40 text-[10px] font-mono">
            <div class="border-b border-border/40 w-full flex justify-between">
              <span>${{ (svgChart.primary.maxVal / 1000).toFixed(1) }}k</span>
              <span class="hidden sm:inline">100% Volume</span>
            </div>
            <div class="border-b border-border/25 w-full flex justify-between">
              <span>${{ (svgChart.primary.maxVal * 0.66 / 1000).toFixed(1) }}k</span>
            </div>
            <div class="border-b border-border/25 w-full flex justify-between">
              <span>${{ (svgChart.primary.maxVal * 0.33 / 1000).toFixed(1) }}k</span>
            </div>
            <div class="border-b border-border/40 w-full flex justify-between">
              <span>$0k</span>
            </div>
          </div>

          <!-- SVG Graphic Canvas -->
          <svg
            viewBox="0 0 900 260"
            preserveAspectRatio="none"
            class="w-full h-72 overflow-visible cursor-crosshair"
            @mousemove="onChartMouseMove"
            @mouseleave="onChartMouseLeave"
          >
            <defs>
              <!-- Multi-Stop Lush Emerald Gradient -->
              <linearGradient id="emeraldLushGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="oklch(0.696 0.17 162.48)" stop-opacity="0.38" />
                <stop offset="60%" stop-color="oklch(0.696 0.17 162.48)" stop-opacity="0.10" />
                <stop offset="100%" stop-color="oklch(0.696 0.17 162.48)" stop-opacity="0.0" />
              </linearGradient>

              <!-- Soft Glow Filter for Primary Stroke -->
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Comparison Series (Dashed Line) -->
            <path
              :d="svgChart.comparison.path"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-dasharray="4 4"
              class="text-muted-foreground/45 transition-all duration-500 ease-out"
            />

            <!-- Primary Series Area Fill -->
            <path
              :d="svgChart.primary.fillPath"
              fill="url(#emeraldLushGradient)"
              class="transition-all duration-500 ease-out"
            />

            <!-- Primary Series Stroke Line -->
            <path
              :d="svgChart.primary.path"
              fill="none"
              stroke="oklch(0.696 0.17 162.48)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-all duration-500 ease-out"
            />

            <!-- Hover Vertical Guide Crosshair -->
            <g v-if="hoveredPoint" class="transition-opacity duration-150">
              <line
                :x1="hoveredPoint.x"
                :y1="0"
                :x2="hoveredPoint.x"
                :y2="260"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-dasharray="3 3"
                class="text-primary/70 pointer-events-none"
              />

              <!-- Comparison Intersect Dot -->
              <circle
                :cx="hoveredPoint.x"
                :cy="svgChart.comparison.points.find(p => p.label === hoveredPoint?.label)?.y || 0"
                r="3.5"
                fill="currentColor"
                class="text-muted-foreground stroke-background stroke-2 pointer-events-none"
              />

              <!-- Static Soft Ambient Halo -->
              <circle
                :cx="hoveredPoint.x"
                :cy="hoveredPoint.y"
                r="10"
                fill="oklch(0.696 0.17 162.48)"
                opacity="0.2"
                class="pointer-events-none"
              />

              <!-- Primary Active Intersect Dot -->
              <circle
                :cx="hoveredPoint.x"
                :cy="hoveredPoint.y"
                r="5.5"
                fill="oklch(0.696 0.17 162.48)"
                class="stroke-background stroke-2 shadow-md pointer-events-none"
              />
            </g>
          </svg>

          <!-- Floating Smooth Follower Tooltip -->
          <div
            v-if="hoveredPoint"
            class="absolute -top-3 z-30 pointer-events-none -translate-x-1/2 transition-all duration-100 ease-out"
            :style="{ left: `${hoveredPoint.percentX}%` }"
          >
            <div class="rounded-lg border bg-popover/95 px-3 py-2 text-popover-foreground shadow-xl backdrop-blur-md text-xs space-y-1 min-w-36">
              <div class="flex items-center justify-between gap-3 border-b border-border/50 pb-1">
                <span class="font-bold text-foreground">{{ hoveredPoint.label }}</span>
                <span class="label-mono text-[10px] text-emerald-500">Live</span>
              </div>
              <div class="space-y-0.5 text-[11px]">
                <div class="flex items-center justify-between gap-4">
                  <span class="text-muted-foreground flex items-center gap-1.5">
                    <span class="h-2 w-2 rounded-full bg-primary inline-block"></span>
                    Current:
                  </span>
                  <span class="font-bold text-foreground font-mono">${{ hoveredPoint.current.toLocaleString() }}</span>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="text-muted-foreground flex items-center gap-1.5">
                    <span class="h-2 w-2 rounded-full bg-muted-foreground/60 inline-block"></span>
                    Previous:
                  </span>
                  <span class="font-mono text-muted-foreground">${{ hoveredPoint.previous.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic X-Axis Periodic Timeline Labels -->
        <div class="flex justify-between items-center pt-2 text-[11px] text-muted-foreground font-mono">
          <span v-for="d in currentSeries.filter((_, idx) => idx % Math.ceil(currentSeries.length / 7) === 0)" :key="d.label">
            {{ d.label }}
          </span>
          <span>{{ currentSeries[currentSeries.length - 1]?.label }}</span>
        </div>
      </CardContent>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 2. BAR DISTRIBUTION & SEGMENTED DONUT                                 -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-3">

      <!-- Smooth Bar Distribution (2/3 width) -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border lg:col-span-2">
        <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-semibold">API Traffic Invocations</CardTitle>
            <CardDescription class="text-xs">Peak requests throughput per weekday.</CardDescription>
          </div>
          <span class="label-mono text-primary font-bold">99.98% SUCCESS</span>
        </CardHeader>
        <CardContent class="p-6">
          <div class="flex items-end justify-between gap-2 sm:gap-4 h-56 pt-6">
            <div
              v-for="(bar, idx) in barData"
              :key="bar.day"
              class="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative h-full justify-end"
              @mouseenter="activeBarIndex = idx"
            >
              <!-- Bar Pillar with Top Highlight Cap -->
              <div class="w-full max-w-12 flex flex-col justify-end h-full">
                <div
                  class="w-full rounded-t-lg transition-all duration-300 ease-out relative group-hover:scale-105 origin-bottom"
                  :class="[
                    activeBarIndex === idx
                      ? 'bg-primary shadow-md shadow-primary/20'
                      : 'bg-primary/60 hover:bg-primary/80'
                  ]"
                  :style="{ height: `${(bar.requests / maxBarValue) * 100}%` }"
                >
                  <!-- Glowing top cap edge -->
                  <div class="absolute inset-x-0 top-0 h-1 bg-white/40 rounded-t-lg"></div>
                </div>
              </div>

              <!-- Day Label -->
              <span
                class="text-xs font-mono transition-colors duration-150"
                :class="activeBarIndex === idx ? 'text-foreground font-bold' : 'text-muted-foreground'"
              >
                {{ bar.day }}
              </span>

              <!-- Hover Tooltip -->
              <div
                v-if="activeBarIndex === idx"
                class="absolute -top-12 z-20 whitespace-nowrap rounded-md border bg-popover px-2.5 py-1 text-[11px] font-medium text-popover-foreground shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-150"
              >
                <strong class="font-bold text-foreground">{{ bar.requests }}k</strong> calls ({{ bar.growth }})
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Segmented Donut Ring (1/3 width) -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Storage Breakdown</CardTitle>
          <CardDescription class="text-xs">Database capacity &amp; assets partition.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex flex-col items-center justify-center">
          <!-- Donut SVG Ring with Smooth Linecaps -->
          <div class="relative w-48 h-48 flex items-center justify-center my-2 select-none">
            <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
              <!-- Background Track -->
              <circle
                cx="50"
                cy="50"
                :r="donutRadius"
                fill="transparent"
                stroke="currentColor"
                stroke-width="9"
                class="text-muted/30"
              />

              <!-- Segment Curves -->
              <circle
                v-for="seg in donutSegments"
                :key="seg.label"
                cx="50"
                cy="50"
                :r="donutRadius"
                fill="transparent"
                :stroke="seg.strokeColor"
                stroke-width="9"
                stroke-linecap="round"
                :stroke-dasharray="seg.strokeDasharray"
                :stroke-dashoffset="seg.strokeDashoffset"
                class="transition-all duration-300 ease-out cursor-pointer"
                :class="{
                  'stroke-12 opacity-100': activeDonutIndex === seg.idx,
                  'opacity-85 hover:opacity-100': activeDonutIndex !== seg.idx
                }"
                @mouseenter="activeDonutIndex = seg.idx"
                @mouseleave="activeDonutIndex = null"
              />
            </svg>

            <!-- Center Metric Summary -->
            <div class="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span class="text-2xl font-bold tracking-tight text-foreground font-mono">116.2 GB</span>
              <span class="text-[11px] text-muted-foreground">of 250 GB Quota</span>
            </div>
          </div>

          <!-- Interactive Legend List -->
          <div class="w-full divide-y divide-border/60 text-xs mt-3">
            <div
              v-for="seg in storageData"
              :key="seg.label"
              class="flex items-center justify-between py-2 cursor-pointer transition-colors"
              :class="{ 'text-foreground font-semibold': activeDonutIndex === storageData.indexOf(seg), 'text-muted-foreground': activeDonutIndex !== null && activeDonutIndex !== storageData.indexOf(seg) }"
              @mouseenter="activeDonutIndex = storageData.indexOf(seg)"
              @mouseleave="activeDonutIndex = null"
            >
              <div class="flex items-center gap-2">
                <span :class="['h-2.5 w-2.5 rounded-full shrink-0', seg.colorClass]"></span>
                <span class="text-xs truncate max-w-36">{{ seg.label }}</span>
              </div>
              <span class="font-mono text-xs">{{ seg.size }} ({{ seg.percent }}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 3. LIVE CONTINUOUS TELEMETRY STREAM                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
      <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <CardTitle class="text-base font-semibold">Live Edge Gateway Latency</CardTitle>
            <span class="status-dot"></span>
          </div>
          <CardDescription class="text-xs mt-0.5">
            Continuous streaming ping responses across all worldwide edge POP locations.
          </CardDescription>
        </div>

        <div class="flex items-center gap-6 text-xs">
          <div class="text-right">
            <span class="text-[11px] text-muted-foreground">Current</span>
            <p class="font-bold text-foreground font-mono">{{ currentPing }} ms</p>
          </div>
          <div class="text-right">
            <span class="text-[11px] text-muted-foreground">Global P95</span>
            <p class="font-bold text-foreground font-mono">18.4 ms</p>
          </div>
          <div class="text-right">
            <span class="text-[11px] text-muted-foreground">Status</span>
            <p class="font-bold text-emerald-500">Optimal</p>
          </div>
        </div>
      </CardHeader>
      <CardContent class="p-6">
        <div class="relative w-full h-20 overflow-hidden">
          <svg viewBox="0 0 500 70" preserveAspectRatio="none" class="w-full h-full">
            <defs>
              <linearGradient id="liveWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="oklch(0.696 0.17 162.48)" stop-opacity="0.25" />
                <stop offset="100%" stop-color="oklch(0.696 0.17 162.48)" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Fill Area -->
            <path :d="smoothWavePath.fill" fill="url(#liveWaveGrad)" />

            <!-- Smooth Curved Wave -->
            <path
              :d="smoothWavePath.path"
              fill="none"
              stroke="oklch(0.696 0.17 162.48)"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
