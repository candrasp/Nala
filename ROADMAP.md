# Nala — Project Roadmap

> Tracking the development progress and release milestones for the Nala Admin Dashboard Template.

---

## ✅ v0.1 — Foundation & Project Setup

- [x] Vite + Vue 3 (Composition API `<script setup lang="ts">`) initialized with `pnpm`
- [x] Tailwind CSS v4 configured via `@tailwindcss/vite` + `tw-animate-css`
- [x] shadcn-vue primitives integrated via `reka-ui`
- [x] `unplugin-auto-import` and `unplugin-vue-components` configured
- [x] Design token CSS variables (`oklch`) defined in `src/style.css`
- [x] Dynamic Theme Switcher (`light` / `dark` / `auto`) via `@vueuse/core`

---

## ✅ v0.2 — Core Shell & Layout

- [x] `AdminLayout.vue` shell with collapsible sidebar & mobile sheet drawer
- [x] `AuthLayout.vue` clean centered card layout with responsive safe paddings
- [x] Header Navbar with breadcrumb navigation, search trigger, and notifications sheet
- [x] Command Search Palette (`Ctrl+K` / `Cmd+K`) with fuzzy page navigation
- [x] Lucide icons integration across all layout elements

---

## ✅ v0.3 — Authentication Views Suite

- [x] **Login** (`src/views/auth/LoginView.vue`) — email/password, remember me, demo credentials
- [x] **Register** (`src/views/auth/RegisterView.vue`) — live password strength meter, terms checkbox
- [x] **Forgot Password** (`src/views/auth/ForgotPasswordView.vue`) — recovery email request with cooldown
- [x] **Reset Password** (`src/views/auth/ResetPasswordView.vue`) — token-based password reset
- [x] **Verify OTP** (`src/views/auth/VerifyOtpView.vue`) — 6-box segmented OTP input with auto-advance & paste
- [x] **Confirm Email** (`src/views/auth/ConfirmEmailView.vue`) — polling simulation & manual resend

---

## ✅ v0.4 — Admin Views & App Management

- [x] **Dashboard Overview** (`src/views/dashboard/IndexView.vue`) — KPI metrics, sparklines, area charts, recent activity
- [x] **User Management** (`src/views/users/IndexView.vue`) — search, role/status filters, CRUD dialog modals
- [x] **Settings Suite** (`src/views/settings/IndexView.vue`) — Profile, Security (2FA), Notifications, Appearance

---

## ✅ v0.5 — Comprehensive Component Showcase

- [x] **Buttons** (`src/views/components/ButtonView.vue`) — variants, sizes, icon combinations, loading states
- [x] **Form & Inputs** (`src/views/components/FormView.vue`) — inputs, select, date picker, switch, slider, stepper
- [x] **Modals & Dialogs** (`src/views/components/ModalView.vue`) — alert dialogs, confirm prompts, drawer sheets
- [x] **Cards & Surfaces** (`src/views/components/CardView.vue`) — edge-to-edge flush footers, stats cards
- [x] **Data Tables** (`src/views/components/TableView.vue`) — sorting, filtering, selection, pagination
- [x] **Overlays & Drawers** (`src/views/components/OverlayView.vue`) — tooltips, popovers, sheet panels
- [x] **Feedback & Loading** (`src/views/components/FeedbackView.vue`) — skeletons, alert banners, progress bars
- [x] **Badges & Avatars** (`src/views/components/BadgeAvatarView.vue`) — pill badges, status dots, avatar groups
- [x] **Toast Notifications** (`src/views/components/ToastView.vue`) — Sonner toast triggers (success, error, promise)
- [x] **Navigation & Flow** (`src/views/components/NavigationView.vue`) — tabs, breadcrumbs, steppers, pagination

---

## ✅ v0.6 — Data Visualization & Design System

- [x] **Charts & Analytics** (`src/views/components/ChartView.vue`) — pure SVG area, bar, donut, sparklines
- [x] **Color Tokens** (`src/views/components/ColorsView.vue`) — interactive palette tester with contrast badges
- [x] **Typography Scale** (`src/views/components/TypographyView.vue`) — display heading scale, code blocks, prose
- [x] **Icons Directory** (`src/views/components/IconsView.vue`) — category filter, keyword search, copy JSX/Vue tag
- [x] **Spacing & Sizing Scale** — visual reference for Tailwind v4 spacing and sizing tokens

---

