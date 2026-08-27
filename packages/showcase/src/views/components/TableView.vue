<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  MoreHorizontal,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  Database,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from '@lucide/vue'

interface ServiceRecord {
  id: string
  name: string
  region: string
  version: string
  status: 'healthy' | 'warning' | 'maintenance' | 'stopped'
  latency: number
  cpu: number
  memory: string
  updatedAt: string
}

const services = ref<ServiceRecord[]>([
  {
    id: 'db-fra-01',
    name: 'auth-user-store',
    region: 'eu-central-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: 8.2,
    cpu: 14,
    memory: '2.4 GB / 8 GB',
    updatedAt: 'Just now',
  },
  {
    id: 'db-fra-02',
    name: 'billing-transactions',
    region: 'eu-central-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: 11.5,
    cpu: 28,
    memory: '4.1 GB / 16 GB',
    updatedAt: '2 mins ago',
  },
  {
    id: 'db-dub-01',
    name: 'analytics-events-db',
    region: 'eu-west-1',
    version: 'PostgreSQL 15.6',
    status: 'warning',
    latency: 42.8,
    cpu: 78,
    memory: '14.2 GB / 16 GB',
    updatedAt: '5 mins ago',
  },
  {
    id: 'db-iad-01',
    name: 'realtime-presence-node',
    region: 'us-east-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: 6.4,
    cpu: 19,
    memory: '3.0 GB / 8 GB',
    updatedAt: '8 mins ago',
  },
  {
    id: 'db-sin-01',
    name: 'storage-metadata-v2',
    region: 'ap-southeast-1',
    version: 'PostgreSQL 15.6',
    status: 'maintenance',
    latency: 18.1,
    cpu: 45,
    memory: '6.8 GB / 16 GB',
    updatedAt: '12 mins ago',
  },
  {
    id: 'db-pdx-01',
    name: 'legacy-migration-archive',
    region: 'us-west-1',
    version: 'PostgreSQL 14.11',
    status: 'stopped',
    latency: 0,
    cpu: 0,
    memory: '0 GB / 4 GB',
    updatedAt: '1 hour ago',
  },
])

// ─── 1. Sortable Table State ──────────────────────────────────────────────────
type SortColumn = 'name' | 'region' | 'cpu' | 'latency'
const sortKey = ref<SortColumn>('cpu')
const sortOrder = ref<'asc' | 'desc'>('desc')

function toggleSort(col: SortColumn) {
  if (sortKey.value === col) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col
    sortOrder.value = 'asc'
  }
}

const sortedServices = computed(() => {
  return [...services.value].sort((a, b) => {
    let aVal = a[sortKey.value]
    let bVal = b[sortKey.value]
    if (typeof aVal === 'string') {
      return sortOrder.value === 'asc'
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string)
    }
    return sortOrder.value === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })
})

// ─── 2. Row Selection State ───────────────────────────────────────────────────
const selectedRowIds = ref<string[]>(['db-fra-01'])

const isAllSelected = computed({
  get: () => services.value.length > 0 && selectedRowIds.value.length === services.value.length,
  set: (val: boolean) => {
    selectedRowIds.value = val ? services.value.map((s) => s.id) : []
  },
})

function toggleRowSelect(id: string) {
  const idx = selectedRowIds.value.indexOf(id)
  if (idx !== -1) {
    selectedRowIds.value.splice(idx, 1)
  } else {
    selectedRowIds.value.push(id)
  }
}

// ─── 3. Search & Pagination Combo State ───────────────────────────────────────
const searchQuery = ref('')
const selectedStatusFilter = ref<string>('all')
const currentPage = ref(1)
const itemsPerPage = 4

const filteredComboServices = computed(() => {
  return services.value.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus =
      selectedStatusFilter.value === 'all' || item.status === selectedStatusFilter.value
    return matchesSearch && matchesStatus
  })
})

const paginatedComboServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredComboServices.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredComboServices.value.length / itemsPerPage) || 1
})

// ─── Code Documentation Snippets ─────────────────────────────────────────────

const basicTableSnippet = `<!-- Basic Table with Headers -->
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Instance Name</TableHead>
      <TableHead>Region</TableHead>
      <TableHead>Engine</TableHead>
      <TableHead>Status</TableHead>
      <TableHead class="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow v-for="item in services" :key="item.id">
      <TableCell class="font-semibold">{{ item.name }}</TableCell>
      <TableCell class="font-mono text-xs">{{ item.region }}</TableCell>
      <TableCell>{{ item.version }}</TableCell>
      <TableCell>
        <span class="status-dot"></span> {{ item.status }}
      </TableCell>
      <TableCell class="text-right">
        <Button variant="ghost" size="xs">View</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`

const sortableTableSnippet = `<!-- Sortable Columns Table -->
<script setup lang="ts">
const sortKey = ref<'name' | 'cpu' | 'latency'>('cpu')
const sortOrder = ref<'asc' | 'desc'>('desc')

function toggleSort(col) {
  if (sortKey.value === col) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col
    sortOrder.value = 'asc'
  }
}
<\/script>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead @click="toggleSort('name')" class="cursor-pointer">
        Instance <ArrowUpDown class="inline h-3 w-3 ml-1" />
      </TableHead>
      <TableHead @click="toggleSort('cpu')" class="cursor-pointer text-right">
        CPU Usage <ArrowUpDown class="inline h-3 w-3 ml-1" />
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow v-for="item in sortedServices" :key="item.id">
      <TableCell>{{ item.name }}</TableCell>
      <TableCell class="text-right font-mono">{{ item.cpu }}%</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const rowSelectionSnippet = `<!-- Row Selection with Checkboxes & Bulk Actions Toolbar -->
<script setup lang="ts">
const selectedIds = ref<string[]>([])

const isAllSelected = computed({
  get: () => items.length > 0 && selectedIds.value.length === items.length,
  set: (val) => { selectedIds.value = val ? items.map(i => i.id) : [] }
})
<\/script>

<!-- Bulk Action Banner (when rows selected) -->
<div v-if="selectedIds.length > 0" class="p-3 bg-primary/10 border rounded-lg flex justify-between">
  <span>{{ selectedIds.length }} items selected</span>
  <Button size="xs" variant="destructive">Delete Selected</Button>
