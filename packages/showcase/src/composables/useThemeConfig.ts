import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export type PrimaryColorKey = 'emerald' | 'indigo' | 'violet' | 'rose' | 'amber' | 'cyan' | 'zinc'
export type RadiusKey = '0' | '0.25' | '0.375' | '0.5' | '0.75' | '1.0'
export type ContentWidthKey = 'fluid' | 'boxed'

export interface PrimaryColorDefinition {
  name: string
  key: PrimaryColorKey
  hex: string
  light: {
    primary: string
    ring: string
    primaryForeground: string
  }
  dark: {
    primary: string
    ring: string
    primaryForeground: string
  }
}

export interface RadiusDefinition {
  label: string
  value: RadiusKey
  rem: string
}

export const PRIMARY_COLORS: PrimaryColorDefinition[] = [
  {
    name: 'Emerald',
    key: 'emerald',
    hex: '#10b981',
    light: {
      primary: 'oklch(0.55 0.145 163.2)',
      ring: 'oklch(0.55 0.145 163.2 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
    dark: {
      primary: 'oklch(0.48 0.125 163.2)',
      ring: 'oklch(0.48 0.125 163.2 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
  },
  {
    name: 'Indigo',
    key: 'indigo',
    hex: '#6366f1',
    light: {
      primary: 'oklch(0.51 0.23 277)',
      ring: 'oklch(0.51 0.23 277 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
    dark: {
      primary: 'oklch(0.59 0.21 277)',
      ring: 'oklch(0.59 0.21 277 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
  },
  {
    name: 'Violet',
    key: 'violet',
    hex: '#8b5cf6',
    light: {
      primary: 'oklch(0.54 0.24 293)',
      ring: 'oklch(0.54 0.24 293 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
    dark: {
      primary: 'oklch(0.61 0.22 293)',
      ring: 'oklch(0.61 0.22 293 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
  },
  {
    name: 'Rose',
    key: 'rose',
    hex: '#f43f5e',
    light: {
      primary: 'oklch(0.59 0.22 17)',
      ring: 'oklch(0.59 0.22 17 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
    dark: {
      primary: 'oklch(0.64 0.20 17)',
      ring: 'oklch(0.64 0.20 17 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
  },
  {
    name: 'Amber',
    key: 'amber',
    hex: '#f59e0b',
    light: {
      primary: 'oklch(0.68 0.19 65)',
      ring: 'oklch(0.68 0.19 65 / 35%)',
      primaryForeground: 'oklch(0.15 0 0)',
    },
    dark: {
      primary: 'oklch(0.74 0.17 65)',
      ring: 'oklch(0.74 0.17 65 / 35%)',
      primaryForeground: 'oklch(0.15 0 0)',
    },
  },
  {
    name: 'Cyan',
    key: 'cyan',
    hex: '#06b6d4',
    light: {
      primary: 'oklch(0.62 0.15 215)',
      ring: 'oklch(0.62 0.15 215 / 35%)',
      primaryForeground: 'oklch(0.99 0 0)',
    },
    dark: {
      primary: 'oklch(0.68 0.14 215)',
      ring: 'oklch(0.68 0.14 215 / 35%)',
      primaryForeground: 'oklch(0.15 0 0)',
    },
  },
  {
    name: 'Zinc',
    key: 'zinc',
    hex: '#71717a',
    light: {
      primary: 'oklch(0.205 0 0)',
      ring: 'oklch(0.205 0 0 / 35%)',
      primaryForeground: 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.985 0 0)',
      ring: 'oklch(0.985 0 0 / 35%)',
      primaryForeground: 'oklch(0.145 0 0)',
    },
  },
]

export const RADIUS_PRESETS: RadiusDefinition[] = [
  { label: '0', value: '0', rem: '0rem' },
  { label: '0.25', value: '0.25', rem: '0.25rem' },
  { label: '0.375', value: '0.375', rem: '0.375rem' },
  { label: '0.5', value: '0.5', rem: '0.5rem' },
  { label: '0.75', value: '0.75', rem: '0.75rem' },
  { label: '1.0', value: '1.0', rem: '1rem' },
]

export interface ThemeConfig {
  primaryColor: PrimaryColorKey
  radius: RadiusKey
  contentWidth: ContentWidthKey
}

const DEFAULT_CONFIG: ThemeConfig = {
  primaryColor: 'emerald',
  radius: '0.375',
  contentWidth: 'fluid',
}

const isCustomizerOpen = ref(false)
const themeConfig = useStorage<ThemeConfig>('nala-theme-config', { ...DEFAULT_CONFIG })

// Style element injection helper for reliable CSS variable overrides in both light and dark mode
let customThemeStyleElement: HTMLStyleElement | null = null

function ensureThemeStyleElement(): HTMLStyleElement {
  if (!customThemeStyleElement && typeof document !== 'undefined') {
    customThemeStyleElement = document.getElementById('nala-dynamic-theme-vars') as HTMLStyleElement
    if (!customThemeStyleElement) {
      customThemeStyleElement = document.createElement('style')
      customThemeStyleElement.id = 'nala-dynamic-theme-vars'
      document.head.appendChild(customThemeStyleElement)
    }
  }
  return customThemeStyleElement!
}

export function useThemeConfig() {
  const applyTheme = () => {
    if (typeof document === 'undefined') return

    const colorDef = PRIMARY_COLORS.find(c => c.key === themeConfig.value.primaryColor) || PRIMARY_COLORS[0]
    const radiusDef = RADIUS_PRESETS.find(r => r.value === themeConfig.value.radius) || RADIUS_PRESETS[2]

    const styleEl = ensureThemeStyleElement()
    if (styleEl) {
      styleEl.innerHTML = `
        :root {
          --radius: ${radiusDef.rem};
          --primary: ${colorDef.light.primary};
          --ring: ${colorDef.light.ring};
          --primary-foreground: ${colorDef.light.primaryForeground};
        }
        .dark {
          --primary: ${colorDef.dark.primary};
          --ring: ${colorDef.dark.ring};
          --primary-foreground: ${colorDef.dark.primaryForeground};
        }
      `
    }

    // Set dataset attribute for inspection
    document.documentElement.dataset.themeColor = colorDef.key
    document.documentElement.dataset.themeRadius = radiusDef.value
    document.documentElement.dataset.contentWidth = themeConfig.value.contentWidth
  }

  const setPrimaryColor = (color: PrimaryColorKey) => {
    themeConfig.value.primaryColor = color
  }

  const setRadius = (radius: RadiusKey) => {
    themeConfig.value.radius = radius
  }

  const setContentWidth = (width: ContentWidthKey) => {
    themeConfig.value.contentWidth = width
  }

  const resetThemeConfig = () => {
    themeConfig.value = { ...DEFAULT_CONFIG }
  }

  const toggleCustomizer = (open?: boolean) => {
    if (typeof open === 'boolean') {
      isCustomizerOpen.value = open
    } else {
      isCustomizerOpen.value = !isCustomizerOpen.value
    }
  }

  // Watch for changes and apply immediately
  watch(
    () => [themeConfig.value.primaryColor, themeConfig.value.radius, themeConfig.value.contentWidth],
    () => {
      applyTheme()
    },
    { immediate: true },
  )

  return {
    themeConfig,
    isCustomizerOpen,
    primaryColors: PRIMARY_COLORS,
    radiusPresets: RADIUS_PRESETS,
    setPrimaryColor,
    setRadius,
    setContentWidth,
    resetThemeConfig,
    toggleCustomizer,
    applyTheme,
  }
}
