# Changelog

All notable changes to **Nala** — Vue 3 Admin Dashboard Template — are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [3.0.4] — 2026-08-31

### Added & Improved

#### 🧭 Streamlined Sidebar Modes & Minimalist Scrollbar
- **Streamlined Sidebar Control Modes (`src/components/ui/sidebar/`)**:
  - Simplified sidebar interaction modes down to two intuitive options: **`expanded`** (standard pinned sidebar) and **`hover`** (expand-on-hover icon mode).
  - Removed the redundant static collapsed mode in favor of the smoother and more responsive `hover` behavior.
  - Updated cookie persistence (`sidebar_mode`) and keyboard shortcut / toggle behavior (`toggleSidebar()`) to alternate cleanly between `expanded` and `hover`.
  - Updated both `packages/showcase/` and `packages/create-nala/template/` implementations in full parity.
- **Minimalist Sidebar Scrollbar Polish (`SidebarContent.vue`)**:
  - Added `group-data-[collapsible=icon]:scrollbar-none group-data-[collapsible=icon]:[&::-webkit-scrollbar]:hidden` to eliminate unsightly scrollbar tracks when the sidebar is in collapsed icon mode while maintaining full vertical scroll accessibility.

#### 🤖 AI Guardrails Standard Enhancement
- **Synchronized Version Bump Protocol (`GEMINI.md` & `CLAUDE.md`)**:
  - Enforced strict Rule 10 requiring all 4 monorepo `package.json` manifests (`package.json`, `@nala/showcase`, `create-nala`, and `create-nala/template`) to be updated atomically whenever a version bump is performed.

---

## [3.0.3] — 2026-08-27

### Added & Improved

#### 🚀 Automated CI/CD npm Publishing via OIDC Trusted Publisher
- **Zero-Secret OIDC Trusted Publisher Workflow (`.github/workflows/deploy.yml`)**:
  - Upgraded npm publishing job for `create-nala` to use **OIDC (OpenID Connect) Trusted Publisher** (`id-token: write` permission).
  - Eliminated dependency on long-lived `NPM_TOKEN` secrets for more secure and resilient automated deployments.
  - Publishing is now triggered automatically upon pushing a Git release tag (`v*.*.*`).

#### 📚 Documentation & Contributor Workflows
- **Publishing & Unpublish Guardrails (`DEVELOPMENT.md`)**:
  - Added comprehensive tag-based release checklist and automated CI/CD workflow explanation.
  - Documented npm 24-hour unpublish cooldown behavior and recovery procedures.

---

## [3.0.2] — 2026-08-27

> ⚠️ **MAJOR ARCHITECTURAL CHANGE** — This release marks the transition of the Nala repository from a single standalone Vue 3 application into a **pnpm Workspace Monorepo** with a dedicated scaffolding CLI. Development workflow, contribution model, and project structure have fundamentally changed.

### Added

#### 🏗️ Monorepo Architecture Migration (Breaking Change)
- **Repository restructured as a `pnpm` Workspace Monorepo (`pnpm-workspace.yaml`)**:
  - The repository is no longer a standalone Vue 3 app — it now houses **two separate packages** with independent purposes and independent versioning.
  - `packages/showcase/` (`@nala/showcase@3.0.0`) — The **full-featured reference demo application**. This is where all new UI components, views, stores, services, and design system features are developed and demonstrated.
  - `packages/create-nala/` (`create-nala@3.0.x`) — The **scaffolding CLI tool** published to npm. Contains the clean starter template (`template/`) that end users receive when running `pnpm create nala my-app`.
- **Golden Rule — Independent Evolution:**
  - `packages/showcase/` and `packages/create-nala/template/` evolve **independently**.
  - Changes to showcase (new charts, advanced views, billing, RBAC, etc.) do **NOT** automatically propagate to the template.
  - Only intentional sync operations (`pnpm sync:ui`) selectively copy stable UI primitives from showcase to template.
- **Root Workspace Scripts (`package.json`):**
  - `pnpm dev` — Starts `@nala/showcase` dev server.
  - `pnpm build` — Builds `@nala/showcase` production bundle.
  - `pnpm build:cli` — Compiles the `create-nala` CLI via `tsup`.
  - `pnpm sync:ui` — Copies UI primitives from showcase to CLI template.
- **New Developer Documentation:**
  - `DEVELOPMENT.md` — Full contributor guide covering monorepo structure, dev workflow, CLI publishing, and sync strategy.
  - `ROADMAP.md` — Milestone tracking for upcoming features.
  - `CLOUDFLARE.md` — Deployment guide for Cloudflare Workers/Pages.

#### 🧰 `create-nala` Scaffolding CLI published to npm
- **`create-nala@3.0.0` → `3.0.2`** — First-ever npm-published scaffolding CLI for Nala.
- Developers can now bootstrap a production-ready admin dashboard project in seconds:
  ```bash
  pnpm create nala my-admin-app
  npm create nala@latest my-admin-app
  bun create nala my-admin-app
  ```
- Interactive CLI powered by `@clack/prompts` — supports project name input, directory selection, and package manager selection.
- Non-interactive mode supported for CI/CD pipelines (`--force` flag).
- Variable replacement system: `NALA_APP_NAME` / `NALA_APP_SLUG` are auto-substituted into `package.json`, `index.html`, and `README.md`.

#### 🤖 Out-of-the-Box AI Agent Integration in `create-nala` Starter Template

- **Universal `AGENTS.md` Guardrails (`packages/create-nala/template/AGENTS.md`)**:
  - Added universal AI coding assistant guardrails automatically scaffolded into every new project.
  - Compatible with all major AI editors: Antigravity (Gemini), Cursor, Claude Code, GitHub Copilot, Roo Code, and Windsurf.
  - Covers strict Tailwind v4 compliance rules (gradient syntax, sizing scale, shadows), Composition API enforcement, TypeScript strict mode, ARIA accessibility, and global auto-import matrix.
- **Enriched Starter Skill Blueprint (`packages/create-nala/template/.agents/skills/nala-project/SKILL.md`)**:
  - Deep end-to-end CRUD feature blueprint (API Service → Pinia Store → Modal Form → Table View).
  - Standard KPI Stats Card design blueprint to prevent AI hallucinations on layout and color choices.
  - Input Groups with icons/addons pattern (preventing manual `absolute` positioning antipatterns).
  - Full Table pattern covering Skeleton Loading, Data Rows, and Empty State — all three states included.
  - Complete `<ProductFormDialog>` example using `vee-validate` + `@vee-validate/zod` + `<DialogTitle>/<DialogDescription>` ARIA compliance.

#### 📄 Complete Starter Template Documentation
- **`packages/create-nala/template/README.md`**:
  - Professional starter README dynamically generated with the scaffolded project name (`NALA_APP_NAME` replacement).
  - Covers Quick Start, Available Scripts, Project Structure, Backend API Connection guide, Theme & Branding customization, and AI-Assisted Development section.
- **`packages/create-nala/template/LICENSE`**: MIT License included in all scaffolded projects for open-source and commercial use clarity.

