<script setup lang="ts">
import { onMounted } from 'vue'
import {
  Plus,
  Search,
  Kanban,
  CheckCircle2,
  Clock,
  Flame,
  RotateCcw,
  Sparkles,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import KanbanColumn from './components/KanbanColumn.vue'
import TaskFormDialog from './components/TaskFormDialog.vue'
import { useKanbanStore } from '@/stores/kanban'

const kanbanStore = useKanbanStore()

onMounted(() => {
  kanbanStore.loadTasks()
})
</script>

<template>
  <div class="space-y-6 w-full max-w-[1920px] mx-auto pb-12">
    <!-- Standard PageHeader -->
    <PageHeader
      title="Kanban Board"
      description="Visual task management board with interactive drag-and-drop workflow columns, priority matrices, and team allocation."
      badge="Enterprise App"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            class="gap-1.5 h-8 text-xs cursor-pointer"
            @click="kanbanStore.loadTasks()"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            <span>Reset Board</span>
          </Button>

          <Button
            size="sm"
            class="gap-1.5 h-8 text-xs cursor-pointer shadow-xs"
            @click="kanbanStore.openCreateModal('backlog')"
          >
            <Plus class="h-3.5 w-3.5" />
            <span>New Task</span>
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- KPI Metric Summary Strip -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total Tasks -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all">
        <CardContent class="p-4 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Total Backlog Items</span>
            <Kanban class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ kanbanStore.totalTasks }}</div>
          <p class="text-[11px] text-muted-foreground flex items-center gap-1">
            <span class="text-emerald-500 font-semibold inline-flex items-center gap-0.5">
              <Sparkles class="h-3 w-3" />
              Active Project
            </span>
            <span>across 4 columns</span>
          </p>
        </CardContent>
      </Card>

      <!-- 2. In Progress -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all">
        <CardContent class="p-4 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">In Progress Tasks</span>
            <Clock class="h-4 w-4 text-blue-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ kanbanStore.inProgressTasks }}</div>
          <p class="text-[11px] text-muted-foreground">
            <span>Sprint work in active development</span>
          </p>
        </CardContent>
      </Card>

      <!-- 3. Urgent Priority -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all">
        <CardContent class="p-4 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Critical / Urgent</span>
            <Flame class="h-4 w-4 text-rose-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-rose-500">{{ kanbanStore.urgentTasks }}</div>
          <p class="text-[11px] text-muted-foreground">
            <span>Requires immediate attention</span>
          </p>
        </CardContent>
      </Card>

      <!-- 4. Completion Rate -->
      <Card flush class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all">
        <CardContent class="p-4 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-muted-foreground">Sprint Completion Rate</span>
            <CheckCircle2 class="h-4 w-4 text-emerald-500" />
          </div>
          <div class="text-2xl font-bold tracking-tight text-foreground">{{ kanbanStore.completionRate }}%</div>
          <div class="h-1.5 w-full rounded-full bg-muted overflow-hidden mt-2">
            <div class="h-full rounded-full bg-emerald-500 transition-all duration-500" :style="{ width: `${kanbanStore.completionRate}%` }" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filter & Toolbar Bar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card/60 backdrop-blur-xs">
      <!-- Search Input -->
      <div class="w-full sm:w-80">
        <InputGroup>
          <InputIcon side="left">
            <Search class="h-3.5 w-3.5" />
          </InputIcon>
          <Input
            v-model="kanbanStore.searchQuery"
            placeholder="Search task title, tags, or assignee..."
            class="pl-8 h-8 text-xs bg-background"
          />
        </InputGroup>
      </div>

      <!-- Filters Row -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <!-- Priority Filter -->
        <Select v-model="kanbanStore.priorityFilter">
          <SelectTrigger class="h-8 text-xs w-36 bg-background">
            <SelectValue placeholder="Priority: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <!-- Assignee Filter -->
        <Select v-model="kanbanStore.assigneeFilter">
          <SelectTrigger class="h-8 text-xs w-40 bg-background">
            <SelectValue placeholder="Assignee: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem
              v-for="member in kanbanStore.teamMembers"
              :key="member.id"
              :value="member.id"
            >
              {{ member.name }}
            </SelectItem>
          </SelectContent>
        </Select>

        <!-- Clear Filters button when active -->
        <Button
          v-if="kanbanStore.searchQuery || kanbanStore.priorityFilter !== 'all' || kanbanStore.assigneeFilter !== 'all'"
          variant="ghost"
          size="sm"
          class="h-8 text-xs text-muted-foreground hover:text-foreground cursor-pointer px-2"
          @click="() => { kanbanStore.searchQuery = ''; kanbanStore.priorityFilter = 'all'; kanbanStore.assigneeFilter = 'all' }"
        >
          Clear Filters
        </Button>
      </div>
    </div>

    <!-- Kanban Columns Workflow Board Grid -->
    <div class="flex gap-4 overflow-x-auto pb-6 pt-1 items-start">
      <KanbanColumn
        v-for="col in kanbanStore.columns"
        :key="col.id"
        :column="col"
        :tasks="kanbanStore.tasksByColumn[col.id]"
      />
    </div>

    <!-- Task Create/Edit Modal Dialog -->
    <TaskFormDialog v-model:open="kanbanStore.isFormDialogOpen" />
  </div>
</template>
