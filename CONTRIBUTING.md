# Contributing to Nala

Thank you for your interest in contributing to **Nala**! 🎉

This guide is for **external contributors**. If you are a project maintainer or core team member, see [DEVELOPMENT.md](./DEVELOPMENT.md) for the full internal workflow.

---

## 📋 Table of Contents

- [Repository Overview](#-repository-overview)
- [Types of Contributions](#-types-of-contributions)
- [Getting Started](#-getting-started)
- [Branch Naming Convention](#-branch-naming-convention)
- [Commit Message Format](#-commit-message-format)
- [Pull Request Guidelines](#-pull-request-guidelines)
- [Code Standards](#-code-standards)
- [What NOT to Change](#-what-not-to-change)

---

## 🗂️ Repository Overview

This is a **pnpm monorepo** with two packages:

| Package | Path | Purpose |
|---|---|---|
| `@nala/showcase` | `packages/showcase/` | Full enterprise demo app (44+ components, 20+ views) |
| `create-nala` | `packages/create-nala/` | Scaffolding CLI published to npm |

> Most UI contributions go into `packages/showcase/`. Changes to `packages/create-nala/template/` (the starter template) require explicit discussion first.

---

## 🤝 Types of Contributions

We welcome:

- ✅ **Bug fixes** — UI regressions, component prop issues, accessibility problems
- ✅ **New UI Components** — Add to `packages/showcase/src/components/ui/`
- ✅ **New Showcase Views** — Add demo pages to `packages/showcase/src/views/`
- ✅ **Documentation improvements** — Fix typos, clarify guides, update examples
- ✅ **Accessibility improvements** — ARIA labels, keyboard navigation, focus management

Please **open an issue first** before starting work on:
- New features that change the template's structure
- Changes to `packages/create-nala/template/` (starter template)
- New dependencies

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v20+**
- [pnpm](https://pnpm.io/) **v9+**

```bash
npm install -g pnpm
```

### Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/<your-username>/Nala.git
cd nala

# 2. Add upstream remote
git remote add upstream https://github.com/candrasp/Nala.git

# 3. Install workspace dependencies
pnpm install

# 4. Start the showcase dev server
pnpm dev
```

---

## 🌿 Branch Naming Convention

Always branch off from `main`:

```bash
git checkout -b <type>/<short-description>
```

| Type | When to use | Example |
|---|---|---|
| `feat/` | New component or feature | `feat/accordion-component` |
| `fix/` | Bug fix | `fix/badge-overflow-dark-mode` |
| `docs/` | Documentation only | `docs/update-api-guide` |
| `chore/` | Config, tooling, CI | `chore/update-pnpm-version` |
| `refactor/` | Code restructure (no behavior change) | `refactor/sidebar-composable` |

---

## 📝 Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>
```

**Types:** `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`

**Scope** (optional): component name, package, or area (e.g. `button`, `sidebar`, `cli`, `docs`)

**Examples:**

```
feat(badge): add 'outline' variant with border ring
fix(sidebar): prevent collapsed icon tooltip flickering on hover
docs(mocking): clarify safe DEV mock fallback behavior
chore(deps): upgrade reka-ui to 2.2.0
```

> ⚠️ **Do NOT use generic messages** like `fix bug`, `update file`, or `changes`.

---

## 📬 Pull Request Guidelines

1. **Keep PRs focused** — One feature or fix per PR. Avoid mixing unrelated changes.
2. **Fill out the PR template** — Describe what was changed and why.
3. **Reference issues** — If your PR closes an issue, add `Closes #123` in the description.
4. **Self-review first** — Run `pnpm test:run` and check for TypeScript errors with `pnpm build` before submitting.
5. **Screenshots for UI changes** — Attach before/after screenshots for any visual change.

---

## 🧹 Code Standards

These rules are enforced for all contributions. **PRs that violate them will be requested to change.**

### Vue 3 / TypeScript
- ✅ Always use `<script setup lang="ts">` (Composition API)
- ❌ Never use Options API (`data()`, `methods:`, `computed:`)
- ❌ Never use `any` type — define explicit TypeScript interfaces for all props, emits, and API payloads

### Tailwind CSS v4 Syntax
- ✅ Gradients: `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr`
- ❌ Never use legacy v3 gradient syntax (`bg-gradient-to-*`)
- ✅ Use Tailwind scale: `max-w-44`, `w-75`, `p-px`
- ❌ Never use arbitrary bracket sizing: `max-w-[170px]`, `w-[300px]`
- ✅ Shadows: `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`

### Reka UI / ARIA
- Every `<DialogContent>` **MUST** include `<DialogTitle>` and `<DialogDescription>`
- Use `class="sr-only"` on those elements if they should be visually hidden
- Never suppress ARIA warnings by removing elements — fix them properly

### Comments & Text
- All **code comments**, **JSDoc**, and **UI text** must be in **English**

---

## 🚫 What NOT to Change

To keep PRs mergeable and focused, please avoid:

- **`pnpm-lock.yaml`** — Only updated by maintainers during dependency bumps
- **`packages/create-nala/template/`** — Requires maintainer discussion first
- **`GEMINI.md` / `CLAUDE.md` / `AGENTS.md`** — AI guardrails managed by maintainers only
- **Root `package.json` scripts** — Infrastructure changes require maintainer review

---

## 💬 Questions?

Open a [GitHub Discussion](https://github.com/candrasp/Nala/discussions) or [file an issue](https://github.com/candrasp/Nala/issues/new/choose). We're happy to help!