## ✅ v0.7 — Error & Edge Case Pages

- [x] **404 Not Found** page (`src/views/errors/NotFoundView.vue`) — illustrated empty state, recovery actions, popular links
- [x] **500 Server Error** page (`src/views/errors/ServerErrorView.vue`) — trace ID chip, retry simulation, telemetry link
- [x] **403 Access Denied / Unauthorized** (`src/views/errors/UnauthorizedView.vue`) — polished permission guidance
- [x] Catch-all wildcard `/:pathMatch(.*)*` route routing unmatched URLs to 404
- [x] Explicit error routes `/errors/404`, `/errors/500`, `/errors/403` registered in router & search palette

---

## ✅ v0.8 — Real API Integration Layer

> Target: Drop-in ready for a real backend

- [x] **Axios instance** with base URL, auth header injection, and response interceptor (`src/lib/axios.ts`)
- [x] **Request loading state** — global loading indicator on route transitions (`src/components/ui/loading-bar/`)
- [x] **Error toast** on failed API calls (auto-caught by interceptor via `vue-sonner`)
- [x] **Token refresh** — silent re-auth flow using refresh token queue
- [x] Example: wire User Management CRUD to a REST endpoint (`src/views/users/IndexView.vue` + `userService`)
- [x] `src/services/` directory with typed API service modules (`auth.service.ts`, `user.service.ts`, `types.ts`)

---

## ✅ v1.0 — Open Source Release

> Target: Clean, documented, and GitHub-ready

