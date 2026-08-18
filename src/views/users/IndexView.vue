<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/sonner'
import { userService, type UserItem } from '@/services/user.service'
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Users,
  UserCheck,
  UserX,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  RefreshCw,
  Loader2,
} from '@lucide/vue'

export type { UserItem }

// ─── Reactive State ───────────────────────────────────────────────────────────
const users = ref<UserItem[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)

// ─── Load Users from API / Service ────────────────────────────────────────────
async function loadUsers() {
  isLoading.value = true
  try {
    const data = await userService.getUsers()
    users.value = data
  } catch {
    toast.error('Failed to load team members.')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadUsers()
})

// ─── Filter & Search States ───────────────────────────────────────────────────
const searchQuery = ref('')
const selectedRoleFilter = ref<string>('all')
const selectedStatusFilter = ref<string>('all')
const currentPage = ref(1)
const itemsPerPage = ref(6)

// ─── Stats Summary ────────────────────────────────────────────────────────────
const stats = computed(() => {
  const total = users.value.length
  const active = users.value.filter((u) => u.status === 'Active').length
  const pending = users.value.filter((u) => u.status === 'Pending').length
  const suspended = users.value.filter((u) => u.status === 'Suspended').length
  return { total, active, pending, suspended }
})

// ─── Filtered & Paginated Users ───────────────────────────────────────────────
const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesRole =
      selectedRoleFilter.value === 'all' || u.role === selectedRoleFilter.value

    const matchesStatus =
      selectedStatusFilter.value === 'all' || u.status === selectedStatusFilter.value

    return matchesSearch && matchesRole && matchesStatus
  })
})

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value) || 1
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

// ─── Modal Dialog States ──────────────────────────────────────────────────────
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const copiedId = ref<string | null>(null)

// Add Form State
const newUserName = ref('')
const newUserEmail = ref('')
const newUserRole = ref<'Admin' | 'Developer' | 'Editor' | 'Viewer'>('Developer')
const sendInviteEmail = ref(true)

// Edit Form State
const editingUser = ref<UserItem | null>(null)
const editName = ref('')
const editEmail = ref('')
const editRole = ref<'Admin' | 'Developer' | 'Editor' | 'Viewer'>('Developer')
const editStatus = ref<'Active' | 'Pending' | 'Suspended'>('Active')

// Delete Target
const deletingUser = ref<UserItem | null>(null)

// ─── Actions ──────────────────────────────────────────────────────────────────
async function handleAddUser() {
  if (!newUserName.value || !newUserEmail.value) return

  isSubmitting.value = true
  try {
    const newUser = await userService.createUser({
      name: newUserName.value,
      email: newUserEmail.value,
      role: newUserRole.value,
      status: sendInviteEmail.value ? 'Pending' : 'Active',
      twoFactor: false,
    })

    users.value.unshift(newUser)
    toast.success(`Member "${newUser.name}" added successfully!`)

    // Reset & close
    newUserName.value = ''
    newUserEmail.value = ''
    newUserRole.value = 'Developer'
    sendInviteEmail.value = true
    isAddModalOpen.value = false
  } catch {
    toast.error('Failed to create new user.')
  } finally {
    isSubmitting.value = false
  }
}

function openEditModal(user: UserItem) {
  editingUser.value = user
  editName.value = user.name
  editEmail.value = user.email
  editRole.value = user.role
  editStatus.value = user.status
  isEditModalOpen.value = true
}

async function handleSaveEdit() {
  if (!editingUser.value) return
  isSubmitting.value = true
  try {
    const updated = await userService.updateUser(editingUser.value.id, {
      name: editName.value,
      email: editEmail.value,
      role: editRole.value,
      status: editStatus.value,
    })

    const idx = users.value.findIndex((u) => u.id === editingUser.value?.id)
    if (idx !== -1) {
      users.value[idx] = updated
    }
    toast.success(`User "${updated.name}" updated!`)
    isEditModalOpen.value = false
  } catch {
    toast.error('Failed to save changes.')
  } finally {
    isSubmitting.value = false
  }
}

