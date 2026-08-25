import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  roleService,
  type RoleItem,
  type PermissionModule,
  type CreateRolePayload,
  PERMISSION_MODULES,
} from '@/services/role.service'
import { toast } from '@/components/ui/sonner'

export const useRoleStore = defineStore('role', () => {
  const roles = ref<RoleItem[]>([])
  const originalRoles = ref<RoleItem[]>([])
  const modules = ref<PermissionModule[]>(PERMISSION_MODULES)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const searchQuery = ref<string>('')

  // Modal Dialog states
  const isCreateModalOpen = ref<boolean>(false)
  const isDeleteModalOpen = ref<boolean>(false)
  const roleToDelete = ref<RoleItem | null>(null)

  // ─── Computed Getters ────────────────────────────────────────────────────────

  const hasUnsavedChanges = computed<boolean>(() => {
    return JSON.stringify(roles.value) !== JSON.stringify(originalRoles.value)
  })

  const totalPermissionsCount = computed<number>(() => {
    return modules.value.reduce((acc, m) => acc + m.permissions.length, 0)
  })

  const filteredModules = computed<PermissionModule[]>(() => {
    if (!searchQuery.value.trim()) return modules.value

    const q = searchQuery.value.toLowerCase()
    return modules.value
      .map((mod) => {
        const matchesModName = mod.name.toLowerCase().includes(q)
        const matchingPerms = mod.permissions.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
        )

        if (matchesModName) return mod
        if (matchingPerms.length > 0) {
          return {
            ...mod,
            permissions: matchingPerms,
          }
        }
        return null
      })
      .filter((m): m is PermissionModule => m !== null)
  })

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async function loadData() {
    isLoading.value = true
    try {
      const [fetchedRoles, fetchedModules] = await Promise.all([
        roleService.getRoles(),
        roleService.getPermissionModules(),
      ])
      roles.value = JSON.parse(JSON.stringify(fetchedRoles))
      originalRoles.value = JSON.parse(JSON.stringify(fetchedRoles))
      modules.value = fetchedModules
    } catch {
      toast.error('Failed to load RBAC roles and permissions.')
    } finally {
      isLoading.value = false
    }
  }

  function hasPermission(roleId: string, permissionId: string): boolean {
    const role = roles.value.find((r) => r.id === roleId)
    return role ? role.permissions.includes(permissionId) : false
  }

  function togglePermission(roleId: string, permissionId: string) {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    if (role.isSystem && role.slug === 'admin') {
      toast.info('Super Administrator role possesses all permissions by default.')
      return
    }

    const idx = role.permissions.indexOf(permissionId)
    if (idx > -1) {
      role.permissions.splice(idx, 1)
    } else {
      role.permissions.push(permissionId)
    }
  }

  function isModuleFullySelected(roleId: string, moduleId: string): boolean {
    const role = roles.value.find((r) => r.id === roleId)
    const mod = modules.value.find((m) => m.id === moduleId)
    if (!role || !mod || mod.permissions.length === 0) return false
    return mod.permissions.every((p) => role.permissions.includes(p.id))
  }

  function isModulePartiallySelected(roleId: string, moduleId: string): boolean {
    const role = roles.value.find((r) => r.id === roleId)
    const mod = modules.value.find((m) => m.id === moduleId)
    if (!role || !mod || mod.permissions.length === 0) return false
    const count = mod.permissions.filter((p) => role.permissions.includes(p.id)).length
    return count > 0 && count < mod.permissions.length
  }

  function toggleModuleForRole(roleId: string, moduleId: string) {
    const role = roles.value.find((r) => r.id === roleId)
    const mod = modules.value.find((m) => m.id === moduleId)
    if (!role || !mod) return
    if (role.isSystem && role.slug === 'admin') return

    const isFullySelected = isModuleFullySelected(roleId, moduleId)
    const modPermIds = mod.permissions.map((p) => p.id)

    if (isFullySelected) {
      // Remove all module permissions
      role.permissions = role.permissions.filter((id) => !modPermIds.includes(id))
    } else {
      // Add missing module permissions
      const toAdd = modPermIds.filter((id) => !role.permissions.includes(id))
      role.permissions.push(...toAdd)
    }
  }

  function isRoleFullyGranted(roleId: string): boolean {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return false
    const allIds = modules.value.flatMap((m) => m.permissions.map((p) => p.id))
    return allIds.length > 0 && allIds.every((id) => role.permissions.includes(id))
  }

  function toggleAllForRole(roleId: string) {
    const role = roles.value.find((r) => r.id === roleId)
    if (!role) return
    if (role.isSystem && role.slug === 'admin') return

    const allIds = modules.value.flatMap((m) => m.permissions.map((p) => p.id))
    if (isRoleFullyGranted(roleId)) {
      role.permissions = []
    } else {
      role.permissions = [...allIds]
    }
  }

  async function saveMatrixChanges() {
    if (!hasUnsavedChanges.value) return
    isSaving.value = true
    try {
      const updated = await roleService.updateRolesMatrix(roles.value)
      roles.value = JSON.parse(JSON.stringify(updated))
      originalRoles.value = JSON.parse(JSON.stringify(updated))
      toast.success('Roles and permissions matrix saved successfully!')
    } catch {
      toast.error('Failed to save matrix changes.')
    } finally {
      isSaving.value = false
    }
  }

  function resetChanges() {
    roles.value = JSON.parse(JSON.stringify(originalRoles.value))
    toast.info('Reverted uncommitted matrix modifications.')
  }

  async function createRole(payload: CreateRolePayload): Promise<boolean> {
    isSaving.value = true
    try {
      const newRole = await roleService.createRole(payload)
      roles.value.push(newRole)
      originalRoles.value.push(JSON.parse(JSON.stringify(newRole)))
      isCreateModalOpen.value = false
      toast.success(`Role "${newRole.name}" created successfully!`)
      return true
    } catch {
      toast.error('Failed to create role.')
      return false
    } finally {
      isSaving.value = false
    }
  }

  function confirmDeleteRole(role: RoleItem) {
    if (role.isSystem) {
      toast.error(`System role "${role.name}" cannot be deleted.`)
      return
    }
    roleToDelete.value = role
    isDeleteModalOpen.value = true
  }

  async function executeDeleteRole(): Promise<boolean> {
    if (!roleToDelete.value) return false
    const id = roleToDelete.value.id
    const roleName = roleToDelete.value.name
    isSaving.value = true
    try {
      await roleService.deleteRole(id)
      roles.value = roles.value.filter((r) => r.id !== id)
      originalRoles.value = originalRoles.value.filter((r) => r.id !== id)
      isDeleteModalOpen.value = false
      roleToDelete.value = null
      toast.success(`Role "${roleName}" has been deleted.`)
      return true
    } catch {
      toast.error(`Failed to delete role "${roleName}".`)
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    roles,
    originalRoles,
    modules,
    isLoading,
    isSaving,
    searchQuery,
    isCreateModalOpen,
    isDeleteModalOpen,
    roleToDelete,
    hasUnsavedChanges,
    totalPermissionsCount,
    filteredModules,
    loadData,
    hasPermission,
    togglePermission,
    isModuleFullySelected,
    isModulePartiallySelected,
    toggleModuleForRole,
    isRoleFullyGranted,
    toggleAllForRole,
    saveMatrixChanges,
    resetChanges,
    createRole,
    confirmDeleteRole,
    executeDeleteRole,
  }
})
