# CLAUDE.md — Nala Application AI Guardrails

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

## 🛑 Strict Rules (Enforced on Every Invocation)

1. **Direct & Fluff-Free Responses (Token Efficiency):** Never use conversational filler, pleasantries, apologies, or verbose preambles. Deliver concise, direct, and actionable technical deliverables to conserve tokens.
2. **Surgical & Focused Edits:** Only modify files directly related to the user's explicit request. Do not arbitrarily refactor untouched files.
3. **No Automatic Build / Tests:** NEVER run `pnpm build`, `npm run build`, `vitest`, or `pnpm test` autonomously.
4. **No Unauthorized Git Operations:** NEVER run `git add`, `git commit`, or `git push` autonomously.
5. **English Standard (UI & Code Comments):** All UI strings, form labels, validation/error messages, toasts, and in-code comments MUST be in **English**.
6. **Strict Vue 3 & TypeScript Hygiene:** Always use Composition API `<script setup lang="ts">`. Never use Options API or `any`. Define strict TypeScript interfaces for all props, emits, and API payloads.
7. **Auto-Import Awareness:** Do NOT manually import Vue reactivity (`ref`, `computed`, `watch`, `onMounted`), Vue Router (`useRouter`, `useRoute`), Pinia (`defineStore`), or UI Primitives (`Button`, `Card`, `Dialog`, etc.) — they are auto-imported. Only explicitly import Lucide icons, `toast` (`@/components/ui/sonner`), `apiClient`, and `zod`.
8. **Semantic Color & Token System:** NEVER use arbitrary palette classes like `text-gray-500` or `bg-blue-600`. ALWAYS use semantic tokens: `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`.
9. **Tailwind CSS v4 Standard:**
   - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER `bg-gradient-to-*`).
   - **Sizing Scale:** NEVER write arbitrary bracket sizes (`w-[300px]`, `p-[1px]`). Use v4 tokens (`max-w-44`, `w-75`, `p-px`, `size-4` / `size-5` for icons).
   - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
   - **No Scoped Styles:** Use Tailwind CSS utility classes instead of `<style scoped>`.
10. **Package Installation Confirmation:** NEVER install npm packages autonomously without prior user confirmation in chat.
11. **Dialog / Modal Accessibility Standard:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.

---

## 📚 Deep Technical Blueprints & Component Catalog

For the complete 45+ Reka UI Primitives, Shared Components (`PageHeader`, `EmptyState`, `AppLogo`), Auto-Import Matrix, Axios Service Layer, Pinia Store patterns, and end-to-end CRUD scaffolding blueprints, refer to the **`nala-project` skill** located at:
👉 [`.agents/skills/nala-project/SKILL.md`](.agents/skills/nala-project/SKILL.md)