function openDeleteModal(user: UserItem) {
  deletingUser.value = user
  isDeleteModalOpen.value = true
}

async function handleConfirmDelete() {
  if (!deletingUser.value) return
  isSubmitting.value = true
  try {
    await userService.deleteUser(deletingUser.value.id)
    users.value = users.value.filter((u) => u.id !== deletingUser.value?.id)
    toast.success(`Member "${deletingUser.value.name}" removed.`)
    isDeleteModalOpen.value = false
    deletingUser.value = null
  } catch {
    toast.error('Failed to delete member.')
  } finally {
    isSubmitting.value = false
  }
}

async function toggleUserStatus(user: UserItem) {
  const newStatus = user.status === 'Active' ? 'Suspended' : 'Active'
  try {
    await userService.updateUser(user.id, { status: newStatus })
    user.status = newStatus
    toast.success(`Status updated to ${newStatus}`)
  } catch {
    toast.error('Failed to toggle status.')
  }
}

function copyEmail(email: string, id: string) {
  navigator.clipboard.writeText(email)
  copiedId.value = id
  toast.success('Email copied to clipboard')
  setTimeout(() => {
    copiedId.value = null
  }, 2000)
}

// ─── Helpers for Role & Status Styling ────────────────────────────────────────
const roleConfig: Record<string, { label: string; class: string }> = {
  Admin: { label: 'Admin', class: 'bg-primary/10 text-primary border-primary/20' },
  Developer: { label: 'Developer', class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  Editor: { label: 'Editor', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  Viewer: { label: 'Viewer', class: 'bg-muted text-muted-foreground border-border' },
}

const statusConfig: Record<string, { label: string; dotClass: string; badgeClass: string }> = {
  Active: {
    label: 'Active',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  Pending: {
    label: 'Pending',
    dotClass: 'bg-amber-500 animate-pulse',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  Suspended: {
    label: 'Suspended',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  },
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">System Module</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">User Management</h1>
        <p class="text-sm text-muted-foreground">
          Manage team member credentials, security roles, two-factor status, and platform access.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0 shrink-0">
        <Button
          variant="outline"
          size="sm"
          class="gap-1.5 text-xs"
          :disabled="isLoading"
          @click="loadUsers"
        >
          <RefreshCw class="h-3.5 w-3.5" :class="[isLoading && 'animate-spin']" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" class="gap-1.5 text-xs">
          <Download class="h-3.5 w-3.5" />
          Export Users
        </Button>
        <Button size="sm" class="gap-1.5 text-xs" @click="isAddModalOpen = true">
          <Plus class="h-3.5 w-3.5" />
          Add Member
        </Button>
      </div>
    </div>

    <!-- 1. Stats Summary Cards -->
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card class="overflow-hidden py-0 gap-0 shadow-sm">
        <CardContent class="p-4 flex items-center justify-between">
          <div>
            <span class="text-xs font-medium text-muted-foreground">Total Members</span>
            <p class="text-2xl font-bold tracking-tight text-foreground mt-0.5">{{ stats.total }}</p>
            <span class="text-[11px] text-muted-foreground">Registered accounts</span>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Users class="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card class="overflow-hidden py-0 gap-0 shadow-sm">
        <CardContent class="p-4 flex items-center justify-between">
          <div>
            <span class="text-xs font-medium text-muted-foreground">Active Now</span>
            <p class="text-2xl font-bold tracking-tight text-foreground mt-0.5">{{ stats.active }}</p>
            <span class="text-[11px] text-emerald-500 font-medium">Full access enabled</span>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
            <UserCheck class="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card class="overflow-hidden py-0 gap-0 shadow-sm">
        <CardContent class="p-4 flex items-center justify-between">
          <div>
            <span class="text-xs font-medium text-muted-foreground">Pending Invites</span>
            <p class="text-2xl font-bold tracking-tight text-foreground mt-0.5">{{ stats.pending }}</p>
            <span class="text-[11px] text-amber-500 font-medium">Awaiting acceptance</span>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
            <Clock class="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card class="overflow-hidden py-0 gap-0 shadow-sm">
        <CardContent class="p-4 flex items-center justify-between">
          <div>
            <span class="text-xs font-medium text-muted-foreground">Suspended</span>
            <p class="text-2xl font-bold tracking-tight text-foreground mt-0.5">{{ stats.suspended }}</p>
            <span class="text-[11px] text-red-500 font-medium">Access revoked</span>
          </div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500 shrink-0">
            <UserX class="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 2. Main Data Table Card -->
    <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
      <!-- Filter Bar Header -->
      <div class="p-4 border-b border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            placeholder="Search by name or email..."
            class="pl-9 h-9 text-xs"
          />
        </div>

        <!-- Filter Dropdowns -->
        <div class="flex items-center gap-2">
          <!-- Role Filter -->
          <Select v-model="selectedRoleFilter">
            <SelectTrigger class="h-9 w-32 text-xs">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Roles</SelectItem>
              <SelectItem value="Admin" class="text-xs">Admin</SelectItem>
              <SelectItem value="Developer" class="text-xs">Developer</SelectItem>
              <SelectItem value="Editor" class="text-xs">Editor</SelectItem>
              <SelectItem value="Viewer" class="text-xs">Viewer</SelectItem>
            </SelectContent>
          </Select>

          <!-- Status Filter -->
          <Select v-model="selectedStatusFilter">
            <SelectTrigger class="h-9 w-32 text-xs">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Status</SelectItem>
              <SelectItem value="Active" class="text-xs">Active</SelectItem>
              <SelectItem value="Pending" class="text-xs">Pending</SelectItem>
              <SelectItem value="Suspended" class="text-xs">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40 hover:bg-muted/40">
              <TableHead class="w-72 text-xs font-semibold pl-4">Member</TableHead>
              <TableHead class="text-xs font-semibold">Role</TableHead>
              <TableHead class="text-xs font-semibold">Status</TableHead>
              <TableHead class="text-xs font-semibold">2FA</TableHead>
              <TableHead class="text-xs font-semibold">Last Active</TableHead>
              <TableHead class="text-xs font-semibold">Joined Date</TableHead>
              <TableHead class="w-12 text-right pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- Loading Skeletons -->
            <template v-if="isLoading">
              <TableRow v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse">
                <TableCell class="pl-4">
                  <div class="flex items-center gap-3">
                    <div class="h-8 w-8 rounded-full bg-muted shrink-0" />
                    <div class="space-y-1">
                      <div class="h-3 w-28 rounded bg-muted" />
                      <div class="h-2.5 w-40 rounded bg-muted/60" />
                    </div>
                  </div>
                </TableCell>
                <TableCell><div class="h-5 w-16 rounded bg-muted" /></TableCell>
                <TableCell><div class="h-5 w-14 rounded-full bg-muted" /></TableCell>
                <TableCell><div class="h-4 w-16 rounded bg-muted" /></TableCell>
                <TableCell><div class="h-3.5 w-20 rounded bg-muted" /></TableCell>
                <TableCell><div class="h-3.5 w-20 rounded bg-muted" /></TableCell>
                <TableCell><div class="h-6 w-6 rounded bg-muted ml-auto" /></TableCell>
              </TableRow>
            </template>

            <!-- Empty State -->
            <TableRow v-else-if="paginatedUsers.length === 0">
              <TableCell colspan="7" class="h-32 text-center text-muted-foreground text-xs">
                No users found matching your search and filter criteria.
              </TableCell>
            </TableRow>

            <TableRow
              v-for="u in paginatedUsers"
              :key="u.id"
              class="hover:bg-muted/20 transition-colors"
            >
              <!-- Member Info -->
              <TableCell class="pl-4">
                <div class="flex items-center gap-3">
                  <Avatar class="h-8 w-8 shrink-0">
                    <AvatarImage :src="u.avatar" />
                    <AvatarFallback class="text-xs font-semibold bg-muted text-foreground">
                      {{ u.initials }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="min-w-0">
                    <p class="text-xs font-medium text-foreground truncate">{{ u.name }}</p>
                    <p class="text-[11px] text-muted-foreground truncate">{{ u.email }}</p>
                  </div>
                </div>
              </TableCell>

              <!-- Role Badge -->
              <TableCell>
                <span
                  :class="[
                    'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium',
                    roleConfig[u.role].class
                  ]"
                >
                  {{ u.role }}
                </span>
              </TableCell>

              <!-- Status with Dot -->
              <TableCell>
                <div class="flex items-center gap-1.5">
                  <span :class="['h-2 w-2 rounded-full shrink-0', statusConfig[u.status].dotClass]" />
                  <span
                    :class="[
                      'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium',
                      statusConfig[u.status].badgeClass
                    ]"
                  >
                    {{ u.status }}
                  </span>
                </div>
              </TableCell>

              <!-- 2FA Status -->
              <TableCell>
                <div class="flex items-center gap-1">
                  <component
                    :is="u.twoFactor ? ShieldCheck : ShieldAlert"
                    :class="['h-3.5 w-3.5', u.twoFactor ? 'text-emerald-500' : 'text-muted-foreground/60']"
                  />
                  <span :class="['text-xs', u.twoFactor ? 'text-foreground font-medium' : 'text-muted-foreground']">
                    {{ u.twoFactor ? 'Enabled' : 'Disabled' }}
                  </span>
                </div>
              </TableCell>

              <!-- Last Active -->
              <TableCell>
                <span class="text-xs text-muted-foreground">{{ u.lastActive }}</span>
              </TableCell>

              <!-- Joined Date -->
              <TableCell>
                <span class="text-xs text-muted-foreground">{{ u.createdAt }}</span>
              </TableCell>

              <!-- Row Action Dropdown -->
              <TableCell class="text-right pr-4">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon" class="h-7 w-7">
                      <MoreHorizontal class="h-3.5 w-3.5" />
                      <span class="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuLabel class="text-xs">Manage User</DropdownMenuLabel>
                    <DropdownMenuItem class="text-xs cursor-pointer" @click="copyEmail(u.email, u.id)">
                      <component :is="copiedId === u.id ? Check : Copy" class="mr-2 h-3.5 w-3.5" />
                      <span>{{ copiedId === u.id ? 'Copied!' : 'Copy Email' }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-xs cursor-pointer" @click="openEditModal(u)">
                      <Edit2 class="mr-2 h-3.5 w-3.5" />
                      <span>Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem class="text-xs cursor-pointer" @click="toggleUserStatus(u)">
                      <component :is="u.status === 'Active' ? UserX : UserCheck" class="mr-2 h-3.5 w-3.5" />
                      <span>{{ u.status === 'Active' ? 'Suspend Access' : 'Activate User' }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      class="text-xs text-destructive focus:text-destructive cursor-pointer"
                      @click="openDeleteModal(u)"
                    >
                      <Trash2 class="mr-2 h-3.5 w-3.5" />
                      <span>Delete User</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination Footer -->
      <div class="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
        <div>
          Showing <span class="font-medium text-foreground">{{ paginatedUsers.length }}</span> of <span class="font-medium text-foreground">{{ filteredUsers.length }}</span> members
        </div>

        <div class="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            class="h-8 px-2.5 text-xs gap-1"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <ChevronLeft class="h-3.5 w-3.5" />
            Previous
          </Button>

          <span class="text-xs px-2 font-medium text-foreground">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <Button
            variant="outline"
            size="sm"
            class="h-8 px-2.5 text-xs gap-1"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
          >
            Next
            <ChevronRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>

    <!-- ── 3. Add Member Dialog Modal ────────────────────────────────────── -->
    <Dialog v-model:open="isAddModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <Sparkles class="h-4 w-4 text-primary" />
            Add Team Member
          </DialogTitle>
          <DialogDescription>
            Invite a new team member to your organization and assign access privileges.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleAddUser" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label for="new-name" class="text-xs font-medium">Full Name</Label>
            <Input
              id="new-name"
              v-model="newUserName"
              placeholder="e.g. Sarah Connor"
              class="h-9 text-xs"
              required
            />
          </div>

          <div class="space-y-1.5">
            <Label for="new-email" class="text-xs font-medium">Email Address</Label>
            <Input
              id="new-email"
              v-model="newUserEmail"
              type="email"
              placeholder="sarah@supabase.io"
              class="h-9 text-xs"
              required
            />
          </div>

          <div class="space-y-1.5">
            <Label class="text-xs font-medium">Role &amp; Permissions</Label>
            <Select v-model="newUserRole">
              <SelectTrigger class="h-9 text-xs w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin" class="text-xs">
                  Admin — Full infrastructure &amp; billing access
                </SelectItem>
                <SelectItem value="Developer" class="text-xs">
                  Developer — Database schema, SQL &amp; API keys
                </SelectItem>
                <SelectItem value="Editor" class="text-xs">
                  Editor — Content, storage &amp; auth manage
                </SelectItem>
                <SelectItem value="Viewer" class="text-xs">
                  Viewer — Read-only telemetry access
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="flex items-center justify-between rounded-lg border p-3 bg-muted/20">
            <div class="space-y-0.5">
              <Label class="text-xs font-medium">Send Invitation Email</Label>
              <p class="text-[11px] text-muted-foreground">
                User will receive a link to set up their password and 2FA.
              </p>
            </div>
            <Switch v-model="sendInviteEmail" />
          </div>

          <DialogFooter class="pt-2">
            <Button type="button" variant="outline" size="sm" :disabled="isSubmitting" @click="isAddModalOpen = false">
              Cancel
            </Button>
            <Button type="submit" size="sm" :disabled="isSubmitting">
              <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin mr-1.5" />
              Add Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- ── 4. Edit Member Dialog Modal ───────────────────────────────────── -->
    <Dialog v-model:open="isEditModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <Edit2 class="h-4 w-4 text-primary" />
            Edit Member Details
          </DialogTitle>
          <DialogDescription>
            Update role permissions and account status for {{ editingUser?.name }}.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleSaveEdit" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label for="edit-name" class="text-xs font-medium">Full Name</Label>
            <Input
              id="edit-name"
              v-model="editName"
              class="h-9 text-xs"
              required
            />
          </div>

          <div class="space-y-1.5">
            <Label for="edit-email" class="text-xs font-medium">Email Address</Label>
            <Input
              id="edit-email"
              v-model="editEmail"
              type="email"
              class="h-9 text-xs"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <Label class="text-xs font-medium">Role</Label>
              <Select v-model="editRole">
                <SelectTrigger class="h-9 text-xs w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin" class="text-xs">Admin</SelectItem>
                  <SelectItem value="Developer" class="text-xs">Developer</SelectItem>
                  <SelectItem value="Editor" class="text-xs">Editor</SelectItem>
                  <SelectItem value="Viewer" class="text-xs">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-1.5">
              <Label class="text-xs font-medium">Status</Label>
              <Select v-model="editStatus">
                <SelectTrigger class="h-9 text-xs w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active" class="text-xs">Active</SelectItem>
                  <SelectItem value="Pending" class="text-xs">Pending</SelectItem>
                  <SelectItem value="Suspended" class="text-xs">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter class="pt-2">
            <Button type="button" variant="outline" size="sm" :disabled="isSubmitting" @click="isEditModalOpen = false">
              Cancel
            </Button>
            <Button type="submit" size="sm" :disabled="isSubmitting">
              <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin mr-1.5" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- ── 5. Delete Member Confirmation Modal ───────────────────────────── -->
    <Dialog v-model:open="isDeleteModalOpen">
      <DialogContent class="sm:max-w-100">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2 text-destructive">
            <Trash2 class="h-4 w-4" />
            Delete Member Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span class="font-semibold text-foreground">{{ deletingUser?.name }}</span>? This will permanently revoke all API access and remove them from your team.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="pt-2">
          <Button type="button" variant="outline" size="sm" :disabled="isSubmitting" @click="isDeleteModalOpen = false">
            Cancel
          </Button>
          <Button variant="destructive" size="sm" :disabled="isSubmitting" @click="handleConfirmDelete">
            <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin mr-1.5" />
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

