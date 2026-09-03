<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useKanbanStore } from '@/stores/kanban'
import type { KanbanColumnId, KanbanPriority } from '@/services/kanban.service'
import { Loader2, Sparkles } from '@lucide/vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()

const kanbanStore = useKanbanStore()

const taskSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, 'Task title must be at least 3 characters'),
    description: z.string().min(5, 'Task description must be at least 5 characters'),
    columnId: z.enum(['backlog', 'in_progress', 'in_review', 'done']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    assigneeId: z.string().min(1, 'Please select an assignee'),
    tagsText: z.string().optional(),
    dueDate: z.string().min(1, 'Due date is required'),
    estimatedHours: z.number().min(1, 'Estimated hours must be at least 1').optional(),
    totalSubtasks: z.number().min(1, 'Total subtasks must be at least 1').optional(),
  })
)

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: taskSchema,
  initialValues: {
    title: '',
    description: '',
    columnId: 'backlog' as KanbanColumnId,
    priority: 'medium' as KanbanPriority,
    assigneeId: 'usr-1',
    tagsText: 'Frontend, UI',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estimatedHours: 8,
    totalSubtasks: 4,
  },
})

// Sync form values when dialog opens or editing task changes
watch(
  () => [props.open, kanbanStore.editingTask],
  ([isOpen]) => {
    if (isOpen) {
      if (kanbanStore.editingTask) {
        const t = kanbanStore.editingTask
        setValues({
          title: t.title,
          description: t.description,
          columnId: t.columnId,
          priority: t.priority,
          assigneeId: t.assignee.id,
          tagsText: t.tags.join(', '),
          dueDate: t.dueDate,
          estimatedHours: t.estimatedHours || 8,
          totalSubtasks: t.totalSubtasks || 4,
        })
      } else {
        setValues({
          title: '',
          description: '',
          columnId: kanbanStore.targetColumnForNew || 'backlog',
          priority: 'medium',
          assigneeId: 'usr-1',
          tagsText: 'Feature, UI',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          estimatedHours: 8,
          totalSubtasks: 3,
        })
      }
    }
  },
  { immediate: true }
)

const onSubmit = handleSubmit(async (values) => {
  const assignee = kanbanStore.teamMembers.find(m => m.id === values.assigneeId) || kanbanStore.teamMembers[0]
  const tags = values.tagsText
    ? values.tagsText.split(',').map(s => s.trim()).filter(Boolean)
    : ['General']

  if (kanbanStore.editingTask) {
    // Update existing task
    const success = await kanbanStore.updateTask(kanbanStore.editingTask.id, {
      title: values.title,
      description: values.description,
      columnId: values.columnId,
      priority: values.priority,
      assignee,
      tags,
      dueDate: values.dueDate,
      estimatedHours: values.estimatedHours,
      totalSubtasks: values.totalSubtasks,
    })
    if (success) {
      resetForm()
      emit('update:open', false)
    }
  } else {
    // Create new task
    const success = await kanbanStore.createTask({
      title: values.title,
      description: values.description,
      columnId: values.columnId,
      priority: values.priority,
      assignee,
      tags,
      dueDate: values.dueDate,
      estimatedHours: values.estimatedHours,
      totalSubtasks: values.totalSubtasks,
    })
    if (success) {
      resetForm()
      emit('update:open', false)
    }
  }
})
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-lg p-0 overflow-hidden gap-0">
      <DialogHeader class="p-5 pb-4 border-b border-border bg-muted/10">
        <DialogTitle class="text-base font-semibold tracking-tight flex items-center gap-2">
          <span>{{ kanbanStore.editingTask ? 'Edit Task' : 'Create New Task' }}</span>
          <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            <Sparkles class="h-2.5 w-2.5" />
            Kanban
          </span>
        </DialogTitle>
        <DialogDescription class="text-xs text-muted-foreground mt-0.5">
          {{ kanbanStore.editingTask ? 'Update task details, status column, and assignment.' : 'Fill in the fields below to add a new workflow item.' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
        <!-- Title -->
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel class="text-xs">Task Title</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="e.g. Implement OAuth2 Refresh Flow" class="text-xs" />
            </FormControl>
            <FormMessage class="text-[11px]" />
          </FormItem>
        </FormField>

        <!-- Description -->
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel class="text-xs">Description</FormLabel>
            <FormControl>
              <Textarea
                v-bind="componentField"
                placeholder="Explain the objectives, expected outcome, and technical context..."
                rows="3"
                class="text-xs resize-none"
              />
            </FormControl>
            <FormMessage class="text-[11px]" />
          </FormItem>
        </FormField>

        <!-- Column & Priority Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField v-slot="{ componentField }" name="columnId">
            <FormItem>
              <FormLabel class="text-xs">Workflow Column</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="text-xs h-9">
                    <SelectValue placeholder="Select Column" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="priority">
            <FormItem>
              <FormLabel class="text-xs">Priority Level</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="text-xs h-9">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent / Critical</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>
        </div>

        <!-- Assignee & Due Date Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField v-slot="{ componentField }" name="assigneeId">
            <FormItem>
              <FormLabel class="text-xs">Assignee</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="text-xs h-9">
                    <SelectValue placeholder="Select Team Member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    v-for="member in kanbanStore.teamMembers"
                    :key="member.id"
                    :value="member.id"
                  >
                    {{ member.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="dueDate">
            <FormItem>
              <FormLabel class="text-xs">Due Date</FormLabel>
              <FormControl>
                <Input type="date" v-bind="componentField" class="text-xs h-9" />
              </FormControl>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>
        </div>

        <!-- Tags & Estimated Hours Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField v-slot="{ componentField }" name="tagsText">
            <FormItem>
              <FormLabel class="text-xs">Tags (comma separated)</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Frontend, Security, Bug" class="text-xs h-9" />
              </FormControl>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="estimatedHours">
            <FormItem>
              <FormLabel class="text-xs">Est. Hours</FormLabel>
              <FormControl>
                <Input type="number" min="1" v-bind="componentField" placeholder="8" class="text-xs h-9" />
              </FormControl>
              <FormMessage class="text-[11px]" />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter class="pt-3 border-t border-border mt-4">
          <Button type="button" variant="outline" size="sm" @click="emit('update:open', false)">
            Cancel
          </Button>
          <Button type="submit" size="sm" :disabled="isSubmitting" class="gap-1.5">
            <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin" />
            <span>{{ kanbanStore.editingTask ? 'Save Changes' : 'Create Task' }}</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
