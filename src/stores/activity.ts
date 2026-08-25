import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  activityService,
  type ActivityLogItem,
} from '@/services/activity.service'
import { toast } from '@/components/ui/sonner'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref<ActivityLogItem[]>([])
  const isLoading = ref<boolean>(false)

  // Filter & Search state
  const searchQuery = ref<string>('')
  const selectedCategory = ref<string>('all')
  const selectedStatus = ref<string>('all')
  const selectedTimeRange = ref<string>('all')

  // Pagination state
  const currentPage = ref<number>(1)
  const itemsPerPage = ref<number>(10)

  // Inspector dialog modal state
  const selectedActivity = ref<ActivityLogItem | null>(null)
  const isDetailOpen = ref<boolean>(false)

  // ─── Computed Stats ──────────────────────────────────────────────────────────
  const totalCount = computed(() => activities.value.length)
  const successCount = computed(() => activities.value.filter((a) => a.status === 'success').length)
  const warningCount = computed(() => activities.value.filter((a) => a.status === 'warning' || a.status === 'failed').length)
  const activeOperatorsCount = computed(() => {
    const operatorSet = new Set(activities.value.map((a) => a.actor.email))
    return operatorSet.size
  })
  const successRate = computed(() => {
    if (totalCount.value === 0) return '100%'
    return `${Math.round((successCount.value / totalCount.value) * 100)}%`
  })

  // ─── Filtered Activities ─────────────────────────────────────────────────────
  const filteredActivities = computed<ActivityLogItem[]>(() => {
    const now = Date.now()

    return activities.value.filter((item) => {
      // 1. Category Filter
      if (selectedCategory.value !== 'all' && item.category !== selectedCategory.value) {
        return false
      }

      // 2. Status Filter
      if (selectedStatus.value !== 'all' && item.status !== selectedStatus.value) {
        return false
      }

      // 3. Time Range Filter
      if (selectedTimeRange.value !== 'all') {
        const itemTime = new Date(item.createdAt).getTime()
        const diffHours = (now - itemTime) / (1000 * 60 * 60)
        if (selectedTimeRange.value === 'today' && diffHours > 24) return false
        if (selectedTimeRange.value === '7d' && diffHours > 24 * 7) return false
        if (selectedTimeRange.value === '30d' && diffHours > 24 * 30) return false
      }

      // 4. Keyword Search Query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesAction = item.action.toLowerCase().includes(query)
        const matchesActor = item.actor.name.toLowerCase().includes(query) || item.actor.email.toLowerCase().includes(query)
        const matchesIp = item.ipAddress.toLowerCase().includes(query)
        const matchesLocation = item.location.toLowerCase().includes(query)
        const matchesTarget = item.target ? item.target.toLowerCase().includes(query) : false
        return matchesTitle || matchesDesc || matchesAction || matchesActor || matchesIp || matchesLocation || matchesTarget
      }

      return true
    })
  })

  // ─── Paginated Activities ────────────────────────────────────────────────────
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredActivities.value.length / itemsPerPage.value))
  })

  const paginatedActivities = computed<ActivityLogItem[]>(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredActivities.value.slice(start, end)
  })

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async function loadActivities() {
    isLoading.value = true
    try {
      activities.value = await activityService.getActivities()
    } catch {
      toast.error('Failed to load audit logs.')
    } finally {
      isLoading.value = false
    }
  }

  function inspectActivity(activity: ActivityLogItem) {
    selectedActivity.value = activity
    isDetailOpen.value = true
  }

  function resetFilters() {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    selectedStatus.value = 'all'
    selectedTimeRange.value = 'all'
    currentPage.value = 1
    toast.info('Audit filters reset.')
  }

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  async function exportLogs(format: 'json' | 'csv' = 'json') {
    try {
      const content = await activityService.exportActivities(format)
      const mimeType = format === 'csv' ? 'text/csv' : 'application/json'
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `nala-activity-audit-${Date.now()}.${format}`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(`Exported ${filteredActivities.value.length} activity record(s) as ${format.toUpperCase()}.`)
    } catch {
      toast.error('Failed to generate export file.')
    }
  }

  return {
    activities,
    isLoading,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedTimeRange,
    currentPage,
    itemsPerPage,
    selectedActivity,
    isDetailOpen,
    totalCount,
    successCount,
    warningCount,
    activeOperatorsCount,
    successRate,
    filteredActivities,
    paginatedActivities,
    totalPages,
    loadActivities,
    inspectActivity,
    resetFilters,
    setPage,
    exportLogs,
  }
})