</div>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead class="w-10">
        <Checkbox v-model="isAllSelected" />
      </TableHead>
      <TableHead>Cluster Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow v-for="item in items" :key="item.id">
      <TableCell>
        <Checkbox
          :checked="selectedIds.includes(item.id)"
          @update:checked="toggleSelect(item.id)"
        />
      </TableCell>
      <TableCell>{{ item.name }}</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const paginationFilterSnippet = `<!-- Pagination + Search Filter Combo -->
<div class="space-y-4">
  <!-- Search and Status Filter Controls -->
  <div class="flex flex-col sm:flex-row justify-between gap-3">
    <Input v-model="searchQuery" placeholder="Filter clusters..." class="sm:w-72" />
    <div class="flex gap-2">
      <Button size="sm" variant="outline" @click="filter = 'all'">All</Button>
      <Button size="sm" variant="outline" @click="filter = 'healthy'">Healthy</Button>
    </div>
  </div>

  <!-- Table Body -->
  <Table>
    <!-- rows -->
  </Table>

  <!-- Working Pagination Footer -->
  <div class="flex justify-between items-center text-xs">
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <div class="flex gap-1">
      <Button size="xs" :disabled="currentPage === 1" @click="currentPage--">Prev</Button>
      <Button size="xs" :disabled="currentPage === totalPages" @click="currentPage++">Next</Button>
    </div>
  </div>
</div>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Data Tables"
      description="Console-grade data table layouts with sorting, bulk row selection, instant search filtering, and paginated footers."
      badge="Component Showcase"
    >
      <template #actions>
        <Button variant="outline" size="sm" class="gap-1.5">
          <Download class="h-3.5 w-3.5" />
          Export CSV
        </Button>
        <Button size="sm" class="gap-1.5">
          <Plus class="h-3.5 w-3.5" />
          Add Database
        </Button>
      </template>
    </PageHeader>

    <!-- 1. BASIC TABLE WITH HEADERS -->
    <CodePreview
      title="Basic Table with Headers"
      description="Clean, responsive tabular structure featuring typographic headers, status indicators, and contextual action buttons."
      :code="basicTableSnippet"
    >
      <div class="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40 hover:bg-muted/40">
              <TableHead class="text-xs font-semibold">Instance Name</TableHead>
              <TableHead class="text-xs font-semibold">Region</TableHead>
              <TableHead class="text-xs font-semibold">Engine</TableHead>
              <TableHead class="text-xs font-semibold">Status</TableHead>
              <TableHead class="text-xs font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="service in services.slice(0, 3)" :key="service.id" class="hover:bg-muted/30 transition-colors">
              <TableCell class="font-medium text-xs">
                <div class="flex items-center gap-2">
                  <Database class="h-3.5 w-3.5 text-primary" />
                  <span class="font-semibold text-foreground">{{ service.name }}</span>
                </div>
              </TableCell>
              <TableCell class="text-xs font-mono text-muted-foreground">{{ service.region }}</TableCell>
              <TableCell class="text-xs text-muted-foreground">{{ service.version }}</TableCell>
              <TableCell>
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span class="status-dot"></span>
                  {{ service.status }}
                </span>
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="xs" class="h-7 text-xs">View Metrics</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CodePreview>

    <!-- 2. SORTABLE COLUMNS TABLE -->
    <CodePreview
      title="Sortable Columns"
      description="Clickable column headers that toggle ascending and descending alphanumeric sorting."
      :code="sortableTableSnippet"
    >
      <div class="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40 hover:bg-muted/40">
              <TableHead
                class="text-xs font-semibold cursor-pointer select-none hover:text-primary transition-colors"
                @click="toggleSort('name')"
              >
                <div class="flex items-center gap-1">
                  <span>Instance Name</span>
                  <ArrowUp v-if="sortKey === 'name' && sortOrder === 'asc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowDown v-else-if="sortKey === 'name' && sortOrder === 'desc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowUpDown v-else class="h-3 w-3 text-muted-foreground opacity-50" />
                </div>
              </TableHead>
              <TableHead
                class="text-xs font-semibold cursor-pointer select-none hover:text-primary transition-colors"
                @click="toggleSort('region')"
              >
                <div class="flex items-center gap-1">
                  <span>Region</span>
                  <ArrowUp v-if="sortKey === 'region' && sortOrder === 'asc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowDown v-else-if="sortKey === 'region' && sortOrder === 'desc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowUpDown v-else class="h-3 w-3 text-muted-foreground opacity-50" />
                </div>
              </TableHead>
              <TableHead
                class="text-xs font-semibold text-right cursor-pointer select-none hover:text-primary transition-colors"
                @click="toggleSort('cpu')"
              >
                <div class="flex items-center justify-end gap-1">
                  <span>CPU Usage</span>
                  <ArrowUp v-if="sortKey === 'cpu' && sortOrder === 'asc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowDown v-else-if="sortKey === 'cpu' && sortOrder === 'desc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowUpDown v-else class="h-3 w-3 text-muted-foreground opacity-50" />
                </div>
              </TableHead>
              <TableHead
                class="text-xs font-semibold text-right cursor-pointer select-none hover:text-primary transition-colors"
                @click="toggleSort('latency')"
              >
                <div class="flex items-center justify-end gap-1">
                  <span>Latency</span>
                  <ArrowUp v-if="sortKey === 'latency' && sortOrder === 'asc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowDown v-else-if="sortKey === 'latency' && sortOrder === 'desc'" class="h-3.5 w-3.5 text-primary" />
                  <ArrowUpDown v-else class="h-3 w-3 text-muted-foreground opacity-50" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="service in sortedServices.slice(0, 4)" :key="service.id" class="hover:bg-muted/30 transition-colors">
              <TableCell class="text-xs font-semibold text-foreground">{{ service.name }}</TableCell>
              <TableCell class="text-xs font-mono text-muted-foreground">{{ service.region }}</TableCell>
              <TableCell class="text-xs font-mono text-right font-semibold" :class="service.cpu > 50 ? 'text-amber-500' : 'text-foreground'">
                {{ service.cpu }}%
              </TableCell>
              <TableCell class="text-xs font-mono text-right text-muted-foreground">{{ service.latency }} ms</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CodePreview>

    <!-- 3. ROW SELECTION & BULK ACTIONS TOOLBAR -->
    <CodePreview
      title="Row Selection & Bulk Actions"
      description="Multi-row checkboxes with dynamic floating toolbar actions when records are selected."
      :code="rowSelectionSnippet"
    >
      <div class="space-y-3">
        <!-- Floating Bulk Action Toolbar -->
        <div
          v-if="selectedRowIds.length > 0"
          class="p-3 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-between transition-all text-xs"
        >
          <div class="flex items-center gap-2 font-medium text-foreground">
            <span class="inline-flex h-5 px-1.5 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-[11px]">
              {{ selectedRowIds.length }}
            </span>
            <span>clusters selected across regions</span>
          </div>
          <div class="flex items-center gap-2">
            <Button size="xs" variant="outline" class="gap-1" @click="selectedRowIds = []">
              <RotateCcw class="h-3 w-3" />
              Deselect
            </Button>
            <Button size="xs" variant="destructive" class="gap-1">
              <Trash2 class="h-3 w-3" />
              Terminate Selected
            </Button>
          </div>
        </div>

        <div class="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/40 hover:bg-muted/40">
                <TableHead class="w-10">
                  <Checkbox v-model="isAllSelected" aria-label="Select all instances" />
                </TableHead>
                <TableHead class="text-xs font-semibold">Instance</TableHead>
                <TableHead class="text-xs font-semibold">Region</TableHead>
                <TableHead class="text-xs font-semibold">Memory Allocation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="service in services"
                :key="service.id"
                class="hover:bg-muted/30 transition-colors"
                :class="{ 'bg-muted/20': selectedRowIds.includes(service.id) }"
              >
                <TableCell>
                  <Checkbox
                    :checked="selectedRowIds.includes(service.id)"
                    @update:checked="toggleRowSelect(service.id)"
                    :aria-label="`Select ${service.name}`"
                  />
                </TableCell>
                <TableCell class="text-xs font-semibold text-foreground">{{ service.name }}</TableCell>
                <TableCell class="text-xs font-mono text-muted-foreground">{{ service.region }}</TableCell>
                <TableCell class="text-xs font-mono text-muted-foreground">{{ service.memory }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </CodePreview>

    <!-- 4. PAGINATION + SEARCH FILTER COMBO -->
    <CodePreview
      title="Pagination & Search Filter Combo"
      description="Production-grade datatable combining live fuzzy search, status filters, and active pagination controls."
      :code="paginationFilterSnippet"
    >
      <div class="rounded-lg border border-border overflow-hidden bg-card">
        <!-- Table Controls Header -->
        <div class="p-4 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="relative w-full sm:w-72">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              placeholder="Filter database clusters..."
              class="pl-9 h-9 text-xs"
            />
          </div>

          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-accent text-foreground': selectedStatusFilter === 'all' }"
              @click="selectedStatusFilter = 'all'"
            >
              All ({{ services.length }})
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-accent text-foreground': selectedStatusFilter === 'healthy' }"
              @click="selectedStatusFilter = 'healthy'"
            >
              Healthy
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-accent text-foreground': selectedStatusFilter === 'warning' }"
              @click="selectedStatusFilter = 'warning'"
            >
              Warning
            </Button>
          </div>
        </div>

        <!-- Table Content -->
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40 hover:bg-muted/40">
              <TableHead class="w-50 text-xs font-semibold">Instance Name</TableHead>
              <TableHead class="text-xs font-semibold">Region</TableHead>
              <TableHead class="text-xs font-semibold">Engine</TableHead>
              <TableHead class="text-xs font-semibold">Status</TableHead>
              <TableHead class="text-xs font-semibold text-right">Latency</TableHead>
              <TableHead class="text-xs font-semibold text-right">CPU</TableHead>
              <TableHead class="w-12 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- Empty State -->
            <TableRow v-if="paginatedComboServices.length === 0">
              <TableCell colspan="7" class="p-6">
                <EmptyState
                  :icon="Database"
                  title="No instances found"
                  description="No database cluster matches your search query or status filter."
                  compact
                >
                  <template #actions>
                    <Button variant="outline" size="xs" @click="searchQuery = ''; selectedStatusFilter = 'all'">
                      Reset Filters
                    </Button>
                  </template>
                </EmptyState>
              </TableCell>
            </TableRow>

            <TableRow
              v-for="service in paginatedComboServices"
              :key="service.id"
              class="hover:bg-muted/30 transition-colors"
            >
              <TableCell class="font-medium">
                <div class="flex items-center gap-2">
                  <div class="p-1.5 rounded-md bg-muted/60 text-muted-foreground">
                    <Database class="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-foreground">{{ service.name }}</p>
                    <p class="text-[11px] font-mono text-muted-foreground">{{ service.id }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell class="text-xs font-mono text-muted-foreground">{{ service.region }}</TableCell>
              <TableCell class="text-xs text-muted-foreground">{{ service.version }}</TableCell>
              <TableCell>
                <div
                  v-if="service.status === 'healthy'"
                  class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20"
                >
                  <span class="status-dot"></span>
                  Healthy
                </div>
                <div
                  v-else-if="service.status === 'warning'"
                  class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-500/20"
                >
                  <span class="status-dot status-dot-amber"></span>
                  High Load
                </div>
                <div
                  v-else-if="service.status === 'maintenance'"
                  class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-500/20"
                >
                  <span class="status-dot status-dot-blue"></span>
                  Maintenance
                </div>
                <div
                  v-else
                  class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium border border-border"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
                  Stopped
                </div>
              </TableCell>
              <TableCell class="text-xs font-mono text-right text-foreground">{{ service.latency }} ms</TableCell>
              <TableCell class="text-xs font-mono text-right text-foreground">{{ service.cpu }}%</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon" class="h-7 w-7 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal class="h-4 w-4" />
                      <span class="sr-only">Open options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuLabel class="text-xs">Cluster Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2">
                      <Eye class="h-3.5 w-3.5 text-muted-foreground" />
                      View Telemetry
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2">
                      <Edit2 class="h-3.5 w-3.5 text-muted-foreground" />
                      Configure Scaling
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2 text-destructive focus:text-destructive">
                      <Trash2 class="h-3.5 w-3.5" />
                      Delete Instance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <!-- Active Pagination Footer -->
        <div class="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
          <span>Showing {{ paginatedComboServices.length }} of {{ filteredComboServices.length }} records</span>
          <div class="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              class="h-8 gap-1"
              :disabled="currentPage === 1"
              @click="currentPage = Math.max(1, currentPage - 1)"
            >
              <ChevronLeft class="h-3.5 w-3.5" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="h-8 gap-1"
              :disabled="currentPage === totalPages"
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
            >
              Next
              <ChevronRight class="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
