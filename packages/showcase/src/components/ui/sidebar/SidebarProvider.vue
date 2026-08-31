<script setup lang="ts">
import type { HTMLAttributes, Ref } from "vue"
import { defaultDocument, useEventListener, useMediaQuery, useVModel } from "@vueuse/core"
import { TooltipProvider } from "reka-ui"
import { computed, ref } from "vue"
import { cn } from "@/lib/utils"
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, type SidebarControlMode } from "./utils"

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  open?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: !defaultDocument?.cookie.includes(`${SIDEBAR_COOKIE_NAME}=false`),
  open: undefined,
})

const emits = defineEmits<{
  "update:open": [open: boolean]
}>()

const isMobile = useMediaQuery("(max-width: 768px)")
const openMobile = ref(false)

const open = useVModel(props, "open", emits, {
  defaultValue: props.defaultOpen ?? false,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>

const getSavedMode = (): SidebarControlMode => {
  if (typeof document === 'undefined') return 'expanded'
  const match = document.cookie.match(/sidebar_mode=([^;]+)/)
  if (match && ['expanded', 'hover'].includes(match[1])) {
    return match[1] as SidebarControlMode
  }
  return open.value ? 'expanded' : 'hover'
}

const sidebarMode = ref<SidebarControlMode>(getSavedMode())
const isHovered = ref(false)
const isMenuOpen = ref(false)

function setSidebarMode(mode: SidebarControlMode) {
  sidebarMode.value = mode
  document.cookie = `sidebar_mode=${mode}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  if (mode === "expanded") {
    setOpen(true)
  } else if (mode === "hover") {
    setOpen(false)
  }
}

function setIsHovered(val: boolean) {
  isHovered.value = val
}

function setIsMenuOpen(val: boolean) {
  isMenuOpen.value = val
  if (val) {
    isHovered.value = true
  }
}

function setOpen(value: boolean) {
  open.value = value // emits('update:open', value)

  // This sets the cookie to keep the sidebar state.
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

function setOpenMobile(value: boolean) {
  openMobile.value = value
}

// Helper to toggle the sidebar.
function toggleSidebar() {
  if (isMobile.value) {
    setOpenMobile(!openMobile.value)
  } else {
    const nextMode = sidebarMode.value === 'expanded' ? 'hover' : 'expanded'
    setSidebarMode(nextMode)
  }
}

useEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
})

// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = computed(() => {
  if (sidebarMode.value === "hover") {
    return (isHovered.value || isMenuOpen.value) ? "expanded" : "collapsed"
  }
  return open.value ? "expanded" : "collapsed"
})

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
  sidebarMode,
  setSidebarMode,
  isHovered,
  setIsHovered,
  isMenuOpen,
  setIsMenuOpen,
})
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div
      data-slot="sidebar-wrapper"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      }"
      :class="cn('group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </TooltipProvider>
</template>
