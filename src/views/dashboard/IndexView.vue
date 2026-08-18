<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Download,
  RefreshCw,
  ShieldCheck,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  CreditCard,
  Server,
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
    bg: 'bg-emerald-500/10',
    sparkline: [28, 35, 30, 42, 38, 50, 45, 58, 52, 60, 55, 68],
  },
  {
    title: 'Active Users',
    value: '14,832',
    change: '+8.2%',
    changeLabel: 'vs last month',
    positive: true,
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    sparkline: [40, 38, 45, 42, 55, 50, 60, 58, 65, 70, 68, 75],
  },
  {
    title: 'New Signups',
    value: '2,741',
    change: '+23.1%',
    changeLabel: 'this week',
    positive: true,
    icon: UserPlus,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    sparkline: [20, 28, 24, 35, 30, 45, 38, 52, 48, 60, 55, 72],
  },
  {
    title: 'Churn Rate',
    value: '2.4%',
    change: '-0.3%',
    changeLabel: 'vs last month',
    positive: false,
    icon: TrendingDown,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    sparkline: [32, 28, 35, 30, 28, 32, 27, 25, 28, 24, 22, 20],
  },
]

function buildSparkline(points: number[]): string {
  const w = 80
  const h = 32
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = w / (points.length - 1)
  return points
    .map((v, i) => {
      const x = i * step
      const y = h - ((v - min) / range) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

// ─── Quick Metrics ────────────────────────────────────────────────────────────
const quickMetrics = computed(() => [
  { label: 'API Requests', value: '3.2M', sub: 'today' },
  { label: 'Error Rate', value: '0.04%', sub: 'last 24h' },
  { label: 'Avg Response', value: '142ms', sub: 'p95' },
  { label: 'Uptime SLA', value: '99.97%', sub: '30-day' },
])

// ─── Transactions ─────────────────────────────────────────────────────────────
const transactions = ref([
  {
    id: 'TXN-9821',
    user: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    initials: 'OM',
    amount: '+$1,999.00',
    type: 'Subscription',
    status: 'completed',
    time: 'Just now',
  },
  {
    id: 'TXN-9820',
    user: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    initials: 'JL',
    amount: '+$249.00',
    type: 'One-time',
    status: 'completed',
    time: '4 min ago',
  },
  {
    id: 'TXN-9819',
    user: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    initials: 'IN',
    amount: '+$899.00',
    type: 'Subscription',
    status: 'pending',
    time: '12 min ago',
  },
  {
    id: 'TXN-9818',
    user: 'William Kim',
    email: 'will@email.com',
    initials: 'WK',
    amount: '-$99.00',
    type: 'Refund',
    status: 'refunded',
    time: '38 min ago',
  },
  {
    id: 'TXN-9817',
    user: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    initials: 'SD',
    amount: '+$399.00',
    type: 'Subscription',
    status: 'completed',
    time: '1 hr ago',
  },
])

const statusConfig: Record<string, { label: string; class: string }> = {
  completed: { label: 'Completed', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  pending: { label: 'Pending', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  refunded: { label: 'Refunded', class: 'bg-muted text-muted-foreground' },
}

// ─── Activity Feed ────────────────────────────────────────────────────────────
const activities = ref([
  {
    icon: UserPlus,
    iconBg: 'bg-blue-500/10 text-blue-500',
    title: 'New user registered',
    desc: 'sophia.white@example.com joined the platform',
    time: '2 min ago',
  },
  {
    icon: CreditCard,
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    title: 'Payment received',
    desc: 'Enterprise plan — $2,400/yr from Acme Corp',
    time: '15 min ago',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-violet-500/10 text-violet-500',
    title: 'Security audit passed',
    desc: 'All 48 security checks passed successfully',
    time: '1 hr ago',
  },
  {
    icon: Server,
    iconBg: 'bg-amber-500/10 text-amber-500',
    title: 'DB migration completed',
    desc: 'prod-postgres-01 migrated to v16.3',
    time: '3 hrs ago',
  },
  {
    icon: Globe,
    iconBg: 'bg-sky-500/10 text-sky-500',
    title: 'CDN edge node deployed',
    desc: 'New node live in ap-southeast-1 (Singapore)',
    time: '5 hrs ago',
  },
  {
    icon: AlertTriangle,
    iconBg: 'bg-red-500/10 text-red-500',
    title: 'High latency detected',
    desc: 'analytics-db latency spike to 240ms — auto-scaled',
    time: '6 hrs ago',
  },
])

// ─── System Health ────────────────────────────────────────────────────────────
const services = ref([
  { name: 'API Gateway', uptime: '99.98%', latency: '12ms', status: 'healthy' },
  { name: 'Auth Service', uptime: '100%', latency: '8ms', status: 'healthy' },
  { name: 'Database Cluster', uptime: '99.91%', latency: '18ms', status: 'healthy' },
  { name: 'Storage CDN', uptime: '99.85%', latency: '34ms', status: 'warning' },
  { name: 'Realtime Engine', uptime: '100%', latency: '5ms', status: 'healthy' },
])
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-10">

    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Admin Dashboard</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Overview</h1>
        <p class="text-sm text-muted-foreground">
          Real-time metrics, transactions, and system health for your platform.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0 shrink-0">
        <Button variant="outline" size="sm" class="gap-1.5 text-xs">
          <RefreshCw class="h-3.5 w-3.5" />
          Refresh
        </Button>
        <Button size="sm" class="gap-1.5 text-xs">
          <Download class="h-3.5 w-3.5" />
          Export Report
        </Button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        v-for="stat in stats"
        :key="stat.title"
        class="overflow-hidden py-0 gap-0 shadow-sm"
      >
        <CardContent class="p-4">
          <div class="flex items-start justify-between">
            <div class="flex flex-col gap-1">
              <span class="text-xs font-medium text-muted-foreground">{{ stat.title }}</span>
              <span class="text-2xl font-bold tracking-tight text-foreground">{{ stat.value }}</span>
              <div class="flex items-center gap-1">
                <component
                  :is="stat.positive ? TrendingUp : TrendingDown"
                  :class="['h-3 w-3', stat.positive ? 'text-emerald-500' : 'text-red-500']"
                />
                <span :class="['text-xs font-medium', stat.positive ? 'text-emerald-500' : 'text-red-500']">
                  {{ stat.change }}
                </span>
                <span class="text-xs text-muted-foreground">{{ stat.changeLabel }}</span>
              </div>
            </div>
            <div :class="['flex h-9 w-9 items-center justify-center rounded-lg shrink-0', stat.bg]">
              <component :is="stat.icon" :class="['h-4 w-4', stat.color]" />
            </div>
          </div>

          <!-- Sparkline SVG -->
          <div class="mt-4">
            <svg viewBox="0 0 80 32" class="w-full h-8" preserveAspectRatio="none">
              <path
                :d="buildSparkline(stat.sparkline)"
                fill="none"
                :stroke="stat.positive ? 'oklch(0.7 0.15 159)' : 'oklch(0.75 0.14 80)'"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Metrics Banner -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm">
      <CardContent class="p-0">
        <div class="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          <div
            v-for="m in quickMetrics"
            :key="m.label"
            class="flex flex-col items-center justify-center gap-0.5 py-4 px-6 text-center"
          >
            <span class="text-xl font-bold tracking-tight text-foreground">{{ m.value }}</span>
            <span class="text-xs text-muted-foreground">{{ m.label }}</span>
            <span class="label-mono text-[10px]">{{ m.sub }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Main Grid: Transactions + Activity Feed -->
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">

      <!-- Recent Transactions -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm lg:col-span-2">
        <CardHeader class="border-b border-border px-4 py-3 bg-muted/20 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-sm font-semibold">Recent Transactions</CardTitle>
            <CardDescription class="text-xs">Latest 5 payment events</CardDescription>
          </div>
          <Button variant="ghost" size="sm" class="text-xs h-7 px-2 gap-1 text-muted-foreground hover:text-foreground">
            View all
            <ArrowUpRight class="h-3 w-3" />
          </Button>
        </CardHeader>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/30 hover:bg-muted/30">
                <TableHead class="text-xs font-semibold pl-4">User</TableHead>
                <TableHead class="text-xs font-semibold">Type</TableHead>
                <TableHead class="text-xs font-semibold">Status</TableHead>
                <TableHead class="text-xs font-semibold">Time</TableHead>
                <TableHead class="text-xs font-semibold text-right pr-4">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="tx in transactions"
                :key="tx.id"
                class="hover:bg-muted/20 transition-colors"
              >
                <TableCell class="pl-4">
                  <div class="flex items-center gap-2.5">
                    <Avatar class="h-7 w-7 shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback class="text-[10px]">{{ tx.initials }}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p class="text-xs font-medium leading-none">{{ tx.user }}</p>
                      <p class="text-[11px] text-muted-foreground mt-0.5">{{ tx.email }}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span class="text-xs text-muted-foreground">{{ tx.type }}</span>
                </TableCell>
                <TableCell>
                  <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium', statusConfig[tx.status].class]">
                    {{ statusConfig[tx.status].label }}
                  </span>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock class="h-3 w-3 shrink-0" />
                    {{ tx.time }}
                  </div>
                </TableCell>
                <TableCell class="text-right pr-4">
                  <span :class="['text-xs font-semibold tabular-nums', tx.amount.startsWith('-') ? 'text-red-500' : 'text-emerald-500']">
                    {{ tx.amount }}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <!-- Activity Feed -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm">
        <CardHeader class="border-b border-border px-4 py-3 bg-muted/20">
          <CardTitle class="text-sm font-semibold">Recent Activity</CardTitle>
          <CardDescription class="text-xs">System &amp; user events</CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <div class="divide-y divide-border">
            <div
              v-for="(event, i) in activities"
              :key="i"
              class="flex items-start gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
            >
              <div :class="['flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5', event.iconBg]">
                <component :is="event.icon" class="h-3.5 w-3.5" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-foreground leading-snug">{{ event.title }}</p>
                <p class="text-[11px] text-muted-foreground leading-snug mt-0.5 truncate">{{ event.desc }}</p>
                <span class="text-[10px] text-muted-foreground/70 mt-1 block">{{ event.time }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- System Health -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm">
      <CardHeader class="border-b border-border px-4 py-3 bg-muted/20 flex flex-row items-center justify-between">
        <div>
          <CardTitle class="text-sm font-semibold">System Health</CardTitle>
          <CardDescription class="text-xs">Live service status and latency</CardDescription>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="status-dot"></span>
          <span class="text-xs text-muted-foreground">All systems operational</span>
        </div>
      </CardHeader>
      <CardContent class="p-0">
        <div class="divide-y divide-border">
          <div
            v-for="svc in services"
            :key="svc.name"
            class="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span
                :class="[
                  'h-2 w-2 rounded-full shrink-0',
                  svc.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                ]"
              />
              <span class="text-xs font-medium text-foreground">{{ svc.name }}</span>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-right hidden sm:block">
                <span class="text-[11px] text-muted-foreground">Latency</span>
                <p class="text-xs font-semibold tabular-nums text-foreground">{{ svc.latency }}</p>
              </div>
              <div class="text-right hidden sm:block">
                <span class="text-[11px] text-muted-foreground">Uptime</span>
                <p class="text-xs font-semibold tabular-nums text-foreground">{{ svc.uptime }}</p>
              </div>
              <span
                :class="[
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
                  svc.status === 'healthy'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                ]"
              >
                <component :is="svc.status === 'healthy' ? CheckCircle2 : AlertTriangle" class="h-3 w-3" />
                {{ svc.status === 'healthy' ? 'Healthy' : 'Warning' }}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

  </div>
</template>

