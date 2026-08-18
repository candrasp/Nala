<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Settings,
  MousePointerClick,
  FormInput,
  AppWindow,
  Layers,
  Table2,
  SlidersHorizontal,
  BellRing,
  Compass,
  Tag,
  BellDot,
  AreaChart,
  FileCode2,
  LogOut,
  Bell,
  Search,
  Check,
  Copy,
  Folder,
  Database,
  Key,
  Shield,
  ShieldAlert,
  Server,
  Zap,
  Globe,
  Lock,
  Mail,
  Calendar,
  Clock,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Activity,
  HardDrive,
  Cpu,
  FileText,
  AlertTriangle,
  HelpCircle,
  Sparkles,
} from '@lucide/vue'

const searchQuery = ref('')
const selectedCategory = ref('All')
const copiedIcon = ref<string | null>(null)

interface IconDef {
  name: string
  component: any
  category: 'Navigation' | 'Interface' | 'Data & Storage' | 'Security' | 'Media & Files'
}

const iconsList: IconDef[] = [
  // Navigation
  { name: 'LayoutDashboard', component: LayoutDashboard, category: 'Navigation' },
  { name: 'Users', component: Users, category: 'Navigation' },
  { name: 'Settings', component: Settings, category: 'Navigation' },
  { name: 'Compass', component: Compass, category: 'Navigation' },
  { name: 'ChevronDown', component: ChevronDown, category: 'Navigation' },
  { name: 'ChevronRight', component: ChevronRight, category: 'Navigation' },
  { name: 'ExternalLink', component: ExternalLink, category: 'Navigation' },

  // Interface & Actions
  { name: 'MousePointerClick', component: MousePointerClick, category: 'Interface' },
  { name: 'FormInput', component: FormInput, category: 'Interface' },
  { name: 'AppWindow', component: AppWindow, category: 'Interface' },
  { name: 'Layers', component: Layers, category: 'Interface' },
  { name: 'SlidersHorizontal', component: SlidersHorizontal, category: 'Interface' },
  { name: 'BellRing', component: BellRing, category: 'Interface' },
  { name: 'BellDot', component: BellDot, category: 'Interface' },
  { name: 'Bell', component: Bell, category: 'Interface' },
  { name: 'Search', component: Search, category: 'Interface' },
  { name: 'Plus', component: Plus, category: 'Interface' },
  { name: 'Edit', component: Edit, category: 'Interface' },
  { name: 'Trash2', component: Trash2, category: 'Interface' },
  { name: 'Check', component: Check, category: 'Interface' },
  { name: 'Copy', component: Copy, category: 'Interface' },
  { name: 'Sparkles', component: Sparkles, category: 'Interface' },

  // Data & Storage
  { name: 'Database', component: Database, category: 'Data & Storage' },
  { name: 'Table2', component: Table2, category: 'Data & Storage' },
  { name: 'AreaChart', component: AreaChart, category: 'Data & Storage' },
  { name: 'TrendingUp', component: TrendingUp, category: 'Data & Storage' },
  { name: 'Activity', component: Activity, category: 'Data & Storage' },
  { name: 'HardDrive', component: HardDrive, category: 'Data & Storage' },
  { name: 'Server', component: Server, category: 'Data & Storage' },
  { name: 'Cpu', component: Cpu, category: 'Data & Storage' },

  // Security
  { name: 'Key', component: Key, category: 'Security' },
  { name: 'Shield', component: Shield, category: 'Security' },
  { name: 'ShieldAlert', component: ShieldAlert, category: 'Security' },
  { name: 'Lock', component: Lock, category: 'Security' },
  { name: 'LogOut', component: LogOut, category: 'Security' },
  { name: 'AlertTriangle', component: AlertTriangle, category: 'Security' },

  // Media & Files
  { name: 'FileCode2', component: FileCode2, category: 'Media & Files' },
  { name: 'FileText', component: FileText, category: 'Media & Files' },
  { name: 'Folder', component: Folder, category: 'Media & Files' },
  { name: 'Download', component: Download, category: 'Media & Files' },
  { name: 'Upload', component: Upload, category: 'Media & Files' },
  { name: 'Mail', component: Mail, category: 'Media & Files' },
  { name: 'Calendar', component: Calendar, category: 'Media & Files' },
  { name: 'Clock', component: Clock, category: 'Media & Files' },
  { name: 'Globe', component: Globe, category: 'Media & Files' },
  { name: 'Zap', component: Zap, category: 'Media & Files' },
  { name: 'Tag', component: Tag, category: 'Media & Files' },
  { name: 'HelpCircle', component: HelpCircle, category: 'Media & Files' },
]

const categories = ['All', 'Navigation', 'Interface', 'Data & Storage', 'Security', 'Media & Files']

const filteredIcons = computed(() => {
  return iconsList.filter((icon) => {
    const matchesCategory = selectedCategory.value === 'All' || icon.category === selectedCategory.value
    const matchesSearch = !searchQuery.value || icon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

function copyImport(iconName: string) {
  const code = `import { ${iconName} } from '@lucide/vue'`
  navigator.clipboard.writeText(code)
  copiedIcon.value = iconName
  setTimeout(() => {
    copiedIcon.value = null
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Design System</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Icon Set &amp; Glyphs</h1>
        <p class="text-sm text-muted-foreground">
          Curated Lucide SVG icon directory used across the Nala design system. Click any icon to copy its import snippet.
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2 sm:pt-0">
        <span>{{ filteredIcons.length }} of {{ iconsList.length }} Icons</span>
      </div>
    </div>

    <!-- Search & Category Filters -->
    <Card class="shadow-sm overflow-hidden py-0 gap-0">
      <CardContent class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            placeholder="Filter icons by name..."
            class="pl-9 h-9 text-xs"
          />
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <Button
            v-for="cat in categories"
            :key="cat"
            variant="ghost"
            size="sm"
            class="h-7 px-2.5 text-xs transition-all"
            :class="{ 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90': selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Icons Grid -->
    <Card class="shadow-sm overflow-hidden py-0 gap-0">
      <CardContent class="p-6">
        <div v-if="filteredIcons.length === 0" class="py-12 text-center text-sm text-muted-foreground">
          No icon found matching "{{ searchQuery }}".
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="rounded-xl border border-border p-4 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center text-center group cursor-pointer relative shadow-2xs"
            @click="copyImport(icon.name)"
          >
            <!-- Icon Display -->
            <div class="h-12 w-12 rounded-lg bg-muted/40 group-hover:bg-primary/10 flex items-center justify-center text-foreground group-hover:text-primary transition-colors mb-2">
              <component :is="icon.component" class="h-5 w-5" />
            </div>

            <!-- Icon Name -->
            <p class="text-xs font-semibold text-foreground truncate max-w-full">
              {{ icon.name }}
            </p>
            <span class="text-[10px] text-muted-foreground font-mono mt-0.5">
              {{ icon.category }}
            </span>

            <!-- Copy Hover Overlay Indicator -->
            <div
              v-if="copiedIcon === icon.name"
              class="absolute inset-0 bg-popover/95 backdrop-blur-xs rounded-xl flex items-center justify-center gap-1 text-xs font-semibold text-emerald-500 shadow-md animate-in fade-in"
            >
              <Check class="h-4 w-4" />
              Copied!
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
