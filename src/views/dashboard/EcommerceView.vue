<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Download,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck,
  Box,
  Percent,
} from '@lucide/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

// ─── Timeframe Filter ─────────────────────────────────────────────────────────
const selectedPeriod = ref<'today' | '7d' | '30d' | '90d'>('30d')

// ─── Top KPI Stats ─────────────────────────────────────────────────────────────
const kpiStats = [
  {
    title: 'Gross Revenue',
    value: '$128,430.00',
    change: '+18.4%',
    changeLabel: 'from last month',
    positive: true,
    icon: DollarSign,
    color: 'text-emerald-500',
  },
  {
    title: 'Total Orders',
    value: '1,429',
    change: '+12.1%',
    changeLabel: 'from last month',
    positive: true,
    icon: ShoppingBag,
    color: 'text-primary',
  },
  {
    title: 'Average Order Value',
    value: '$89.87',
    change: '+5.6%',
    changeLabel: 'from last month',
    positive: true,
    icon: CreditCard,
    color: 'text-violet-500',
  },
  {
    title: 'Conversion Rate',
    value: '3.42%',
    change: '+0.8%',
    changeLabel: 'from last month',
    positive: true,
    icon: Percent,
    color: 'text-amber-500',
  },
]

// ─── Revenue Timeline Chart Data ──────────────────────────────────────────────
interface RevenueDataPoint {
  label: string
  revenue: number
  target: number
}

const revenueDatasets: Record<'today' | '7d' | '30d' | '90d', RevenueDataPoint[]> = {
  today: [
    { label: '00:00', revenue: 420, target: 350 },
    { label: '04:00', revenue: 280, target: 200 },
    { label: '08:00', revenue: 890, target: 600 },
    { label: '12:00', revenue: 1450, target: 1100 },
    { label: '16:00', revenue: 1820, target: 1400 },
    { label: '20:00', revenue: 2100, target: 1650 },
    { label: '23:59', revenue: 2450, target: 1900 },
  ],
  '7d': [
    { label: 'Mon', revenue: 14200, target: 12000 },
    { label: 'Tue', revenue: 16800, target: 13500 },
    { label: 'Wed', revenue: 15400, target: 14000 },
    { label: 'Thu', revenue: 19200, target: 15500 },
    { label: 'Fri', revenue: 24800, target: 18000 },
    { label: 'Sat', revenue: 28400, target: 21000 },
    { label: 'Sun', revenue: 31500, target: 23000 },
  ],
  '30d': [
    { label: 'Aug 01', revenue: 3200, target: 2800 },
    { label: 'Aug 04', revenue: 4100, target: 3000 },
    { label: 'Aug 07', revenue: 3800, target: 3200 },
    { label: 'Aug 10', revenue: 5400, target: 3600 },
    { label: 'Aug 13', revenue: 4900, target: 3900 },
    { label: 'Aug 16', revenue: 6200, target: 4200 },
    { label: 'Aug 19', revenue: 5800, target: 4500 },
    { label: 'Aug 22', revenue: 7400, target: 4900 },
    { label: 'Aug 25', revenue: 6900, target: 5200 },
    { label: 'Aug 28', revenue: 8800, target: 5600 },
  ],
  '90d': [
    { label: 'Jun W1', revenue: 24000, target: 20000 },
    { label: 'Jun W3', revenue: 28500, target: 23000 },
    { label: 'Jul W1', revenue: 34200, target: 27000 },
    { label: 'Jul W3', revenue: 39800, target: 31000 },
    { label: 'Aug W1', revenue: 45600, target: 36000 },
    { label: 'Aug W3', revenue: 52400, target: 41000 },
  ],
}

const currentRevenueTimeline = computed(() => revenueDatasets[selectedPeriod.value])

// ─── Top-Selling Products ─────────────────────────────────────────────────────
const topProducts = [
  {
    id: 'prod-1',
    name: 'Nala Pro UI Kit & Design System',
    category: 'Templates',
    price: 129.00,
    salesCount: 428,
    revenue: 55212.00,
    stockStatus: 'In Stock',
    stockCount: 890,
  },
  {
    id: 'prod-2',
    name: 'Enterprise Cloud Connector Suite',
    category: 'Developer Tools',
    price: 249.00,
    salesCount: 194,
    revenue: 48306.00,
    stockStatus: 'In Stock',
    stockCount: 420,
  },
  {
    id: 'prod-3',
    name: 'Automated AI Compliance Engine',
    category: 'Security',
    price: 99.00,
    salesCount: 182,
    revenue: 18018.00,
    stockStatus: 'Low Stock',
    stockCount: 14,
  },
  {
    id: 'prod-4',
    name: 'Tailwind CSS v4 Vector Icon Bundle',
    category: 'Assets',
    price: 39.00,
    salesCount: 176,
    revenue: 6864.00,
    stockStatus: 'In Stock',
    stockCount: 1200,
  },
]

