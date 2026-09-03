<script setup lang="ts">
import {
  ImageIcon,
  Video,
  FileText,
  Archive,
  File,
  MoreHorizontal,
  Eye,
  Trash2,
  Check,
} from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { FileItem, FileType } from '@/services/file-manager.service'

const props = defineProps<{
  files: FileItem[]
  selectedFiles: Set<string>
}>()

const emit = defineEmits<{
  (e: 'preview', file: FileItem): void
  (e: 'toggle-select', id: string): void
  (e: 'delete', id: string): void
}>()

const typeIconMap: Record<FileType, any> = {
  image: ImageIcon,
  video: Video,
  document: FileText,
  audio: File,
  archive: Archive,
  other: File,
}

const typeColorMap: Record<FileType, string> = {
  image: 'text-violet-500 bg-violet-500/10',
  video: 'text-blue-500 bg-blue-500/10',
  document: 'text-amber-500 bg-amber-500/10',
  audio: 'text-emerald-500 bg-emerald-500/10',
  archive: 'text-rose-500 bg-rose-500/10',
  other: 'text-slate-500 bg-slate-500/10',
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
    <div
      v-for="file in files"
      :key="file.id"
      class="group/card relative rounded-xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer select-none"
      :class="selectedFiles.has(file.id) ? 'border-primary/60 ring-2 ring-primary/20 bg-primary/2' : ''"
      @click.exact="emit('toggle-select', file.id)"
      @dblclick="emit('preview', file)"
    >
      <!-- Thumbnail / Icon area -->
      <div class="aspect-square flex items-center justify-center overflow-hidden bg-muted/30 relative">
        <!-- Image thumbnail -->
        <img
          v-if="file.type === 'image' && file.thumbnailUrl"
          :src="file.thumbnailUrl"
          :alt="file.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
          loading="lazy"
        />
        <!-- Non-image file icon -->
        <div v-else class="flex flex-col items-center justify-center gap-2">
          <div :class="['h-12 w-12 rounded-xl flex items-center justify-center', typeColorMap[file.type]]">
            <component :is="typeIconMap[file.type]" class="h-6 w-6" />
          </div>
          <span class="text-[10px] font-mono uppercase font-semibold text-muted-foreground tracking-wide">
            .{{ file.extension }}
          </span>
        </div>

        <!-- Selection checkbox (shown on hover/selected) -->
        <button
          class="absolute top-2 left-2 h-5 w-5 rounded border-2 transition-all cursor-pointer flex items-center justify-center"
          :class="[
            selectedFiles.has(file.id)
              ? 'bg-primary border-primary'
              : 'bg-background/80 border-muted-foreground/40 opacity-0 group-hover/card:opacity-100',
          ]"
          @click.stop="emit('toggle-select', file.id)"
        >
          <Check v-if="selectedFiles.has(file.id)" class="h-3 w-3 text-primary-foreground" />
        </button>

        <!-- Quick actions overlay on hover -->
        <div class="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="secondary"
                size="icon-xs"
                class="h-6 w-6 bg-background/90 backdrop-blur-xs border border-border/80 shadow-xs cursor-pointer"
                @click.stop
              >
                <MoreHorizontal class="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-40">
              <DropdownMenuItem @click.stop="emit('preview', file)" class="text-xs gap-2 cursor-pointer">
                <Eye class="h-3.5 w-3.5 text-muted-foreground" />
                <span>Preview</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click.stop="emit('delete', file.id)"
                class="text-xs gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 class="h-3.5 w-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- File info footer -->
      <div class="p-2.5 border-t border-border/40 space-y-0.5">
        <p class="text-xs font-medium text-foreground truncate leading-snug" :title="file.name">
          {{ file.name }}
        </p>
        <p class="text-[10px] text-muted-foreground font-mono">{{ formatBytes(file.size) }}</p>
      </div>
    </div>
  </div>
</template>
