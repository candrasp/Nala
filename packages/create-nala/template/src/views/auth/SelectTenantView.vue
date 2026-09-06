<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/sonner'
import {
  Building2,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
  Users,
  Globe,
  ShieldCheck,
  LogOut,
  Layers,
  Star,
  Loader2,
  Mail,
  UserCheck,
  Briefcase,
  Zap,
} from '@lucide/vue'

const router = useRouter()

// Current logged in user info
const currentUser = ref({
  name: 'Alex Morgan',
  email: 'alex.morgan@acme.corp',
  avatar: 'AM',
})

// Workspace data interface
export interface Workspace {
  id: string
  name: string
  slug: string
  domain: string
  plan: 'Enterprise' | 'Team Pro' | 'Business' | 'Free Starter'
  role: 'Owner' | 'Admin' | 'Member' | 'Billing'
  membersCount: number
  region: string
  isDefault: boolean
  hasSso: boolean
  color: string
  icon: 'building' | 'layers' | 'briefcase' | 'sparkles'
}

// Initial workspaces list
const workspaces = ref<Workspace[]>([
  {
    id: 'ws-1',
    name: 'Acme Corporation',
    slug: 'acme-corp',
    domain: 'acme.nala.app',
    plan: 'Enterprise',
    role: 'Owner',
    membersCount: 148,
    region: 'US-East (N. Virginia)',
    isDefault: true,
    hasSso: true,
    color: 'from-violet-600 to-indigo-600',
    icon: 'building',
  },
  {
    id: 'ws-2',
    name: 'Horizon AI Labs',
    slug: 'horizon-ai',
    domain: 'horizon.nala.app',
    plan: 'Team Pro',
    role: 'Admin',
    membersCount: 42,
    region: 'EU-Central (Frankfurt)',
    isDefault: false,
    hasSso: true,
    color: 'from-emerald-600 to-teal-600',
    icon: 'sparkles',
  },
  {
    id: 'ws-3',
    name: 'Vertex Media Global',
    slug: 'vertex-media',
    domain: 'vertex.nala.app',
    plan: 'Business',
    role: 'Member',
    membersCount: 19,
    region: 'AP-Southeast (Singapore)',
    isDefault: false,
    hasSso: false,
    color: 'from-amber-600 to-orange-600',
    icon: 'layers',
  },
  {
    id: 'ws-4',
    name: 'Alex Morgan (Personal)',
    slug: 'alex-morgan',
    domain: 'alex.nala.app',
    plan: 'Free Starter',
    role: 'Owner',
    membersCount: 1,
    region: 'Global Edge',
    isDefault: false,
    hasSso: false,
    color: 'from-slate-600 to-zinc-700',
    icon: 'briefcase',
  },
])

// Pending Invitation
const pendingInvitation = ref<{
  id: string
  orgName: string
  invitedBy: string
  role: string
  membersCount: number
} | null>({
  id: 'inv-1',
  orgName: 'CyberSec Sentinel Ops',
  invitedBy: 'sarah.jenkins@cybersec.io',
  role: 'Security Auditor',
  membersCount: 65,
})

// Search & Filter State
const searchQuery = ref('')
const activeFilter = ref<'all' | 'enterprise' | 'owned'>('all')
const launchingId = ref<string | null>(null)

// Filtered Workspaces
const filteredWorkspaces = computed(() => {
  return workspaces.value.filter((ws: Workspace) => {
    const matchesSearch =
      ws.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ws.slug.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ws.domain.toLowerCase().includes(searchQuery.value.toLowerCase())

    if (!matchesSearch) return false

    if (activeFilter.value === 'enterprise') {
      return ws.plan === 'Enterprise' || ws.plan === 'Team Pro'
    }
    if (activeFilter.value === 'owned') {
      return ws.role === 'Owner'
    }
    return true
  })
})