#### ☁️ Cloudflare Workers Deployment Guide
- **`CLOUDFLARE.md`** — New deployment reference document covering:
  - Verified `wrangler.toml` configuration for Cloudflare Workers Static Assets with SPA routing fallback (`not_found_handling = "single-page-application"`).
  - Dashboard settings table: Root directory, Build command, Deploy command, Version command.
  - API Token permission requirements.
  - Complete troubleshooting matrix for all known Cloudflare monorepo deployment errors.
- **`packages/showcase/wrangler.toml`**:
  - Configured for Cloudflare Workers Static Assets deployment.
  - Enables automatic SPA route fallback at the Cloudflare edge (prevents 404 on Vue Router deep links).

### Fixed

#### 🚀 Cloudflare Deployment Pipeline Resolution
- Fixed `wrangler pages deploy` failure: project `nala` is registered as a **Cloudflare Workers** project, not Pages — corrected deploy command to `npx wrangler deploy`.
- Removed invalid `[assets]` block from Pages-mode `wrangler.toml` (Pages validator rejects Workers-only config keys).
- Resolved `Authentication error [code: 10000]` by ensuring API token has `Workers Scripts: Edit` and `Cloudflare Pages: Edit` permissions.

### Released

- **`create-nala@3.0.2`** published to npm — includes `AGENTS.md`, enriched `SKILL.md`, `README.md`, and `LICENSE` in all scaffolded projects.

---

## [1.8.0] — 2026-08-26

### Added

#### 📊 Standardized Chart Primitives Suite (`src/components/ui/chart/`)
- **Unovis Chart Integration (`@unovis/vue` & `@unovis/ts`)**:
  - Integrated official shadcn-vue chart library `@unovis/vue` and core engine `@unovis/ts`.
  - **`<AreaChart>` (`src/components/ui/chart/AreaChart.vue`)**: Multi-series area & spline charts supporting dynamic OKLCH color variables (`var(--primary)`), monotonic cubic bezier curves, crosshair tracking, and reactive timeframe switching.
  - **`<LineChart>` (`src/components/ui/chart/LineChart.vue`)**: Continuous telemetry multi-series line chart with customizable line width and curve smoothing.
  - **`<BarChart>` (`src/components/ui/chart/BarChart.vue`)**: Discrete categorical metric comparison supporting `grouped` and `stacked` modes with rounded corners.
  - **`<DonutChart>` (`src/components/ui/chart/DonutChart.vue`)**: Proportional distribution chart with customizable arc widths, pad angles, and value formatters.
  - **Central Barrel Re-Export (`src/components/ui/chart/index.ts` & `src/components/ui/index.ts`)**: Direct access via `import { AreaChart, BarChart, LineChart, DonutChart } from '@/components/ui'`.

#### 🚀 Specialized Dashboard Presets Expansion
- **E-Commerce / Sales Dashboard (`src/views/dashboard/EcommerceView.vue` / `/dashboard/ecommerce`)**:
  - Order fulfillment KPI sparklines, gross sales metrics, top-selling products table, and real-time conversion rates.
- **Analytics & Traffic Dashboard (`src/views/dashboard/AnalyticsView.vue` / `/dashboard/analytics`)**:
  - Deep telemetry across acquisition channels, audience country distribution, bounce rates, session retention, and interactive `@unovis/vue` `<AreaChart>`.

#### 🎨 Component Design System Showcase Refactor
- **Refactored Chart Showcase (`src/views/components/ChartView.vue`)**:
  - Replaced legacy manual SVG calculations with modern declarative `<AreaChart>`, `<BarChart>`, `<DonutChart>`, and `<LineChart>` live interactive demos and copy-pasteable `<CodePreview>` snippets.

### Fixed & Improved

#### 🎯 Chart Theme Integration & Tooltip Polish
- **Tooltip Outer Box Artifact Elimination (`src/style.css` & chart components)**:
  - Eliminated the double-card white border glitch on dark/light themes by attaching `[data-unovis-tooltip]` attributes and overriding Unovis CSS variables (`--vis-tooltip-*`) in `:root` and `.dark`.
- **Subtle Dark Mode Grid Lines**:
  - Replaced harsh solid axis grid lines with low-opacity dashed lines (`stroke-dasharray: 4 4; stroke-opacity: 0.25`).
- **Standardized Metric & KPI Stats Cards Layout**:
  - Replaced legacy sparkline-based metric cards with clean, typography-first `<Card flush class="highlight-card shadow-xs ...">` + `<CardContent class="p-5 space-y-2">` across all dashboard views (`IndexView.vue`, `AnalyticsView.vue`, `EcommerceView.vue`, `CardView.vue`).
  - Eliminated the 44px vertical padding glitch caused by un-flushed `Card.vue` wrappers.

---

## [1.7.0] — 2026-08-26

### Added

#### 🎨 Live Theme & Layout Configurator
- **Dynamic Theme Composable (`src/composables/useThemeConfig.ts`)**:
  - Centralized reactive theme manager supporting **7 curated OKLCH color palettes** (*Emerald*, *Violet*, *Ocean Blue*, *Amber Sunset*, *Rose*, *Zinc*, *Slate*).
  - Dynamic runtime color variable injection via `#nala-dynamic-theme-vars` `<style>` tag, updating both `:root` (light) and `.dark` variables synchronously.
  - **6 Border Radius Presets** (`none: 0px`, `sm: 0.25rem`, `md: 0.5rem`, `lg: 0.75rem`, `xl: 1.0rem`, `full: 9999px`) adjusting global `--radius`.
  - **Container Width Mode Switcher** (`fluid` full width vs `boxed max-w-7xl`).
  - Persistent state management via `@vueuse/core` `useStorage` with reset-to-defaults capabilities.
- **`<ThemeCustomizer>` Interactive Configuration Drawer (`src/components/layout/ThemeCustomizer.vue`)**:
  - Accessible slideover drawer (`SheetContent`) featuring palette swatch rings with active checkmarks, interactive radius button tiles, and boxed/fluid toggles.
  - Floating trigger button on the viewport edge and `<Paintbrush>` icon button in `src/components/layout/AppNavbar.vue`.
  - Added `VITE_SHOW_THEME_CUSTOMIZER` environment flag support to `.env.example` and `README.md` to toggle the customizer on or off in white-labeled deployments.
- **Comprehensive Theme Customization Architecture Documentation**:
  - Documented complete architectural guide in Section 9 of `.agents/skills/nala-project/SKILL.md`.

#### 🧩 UI Primitives Expansion (`src/components/ui/`)
- **`<Toggle>` & `<ToggleGroup>` Primitives (`src/components/ui/toggle/` & `src/components/ui/toggle-group/`)**:
  - `Toggle.vue` with CVA variants (`default`, `outline`) and size scale (`sm`, `default`, `lg`).
  - `ToggleGroup.vue` and `ToggleGroupItem.vue` with context injection supporting single selection (e.g. text alignment, grid/list view) and multiple selection (e.g. rich text bold/italic/underline).
  - Live interactive demos and code snippets added to `src/views/components/ButtonView.vue`.
- **`<ContextMenu>` Primitive Suite (`src/components/ui/context-menu/`)**:
  - Full suite of 14 components built with Reka UI (`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`).
  - Live right-click demo zone with submenus, checkboxes, radio items, and keyboard shortcut chips added to `src/views/components/OverlayView.vue`.
