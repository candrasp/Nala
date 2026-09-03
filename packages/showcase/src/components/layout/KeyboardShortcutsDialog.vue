<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Kbd } from '@/components/ui/kbd'
import { Keyboard, Command, Sparkles } from '@lucide/vue'

interface ShortcutItem {
  keys: string[]
  description: string
  category: 'Navigation' | 'Actions' | 'General'
}

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const shortcuts: ShortcutItem[] = [
  {
    keys: ['Ctrl', 'K'],
    description: 'Open quick search & command palette',
    category: 'Navigation',
  },
  {
    keys: ['Ctrl', 'B'],
    description: 'Toggle sidebar open / collapsed',
    category: 'Navigation',
  },
  {
    keys: ['Ctrl', 'Shift', 'L'],
    description: 'Toggle theme mode (Dark / Light)',
    category: 'General',
  },
  {
    keys: ['?'],
    description: 'Show keyboard shortcuts helper',
    category: 'General',
  },
  {
    keys: ['Esc'],
    description: 'Close active modal, drawer, or dialog',
    category: 'Actions',
  },
]

const categories = ['Navigation', 'General', 'Actions'] as const
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="max-w-md p-0 overflow-hidden gap-0">
      <!-- Modal Header with Title & Accessible Description -->
      <DialogHeader class="p-5 pb-4 border-b border-border bg-muted/10">
        <div class="flex items-center gap-2.5">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-2xs">
            <Keyboard class="h-4 w-4 text-primary" />
          </div>
          <div>
            <DialogTitle class="text-base font-semibold tracking-tight flex items-center gap-2">
              <span>Keyboard Shortcuts</span>
              <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <Sparkles class="h-2.5 w-2.5" />
                Global
              </span>
            </DialogTitle>
            <DialogDescription class="text-xs text-muted-foreground mt-0.5">
              Speed up your workflow with global keyboard commands.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <!-- Shortcut Groups List -->
      <div class="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
        <div v-for="cat in categories" :key="cat" class="space-y-2">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {{ cat }}
          </div>
          <div class="divide-y divide-border/50 rounded-lg border border-border bg-card/50">
            <div
              v-for="item in shortcuts.filter(s => s.category === cat)"
              :key="item.description"
              class="flex items-center justify-between p-2.5 text-xs transition-colors hover:bg-muted/30"
            >
              <span class="text-foreground font-medium">{{ item.description }}</span>
              <div class="flex items-center gap-1 shrink-0">
                <Kbd
                  v-for="(key, kIdx) in item.keys"
                  :key="kIdx"
                  size="sm"
                  class="font-semibold shadow-2xs"
                >
                  <Command v-if="key === 'Ctrl'" class="h-2.5 w-2.5 sm:hidden" />
                  <span>{{ key }}</span>
                </Kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Tip -->
      <div class="border-t border-border bg-muted/20 px-5 py-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Press <Kbd size="sm">Esc</Kbd> anytime to close this dialog.</span>
        <span class="font-mono">Nala Admin v3.0</span>
      </div>
    </DialogContent>
  </Dialog>
</template>
