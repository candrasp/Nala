import type { InjectionKey } from "vue"
import type { ToggleVariants } from "@/components/ui/toggle"

export { default as ToggleGroup } from "./ToggleGroup.vue"
export { default as ToggleGroupItem } from "./ToggleGroupItem.vue"

export interface ToggleGroupContext {
  size?: ToggleVariants["size"]
  variant?: ToggleVariants["variant"]
}

export const TOGGLE_GROUP_INJECTION_KEY: InjectionKey<ToggleGroupContext> = Symbol("ToggleGroupContext")