- **`<ScrollArea>` & `<ScrollBar>` Primitives (`src/components/ui/scroll-area/`)**:
  - Custom cross-browser slim scrollbars with vertical and horizontal scroll support.
  - Interactive demos (vertical release tags & horizontal cards track) added to `src/views/components/OverlayView.vue`.
- **`<PinInput>` / `<OtpInput>` Standalone Primitives (`src/components/ui/pin-input/`)**:
  - `PinInput.vue`, `PinInputGroup.vue`, `PinInputInput.vue`, and `PinInputSeparator.vue` with auto-advancing focus, backspace handling, and multi-digit paste support.
  - Interactive 4-digit PIN and 6-digit 2FA token demos added to `src/views/components/FormView.vue`.
- **Central Barrel Registry Update (`src/components/ui/index.ts`)**:
  - Re-exported all new primitives (`toggle`, `toggle-group`, `context-menu`, `scroll-area`, `pin-input`).

### Fixed & Improved

#### 📐 Layout Shell, Scroll Containment & Component Polish
- **Viewport Scroll Lock & Double Scrollbar Elimination**:
  - Strictly constrained `AdminLayout.vue` to `h-dvh max-h-dvh min-h-0 w-full overflow-hidden`, ensuring `<main>` is the single dedicated scroll container.
  - Cleaned up `body[style*="overflow: hidden"] { overflow: auto !important; }` in `src/style.css` which was previously forcing duplicate window scrolling alongside internal containers.
- **Pin Input & OTP Segmented Border Fix (`src/components/ui/pin-input/PinInputInput.vue`)**:
  - Fixed open left-borders and disconnected sharp corners by giving each input square a clean `rounded-md border border-input` box.
- **Drawer / Sheet Form Sizing & Padding Alignment (`src/views/components/ModalView.vue`)**:
  - Corrected zero horizontal padding glitch in `ModalView.vue` settings sheet panel by implementing `p-0` shell, `p-6` header/body, and responsive `w-full sm:max-w-md` dimensions.
- **Tailwind CSS v4 Standard Scale Compliance (`src/components/ui/scroll-area/ScrollBar.vue`)**:
  - Replaced arbitrary `p-[1px]` classes with standard `p-px`.
- **Cleaned Unused Imports**:
  - Removed lingering unused Lucide icon imports in `src/views/components/OverlayView.vue`.

---

## [1.6.0] — 2026-08-26

### Added

#### 🎨 Frontend Polish & Reusable Zero States
- **`<EmptyState>` Reusable Component (`src/components/EmptyState.vue`)**:
  - Auto-imported dashed container component featuring configurable icon, title, description, badge, compact mode, and an `#actions` slot for recovery/filter reset buttons.
  - Integrated into zero-result states in `src/views/users/IndexView.vue` (Users table), `src/views/notifications/IndexView.vue` (Notifications center), `src/views/activity/IndexView.vue` (Audit logs), and `src/views/components/TableView.vue` (Database clusters table).
- **Page-Level Route Transition Animations (`src/style.css`, `AdminLayout.vue`, `AuthLayout.vue`)**:
  - Subtle 150ms enter/leave fade + slide transition (`.page-enter-active`, `.page-leave-active`, `.page-enter-from`, `.page-leave-to`).
  - Native support for `@media (prefers-reduced-motion: reduce)` to disable transitions when requested by OS accessibility settings.
- **Print / PDF Export Stylesheet (`src/style.css`)**:
  - Added `@media print` rules that automatically hide navigation chrome (sidebars, navbar, header triggers, action buttons) and optimize layouts for clean A4 printing and PDF export.

#### 🛠️ Developer Experience & Backend Integration Guides
- **Dedicated Real API & Mock Integration Guide (`MOCKING.md`)**:
  - Architectural blueprint explaining the 3-tier flow (Views → Pinia Stores / Services → Axios Interceptors → Backend / Mock Fallbacks).
  - Step-by-step tutorial on replacing mock datasets with real REST or GraphQL endpoints.
  - Guidelines on extending TypeScript schemas, token lifecycle handling, and local Vite dev proxy CORS bypass.
- **Expanded Environment Configuration (`.env.example`)**:
  - Complete documentation and commentary for `VITE_APP_NAME`, `VITE_API_BASE_URL`, `VITE_DEFAULT_LOCALE`, `VITE_DEFAULT_CURRENCY`, `VITE_DEFAULT_TIMEZONE`, and `VITE_DEFAULT_TIME_FORMAT`.
- **VS Code Workspace Recommended Config (`.vscode/extensions.json` & `.vscode/settings.json`)**:
  - Shipped IDE extensions and format-on-save configurations with Tailwind CSS v4 class regex triggers.

### Fixed

#### 🛡️ Resilient Mock Fallbacks & Zero-Backend Reliability
- **Unconditional Service Mock Fallbacks (`src/services/`)**:
  - Hardened error-handling in `notification.service.ts`, `activity.service.ts`, `billing.service.ts`, and `role.service.ts` to guarantee fallback datasets always populate across local preview, production builds, and Cloudflare Pages without requiring a backend server.
- **Data Table Filter Binding (`src/views/components/TableView.vue`)**:
  - Fixed property name mismatch (`searchCombo`/`statusFilter` → `searchQuery`/`selectedStatusFilter`) on the `<EmptyState>` filter reset action.
- **VS Code Settings Schema Warnings (`.vscode/settings.json`)**:
  - Removed unsupported default formatter IDs, maintaining clean Tailwind CSS experimental regex triggers and TypeScript SDK pathing.

---

## [1.5.0] — 2026-08-25

### Added

#### 🚀 Dedicated Product Landing Page (`/landing`)
- **Standalone Landing Page (`src/views/landing/IndexView.vue`)**:
  - **Sticky Top Navbar**: Brand logo with `AppLogo` (`size="xl"`), version badge (`v2.0`), anchor links (`#features`, `#architecture`, `#showcase`, `#pricing`, `#faq`), Dark/Light mode toggle, GitHub repository link, and direct *"Live Dashboard"* CTA.
  - **Hero Section**: High-impact headline with ambient glow background, live metric chips (36+ UI Primitives, 100% Strict TypeScript, <100ms HMR, Zero Legacy Bloat), and an interactive Dashboard window mockup previewing live metrics and recent activity logs.
  - **Architecture & Tech Stack Grid**: Highlights Vue 3.5 Composition API, Vite 8, Tailwind CSS v4 OKLCH color engine, Strict TypeScript, Reka UI headless primitives, and Enterprise Axios with silent JWT token refresh.
  - **Core Features Grid**: 6 enterprise feature cards covering RBAC matrix, Real-time audit trail, Stripe billing engine, TanStack console-grade data tables, 36+ UI primitives, and mobile keyboard-safe viewports.
  - **Live Preview Tabs**: Interactive module explorer previewing Dashboard Core, Data Tables, RBAC Matrix, and Billing & Invoices.
  - **Transparent Pricing Section**: Monthly vs. Annual billing interval switcher (with 20% discount badge) and 3 tiers (*Community*, *Pro Developer*, *Enterprise*).
  - **Interactive FAQ Accordion**: Collapsible questions addressing commercial licensing, backend integrations, and customization.
  - **Conversion CTA & Public Footer**: High-converting launch banner and public footer featuring official `AppLogo`, developer credits linking to GitHub (`Developed by CandraSp`), and quick links.
