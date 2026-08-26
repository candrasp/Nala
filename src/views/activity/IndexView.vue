<script setup lang="ts">
import { onMounted } from 'vue'
import {
  History,
  Search,
  Download,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Activity,
  UserCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  Terminal,
  MapPin,
  Layers,
  Key,
  Database,
  CreditCard,
  User,
  ArrowUpRight,
} from '@lucide/vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/PageHeader.vue'
import { useActivityStore } from '@/stores/activity'
import { useFormatter } from '@/composables/useFormatter'
import { toast } from '@/components/ui/sonner'
import type { ActivityCategory, ActivityStatus } from '@/services/activity.service'

const activityStore = useActivityStore()
const fmt = useFormatter()

onMounted(() => {
  if (activityStore.activities.length === 0) {
    activityStore.loadActivities()
  }
})

// ─── Visual Helpers ────────────────────────────────────────────────────────────

function getCategoryIcon(category: ActivityCategory) {
  switch (category) {
    case 'auth':
      return ShieldCheck
    case 'security':
      return ShieldAlert
    case 'api':
      return Key
    case 'system':
      return Database
    case 'billing':
      return CreditCard
    case 'user':
      return User
    default:
      return Layers
  }
}

function getCategoryBadgeVariant(category: ActivityCategory): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (category) {
    case 'security':
      return 'warning'
    case 'auth':
      return 'default'
    case 'api':
      return 'secondary'
    case 'system':
      return 'info'
    case 'billing':
      return 'success'
    default:
      return 'outline'
  }
}

function getStatusBadgeVariant(status: ActivityStatus): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (status) {
    case 'success':
      return 'success'
    case 'warning':
      return 'warning'
    case 'failed':
      return 'destructive'
    default:
      return 'info'
  }
}

