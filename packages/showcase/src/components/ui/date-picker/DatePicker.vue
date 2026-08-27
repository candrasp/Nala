<script setup lang="ts">
import { CalendarDays, ChevronLeft, ChevronRight } from '@lucide/vue'

// ─── Mini Calendar State ──────────────────────────────────────────────────────
const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth()) // 0-based

const selectedDate = ref<Date | null>(null)
const selectedRange = ref<{ start: Date | null; end: Date | null }>({ start: null, end: null })

const isOpen = ref(false)
const isRangeOpen = ref(false)

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface CalDay { date: Date; inMonth: boolean }

function buildCalendar(year: number, month: number): CalDay[] {
  const first = new Date(year, month, 1)
  const last  = new Date(year, month + 1, 0)
  const days: CalDay[] = []

  // Pad from Sunday
  for (let i = 0; i < first.getDay(); i++) {
    const d = new Date(year, month, -first.getDay() + i + 1)
    days.push({ date: d, inMonth: false })
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push({ date: new Date(year, month, d), inMonth: true })
  }
  // Pad to complete row
  const remaining = (7 - (days.length % 7)) % 7
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), inMonth: false })
  }
  return days
}

const calendarDays = computed(() => buildCalendar(viewYear.value, viewMonth.value))

function prevMonth() {
  if (viewMonth.value === 0) { viewYear.value--; viewMonth.value = 11 }
  else viewMonth.value--
}
function nextMonth() {
  if (viewMonth.value === 11) { viewYear.value++; viewMonth.value = 0 }
  else viewMonth.value++
}

function isSameDay(a: Date, b: Date | null) {
  return b && a.toDateString() === b.toDateString()
}
function isToday(d: Date) {
  return d.toDateString() === today.toDateString()
}

function selectDate(d: Date) {
  selectedDate.value = d
  isOpen.value = false
}

