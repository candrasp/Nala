<script setup lang="ts">
import {
  MoreHorizontal,
  Calendar,
  ListTodo,
  Edit2,
  Trash2,
  ArrowRight,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { KanbanTaskItem, KanbanColumnId, KanbanPriority } from '@/services/kanban.service'
import { useKanbanStore } from '@/stores/kanban'

const props = defineProps<{
  task: KanbanTaskItem
}>()

const kanbanStore = useKanbanStore()

const priorityMap: Record<KanbanPriority, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' | 'warning' | 'info' | 'success'; class: string }> = {
  low: {
    label: 'Low',
    variant: 'secondary',
    class: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  },
  medium: {
    label: 'Medium',
    variant: 'info',
    class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  high: {
    label: 'High',
    variant: 'warning',
    class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  urgent: {
    label: 'Urgent',
    variant: 'destructive',
    class: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-semibold',
  },
}

const isDragging = ref(false)

const handleDragStart = (event: DragEvent) => {
  isDragging.value = true
  kanbanStore.draggedTaskId = props.task.id
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', props.task.id)
  }
}

const handleDragEnd = () => {
  isDragging.value = false
  kanbanStore.draggedTaskId = null
}

const moveToNextColumn = () => {
  const columnOrder: KanbanColumnId[] = ['backlog', 'in_progress', 'in_review', 'done']
  const currentIndex = columnOrder.indexOf(props.task.columnId)
  if (currentIndex < columnOrder.length - 1) {
    kanbanStore.moveTask(props.task.id, columnOrder[currentIndex + 1])
  }
}
</script>

<template>
  <Card
    flush
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    :class="[
      'cursor-grab active:cursor-grabbing select-none border transition-all duration-200 group/card shadow-2xs hover:shadow-md hover:border-primary/40 bg-card/90 backdrop-blur-xs',
      isDragging ? 'opacity-40 scale-95 border-dashed border-primary ring-2 ring-primary/20' : '',
    ]"
  >
    <CardContent class="p-4 space-y-3">
      <!-- Top Row: Priority Badge + Actions Menu -->
      <div class="flex items-center justify-between gap-2">
        <Badge
          :variant="priorityMap[task.priority].variant"
          shape="pill"
          :class="['text-[10px] px-2 py-0.5 border capitalize', priorityMap[task.priority].class]"
        >
          {{ priorityMap[task.priority].label }}
        </Badge>

        <div class="flex items-center gap-1">
          <!-- Task ID Chip -->
          <span class="font-mono text-[10px] text-muted-foreground/80 font-medium">
            {{ task.id }}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="icon-xs"
                class="h-6 w-6 opacity-0 group-hover/card:opacity-100 transition-opacity text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <MoreHorizontal class="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-44">
              <DropdownMenuLabel class="text-[11px] text-muted-foreground font-normal">Task Actions</DropdownMenuLabel>
              <DropdownMenuItem @click="kanbanStore.openEditModal(task)" class="text-xs cursor-pointer gap-2">
                <Edit2 class="h-3.5 w-3.5 text-muted-foreground" />
                <span>Edit Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                v-if="task.columnId !== 'done'"
                @click="moveToNextColumn"
                class="text-xs cursor-pointer gap-2 text-primary"
              >
                <ArrowRight class="h-3.5 w-3.5" />
                <span>Move Forward</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="kanbanStore.deleteTask(task.id)"
                class="text-xs cursor-pointer gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 class="h-3.5 w-3.5" />
                <span>Delete Task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Task Title & Description -->
      <div class="space-y-1">
        <h4 class="text-xs font-semibold text-foreground leading-snug tracking-tight group-hover/card:text-primary transition-colors">
          {{ task.title }}
        </h4>
        <p class="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {{ task.description }}
        </p>
      </div>

      <!-- Tags Pills -->
      <div v-if="task.tags && task.tags.length > 0" class="flex flex-wrap gap-1.5 pt-0.5">
        <span
          v-for="tag in task.tags"
          :key="tag"
          class="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground font-medium"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Progress / Subtasks Progress Bar (if available) -->
      <div v-if="task.totalSubtasks" class="space-y-1 pt-1">
        <div class="flex items-center justify-between text-[10px] text-muted-foreground">
          <span class="inline-flex items-center gap-1">
            <ListTodo class="h-3 w-3" />
            <span>Subtasks</span>
          </span>
          <span class="font-mono font-medium">{{ task.completedSubtasks || 0 }}/{{ task.totalSubtasks }}</span>
        </div>
        <div class="h-1.5 w-full rounded-full bg-muted/70 overflow-hidden">
          <div
            class="h-full rounded-full bg-primary transition-all duration-300"
            :style="{ width: `${Math.round(((task.completedSubtasks || 0) / task.totalSubtasks) * 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Bottom Row: Assignee Avatar + Due Date -->
      <div class="flex items-center justify-between pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
        <!-- Assignee -->
        <div class="flex items-center gap-1.5 min-w-0" :title="task.assignee.name">
          <Avatar class="h-5 w-5 border">
            <AvatarImage :src="task.assignee.avatar || '/img/avatar.webp'" :alt="task.assignee.name" />
            <AvatarFallback class="text-[9px] bg-primary/10 text-primary font-semibold">
              {{ task.assignee.name.split(' ').map(n => n[0]).join('').slice(0, 2) }}
            </AvatarFallback>
          </Avatar>
          <span class="text-[11px] font-medium text-foreground truncate max-w-24">
            {{ task.assignee.name }}
          </span>
        </div>

        <!-- Due Date Indicator -->
        <div class="flex items-center gap-1 font-mono text-[10.5px]">
          <Calendar class="h-3 w-3 text-muted-foreground/70" />
          <span>{{ task.dueDate }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
