<script setup lang="ts">
import { ref } from 'vue'
import {
  Upload,
  X,
  File,
  Loader2,
} from '@lucide/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  open: boolean
  isUploading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'upload', fileNames: string[]): void
}>()

const isDragOver = ref(false)
const stagedFileNames = ref<string[]>([])

// Simulate file selection from input
const fileInput = ref<HTMLInputElement | null>(null)

function handleFileDrop(event: DragEvent) {
  isDragOver.value = false
  const dt = event.dataTransfer
  if (!dt) return
  const names = Array.from(dt.files).map(f => f.name)
  if (names.length > 0) {
    stagedFileNames.value = [...new Set([...stagedFileNames.value, ...names])]
  }
}

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files) return
  const names = Array.from(input.files).map(f => f.name)
  if (names.length > 0) {
    stagedFileNames.value = [...new Set([...stagedFileNames.value, ...names])]
  }
}

function removeStaged(name: string) {
  stagedFileNames.value = stagedFileNames.value.filter(n => n !== name)
}

function triggerFileInput() {
  fileInput.value?.click()
}

function handleUpload() {
  if (stagedFileNames.value.length === 0) return
  emit('upload', [...stagedFileNames.value])
  stagedFileNames.value = []
}

function handleClose() {
  if (!props.isUploading) {
    stagedFileNames.value = []
    emit('update:open', false)
  }
}

// Also accept simulated names for demo (drag-free)
const DEMO_FILES = [
  'dashboard-screenshot.png',
  'Q4-report.pdf',
  'icons-set.zip',
  'product-image.jpg',
]

function addDemoFiles() {
  stagedFileNames.value = [...new Set([...stagedFileNames.value, ...DEMO_FILES])]
}
</script>

<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="sm:max-w-md p-0 gap-0 overflow-hidden">
      <DialogHeader class="p-5 pb-4 border-b border-border bg-muted/10">
        <DialogTitle class="text-sm font-semibold tracking-tight flex items-center gap-2">
          <Upload class="h-4 w-4 text-primary" />
          Upload Files
        </DialogTitle>
        <DialogDescription class="text-xs text-muted-foreground">
          Drag & drop files below, or click to browse. Multiple file types supported.
        </DialogDescription>
      </DialogHeader>

      <div class="p-5 space-y-4">
        <!-- Drop Zone -->
        <div
          class="relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 px-6 gap-3 text-center transition-all cursor-pointer"
          :class="isDragOver
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-border/80 bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:border-border'"
          @dragover.prevent="isDragOver = true"
          @dragleave="isDragOver = false"
          @drop.prevent="handleFileDrop"
          @click="triggerFileInput"
        >
          <div :class="['h-12 w-12 rounded-xl flex items-center justify-center transition-colors', isDragOver ? 'bg-primary/15' : 'bg-muted/50']">
            <Upload class="h-6 w-6" :class="isDragOver ? 'text-primary' : 'text-muted-foreground'" />
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold text-foreground">Drag & drop files here</p>
            <p class="text-[11px] text-muted-foreground">or <span class="text-primary font-medium underline underline-offset-2">browse your computer</span></p>
          </div>
          <p class="text-[10px] text-muted-foreground/70">PNG, JPG, PDF, ZIP, DOCX, MP4 and more</p>

          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            multiple
            class="hidden"
            accept="image/*,.pdf,.docx,.doc,.xlsx,.pptx,.zip,.tar,.gz,.mp4,.mov"
            @change="handleFileInput"
          />
        </div>

        <!-- Demo helper button -->
        <button
          type="button"
          class="w-full text-[11px] text-muted-foreground hover:text-foreground transition-colors text-center py-1 cursor-pointer"
          @click="addDemoFiles"
        >
          ✨ Add sample files for demo
        </button>

        <!-- Staged files list -->
        <div v-if="stagedFileNames.length > 0" class="space-y-1.5 max-h-40 overflow-y-auto">
          <p class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Files to upload ({{ stagedFileNames.length }})
          </p>
          <div
            v-for="name in stagedFileNames"
            :key="name"
            class="flex items-center gap-2 text-xs px-3 py-2 bg-muted/30 rounded-lg border border-border/50 group/staged"
          >
            <File class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span class="flex-1 truncate text-foreground">{{ name }}</span>
            <button
              class="opacity-0 group-hover/staged:opacity-100 text-muted-foreground hover:text-destructive transition-all cursor-pointer"
              @click.stop="removeStaged(name)"
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <!-- Actions footer -->
        <div class="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
          <Button
            variant="outline"
            size="sm"
            class="text-xs h-8 cursor-pointer"
            :disabled="isUploading"
            @click="handleClose"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            class="text-xs h-8 gap-1.5 cursor-pointer"
            :disabled="stagedFileNames.length === 0 || isUploading"
            @click="handleUpload"
          >
            <Loader2 v-if="isUploading" class="h-3.5 w-3.5 animate-spin" />
            <Upload v-else class="h-3.5 w-3.5" />
            <span>{{ isUploading ? 'Uploading...' : `Upload ${stagedFileNames.length > 0 ? stagedFileNames.length + ' file' + (stagedFileNames.length > 1 ? 's' : '') : 'Files'}` }}</span>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