- **Routing & Navigation Integration**:
  - Registered `/landing` in `src/router/index.ts`.
  - Added **Landing Page** with `LayoutTemplate` icon to `src/components/layout/AppSidebar.vue` (under `Pages`).
  - Added **Landing Page** to quick search in `src/components/layout/CommandSearchDialog.vue` (`Ctrl+K`).

### Fixed & Improved

#### 🐛 Component & View Bug Fixes
- **Checkbox Component Model & Checked Dual-Binding Compatibility (`src/components/ui/checkbox/Checkbox.vue`)**:
  - Enhanced wrapper to support both `v-model` / `modelValue` (`update:modelValue`) and `:checked` / `v-model:checked` (`update:checked`) seamlessly across all views.
- **Data Table Row Selection & Select All (`src/views/components/TableView.vue`)**:
  - Fixed row selection checkbox event handling and synced full table records with `isAllSelected` computed state.
- **Audit Detail Modal Viewport Overflow (`src/views/activity/IndexView.vue`)**:
  - Added `max-h-[85vh]` constraint, fixed header/footer, and scrollable body to prevent dialog overflow on small screens.
- **Mastercard Brand Badge Text Overlap (`src/views/billing/IndexView.vue`)**:
  - Replaced tight fixed-width text box with dedicated fintech brand badge rendering (interlocking Mastercard circles, styled Visa typography, Amex chips).
- **Tailwind CSS v4 Gradient Syntax (`src/views/landing/IndexView.vue`)**:
  - Modernized `bg-gradient-to-*` classes to `bg-linear-to-b`, `bg-linear-to-r`, and `bg-linear-to-br`.

---

## [1.4.0] — 2026-08-25

### Added

#### 🧩 UI Primitives & Component Catalog Polish
- **`<Accordion>` & `<Collapsible>` Primitives (`src/components/ui/accordion/` & `src/components/ui/collapsible/`)**:
  - `Accordion.vue`, `AccordionItem.vue`, `AccordionTrigger.vue`, `AccordionContent.vue` wrapping Reka UI with accessible keyboard navigation, single/multiple expansion modes, rotating chevrons, and animated height transitions (`animate-accordion-down` / `animate-accordion-up`).
  - `Collapsible.vue`, `CollapsibleTrigger.vue`, `CollapsibleContent.vue` for single collapsible container panels and drawers.
  - Showcased in `src/views/components/NavigationView.vue` (`/components/navigation`) with interactive FAQ accordion and advanced query parameter collapsible cards.
- **`<Calendar>` Full Month View Grid (`src/components/ui/calendar/`)**:
  - Accessible month calendar primitive built with Reka UI (`CalendarRoot`, `CalendarHeader`, `CalendarHeading`, `CalendarPrev`, `CalendarNext`, `CalendarGrid`, `CalendarCell`, `CalendarCellTrigger`).
  - Includes localized weekday headers, today indicator ring, date selection feedback, and keyboard arrow navigation.
  - Showcased in `src/views/components/FormView.vue` (`/components/forms`) with live selected date telemetry.
- **`<Kbd>` & Keyboard Shortcuts Showcase (`src/views/components/TypographyView.vue`)**:
  - Added comprehensive shortcut demonstration matrix in `/components/typography` categorized by **Global Accelerators** (`⌘+K`, `⌘+D`, `⌘+B`), **Table & Data Hotkeys** (`J`/`K`, `Shift+A`), and **Modal/Form Hotkeys** (`⌘+Enter`, `Esc`, `⌘+S`).
- **`<Timeline>` Multi-Track Milestone Showcases (`src/views/components/NavigationView.vue`)**:
  - Showcased **CI/CD Deployment Pipeline** (database migrations, blue-green deployment, SSL renewals) and **Order Fulfillment & Logistics Flow** (payment authorized, packaging, transit, doorstep delivery).
- **`<HoverCard>` & Popover Rich Entity Previews (`src/views/components/OverlayView.vue`)**:
  - Added rich interactive hovercards for **User Profile Preview** (avatar, bio, presence status), **PostgreSQL Cluster Telemetry** (HA replica count, uptime %), and **GitHub Repository Preview** (stargazers, language dot, forks count).
- **Component Barrel Re-exports (`src/components/ui/index.ts`)**:
  - Re-exported `accordion`, `collapsible`, and `calendar` for clean direct barrel imports.

---

## [1.3.0] — 2026-08-25

### Added

#### 🚀 Core Enterprise Admin Views & Store Architectures
- **Personal Profile & Account Settings (`/profile`)**:
  - `src/views/profile/IndexView.vue` with user hero badge, bio character counter, avatar studio with upload simulation, regional and localized preference controls via `useFormatter()`, GDPR account data archive export, and 2-step deletion safeguard dialog.
- **Dedicated Notifications Center (`/notifications`)**:
  - `src/services/notification.service.ts` & `src/stores/notification.ts` managing real-time and mock notifications.
  - `src/views/notifications/IndexView.vue` with category filters (`All`, `Unread`, `Security`, `Mentions`, `System`), keyword search, bulk mark-as-read, batch delete, and bidirectional sync with the top navbar notification drawer.
- **Activity Log & Audit Trail Inspector (`/activity`)**:
  - `src/services/activity.service.ts` & `src/stores/activity.ts` with telemetry mock events (auth events, API key rotations, DB snapshots, billing upgrades).
  - `src/views/activity/IndexView.vue` with 4 summary metric cards, filterable audit data table, Event Detail Inspector modal with raw JSON payload viewer, and CSV / JSON export downloaders.
- **Visual Roles & Permissions Matrix (`/roles`)**:
  - `src/services/role.service.ts` & `src/stores/role.ts` providing RBAC matrix state across 6 functional modules (`Users`, `Roles`, `Content`, `Billing`, `API Keys`, `Audit Logs`).
  - `src/views/roles/IndexView.vue` with role summary cards, interactive permission checkbox grid with module-level and column-level select-all toggles, dirty-state change tracker, custom role creator modal, and role deletion safeguards.
- **Billing, Invoicing & Subscription Management (`/billing`)**:
  - `src/services/billing.service.ts` & `src/stores/billing.ts` managing subscription tiers (`Starter`, `Pro Team`, `Enterprise Plus`), payment instruments, and invoice archives.
  - `src/views/billing/IndexView.vue` with active plan overview, 3 quota progress meters (Seats, API calls, Cloud storage), monthly vs annual billing interval toggle with 20% discount badge, payment card management dialog, and invoice history table with PDF receipt download simulation.
- **Navigation & Routing Integration**:
  - Registered `/profile`, `/notifications`, `/activity`, `/roles`, and `/billing` in `src/router/index.ts`, `AppNavbar.vue`, `AppSidebar.vue`, and `CommandSearchDialog.vue`.

---

## [1.2.4] — 2026-08-21

### Added

