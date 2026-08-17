import type { ComputedRef, Ref } from "vue"
import { createContext } from "reka-ui"

export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3.5rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

export type SidebarControlMode = "expanded" | "collapsed" | "hover"

export const [useSidebar, provideSidebarContext] = createContext<{
  state: ComputedRef<"expanded" | "collapsed">
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  isMobile: Ref<boolean>
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
  sidebarMode: Ref<SidebarControlMode>
  setSidebarMode: (mode: SidebarControlMode) => void
  isHovered: Ref<boolean>
  setIsHovered: (value: boolean) => void
  isMenuOpen: Ref<boolean>
  setIsMenuOpen: (value: boolean) => void
}>("Sidebar")
