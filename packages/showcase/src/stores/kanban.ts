import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  kanbanService,
  type KanbanTaskItem,
  type KanbanColumnId,
  type CreateTaskPayload,
  type KanbanAssignee,
} from '@/services/kanban.service'
import { toast } from '@/components/ui/sonner'

export interface KanbanColumn {
  id: KanbanColumnId
  title: string
  color: string
  description: string
}

export const COLUMNS: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'border-slate-500/40 bg-slate-500/10 text-slate-700 dark:text-slate-300',
    description: 'Upcoming ideas, features & requirements',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    description: 'Tasks actively being worked on',
  },
  {
    id: 'in_review',
    title: 'In Review',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    description: 'Pull requests, QA & design feedback',
  },
  {
    id: 'done',
    title: 'Done',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    description: 'Verified, tested & merged tasks',
  },
]

export const TEAM_MEMBERS: KanbanAssignee[] = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@nala.dev',
    avatar: '/img/avatar.webp',
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@nala.dev',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    email: 'marcus.v@nala.dev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@nala.dev',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&auto=format&fit=crop&q=80',
  },
]

export const useKanbanStore = defineStore('kanban', () => {
  const tasks = ref<KanbanTaskItem[]>([])
  const isLoading = ref<boolean>(false)

  // Filters
  const searchQuery = ref<string>('')
  const priorityFilter = ref<string>('all')
  const assigneeFilter = ref<string>('all')

  // Selected task for edit/detail
  const editingTask = ref<KanbanTaskItem | null>(null)
  const isFormDialogOpen = ref<boolean>(false)
  const targetColumnForNew = ref<KanbanColumnId>('backlog')

  // Drag state
  const draggedTaskId = ref<string | null>(null)

  // ─── Computed ──────────────────────────────────────────────────────────────
  const totalTasks = computed(() => tasks.value.length)
  const completedTasks = computed(() => tasks.value.filter(t => t.columnId === 'done').length)
  const inProgressTasks = computed(() => tasks.value.filter(t => t.columnId === 'in_progress').length)
  const urgentTasks = computed(() => tasks.value.filter(t => t.priority === 'urgent' && t.columnId !== 'done').length)

  const completionRate = computed(() => {
    if (totalTasks.value === 0) return 0
    return Math.round((completedTasks.value / totalTasks.value) * 100)
  })

  // Filtered tasks by query, priority, and assignee
  const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
      // 1. Search Query
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase()
        const matchesTitle = task.title.toLowerCase().includes(q)
        const matchesDesc = task.description.toLowerCase().includes(q)
        const matchesTags = task.tags.some(t => t.toLowerCase().includes(q))
        const matchesAssignee = task.assignee.name.toLowerCase().includes(q)
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesAssignee) {
          return false
        }
      }

      // 2. Priority Filter
      if (priorityFilter.value !== 'all' && task.priority !== priorityFilter.value) {
        return false
      }

      // 3. Assignee Filter
      if (assigneeFilter.value !== 'all' && task.assignee.id !== assigneeFilter.value) {
        return false
      }

      return true
    })
  })

  // Grouped tasks per column
  const tasksByColumn = computed(() => {
    const grouped: Record<KanbanColumnId, KanbanTaskItem[]> = {
      backlog: [],
      in_progress: [],
      in_review: [],
      done: [],
    }

    filteredTasks.value.forEach((task) => {
      if (grouped[task.columnId]) {
        grouped[task.columnId].push(task)
      }
    })

    // Sort within column by order or priority
    Object.keys(grouped).forEach((colKey) => {
      grouped[colKey as KanbanColumnId].sort((a, b) => (a.order || 0) - (b.order || 0))
    })

    return grouped
  })

  // ─── Actions ───────────────────────────────────────────────────────────────
  async function loadTasks() {
    isLoading.value = true
    try {
      tasks.value = await kanbanService.getTasks()
    } catch {
      toast.error('Failed to load Kanban tasks.')
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(payload: CreateTaskPayload) {
    try {
      const created = await kanbanService.createTask(payload)
      tasks.value.unshift(created)
      toast.success(`Task "${created.title}" created successfully!`)
      return true
    } catch {
      toast.error('Failed to create task.')
      return false
    }
  }

  async function updateTask(id: string, payload: Partial<KanbanTaskItem>) {
    try {
      const updated = await kanbanService.updateTask(id, payload)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updated }
      }
      toast.success('Task updated.')
      return true
    } catch {
      toast.error('Failed to update task.')
      return false
    }
  }

  async function moveTask(id: string, newColumnId: KanbanColumnId) {
    const task = tasks.value.find(t => t.id === id)
    if (!task || task.columnId === newColumnId) return

    const previousColumn = task.columnId
    // Optimistic UI update
    task.columnId = newColumnId

    try {
      await kanbanService.moveTask(id, newColumnId)
      const colTitle = COLUMNS.find(c => c.id === newColumnId)?.title || newColumnId
      toast.success(`Moved to ${colTitle}`)
    } catch {
      task.columnId = previousColumn
      toast.error('Failed to move task.')
    }
  }

  async function deleteTask(id: string) {
    try {
      await kanbanService.deleteTask(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
      toast.success('Task deleted.')
      return true
    } catch {
      toast.error('Failed to delete task.')
      return false
    }
  }

  function openCreateModal(columnId: KanbanColumnId = 'backlog') {
    editingTask.value = null
    targetColumnForNew.value = columnId
    isFormDialogOpen.value = true
  }

  function openEditModal(task: KanbanTaskItem) {
    editingTask.value = { ...task }
    targetColumnForNew.value = task.columnId
    isFormDialogOpen.value = true
  }

  return {
    tasks,
    isLoading,
    searchQuery,
    priorityFilter,
    assigneeFilter,
    editingTask,
    isFormDialogOpen,
    targetColumnForNew,
    draggedTaskId,
    columns: COLUMNS,
    teamMembers: TEAM_MEMBERS,
    totalTasks,
    completedTasks,
    inProgressTasks,
    urgentTasks,
    completionRate,
    filteredTasks,
    tasksByColumn,
    loadTasks,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
    openCreateModal,
    openEditModal,
  }
})
