# CLAUDE.md — Nala Project AI Guardrails

This file defines the strict, high-priority guardrails and behavioral constraints for AI agents working on the **Nala** project.

---

## 🛑 Strict Rules (Enforced on Every Invocation)

1. **Direct & Fluff-Free Responses (Token Efficiency):** Never use conversational filler, pleasantries, apologies, or verbose preambles. Deliver concise, direct, and actionable technical deliverables to conserve tokens.
2. **Monorepo Working Target:** 
   - **Default Target:** All new views, pages, showcase features, and demo stores belong strictly in `packages/showcase/`.
   - **Template Isolation:** Never add showcase/demo views into `packages/create-nala/template/` unless explicitly requested. Only universal UI primitives and core layouts are synchronized to the template.
3. **Surgical & Focused Edits:** Only modify files directly related to the user's explicit request. Do not arbitrarily refactor untouched files.
4. **No Automatic Build / Tests:** NEVER run `pnpm build`, `npm run build`, `vitest`, or `pnpm test` autonomously. Transpilation/build/test checks are only performed upon explicit user instruction.
5. **No Unauthorized Git Operations:** NEVER run `git add`, `git commit`, or `git push` autonomously.
6. **English Standard (UI & Code Comments):** All UI strings, form labels, validation/error messages, toasts, and in-code comments MUST be in **English**.
7. **Strict Vue 3 & TypeScript Hygiene:** Always use Composition API `<script setup lang="ts">`. Never use Options API or `any`. Define strict TypeScript interfaces for all props, emits, and API payloads.
8. **Auto-Import Awareness:** Do NOT manually import Vue reactivity (`ref`, `computed`, `watch`, `onMounted`), Vue Router (`useRouter`, `useRoute`), Pinia (`defineStore`), or UI Primitives (`Button`, `Card`, `Dialog`, etc.) — they are auto-imported. Only explicitly import Lucide icons, `toast` (`@/components/ui/sonner`), `apiClient`, and `zod`.
9. **Semantic Color & Token System:** NEVER use arbitrary palette classes like `text-gray-500` or `bg-blue-600`. ALWAYS use semantic tokens: `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`.
10. **Tailwind CSS v4 Standard:**
    - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER `bg-gradient-to-*`).
    - **Sizing Scale:** NEVER write arbitrary bracket sizes (`w-[300px]`, `p-[1px]`). Use v4 tokens (`max-w-44`, `w-75`, `p-px`, `size-4` / `size-5` for icons).
    - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
    - **No Scoped Styles:** Use Tailwind CSS utility classes instead of `<style scoped>`.
11. **Package Installation Confirmation:** NEVER install npm packages autonomously without prior user confirmation in chat.
12. **Dialog / Modal Accessibility Standard:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) for Reka UI ARIA compliance.
13. **Synchronized Version Bump Protocol:** Atomically update versions across all 4 `package.json` files simultaneously (`root`, `showcase`, `create-nala`, and `template`).

---

## 📚 Deep Technical Blueprints & Component Catalog

For the exhaustive 45+ UI Primitive Component Catalog, Auto-Import Matrix, Axios Service Layer, Safe DEV Mock Fallback, Pinia Store patterns, and end-to-end CRUD scaffolding blueprints, refer to the **`nala-project` skill** located at:
👉 [`.agents/skills/nala-project/SKILL.md`](.agents/skills/nala-project/SKILL.md)
