<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisTooltip } from '@unovis/vue'
import { Donut } from '@unovis/ts'

interface Props {
  data: Record<string, any>[]
  category: string
  index: string
  colors?: string[]
  valueFormatter?: (val: number) => string
  showTooltip?: boolean
  showLegend?: boolean
  arcWidth?: number
  padAngle?: number
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['var(--primary)', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'],
  valueFormatter: (val: number) => val.toLocaleString(),
  showTooltip: true,
  showLegend: false,
  arcWidth: 28,
  padAngle: 0.02,
})

const value = (d: any) => d[props.category]

function getColor(_: any, i: number): string {
  return props.colors[i % props.colors.length]
}

const tooltipTemplate = (d: Record<string, any>) => {
  if (!d) return ''
  const name = d[props.index]
  const val = props.valueFormatter(d[props.category])
  return `
    <div class="rounded-lg border border-border bg-popover/95 backdrop-blur-md px-3 py-1.5 text-xs shadow-md">
      <span class="font-medium text-muted-foreground">${name}:</span>
      <span class="font-mono font-bold text-foreground ml-1.5">${val}</span>
    </div>
  `
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-full h-full min-h-40 relative flex items-center justify-center">
      <VisSingleContainer :data="data" class="w-full h-full">
        <VisDonut
          :value="value"
          :color="getColor"
          :arcWidth="arcWidth"
          :padAngle="padAngle"
        />
        <VisTooltip
          v-if="showTooltip"
          :attributes="{ 'data-unovis-tooltip': '' }"
          :triggers="{ [Donut.selectors.segment]: tooltipTemplate }"
        />
      </VisSingleContainer>
    </div>

    <!-- Optional Legend -->
    <div v-if="showLegend" class="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs">
      <div
        v-for="(item, idx) in data"
        :key="item[index]"
        class="flex items-center gap-1.5 text-muted-foreground font-medium"
      >
        <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: colors[idx % colors.length] }" />
        <span>{{ item[index] }}</span>
      </div>
    </div>
  </div>
</template>
