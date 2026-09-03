<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Search,
  LayoutGrid,
  List,
  Upload,
  FolderPlus,
  Trash2,
  HardDrive,
  ImageIcon,
  Video,
  FileText,
  Archive,
  ChevronRight,
  Home,
  SlidersHorizontal,
  X,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import FileGrid from './components/FileGrid.vue'
import FileList from './components/FileList.vue'
import FilePreviewDrawer from './components/FilePreviewDrawer.vue'
import UploadDropzone from './components/UploadDropzone.vue'
import { useFileManagerStore } from '@/stores/file-manager'
import type { FileType } from '@/services/file-manager.service'

const store = useFileManagerStore()

onMounted(() => {
  store.loadAll()
})

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const typeFilters: { label: string; value: FileType | 'all'; icon: any; colorClass: string }[] = [
  { label: 'All Files', value: 'all', icon: SlidersHorizontal, colorClass: 'text-foreground' },
  { label: 'Images', value: 'image', icon: ImageIcon, colorClass: 'text-violet-500' },
  { label: 'Videos', value: 'video', icon: Video, colorClass: 'text-blue-500' },
  { label: 'Documents', value: 'document', icon: FileText, colorClass: 'text-amber-500' },
  { label: 'Archives', value: 'archive', icon: Archive, colorClass: 'text-rose-500' },
]
</script>

