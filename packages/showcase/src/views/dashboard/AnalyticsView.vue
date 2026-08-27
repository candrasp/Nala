<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Activity,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Monitor,
  Smartphone,
  Tablet,
  Download,
} from '@lucide/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AreaChart } from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/sonner'

// ─── Period Switcher ──────────────────────────────────────────────────────────
type TimeRange = '24h' | '7d' | '30d'
const selectedRange = ref<TimeRange>('7d')

interface MetricStat {
  title: string
  value: string
  change: string
  changeLabel: string
  positive: boolean
  icon: any
  color: string
  bg: string
  sparkline: number[]
}

interface RangeDataset {
  activeNow: number
  stats: MetricStat[]
  chart: { label: string; views: number; visitors: number }[]
}

const rangeDatasets: Record<TimeRange, RangeDataset> = {
  '24h': {
    activeNow: 168,
    stats: [
      {
        title: 'Total Page Views',
        value: '48,120',
        change: '+8.4%',
        changeLabel: 'vs yesterday',
        positive: true,
        icon: Eye,
        color: 'text-primary',
        bg: 'bg-primary/10',
        sparkline: [18, 22, 28, 24, 32, 40, 36, 48, 52, 60, 56, 68],
      },
      {
        title: 'Unique Visitors',
        value: '12,480',
        change: '+5.2%',
        changeLabel: 'vs yesterday',
        positive: true,
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        sparkline: [10, 12, 16, 14, 20, 24, 22, 28, 30, 36, 32, 42],
      },
      {
        title: 'Avg Session Duration',
        value: '3m 52s',
        change: '+18s',
        changeLabel: 'vs yesterday',
        positive: true,
        icon: Clock,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        sparkline: [3.1, 3.2, 3.4, 3.3, 3.6, 3.8, 3.7, 4.0, 3.9, 4.1, 4.0, 4.2],
      },
      {
        title: 'Bounce Rate',
        value: '36.4%',
        change: '-2.1%',
        changeLabel: 'vs yesterday',
        positive: false,
        icon: Activity,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        sparkline: [40, 39, 38, 39, 37, 38, 36, 37, 36, 35, 36, 35.4],
      },
    ],
    chart: [
      { label: '00:00', views: 1800, visitors: 620 },
      { label: '03:00', views: 1100, visitors: 380 },
      { label: '06:00', views: 2400, visitors: 890 },
      { label: '09:00', views: 6800, visitors: 2450 },
      { label: '12:00', views: 8900, visitors: 3120 },
      { label: '15:00', views: 9400, visitors: 3400 },
      { label: '18:00', views: 8100, visitors: 2850 },
      { label: '21:00', views: 5600, visitors: 1950 },
    ],
  },
  '7d': {
    activeNow: 142,
    stats: [
      {
        title: 'Total Page Views',
        value: '482,910',
        change: '+24.8%',
        changeLabel: 'vs last week',
        positive: true,
        icon: Eye,
        color: 'text-primary',
        bg: 'bg-primary/10',
        sparkline: [22, 28, 26, 35, 33, 45, 42, 58, 54, 68, 62, 75],
      },
      {
        title: 'Unique Visitors',
        value: '94,320',
        change: '+16.3%',
        changeLabel: 'vs last week',
        positive: true,
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        sparkline: [40, 42, 45, 52, 48, 60, 58, 65, 63, 72, 70, 80],
      },
      {
        title: 'Avg Session Duration',
        value: '4m 18s',
        change: '+42s',
        changeLabel: 'vs last week',
        positive: true,
        icon: Clock,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        sparkline: [3.2, 3.4, 3.3, 3.8, 3.6, 4.0, 3.9, 4.2, 4.1, 4.4, 4.3, 4.5],
      },
      {
        title: 'Bounce Rate',
        value: '38.2%',
        change: '-4.1%',
        changeLabel: 'vs last week',
        positive: false,
        icon: Activity,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        sparkline: [44, 43, 42, 41, 42, 40, 39, 40, 39, 38.5, 38.8, 38.2],
      },
    ],
    chart: [
      { label: 'Mon', views: 48000, visitors: 12400 },
      { label: 'Tue', views: 59000, visitors: 16800 },
      { label: 'Wed', views: 64000, visitors: 18200 },
      { label: 'Thu', views: 82000, visitors: 22100 },
      { label: 'Fri', views: 96000, visitors: 25900 },
      { label: 'Sat', views: 72000, visitors: 18400 },
      { label: 'Sun', views: 88000, visitors: 23600 },
    ],
  },
  '30d': {
    activeNow: 155,
    stats: [
      {
        title: 'Total Page Views',
        value: '1,842,500',
        change: '+31.2%',
        changeLabel: 'vs last month',
        positive: true,
        icon: Eye,
        color: 'text-primary',
        bg: 'bg-primary/10',
        sparkline: [120, 135, 140, 155, 170, 165, 185, 190, 210, 225, 230, 250],
      },
      {
        title: 'Unique Visitors',
        value: '382,100',
        change: '+22.4%',
        changeLabel: 'vs last month',
        positive: true,
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        sparkline: [30, 35, 38, 42, 48, 46, 52, 58, 62, 68, 72, 80],
      },
      {
        title: 'Avg Session Duration',
        value: '4m 35s',
        change: '+55s',
        changeLabel: 'vs last month',
        positive: true,
        icon: Clock,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        sparkline: [3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7],
      },
      {
        title: 'Bounce Rate',
        value: '35.8%',
        change: '-6.2%',
        changeLabel: 'vs last month',
        positive: false,
        icon: Activity,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        sparkline: [42, 41, 40, 39, 38, 37, 37, 36, 36, 35.8, 35.9, 35.8],
      },
    ],
    chart: [
      { label: 'Day 1', views: 42000, visitors: 11200 },
      { label: 'Day 5', views: 52000, visitors: 14500 },
      { label: 'Day 10', views: 64000, visitors: 17800 },
      { label: 'Day 15', views: 74000, visitors: 20200 },
      { label: 'Day 20', views: 83000, visitors: 22800 },
      { label: 'Day 25', views: 95000, visitors: 26400 },
      { label: 'Day 30', views: 118000, visitors: 32100 },
    ],
  },
}

