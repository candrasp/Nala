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
- [ ] Live demo deployment (Vercel / Netlify / Cloudflare Pages)
