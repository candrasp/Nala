<script setup lang="ts">
import {
  Palette,
  Copy,
  Check,
} from '@lucide/vue'
import { toast } from '@/components/ui/sonner'

const copiedToken = ref<string | null>(null)

function copyColor(val: string) {
  navigator.clipboard.writeText(val)
  copiedToken.value = val
  toast.success(`Copied: ${val}`)
  setTimeout(() => {
    copiedToken.value = null
  }, 2000)
}

interface ColorToken {
  name: string
  cssVar: string
  lightValue: string
  darkValue: string
  bgClass: string
  textClass: string
  description: string
}

const semanticColors: ColorToken[] = [
  {
    name: 'Primary (Brand Emerald)',
    cssVar: '--primary',
    lightValue: 'oklch(0.696 0.17 162.48)',
    darkValue: 'oklch(0.696 0.17 162.48)',
    bgClass: 'bg-primary text-primary-foreground',
    textClass: 'text-primary',
    description: 'Main interactive elements, active states, key buttons, and sparkline fills.',
  },
  {
    name: 'Destructive / Error',
    cssVar: '--destructive',
    lightValue: 'oklch(0.577 0.245 27.325)',
    darkValue: 'oklch(0.704 0.191 22.216)',
    bgClass: 'bg-destructive text-destructive-foreground',
    textClass: 'text-destructive',
    description: 'Delete modals, critical alerts, error toasts, and failed operations.',
  },
  {
    name: 'Secondary Surface',
    cssVar: '--secondary',
    lightValue: 'oklch(0.955 0.003 159)',
    darkValue: 'oklch(0.24 0.006 159)',
    bgClass: 'bg-secondary text-secondary-foreground',
    textClass: 'text-secondary-foreground',
    description: 'Subtle buttons, pill badges, and nested content container backgrounds.',
  },
  {
    name: 'Muted Neutral',
    cssVar: '--muted',
    lightValue: 'oklch(0.955 0.003 159)',
    darkValue: 'oklch(0.24 0.006 159)',
    bgClass: 'bg-muted text-muted-foreground',
    textClass: 'text-muted-foreground',
    description: 'Table header backgrounds, card headers, disabled states, and subtle borders.',
  },
  {
    name: 'Accent Highlight',
    cssVar: '--accent',
    lightValue: 'oklch(0.955 0.003 159)',
    darkValue: 'oklch(0.24 0.006 159)',
    bgClass: 'bg-accent text-accent-foreground',
    textClass: 'text-accent-foreground',
    description: 'Hover states on dropdown items, table row highlights, and active tabs.',
  },
]

const surfaceColors: ColorToken[] = [
  {
    name: 'Background Base',
    cssVar: '--background',
    lightValue: 'oklch(0.978 0.003 159)',
    darkValue: 'oklch(0.125 0.005 159)',
    bgClass: 'bg-background text-foreground border border-border',
    textClass: 'text-foreground',
    description: 'Global page canvas backdrop behind all cards and layouts.',
  },
  {
    name: 'Card / Surface',
    cssVar: '--card',
    lightValue: 'oklch(1 0 0)',
    darkValue: 'oklch(0.17 0.006 159)',
    bgClass: 'bg-card text-card-foreground border border-border',
    textClass: 'text-card-foreground',
    description: 'Elevated content cards, data tables, modals, and panel surfaces.',
  },
  {
    name: 'Popover / Dropdown',
    cssVar: '--popover',
    lightValue: 'oklch(1 0 0)',
    darkValue: 'oklch(0.17 0.006 159)',
    bgClass: 'bg-popover text-popover-foreground border border-border',
    textClass: 'text-popover-foreground',
    description: 'Floating select menus, command palettes, date pickers, and tooltips.',
  },
  {
    name: 'Sidebar Background',
    cssVar: '--sidebar',
    lightValue: 'oklch(0.978 0.003 159)',
    darkValue: 'oklch(0.15 0.006 159)',
    bgClass: 'bg-sidebar text-sidebar-foreground border border-sidebar-border',
    textClass: 'text-sidebar-foreground',
    description: 'Collapsible side navigation container with softened low-glare foreground.',
  },
]

