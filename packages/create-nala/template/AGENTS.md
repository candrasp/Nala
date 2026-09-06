# AGENTS.md — AI Coding Assistant Guidelines & Guardrails

> This document defines the strict architectural standards and rules for AI coding assistants (Antigravity, Cursor, Claude Code, GitHub Copilot, Roo Code, Windsurf) working on this **Nala** application.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 🛑 Strict Rules (MUST FOLLOW)

1. **Direct & Fluff-Free Responses (Token Efficiency):** Do not use conversational filler, pleasantries, apologies, or verbose preambles. Deliver direct, concise, and technically focused answers and code diffs to conserve tokens.
2. **Surgical & Focused Edits:** Only modify files directly related to the developer's explicit request. Do not arbitrarily refactor untouched files.
3. **Strict Composition API:** ALWAYS use `<script setup lang="ts">`. NEVER use the Options API.
4. **Strict TypeScript Hygiene:** NEVER use `any`. Always define explicit TypeScript interfaces for props, emits, and API payloads.
5. **English Standard:** All user-facing UI text, form labels, error messages, toast notifications, and in-code comments (JSDoc/inline notes) MUST be written in **English**.
6. **Auto-Import Awareness:** Do NOT manually import Vue reactivity (`ref`, `computed`, `watch`, `onMounted`), Vue Router (`useRouter`, `useRoute`), Pinia (`defineStore`), or UI Primitives (`Button`, `Card`, `Dialog`, etc.) — they are auto-imported. Only explicitly import Lucide icons, `toast` (`@/components/ui/sonner`), `apiClient`, and `zod`.
7. **Semantic Color & Token System:** NEVER use arbitrary palette classes like `text-gray-500` or `bg-blue-600`. ALWAYS use semantic tokens: `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`.
8. **Tailwind CSS v4 Compliance:**
   - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER use legacy v3 `bg-gradient-to-*`).
   - **Sizing Scale:** NEVER write arbitrary bracket sizing like `max-w-[170px]`, `w-[300px]`, or `p-[1px]`. ALWAYS use Tailwind v4 scale (`max-w-44`, `max-w-28`, `w-75`, `max-h-75`, `p-px`, `size-4` / `size-5` for icons).
   - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
9. **No Scoped Styles:** Use Tailwind CSS utility classes instead of `<style scoped>`.
10. **Package Installation:** NEVER install new npm packages autonomously. Always ask the developer for confirmation before running `pnpm add` or `npm install`.
11. **Dialog Accessibility:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.
12. **No Automatic Builds / Tests:** Do not run `pnpm build`, `npm run build`, `vitest`, or `pnpm test` autonomously after code generation unless explicitly instructed.
13. **No Unauthorized Git Operations:** NEVER run `git add`, `git commit`, or `git push` autonomously. Git commands are strictly executed only upon explicit user instruction.

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
| Shared Components (`PageHeader`, `EmptyState`, `AppLogo`, `BrandIcon`) | ✅ Yes | Use directly in template: `<PageHeader>`, `<BrandIcon name="google" />` |
| Lucide Icons (`Plus`, `Search`, `Trash2`, etc.) | ⚠️ **No** | `import { Plus, Search } from '@lucide/vue'` |
| Toast Notifications (`toast`) | ⚠️ **No** | `import { toast } from '@/components/ui/sonner'` |
| API Client (`apiClient`) | ⚠️ **No** | `import { apiClient } from '@/lib/axios'` |
| Form Validation (`zod`, `useForm`) | ⚠️ **No** | `import { z } from 'zod'`, `import { useForm } from 'vee-validate'` |

---

## 📦 UI Primitives Catalog (`src/components/ui/`)

All 46 primitive components in `src/components/ui/` are globally registered and ready to use:
- `Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Calendar`
- `Card`, `Chart`, `Checkbox`, `Collapsible`, `Command`, `ContextMenu`, `DatePicker`, `Dialog`
- `DropdownMenu`, `Editor` (`RichTextEditor`), `Form` (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`)
- `HoverCard`, `Input`, `Kbd`, `Label`, `LoadingBar`, `Pagination`, `PinInput`, `Popover`, `Progress`
- `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Slider`
- `Sonner` (`toast`), `Stepper`, `Switch`, `Table`, `Tabs`, `Textarea`, `Timeline`, `Toggle`, `ToggleGroup`, `Tooltip`

---

## 🚀 Standard Development Workflow (New Features & Scaffolding)

When building new features or views in this application:

1. **New Views & Pages:**
   - Create new views under `src/views/<feature>/<Feature>View.vue`.
   - Use `src/views/_starter/BlankView.vue` as the canonical starting point.
   - Always start pages with `<PageHeader title="..." description="..." />`.
   - Use `<EmptyState />` inside table or card bodies when data is empty.
2. **Routing Integration:**
   - Register routes in `src/router/index.ts` under the appropriate layout:
     - Authenticated dashboard views ➔ child of `AdminLayout` (`/`).
     - Public / auth views ➔ child of `AuthLayout` or `AuthSplitLayout` (`/auth/*`).
3. **Navigation Links:**
   - Add menu items into `src/components/layout/AppSidebar.vue` inside the relevant navigation section.
4. **Service & State Management:**
   - Place typed API methods in `src/services/<feature>.service.ts` using `apiClient` (`@/lib/axios`).
   - Create Pinia Setup Stores in `src/stores/<feature>.ts` (`defineStore('name', () => { ... })`).

---

For deep blueprints on adding new features and services, see [`.agents/skills/nala-project/SKILL.md`](./.agents/skills/nala-project/SKILL.md).
