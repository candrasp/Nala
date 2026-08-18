# Changelog

All notable changes to **Nala** — Vue 3 Admin Dashboard Template — are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

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
