# AGENTS.md — AI Coding Assistant Guidelines & Guardrails

> This document defines the strict architectural standards and rules for AI coding assistants (Antigravity, Cursor, Claude Code, GitHub Copilot, Roo Code, Windsurf) working on this **Nala** application.

---

## 🛑 Strict Rules (MUST FOLLOW)

1. **Strict Composition API:** ALWAYS use `<script setup lang="ts">`. NEVER use the Options API.
2. **Strict TypeScript Hygiene:** NEVER use `any`. Always define explicit TypeScript interfaces for props, emits, and API payloads.
3. **English Standard:** All user-facing UI text, form labels, error messages, toast notifications, and in-code comments (JSDoc/inline notes) MUST be written in **English**.
4. **Tailwind CSS v4 Compliance:**
   - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER use legacy v3 `bg-gradient-to-*`).
   - **Sizing Scale:** NEVER write arbitrary bracket sizing like `max-w-[170px]`, `w-[300px]`, or `p-[1px]`. ALWAYS use Tailwind v4 scale (`max-w-44`, `max-w-28`, `w-75`, `max-h-75`, `p-px`).
   - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
5. **No Scoped Styles:** Use Tailwind CSS utility classes instead of `<style scoped>`.
6. **Package Installation:** NEVER install new npm packages autonomously. Always ask the developer for confirmation before running `pnpm add` or `npm install`.
7. **Dialog Accessibility:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.
8. **No Automatic Builds / Tests:** Do not run `pnpm build` or `pnpm test` autonomously after code generation unless explicitly instructed.

---

## ⚡ Auto-Import Matrix

The following modules are auto-imported via `unplugin-auto-import` and `unplugin-vue-components`:

| Category | Auto-Imported? | How to Use |
|---|:---:|---|
| Vue Reactivity (`ref`, `computed`, `watch`, `onMounted`, etc.) | ✅ Yes | Use directly: `const count = ref(0)` |
| Vue Router (`useRoute`, `useRouter`) | ✅ Yes | Use directly: `const router = useRouter()` |
| VueUse (`useColorMode`, `useLocalStorage`, etc.) | ✅ Yes | Use directly: `const mode = useColorMode()` |
| Pinia (`defineStore`, `storeToRefs`) | ✅ Yes | Use directly: `defineStore(...)` |
| UI Components (`Button`, `Card`, `Dialog`, `Input`, `Table`, etc.) | ✅ Yes | Use directly in template: `<Button>`, `<Card>` |
| Lucide Icons (`Plus`, `Search`, `Trash2`, etc.) | ⚠️ **No** | `import { Plus, Search } from '@lucide/vue'` |
| Toast Notifications (`toast`) | ⚠️ **No** | `import { toast } from '@/components/ui/sonner'` |
| API Client (`apiClient`) | ⚠️ **No** | `import { apiClient } from '@/lib/axios'` |
| Form Validation (`zod`, `useForm`) | ⚠️ **No** | `import { z } from 'zod'`, `import { useForm } from 'vee-validate'` |

---

## 📦 UI Primitives Catalog (`src/components/ui/`)

All 45 primitive components in `src/components/ui/` are globally registered and ready to use:
- `Button`, `Badge`, `Avatar`, `Breadcrumb`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`
- `Form` (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`)
- `Input`, `InputGroup`, `InputIcon`, `InputAddon`, `PinInput`, `Textarea`, `Select`, `Switch`
- `Table`, `Tabs`, `Sheet`, `Popover`, `Progress`, `Skeleton`, `Slider`, `Tooltip`, `Toaster`

For deep blueprints on adding new features and services, see [`.agents/skills/nala-project/SKILL.md`](./.agents/skills/nala-project/SKILL.md).
