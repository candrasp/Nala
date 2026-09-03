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
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

const typeBadgeClass: Record<FileType, string> = {
  image: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  video: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  document: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  audio: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  archive: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  other: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="rounded-xl border border-border/70 overflow-hidden bg-card">
    <Table>
      <TableHeader>
        <TableRow class="bg-muted/30 hover:bg-muted/30 border-border/60">
          <TableHead class="w-10 pl-3">
            <span class="sr-only">Select</span>
          </TableHead>
          <TableHead class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
          <TableHead class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Type</TableHead>
          <TableHead class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell text-right">Size</TableHead>
          <TableHead class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Uploaded by</TableHead>
          <TableHead class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Modified</TableHead>
          <TableHead class="w-10 pr-3">
            <span class="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="file in files"
          :key="file.id"
          class="group/row cursor-pointer transition-colors"
          :class="selectedFiles.has(file.id) ? 'bg-primary/3' : 'hover:bg-muted/30'"
          @click.exact="emit('toggle-select', file.id)"
          @dblclick="emit('preview', file)"
        >
          <!-- Checkbox column -->
          <TableCell class="pl-3">
            <button
              class="h-4 w-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all"
              :class="[
                selectedFiles.has(file.id)
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground/40 bg-background opacity-0 group-hover/row:opacity-100',
              ]"
              @click.stop="emit('toggle-select', file.id)"
            >
              <Check v-if="selectedFiles.has(file.id)" class="h-2.5 w-2.5 text-primary-foreground" />
            </button>
          </TableCell>

          <!-- Name + thumbnail -->
          <TableCell>
            <div class="flex items-center gap-3">
              <!-- Thumbnail or icon -->
              <div class="h-9 w-9 rounded-lg overflow-hidden shrink-0 bg-muted/40 flex items-center justify-center border border-border/60">
                <img
                  v-if="file.type === 'image' && file.thumbnailUrl"
                  :src="file.thumbnailUrl"
                  :alt="file.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <component
                  v-else
                  :is="typeIconMap[file.type]"
                  class="h-4 w-4 text-muted-foreground"
                />
              </div>
              <div class="min-w-0">
                <p class="text-xs font-medium text-foreground truncate max-w-48 xl:max-w-80">{{ file.name }}</p>
                <p class="text-[10px] text-muted-foreground font-mono uppercase mt-0.5">{{ file.extension }}</p>
              </div>
            </div>
          </TableCell>

          <!-- Type badge -->
          <TableCell class="hidden md:table-cell">
            <Badge
              variant="outline"
              shape="pill"
              class="text-[10px] px-2 py-0.5 capitalize border font-medium"
              :class="typeBadgeClass[file.type]"
            >
              {{ file.type }}
            </Badge>
          </TableCell>

          <!-- Size -->
          <TableCell class="text-right hidden sm:table-cell text-xs font-mono text-muted-foreground">
            {{ formatBytes(file.size) }}
          </TableCell>

          <!-- Uploaded by -->
          <TableCell class="text-xs text-muted-foreground hidden lg:table-cell">
            {{ file.uploadedBy }}
          </TableCell>

          <!-- Modified date -->
          <TableCell class="text-xs text-muted-foreground hidden lg:table-cell">
            {{ formatDate(file.lastModified) }}
          </TableCell>

          <!-- Actions -->
          <TableCell class="pr-3">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  class="h-7 w-7 opacity-0 group-hover/row:opacity-100 transition-opacity text-muted-foreground cursor-pointer"
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
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