function formatDate(d: Date | null) {
  if (!d) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// ─── Range Picker Logic ──────────────────────────────────────────────────────
function selectRange(d: Date) {
  const { start, end } = selectedRange.value
  if (!start || (start && end)) {
    selectedRange.value = { start: d, end: null }
  } else {
    const sorted = d < start ? { start: d, end: start } : { start, end: d }
    selectedRange.value = sorted
    isRangeOpen.value = false
  }
}

function isInRange(d: Date) {
  const { start, end } = selectedRange.value
  return start && end && d > start && d < end
}
function isRangeStart(d: Date) { return isSameDay(d, selectedRange.value.start) }
function isRangeEnd(d: Date)   { return isSameDay(d, selectedRange.value.end) }

function formatRange() {
  const { start, end } = selectedRange.value
  if (!start) return 'Pick a date range'
  if (!end) return `${formatDate(start)} → ...`
  return `${formatDate(start)} → ${formatDate(end)}`
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- ── Single Date Picker ──────────────────────────────────── -->
      <div class="space-y-1.5">
        <Label>Deployment Date</Label>
        <Popover v-model:open="isOpen">
          <PopoverTrigger as-child>
            <button
              class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
              :class="{ 'text-muted-foreground': !selectedDate }"
            >
              <span>{{ selectedDate ? formatDate(selectedDate) : 'Pick a date' }}</span>
              <CalendarDays class="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0 shadow-xl" align="start">
            <div class="p-3 w-72">
              <!-- Month Nav -->
              <div class="flex items-center justify-between mb-3">
                <button @click="prevMonth" class="p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <span class="text-sm font-semibold">{{ MONTH_NAMES[viewMonth] }} {{ viewYear }}</span>
                <button @click="nextMonth" class="p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>

              <!-- Day Headers -->
              <div class="grid grid-cols-7 mb-1">
                <span
                  v-for="d in DAYS" :key="d"
                  class="text-center text-[11px] font-medium text-muted-foreground py-1"
                >{{ d }}</span>
              </div>

              <!-- Day Grid -->
              <div class="grid grid-cols-7 gap-y-0.5">
                <button
                  v-for="(day, i) in calendarDays" :key="i"
                  @click="selectDate(day.date)"
                  class="h-8 w-full flex items-center justify-center rounded-md text-sm transition-colors cursor-pointer"
                  :class="[
                    !day.inMonth && 'text-muted-foreground/35 hover:bg-accent/50',
                    day.inMonth && !isSameDay(day.date, selectedDate) && !isToday(day.date) && 'hover:bg-accent',
                    isToday(day.date) && !isSameDay(day.date, selectedDate) && 'text-primary font-semibold bg-primary/10',
                    isSameDay(day.date, selectedDate) && 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90',
                  ]"
                >
                  {{ day.date.getDate() }}
                </button>
              </div>

              <!-- Footer -->
              <div class="mt-2 pt-2 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>{{ selectedDate ? formatDate(selectedDate) : 'No date selected' }}</span>
                <button v-if="selectedDate" @click="selectedDate = null; isOpen = true" class="text-primary hover:underline cursor-pointer">
                  Clear
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <p class="text-xs text-muted-foreground">Select the scheduled deployment date.</p>
      </div>

      <!-- ── Date Range Picker ───────────────────────────────────── -->
      <div class="space-y-1.5">
        <Label>Maintenance Window</Label>
        <Popover v-model:open="isRangeOpen">
          <PopoverTrigger as-child>
            <button
              class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
              :class="{ 'text-muted-foreground': !selectedRange.start }"
            >
              <span class="truncate">{{ formatRange() }}</span>
              <CalendarDays class="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
            </button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0 shadow-xl" align="start">
            <div class="p-3 w-72">
              <!-- Month Nav -->
              <div class="flex items-center justify-between mb-3">
                <button @click="prevMonth" class="p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <span class="text-sm font-semibold">{{ MONTH_NAMES[viewMonth] }} {{ viewYear }}</span>
                <button @click="nextMonth" class="p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>

              <!-- Day Headers -->
              <div class="grid grid-cols-7 mb-1">
                <span v-for="d in DAYS" :key="d" class="text-center text-[11px] font-medium text-muted-foreground py-1">{{ d }}</span>
              </div>

              <!-- Day Grid with range highlight -->
              <div class="grid grid-cols-7 gap-y-0.5">
                <button
                  v-for="(day, i) in calendarDays" :key="i"
                  @click="selectRange(day.date)"
                  class="h-8 w-full flex items-center justify-center text-sm transition-colors cursor-pointer relative"
                  :class="[
                    !day.inMonth && 'text-muted-foreground/35',
                    isInRange(day.date) && 'bg-primary/15 rounded-none',
                    isRangeStart(day.date) && 'bg-primary text-primary-foreground rounded-l-md font-semibold',
                    isRangeEnd(day.date) && 'bg-primary text-primary-foreground rounded-r-md font-semibold',
                    !isRangeStart(day.date) && !isRangeEnd(day.date) && !isInRange(day.date) && day.inMonth && 'rounded-md hover:bg-accent',
                    isToday(day.date) && !isRangeStart(day.date) && !isRangeEnd(day.date) && 'text-primary font-semibold',
                  ]"
                >
                  {{ day.date.getDate() }}
                </button>
              </div>

              <!-- Range Footer -->
              <div class="mt-2 pt-2 border-t border-border text-xs text-muted-foreground">
                <template v-if="!selectedRange.start">Click a start date</template>
                <template v-else-if="!selectedRange.end">Now click an end date</template>
                <div v-else class="flex justify-between">
                  <span>{{ formatDate(selectedRange.start) }} → {{ formatDate(selectedRange.end) }}</span>
                  <button @click="selectedRange = { start: null, end: null }" class="text-primary hover:underline cursor-pointer">Clear</button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <p class="text-xs text-muted-foreground">Select a start and end date for the maintenance window.</p>
      </div>
    </div>
  </div>
</template>