// Plan styling helper
const getPlanBadgeClass = (plan: Workspace['plan']) => {
  switch (plan) {
    case 'Enterprise':
      return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30'
    case 'Team Pro':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    case 'Business':
      return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

// Role styling helper
const getRoleBadgeClass = (role: Workspace['role']) => {
  switch (role) {
    case 'Owner':
      return 'bg-primary/10 text-primary border-primary/20'
    case 'Admin':
      return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    case 'Billing':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    default:
      return 'bg-muted/80 text-muted-foreground border-border/80'
  }
}

// Select / Launch Workspace
const launchWorkspace = (ws: Workspace) => {
  launchingId.value = ws.id
  toast.info(`Connecting to ${ws.name}...`, {
    description: `Routing to tenant domain ${ws.domain}`,
  })

  setTimeout(() => {
    launchingId.value = null
    toast.success(`Welcome back to ${ws.name}!`, {
      description: `Active role: ${ws.role}`,
    })
    router.push('/dashboard')
  }, 900)
}

// Set Default Workspace
const setDefaultWorkspace = (ws: Workspace, e: MouseEvent) => {
  e.stopPropagation()
  workspaces.value.forEach((w: Workspace) => {
    w.isDefault = w.id === ws.id
  })
  toast.success(`Default workspace updated`, {
    description: `${ws.name} will now open automatically upon sign-in.`,
  })
}

// Accept Pending Invitation
const acceptInvitation = () => {
  if (!pendingInvitation.value) return
  const newWs: Workspace = {
    id: `ws-${Date.now()}`,
    name: pendingInvitation.value.orgName,
    slug: pendingInvitation.value.orgName.toLowerCase().replace(/\s+/g, '-'),
    domain: `${pendingInvitation.value.orgName.toLowerCase().replace(/\s+/g, '')}.nala.app`,
    plan: 'Enterprise',
    role: 'Member',
    membersCount: pendingInvitation.value.membersCount + 1,
    region: 'US-East (N. Virginia)',
    isDefault: false,
    hasSso: true,
    color: 'from-cyan-600 to-blue-600',
    icon: 'building',
  }

  workspaces.value.unshift(newWs)
  toast.success(`Joined ${pendingInvitation.value.orgName}!`, {
    description: `You are now a ${pendingInvitation.value.role}.`,
  })
  pendingInvitation.value = null
}

// Decline Invitation
const declineInvitation = () => {
  pendingInvitation.value = null
  toast.info('Invitation dismissed')
}

// Create New Workspace Modal State
const isCreateModalOpen = ref(false)
const isCreating = ref(false)
const newWorkspaceName = ref('')
const newWorkspaceSlug = ref('')
const selectedPlan = ref<'Starter' | 'Pro' | 'Enterprise'>('Pro')
const selectedRegion = ref('us-east-1')

const handleNameInput = () => {
  newWorkspaceSlug.value = newWorkspaceName.value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const handleCreateWorkspace = () => {
  if (!newWorkspaceName.value.trim()) {
    toast.error('Please enter a valid workspace name')
    return
  }

  isCreating.value = true
  setTimeout(() => {
    isCreating.value = false
    const created: Workspace = {
      id: `ws-${Date.now()}`,
      name: newWorkspaceName.value.trim(),
      slug: newWorkspaceSlug.value || 'new-workspace',
      domain: `${newWorkspaceSlug.value || 'new-workspace'}.nala.app`,
      plan: selectedPlan.value === 'Enterprise' ? 'Enterprise' : selectedPlan.value === 'Pro' ? 'Team Pro' : 'Free Starter',
      role: 'Owner',
      membersCount: 1,
      region: selectedRegion.value === 'eu-central-1' ? 'EU-Central (Frankfurt)' : selectedRegion.value === 'ap-southeast-1' ? 'AP-Southeast (Singapore)' : 'US-East (N. Virginia)',
      isDefault: false,
      hasSso: selectedPlan.value === 'Enterprise',
      color: 'from-primary to-violet-600',
      icon: 'sparkles',
    }

    workspaces.value.unshift(created)
    isCreateModalOpen.value = false
    newWorkspaceName.value = ''
    newWorkspaceSlug.value = ''
    toast.success(`Workspace "${created.name}" created successfully!`)
  }, 1000)
}
</script>

<template>
  <div class="w-full space-y-6">
    <!-- User Account Summary Strip -->
    <div class="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border/70 shadow-2xs backdrop-blur-xs">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-full bg-primary/15 text-primary font-semibold text-xs flex items-center justify-center border border-primary/20 shrink-0">
          {{ currentUser.avatar }}
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-foreground truncate">{{ currentUser.name }}</span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>
          <p class="text-[11px] text-muted-foreground truncate">{{ currentUser.email }}</p>
        </div>
      </div>

      <router-link
        to="/auth/login"
        class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/60"
        title="Sign in with a different account"
      >
        <LogOut class="h-3.5 w-3.5" />
        <span class="hidden sm:inline">Switch Account</span>
      </router-link>
    </div>

    <!-- Main Card Container -->
    <Card class="border-border/80 shadow-md overflow-hidden">
      <CardHeader class="pb-4 space-y-1">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle class="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers class="h-5 w-5 text-primary" />
              Select Workspace
            </CardTitle>
            <CardDescription class="text-xs text-muted-foreground mt-0.5">
              Choose an organization to enter its tenant dashboard or create a new team.
            </CardDescription>
          </div>

          <!-- Create Workspace Dialog Trigger -->
          <Dialog v-model:open="isCreateModalOpen">
            <DialogTrigger as-child>
              <Button size="sm" class="gap-1.5 text-xs shrink-0 cursor-pointer">
                <Plus class="h-3.5 w-3.5" />
                New Workspace
              </Button>
            </DialogTrigger>

            <!-- Dialog Content with strict Title & Description accessibility -->
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-base font-semibold">
                  <Building2 class="h-4 w-4 text-primary" />
                  Create New Workspace
                </DialogTitle>
                <DialogDescription class="text-xs text-muted-foreground">
                  Set up a fresh multi-tenant organization, invite teammates, and choose your infrastructure region.
                </DialogDescription>
              </DialogHeader>

              <div class="space-y-4 py-3">
                <div class="space-y-1.5">
                  <Label for="ws-name" class="text-xs font-medium">Workspace Name</Label>
                  <Input
                    id="ws-name"
                    v-model="newWorkspaceName"
                    placeholder="e.g. Acme Studio"
                    class="h-9 text-xs"
                    @input="handleNameInput"
                  />
                </div>

                <div class="space-y-1.5">
                  <Label for="ws-slug" class="text-xs font-medium">Workspace URL Slug</Label>
                  <div class="flex items-center rounded-md border border-input bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                    <span class="text-muted-foreground/70">nala.app/</span>
                    <input
                      id="ws-slug"
                      v-model="newWorkspaceSlug"
                      placeholder="acme-studio"
                      class="flex-1 bg-transparent border-0 outline-none text-foreground px-1 text-xs"
                    />
                  </div>
                </div>

                <!-- Plan Tier Options -->
                <div class="space-y-2">
                  <Label class="text-xs font-medium">Select Plan</Label>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      :class="[
                        'p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between',
                        selectedPlan === 'Starter'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:bg-muted/40'
                      ]"
                      @click="selectedPlan = 'Starter'"
                    >
                      <span class="text-xs font-semibold text-foreground">Starter</span>
                      <span class="text-[10px] text-muted-foreground mt-1">Free &middot; 5 Seats</span>
                    </button>

                    <button
                      type="button"
                      :class="[
                        'p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between',
                        selectedPlan === 'Pro'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:bg-muted/40'
                      ]"
                      @click="selectedPlan = 'Pro'"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-foreground">Team Pro</span>
                        <Zap class="h-3 w-3 text-amber-500" />
                      </div>
                      <span class="text-[10px] text-muted-foreground mt-1">$29/mo</span>
                    </button>

                    <button
                      type="button"
                      :class="[
                        'p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between',
                        selectedPlan === 'Enterprise'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:bg-muted/40'
                      ]"
                      @click="selectedPlan = 'Enterprise'"
                    >
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-foreground">Enterprise</span>
                        <Sparkles class="h-3 w-3 text-primary" />
                      </div>
                      <span class="text-[10px] text-muted-foreground mt-1">SSO & SLA</span>
                    </button>
                  </div>
                </div>

                <!-- Region Selector -->
                <div class="space-y-1.5">
                  <Label for="region-select" class="text-xs font-medium">Primary Cloud Region</Label>
                  <select
                    id="region-select"
                    v-model="selectedRegion"
                    class="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="us-east-1">US-East (N. Virginia - us-east-1)</option>
                    <option value="eu-central-1">EU-Central (Frankfurt - eu-central-1)</option>
                    <option value="ap-southeast-1">AP-Southeast (Singapore - ap-southeast-1)</option>
                  </select>
                </div>
              </div>

              <DialogFooter class="gap-2 sm:gap-0">
                <Button variant="outline" size="sm" class="text-xs cursor-pointer" @click="isCreateModalOpen = false">
                  Cancel
                </Button>
                <Button size="sm" class="text-xs cursor-pointer gap-1.5" :disabled="isCreating || !newWorkspaceName.trim()" @click="handleCreateWorkspace">
                  <Loader2 v-if="isCreating" class="h-3.5 w-3.5 animate-spin" />
                  <span>{{ isCreating ? 'Creating Workspace...' : 'Create & Proceed' }}</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Search Bar & Segmented Filter Tabs -->
        <div class="pt-3 flex flex-col sm:flex-row gap-2 items-center">
          <div class="relative w-full flex-1">
            <Search class="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              v-model="searchQuery"
              placeholder="Search by name, slug, or domain..."
              class="h-8.5 text-xs pl-8.5 bg-muted/30"
            />
          </div>

          <div class="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border/60 self-stretch sm:self-auto shrink-0">
            <button
              type="button"
              :class="[
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
                activeFilter === 'all' ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
              ]"
              @click="activeFilter = 'all'"
            >
              All ({{ workspaces.length }})
            </button>
            <button
              type="button"
              :class="[
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
                activeFilter === 'enterprise' ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
              ]"
              @click="activeFilter = 'enterprise'"
            >
              Enterprise
            </button>
            <button
              type="button"
              :class="[
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
                activeFilter === 'owned' ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
              ]"
              @click="activeFilter = 'owned'"
            >
              Owner
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent class="space-y-3 pt-1 pb-6">
        <!-- Pending Invitation Alert Banner -->
        <div
          v-if="pendingInvitation"
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl border border-primary/20 bg-primary/5 gap-3"
        >
          <div class="flex items-start gap-2.5">
            <div class="h-7 w-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <Mail class="h-3.5 w-3.5" />
            </div>
            <div>
              <div class="text-xs font-semibold text-foreground flex items-center gap-2">
                Pending Workspace Invitation
                <Badge variant="outline" class="text-[10px] py-0 border-primary/30 text-primary">
                  {{ pendingInvitation.role }}
                </Badge>
              </div>
              <p class="text-[11px] text-muted-foreground mt-0.5">
                <strong>{{ pendingInvitation.invitedBy }}</strong> invited you to join <strong>{{ pendingInvitation.orgName }}</strong>.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
            <Button size="sm" variant="ghost" class="h-7 text-xs px-2 cursor-pointer text-muted-foreground hover:text-foreground" @click="declineInvitation">
              Decline
            </Button>
            <Button size="sm" class="h-7 text-xs px-2.5 gap-1.5 cursor-pointer" @click="acceptInvitation">
              <UserCheck class="h-3.5 w-3.5" />
              Accept & Join
            </Button>
          </div>
        </div>

        <!-- Workspaces List -->
        <div v-if="filteredWorkspaces.length > 0" class="space-y-2.5">
          <div
            v-for="ws in filteredWorkspaces"
            :key="ws.id"
            class="group relative flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-border/70 bg-card hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer shadow-2xs gap-3"
            @click="launchWorkspace(ws)"
          >
            <!-- Left Info: Logo, Name, Domain, Role, Plan -->
            <div class="flex items-start sm:items-center gap-3 min-w-0">
              <!-- Workspace Avatar -->
              <div
                :class="[
                  'h-10 w-10 rounded-xl bg-linear-to-br text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0 transition-transform group-hover:scale-105',
                  ws.color
                ]"
              >
                <Building2 v-if="ws.icon === 'building'" class="h-5 w-5" />
                <Sparkles v-else-if="ws.icon === 'sparkles'" class="h-5 w-5" />
                <Layers v-else-if="ws.icon === 'layers'" class="h-5 w-5" />
                <Briefcase v-else class="h-5 w-5" />
              </div>

              <!-- Details -->
              <div class="space-y-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {{ ws.name }}
                  </h3>

                  <!-- Default Star Badge -->
                  <button
                    type="button"
                    :class="[
                      'p-0.5 rounded transition-colors cursor-pointer',
                      ws.isDefault ? 'text-amber-500' : 'text-muted-foreground/40 hover:text-muted-foreground'
                    ]"
                    :title="ws.isDefault ? 'Default workspace' : 'Set as default workspace'"
                    @click="setDefaultWorkspace(ws, $event)"
                  >
                    <Star class="h-3.5 w-3.5" :class="{ 'fill-amber-500': ws.isDefault }" />
                  </button>

                  <!-- Plan Badge -->
                  <span
                    :class="[
                      'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border',
                      getPlanBadgeClass(ws.plan)
                    ]"
                  >
                    {{ ws.plan }}
                  </span>

                  <!-- Role Badge -->
                  <span
                    :class="[
                      'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border',
                      getRoleBadgeClass(ws.role)
                    ]"
                  >
                    {{ ws.role }}
                  </span>
                </div>

                <!-- Meta row: Domain, Members, SSO, Region -->
                <div class="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                  <span class="font-mono text-muted-foreground/80">{{ ws.domain }}</span>
                  <span>&middot;</span>
                  <span class="inline-flex items-center gap-1">
                    <Users class="h-3 w-3" />
                    {{ ws.membersCount }} {{ ws.membersCount === 1 ? 'member' : 'members' }}
                  </span>
                  <span>&middot;</span>
                  <span class="inline-flex items-center gap-1">
                    <Globe class="h-3 w-3" />
                    {{ ws.region }}
                  </span>
                  <span v-if="ws.hasSso" class="inline-flex items-center gap-1 text-primary">
                    <span>&middot;</span>
                    <ShieldCheck class="h-3 w-3" />
                    SSO
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Action Trigger -->
            <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Button
                size="sm"
                variant="outline"
                class="h-8 text-xs gap-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all cursor-pointer"
                :disabled="launchingId === ws.id"
              >
                <Loader2 v-if="launchingId === ws.id" class="h-3.5 w-3.5 animate-spin" />
                <span v-else>Launch</span>
                <ChevronRight v-if="launchingId !== ws.id" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>

        <!-- Empty Filter State -->
        <div v-else class="py-12 text-center space-y-3">
          <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Search class="h-5 w-5" />
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold text-foreground">No workspaces found</p>
            <p class="text-[11px] text-muted-foreground">Try adjusting your search query or filter terms.</p>
          </div>
          <Button size="sm" variant="outline" class="text-xs cursor-pointer" @click="searchQuery = ''; activeFilter = 'all'">
            Clear Filters
          </Button>
        </div>
      </CardContent>

      <CardFooter class="py-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40">
        <p class="text-[11px]">
          Need to connect with an enterprise identity provider?
          <router-link to="/auth/sso" class="text-primary hover:underline ml-1">Enterprise SSO &rarr;</router-link>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>