#### 🌐 Enterprise Data Formatting Utilities (`src/lib/formatters.ts` & `src/composables/useFormatter.ts`)
- **Native Intl Formatter Core (`src/lib/formatters.ts`)**:
  - `formatCurrency()` — International and localized currency formatting with sensible defaults for IDR, USD, EUR, JPY, GBP.
  - `formatNumber()` & `formatCompactNumber()` — Thousand separators and compact metric notations (`1.5K`, `2.4M`, `2,5 jt`).
  - `formatDate()`, `formatDateTime()`, and `formatTime()` — Standard date styles (`short`, `medium`, `long`, `full`), timezone handling (WIB/WITA/WIT/UTC), and 12h/24h clock cycle support.
  - `formatRelativeTime()` — Human-friendly natural relative time with locale-aware phrases (`"just now"` / `"baru saja"`).
  - `formatBytes()` — Locale-aware storage byte sizes (`KB`, `MB`, `GB`, `TB`).
  - `getInitials()` & `truncate()` — Safe 2-letter uppercase avatar initials and text truncation with ellipsis.
- **Auto-imported `useFormatter()` Composable (`src/composables/useFormatter.ts`)**:
  - Provides a single, clean access point for all formatters across any `<script setup>` or template without explicit imports.
  - Registered `src/composables` directory in `vite.config.ts` for automated unplugin auto-import.
- **1-Click Global Environment Configuration (`.env.example` & `README.md`)**:
  - `VITE_DEFAULT_LOCALE` (`en-US`, `id-ID`, etc.)
  - `VITE_DEFAULT_CURRENCY` (`USD`, `IDR`, `EUR`, etc.)
  - `VITE_DEFAULT_TIMEZONE` (`Asia/Jakarta`, `UTC`, etc.)
  - `VITE_DEFAULT_TIME_FORMAT` (`24h`, `12h`, `auto`)
- **Interactive Showcase Demo Page (`src/views/components/FormatterView.vue`)**:
  - Added new `/components/formatters` route in `src/router/index.ts`.
  - Registered in `AdminLayout.vue` sidebar navigation and Command Palette search (`Ctrl+K`).
  - Includes an interactive live playground and visible-by-default One Dark Pro code snippets.
- **Component Ergonomics (`src/components/CodePreview.vue`)**:
  - Added `hidePreview` and `defaultShowCode` props to support dedicated code-only documentation blocks.

#### 🏗️ Layout Architecture & Sidebar Modularization (`src/layouts/` & `src/components/layout/`)
- **Decomposed Monolithic `AdminLayout.vue`**:
  - Reduced `AdminLayout.vue` from 601 lines down to ~48 lines of clean shell orchestration.
  - Extracted modular sub-components placed under `src/components/layout/` (scanned by `unplugin-vue-components`):
    - `AppNavbar.vue` — Top fixed header with logo, breadcrumbs, search trigger, notification bell, profile & theme switchers.
    - `AppSidebar.vue` — Left collapsible sidebar navigation categorized by standard enterprise groups.
    - `CommandSearchDialog.vue` — Global `Ctrl+K` / `Cmd+K` searchable modal command palette.
    - `NotificationDrawer.vue` — Slide-out sheet notification panel with mark-all-as-read and filter states.
- **Sidebar & Navigation Hierarchy Reorganization**:
  - Reordered menu navigation into logical groups: **Overview** → **Design System** (Tokens, Typography, Icons, Formatters) → **UI Components** (Atomic to Complex) → **Authentication** → **Pages** → **System**.

#### 🧪 Expanded Test Coverage
- `src/services/auth.service.spec.ts` — Tests for login token persistence, dev fallback mock, logout token cleanup, and profile fetch.
- `src/services/user.service.spec.ts` — Tests for user list query params, offline fallback, initial generation, update, and deletion.
- `src/lib/axios.spec.ts` — Tests for token storage management and Axios instance default configurations.
- `src/lib/validation.spec.ts` — Schema validation tests for login and user management forms using Zod.
- `src/lib/formatters.spec.ts` — Full unit test suite for all formatter functions and boundary edge cases.

### Changed
- **AI Agent Guardrails (`GEMINI.md`, `CLAUDE.md`, `.agents/skills/`, `.claude/skills/`)**:
  - Enforced strict rule: Never run unit tests (`vitest`, `pnpm test`, `pnpm test:run`) autonomously without explicit user instruction.
- **Documentation & Roadmaps (`README.md`, `ROADMAP.md`)**:
  - Refactored `ROADMAP.md` to be realistic and focused on core Vue 3 SPA template requirements.
  - Updated `README.md` Project Structure and Available Pages tables to match the new layout modularization and menu order.

---

## [1.2.3] — 2026-08-21

### Added

#### 🧪 Unit Testing Framework & CI Pipeline Integration
- **Vitest & Testing Suite Setup**:
  - Integrated **Vitest** v4 with `@vue/test-utils` and `happy-dom` for fast, lightweight in-memory DOM unit testing.
  - Added test configuration to `vite.config.ts` and `"vitest/globals"` types in `tsconfig.app.json`.
  - Added npm scripts `"test"` (watch mode) and `"test:run"` (single CI run) to `package.json`.
- **Core Unit Test Suites**:
  - `src/lib/utils.spec.ts` — Comprehensive unit tests for `cn()` utility (class merging, conditionals, Tailwind conflict resolution, and objects/arrays).
  - `src/components/ui/button/Button.spec.ts` — Component tests for `Button.vue` (default slots, variant classes, data attributes, custom styles, and click emissions).
  - `src/stores/auth.spec.ts` — State management tests for `useAuthStore` Pinia store (initial state, `setUser`, isolated mock `logout`, and computed `isAuthenticated`).
- **GitHub Actions CI Integration** (`.github/workflows/ci.yml`):
  - Added automated `pnpm test:run` step prior to TypeScript checking and production build.

---

## [1.2.2] — 2026-08-19

### Added

#### 🎨 v1.2 Design System Ergonomics — Priority 3 (Badge & Avatar Primitives)

- **`<Badge>` Semantic Color Variants** (`src/components/ui/badge/index.ts`):
  - Extended `badgeVariants` CVA with three semantic color intent variants:
    - `success` — emerald tint (`bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400`)
    - `info` — blue tint (`bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400`)
    - `warning` — amber tint (`bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400`)
  - Added `shape` variant axis: `default` (rounded-md, existing behavior) and `pill` (rounded-full px-2.5).
  - Removes 6+ raw inline `<span>` pill elements from `BadgeAvatarView.vue`.

- **`<Badge dot pulse>` Live Status Props** (`src/components/ui/badge/Badge.vue`):
  - `dot` boolean prop renders a `bg-current` status indicator dot inside the badge, inheriting the variant's text color.
  - `pulse` boolean prop adds `animate-pulse` to the dot for live-operational status use cases.
  - Replaces 4+ manually assembled status-dot badge patterns.

- **`<Avatar status>` Presence Prop** (`src/components/ui/avatar/Avatar.vue`):
  - Added `status: 'online' | 'busy' | 'away' | 'offline'` prop.
  - Automatically renders a colored presence pip (`absolute bottom-0 right-0`) inside a built-in `relative` wrapper.
  - Color mapping: `online` → emerald-500, `busy` → red-500, `away` → amber-500, `offline` → muted-foreground/60.
  - Removes 4× manual `<div class="relative"><span class="absolute bottom-0 right-0 ...">` patterns from `BadgeAvatarView.vue`.

