<script setup lang="ts">
import {
  Settings2,
  RotateCcw,
  Check,
  Sun,
  Moon,
  Monitor,
  Maximize2,
  Minimize2,
  Sparkles,
} from '@lucide/vue'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  useThemeConfig,
  type PrimaryColorKey,
  type RadiusKey,
  type ContentWidthKey,
} from '@/composables/useThemeConfig'

const {
  themeConfig,
  isCustomizerOpen,
  primaryColors,
  radiusPresets,
  setPrimaryColor,
  setRadius,
  setContentWidth,
  resetThemeConfig,
  toggleCustomizer,
} = useThemeConfig()

// Theme color mode (light / dark / auto)
const mode = useColorMode({
  selector: 'html',
  attribute: 'class',
  emitAuto: true,
  modes: {
    auto: '',
    dark: 'dark',
    light: '',
  },
})

const colorModes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'auto', label: 'System', icon: Monitor },
]
</script>

<template>
  <div>
    <!-- Floating Trigger Button on Right Viewport Edge -->
    <button
      type="button"
      class="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 rounded-l-xl bg-card border border-r-0 border-border text-foreground shadow-lg hover:shadow-xl hover:text-primary hover:w-11 transition-all duration-200 group focus:outline-hidden focus:ring-2 focus:ring-ring"
      aria-label="Open Theme Customizer"
      title="Customize Theme & Layout"
      @click="toggleCustomizer(true)"
    >
      <Settings2 class="h-5 w-5 transition-transform duration-500 group-hover:rotate-90 text-primary" />
    </button>

    <!-- Slide-over Drawer / Sheet Panel -->
    <Sheet v-model:open="isCustomizerOpen">
      <SheetContent side="right" class="w-full sm:max-w-md p-0 flex flex-col h-full bg-background/95 backdrop-blur-md">
        <!-- Sheet Header -->
        <SheetHeader class="p-6 pb-4 border-b border-border text-left">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles class="h-4 w-4" />
              </div>
              <div>
                <SheetTitle class="text-base font-semibold text-foreground">
                  Theme Customizer
                </SheetTitle>
                <SheetDescription class="text-xs text-muted-foreground mt-0.5">
                  Real-time preview and layout configuration
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        <!-- Scrollable Body Settings -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- 1. Color Scheme Mode -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Color Mode</span>
              <span class="text-xs font-medium text-foreground capitalize">{{ mode }}</span>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="item in colorModes"
                :key="item.value"
                type="button"
                :class="[
                  'flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-lg border text-xs font-medium transition-all duration-150',
                  mode === item.value
                    ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs ring-1 ring-primary'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground',
                ]"
                @click="mode = item.value as any"
              >
                <component :is="item.icon" class="h-4 w-4" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>

          <Separator />

          <!-- 2. Primary Accent Color -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary Color</span>
              <span class="text-xs font-medium text-foreground capitalize">{{ themeConfig.primaryColor }}</span>
            </div>
            <div class="grid grid-cols-4 gap-2.5">
              <button
                v-for="color in primaryColors"
                :key="color.key"
                type="button"
                :class="[
                  'flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-medium transition-all duration-150 text-left',
                  themeConfig.primaryColor === color.key
                    ? 'border-primary bg-accent/60 text-foreground font-semibold shadow-xs ring-1 ring-primary'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground',
                ]"
                @click="setPrimaryColor(color.key as PrimaryColorKey)"
              >
                <span
                  class="h-4 w-4 rounded-full shrink-0 flex items-center justify-center shadow-xs"
                  :style="{ backgroundColor: color.hex }"
                >
                  <Check
                    v-if="themeConfig.primaryColor === color.key"
                    class="h-2.5 w-2.5 text-white stroke-3"
                  />
                </span>
                <span class="truncate text-[11px]">{{ color.name }}</span>
              </button>
            </div>
          </div>

          <Separator />

          <!-- 3. Border Radius Scale -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Border Radius</span>
              <span class="text-xs font-mono font-medium text-foreground">{{ themeConfig.radius }}rem</span>
            </div>
            <div class="grid grid-cols-6 gap-1.5">
              <button
                v-for="preset in radiusPresets"
                :key="preset.value"
                type="button"
                :class="[
                  'py-2 px-1 text-center rounded-md border text-xs font-medium transition-all duration-150',
                  themeConfig.radius === preset.value
                    ? 'border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground',
                ]"
                @click="setRadius(preset.value as RadiusKey)"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>

          <Separator />

          <!-- 4. Content Container Layout -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layout Width</span>
              <span class="text-xs font-medium text-foreground capitalize">{{ themeConfig.contentWidth }}</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                :class="[
                  'flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-150',
                  themeConfig.contentWidth === 'fluid'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:bg-accent',
                ]"
                @click="setContentWidth('fluid' as ContentWidthKey)"
              >
                <Maximize2 class="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <div class="text-xs font-semibold text-foreground">Fluid</div>
                  <div class="text-[11px] text-muted-foreground leading-tight mt-0.5">100% full width workspace</div>
                </div>
              </button>

              <button
                type="button"
                :class="[
                  'flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-150',
                  themeConfig.contentWidth === 'boxed'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:bg-accent',
                ]"
                @click="setContentWidth('boxed' as ContentWidthKey)"
              >
                <Minimize2 class="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <div class="text-xs font-semibold text-foreground">Boxed</div>
                  <div class="text-[11px] text-muted-foreground leading-tight mt-0.5">Centered max-w-7xl layout</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Sheet Footer (Reset Action) -->
        <div class="p-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
          <div class="text-xs text-muted-foreground">
            Settings auto-saved locally
          </div>
          <Button
            variant="outline"
            size="sm"
            class="gap-1.5 text-xs"
            @click="resetThemeConfig"
          >
            <RotateCcw class="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
