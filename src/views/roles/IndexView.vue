<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Plus,
  RotateCcw,
  Check,
  Search,
  Users,
  Lock,
  Trash2,
  Copy,
  Info,
  Shield,
  RefreshCw,
  FolderLock,
  AlertTriangle,
} from '@lucide/vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import PageHeader from '@/components/PageHeader.vue'
import { useRoleStore } from '@/stores/role'
import { toast } from '@/components/ui/sonner'

const roleStore = useRoleStore()

// ─── Create Role Form State ───────────────────────────────────────────────────
const newRoleName = ref('')
const newRoleSlug = ref('')
const newRoleDescription = ref('')
const newRoleCloneId = ref('none')

onMounted(() => {
  roleStore.loadData()
})

function handleNameChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!newRoleSlug.value || newRoleSlug.value === newRoleName.value.toLowerCase().replace(/\s+/g, '-')) {
    newRoleSlug.value = target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
}

async function handleCreateRoleSubmit() {
  if (!newRoleName.value.trim()) {
    toast.error('Role name is required.')
    return
  }

  const success = await roleStore.createRole({
    name: newRoleName.value.trim(),
    slug: newRoleSlug.value.trim() || newRoleName.value.toLowerCase().replace(/\s+/g, '-'),
    description: newRoleDescription.value.trim() || 'Custom team role with fine-grained access.',
    cloneRoleId: newRoleCloneId.value !== 'none' ? newRoleCloneId.value : undefined,
  })

  if (success) {
    newRoleName.value = ''
    newRoleSlug.value = ''
    newRoleDescription.value = ''
    newRoleCloneId.value = 'none'
  }
}

function handleDuplicateRole(roleId: string) {
  const sourceRole = roleStore.roles.find((r) => r.id === roleId)
  if (!sourceRole) return

  newRoleName.value = `${sourceRole.name} (Copy)`
  newRoleSlug.value = `${sourceRole.slug}-copy`
  newRoleDescription.value = `Cloned configuration from ${sourceRole.name}.`
  newRoleCloneId.value = sourceRole.id
  roleStore.isCreateModalOpen = true
}

function getLevelBadgeVariant(level: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (level) {
    case 'admin':
      return 'destructive'
    case 'delete':
      return 'warning'
    case 'write':
      return 'info'
    default:
      return 'outline'
  }
}

