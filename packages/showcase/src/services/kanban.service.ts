import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type KanbanColumnId = 'backlog' | 'in_progress' | 'in_review' | 'done'
export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanAssignee {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface KanbanTaskItem {
  id: string
  title: string
  description: string
  columnId: KanbanColumnId
  priority: KanbanPriority
  assignee: KanbanAssignee
  tags: string[]
  dueDate: string
  estimatedHours?: number
  completedSubtasks?: number
  totalSubtasks?: number
  createdAt: string
  order: number
}

export interface CreateTaskPayload {
  title: string
  description: string
  columnId: KanbanColumnId
  priority: KanbanPriority
  assignee: KanbanAssignee
  tags: string[]
  dueDate: string
  estimatedHours?: number
  totalSubtasks?: number
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  id: string
  completedSubtasks?: number
  order?: number
}

// In-memory mock tasks database for DEV mode
const mockTasks: KanbanTaskItem[] = [
  {
    id: 'TSK-101',
    title: 'Migrate Tailwind CSS v3 to v4 Theme Engine',
    description: 'Update root styling to use native OKLCH CSS variables, remove tailwind.config.js, and verify gradients.',
    columnId: 'done',
    priority: 'high',
    assignee: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
    },
    tags: ['Frontend', 'CSS', 'Refactor'],
    dueDate: '2026-08-28',
    estimatedHours: 16,
    completedSubtasks: 6,
    totalSubtasks: 6,
    createdAt: '2026-08-20T08:00:00Z',
    order: 1,
  },
  {
    id: 'TSK-102',
    title: 'Design Reka UI ContextMenu & Toggle Primitives',
    description: 'Implement accessible right-click popup menus and segmented toggle button groups with keyboard navigation.',
    columnId: 'done',
    priority: 'medium',
    assignee: {
      id: 'usr-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['UI', 'RekaUI', 'Accessibility'],
    dueDate: '2026-08-30',
    estimatedHours: 8,
    completedSubtasks: 4,
    totalSubtasks: 4,
    createdAt: '2026-08-22T09:30:00Z',
    order: 2,
  },
  {
    id: 'TSK-103',
    title: 'Enterprise RBAC Matrix & Permission Checkboxes',
    description: 'Build responsive grid view with role switching, bulk toggle actions, and instant local storage caching.',
    columnId: 'in_review',
    priority: 'urgent',
    assignee: {
      id: 'usr-3',
      name: 'Marcus Vance',
      email: 'marcus.v@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['Security', 'RBAC', 'Backend'],
    dueDate: '2026-09-05',
    estimatedHours: 12,
    completedSubtasks: 5,
    totalSubtasks: 6,
    createdAt: '2026-08-26T11:15:00Z',
    order: 1,
  },
  {
    id: 'TSK-104',
    title: 'Implement Printable Invoice Template with PDF Download',
    description: 'Clean invoice layout with printable styling, line-item taxes, and company branding header.',
    columnId: 'in_review',
    priority: 'high',
    assignee: {
      id: 'usr-4',
      name: 'Elena Rostova',
      email: 'elena.r@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['Billing', 'Print', 'Feature'],
    dueDate: '2026-09-08',
    estimatedHours: 10,
    completedSubtasks: 3,
    totalSubtasks: 4,
    createdAt: '2026-08-28T14:20:00Z',
    order: 2,
  },
  {
    id: 'TSK-105',
    title: 'Implement Drag-and-Drop Task Card Reordering',
    description: 'Add fluid HTML5 drag events to move cards between columns and persist priority ranking.',
    columnId: 'in_progress',
    priority: 'urgent',
    assignee: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
    },
    tags: ['Interactive', 'Kanban', 'UX'],
    dueDate: '2026-09-10',
    estimatedHours: 14,
    completedSubtasks: 3,
    totalSubtasks: 5,
    createdAt: '2026-09-01T07:45:00Z',
    order: 1,
  },
  {
    id: 'TSK-106',
    title: 'Global Keyboard Shortcuts Modal Helper (?)',
    description: 'Listen to question mark hotkey to reveal interactive cheat sheet for all navigation commands.',
    columnId: 'in_progress',
    priority: 'medium',
    assignee: {
      id: 'usr-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['Accessibility', 'Shortcuts'],
    dueDate: '2026-09-12',
    estimatedHours: 6,
    completedSubtasks: 2,
    totalSubtasks: 3,
    createdAt: '2026-09-02T10:00:00Z',
    order: 2,
  },
  {
    id: 'TSK-107',
    title: 'Multi-Language Selector Dropdown in Navbar',
    description: 'Add language switcher with national flags, active check indicators, and Intl locale sync.',
    columnId: 'backlog',
    priority: 'low',
    assignee: {
      id: 'usr-4',
      name: 'Elena Rostova',
      email: 'elena.r@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['i18n', 'Navbar'],
    dueDate: '2026-09-18',
    estimatedHours: 4,
    completedSubtasks: 0,
    totalSubtasks: 2,
    createdAt: '2026-09-02T16:30:00Z',
    order: 1,
  },
  {
    id: 'TSK-108',
    title: 'File Manager & Media Library App Preset',
    description: 'Build folder breadcrumb tree, grid/list view mode, storage meter, and upload dropzone.',
    columnId: 'backlog',
    priority: 'high',
    assignee: {
      id: 'usr-3',
      name: 'Marcus Vance',
      email: 'marcus.v@nala.dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
    },
    tags: ['Media', 'Storage', 'App'],
    dueDate: '2026-09-25',
    estimatedHours: 20,
    completedSubtasks: 0,
    totalSubtasks: 8,
    createdAt: '2026-09-03T09:00:00Z',
    order: 2,
  },
]

export const kanbanService = {
  async getTasks(): Promise<KanbanTaskItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<KanbanTaskItem[]> | KanbanTaskItem[]>('/apps/kanban/tasks')
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        return [...mockTasks]
      }
      throw error
    }
  },

  async createTask(payload: CreateTaskPayload): Promise<KanbanTaskItem> {
    try {
      return await apiClient.post<KanbanTaskItem>('/apps/kanban/tasks', payload)
    } catch (error) {
      if (import.meta.env.DEV) {
        const newTask: KanbanTaskItem = {
          id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
          ...payload,
          completedSubtasks: 0,
          totalSubtasks: payload.totalSubtasks || 3,
          createdAt: new Date().toISOString(),
          order: mockTasks.filter(t => t.columnId === payload.columnId).length + 1,
        }
        mockTasks.unshift(newTask)
        return newTask
      }
      throw error
    }
  },

  async updateTask(id: string, payload: Partial<KanbanTaskItem>): Promise<KanbanTaskItem> {
    try {
      return await apiClient.patch<KanbanTaskItem>(`/apps/kanban/tasks/${id}`, payload)
    } catch (error) {
      if (import.meta.env.DEV) {
        const index = mockTasks.findIndex(t => t.id === id)
        if (index !== -1) {
          mockTasks[index] = { ...mockTasks[index], ...payload }
          return mockTasks[index]
        }
        throw new Error('Task not found')
      }
      throw error
    }
  },

  async moveTask(id: string, newColumnId: KanbanColumnId, newOrder?: number): Promise<KanbanTaskItem> {
    try {
      return await apiClient.post<KanbanTaskItem>(`/apps/kanban/tasks/${id}/move`, { columnId: newColumnId, order: newOrder })
    } catch (error) {
      if (import.meta.env.DEV) {
        const task = mockTasks.find(t => t.id === id)
        if (task) {
          task.columnId = newColumnId
          if (newOrder !== undefined) task.order = newOrder
          return task
        }
        throw new Error('Task not found')
      }
      throw error
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await apiClient.delete(`/apps/kanban/tasks/${id}`)
    } catch (error) {
      if (import.meta.env.DEV) {
        const index = mockTasks.findIndex(t => t.id === id)
        if (index !== -1) {
          mockTasks.splice(index, 1)
          return
        }
        throw new Error('Task not found')
      }
      throw error
    }
  },
}