- **`<AvatarGroup>` Component** (`src/components/ui/avatar/AvatarGroup.vue`):
  - New compound component for stacked overlapping team avatar rows.
  - Props: `max` (clips visible avatars + shows `+N` overflow chip), `overlap` (`2 | 3 | 4` maps to Tailwind `-space-x-*` classes).
  - Replaces the manual `div.-space-x-3.overflow-hidden.p-1` pattern with a configurable, reusable primitive.
  - Exported via `src/components/ui/avatar/index.ts`.

### Migrated

- **`BadgeAvatarView.vue`**: All 7 showcase sections updated to use new primitives:
  - Inline `<span>` pill badges → `<Badge variant="success|info|warning" shape="pill">`
  - Inline status dot badges → `<Badge ... dot pulse>`
  - Manual `div.relative` + `span.absolute` presence combos → `<Avatar status="...">`
  - Manual `div.-space-x-3` avatar stack → `<AvatarGroup :max="4" :overlap="3">`
  - Code snippets within `CodePreview` blocks updated to match.

---

## [1.1.0] — 2026-08-19


### Added

#### 📚 In-App Interactive Documentation Suite
- **`<CodePreview>` Interactive Documentation Component** (`src/components/CodePreview.vue`):
  - Expandable "View Code / Hide Code" toggle.
  - One Dark Pro / VS Code inspired syntax highlighter (HTML tags, Vue directives, attributes, strings, mustache interpolations, comments).
  - Unselectable line-number gutter with hover highlights.
  - One-click "Copy Code" button with clipboard integration and Sonner toast feedback.

- **Full Showcase View Migration (100% Milestone v1.1 Completion)**:
  - **Buttons** (`ButtonView.vue`): 9 sections covering standard variants, outline tints, size scale, icon alignments, async spinners, toggle micro-actions, toolbars, full-width, and danger confirmation patterns.
  - **Cards & Surfaces** (`CardView.vue`): Basic cards, KPI metric widgets, flush edge-to-edge containers, action cards with hover lift, ambient glow (`.glow-area`) & mesh patterns.
  - **Form & Inputs** (`FormView.vue`): Text inputs with icons/password toggles, selects, auto-expanding textareas, radio groups, range sliders, number stepper, searchable combobox, zero-dependency date & range picker, switches, and checkboxes.
  - **Badges & Avatars** (`BadgeAvatarView.vue`): Semantic badge variants, live pulse radar dots, dismissible tags, avatar scale (24px–64px), real-time presence indicators, and avatar group stack.
  - **Modals & Dialogs** (`ModalView.vue`): Wide information dialogs, destructive confirmation alerts, modal action forms with async provisioning feedback, scrollable SLA dialogs, and slideover drawer sheets.
  - **Overlays & Drawers** (`OverlayView.vue`): Tooltips across all four positions (`top`, `right`, `bottom`, `left`), contextual query filter popovers, hover cards with rich entity preview, dual-edge sheet panels (`left`, `right`), and dropdown action menus.
  - **Feedback & Loading** (`FeedbackView.vue`): Semantic alert banners (`info`, `success`, `warning`, `destructive`), shimmer skeleton placeholders with loading simulation, determinate & high-load progress bars, button spinners, and radar status dots.
  - **Toast Notifications** (`ToastView.vue`): Contextual semantic toasts, promise loading tracking, interactive undo action buttons, and custom-duration multi-action toasts.
  - **Navigation & Flow** (`NavigationView.vue`): Multi-step stepper wizard, horizontal & underline tabs, vertical sidebar tabs, hierarchical breadcrumbs, numbered pagination controls, activity audit timeline, and collapsible accordions.
  - **Data Tables** (`TableView.vue`): Standard tabular layout, sortable columns (asc/desc), row checkbox selection with dynamic bulk actions toolbar, and instant search filter + pagination combo.
  - **Charts & Analytics** (`ChartView.vue`): Pure SVG Catmull-Rom area spline with period switcher (`7D`, `30D`, `90D`), bar chart distribution, segmented SVG donut ring, and live streaming latency sparkline.
  - **Typography Scale** (`TypographyView.vue`): H1–H6 scale hierarchy with optical tracking, lead/body/muted paragraph variants, blockquotes & callouts, formatted code blocks, and structured lists.

#### 📦 New UI Primitives
- **Hover Card** (`src/components/ui/hover-card/`): `HoverCard.vue`, `HoverCardTrigger.vue`, `HoverCardContent.vue` built on `reka-ui`.
- **Progress Bar** (`src/components/ui/progress/`): `Progress.vue` primitive with smooth transition indicator.
- **Enhanced Alert Variants** (`src/components/ui/alert/`): Added `info`, `success`, `warning`, and `destructive` semantic color variants in CVA definitions.
- Exported all new primitives via central barrel `src/components/ui/index.ts`.

#### 🎨 v1.2 Design System Ergonomics — Priority 2 (Component Encapsulation & Form Primitives)
- **`<CardHeader section>` Prop Standardization** (`src/components/ui/card/CardHeader.vue`):
  - Added `section` boolean prop to `CardHeader.vue` applying standard section styling (`p-6 border-b border-border bg-muted/10`) automatically without repetitive inline utility classes.
  - Migrated all section headers across `Settings`, `BlankView`, `ColorsView`, `CardView`, and `CodePreview`.

- **`<InputGroup>`, `<InputIcon>`, and `<InputAddon>` Primitives** (`src/components/ui/input/`):
  - `<InputGroup>`: Relative flex container coordinating inputs, icons, and text addons.
  - `<InputIcon side="left|right">`: Centered icon slot primitive replacing manual `absolute left-3 top-1/2 -translate-y-1/2` utility class boilerplate across form fields.
  - `<InputAddon side="left|right">`: Styled URL/domain text prefix and suffix badges (e.g. `https://`, `.supabase.co`).
  - Migrated all auth views (`RegisterView`, `ForgotPasswordView`, `ResetPasswordView`, `VerifyOtpView`) and `FormView` showcase + snippets.
  - Re-exported in `src/components/ui/input/index.ts` and `src/components/ui/index.ts`.

---

## [0.8.0] — 2026-08-19

### Added

#### 🎨 v1.2 Design System Ergonomics — Priority 1 (Component Encapsulation)

- **`<PageHeader>` Reusable Component** (`src/components/PageHeader.vue`):
  - Encapsulates the ~12-line page header boilerplate (`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between` + `label-mono` badge + `h1` + description paragraph) that was previously repeated verbatim across **18 views**.
  - Props: `title` (required), `description`, `badge` (label-mono chip text), `statusDot` (live/idle pulse indicator).
  - Named slot `#actions` for right-side CTAs (buttons, dropdowns, etc.).
  - Migrated all **18 affected views**: `Dashboard`, `Users`, `Settings`, `BlankView`, and all **14 showcase views** (`ButtonView`, `CardView`, `FormView`, `BadgeAvatarView`, `ModalView`, `OverlayView`, `FeedbackView`, `ToastView`, `NavigationView`, `TableView`, `ChartView`, `ColorsView`, `IconsView`, `TypographyView`).

