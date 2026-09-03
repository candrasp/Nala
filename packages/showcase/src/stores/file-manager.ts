import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  fileManagerService,
  type FileItem,
  type FileFolder,
  type FileType,
  type FileViewMode,
  type StorageStats,
} from '@/services/file-manager.service'
import { toast } from '@/components/ui/sonner'

export const FILE_TYPE_CATEGORIES: { value: FileType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Files' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
  { value: 'document', label: 'Documents' },
  { value: 'audio', label: 'Audio' },
  { value: 'archive', label: 'Archives' },
  { value: 'other', label: 'Other' },
]

export const useFileManagerStore = defineStore('file-manager', () => {
  // ─── Core State ────────────────────────────────────────────────────────────
  const folders = ref<FileFolder[]>([])
  const files = ref<FileItem[]>([])
  const storageStats = ref<StorageStats | null>(null)
  const isLoading = ref<boolean>(false)
  const isUploading = ref<boolean>(false)

  // Navigation breadcrumb
  const currentFolderId = ref<string | null>(null)
  const breadcrumb = ref<{ id: string | null; name: string }[]>([{ id: null, name: 'Root' }])

  // View & filter state
  const viewMode = ref<FileViewMode>('grid')
  const searchQuery = ref<string>('')
  const activeTypeFilter = ref<FileType | 'all'>('all')
  const selectedFiles = ref<Set<string>>(new Set())

  // Detail/preview drawer
  const previewFile = ref<FileItem | null>(null)
  const isPreviewOpen = ref<boolean>(false)

  // Upload drop zone modal
  const isUploadDialogOpen = ref<boolean>(false)
  const isDragOverDropzone = ref<boolean>(false)

  // ─── Computed ──────────────────────────────────────────────────────────────
  const currentFolderFiles = computed<FileItem[]>(() => {
    return files.value.filter(f => f.folderId === currentFolderId.value)
  })

  const filteredFiles = computed<FileItem[]>(() => {
    let result = currentFolderFiles.value

    // Type category filter
    if (activeTypeFilter.value !== 'all') {
      result = result.filter(f => f.type === activeTypeFilter.value)
    }

    // Search filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        f => f.name.toLowerCase().includes(q) || f.extension.toLowerCase().includes(q)
      )
    }

    return result
  })

  const totalFiles = computed(() => files.value.length)
  const totalFolders = computed(() => folders.value.length)
  const storagePercent = computed(() => {
    if (!storageStats.value) return 0
    return Math.min(
      100,
      Math.round((storageStats.value.usedBytes / storageStats.value.totalBytes) * 100)
    )
  })

  // ─── Actions ───────────────────────────────────────────────────────────────
  async function loadAll() {
    isLoading.value = true
    try {
      const [loadedFolders, loadedFiles, stats] = await Promise.all([
        fileManagerService.getFolders(),
        fileManagerService.getFiles(undefined),
        fileManagerService.getStorageStats(),
      ])
      folders.value = loadedFolders
      files.value = loadedFiles
      storageStats.value = stats
    } catch {
      toast.error('Failed to load files. Please refresh and try again.')
    } finally {
      isLoading.value = false
    }
  }

  function navigateToFolder(folder: FileFolder | null) {
    if (folder === null) {
      currentFolderId.value = null
      breadcrumb.value = [{ id: null, name: 'Root' }]
    } else {
      currentFolderId.value = folder.id
      // If already somewhere in breadcrumb, truncate to it
      const existingIndex = breadcrumb.value.findIndex(b => b.id === folder.id)
      if (existingIndex !== -1) {
        breadcrumb.value = breadcrumb.value.slice(0, existingIndex + 1)
      } else {
        breadcrumb.value.push({ id: folder.id, name: folder.name })
      }
    }
    // Clear search and filters when navigating
    searchQuery.value = ''
    activeTypeFilter.value = 'all'
    selectedFiles.value = new Set()
  }

  function navigateToBreadcrumb(entry: { id: string | null; name: string }) {
    if (entry.id === null) {
      navigateToFolder(null)
    } else {
      const folder = folders.value.find(f => f.id === entry.id)
      if (folder) navigateToFolder(folder)
    }
  }

  async function simulateUpload(fileNames: string[]) {
    isUploading.value = true
    try {
      const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']
      const videoExts = ['mp4', 'mov', 'avi', 'webm']
      const docExts = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'pptx']
      const archiveExts = ['zip', 'tar', 'gz', 'rar']

      for (const name of fileNames) {
        const ext = name.split('.').pop()?.toLowerCase() || 'bin'
        let type: FileType = 'other'
        if (imageExts.includes(ext)) type = 'image'
        else if (videoExts.includes(ext)) type = 'video'
        else if (docExts.includes(ext)) type = 'document'
        else if (archiveExts.includes(ext)) type = 'archive'

        const uploaded = await fileManagerService.uploadFile({
          name,
          type,
          extension: ext,
          size: Math.floor(100_000 + Math.random() * 5_000_000),
          folderId: currentFolderId.value,
        })
        files.value.unshift(uploaded)
      }

      toast.success(`${fileNames.length} file${fileNames.length > 1 ? 's' : ''} uploaded successfully!`)
      isUploadDialogOpen.value = false

      // Refresh storage stats
      storageStats.value = await fileManagerService.getStorageStats()
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      isUploading.value = false
    }
  }

  async function deleteFile(id: string) {
    try {
      await fileManagerService.deleteFile(id)
      files.value = files.value.filter(f => f.id !== id)
      selectedFiles.value.delete(id)
      if (previewFile.value?.id === id) {
        previewFile.value = null
        isPreviewOpen.value = false
      }
      toast.success('File deleted.')
    } catch {
      toast.error('Failed to delete file.')
    }
  }

  async function deleteSelected() {
    const ids = Array.from(selectedFiles.value)
    try {
      await Promise.all(ids.map(id => fileManagerService.deleteFile(id)))
      files.value = files.value.filter(f => !selectedFiles.value.has(f.id))
      selectedFiles.value = new Set()
      toast.success(`${ids.length} file${ids.length > 1 ? 's' : ''} deleted.`)
    } catch {
      toast.error('Failed to delete selected files.')
    }
  }

  async function createFolder(name: string) {
    try {
      const folder = await fileManagerService.createFolder(name, currentFolderId.value)
      folders.value.push(folder)
      toast.success(`Folder "${name}" created.`)
    } catch {
      toast.error('Failed to create folder.')
    }
  }

  function openPreview(file: FileItem) {
    previewFile.value = file
    isPreviewOpen.value = true
  }

  function toggleFileSelection(id: string) {
    if (selectedFiles.value.has(id)) {
      selectedFiles.value.delete(id)
    } else {
      selectedFiles.value.add(id)
    }
  }

  function clearSelection() {
    selectedFiles.value = new Set()
  }

  return {
    // State
    folders,
    files,
    storageStats,
    isLoading,
    isUploading,
    currentFolderId,
    breadcrumb,
    viewMode,
    searchQuery,
    activeTypeFilter,
    selectedFiles,
    previewFile,
    isPreviewOpen,
    isUploadDialogOpen,
    isDragOverDropzone,
    // Computed
    currentFolderFiles,
    filteredFiles,
    totalFiles,
    totalFolders,
    storagePercent,
    // Actions
    loadAll,
    navigateToFolder,
    navigateToBreadcrumb,
    simulateUpload,
    deleteFile,
    deleteSelected,
    createFolder,
    openPreview,
    toggleFileSelection,
    clearSelection,
    FILE_TYPE_CATEGORIES,
  }
})
