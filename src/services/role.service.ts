import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export interface PermissionItem {
  id: string
  name: string
  description: string
  level: 'read' | 'write' | 'admin' | 'delete'
}

export interface PermissionModule {
  id: string
  name: string
  description: string
  permissions: PermissionItem[]
}

export interface RoleItem {
  id: string
  name: string
  slug: string
  description: string
  isSystem: boolean
  color: string
  usersCount: number
  permissions: string[]
  updatedAt: string
}

export interface CreateRolePayload {
  name: string
  slug: string
  description: string
  cloneRoleId?: string
}

// ─── Default Permission Modules Definition ─────────────────────────────────────
export const PERMISSION_MODULES: PermissionModule[] = [
  {
    id: 'users',
    name: 'Users & Team Access',
    description: 'Control user directory access, invites, password resets, and session revocations.',
    permissions: [
      { id: 'users.read', name: 'View Users Directory', description: 'Browse team members, roles, and presence statuses', level: 'read' },
      { id: 'users.create', name: 'Invite New Users', description: 'Send invitation links and assign initial roles', level: 'write' },
      { id: 'users.update', name: 'Edit User Profiles', description: 'Modify name, job title, and team assignments', level: 'write' },
      { id: 'users.delete', name: 'Suspend & Delete Users', description: 'Revoke access and delete accounts permanently', level: 'delete' },
    ],
  },
  {
    id: 'roles',
    name: 'Roles & Permissions (RBAC)',
    description: 'Manage security policies, custom roles, and fine-grained access matrices.',
    permissions: [
      { id: 'roles.read', name: 'View Roles & Matrix', description: 'View current role definitions and permission grid', level: 'read' },
      { id: 'roles.manage', name: 'Create & Modify Roles', description: 'Create custom roles and adjust permission matrices', level: 'admin' },
      { id: 'roles.delete', name: 'Delete Custom Roles', description: 'Remove non-system roles and reassign users', level: 'delete' },
    ],
  },
  {
    id: 'content',
    name: 'Content & Resources',
    description: 'Create, publish, edit, and organize workspace content and documents.',
    permissions: [
      { id: 'content.read', name: 'View Resources & Documents', description: 'Read-only access to published documents', level: 'read' },
      { id: 'content.create', name: 'Author New Content', description: 'Draft new resources, articles, and pages', level: 'write' },
      { id: 'content.publish', name: 'Publish & Deploy Content', description: 'Push drafts to production live environments', level: 'admin' },
      { id: 'content.delete', name: 'Purge Content Archive', description: 'Permanently remove archived pages and documents', level: 'delete' },
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Subscriptions',
    description: 'View invoices, update payment methods, and manage subscription tiers.',
    permissions: [
      { id: 'billing.read', name: 'View Invoices & Receipts', description: 'Download PDF transaction receipts and invoice history', level: 'read' },
      { id: 'billing.manage', name: 'Manage Payment Methods', description: 'Update credit cards, bank accounts, and billing addresses', level: 'admin' },
      { id: 'billing.upgrade', name: 'Change Plan / Upgrade Seats', description: 'Modify active subscription tiers and seat capacities', level: 'admin' },
    ],
  },
  {
    id: 'api',
    name: 'API Keys & Developer Tools',
    description: 'Generate secret tokens, configure webhooks, and inspect rate limits.',
    permissions: [
      { id: 'api.read', name: 'View API Keys & Telemetry', description: 'Inspect token prefixes, rate limits, and request logs', level: 'read' },
      { id: 'api.generate', name: 'Generate Secret API Keys', description: 'Create new scoped API tokens with mutation permissions', level: 'admin' },
      { id: 'api.revoke', name: 'Revoke API Keys & Webhooks', description: 'Immediately invalidate active developer tokens', level: 'delete' },
    ],
  },
  {
    id: 'audit',
    name: 'Audit Trail & System Logs',
    description: 'Inspect security events, administrative actions, and compliance logs.',
    permissions: [
      { id: 'audit.read', name: 'Inspect Audit Logs', description: 'Search and view administrative activity logs and IPs', level: 'read' },
      { id: 'audit.export', name: 'Export Audit Archives', description: 'Download compliance logs as CSV or JSON format', level: 'admin' },
    ],
  },
]

// ─── Initial Roles Dataset ─────────────────────────────────────────────────────
const ALL_PERMISSIONS = PERMISSION_MODULES.flatMap((m) => m.permissions.map((p) => p.id))

const mockRoles: RoleItem[] = [
  {
    id: 'role-admin',
    name: 'Administrator',
    slug: 'admin',
    description: 'Full unrestricted superuser access across all modules, billing, and security settings.',
    isSystem: true,
    color: 'emerald',
    usersCount: 2,
    permissions: [...ALL_PERMISSIONS],
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'role-dev',
    name: 'Developer',
    slug: 'developer',
    description: 'Access to API keys, webhooks, system logs, and document authoring tools.',
    isSystem: false,
    color: 'blue',
    usersCount: 8,
    permissions: [
      'users.read',
      'roles.read',
      'content.read',
      'content.create',
      'content.publish',
      'api.read',
      'api.generate',
      'audit.read',
    ],
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'role-editor',
    name: 'Content Manager',
    slug: 'editor',
    description: 'Can draft, edit, and publish content and manage user profile records.',
    isSystem: false,
    color: 'purple',
    usersCount: 4,
    permissions: [
      'users.read',
      'users.create',
      'content.read',
      'content.create',
      'content.publish',
    ],
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'role-viewer',
    name: 'Viewer / Auditor',
    slug: 'viewer',
    description: 'Read-only access across user directories, billing receipts, and audit logs.',
    isSystem: false,
    color: 'zinc',
    usersCount: 14,
    permissions: [
      'users.read',
      'roles.read',
      'content.read',
      'billing.read',
      'api.read',
      'audit.read',
    ],
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const roleService = {
  /**
   * Fetch all roles
   */
  async getRoles(): Promise<RoleItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<RoleItem[]> | RoleItem[]>('/roles')
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        return JSON.parse(JSON.stringify(mockRoles))
      }
      throw error
    }
  },

  /**
   * Fetch permission modules catalog
   */
  async getPermissionModules(): Promise<PermissionModule[]> {
    try {
      const res = await apiClient.get<ApiResponse<PermissionModule[]> | PermissionModule[]>('/permissions/modules')
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        return PERMISSION_MODULES
      }
      throw error
    }
  },

  /**
   * Save whole RBAC matrix updates
   */
  async updateRolesMatrix(roles: RoleItem[]): Promise<RoleItem[]> {
    try {
      const res = await apiClient.put<ApiResponse<RoleItem[]> | RoleItem[]>('/roles/matrix', { roles })
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        mockRoles.length = 0
        mockRoles.push(...JSON.parse(JSON.stringify(roles)))
        return [...mockRoles]
      }
      throw error
    }
  },

  /**
   * Create new custom role
   */
  async createRole(payload: CreateRolePayload): Promise<RoleItem> {
    try {
      const res = await apiClient.post<RoleItem>('/roles', payload)
      return res
    } catch (error) {
      if (import.meta.env.DEV) {
        let initialPermissions: string[] = ['users.read', 'content.read']
        if (payload.cloneRoleId) {
          const baseRole = mockRoles.find((r) => r.id === payload.cloneRoleId)
          if (baseRole) initialPermissions = [...baseRole.permissions]
        }

        const newRole: RoleItem = {
          id: `role-${Date.now()}`,
          name: payload.name,
          slug: payload.slug.toLowerCase().replace(/\s+/g, '-'),
          description: payload.description,
          isSystem: false,
          color: 'amber',
          usersCount: 0,
          permissions: initialPermissions,
          updatedAt: new Date().toISOString(),
        }
        mockRoles.push(newRole)
        return newRole
      }
      throw error
    }
  },

  /**
   * Delete custom role
   */
  async deleteRole(id: string): Promise<void> {
    try {
      await apiClient.delete(`/roles/${id}`)
    } catch (error) {
      if (import.meta.env.DEV) {
        const index = mockRoles.findIndex((r) => r.id === id)
        if (index !== -1 && !mockRoles[index].isSystem) {
          mockRoles.splice(index, 1)
        }
        return
      }
      throw error
    }
  },
}
