<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
} from '@lucide/vue'

interface ServiceRecord {
  id: string
  name: string
  region: string
  version: string
  status: 'healthy' | 'warning' | 'maintenance' | 'stopped'
  latency: string
  cpu: string
  memory: string
  updatedAt: string
}

const searchQuery = ref('')
const selectedStatusFilter = ref<string>('all')

const services = ref<ServiceRecord[]>([
  {
    id: 'db-fra-01',
    name: 'auth-user-store',
    region: 'eu-central-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: '8.2 ms',
    cpu: '14%',
    memory: '2.4 GB / 8 GB',
    updatedAt: 'Just now',
  },
  {
    id: 'db-fra-02',
    name: 'billing-transactions',
    region: 'eu-central-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: '11.5 ms',
    cpu: '28%',
    memory: '4.1 GB / 16 GB',
    updatedAt: '2 mins ago',
  },
  {
    id: 'db-dub-01',
    name: 'analytics-events-db',
    region: 'eu-west-1',
    version: 'PostgreSQL 15.6',
    status: 'warning',
    latency: '42.8 ms',
    cpu: '78%',
    memory: '14.2 GB / 16 GB',
    updatedAt: '5 mins ago',
  },
  {
    id: 'db-iad-01',
    name: 'realtime-presence-node',
    region: 'us-east-1',
    version: 'PostgreSQL 16.3',
    status: 'healthy',
    latency: '6.4 ms',
    cpu: '19%',
    memory: '3.0 GB / 8 GB',
    updatedAt: '8 mins ago',
  },
  {
    id: 'db-sin-01',
    name: 'storage-metadata-v2',
    region: 'ap-southeast-1',
    version: 'PostgreSQL 15.6',
    status: 'maintenance',
    latency: '18.1 ms',
    cpu: '45%',
    memory: '6.8 GB / 16 GB',
    updatedAt: '12 mins ago',
  },
  {
    id: 'db-pdx-01',
    name: 'legacy-migration-archive',
    region: 'us-west-1',
    version: 'PostgreSQL 14.11',
    status: 'stopped',
    latency: '0 ms',
    cpu: '0%',
    memory: '0 GB / 4 GB',
    updatedAt: '1 hour ago',
  },
])

const filteredServices = computed(() => {
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
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Data Tables</h1>
        <p class="text-sm text-muted-foreground">
          Console-grade data table layouts with search filters, status indicators, and masked edge fade.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0">
        <Button variant="outline" size="sm" class="gap-1.5">
          <Download class="h-3.5 w-3.5" />
          Export CSV
        </Button>
        <Button size="sm" class="gap-1.5">
          <Plus class="h-3.5 w-3.5" />
          Add Database
        </Button>
      </div>
    </div>

    <!-- 1. Full Data Table Card -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
      <!-- Table Filters Header -->
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

      <!-- Table Content Container with mask-fade-x -->
      <div class="overflow-x-auto mask-fade-x">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40 hover:bg-muted/40">
              <TableHead class="w-50 text-xs font-semibold">Instance Name</TableHead>
              <TableHead class="text-xs font-semibold">Region</TableHead>
              <TableHead class="text-xs font-semibold">Engine</TableHead>
              <TableHead class="text-xs font-semibold">Status</TableHead>
              <TableHead class="text-xs font-semibold text-right">Latency</TableHead>
              <TableHead class="text-xs font-semibold text-right">CPU</TableHead>
              <TableHead class="text-xs font-semibold">Memory</TableHead>
              <TableHead class="w-12 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="filteredServices.length === 0">
              <TableCell colspan="8" class="h-32 text-center text-muted-foreground text-xs">
                No database clusters match your filter criteria.
              </TableCell>
            </TableRow>
            <TableRow v-for="service in filteredServices" :key="service.id" class="hover:bg-muted/30 transition-colors">
              <!-- Name & ID -->
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

              <!-- Region -->
              <TableCell class="text-xs font-mono text-muted-foreground">
                {{ service.region }}
              </TableCell>

              <!-- Engine -->
              <TableCell class="text-xs text-muted-foreground">
                {{ service.version }}
              </TableCell>

              <!-- Status with live indicators -->
              <TableCell>
                <div v-if="service.status === 'healthy'" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  <span class="status-dot"></span>
                  Healthy
                </div>
                <div v-else-if="service.status === 'warning'" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-500/20">
                  <span class="status-dot status-dot-amber"></span>
                  High Load
                </div>
                <div v-else-if="service.status === 'maintenance'" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-500/20">
                  <span class="status-dot status-dot-blue"></span>
                  Maintenance
                </div>
                <div v-else class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium border border-border">
                  <span class="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
                  Stopped
                </div>
              </TableCell>

              <!-- Latency -->
              <TableCell class="text-xs font-mono text-right text-foreground">
                {{ service.latency }}
              </TableCell>

              <!-- CPU -->
              <TableCell class="text-xs font-mono text-right text-foreground">
                {{ service.cpu }}
              </TableCell>

              <!-- Memory -->
              <TableCell class="text-xs font-mono text-muted-foreground">
                {{ service.memory }}
              </TableCell>

              <!-- Row Action Dropdown -->
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon" class="h-7 w-7 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal class="h-4 w-4" />
                      <span class="sr-only">Open options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuLabel class="text-xs">Database Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2">
                      <Eye class="h-3.5 w-3.5 text-muted-foreground" />
                      View Metrics
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2">
                      <Edit2 class="h-3.5 w-3.5 text-muted-foreground" />
                      Scale Hardware
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="cursor-pointer text-xs gap-2 text-destructive focus:text-destructive">
                      <Trash2 class="h-3.5 w-3.5" />
                      Delete Cluster
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Table Footer / Pagination Status -->
      <div class="p-4 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {{ filteredServices.length }} of {{ services.length }} database instances</span>
        <div class="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </Card>
  </div>
</template>
