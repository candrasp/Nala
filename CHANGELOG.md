# Changelog

All notable changes to **Nala** — Vue 3 Admin Dashboard Template — are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

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