<template>
  <div class="space-y-6 w-full max-w-screen-2xl mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="File Manager"
      description="Manage, organize, and preview your media library, documents, and assets with a drag-and-drop upload experience."
      badge="Enterprise App"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            class="gap-1.5 h-8 text-xs cursor-pointer"
            @click="store.isUploadDialogOpen = true"
          >
            <FolderPlus class="h-3.5 w-3.5" />
            <span class="hidden sm:inline">New Folder</span>
          </Button>
          <Button
            size="sm"
            class="gap-1.5 h-8 text-xs cursor-pointer shadow-xs"
            @click="store.isUploadDialogOpen = true"
          >
            <Upload class="h-3.5 w-3.5" />
            <span>Upload Files</span>
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- Main Layout: Sidebar + Content -->
    <div class="flex flex-col xl:flex-row gap-5">

      <!-- ── Left Sidebar ─────────────────────────────── -->
      <aside class="xl:w-64 shrink-0 space-y-4">

        <!-- Storage Capacity Widget -->
        <Card flush class="border-border/80 bg-card shadow-xs">
          <CardContent class="p-4 space-y-3">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <HardDrive class="h-4 w-4 text-primary" />
              </div>
              <div class="min-w-0">
                <p class="text-xs font-semibold text-foreground">Storage</p>
                <p class="text-[11px] text-muted-foreground">
                  {{ store.storageStats ? formatBytes(store.storageStats.usedBytes) : '–' }} of
                  {{ store.storageStats ? formatBytes(store.storageStats.totalBytes) : '–' }} used
                </p>
              </div>
            </div>
            <Progress :model-value="store.storagePercent" class="h-1.5" />
            <div class="flex items-center justify-between text-[10px] text-muted-foreground">
              <span class="font-mono">{{ store.storagePercent }}% used</span>
              <span>{{ store.storageStats ? formatBytes(store.storageStats.totalBytes - store.storageStats.usedBytes) : '–' }} free</span>
            </div>

            <!-- Storage Breakdown by type -->
            <div v-if="store.storageStats" class="space-y-1.5 pt-1 border-t border-border/60">
              <div v-for="ft in typeFilters.slice(1)" :key="ft.value" class="flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-1.5">
                  <component :is="ft.icon" class="h-3 w-3 shrink-0" :class="ft.colorClass" />
                  <span class="text-muted-foreground">{{ ft.label }}</span>
                </div>
                <span class="font-mono text-foreground/80 text-[10.5px]">
                  {{ formatBytes(store.storageStats.byType[ft.value as FileType] || 0) }}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Folder Tree -->
        <Card flush class="border-border/80 bg-card shadow-xs">
          <CardContent class="p-3 space-y-0.5">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-1.5 py-1">Folders</p>

            <!-- Root / All Files -->
            <button
              @click="store.navigateToFolder(null)"
              :class="[
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer',
                store.currentFolderId === null
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted/60',
              ]"
            >
              <Home class="h-3.5 w-3.5 shrink-0" />
              <span class="truncate">All Files</span>
              <Badge variant="secondary" shape="pill" class="ml-auto text-[10px] font-mono px-1.5 py-0 h-4">
                {{ store.totalFiles }}
              </Badge>
            </button>

            <!-- Individual folders -->
            <button
              v-for="folder in store.folders"
              :key="folder.id"
              @click="store.navigateToFolder(folder)"
              :class="[
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer group/folder',
                store.currentFolderId === folder.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted/60',
              ]"
            >
              <span class="text-sm">📁</span>
              <span class="truncate flex-1">{{ folder.name }}</span>
              <Badge variant="secondary" shape="pill" class="ml-auto text-[10px] font-mono px-1.5 py-0 h-4 opacity-60 group-hover/folder:opacity-100">
                {{ folder.itemCount }}
              </Badge>
            </button>
          </CardContent>
        </Card>

        <!-- File Type Filters -->
        <Card flush class="border-border/80 bg-card shadow-xs">
          <CardContent class="p-3 space-y-0.5">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-1.5 py-1">Filter by Type</p>
            <button
              v-for="cat in typeFilters"
              :key="cat.value"
              @click="store.activeTypeFilter = cat.value"
              :class="[
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer',
                store.activeTypeFilter === cat.value
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted/60',
              ]"
            >
              <component :is="cat.icon" class="h-3.5 w-3.5 shrink-0" :class="cat.colorClass" />
              <span>{{ cat.label }}</span>
            </button>
          </CardContent>
        </Card>

      </aside>

      <!-- ── Main Content Area ─────────────────────────── -->
      <section class="flex-1 min-w-0 space-y-4">

        <!-- Breadcrumb Toolbar -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card/60 backdrop-blur-xs">
          <!-- Breadcrumb navigation -->
          <nav class="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            <button
              v-for="(crumb, i) in store.breadcrumb"
              :key="crumb.id ?? 'root'"
              class="flex items-center gap-1 cursor-pointer group/crumb"
              @click="store.navigateToBreadcrumb(crumb)"
            >
              <span
                :class="[
                  'font-medium transition-colors',
                  i === store.breadcrumb.length - 1
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                ]"
              >
                {{ crumb.name }}
              </span>
              <ChevronRight v-if="i < store.breadcrumb.length - 1" class="h-3 w-3 text-muted-foreground/60 shrink-0" />
            </button>
          </nav>

          <!-- Right toolbar: search + view mode toggle -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Bulk delete when files selected -->
            <Button
              v-if="store.selectedFiles.size > 0"
              variant="destructive"
              size="sm"
              class="h-8 text-xs gap-1.5 cursor-pointer"
              @click="store.deleteSelected"
            >
              <Trash2 class="h-3.5 w-3.5" />
              <span>Delete {{ store.selectedFiles.size }} selected</span>
            </Button>
            <Button
              v-if="store.selectedFiles.size > 0"
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-muted-foreground cursor-pointer"
              @click="store.clearSelection"
            >
              <X class="h-4 w-4" />
            </Button>

            <!-- Search -->
            <div class="w-48">
              <InputGroup>
                <InputIcon side="left">
                  <Search class="h-3.5 w-3.5" />
                </InputIcon>
                <Input
                  v-model="store.searchQuery"
                  placeholder="Search files..."
                  class="pl-8 h-8 text-xs bg-background"
                />
              </InputGroup>
            </div>

            <!-- View Mode Toggle -->
            <div class="flex items-center rounded-lg border border-border overflow-hidden bg-background">
              <button
                :class="[
                  'flex items-center justify-center h-8 w-8 text-xs transition-colors cursor-pointer',
                  store.viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/60',
                ]"
                @click="store.viewMode = 'grid'"
                title="Grid view"
              >
                <LayoutGrid class="h-3.5 w-3.5" />
              </button>
              <button
                :class="[
                  'flex items-center justify-center h-8 w-8 text-xs transition-colors cursor-pointer',
                  store.viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/60',
                ]"
                @click="store.viewMode = 'list'"
                title="List view"
              >
                <List class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- File Count Summary line -->
        <div class="text-[11px] text-muted-foreground flex items-center gap-2 px-0.5">
          <span>
            Showing <strong class="text-foreground">{{ store.filteredFiles.length }}</strong> of
            <strong class="text-foreground">{{ store.currentFolderFiles.length }}</strong> files
          </span>
          <span v-if="store.activeTypeFilter !== 'all'" class="text-primary font-medium">
            — filtered by {{ store.activeTypeFilter }}
          </span>
        </div>

        <!-- Loading skeleton -->
        <div v-if="store.isLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <div
            v-for="i in 10"
            :key="i"
            class="aspect-square rounded-xl bg-muted/60 animate-pulse"
          ></div>
        </div>

        <!-- Empty state -->
        <div v-else-if="store.filteredFiles.length === 0 && !store.isLoading" class="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/60 rounded-xl bg-muted/10">
          <div class="text-4xl mb-3">📂</div>
          <p class="text-sm font-semibold text-foreground">No files found</p>
          <p class="text-xs text-muted-foreground mt-1">
            {{ store.searchQuery ? 'No results match your search.' : 'This folder is empty.' }}
          </p>
          <Button
            size="sm"
            class="mt-4 gap-1.5 text-xs"
            @click="store.isUploadDialogOpen = true"
          >
            <Upload class="h-3.5 w-3.5" />
            Upload Files
          </Button>
        </div>

        <!-- File Grid View -->
        <FileGrid
          v-else-if="store.viewMode === 'grid'"
          :files="store.filteredFiles"
          :selected-files="store.selectedFiles"
          @preview="store.openPreview"
          @toggle-select="store.toggleFileSelection"
          @delete="store.deleteFile"
        />

        <!-- File List View -->
        <FileList
          v-else
          :files="store.filteredFiles"
          :selected-files="store.selectedFiles"
          @preview="store.openPreview"
          @toggle-select="store.toggleFileSelection"
          @delete="store.deleteFile"
        />

      </section>
    </div>

    <!-- File Preview Drawer -->
    <FilePreviewDrawer
      :file="store.previewFile"
      :open="store.isPreviewOpen"
      @update:open="store.isPreviewOpen = $event"
      @delete="store.deleteFile"
    />

    <!-- Upload Dropzone Dialog -->
    <UploadDropzone
      :open="store.isUploadDialogOpen"
      :is-uploading="store.isUploading"
      @update:open="store.isUploadDialogOpen = $event"
      @upload="store.simulateUpload"
    />
  </div>
</template>