- **`<Card flush>` Variant** (`src/components/ui/card/Card.vue`):
  - Added `flush` boolean prop via CVA that automatically applies `overflow-hidden py-0 gap-0` — previously written manually in **50+ locations** across the codebase.
  - Affected areas: Dashboard (5×), Settings (7×), Users (5×), Auth pages (4×), and all showcase views.
  - Migrated all flush card usages from `class="overflow-hidden py-0 gap-0"` to `<Card flush>`.
  - Updated `<CodePreview>` component to use `<Card flush>` internally.

### Fixed

- **`CardView.vue`**: Removed orphaned unclosed markup block (`<!-- Metric Card 3 -->`) caused by a partial template replacement in the previous session — resolved the "Element is missing end tag" IDE error on line 255.
- **`CardView.vue`**: Removed duplicate `highlight-card` metric cards (old style) that were left alongside the new `shadow-sm` metric cards in the same `<CodePreview>` block.
- **`CardView.vue`**: Cleaned up unused imports (`TrendingDown`, `FolderLock`, `Layers`, `TrendingUp`, `Users`). Added `Server` and `ArrowDownRight` imports required by the new metric cards.

---

## [0.7.0] — 2026-08-18

### Added

#### 🚨 Error & Edge Case Pages
- **404 Not Found Page** (`src/views/errors/NotFoundView.vue`):
  - 404 badge, descriptive illustration, and recovery actions (*Go Back*, *Back to Dashboard*).
  - Quick destination shortcuts to Overview, UI Components, and Settings.
  - Registered catch-all wildcard `/:pathMatch(.*)*` route in `src/router/index.ts` routing unmatched URLs directly to 404 view inside `AdminLayout`.
- **500 Internal Server Error Page** (`src/views/errors/ServerErrorView.vue`):
  - 500 status badge with server crash visual indicator.
  - Unique Request Trace ID chip with click-to-copy trigger for debugging.
  - Animated reload button with simulated retry state and direct link to system telemetry status.
- **403 Access Denied / Unauthorized Page** (`src/views/errors/UnauthorizedView.vue`):
  - Polished permission barrier view with shield alert badge, role guidance, and support contact trigger.
- Registered explicit routes: `/errors/404`, `/errors/500`, and `/errors/403` with search palette integration.

---

## [0.6.0] — 2026-08-18

### Added

#### 🎨 Design System Reference Pages
- **Typography & Text Scale Page** (`/components/typography`):
  - Standardized heading hierarchy (H1–H6) with size annotations, tracking, and optical weights.
  - Body & paragraph variants (lead paragraph, base body, muted helper, monospace token chips).
  - Editorial blockquotes with author citations and colored highlight callout surfaces.
  - Multi-line code block with one-click copy trigger and syntax formatting.
  - Unordered bullet lists and ordered numerical procedures.
- **Color Tokens Page** (`/components/colors`):
  - Interactive semantic color palette chips (`--primary`, `--secondary`, `--accent`, `--destructive`, `--muted`) with OKLCH values and copy-on-click variable names.
  - Surface and layout layering tokens (`--background`, `--card`, `--popover`, `--sidebar`).
  - Status & telemetry palette (Success emerald, Warning amber, Critical red, Info blue, Special purple) with badge samples.
- **Icon Set & Glyphs Directory** (`/components/icons`):
  - Searchable directory of 48+ Lucide icons categorized into Navigation, Interface, Data & Storage, Security, and Media & Files.
  - Real-time keyword filter input and category toggle pills.
  - Interactive click-to-copy generator producing `import { IconName } from '@lucide/vue'` snippets.
- Registered all 3 routes in `src/router/index.ts` and sidebar navigation with icons.

---

## [0.5.0] — 2026-08-18

### Added

#### 🧭 Navigation & Flow Showcase (`src/views/components/NavigationView.vue`)
- **Stepper / Wizard Primitive Component** (`src/components/ui/stepper/`):
  - Multi-step interactive flow with active, completed (checkmark), and pending states.
  - Step title, description, step indicators, and previous/next step control actions.
- **Vertical Tabs Layout**:
  - Side navigation tab variant designed for dense settings and nested dashboard views.
- **Activity Timeline Primitive Component** (`src/components/ui/timeline/`):
  - Vertical chronological event list with connecting lines, styled status node markers (`success`, `warning`, `info`, `neutral`), event descriptions, and relative time badges.
- **Keyboard Shortcut `<Kbd>` Component** (`src/components/ui/kbd/`):
  - Clean keyboard key badges with support for modifiers and keys across size variants.
- **Command Palette Interactive Showcase**:
  - Inline command search executor demonstrating hotkey bindings and grouped navigation items.
- Re-exported all new primitives (`stepper`, `timeline`, `kbd`) in `src/components/ui/index.ts`.

---

## [0.4.0] — 2026-08-18

### Added

#### 📝 Form Completeness Showcase (`src/views/components/FormView.vue`)
- **Radio Group Component Primitives** (`src/components/ui/radio-group/`):
  - `RadioGroup.vue` and `RadioGroupItem.vue` built with Reka UI primitives.
  - Showcase includes **Card Radio Selectors** (Starter, Pro Scale, Enterprise with pricing and badges) and **Standard Inline Radio Buttons** (Notification frequency).
- **Range Slider Component Primitives** (`src/components/ui/slider/`):
  - `Slider.vue` built with Reka UI (`SliderRoot`, `SliderTrack`, `SliderRange`, `SliderThumb`).
  - Interactive demos for **NVMe Disk Storage** (10 GB–1 TB) and **Dedicated RAM Allocation** (2 GB–64 GB) with live value badges and boundary marks.
- **Number Stepper**:
  - Cluster worker nodes counter (1–32) with increment/decrement buttons and keyboard validation.
- **Searchable Combobox**:
  - Autocomplete framework selector built with Popover, search input, category badges, and active checkmarks.
- **Multi-Select Tags**:
  - Chip tag collection with inline text input, Enter/comma trigger, and dismissible removal action.
- **File Upload / Drop Zone**:
  - Interactive drag-and-drop zone with animated highlight state, multi-file browser picker, simulated upload progress bar, status checkmarks, and remove actions.
- Re-exported all new primitives in `src/components/ui/index.ts`.

---

## [0.3.0] — 2026-08-18

### Added

#### 🤖 Developer Experience (DX)
- **Auto-Imports** via `unplugin-auto-import` and `unplugin-vue-components`:
  - Vue 3 reactivity (`ref`, `computed`, `watch`, `onMounted`, `useRoute`, `useRouter`, etc.) no longer requires manual import in every file.
  - All shadcn-vue / Reka UI components (`Button`, `Card`, `Input`, `Dialog`, `Badge`, etc.) are resolved automatically from `src/components/`.
  - TypeScript type declarations auto-generated at `src/auto-imports.d.ts` and `src/components.d.ts`.
- **Central UI Barrel Export** at `src/components/ui/index.ts` — all components re-exported for explicit single-line imports when needed.
- **Blank Starter Page** at `src/views/_starter/BlankView.vue` — ready-to-use boilerplate with page header + card layout. Register a new view in minutes.
- Registered `/starter/blank` route and sidebar menu entry (group **System**).

