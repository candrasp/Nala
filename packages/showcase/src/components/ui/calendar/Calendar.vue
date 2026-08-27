<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { ChevronLeft, ChevronRight } from "@lucide/vue"

const props = withDefaults(
  defineProps<CalendarRootProps & { class?: HTMLAttributes["class"] }>(),
  {
    modelValue: undefined,
    placeholder: undefined,
  }
)

const emits = defineEmits<CalendarRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    v-bind="forwarded"
    data-slot="calendar"
    :class="cn('p-3 rounded-xl border bg-card text-card-foreground shadow-xs select-none w-fit', props.class)"
  >
    <!-- Calendar Navigation Header -->
    <CalendarHeader class="flex items-center justify-between pt-1 pb-3 px-1">
      <CalendarPrev
        class="inline-flex items-center justify-center h-7 w-7 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
      >
        <slot name="prev-icon">
          <ChevronLeft class="h-4 w-4" />
        </slot>
      </CalendarPrev>

      <CalendarHeading class="text-xs font-bold text-foreground capitalize tracking-tight" />

      <CalendarNext
        class="inline-flex items-center justify-center h-7 w-7 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
      >
        <slot name="next-icon">
          <ChevronRight class="h-4 w-4" />
        </slot>
      </CalendarNext>
    </CalendarHeader>

    <!-- Month Day Grid -->
    <div class="flex flex-col gap-y-4">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse space-y-1"
      >
        <!-- Weekday Head -->
        <CalendarGridHead>
          <CalendarGridRow class="flex">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="w-8 rounded-md text-[11px] font-medium text-muted-foreground text-center"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>

        <!-- Days Body -->
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="flex w-full mt-1"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="relative p-0 text-center text-xs focus-within:relative focus-within:z-20 has-data-selected:bg-primary/10 first:has-data-selected:rounded-l-md last:has-data-selected:rounded-r-md"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-medium text-foreground transition-all cursor-pointer hover:bg-muted/80 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring data-selected:bg-primary data-selected:text-primary-foreground data-selected:font-bold data-today:border data-today:border-primary/50 data-today:font-semibold data-outside-view:text-muted-foreground/40 data-disabled:text-muted-foreground/30 data-disabled:cursor-not-allowed"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
