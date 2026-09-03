<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import KanbanTaskCard from './KanbanTaskCard.vue'
import type { KanbanColumn } from '@/stores/kanban'
import type { KanbanTaskItem } from '@/services/kanban.service'
import { useKanbanStore } from '@/stores/kanban'

const props = defineProps<{
  column: KanbanColumn
  tasks: KanbanTaskItem[]
}>()

const kanbanStore = useKanbanStore()
const isDragOver = ref(false)

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  const taskId = event.dataTransfer?.getData('text/plain') || kanbanStore.draggedTaskId
  if (taskId) {
    kanbanStore.moveTask(taskId, props.column.id)
  }
}
</script>

<template>
  <div
    class="flex flex-col flex-1 min-w-70 max-w-90 rounded-xl border border-border/70 bg-muted/20 backdrop-blur-xs transition-colors duration-200"
    :class="[
      isDragOver ? 'ring-2 ring-primary/40 border-primary/50 bg-primary/2' : '',
    ]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Column Header -->
    <div class="p-3.5 pb-2.5 flex items-center justify-between border-b border-border/50">
      <div class="flex items-center gap-2">
        <span
          class="h-2.5 w-2.5 rounded-full"
          :class="[
            column.id === 'backlog' ? 'bg-slate-400' : '',
            column.id === 'in_progress' ? 'bg-blue-500 animate-pulse' : '',
            column.id === 'in_review' ? 'bg-amber-500' : '',
            column.id === 'done' ? 'bg-emerald-500' : '',
          ]"
        />
        <h3 class="text-xs font-bold text-foreground tracking-tight">{{ column.title }}</h3>
        <Badge variant="secondary" shape="pill" class="text-[10px] px-1.5 py-0 h-4 min-w-4 font-mono">
          {{ tasks.length }}
        </Badge>
      </div>

      <div class="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          class="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
          title="Add task to this column"
          @click="kanbanStore.openCreateModal(column.id)"
        >
          <Plus class="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

    <!-- Column Description Subtitle -->
    <div class="px-3.5 py-1.5 text-[11px] text-muted-foreground truncate border-b border-border/30 bg-muted/10">
      {{ column.description }}
    </div>

    <!-- Task Cards Container -->
    <div class="flex-1 p-2.5 space-y-2.5 overflow-y-auto min-h-87.5 max-h-[calc(100vh-280px)]">
      <!-- Task Cards -->
      <KanbanTaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />

      <!-- Empty Drop Target Area when column has no tasks -->
      <div
        v-if="tasks.length === 0"
        class="h-32 border border-dashed border-border/80 rounded-lg flex flex-col items-center justify-center text-center p-4 text-muted-foreground/80 space-y-1.5 transition-colors"
        :class="isDragOver ? 'border-primary/50 bg-primary/5 text-primary' : ''"
      >
        <p class="text-xs font-medium">No tasks in {{ column.title }}</p>
        <p class="text-[10px] text-muted-foreground">Drag tasks here or click '+' to add</p>
      </div>
    </div>

    <!-- Quick Add Bottom Action -->
    <div class="p-2 border-t border-border/40">
      <Button
        variant="ghost"
        size="sm"
        class="w-full text-xs text-muted-foreground hover:text-foreground justify-start gap-1.5 h-8 cursor-pointer hover:bg-muted/60"
        @click="kanbanStore.openCreateModal(column.id)"
      >
        <Plus class="h-3.5 w-3.5" />
        <span>Add Task</span>
      </Button>
    </div>
  </div>
</template>