#### 📅 Date Picker Component (`src/components/ui/date-picker/`)
- **Single Date Picker** with Popover-based calendar grid, month navigation, today highlight, and clear button.
- **Date Range Picker** with start/end click flow, range highlight band (`bg-primary/15`), and capsule-style start/end markers.
- Zero external dependencies — built purely on Popover + Tailwind tokens.
- Auto-exported via barrel: `<DatePicker />` is auto-imported in any view.

#### 📊 Charts & Analytics View (`/components/charts`)
- New showcase page registered in router, sidebar (AreaChart icon), search palette, and breadcrumb.
- **Fluid Multi-Series Area Chart**: Centripetal Catmull-Rom spline (tension 0.35), dual-series comparison (current vs previous period), dynamic floating crosshair tooltip tracking cursor position, multi-stop emerald gradient fill, 7D / 30D / 90D period switcher.
- **API Traffic Bar Chart**: Rounded pill bars, glowing top-cap highlight, hover lift animation, tooltip.
- **Storage Donut Ring**: Segmented ring with `stroke-linecap="round"` and visual gap between segments, interactive legend, hover expand effect.
- **Live Edge Latency Wave**: Quadratic Bézier streaming sparkline with gradient fill.

#### ⚡ AdminLayout Cleanup
- Removed **50+ lines of redundant manual imports** from `src/layouts/AdminLayout.vue` — now only imports Lucide icons and `useAuthStore`.

### Changed
- **Date Picker** added to `FormView.vue` as section card #4.
- `src/components/ui/index.ts` updated to include `date-picker` export.
- `GEMINI.md` tech stack updated to document `unplugin-auto-import` and `unplugin-vue-components`.
- `tsconfig.app.json` updated to include `src/**/*.d.ts` for proper type resolution.
- `vite.config.ts` updated with `AutoImport` and `Components` plugin configuration.

### Fixed
- `ChartView.vue`: Removed `animate-ping` on hover dot that caused looping green circle animation even when mouse was stationary — replaced with static soft ambient halo.
- `ChartView.vue`: Fixed Tailwind v4 warning — `stroke-[12]` → `stroke-12`.

---

## [0.2.0] — 2026-08-18

### Added

#### 🏠 Dashboard (`/`)
- 4 KPI stat cards with inline SVG sparklines and positive/negative trend indicators.
- Quick Metrics banner: API Requests, Error Rate, Avg Response, Uptime SLA.
- Recent Transactions table with avatar fallbacks and payment status badges.
- Live Activity Feed (6 event types with styled icons).
- System Health monitor (5 services with live status indicator dots).

#### 👥 User Management (`/users`)
- KPI stats row: Total / Active / Pending / Suspended counts.
- Search input + Role and Status filter dropdowns.
- Full CRUD modals: **Add Team Member** (with email invite toggle), **Edit Member**, **Delete Confirmation**.
- User table with 2FA badges, Last Active timestamp, copy-email action with feedback, and pagination.

#### ⚙️ Settings (`/settings`)
- 4-tab layout:
  - **Profile** — avatar upload area, personal info fields, bio textarea, timezone/language selects.
  - **Security** — change password form, 2FA toggle, Passkey toggle, active session list with revoke action.
  - **Notifications** — 5 categorized switches for email/push/in-app channels.
  - **API Keys** — masked token table, copy action with feedback, Generate API Token modal.
- Fixed container width to `max-w-[1920px]` to match all other views.

#### 🎨 UI Component Showcases
- **Badges & Avatars** (`/components/badges`): Semantic badges, pulse status dots, icon pills, dismissible tags, avatar size scale (24px–64px), presence indicators, avatar group stack.
- **Toast & Alerts** (`/components/toasts`): All Sonner toast variants (Default, Success, Info, Warning, Error, Undo Action, Async Promise with loading state).
- Registered both routes in `src/router/index.ts` and sidebar with icons.

#### 🔧 Bug Fixes & Integrations
- **Sonner Toast fix**: Added `import 'vue-sonner/style.css'` to `src/main.ts` and mounted `<Toaster position="top-right" rich-colors close-button />` in `App.vue`.
- **Collapsible Accordion smooth animation** in `NavigationView.vue`: Replaced `v-show` with CSS Grid `grid-rows-[0fr/1fr]` 60fps transitions.
- **Sidebar eye strain fix**: Softened `--sidebar-foreground` from 100% white to `oklch(0.72 0.006 159)` (silver-gray) to reduce reading fatigue.
- **Settings padding fix**: Corrected container from `max-w-5xl` to `max-w-[1920px] mx-auto` to match other pages.
- Fixed multiple Tailwind v4 arbitrary value warnings across `TableView.vue`, `FeedbackView.vue`, `ModalView.vue`.
- Fixed unused import warnings in `ButtonsView.vue`.

---

## [0.1.0] — 2026-08-18

### Added

#### 🏗️ Project Scaffolding
- Initial project setup with **Vite + Vue 3 + TypeScript**.
- **Tailwind CSS v4** integration via `@tailwindcss/vite` and `tw-animate-css`.
- **Reka UI** (shadcn-vue primitives) configured.
- **Pinia** state management with `src/stores/auth.ts` (mock authentication session).
- **Vue Router** with nested layout structure:
  - `AdminLayout.vue` — sidebar + top navbar shell.
  - `AuthLayout.vue` — centered auth pages shell.
- **CSS design tokens** in `src/style.css`: OKLCH color palette, dark mode variables, sidebar tokens.

#### 📦 UI Component Library (`src/components/ui/`)
Installed and configured 27 primitive component sets:
`alert`, `alert-dialog`, `avatar`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `command`, `dialog`, `dropdown-menu`, `form`, `input`, `label`, `pagination`, `popover`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `tooltip`.

#### 🔐 Auth Pages (`/auth/*`)
- `LoginView.vue` — email + password form with mock auth logic.
- `RegisterView.vue` — registration form with role selection.
- `ForgotPasswordView.vue`, `ResetPasswordView.vue`, `ConfirmEmailView.vue`, `VerifyOtpView.vue`.

#### 🧩 UI Showcase Views (Initial)
- `ButtonsView.vue` — variant grid: default, outline, ghost, destructive, sizes, loading states, icon buttons.
- `FormView.vue` — text inputs with icon affixes, password toggle, prefix addon groups, selects, textarea, switches, checkboxes.
- `ModalView.vue` — basic, form, destructive, fullscreen, and slide-over dialog patterns.
- `CardView.vue` — metric, list, pricing, and interactive card variants.
- `TableView.vue` — TanStack Table integration with sorting, filtering, and pagination.
- `OverlayView.vue` — Sheet drawer, Tooltip, Popover, and Dropdown demos.
- `FeedbackView.vue` — Skeleton loaders, progress indicators, alert banners, empty states.
- `NavigationView.vue` — Tabs, breadcrumbs, vertical side navigation, collapsible accordions.

#### ⚙️ Layout & Navigation
- **Sidebar** with collapsible icon mode, group labels (Overview / UI Components / System).
- **Top Navbar** with breadcrumb, quick search modal (Ctrl+K), notification drawer, user profile dropdown, and theme switcher (Light / Dark / System).
- Custom `AppLogo.vue` component.
- `SidebarControl.vue` with dropdown for sidebar mode (`hover`, `locked`, `floating`).

---

*Maintained by the Nala project contributors.*
