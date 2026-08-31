# CLAUDE.md — Nala Project AI Guardrails

This file defines the strict, high-priority guardrails and behavioral constraints for AI agents working on the **Nala** project.

---

## 🛑 Strict Rules (Enforced on Every Invocation)

1. **No Automatic Build:** NEVER run `pnpm build` or `npm run build` after writing or modifying code. Transpilation/build checks are only performed when explicitly requested by the user.
2. **No Automatic Unit Tests:** NEVER run `vitest`, `pnpm test`, `pnpm test:run`, or `npm test` autonomously after writing or modifying code. Unit tests are strictly executed only upon explicit user instruction.
3. **No Unauthorized Git Operations:** NEVER run `git add`, `git commit`, or `git push` autonomously. Git commands are strictly executed only upon explicit user instruction.
4. **English Standard (UI & Code Comments):** All user-facing UI text, form labels, validation/error messages, toast notifications, and in-code comments (JSDoc/inline notes in `.vue` and `.ts` files) MUST be written in **English**.
5. **Strict Vue 3 & TypeScript Hygiene:** Always use Composition API `<script setup lang="ts">`. Never use Options API. Never use `any` type — define explicit TypeScript interfaces for all props, emits, and API payloads.
6. **Tailwind CSS v4 Standard & Syntax Compliance:**
   - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER use legacy v3 `bg-gradient-to-*`).
   - **Sizing Scale:** NEVER write arbitrary bracket sizing like `max-w-[170px]`, `w-[300px]`, or `p-[1px]`. ALWAYS use Tailwind v4 scale (`max-w-44`, `max-w-28`, `w-75`, `max-h-75`, `p-px`).
   - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
7. **Package Installation Confirmation:** NEVER install new npm packages autonomously. Always ask the user directly in chat for approval before running `pnpm add`.
8. **Workspace Monorepo Architecture:** This repository is a `pnpm` monorepo defined in `pnpm-workspace.yaml`. Main application packages reside under `packages/showcase/` (full demo app) and `packages/create-nala/` (scaffolding CLI & clean template). Root scripts delegate to workspace filters.
9. **Dialog / Modal Accessibility Standard:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.
10. **Synchronized Version Bump Protocol:** Whenever requested to bump or update the project version, the AI agent MUST atomically update the version across all relevant `package.json` files simultaneously:
    - `package.json` (Root monorepo)
    - `packages/showcase/package.json` (`@nala/showcase`)
    - `packages/create-nala/package.json` (`create-nala` CLI)
    - `packages/create-nala/template/package.json` (User starter template)
    Never update only one package.json and omit the others.

---

## 📚 Deep Technical Blueprints & Component Catalog

For the exhaustive 34+ UI Primitive Component Catalog, Auto-Import Matrix, Axios Service Layer, Safe DEV Mock Fallback, Pinia Store patterns, and end-to-end CRUD scaffolding blueprints, refer to the **`nala-project` skill** located at:
👉 [`.agents/skills/nala-project/SKILL.md`](.agents/skills/nala-project/SKILL.md)