function getRoleBadgeVariant(color: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (color) {
    case 'emerald':
      return 'success'
    case 'blue':
      return 'info'
    case 'purple':
      return 'secondary'
    case 'amber':
      return 'warning'
    default:
      return 'outline'
  }
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Standard PageHeader -->
    <PageHeader
      title="Roles & Permissions Matrix"
      description="Define granular Role-Based Access Control (RBAC) scopes, manage system policies, and author custom team security roles."
      badge="Security & Access"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <!-- Reset Matrix Changes -->
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="!roleStore.hasUnsavedChanges || roleStore.isSaving"
            @click="roleStore.resetChanges"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            Reset
          </Button>

          <!-- Create Role Button -->
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            @click="roleStore.isCreateModalOpen = true"
          >
            <Plus class="h-3.5 w-3.5" />
            Create Custom Role
          </Button>

          <!-- Save Changes Button -->
          <Button
            size="sm"
            class="text-xs gap-1.5 relative"
            :disabled="!roleStore.hasUnsavedChanges || roleStore.isSaving"
            @click="roleStore.saveMatrixChanges"
          >
            <Check v-if="!roleStore.isSaving" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            <span>{{ roleStore.isSaving ? 'Saving...' : 'Save Matrix' }}</span>
            <span
              v-if="roleStore.hasUnsavedChanges"
              class="absolute -top-1 -right-1 flex h-2.5 w-2.5"
            >
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- ROLES SUMMARY CARDS                                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="role in roleStore.roles"
        :key="role.id"
        class="shadow-sm border relative overflow-hidden transition-all hover:border-primary/50"
      >
        <CardContent class="p-5 flex flex-col justify-between h-full space-y-3">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-sm font-bold text-foreground truncate">{{ role.name }}</span>
                <Badge
                  :variant="getRoleBadgeVariant(role.color)"
                  shape="pill"
                  class="text-[10px] py-0 px-2 uppercase font-mono"
                >
                  {{ role.slug }}
                </Badge>
              </div>

              <Badge
                v-if="role.isSystem"
                variant="outline"
                class="text-[10px] gap-1 shrink-0 bg-muted/50"
              >
                <Lock class="h-2.5 w-2.5" />
                System
              </Badge>
            </div>

            <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {{ role.description }}
            </p>
          </div>

          <div class="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <Users class="h-3.5 w-3.5 text-primary" />
              <span>{{ role.usersCount }} assigned</span>
            </div>

            <div class="flex items-center gap-1">
              <!-- Clone / Duplicate Button -->
              <Button
                variant="ghost"
                size="icon-xs"
                class="h-6 w-6 text-muted-foreground hover:text-foreground"
                title="Duplicate Role Template"
                @click="handleDuplicateRole(role.id)"
              >
                <Copy class="h-3 w-3" />
              </Button>

              <!-- Delete Custom Role Button -->
              <Button
                v-if="!role.isSystem"
                variant="ghost"
                size="icon-xs"
                class="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Delete Role"
                @click="roleStore.confirmDeleteRole(role)"
              >
                <Trash2 class="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- INTERACTIVE PERMISSIONS MATRIX TABLE                                  -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm border overflow-hidden">
      <!-- Matrix Header Toolbar -->
      <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle class="text-base font-semibold">Access Control Matrix</CardTitle>
          <CardDescription class="text-xs mt-0.5">
            Configure permission scopes per role across {{ roleStore.totalPermissionsCount }} individual functional capabilities.
          </CardDescription>
        </div>

        <!-- Search Input -->
        <div class="w-full sm:w-72 shrink-0">
          <InputGroup>
            <InputIcon side="left">
              <Search class="h-3.5 w-3.5" />
            </InputIcon>
            <Input
              v-model="roleStore.searchQuery"
              placeholder="Search permissions or modules..."
              class="pl-9 h-8 text-xs bg-background"
            />
          </InputGroup>
        </div>
      </CardHeader>

      <!-- Matrix Grid -->
      <CardContent class="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="bg-muted/40">
              <TableHead class="w-88 min-w-72 font-semibold">
                Functional Scopes &amp; Actions
              </TableHead>

              <!-- Role Columns -->
              <TableHead
                v-for="role in roleStore.roles"
                :key="role.id"
                class="text-center w-36 min-w-32"
              >
                <div class="flex flex-col items-center justify-center gap-1 py-1">
                  <span class="text-xs font-bold text-foreground">{{ role.name }}</span>
                  <div class="flex items-center gap-1.5">
                    <Checkbox
                      v-if="!role.isSystem || role.slug !== 'admin'"
                      :checked="roleStore.isRoleFullyGranted(role.id)"
                      @update:checked="roleStore.toggleAllForRole(role.id)"
                      :aria-label="`Toggle all for ${role.name}`"
                      class="scale-90"
                    />
                    <span class="text-[10px] text-muted-foreground font-normal">
                      {{ role.permissions.length }} scope(s)
                    </span>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <!-- Loop through Modules -->
            <template
              v-for="mod in roleStore.filteredModules"
              :key="mod.id"
            >
              <!-- Module Section Header Row -->
              <TableRow class="bg-muted/20 hover:bg-muted/30 border-y font-semibold">
                <TableCell class="py-2.5">
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-2">
                      <FolderLock class="h-3.5 w-3.5 text-primary" />
                      <span class="text-xs font-bold text-foreground">{{ mod.name }}</span>
                    </div>
                    <p class="text-[11px] text-muted-foreground font-normal">
                      {{ mod.description }}
                    </p>
                  </div>
                </TableCell>

                <!-- Module Select-All Column Toggles -->
                <TableCell
                  v-for="role in roleStore.roles"
                  :key="role.id"
                  class="text-center py-2.5"
                >
                  <TooltipProvider :delay-duration="150">
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <div class="inline-flex items-center justify-center">
                          <Checkbox
                            v-if="!role.isSystem || role.slug !== 'admin'"
                            :checked="roleStore.isModuleFullySelected(role.id, mod.id)"
                            @update:checked="roleStore.toggleModuleForRole(role.id, mod.id)"
                            :aria-label="`Toggle all in ${mod.name} for ${role.name}`"
                          />
                          <Badge v-else variant="outline" class="text-[10px] py-0 px-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            Full
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent class="text-xs">
                        {{ role.isSystem && role.slug === 'admin' ? 'Administrator retains full access' : `Toggle all in ${mod.name}` }}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>

              <!-- Individual Permission Rows in Module -->
              <TableRow
                v-for="perm in mod.permissions"
                :key="perm.id"
                class="hover:bg-muted/15 transition-colors"
              >
                <TableCell class="py-2 pl-8">
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-medium text-foreground">{{ perm.name }}</span>
                      <Badge
                        :variant="getLevelBadgeVariant(perm.level)"
                        shape="pill"
                        class="text-[9px] py-0 px-1.5 font-mono uppercase"
                      >
                        {{ perm.level }}
                      </Badge>
                      <span class="text-[10px] font-mono text-muted-foreground">({{ perm.id }})</span>
                    </div>
                    <p class="text-[11px] text-muted-foreground">
                      {{ perm.description }}
                    </p>
                  </div>
                </TableCell>

                <!-- Checkbox per Role -->
                <TableCell
                  v-for="role in roleStore.roles"
                  :key="role.id"
                  class="text-center py-2"
                >
                  <TooltipProvider :delay-duration="150">
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <div class="inline-flex items-center justify-center">
                          <Checkbox
                            v-if="!role.isSystem || role.slug !== 'admin'"
                            :checked="roleStore.hasPermission(role.id, perm.id)"
                            @update:checked="roleStore.togglePermission(role.id, perm.id)"
                            :aria-label="`Grant ${perm.name} to ${role.name}`"
                          />
                          <Badge v-else variant="outline" class="text-[10px] py-0 px-1 text-muted-foreground/60 border-transparent">
                            <Check class="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent class="text-xs">
                        {{ role.isSystem && role.slug === 'admin' ? 'Locked (Super Administrator)' : `Toggle ${perm.name} for ${role.name}` }}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            </template>

            <!-- Empty Search State -->
            <TableRow v-if="roleStore.filteredModules.length === 0">
              <TableCell :colspan="roleStore.roles.length + 1" class="h-36 text-center text-muted-foreground">
                <div class="flex flex-col items-center justify-center gap-2">
                  <Search class="h-6 w-6 text-muted-foreground/40" />
                  <p class="text-xs font-medium text-foreground">No permissions found</p>
                  <p class="text-[11px] text-muted-foreground">No scopes match "{{ roleStore.searchQuery }}".</p>
                  <Button variant="outline" size="sm" class="text-xs mt-1" @click="roleStore.searchQuery = ''">
                    Clear Search
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <!-- Matrix Footer Info -->
      <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div class="flex items-center gap-1.5">
          <Info class="h-3.5 w-3.5 text-primary" />
          <span>Changes take effect immediately for active team member sessions once saved.</span>
        </div>

        <div class="flex items-center gap-2">
          <span v-if="roleStore.hasUnsavedChanges" class="text-amber-600 dark:text-amber-400 font-medium">
            ● Unsaved modifications
          </span>
          <Button
            size="sm"
            class="text-xs gap-1.5"
            :disabled="!roleStore.hasUnsavedChanges || roleStore.isSaving"
            @click="roleStore.saveMatrixChanges"
          >
            <Check v-if="!roleStore.isSaving" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            Save Changes
          </Button>
        </div>
      </CardFooter>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- CREATE CUSTOM ROLE DIALOG MODAL                                       -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="roleStore.isCreateModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <Shield class="h-4 w-4 text-primary" />
            Create Custom Security Role
          </DialogTitle>
          <DialogDescription class="text-xs">
            Define a custom access profile and initialize permission scopes from an existing template.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleCreateRoleSubmit" class="space-y-4 py-2 text-xs">
          <!-- Role Name & Slug -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <Label for="role-name" class="text-xs font-semibold">Role Name</Label>
              <Input
                id="role-name"
                v-model="newRoleName"
                placeholder="e.g. Billing Specialist"
                class="h-9 text-xs"
                required
                @input="handleNameChange"
              />
            </div>

            <div class="space-y-1.5">
              <Label for="role-slug" class="text-xs font-semibold">Identifier Slug</Label>
              <Input
                id="role-slug"
                v-model="newRoleSlug"
                placeholder="billing-specialist"
                class="h-9 text-xs font-mono"
                required
              />
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-1.5">
            <Label for="role-desc" class="text-xs font-semibold">Description</Label>
            <Textarea
              id="role-desc"
              v-model="newRoleDescription"
              rows="2"
              placeholder="Explain the intended responsibility and scope for this role..."
              class="text-xs resize-none"
            />
          </div>

          <!-- Base Template Clone Selector -->
          <div class="space-y-1.5">
            <Label class="text-xs font-semibold">Initial Permissions Template</Label>
            <Select v-model="newRoleCloneId">
              <SelectTrigger class="h-9 text-xs w-full">
                <SelectValue placeholder="Select initial template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none" class="text-xs">
                  Basic Permissions (Default user read &amp; content read)
                </SelectItem>
                <SelectItem
                  v-for="role in roleStore.roles"
                  :key="role.id"
                  :value="role.id"
                  class="text-xs"
                >
                  Clone from: {{ role.name }} ({{ role.permissions.length }} scopes)
                </SelectItem>
              </SelectContent>
            </Select>
            <p class="text-[11px] text-muted-foreground">
              You can fine-tune specific checkbox permissions in the matrix table after creation.
            </p>
          </div>

          <DialogFooter class="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="text-xs"
              @click="roleStore.isCreateModalOpen = false"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              class="text-xs gap-1.5"
              :disabled="roleStore.isSaving"
            >
              <Check v-if="!roleStore.isSaving" class="h-3.5 w-3.5" />
              <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
              {{ roleStore.isSaving ? 'Creating...' : 'Create Role' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- DELETE ROLE SAFEGUARD MODAL                                           -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="roleStore.isDeleteModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <div class="flex items-center gap-2 text-destructive">
            <AlertTriangle class="h-5 w-5 text-destructive" />
            <DialogTitle class="text-base font-bold text-destructive">
              Delete Role "{{ roleStore.roleToDelete?.name }}"?
            </DialogTitle>
          </div>
          <DialogDescription class="text-xs mt-0.5">
            This action will permanently remove this role definition from the security matrix.
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-3 py-2 text-xs">
          <div class="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive space-y-1">
            <p class="font-semibold">Reassignment Notice:</p>
            <p class="text-[11px] text-destructive/90">
              Any users currently assigned to <strong class="font-bold">{{ roleStore.roleToDelete?.name }}</strong> ({{ roleStore.roleToDelete?.usersCount }} active users) will lose their custom privileges and fallback to default Viewer access.
            </p>
          </div>
        </div>

        <DialogFooter class="gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="text-xs"
            @click="roleStore.isDeleteModalOpen = false"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="roleStore.isSaving"
            @click="roleStore.executeDeleteRole"
          >
            <Trash2 v-if="!roleStore.isSaving" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            {{ roleStore.isSaving ? 'Deleting...' : 'Confirm Delete' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