// ─── Order Fulfillment Pipeline ───────────────────────────────────────────────
const fulfillmentStats = [
  { label: 'Delivered', count: 1004, percent: 70, color: 'bg-emerald-500', text: 'text-emerald-500', icon: CheckCircle2 },
  { label: 'Shipped', count: 312, percent: 22, color: 'bg-blue-500', text: 'text-blue-500', icon: Truck },
  { label: 'Processing', count: 89, percent: 6, color: 'bg-amber-500', text: 'text-amber-500', icon: Box },
  { label: 'Pending', count: 24, percent: 2, color: 'bg-purple-500', text: 'text-purple-500', icon: Clock },
]

// ─── Recent Orders ────────────────────────────────────────────────────────────
const recentOrders = [
  {
    id: '#ORD-9482',
    customer: { name: 'Sophia Chen', email: 'sophia.c@stripe.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', initials: 'SC' },
    itemsCount: 3,
    total: 387.00,
    status: 'delivered',
    paymentMethod: 'Visa •••• 4242',
    date: '10 mins ago',
  },
  {
    id: '#ORD-9481',
    customer: { name: 'Liam Davies', email: 'liam@fintech.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', initials: 'LD' },
    itemsCount: 1,
    total: 249.00,
    status: 'shipped',
    paymentMethod: 'Apple Pay',
    date: '35 mins ago',
  },
  {
    id: '#ORD-9480',
    customer: { name: 'Emma Watson', email: 'emma.w@acme.org', avatar: '', initials: 'EW' },
    itemsCount: 2,
    total: 168.00,
    status: 'processing',
    paymentMethod: 'Mastercard •••• 8892',
    date: '1 hour ago',
  },
  {
    id: '#ORD-9479',
    customer: { name: 'Marcus Johnson', email: 'marcus@designlabs.co', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', initials: 'MJ' },
    itemsCount: 1,
    total: 129.00,
    status: 'pending',
    paymentMethod: 'PayPal',
    date: '2 hours ago',
  },
]

function getOrderStatusVariant(status: string): 'success' | 'info' | 'warning' | 'secondary' {
  switch (status) {
    case 'delivered':
      return 'success'
    case 'shipped':
      return 'info'
    case 'processing':
      return 'warning'
    default:
      return 'secondary'
  }
}

function handleExportSales() {
  toast.success('Sales report CSV successfully exported.')
}
</script>

<template>
  <div class="space-y-6 pb-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            E-Commerce &amp; Sales
          </h1>
          <Badge variant="success" shape="pill" dot pulse class="text-[11px]">
            Live Feed
          </Badge>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground mt-1">
          Monitor real-time store gross revenue, order fulfillment, product velocity, and conversion funnel.
        </p>
      </div>

      <!-- Action Toolbar -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <!-- Timeframe Pills -->
        <div class="inline-flex rounded-lg border border-border p-0.5 bg-muted/30 text-xs">
          <button
            v-for="p in (['today', '7d', '30d', '90d'] as const)"
            :key="p"
            class="px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer capitalize"
            :class="selectedPeriod === p ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'"
            @click="selectedPeriod = p"
          >
            {{ p === 'today' ? 'Today' : p.toUpperCase() }}
          </button>
        </div>

        <Button variant="outline" size="sm" class="h-8 gap-1.5 text-xs shadow-2xs" @click="handleExportSales">
          <Download class="h-3.5 w-3.5" />
          <span class="hidden sm:inline">Export CSV</span>
        </Button>
      </div>
    </div>

    <!-- 1. Top 4 KPI Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="stat in kpiStats"
        :key="stat.title"
        flush
        class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200"
      >
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">{{ stat.title }}</span>
            <component :is="stat.icon" class="h-4 w-4" :class="stat.color" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ stat.value }}</div>
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

    <!-- 2. Revenue Timeline & Order Fulfillment Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Trend Area Chart -->
      <Card class="lg:col-span-2 border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-bold">Revenue Velocity &amp; Targets</CardTitle>
            <CardDescription class="text-xs">Gross sales performance over the active billing cycle</CardDescription>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5 text-muted-foreground">
              <span class="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>Actual ($)</span>
            </span>
            <span class="flex items-center gap-1.5 text-muted-foreground">
              <span class="h-2.5 w-2.5 rounded-full bg-border" />
              <span>Target ($)</span>
            </span>
          </div>
        </CardHeader>

        <CardContent class="pt-4">
          <div class="w-full h-64 relative">
            <AreaChart
              :data="currentRevenueTimeline"
              index="label"
              :categories="['revenue', 'target']"
              :colors="['var(--primary)', '#3b82f6']"
              :yFormatter="(v) => `$${(v / 1000).toFixed(1)}k`"
              showTooltip
              class="h-full"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Order Fulfillment Card -->
      <Card class="border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-bold">Fulfillment Pipeline</CardTitle>
          <CardDescription class="text-xs">Live dispatch &amp; delivery operational status</CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <!-- Stacked Progress Bar -->
          <div class="h-3 w-full rounded-full bg-muted/60 overflow-hidden flex gap-0.5 p-0.5">
            <div
              v-for="item in fulfillmentStats"
              :key="item.label"
              :class="item.color"
              :style="{ width: `${item.percent}%` }"
              class="h-full rounded-full transition-all duration-500"
              :title="`${item.label}: ${item.count} (${item.percent}%)`"
            />
          </div>

          <!-- Stat Breakdown List -->
          <div class="space-y-3 pt-2">
            <div
              v-for="item in fulfillmentStats"
              :key="item.label"
              class="flex items-center justify-between p-2.5 rounded-lg border border-border/50 bg-background/50 text-xs"
            >
              <div class="flex items-center gap-2.5">
                <component :is="item.icon" class="h-4 w-4" :class="item.text" />
                <div>
                  <p class="font-medium text-foreground">{{ item.label }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ item.percent }}% of total volume</p>
                </div>
              </div>
              <span class="font-mono font-bold text-foreground">{{ item.count.toLocaleString() }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 3. Top-Selling Products & Recent Orders Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Selling Products Table -->
      <Card class="border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-bold">Top Performing Products</CardTitle>
            <CardDescription class="text-xs">Highest grossing inventory units this month</CardDescription>
          </div>
        </CardHeader>

        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="text-xs">Product</TableHead>
                <TableHead class="text-xs text-center">Sales</TableHead>
                <TableHead class="text-xs text-right">Revenue</TableHead>
                <TableHead class="text-xs text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="prod in topProducts" :key="prod.id" class="text-xs">
                <TableCell>
                  <div>
                    <p class="font-semibold text-foreground leading-tight">{{ prod.name }}</p>
                    <p class="text-[11px] text-muted-foreground">{{ prod.category }} • ${{ prod.price.toFixed(2) }}</p>
                  </div>
                </TableCell>
                <TableCell class="text-center font-mono font-medium text-foreground">
                  {{ prod.salesCount }}
                </TableCell>
                <TableCell class="text-right font-mono font-bold text-foreground">
                  ${{ prod.revenue.toLocaleString() }}
                </TableCell>
                <TableCell class="text-right">
                  <Badge
                    :variant="prod.stockStatus === 'In Stock' ? 'success' : 'warning'"
                    shape="pill"
                    class="text-[10px] py-0 px-2"
                  >
                    {{ prod.stockStatus }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <!-- Recent Orders Table -->
      <Card class="border-border/80 bg-card shadow-2xs">
        <CardHeader class="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-bold">Recent Customer Orders</CardTitle>
            <CardDescription class="text-xs">Latest transactions and fulfillment states</CardDescription>
          </div>
          <router-link to="/billing" class="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
            <span>View all</span>
            <ArrowRight class="h-3 w-3" />
          </router-link>
        </CardHeader>

        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="text-xs">Order</TableHead>
                <TableHead class="text-xs">Customer</TableHead>
                <TableHead class="text-xs text-right">Total</TableHead>
                <TableHead class="text-xs text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="order in recentOrders" :key="order.id" class="text-xs">
                <TableCell>
                  <p class="font-mono font-semibold text-foreground">{{ order.id }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ order.date }}</p>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <Avatar class="h-6 w-6 border">
                      <AvatarImage v-if="order.customer.avatar" :src="order.customer.avatar" :alt="order.customer.name" />
                      <AvatarFallback class="text-[10px] bg-muted">{{ order.customer.initials }}</AvatarFallback>
                    </Avatar>
                    <span class="font-medium text-foreground truncate max-w-28">{{ order.customer.name }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-right font-mono font-bold text-foreground">
                  ${{ order.total.toFixed(2) }}
                </TableCell>
                <TableCell class="text-right">
                  <Badge :variant="getOrderStatusVariant(order.status)" shape="pill" dot class="text-[10px] capitalize">
                    {{ order.status }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