function copyToClipboard(text: string, label: string = 'Text') {
  navigator.clipboard.writeText(text)
  toast.success(`${label} copied to clipboard!`)
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Top PageHeader -->
    <PageHeader
      title="Activity Log & Audit Trail"
      description="Immutable telemetry records tracking administrative actions, operator events, API mutations, and security advisories."
      badge="Audit Trail"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <!-- Refresh Button -->
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="activityStore.isLoading"
            @click="activityStore.loadActivities"
          >
            <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': activityStore.isLoading }" />
            <span class="hidden sm:inline">Refresh Logs</span>
          </Button>

          <!-- Export Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="sm" class="text-xs gap-1.5">
                <Download class="h-3.5 w-3.5" />
                <span>Export Audit</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-44 text-xs">
              <DropdownMenuItem @click="activityStore.exportLogs('csv')" class="cursor-pointer">
                Export as CSV (.csv)
              </DropdownMenuItem>
              <DropdownMenuItem @click="activityStore.exportLogs('json')" class="cursor-pointer">
                Export as JSON (.json)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>
    </PageHeader>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- METRICS OVERVIEW STATS                                                -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total Events -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200">
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Total Audited Events</span>
            <History class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ activityStore.totalCount }}</div>
          <p class="text-xs text-muted-foreground flex items-center gap-1">
            <span>Across all environments</span>
          </p>
        </CardContent>
      </Card>

      <!-- 2. Success Rate -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200">
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Execution Success Rate</span>
            <CheckCircle2 class="h-4 w-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">{{ activityStore.successRate }}</div>
          <p class="text-xs text-muted-foreground flex items-center gap-1">
            <span class="text-emerald-500 font-semibold inline-flex items-center gap-0.5">
              <ArrowUpRight class="h-3.5 w-3.5" /> {{ activityStore.successCount }}
            </span>
            <span>successful operations</span>
          </p>
        </CardContent>
      </Card>

      <!-- 3. Warnings / Security Events -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200">
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Security &amp; Failure Alerts</span>
            <ShieldAlert class="h-4 w-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400">{{ activityStore.warningCount }}</div>
          <p class="text-xs text-muted-foreground flex items-center gap-1">
            <span class="text-amber-500 font-medium">Requires admin review</span>
          </p>
        </CardContent>
      </Card>

      <!-- 4. Active Operators -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200">
        <CardContent class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Active Operators</span>
            <UserCheck class="h-4 w-4 text-purple-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ activityStore.activeOperatorsCount }}</div>
          <p class="text-xs text-muted-foreground flex items-center gap-1">
            <span>Unique admin &amp; service actors</span>
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- AUDIT DATA TABLE & FILTERS                                            -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm border overflow-hidden">
      <!-- Section Header with Multi-Criteria Filter Bar -->
      <CardHeader section class="flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle class="text-base font-semibold">Audit Records</CardTitle>
            <CardDescription class="text-xs mt-0.5">
              Showing {{ activityStore.filteredActivities.length }} of {{ activityStore.totalCount }} total logged events.
            </CardDescription>
          </div>

          <!-- Reset Filter Button -->
          <Button
            variant="ghost"
            size="sm"
            class="text-xs gap-1.5 text-muted-foreground hover:text-foreground h-8 self-start sm:self-auto"
            @click="activityStore.resetFilters"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            Reset Filters
          </Button>
        </div>

        <!-- Filter Controls Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <!-- 1. Search Query -->
          <div class="w-full">
            <InputGroup>
              <InputIcon side="left">
                <Search class="h-3.5 w-3.5" />
              </InputIcon>
              <Input
                v-model="activityStore.searchQuery"
                placeholder="Search event, actor, IP, target..."
                class="pl-9 h-8 text-xs bg-background"
              />
            </InputGroup>
          </div>

          <!-- 2. Category Filter -->
          <Select v-model="activityStore.selectedCategory">
            <SelectTrigger class="h-8 text-xs w-full bg-background">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Categories</SelectItem>
              <SelectItem value="auth" class="text-xs">Authentication (SSO/MFA)</SelectItem>
              <SelectItem value="security" class="text-xs">Security &amp; Permissions</SelectItem>
              <SelectItem value="user" class="text-xs">User Management</SelectItem>
              <SelectItem value="system" class="text-xs">System &amp; Database</SelectItem>
              <SelectItem value="api" class="text-xs">API Secret Keys</SelectItem>
              <SelectItem value="billing" class="text-xs">Billing &amp; Plans</SelectItem>
            </SelectContent>
          </Select>

          <!-- 3. Status Filter -->
          <Select v-model="activityStore.selectedStatus">
            <SelectTrigger class="h-8 text-xs w-full bg-background">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Statuses</SelectItem>
              <SelectItem value="success" class="text-xs">Success (200)</SelectItem>
              <SelectItem value="warning" class="text-xs">Warning (Alert)</SelectItem>
              <SelectItem value="failed" class="text-xs">Failed (Error)</SelectItem>
              <SelectItem value="info" class="text-xs">Info (Notice)</SelectItem>
            </SelectContent>
          </Select>

          <!-- 4. Time Range Filter -->
          <Select v-model="activityStore.selectedTimeRange">
            <SelectTrigger class="h-8 text-xs w-full bg-background">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Time</SelectItem>
              <SelectItem value="today" class="text-xs">Today (Last 24h)</SelectItem>
              <SelectItem value="7d" class="text-xs">Last 7 Days</SelectItem>
              <SelectItem value="30d" class="text-xs">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <!-- Table Content -->
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-75">Event &amp; Action</TableHead>
              <TableHead class="w-32">Category</TableHead>
              <TableHead class="w-56">Actor / Operator</TableHead>
              <TableHead class="w-48">Target Resource</TableHead>
              <TableHead class="w-28">Status</TableHead>
              <TableHead class="w-44">IP &amp; Geolocation</TableHead>
              <TableHead class="w-36">Timestamp</TableHead>
              <TableHead class="w-20 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <!-- 1. Skeleton Loading State -->
            <template v-if="activityStore.isLoading">
              <TableRow v-for="n in 5" :key="n">
                <TableCell><Skeleton class="h-4 w-48" /></TableCell>
                <TableCell><Skeleton class="h-4 w-20" /></TableCell>
                <TableCell><Skeleton class="h-8 w-40" /></TableCell>
                <TableCell><Skeleton class="h-4 w-32" /></TableCell>
                <TableCell><Skeleton class="h-5 w-16" /></TableCell>
                <TableCell><Skeleton class="h-4 w-28" /></TableCell>
                <TableCell><Skeleton class="h-4 w-24" /></TableCell>
                <TableCell class="text-right"><Skeleton class="h-7 w-7 ml-auto rounded-md" /></TableCell>
              </TableRow>
            </template>

            <!-- 2. Data Rows -->
            <template v-else-if="activityStore.paginatedActivities.length > 0">
              <TableRow
                v-for="item in activityStore.paginatedActivities"
                :key="item.id"
                class="hover:bg-muted/40 cursor-pointer transition-colors"
                @click="activityStore.inspectActivity(item)"
              >
                <!-- Event & Action -->
                <TableCell>
                  <div class="space-y-0.5 min-w-0">
                    <p class="text-xs font-semibold text-foreground leading-snug">
                      {{ item.title }}
                    </p>
                    <p class="text-[11px] font-mono text-muted-foreground truncate">
                      {{ item.action }}
                    </p>
                  </div>
                </TableCell>

                <!-- Category -->
                <TableCell>
                  <Badge :variant="getCategoryBadgeVariant(item.category)" shape="pill" class="text-[10px] uppercase tracking-wider py-0 px-2 font-medium">
                    <component :is="getCategoryIcon(item.category)" class="h-3 w-3 mr-1" />
                    {{ item.category }}
                  </Badge>
                </TableCell>

                <!-- Actor / Operator -->
                <TableCell>
                  <div class="flex items-center gap-2.5 min-w-0">
                    <Avatar class="h-7 w-7 border shrink-0">
                      <AvatarImage v-if="item.actor.avatar" :src="item.actor.avatar" :alt="item.actor.name" />
                      <AvatarFallback class="text-[10px] font-semibold bg-primary/10 text-primary">
                        {{ fmt.initials(item.actor.name) }}
                      </AvatarFallback>
                    </Avatar>
                    <div class="min-w-0">
                      <p class="text-xs font-medium text-foreground truncate leading-tight">
                        {{ item.actor.name }}
                      </p>
                      <p class="text-[10px] text-muted-foreground truncate font-mono">
                        {{ item.actor.email }}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <!-- Target Resource -->
                <TableCell>
                  <span class="text-xs font-mono text-muted-foreground truncate block max-w-44">
                    {{ item.target || '—' }}
                  </span>
                </TableCell>

                <!-- Status -->
                <TableCell>
                  <Badge :variant="getStatusBadgeVariant(item.status)" shape="pill" dot class="text-[11px] font-medium capitalize">
                    {{ item.status }}
                  </Badge>
                </TableCell>

                <!-- IP & Geolocation -->
                <TableCell>
                  <div class="space-y-0.5">
                    <p class="text-xs font-mono text-foreground">{{ item.ipAddress }}</p>
                    <p class="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin class="h-2.5 w-2.5 text-muted-foreground/70" />
                      {{ item.location }}
                    </p>
                  </div>
                </TableCell>

                <!-- Timestamp -->
                <TableCell>
                  <div class="space-y-0.5">
                    <p class="text-xs font-medium text-foreground whitespace-nowrap">
                      {{ fmt.relative(item.createdAt) }}
                    </p>
                    <p class="text-[10px] text-muted-foreground whitespace-nowrap font-mono">
                      {{ fmt.dateTime(item.createdAt, { dateStyle: 'short', format: '24h' }) }}
                    </p>
                  </div>
                </TableCell>

                <!-- Actions / Inspect Modal -->
                <TableCell class="text-right" @click.stop>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    class="h-7 w-7 text-muted-foreground hover:text-foreground"
                    title="Inspect Event Metadata"
                    @click="activityStore.inspectActivity(item)"
                  >
                    <ExternalLink class="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            </template>

            <!-- 3. Empty State -->
            <template v-else>
              <TableRow>
                <TableCell colspan="8" class="p-6">
                  <EmptyState
                    :icon="Activity"
                    title="No audit activities found"
                    description="No logs match your current search query and active filter criteria."
                  >
                    <template #actions>
                      <Button variant="outline" size="sm" class="text-xs" @click="activityStore.resetFilters">
                        Reset Filters
                      </Button>
                    </template>
                  </EmptyState>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </CardContent>

      <!-- Pagination Footer -->
      <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <!-- Range Indicator -->
        <div class="text-xs text-muted-foreground">
          Showing
          <span class="font-medium text-foreground">
            {{ activityStore.filteredActivities.length > 0 ? (activityStore.currentPage - 1) * activityStore.itemsPerPage + 1 : 0 }}
          </span>
          to
          <span class="font-medium text-foreground">
            {{ Math.min(activityStore.currentPage * activityStore.itemsPerPage, activityStore.filteredActivities.length) }}
          </span>
          of
          <span class="font-medium text-foreground">{{ activityStore.filteredActivities.length }}</span>
          records
        </div>

        <!-- Page Controls -->
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            class="h-8 text-xs gap-1"
            :disabled="activityStore.currentPage <= 1"
            @click="activityStore.setPage(activityStore.currentPage - 1)"
          >
            <ChevronLeft class="h-3.5 w-3.5" />
            Previous
          </Button>

          <div class="text-xs font-medium px-2">
            Page {{ activityStore.currentPage }} of {{ activityStore.totalPages }}
          </div>

          <Button
            variant="outline"
            size="sm"
            class="h-8 text-xs gap-1"
            :disabled="activityStore.currentPage >= activityStore.totalPages"
            @click="activityStore.setPage(activityStore.currentPage + 1)"
          >
            Next
            <ChevronRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- EVENT DETAIL INSPECTOR DIALOG MODAL                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="activityStore.isDetailOpen">
      <DialogContent class="sm:max-w-160 max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader class="p-5 sm:p-6 pb-4 border-b shrink-0 pr-12">
          <div class="flex items-center gap-2">
            <div class="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <Terminal class="h-4 w-4" />
            </div>
            <div>
              <DialogTitle class="text-base font-bold">
                Audit Event Inspector
              </DialogTitle>
              <DialogDescription class="text-xs mt-0.5">
                ID: <span class="font-mono text-foreground select-all">{{ activityStore.selectedActivity?.id }}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div v-if="activityStore.selectedActivity" class="space-y-4 p-5 sm:p-6 overflow-y-auto flex-1 text-xs">
          <!-- Summary Banner -->
          <div class="p-3.5 rounded-lg border bg-muted/30 space-y-2">
            <div class="flex items-start justify-between gap-2">
              <div class="space-y-0.5">
                <p class="text-xs font-bold text-foreground">
                  {{ activityStore.selectedActivity.title }}
                </p>
                <p class="text-[11px] font-mono text-primary">
                  {{ activityStore.selectedActivity.action }}
                </p>
              </div>
              <Badge :variant="getStatusBadgeVariant(activityStore.selectedActivity.status)" shape="pill" dot class="text-xs capitalize">
                {{ activityStore.selectedActivity.status }}
              </Badge>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              {{ activityStore.selectedActivity.description }}
            </p>
          </div>

          <!-- Metadata Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg border bg-card space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Actor / Operator</span>
              <p class="font-semibold text-foreground">{{ activityStore.selectedActivity.actor.name }}</p>
              <p class="font-mono text-[10px] text-muted-foreground">{{ activityStore.selectedActivity.actor.email }}</p>
            </div>

            <div class="p-3 rounded-lg border bg-card space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Target Resource</span>
              <p class="font-mono text-xs font-semibold text-foreground">{{ activityStore.selectedActivity.target || 'N/A' }}</p>
              <p class="text-[10px] text-muted-foreground">Category: {{ activityStore.selectedActivity.category }}</p>
            </div>

            <div class="p-3 rounded-lg border bg-card space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Network &amp; Location</span>
              <p class="font-mono text-xs font-semibold text-foreground">{{ activityStore.selectedActivity.ipAddress }}</p>
              <p class="text-[10px] text-muted-foreground">{{ activityStore.selectedActivity.location }}</p>
            </div>

            <div class="p-3 rounded-lg border bg-card space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Timestamp (UTC)</span>
              <p class="font-mono text-xs font-semibold text-foreground">
                {{ fmt.dateTime(activityStore.selectedActivity.createdAt, { dateStyle: 'medium', format: '24h' }) }}
              </p>
              <p class="text-[10px] text-muted-foreground">{{ fmt.relative(activityStore.selectedActivity.createdAt) }}</p>
            </div>
          </div>

          <!-- User Agent String -->
          <div class="space-y-1">
            <span class="text-[11px] font-semibold text-muted-foreground">Client User-Agent</span>
            <div class="p-2 rounded-md bg-muted/50 border font-mono text-[11px] text-muted-foreground break-all">
              {{ activityStore.selectedActivity.userAgent }}
            </div>
          </div>

          <!-- Raw Metadata Payload (JSON Viewer) -->
          <div v-if="activityStore.selectedActivity.metadata" class="space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold text-muted-foreground">Event Payload Metadata (JSON)</span>
              <button
                type="button"
                @click="copyToClipboard(JSON.stringify(activityStore.selectedActivity.metadata, null, 2), 'Event Payload')"
                class="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy class="h-3 w-3" />
                Copy JSON
              </button>
            </div>
            <pre class="p-3 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-[11px] overflow-x-auto max-h-40 border border-zinc-800 leading-relaxed">{{ JSON.stringify(activityStore.selectedActivity.metadata, null, 2) }}</pre>
          </div>
        </div>

        <DialogFooter class="p-4 sm:px-6 border-t bg-muted/10 shrink-0 gap-2 flex items-center justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            @click="copyToClipboard(activityStore.selectedActivity?.id || '', 'Event ID')"
          >
            <Copy class="h-3.5 w-3.5" />
            Copy Event ID
          </Button>

          <Button
            type="button"
            size="sm"
            class="text-xs"
            @click="activityStore.isDetailOpen = false"
          >
            Close Inspector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
