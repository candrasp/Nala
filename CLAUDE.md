# CLAUDE.md — Nala Project AI Guardrails

This file defines the strict, high-priority guardrails and behavioral constraints for Claude Code working on the **Nala** project.

---

## 🛑 Strict Rules (Enforced on Every Invocation)

1. **No Automatic Build:** NEVER run `pnpm build` or `npm run build` after writing or modifying code. Transpilation/build checks are only performed when explicitly requested by the user.
2. **No Unauthorized Git Operations:** NEVER run `git add`, `git commit`, or `git push` autonomously. Git commands are strictly executed only upon explicit user instruction.
3. **English Standard (UI & Code Comments):** All user-facing UI text, form labels, validation/error messages, toast notifications, and in-code comments (JSDoc/inline notes in `.vue` and `.ts` files) MUST be written in **English**.
4. **Strict Vue 3 & TypeScript Hygiene:** Always use Composition API `<script setup lang="ts">`. Never use Options API. Never use `any` type — define explicit TypeScript interfaces for all props, emits, and API payloads.
5. **Tailwind CSS v4 Sizing Scale:** Prioritize built-in scale classes (e.g. `w-75`, `max-h-75`, `max-w-120`, `gap-3`) over arbitrary brackets (`max-h-[300px]`).
6. **Package Installation Confirmation:** NEVER install new npm packages autonomously. Always ask the user directly in chat for approval before running `pnpm add`.
7. **Single SPA Architecture:** This repository is a pure Single Page Application (non-monorepo). Do not create `pnpm-workspace.yaml`. All dependency configurations are managed in `package.json`.
8. **Dialog / Modal Accessibility Standard:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.

---

## 📚 Deep Technical Blueprints & Component Catalog

For the exhaustive 34+ UI Primitive Component Catalog, Auto-Import Matrix, Axios Service Layer, Safe DEV Mock Fallback, Pinia Store patterns, and end-to-end CRUD scaffolding blueprints, refer to the **`nala-project` skill** located at:
👉 [`.claude/skills/nala-project/SKILL.md`](.claude/skills/nala-project/SKILL.md)
