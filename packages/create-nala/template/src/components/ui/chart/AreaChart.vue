<script setup lang="ts">
import { computed } from 'vue'
import { VisXYContainer, VisArea, VisLine, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue'
import { CurveType } from '@unovis/ts'

interface Props {
  data: Record<string, any>[]
  index: string
  categories: string[]
  colors?: string[]
  curveType?: CurveType
  showGridLine?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  yFormatter?: (tick: number) => string
  xFormatter?: (tick: number, i?: number) => string
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['var(--primary)', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
  curveType: CurveType.MonotoneX,
  showGridLine: false,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  showLegend: false,
  opacity: 0.15,
})

const x = (_: any, i: number) => i

function getColor(i: number): string {
  return props.colors[i % props.colors.length]
}

const defaultYFormatter = (tick: number) => {
  if (tick >= 1_000_000) return `${(tick / 1_000_000).toFixed(1)}M`
  if (tick >= 1_000) return `${(tick / 1_000).toFixed(0)}k`
  return `${tick}`
}

const defaultXFormatter = (i: number) => {
  const d = props.data[i]
  return d ? String(d[props.index]) : ''
}

const tooltipTemplate = computed(() => {
  return (d: Record<string, any>) => {
    if (!d) return ''
    const title = d[props.index] ?? ''
    const rows = props.categories
      .map((cat, idx) => {
        const val = d[cat]
        const color = getColor(idx)
        const formattedVal = typeof val === 'number' ? val.toLocaleString() : val
        return `
          <div class="flex items-center justify-between gap-4 text-xs py-0.5">
            <span class="flex items-center gap-1.5 text-muted-foreground capitalize">
              <span class="h-2 w-2 rounded-full shrink-0" style="background-color: ${color}"></span>
              ${cat}
            </span>
            <span class="font-mono font-bold text-foreground">${formattedVal}</span>
          </div>
        `
      })
      .join('')

    return `
      <div class="rounded-lg border border-border bg-popover/95 backdrop-blur-md px-3 py-2 text-xs shadow-md min-w-36">
        <div class="font-bold text-foreground mb-1.5 pb-1 border-b border-border/40">${title}</div>
        <div class="space-y-0.5">${rows}</div>
      </div>
    `
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Optional Legend -->
    <div v-if="showLegend" class="flex flex-wrap items-center gap-4 mb-3 text-xs">
      <div
        v-for="(cat, idx) in categories"
        :key="cat"
        class="flex items-center gap-1.5 text-muted-foreground font-medium capitalize"
      >
        <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: getColor(idx) }" />
        <span>{{ cat }}</span>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="flex-1 w-full min-h-45 relative">
      <VisXYContainer :data="data" class="w-full h-full">
        <!-- Area & Line series -->
        <template v-for="(category, idx) in categories" :key="category">
          <VisArea
            :x="x"
            :y="(d: any) => d[category]"
            :color="getColor(idx)"
            :opacity="opacity"
            :curveType="curveType"
          />
          <VisLine
            :x="x"
            :y="(d: any) => d[category]"
            :color="getColor(idx)"
            :lineWidth="2"
            :curveType="curveType"
          />
        </template>

        <!-- X & Y Axes -->
        <VisAxis
          v-if="showXAxis"
          type="x"
          :tickFormat="xFormatter || defaultXFormatter"
          :numTicks="data.length"
          :gridLine="false"
          :domainLine="false"
          :tickLine="false"
          tickTextColor="var(--muted-foreground)"
        />
        <VisAxis
          v-if="showYAxis"
          type="y"
          :tickFormat="yFormatter || defaultYFormatter"
          :numTicks="4"
          :gridLine="showGridLine"
          :domainLine="false"
          :tickLine="false"
          tickTextColor="var(--muted-foreground)"
        />

        <VisTooltip v-if="showTooltip" :attributes="{ 'data-unovis-tooltip': '' }" />
        <VisCrosshair v-if="showTooltip" :template="tooltipTemplate" />
      </VisXYContainer>
    </div>
  </div>
</template>
