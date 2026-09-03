<script setup lang="ts">
import type { Component } from 'vue'
import {
  ImageIcon,
  Video,
  FileText,
  Archive,
  File,
  Trash2,
  Download,
  Calendar,
  User,
  HardDrive,
  Tag,
} from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { FileItem, FileType } from '@/services/file-manager.service'

const props = defineProps<{
  file: FileItem | null
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'delete', id: string): void
}>()

const typeIconMap: Record<FileType, Component> = {
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
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleDelete() {
  if (props.file) {
    emit('delete', props.file.id)
    emit('update:open', false)
  }
}
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <SheetContent side="right" class="w-80 sm:w-96 p-0 flex flex-col gap-0">
      <SheetHeader class="p-5 pb-4 border-b border-border bg-muted/10">
        <SheetTitle class="text-sm font-semibold tracking-tight truncate pr-6">
          {{ file?.name ?? 'File Details' }}
        </SheetTitle>
        <SheetDescription class="text-xs text-muted-foreground">
          File preview and metadata details
        </SheetDescription>
      </SheetHeader>

      <template v-if="file">
        <!-- Preview Area -->
        <div class="flex-1 overflow-y-auto p-5 space-y-5">
          <!-- Image preview -->
          <div
            v-if="file.type === 'image' && file.url && file.url !== '#'"
            class="rounded-xl overflow-hidden bg-muted/30 border border-border/60"
          >
            <img
              :src="file.url"
              :alt="file.name"
              class="w-full object-cover max-h-64"
            />
          </div>

          <!-- Non-image file icon preview -->
          <div
            v-else
            class="rounded-xl bg-muted/20 border border-border/60 flex flex-col items-center justify-center py-10 gap-3"
          >
            <div :class="['h-16 w-16 rounded-2xl flex items-center justify-center', typeBadgeClass[file.type]]">
              <component :is="typeIconMap[file.type]" class="h-8 w-8" />
            </div>
            <span class="font-mono text-xs uppercase font-semibold text-muted-foreground tracking-widest">
              .{{ file.extension }}
            </span>
          </div>

          <!-- File Metadata -->
          <div class="space-y-1 rounded-xl border border-border/60 bg-muted/10 overflow-hidden">
            <!-- File type -->
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <Tag class="h-3.5 w-3.5" />
                <span>Type</span>
              </div>
              <Badge
                variant="outline"
                shape="pill"
                class="text-[10px] px-2 py-0.5 capitalize border"
                :class="typeBadgeClass[file.type]"
              >
                {{ file.type }}
              </Badge>
            </div>

            <!-- File size -->
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <HardDrive class="h-3.5 w-3.5" />
                <span>Size</span>
              </div>
              <span class="text-xs font-mono font-medium text-foreground">{{ formatBytes(file.size) }}</span>
            </div>

            <!-- Uploaded by -->
            <div class="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <User class="h-3.5 w-3.5" />
                <span>Uploaded by</span>
              </div>
              <span class="text-xs font-medium text-foreground">{{ file.uploadedBy }}</span>
            </div>

            <!-- Upload date -->
            <div class="flex items-start justify-between px-4 py-2.5 border-b border-border/40">
              <div class="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                <Calendar class="h-3.5 w-3.5" />
                <span>Uploaded</span>
              </div>
              <span class="text-xs text-foreground/80 text-right ml-4">{{ formatDate(file.uploadedAt) }}</span>
            </div>

            <!-- Last modified -->
            <div class="flex items-start justify-between px-4 py-2.5">
              <div class="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                <Calendar class="h-3.5 w-3.5" />
                <span>Modified</span>
              </div>
              <span class="text-xs text-foreground/80 text-right ml-4">{{ formatDate(file.lastModified) }}</span>
            </div>
          </div>
        </div>

        <!-- Footer actions -->
        <div class="p-4 border-t border-border bg-muted/5 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            class="flex-1 gap-1.5 text-xs h-9 cursor-pointer"
            :disabled="file.url === '#'"
            :as="file.url !== '#' ? 'a' : 'button'"
            :href="file.url !== '#' ? file.url : undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download class="h-3.5 w-3.5" />
            Download
          </Button>
          <Button
            variant="destructive"
            size="sm"
            class="gap-1.5 text-xs h-9 cursor-pointer"
            @click="handleDelete"
          >
            <Trash2 class="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </template>
    </SheetContent>
  </Sheet>
</template>