const statusTokens = [
  { name: 'Success / Optimal', class: 'bg-emerald-500', textClass: 'text-emerald-600 dark:text-emerald-400', badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', desc: 'Online clusters, completed transactions, active 2FA' },
  { name: 'Warning / Degraded', class: 'bg-amber-500', textClass: 'text-amber-600 dark:text-amber-400', badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', desc: 'Quota warnings, pending invitations, rate limit spikes' },
  { name: 'Critical / Incident', class: 'bg-red-500', textClass: 'text-red-600 dark:text-red-400', badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', desc: 'Service outages, failed backups, suspended users' },
  { name: 'Information / Live', class: 'bg-blue-500', textClass: 'text-blue-600 dark:text-blue-400', badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', desc: 'Scheduled migrations, telemetry streams, PITR logs' },
  { name: 'Special / Feature', class: 'bg-purple-500', textClass: 'text-purple-600 dark:text-purple-400', badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', desc: 'Enterprise addons, read replicas, beta modules' },
]
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Color Palette & Tokens"
      description="Semantic OKLCH color token architecture tailored for high contrast, dark mode harmony, and accessibility."
      badge="Design System"
    />

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 1. SEMANTIC COLOR TOKENS                                              -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm">
      <CardHeader section class="flex flex-row items-center justify-between">
        <div>
          <CardTitle class="text-base font-semibold flex items-center gap-2">
            <Palette class="h-4 w-4 text-primary" />
            Semantic Tokens
          </CardTitle>
          <CardDescription class="text-xs">
            Interactive color variables configured in OKLCH color space for perceptually uniform lightness.
          </CardDescription>
        </div>
        <span class="label-mono text-[10px]">OKLCH Native</span>
      </CardHeader>
      <CardContent class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="color in semanticColors"
          :key="color.cssVar"
          class="rounded-xl border border-border p-4 bg-card hover:border-primary/40 transition-all flex flex-col justify-between group shadow-2xs"
        >
          <div class="space-y-3">
            <!-- Swatch Bar -->
            <div
              :class="['h-16 w-full rounded-lg flex items-center justify-center font-bold text-xs shadow-inner cursor-pointer relative overflow-hidden transition-transform group-hover:scale-[1.02]', color.bgClass]"
              @click="copyColor(`var(${color.cssVar})`)"
            >
              <!-- Base Name Label (hides smoothly on hover) -->
              <span class="transition-opacity duration-200 group-hover:opacity-0 select-none">
                {{ color.name }}
              </span>

              <!-- Hover / Copied Overlay -->
              <div class="absolute inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white text-[11px] gap-1.5 font-medium select-none">
                <Check v-if="copiedToken === `var(${color.cssVar})`" class="h-3.5 w-3.5 text-emerald-400" />
                <Copy v-else class="h-3.5 w-3.5" />
                <span>{{ copiedToken === `var(${color.cssVar})` ? 'Copied!' : 'Click to copy' }}</span>
              </div>
            </div>

            <!-- Meta info -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <code class="font-mono text-xs font-semibold text-foreground">{{ color.cssVar }}</code>
                <button
                  type="button"
                  @click="copyColor(color.cssVar)"
                  class="text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Copy variable name"
                >
                  <Check v-if="copiedToken === color.cssVar" class="h-3.5 w-3.5 text-emerald-500" />
                  <Copy v-else class="h-3.5 w-3.5" />
                </button>
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ color.description }}</p>
            </div>
          </div>

          <!-- OKLCH Value Badge -->
          <div class="mt-4 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span class="truncate">Light: {{ color.lightValue }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 2. SURFACE & BACKGROUND TOKENS                                        -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm">
      <CardHeader section>
        <CardTitle class="text-base font-semibold">Surface &amp; Layout Tokens</CardTitle>
        <CardDescription class="text-xs">
          Layering hierarchy for canvas, cards, floating popovers, and sidebars.
        </CardDescription>
      </CardHeader>
      <CardContent class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="color in surfaceColors"
          :key="color.cssVar"
          class="rounded-xl border border-border p-4 bg-card flex flex-col justify-between shadow-2xs group"
        >
          <div class="space-y-3">
            <div
              :class="['h-14 w-full rounded-lg flex items-center justify-center text-xs font-medium shadow-2xs cursor-pointer relative overflow-hidden transition-transform group-hover:scale-[1.02]', color.bgClass]"
              @click="copyColor(`var(${color.cssVar})`)"
            >
              <!-- Base Name Label (hides on hover) -->
              <span class="transition-opacity duration-200 group-hover:opacity-0 select-none">
                {{ color.name }}
              </span>

              <!-- Hover / Copied Overlay -->
              <div class="absolute inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white text-[11px] gap-1.5 font-medium select-none">
                <Check v-if="copiedToken === `var(${color.cssVar})`" class="h-3.5 w-3.5 text-emerald-400" />
                <Copy v-else class="h-3.5 w-3.5" />
                <span>{{ copiedToken === `var(${color.cssVar})` ? 'Copied!' : 'Click to copy' }}</span>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <code class="font-mono text-xs font-semibold text-foreground">{{ color.cssVar }}</code>
                <button
                  type="button"
                  @click="copyColor(color.cssVar)"
                  class="text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Copy variable name"
                >
                  <Check v-if="copiedToken === color.cssVar" class="h-3.5 w-3.5 text-emerald-500" />
                  <Copy v-else class="h-3.5 w-3.5" />
                </button>
              </div>
              <p class="text-xs text-muted-foreground mt-1 leading-relaxed">{{ color.description }}</p>
            </div>
          </div>
          <div class="mt-4 pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
            {{ color.darkValue }}
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- 3. STATUS & TELEMETRY COLOR PALETTE                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm">
      <CardHeader section>
        <CardTitle class="text-base font-semibold">Status &amp; Telemetry Colors</CardTitle>
        <CardDescription class="text-xs">
          Universal alert indicators, health monitors, pulse dots, and chart series categories.
        </CardDescription>
      </CardHeader>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="status in statusTokens"
            :key="status.name"
            class="rounded-xl border border-border p-4 bg-muted/10 space-y-3"
          >
            <div class="flex items-center gap-2">
              <span :class="['h-3 w-3 rounded-full shrink-0 shadow-xs', status.class]"></span>
              <span class="font-semibold text-xs text-foreground truncate">{{ status.name }}</span>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ status.desc }}</p>
            <div>
              <span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border', status.badgeClass]">
                Sample Badge
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