- [x] Comprehensive `README.md` with feature list, screenshots, setup guide, and contribution guide
- [x] Comprehensive `DEPLOYMENT.md` guide for Vercel, Netlify, Cloudflare, GitHub Pages, Docker & VPS
- [x] All `TODO:` and `FIXME:` comments resolved (0 unresolved comments)
- [x] All TypeScript interfaces and types strictly defined
- [x] License file (`MIT` License in `LICENSE`)
- [x] GitHub repository setup: issue templates (`bug_report.md`, `feature_request.md`), PR template (`PULL_REQUEST_TEMPLATE.md`), CI workflow (`.github/workflows/ci.yml`)
- [x] Live demo deployment — **[https://nala.kenvano.web.id](https://nala.kenvano.web.id)** (Cloudflare Pages)

---

## ✅ v1.1 — In-App Interactive Documentation

> Target: Every component showcase page has live preview + copy-ready code snippets via the `CodePreview` component

### Core Infrastructure

- [x] `CodePreview.vue` reusable component (`src/components/CodePreview.vue`)
  - [x] View Code / Hide Code expandable toggle
  - [x] One Dark Pro syntax highlighting (tag, attribute, string, directive, interpolation, comment)
  - [x] Line number gutter with hover highlight
  - [x] Copy to clipboard with toast notification feedback

### Component Showcase Pages

- [x] **Buttons** (`ButtonView.vue`) — 9 sections fully wrapped in `CodePreview`
  - [x] Button Variants (default, secondary, destructive, outline, ghost, link)
  - [x] Outline Variants (semantic colors, muted, dashed, icon-only)
  - [x] Button Sizes (xs, sm, default, lg)
  - [x] Buttons with Icons (leading, trailing, icon-only square)
  - [x] States & Feedbacks (disabled, async loading spinner)
  - [x] Interactive Micro-actions (copy toggle, like toggle, segmented control)
  - [x] Button Groups (toolbar, split action)
  - [x] Full-Width Buttons
  - [x] Danger Confirm Pattern
- [x] **Cards & Surfaces** (`CardView.vue`)
  - [x] Basic card (header, content, footer)
  - [x] Stats / KPI card with indicator icons
  - [x] Flush edge-to-edge card with header/footer
  - [x] Interactive action card with hover lift
  - [x] Ambient glow (.glow-area) & Mesh background pattern
- [x] **Form & Inputs** (`FormView.vue`)
  - [x] Text input variants (with leading icon, password toggle, prefix/suffix addon, readonly)
  - [x] Select & Textarea (region group select, database select, multi-line auto textarea)
  - [x] Radio group & Plan card selectors
  - [x] Range sliders, number stepper & multi-select tags
  - [x] Searchable combobox & Drag-and-drop file upload zone
  - [x] Zero-dependency Date & Range picker
  - [x] Switches & Checkbox options list
- [x] **Badges & Avatars** (`BadgeAvatarView.vue`)
  - [x] Semantic badge variants (solid, outline, pills, color tints)
  - [x] Live status indicators with pulse dots
  - [x] Icon & Feature badges
  - [x] Interactive removable tags
  - [x] Avatar size scale (24px to 64px)
  - [x] Avatars with real-time presence indicators (online, DND, away, offline)
  - [x] Avatar group stack (overlapping team avatars)
- [x] **Modals & Dialogs** (`ModalView.vue`)
  - [x] Basic information dialog
  - [x] Confirm / alert dialog (destructive)
  - [x] Form in dialog
  - [x] Drawer/Sheet panel
- [x] **Overlays & Drawers** (`OverlayView.vue`)
  - [x] Tooltip (all four positions)
  - [x] Popover with rich content
  - [x] Hover card
  - [x] Sheet panel (left, right)
- [x] **Feedback & Loading** (`FeedbackView.vue`)
  - [x] Alert banner (info, success, warning, destructive)
  - [x] Skeleton loaders (text, card, table row)
  - [x] Progress bar (determinate & indeterminate)
  - [x] Spinner variants
- [x] **Toast Notifications** (`ToastView.vue`)
  - [x] Success / error / info / warning toast
  - [x] Promise toast (loading → success/error)
  - [x] Toast with action button
- [x] **Navigation & Flow** (`NavigationView.vue`)
  - [x] Tabs (default, underline, pill)
  - [x] Breadcrumb
  - [x] Pagination (numbered, prev/next)
  - [x] Stepper / multi-step wizard
- [x] **Data Tables** (`TableView.vue`)
  - [x] Basic table with headers
  - [x] Sortable columns
  - [x] Row selection & bulk actions toolbar
  - [x] Pagination + search filter combo
- [x] **Charts & Analytics** (`ChartView.vue`)
  - [x] Area chart (SVG)
  - [x] Bar chart (SVG)
  - [x] Donut / pie chart (SVG)
  - [x] Sparkline inline chart
- [x] **Typography Scale** (`TypographyView.vue`)
  - [x] Heading scale (h1–h6)
  - [x] Body text, lead, small, muted
  - [x] Inline code & code block
  - [x] Lists (ordered, unordered) & blockquote

---

## 🎨 v1.2 — Design System Ergonomics & Component Encapsulation

> **Audit Result (2026-08-19):** Repetitive utility class patterns found across the entire project — not just showcase views, but also production views (Dashboard, Settings, Users, Auth). Prioritized by severity (occurrence count & blast radius).

### 🔴 Priority 1 — Critical (Production views affected)

- [x] **`<PageHeader>` Reusable Component** (`src/components/PageHeader.vue`)
  - **18 views** currently repeat the same ~12-line boilerplate (`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between` + `label-mono` + `h1` + `p` structure)
  - Affected: ALL 14 showcase views + Dashboard, Settings, Users, BlankView
  - [x] Create `<PageHeader title description badge statusDot>` component with `#actions` slot
  - [x] Migrate all 18 views to use `<PageHeader>`

- [x] **`<Card flush>` Variant** (`src/components/ui/card/Card.vue`)
  - **50+ occurrences** of `class="overflow-hidden py-0 gap-0"` written manually across the entire codebase
  - Affected: Dashboard (5x), Settings (7x), Users (5x), Auth (4x), all showcase views
  - [x] Add `flush` boolean prop or `variant="flush"` to `Card.vue` via CVA
  - [x] Migrate all flush card usages to `<Card flush>`

### 🟡 Priority 2 — High (Inconsistency risk across multiple files)

- [x] **`<CardHeader>` Section Style Standardization** (`src/components/ui/card/CardHeader.vue`)
  - **30+ occurrences** of `class="p-6 border-b border-border bg-muted/10"` written manually
  - Affected: Settings (8x), Navigation (8x), Chart (4x), Typography (5x), Colors (3x), and others
  - [x] Add `section` boolean prop to `CardHeader.vue` that applies `p-6 border-b border-border bg-muted/10` automatically
  - [x] Migrate all section-style `CardHeader` usages

- [x] **`<InputIcon>` / `<InputGroup>` Primitives** (`src/components/ui/input/`)
  - **12 occurrences** of `class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"` for icon positioning
  - Affected: FormView (5x), RegisterView, LoginView, ForgotPasswordView, ResetPasswordView, VerifyOtpView (7x)
  - [x] Create `<InputGroup>` wrapper + `<InputIcon side="left|right">` slot primitive
  - [x] Create `<InputAddon side="left|right">` for prefix/suffix text addons (e.g. `https://`, `.supabase.co`)
  - [x] Migrate auth forms and FormView

### 🟢 Priority 3 — Medium (Scoped to showcase views)

- [x] **Badge Semantic Color Variants & Shape** (`src/components/ui/badge/index.ts`)
  - ~~Currently 6 inline `<span>` pill badges and 2 status dot badges in `BadgeAvatarView.vue` only~~
  - [x] Add color variants to `badgeVariants` CVA: `success` (emerald), `info` (blue), `warning` (amber)
  - [x] Add `shape` variant: `default` (rounded-md), `pill` (rounded-full px-2.5)
  - [x] Add integrated live status `dot` + `pulse` prop support

- [x] **`<AvatarGroup>` & Avatar Presence Props** (`src/components/ui/avatar/`)
  - ~~Currently 6 inline `<span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ...">` presence dots in `BadgeAvatarView.vue`~~
  - [x] Add `status: 'online' | 'busy' | 'away' | 'offline'` prop to `Avatar.vue`
  - [x] Create `<AvatarGroup max overlap>` component for stacked overlapping avatars

---

## ✅ v1.2.3 — Unit Testing Infrastructure

- [x] **Vitest + Testing Framework** (`vite.config.ts`, `tsconfig.app.json`, `package.json`)
  - Integrated Vitest v4 with `@vue/test-utils` and `happy-dom`
  - Added `test` (watch) and `test:run` (CI) npm scripts
- [x] **Core Test Suites**:
  - `src/lib/utils.spec.ts` — `cn()` utility class merging
  - `src/components/ui/button/Button.spec.ts` — Component behavior tests
  - `src/stores/auth.spec.ts` — Pinia store state management

---

## ✅ v1.2.4 — Enterprise Data Formatting Utilities

- [x] **Formatter Core** (`src/lib/formatters.ts`) — Native Intl API-based formatting:
  - Currency (multi-locale: IDR, USD, EUR, JPY, GBP)
  - Number, Compact number (1.5K, 2.4M, 2,5 jt)
  - Date & DateTime with date styles (`short` | `medium` | `long` | `full`)
  - Time-only (`fmt.time`) with `24h` / `12h` / `auto` clock options
  - Timezone support (WIB/WITA/WIT/UTC) via IANA string
  - Relative time (`"baru saja"`, `"5 menit yang lalu"`) with locale-aware "just now" phrase
  - Byte sizes with locale-aware decimal separator
  - Avatar initials & text truncation
- [x] **`useFormatter()` Auto-Imported Composable** (`src/composables/useFormatter.ts`)
- [x] **`.env`-based Global Defaults** (`VITE_DEFAULT_LOCALE`, `VITE_DEFAULT_CURRENCY`, `VITE_DEFAULT_TIMEZONE`, `VITE_DEFAULT_TIME_FORMAT`)
- [x] **Interactive Formatter Showcase** (`src/views/components/FormatterView.vue`) — `/components/formatters`
- [x] **`CodePreview` `hidePreview` & `defaultShowCode` Props** — Code-only doc blocks always visible
- [x] **Expanded Unit Tests** — `formatters.spec.ts`, `axios.spec.ts`, `validation.spec.ts`, `auth.service.spec.ts`, `user.service.spec.ts`

---

## ✅ v1.3 — Core Admin Application Views

> **Target:** Essential real-world administrative pages that every production dashboard requires.

### Pages & Workflows
- [x] **Profile & Account View** (`/profile`) — Personal user profile, avatar change, personal info, and account deletion safeguard
- [x] **Notifications Center** (`/notifications`) — Dedicated full inbox view with filter by type (unread, system, mention) and bulk mark as read
- [x] **Activity Log / Audit Trail** (`/activity`) — Filterable log table showing administrative actions, timestamps, and user events
- [x] **Roles & Permissions Matrix** (`/roles`) — Visual permission table/checkbox grid for managing role-based access control (RBAC)
- [x] **Billing & Invoices Sample** (`/billing`) — Subscription tier cards, payment method card, and invoice download history table

---

## ✅ v1.4 — Component Catalog Polish & Primitives

> **Target:** Complete UI primitive gaps and showcase remaining built-in components.

### UI Primitives & Showcase Gaps
- [x] **`<Accordion>` / Collapsible Primitive** — For FAQ sections, expandable settings groups, and collapsible filters
- [x] **`<Calendar>` Full Month View** — Event-ready calendar grid (expanding upon the single Date Picker)
- [x] **`<Kbd>` & Keyboard Shortcuts Showcase** — Demonstrate keyboard shortcut combinations in command palettes and dialogs
- [x] **`<Timeline>` Component Showcase** — Dedicated demo section for order tracking and milestone flows
- [x] **`<HoverCard>` & Popover Rich Preview** — Interactive user preview cards on link hover

---

## ✅ v1.5 — Dedicated Landing Page & UI Bug Fixes

> **Target:** Public-facing product landing page to showcase the template and fix outstanding UI issues.

### Dedicated Product Landing Page
- [x] **Standalone Landing Page** (`src/views/landing/IndexView.vue`) — `/landing` route accessible without dashboard shell
  - [x] Sticky top navbar with `AppLogo` (`size="xl"`), version badge (`v2.0`), section anchors, dark/light toggle, GitHub link, and *"Live Dashboard"* CTA
  - [x] Hero section with ambient glow, gradient headline, metrics strip (36+ Primitives, 100% TypeScript, <100ms HMR, Zero Bloat), and `screenshot.png` mockup preview
  - [x] Architecture & Tech Stack grid (Vue 3.5, Vite 8, Tailwind CSS v4, TypeScript, Reka UI, Enterprise Axios)
  - [x] Core Features grid — RBAC matrix, Real-time audit trail, Stripe billing, TanStack data tables, 36+ UI primitives, mobile keyboard-safe UX
  - [x] Interactive live module preview tabs (Dashboard Core, Data Tables, RBAC Matrix, Billing)
  - [x] Transparent Pricing section — monthly/yearly billing interval toggle with 20% discount badge and 3 tiers (*Community*, *Pro Developer*, *Enterprise*)
  - [x] Interactive FAQ accordion (collapsible questions with chevron animation)
  - [x] Conversion CTA banner with gradient card
  - [x] Public footer with `AppLogo`, "Developed by CandraSp" GitHub credit link, and quick navigation links
- [x] Registered `/landing` in `src/router/index.ts`
- [x] **Landing Page** entry added to `AppSidebar.vue` (under `Pages`) and `CommandSearchDialog.vue` (`Ctrl+K`)

### Bug Fixes & Component Improvements
- [x] **Checkbox Dual-Binding** (`src/components/ui/checkbox/Checkbox.vue`) — Added `checked` / `update:checked` proxy alongside `modelValue` for full `v-model` compatibility across all views
- [x] **Data Table Row Selection** (`src/views/components/TableView.vue`) — Fixed select-all checkbox binding and synced full record count with `isAllSelected` computed state
- [x] **Audit Detail Modal Viewport Overflow** (`src/views/activity/IndexView.vue`) — Constrained modal to `max-h-[85vh]` with sticky header/footer and scrollable body
- [x] **Billing Payment Instrument Badge** (`src/views/billing/IndexView.vue`) — Fixed Mastercard brand text overlap with proper dual-circle badge, styled Visa/Amex rendering
- [x] **Tailwind CSS v4 Gradient Syntax** (`src/views/landing/IndexView.vue`) — Migrated `bg-gradient-to-*` to `bg-linear-to-*`

---

## ✅ v1.6 — Frontend Polish & Developer Experience

> **Target:** Pure frontend refinements to make this template as easy as possible to adopt, customize, and extend. No backend required — developers wire their own API layer using the provided Axios service pattern.

### UI & Interaction Polish
- [x] **Route Transition Animations** — Subtle page-level enter/leave transitions between route changes using Vue `<Transition>` (`AdminLayout.vue`, `AuthLayout.vue`, `style.css`)
- [x] **Reusable Empty State Component** — Created auto-imported `<EmptyState>` component (`src/components/EmptyState.vue`) and wired to Users, Notifications, Activity, and Table search zero states
- [x] **Print / Export CSS** — Printer-friendly stylesheet (`@media print` in `src/style.css`) for invoice and audit log views hiding navigation chrome
- [x] **Improved Skeleton Loaders** — Standardized loading skeletons for dashboard, tables, and card grids during mock API delays

### Developer Experience
- [x] **Mock Data Customization Guide** — Dedicated `MOCKING.md` guide for replacing mock service data with a real REST or GraphQL API
- [x] **`.env.example` Expansion** — Document all `VITE_*` variables with complete comments, defaults, and acceptable values
- [x] **VS Code Workspace Config** — Shipped `.vscode/extensions.json` and `.vscode/settings.json` with recommended extensions (Volar, Tailwind CSS IntelliSense, ESLint, Prettier)

---

## 🔮 v1.7 — Live Theme Configurator & UI Primitives Expansion

> **Target:** Interactive live customizer drawer, dynamic accent colors, and completing remaining UI primitive gaps.

### Live Theme & Layout Configurator
- [x] **Theme Customizer Drawer** (`src/components/layout/ThemeCustomizer.vue`)
  - [x] Floating trigger / Navbar quick settings toggle
  - [x] Dynamic Primary Accent Color palette switcher (Default / Indigo / Violet / Emerald / Rose / Amber / Cyan) modifying root `oklch` CSS variables
  - [x] Border Radius scale selector (`0px`, `0.25rem`, `0.375rem`, `0.5rem`, `0.75rem`, `1.0rem`)
  - [x] Content container mode switcher (`Fluid Full Width` vs `Boxed max-w-7xl`)
  - [x] LocalStorage persistence for customized user preferences

### UI Primitives Expansion
- [x] **`<Toggle>` & `<ToggleGroup>` Primitive** (`src/components/ui/toggle/` & `src/components/ui/toggle-group/`) — Single and multi-select button groups for toolbars, alignments, and view mode toggles
- [x] **`<ContextMenu>` Primitive** (`src/components/ui/context-menu/`) — Right-click context actions on data table rows, cards, and file items
- [x] **`<ScrollArea>` Primitive** (`src/components/ui/scroll-area/`) — Cross-platform slim customized scrollbars
- [x] **`<PinInput>` / `<OtpInput>` Standalone Primitive** (`src/components/ui/pin-input/`) — Reusable OTP/PIN segmented input with auto-advance, backspace handling, and paste support

### UX & Accessibility
- [ ] **Global Keyboard Shortcuts Helper (`?`)** — Pressing `?` displays an interactive modal showing all global hotkeys (`Ctrl+K`, `Ctrl+B`, `Ctrl+Shift+L`, `Esc`)
- [ ] **Language Selector Mock Dropdown** — Navbar language switcher with flags (EN, ID, ES, JA) complementing the `useFormatter` Intl module

---

## 📄 v1.8 — Printable Invoice & Extended Auth / Status Pages

> **Target:** High-demand business invoice view and expanded auth/error page variations.

### Business & Invoicing
- [x] **Dedicated Printable Invoice View** (`src/views/billing/InvoiceDetailView.vue` / `/billing/invoice/:id`)
  - [x] Professional invoice template with company branding, invoice metadata, customer billing information, and line-item calculation table
  - [x] Subtotal, tax/VAT calculations, discount chip, and total amount
  - [x] Direct print trigger (`window.print()`) pre-configured with clean `@media print` styles
  - [x] Action toolbar (Download PDF mock, Send Email mock, Back to Billing)

### Extended Authentication & Error States
- [x] **Lock Screen View** (`src/views/auth/LockScreenView.vue` / `/auth/lock-screen`) — Session lock state with avatar, username, password unlock input, and switch account link
- [x] **Maintenance Mode View** (`src/views/errors/MaintenanceView.vue` / `/errors/maintenance`) — Under-maintenance illustrated page with countdown timer and notification subscription
- [x] **Coming Soon View** (`src/views/errors/ComingSoonView.vue` / `/errors/coming-soon`) — Product launch countdown with email newsletter capture

---

## 💼 v2.0 — Enterprise App Templates & Specialized Dashboards

> **Target:** Full-featured specialized admin mini-apps and alternate dashboard presets.

### Enterprise App Templates (Mini Apps)
- [ ] **Kanban / Task Management App** (`src/views/apps/KanbanView.vue` / `/apps/kanban`)
  - [ ] Multi-column workflow board (*Backlog, In Progress, In Review, Done*)
  - [ ] Task cards with priority badges, assignee avatars, due date indicators, and tag labels
  - [ ] Create & edit task dialog modal
- [ ] **File Manager / Media Library** (`src/views/apps/FileManagerView.vue` / `/apps/file-manager`)
  - [ ] Grid and List view modes
  - [ ] Folder breadcrumb tree, storage capacity progress widget, and file type category filters
  - [ ] Quick file details preview drawer & drag-and-drop upload zone
- [ ] **Chat / Messenger View** (`src/views/apps/ChatView.vue` / `/apps/chat`)
  - [ ] Conversation sidebar with online presence indicators, unread count, and search
  - [ ] Active message thread with bubble states, timestamps, attachments, and typing indicator

### Specialized Dashboard Presets
- [x] **E-Commerce / Sales Dashboard** (`src/views/dashboard/EcommerceView.vue` / `/dashboard/ecommerce`) — Top-selling products table, order fulfillment metrics, revenue breakdown, and conversion rate sparklines
- [x] **Analytics & Traffic Dashboard** (`src/views/dashboard/AnalyticsView.vue` / `/dashboard/analytics`) — Traffic acquisition channels, user geography breakdown, bounce rates, and session durations

---

## 🚀 v3.0 — Scaffolding Tool & Monorepo Migration

> **Target:** Transform Nala into a publishable scaffolding tool (`pnpm create nala my-app`) with a clean, developer-ready starter template — while keeping the showcase fully intact.

---

### Phase 1 — Monorepo Migration

> Convert the existing single-app repo into a `pnpm` monorepo with clear package boundaries.

- [x] Initialize `pnpm-workspace.yaml` at the repo root
- [x] Move the current app (`src/`, `public/`, `index.html`, `vite.config.ts`, etc.) into `packages/showcase/`
- [x] Update all relative paths, `tsconfig` references, and `vite.config.ts` inside `packages/showcase/`
- [x] Update root `package.json` with workspace scripts (`dev`, `build`, `test` delegating to showcase)
- [x] Update CI workflow (`.github/workflows/deploy.yml`) to target workspace commands
- [x] Update guardrails (`GEMINI.md`, `CLAUDE.md`) to reflect pnpm workspace monorepo architecture

---

### Phase 2 — Clean Starter Template

> Curate a minimal, scaffold-ready template inside `packages/create-nala/template/` — the source of truth for what users get when they run `pnpm create nala`.

#### Files & Components Included

- [x] **Layout System** — `AdminLayout.vue`, `AuthLayout.vue` (with `ThemeCustomizer` stripped), `AppLogo.vue`
- [x] **Navbar** — `AppNavbar.vue` modified: remove `<NotificationDrawer />` import & usage, keep breadcrumb + user dropdown
- [x] **Sidebar** — `AppSidebar.vue` modified: strip all showcase icon imports (30+), keep only `LayoutDashboard`; single nav item: Dashboard
- [x] **Command Palette** — `CommandSearchDialog.vue` modified: remove hardcoded showcase routes, keep only Dashboard & Blank routes
- [x] **All UI Primitives** — `src/components/ui/` (Button, Card, Input, Badge, Avatar, Dialog, Toast, Sidebar, etc.) — copy entire folder unchanged
- [x] **Shared Components** — `PageHeader.vue`, `EmptyState.vue`, `AppLogo.vue` — included as core helpers
- [x] **Core Store** — `auth.ts` only (theme is a composable, not a Pinia store)
- [x] **Core Composables** — `useThemeConfig.ts`, `useFormatter.ts`, and all composables in `src/composables/`
- [x] **Axios Service Layer** — `src/lib/axios.ts`, `src/services/auth.service.ts`, `src/services/user.service.ts`, `src/services/types.ts`
- [x] **`services/index.ts`** — rewritten to only export `auth.service` and `user.service`
- [x] **Utilities** — `src/lib/utils.ts`, `src/lib/formatters.ts`, `src/lib/validation.ts`
- [x] **Router** — Two main area routes: `/` → Dashboard, `/_blank` → BlankView; full `/auth/*` and `/errors/*` suites; auth guard preserved
- [x] **Auth Views** — Full suite: Login, Register, Forgot/Reset Password, OTP, Confirm Email, Lock Screen
- [x] **Error Pages** — 404, 500, 403, Maintenance, Coming Soon views
- [x] **Dashboard View** — Minimal: 4 static KPI stat cards + quick starter cards as scaffolding pattern (no charts, no mock data)
- [x] **BlankView** — `src/views/_starter/BlankView.vue` — clean page with `<PageHeader>` and development hints
- [x] **Config Files** — `vite.config.ts`, `tsconfig.*.json`, `.env.example`, `components.json`
- [x] **`_gitignore`** — Renamed from `.gitignore` (npm skips `.gitignore` during publish; CLI renames on scaffold)

> **Note on generated files:** `src/auto-imports.d.ts` and `src/components.d.ts` are auto-generated by Vite plugins at runtime — omitted from template and listed in `_gitignore`.

#### Files & Components Excluded

- [x] All showcase views (`src/views/components/*`, landing page, ecommerce, analytics, etc.)
- [x] All enterprise app views (Kanban, File Manager, Chat)
- [x] `NotificationDrawer.vue` — showcase-only layout component
- [x] `notification.ts` store — showcase-only Pinia store
- [x] `activity.ts`, `billing.ts`, `role.ts` stores — showcase-only
- [x] `activity.service.ts`, `billing.service.ts`, `notification.service.ts`, `role.service.ts`
- [x] `ThemeCustomizer.vue` — excluded; users can add it themselves following showcase as reference
- [x] `CodePreview.vue` — showcase-only component
- [x] Mock data files
- [x] Admin views: Notifications Center, Activity Log, Roles, Billing, Users, Profile, Settings

---

### Phase 3 — CLI Tool (`packages/create-nala/`)

> Build and publish the `create-nala` npm package that powers `pnpm create nala`.

#### CLI Stack

| Package | Purpose |
|---|---|
| [`@clack/prompts`](https://github.com/natemoo-re/clack) | Interactive terminal UI (same as `create-vite`) |
| [`kolorist`](https://github.com/nicolo-ribaudo/kolorist) | Terminal color output |
| [`tsup`](https://github.com/egoist/tsup) | Zero-config TypeScript bundler for CLI |
| `node:fs` + `node:path` | Native file copy & template processing |

#### CLI Features

- [x] **Project Name Prompt** — Validates slug format, defaults to directory argument (`my-app`)
- [x] **Package Manager Detection** — Auto-detect `pnpm` / `npm` / `yarn` / `bun` from user environment (`npm_config_user_agent`)
- [x] **Template Variable Replacement** — Replace `NALA_APP_NAME` and `NALA_APP_SLUG` placeholders across all template files
- [x] **`_gitignore` → `.gitignore` rename** — Handled automatically post-copy
- [x] **Non-interactive / CI fallback** — Seamless support for non-TTY environments with CLI flags (`--force`, `--pnpm`, `--npm`, etc.)
- [x] **Post-scaffold instructions** — Print colored `cd my-app && pnpm install && pnpm dev` guide

#### Package Config (`packages/create-nala/package.json`)

- [x] `"name": "create-nala"` — Verified name is available on npm registry
- [x] `"bin": { "create-nala": "./dist/index.js" }` — CLI entry point with `#!/usr/bin/env node` shebang
- [x] `"files": ["dist", "template"]` — Only ship what's needed; keep package size minimal
- [x] `tsup` devDependency configured — compiled cleanly to `dist/index.js`
- [ ] Publish to npm: `pnpm --filter create-nala publish --access public` (Ready for release)

---

### Phase 4 — Validation & Release

- [x] Test local scaffold: `node packages/create-nala/dist/index.js scratch/test-project-output --force`
- [x] Verify scaffolded project structure: `.gitignore`, replaced package names, and complete file tree
- [x] Verify zero showcase remnants: checked router, sidebar menu, stores, and service imports in template
- [x] Update root `README.md` — Added "Quick Start" section with `pnpm create nala` instructions
- [x] Created `packages/create-nala/README.md` — Complete CLI documentation for npm
- [ ] Tag release `v3.0.0` and publish `create-nala` to npm (`npm publish`)

---

### Long-Term Maintenance Strategy

> **Golden Rule:** `packages/showcase/` and `packages/create-nala/template/` evolve **independently**. There is no automatic sync — template updates are **intentional decisions**, not automatic.

| Event | Action Required |
|---|---|
| New core UI primitive added to showcase | Copy to `template/src/components/ui/` if deemed essential for starters |
| Showcase-only view or store added | No action needed — template stays minimal |
| `AppNavbar.vue` updated in showcase | Manually port relevant changes to template's modified version |
| Auth flow (`auth.ts`, `auth.service.ts`) updated | Manually update in both `showcase/` and `template/` |
| `useThemeConfig` composable updated | Manually update in both locations |
| `vite.config.ts` / `tsconfig` updated | Manually update in both locations |
| New `create-nala` CLI version needed | Bump `packages/create-nala/package.json` version and `npm publish` |


