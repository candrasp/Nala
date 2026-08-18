# Roadmap

This document outlines the planned development direction for **Nala** — a Vue 3 Admin Dashboard Template.

> Items marked ✅ are already shipped. Items marked 🔄 are in progress. Items marked 📋 are planned.

---

## ✅ v0.1 — Foundation

- [x] Vite + Vue 3 + TypeScript project scaffold
- [x] Tailwind CSS v4 integration
- [x] Reka UI / shadcn-vue component library (27 primitives)
- [x] Pinia state management with mock auth store
- [x] Vue Router with nested layout structure
- [x] `AdminLayout` — sidebar + top navbar shell
- [x] `AuthLayout` — centered auth pages
- [x] OKLCH dark mode design token system
- [x] Auth pages: Login, Register, Forgot Password, Reset Password, Verify OTP
- [x] Quick Search palette (Ctrl + K)
- [x] Notification drawer (Sheet)
- [x] User profile dropdown with theme switcher
- [x] Sidebar collapsible icon mode + mode control (hover / locked / floating)

---

## ✅ v0.2 — Core Pages

- [x] **Dashboard** — KPI cards, sparklines, transactions table, activity feed, system health
- [x] **User Management** — CRUD modals, search & filter, 2FA badges, pagination
- [x] **Settings** — 4 tabs: Profile, Security, Notifications, API Keys
- [x] **UI Showcase: Buttons** — all variants, sizes, loading, icon buttons
- [x] **UI Showcase: Forms** — text inputs, password toggle, prefix addon, selects, textarea, switches, checkboxes
- [x] **UI Showcase: Modals & Dialogs** — basic, form, destructive, fullscreen, drawer
- [x] **UI Showcase: Cards** — metric, list, pricing, interactive variants
- [x] **UI Showcase: Data Tables** — TanStack Table with sort, filter, pagination
- [x] **UI Showcase: Overlays** — Sheet, Tooltip, Popover, Dropdown
- [x] **UI Showcase: Feedback** — Skeleton, progress, alert banners, empty states
- [x] **UI Showcase: Navigation** — Tabs, breadcrumbs, side nav, accordion
- [x] **UI Showcase: Badges & Avatars** — semantic badges, pulse dots, avatar stack
- [x] **UI Showcase: Toast & Alerts** — all Sonner variants (success, error, undo, async)

---

## ✅ v0.3 — DX & Visualization

- [x] Auto-imports via `unplugin-auto-import` + `unplugin-vue-components`
- [x] Central UI barrel export `src/components/ui/index.ts`
- [x] Blank Starter Page template
- [x] **Date Picker** — single date + date range, zero dependencies
- [x] **UI Showcase: Charts & Analytics** — area chart, bar chart, donut ring, live latency stream
- [x] `AdminLayout.vue` import cleanup (50+ lines removed)
- [x] CHANGELOG.md

---

## ✅ v0.4 — Form Completeness

- [x] **Radio Group** — single-select radio buttons & card plan selectors
- [x] **Range Slider** — draggable continuous range input with live value badges
- [x] **Number Stepper** — increment/decrement input with min/max clamping
- [x] **Combobox** — searchable select with autocomplete and category badges
- [x] **Multi-select Tags** — select and remove multiple options as dismissible chip tags
- [x] **File Upload / Drop Zone** — drag & drop area with preview, progress bar, and remove action
- [x] Integrated all controls into `src/views/components/FormView.vue`

---

## ✅ v0.5 — Navigation & Flow Components

- [x] **Stepper / Wizard** — multi-step progress indicator with interactive step navigation
- [x] **Tabs (Vertical)** — vertical side tab layout variant with icons and badges
- [x] **Timeline / Activity Log** — vertical chronological event list with status node markers
- [x] **Command Palette Showcase** — inline command executor with hotkey mapping
- [x] **Keyboard Shortcut `<Kbd>`** — styled keyboard shortcut display primitive
- [x] Integrated all patterns into `src/views/components/NavigationView.vue`

---

## ✅ v0.6 — Design System Reference

- [x] **Typography Page** (`/components/typography`) — heading scale (H1–H6), paragraph sizes, code blocks, blockquotes, lists
- [x] **Color Tokens Page** (`/components/colors`) — semantic color palette chips (`--primary`, `--destructive`, `--muted`, etc.) with OKLCH values and usage guide
- [x] **Icons Page** (`/components/icons`) — searchable grid of all used `@lucide/vue` icons with copy-to-clipboard name
- [x] **Spacing & Sizing Scale** — visual reference for Tailwind v4 spacing and sizing tokens

---

## ✅ v0.7 — Error & Edge Case Pages

- [x] **404 Not Found** page (`src/views/errors/NotFoundView.vue`) — illustrated empty state, recovery actions, popular links
- [x] **500 Server Error** page (`src/views/errors/ServerErrorView.vue`) — trace ID chip, retry simulation, telemetry link
- [x] **403 Access Denied / Unauthorized** (`src/views/errors/UnauthorizedView.vue`) — polished permission guidance
- [x] Catch-all wildcard `/:pathMatch(.*)*` route routing unmatched URLs to 404
- [x] Explicit error routes `/errors/404`, `/errors/500`, `/errors/403` registered in router & search palette

---

## 📋 v0.8 — Real API Integration Layer

> Target: Drop-in ready for a real backend

- [ ] **Axios instance** with base URL, auth header injection, and response interceptor
- [ ] **Request loading state** — global loading indicator on route transitions
- [ ] **Error toast** on failed API calls (auto-caught by interceptor)
- [ ] **Token refresh** — silent re-auth flow using refresh token
- [ ] Example: wire User Management CRUD to a REST endpoint
- [ ] `src/services/` directory with typed API service modules

---

## 📋 v1.0 — Open Source Release

> Target: Clean, documented, and GitHub-ready

- [ ] Comprehensive `README.md` with feature list, screenshots, setup guide, and contribution guide
- [ ] Live demo deployment (Vercel / Netlify)
- [ ] All `TODO:` and `FIXME:` comments resolved
- [ ] All TypeScript errors resolved (strict `vue-tsc` pass)
- [ ] License file (`MIT`)
- [ ] GitHub repository setup: issue templates, PR template, `.github/` directory
- [ ] Dependabot auto-update configuration

---

## 💡 Future Ideas (Backlog)

| Idea | Notes |
|---|---|
| Dark/Light mode preview panel | Real-time side-by-side comparison |
| Mobile-first responsive audit | Verify all views on 375px viewport |
| `<Kanban>` board | Drag-and-drop card columns |
| Internationalization (i18n) | `vue-i18n` integration with locale switcher |
| Analytics integration | Plausible / PostHog event tracking |
| PWA support | Service worker + offline mode |
| Component copy-to-clipboard | Click to copy component source code from showcase pages |
| Storybook integration | Interactive component documentation |

---

*Last updated: 2026-08-18 · Nala v0.3.0*