const currentDataset = computed(() => rangeDatasets[selectedRange.value])



// ─── Acquisition Channels ──────────────────────────────────────────────────────
const acquisitionChannels = [
  { channel: 'Organic Search', visitors: '41,500', share: 44, color: 'bg-primary' },
  { channel: 'Direct Traffic', visitors: '24,520', share: 26, color: 'bg-blue-500' },
  { channel: 'Referral & Backlinks', visitors: '13,200', share: 14, color: 'bg-violet-500' },
  { channel: 'Social Media', visitors: '10,380', share: 11, color: 'bg-amber-500' },
  { channel: 'Email Newsletter', visitors: '4,720', share: 5, color: 'bg-emerald-500' },
]

// ─── Geographic Breakdown ──────────────────────────────────────────────────────
const topCountries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', sessions: '38,290', percent: 40.6 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', sessions: '14,120', percent: 15.0 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', sessions: '11,480', percent: 12.2 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', sessions: '9,340', percent: 9.9 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', sessions: '8,420', percent: 8.9 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', sessions: '5,840', percent: 6.2 },
]

// ─── Device Breakdown ──────────────────────────────────────────────────────────
const deviceStats = [
  { type: 'Desktop', share: 58, icon: Monitor, color: 'text-primary' },
  { type: 'Mobile', share: 36, icon: Smartphone, color: 'text-blue-500' },
  { type: 'Tablet', share: 6, icon: Tablet, color: 'text-amber-500' },
]

// ─── Top Landing Pages ─────────────────────────────────────────────────────────
const topPages = [
  { path: '/dashboard', title: 'Main Analytics Console', views: '142,800', avgTime: '4m 12s', bounce: '32.1%' },
  { path: '/components/buttons', title: 'Buttons & Micro-Actions', views: '68,400', avgTime: '3m 45s', bounce: '36.4%' },
  { path: '/billing/invoice/inv-101', title: 'Printable Invoice Viewer', views: '45,200', avgTime: '2m 18s', bounce: '28.9%' },
  { path: '/landing', title: 'Product Launch Showcase', views: '38,900', avgTime: '5m 02s', bounce: '41.2%' },
  { path: '/settings', title: 'Workspace Configuration', views: '29,400', avgTime: '2m 54s', bounce: '34.0%' },
]

function handleExport() {
  toast.success(`Analytics report for ${selectedRange.value.toUpperCase()} exported to CSV.`)
}
</script>

<template>
  <div class="space-y-6 pb-12">
    <!-- 1. Header & Timeframe Switcher -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Analytics &amp; Traffic
          </h1>
          <Badge variant="info" shape="pill" dot pulse class="text-[11px] font-semibold py-0.5">
            {{ currentDataset.activeNow }} Active Now
          </Badge>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Deep telemetry across user acquisition channels, global geographic distribution, and session retention.
        </p>
      </div>

      <!-- Action Toolbar -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <div class="inline-flex rounded-lg border border-border p-0.5 bg-muted/40 text-xs shadow-2xs">
          <button
            v-for="r in (['24h', '7d', '30d'] as const)"
            :key="r"
            class="px-3 py-1 rounded-md font-medium transition-all cursor-pointer"
            :class="selectedRange === r ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
            @click="selectedRange = r"
          >
            {{ r.toUpperCase() }}
          </button>
        </div>

        <Button variant="outline" size="sm" class="h-8 gap-1.5 text-xs shadow-2xs" @click="handleExport">
          <Download class="h-3.5 w-3.5" />
          <span class="hidden sm:inline">Export Report</span>
        </Button>
      </div>
    </div>

    <!-- 2. Compact, Proportional Top 4 KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="stat in currentDataset.stats"
        :key="stat.title"
        flush
        class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200"
      >
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">{{ stat.title }}</span>
            <component :is="stat.icon" class="h-4 w-4" :class="stat.color" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground font-mono">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground flex items-center gap-1">
            <span
              class="font-semibold inline-flex items-center gap-0.5"
              :class="stat.positive ? 'text-emerald-500' : 'text-rose-500'"
            >
              <component :is="stat.positive ? ArrowUpRight : ArrowDownRight" class="h-3.5 w-3.5" />
              {{ stat.change }}
            </span>
            <span>{{ stat.changeLabel }}</span>
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- 3. Unovis Area Chart & Acquisition Breakdown -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Unovis Area Chart -->
      <Card class="lg:col-span-2 border-border/80 bg-card shadow-2xs overflow-hidden flex flex-col justify-between">
        <div>
          <CardHeader class="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
            <div>
              <CardTitle class="text-base font-bold">Traffic Volume &amp; Sessions</CardTitle>
              <CardDescription class="text-xs">
                Page views vs unique visitor throughput across {{ selectedRange.toUpperCase() }}
              </CardDescription>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <span class="flex items-center gap-1.5 text-muted-foreground font-medium">
                <span class="h-2.5 w-2.5 rounded-full bg-primary" />
                <span>Page Views</span>
              </span>
              <span class="flex items-center gap-1.5 text-muted-foreground font-medium">
                <span class="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span>Unique Visitors</span>
              </span>
            </div>
          </CardHeader>

          <CardContent class="p-4 sm:p-6">
            <div class="w-full h-64">
              <AreaChart
                :data="currentDataset.chart"
                index="label"
                :categories="['views', 'visitors']"
                :colors="['var(--primary)', '#3b82f6']"
                showTooltip
                class="h-full"
              />
            </div>
          </CardContent>
        </div>
      </Card>

      <!-- Acquisition Sources & Device Breakdown -->
      <Card class="border-border/80 bg-card shadow-2xs flex flex-col justify-between">
        <div>
          <CardHeader class="pb-3 border-b border-border/40">
            <CardTitle class="text-base font-bold">Acquisition Channels</CardTitle>
            <CardDescription class="text-xs">Incoming referrer traffic breakdown</CardDescription>
          </CardHeader>

          <CardContent class="p-4 space-y-3.5">
            <div v-for="ch in acquisitionChannels" :key="ch.channel" class="space-y-1 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-medium text-foreground">{{ ch.channel }}</span>
                <span class="font-mono text-muted-foreground">{{ ch.visitors }} ({{ ch.share }}%)</span>
              </div>
              <div class="h-2 w-full rounded-full bg-muted/60 overflow-hidden">
                <div :class="ch.color" class="h-full rounded-full transition-all duration-500" :style="{ width: `${ch.share}%` }" />
              </div>
            </div>
          </CardContent>
        </div>

        <!-- Device Mix Footnote -->
        <div class="p-4 pt-3 border-t border-border/40 bg-muted/20">
          <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Device Distribution
          </p>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div
              v-for="dev in deviceStats"
              :key="dev.type"
              class="p-2 rounded-lg border border-border/50 bg-background/80 text-xs flex flex-col items-center justify-center gap-1 shadow-2xs"
            >
              <component :is="dev.icon" class="h-3.5 w-3.5" :class="dev.color" />
              <span class="text-[10px] text-muted-foreground">{{ dev.type }}</span>
              <span class="font-bold text-foreground font-mono">{{ dev.share }}%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- 4. Geographic Demographics & Top Pages Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Geographic Demographics -->
      <Card class="border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-3 border-b border-border/40">
          <CardTitle class="text-base font-bold">Audience by Country</CardTitle>
          <CardDescription class="text-xs">Top geographic concentration of active sessions</CardDescription>
        </CardHeader>

        <CardContent class="p-4 space-y-2.5">
          <div
            v-for="country in topCountries"
            :key="country.code"
            class="flex items-center justify-between p-2.5 rounded-lg border border-border/40 hover:bg-muted/20 transition-colors text-xs"
          >
            <div class="flex items-center gap-2.5">
              <span class="text-base leading-none">{{ country.flag }}</span>
              <span class="font-medium text-foreground">{{ country.name }}</span>
            </div>

            <div class="flex items-center gap-3">
              <span class="font-mono text-muted-foreground">{{ country.sessions }}</span>
              <div class="w-16 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div class="h-full bg-primary rounded-full" :style="{ width: `${country.percent}%` }" />
              </div>
              <span class="font-mono font-bold text-foreground w-10 text-right">{{ country.percent }}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Top Landing Pages Table -->
      <Card class="border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-3 border-b border-border/40">
          <CardTitle class="text-base font-bold">Top Content &amp; Landing Pages</CardTitle>
          <CardDescription class="text-xs">Highest traffic routes and dwell time</CardDescription>
        </CardHeader>

        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="text-xs">Page / Route</TableHead>
                <TableHead class="text-xs text-right">Views</TableHead>
                <TableHead class="text-xs text-right">Avg Dwell</TableHead>
                <TableHead class="text-xs text-right">Bounce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="page in topPages" :key="page.path" class="text-xs hover:bg-muted/20 transition-colors">
                <TableCell>
                  <p class="font-mono font-semibold text-primary truncate max-w-44">{{ page.path }}</p>
                  <p class="text-[10px] text-muted-foreground truncate max-w-44">{{ page.title }}</p>
                </TableCell>
                <TableCell class="text-right font-mono font-medium text-foreground">
                  {{ page.views }}
                </TableCell>
                <TableCell class="text-right font-mono text-muted-foreground">
                  {{ page.avgTime }}
                </TableCell>
                <TableCell class="text-right font-mono text-foreground font-semibold">
                  {{ page.bounce }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
