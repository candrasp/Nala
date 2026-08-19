# Nala — Admin Dashboard Template

> A modern, production-ready admin dashboard template built with Vue 3, Vite, TypeScript, and Tailwind CSS v4.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nala.kenvano.web.id-10b981?style=for-the-badge&logo=cloudflare&logoColor=white)](https://nala.kenvano.web.id)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)

![Nala Dashboard Preview](./public/screenshot.png)

---

## ✨ Features

- 🎨 **Beautiful UI** — Built with [shadcn-vue](https://www.shadcn-vue.com/) primitives via `reka-ui` (New York style)
- 🌗 **Dark / Light / Auto Theme** — System preference detection + manual toggle via `@vueuse/core`
- 📐 **Collapsible Sidebar** — Responsive layout with pixel-perfect icon alignment
- 🔍 **Global Search** — Command palette with `Ctrl+K` / `Cmd+K` shortcut
- 🔔 **Notification Center** — Dropdown with unread badge counter
- 📊 **Chart Components** — SVG-based charts (area, bar, donut, sparkline) — no external chart library needed
- 📋 **Data Table** — Powered by `@tanstack/vue-table` with sorting, filtering, and pagination
- ✅ **Form & Validation** — `vee-validate` + `zod` schema validation
- 🗂️ **Auth Flow** — Login, Register, Forgot Password, OTP Verify, Reset Password, Confirm Email
- 🚫 **Error Pages** — 404 Not Found, 500 Server Error, 403 Access Denied
- 🎯 **Component Showcase** — Buttons, Forms, Modals, Cards, Tables, Charts, Overlays, Badges, Toasts, Navigation, Typography, Colors, Icons

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup lang="ts">`) |
| Build Tool | Vite 8 |
| Package Manager | `pnpm` |
| Styling | Tailwind CSS v4 + `tw-animate-css` |
| UI Primitives | `reka-ui` + shadcn-vue (New York style) |
| Data Table | `@tanstack/vue-table` |
| Form & Validation | `vee-validate` + `@vee-validate/zod` + `zod` |
| Icons | `@lucide/vue` |
| State Management | Pinia |
| Routing | Vue Router v5 |
| Utilities | `@vueuse/core`, `axios`, `clsx`, `tailwind-merge`, `class-variance-authority` |
| Type System | TypeScript 6 + `vue-tsc` |
| Notifications / Toast | `vue-sonner` |

---

## 🔗 Live Demo

**[https://nala.kenvano.web.id](https://nala.kenvano.web.id)**

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/candrasp/Nala.git
cd nala

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:5173**.

---

## 📁 Project Structure

```
nala/
├── public/
│   ├── favicon.svg
│   └── screenshot.png
├── src/
│   ├── assets/
│   │   └── fonts/             # Local Inter font files (woff2)
│   ├── components/
│   │   └── ui/                # UI primitive components (shadcn-vue / reka-ui)
│   │       ├── alert/
│   │       ├── alert-dialog/
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── breadcrumb/
│   │       ├── button/
│   │       ├── card/
│   │       ├── checkbox/
│   │       ├── command/
│   │       ├── date-picker/
│   │       ├── dialog/
│   │       ├── dropdown-menu/
│   │       ├── form/
│   │       ├── input/
│   │       ├── kbd/
│   │       ├── label/
│   │       ├── pagination/
│   │       ├── popover/
│   │       ├── radio-group/
│   │       ├── select/
│   │       ├── separator/
│   │       ├── sheet/
│   │       ├── sidebar/
│   │       ├── skeleton/
│   │       ├── slider/
│   │       ├── sonner/
│   │       ├── stepper/
│   │       ├── switch/
│   │       ├── table/
│   │       ├── tabs/
│   │       ├── textarea/
│   │       ├── timeline/
│   │       └── tooltip/
│   ├── layouts/
│   │   ├── AdminLayout.vue    # Main layout: sidebar + navbar + search + notifications
│   │   └── AuthLayout.vue     # Auth pages layout (login, register, etc.)
│   ├── lib/
│   │   └── utils.ts           # cn() helper = clsx + tailwind-merge
│   ├── router/
│   │   └── index.ts           # Route definitions
│   ├── stores/
│   │   └── auth.ts            # Auth store (user session)
│   ├── views/
│   │   ├── _starter/
│   │   │   └── BlankView.vue  # Blank starter page template
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   ├── RegisterView.vue
│   │   │   ├── ForgotPasswordView.vue
│   │   │   ├── ResetPasswordView.vue
│   │   │   ├── VerifyOtpView.vue
│   │   │   └── ConfirmEmailView.vue
│   │   ├── components/        # Component showcase / documentation pages
│   │   │   ├── ButtonView.vue
│   │   │   ├── FormView.vue
│   │   │   ├── ModalView.vue
│   │   │   ├── CardView.vue
│   │   │   ├── TableView.vue
│   │   │   ├── ChartView.vue
│   │   │   ├── OverlayView.vue
│   │   │   ├── FeedbackView.vue
│   │   │   ├── BadgeAvatarView.vue
│   │   │   ├── ToastView.vue
│   │   │   ├── NavigationView.vue
│   │   │   ├── TypographyView.vue
│   │   │   ├── ColorsView.vue
│   │   │   └── IconsView.vue
│   │   ├── dashboard/
│   │   │   └── IndexView.vue  # Main dashboard with KPI cards + charts + table
│   │   ├── errors/
│   │   │   ├── NotFoundView.vue
│   │   │   ├── ServerErrorView.vue
│   │   │   └── UnauthorizedView.vue
│   │   ├── settings/
│   │   │   └── IndexView.vue  # Profile, Security, Notifications, Appearance tabs
│   │   └── users/
│   │       └── IndexView.vue  # User management with CRUD dialogs
│   ├── App.vue
│   ├── main.ts
│   └── style.css              # Global styles + Tailwind v4 + CSS variables (oklch)
├── .env.example
├── package.json
└── vite.config.ts
```

---

## 📄 Available Pages

### Admin Area (`/`)

| Route | Name | Description |
|---|---|---|
| `/` | Dashboard | KPI stats, area charts, sparklines, recent activity table |
| `/users` | Users | User management with create/edit/delete dialogs |
| `/settings` | Settings | Profile, Security (2FA), Notifications, Appearance |
| `/errors/404` | Not Found | 404 error page |
| `/errors/500` | Server Error | 500 error page |
| `/errors/403` | Access Denied | 403 unauthorized page |
| `/starter/blank` | Blank Page | Empty starter template |

### Component Showcase (`/components/*`)

| Route | Description |
|---|---|
| `/components/buttons` | All button variants, sizes, and states |
| `/components/forms` | Input, Select, Textarea, Checkbox, Switch, Slider, Date Picker, Stepper |
| `/components/modals` | Dialog, Alert Dialog variants |
| `/components/cards` | Card layout patterns |
| `/components/tables` | TanStack Table with sorting and pagination |
| `/components/charts` | Area, Bar, Donut, Sparkline charts (pure SVG) |
| `/components/overlays` | Sheet (off-canvas), Popover, Tooltip |
| `/components/feedback` | Skeleton loading, Progress, Alerts |
| `/components/badges` | Badge variants, Avatar with fallback |
| `/components/toasts` | Toast / Sonner notification variants |
| `/components/navigation` | Breadcrumb, Tabs, Pagination, Timeline, Stepper |
| `/components/typography` | Heading scales, body text, code, prose |
| `/components/colors` | Full color token reference (light + dark) |
| `/components/icons` | Lucide icon directory with search |

### Auth Pages (`/auth/*`)

| Route | Description |
|---|---|
| `/auth/login` | Login form |
| `/auth/register` | Register form with password strength |
| `/auth/forgot-password` | Forgot password email form |
| `/auth/verify-otp` | 6-digit OTP verification |
| `/auth/reset-password` | New password form |
| `/auth/confirm-email` | Email confirmation waiting page |

---

## 🎨 Design System

### Color Tokens

All colors use CSS custom properties based on the **oklch** color space, with full light and dark mode support.

```css
/* Key tokens */
--background / --foreground       /* Page background & primary text */
--primary / --primary-foreground  /* Brand accent (buttons, active links) */
--secondary / --secondary-foreground
--muted / --muted-foreground      /* Subtle text, placeholders */
--accent / --accent-foreground    /* Hover states */
--destructive                     /* Danger actions (delete, error) */
--border                          /* All borders */
--card / --card-foreground        /* Card backgrounds */
--sidebar / --sidebar-*           /* Sidebar-specific tokens */
```

### Theme Switching

Theme is managed via `useColorMode` from `@vueuse/core`. Three modes supported:

- `light` — Force light mode
- `dark` — Force dark mode
- `auto` — Follow OS preference (default)

---

## 🧩 Extending This Template

### Adding a New Page

1. **Create the view** — `src/views/<feature>/IndexView.vue`
2. **Register the route** — Add to `children[]` in `src/router/index.ts`
3. **Add to sidebar** — Add entry to the appropriate `nav` array in `src/layouts/AdminLayout.vue`
4. **Update page title** — Add a case to `pageTitle` computed in `AdminLayout.vue`

```ts
// 1. router/index.ts
{ path: 'products', name: 'products', component: () => import('@/views/products/IndexView.vue') }

// 2. AdminLayout.vue — mainNav array
{ name: 'Products', routeName: 'products', href: '/products', icon: Package }

// 3. AdminLayout.vue — pageTitle computed
if (route.name === 'products') return 'Product Management'
```

### Adding a Pinia Store

```ts
// src/stores/products.ts
import { defineStore } from 'pinia'

export interface Product { id: string; name: string; price: number }

export const useProductStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const isLoading = ref(false)

  async function fetchAll() {
    isLoading.value = true
    try {
      // const { data } = await axios.get('/api/products')
      // items.value = data
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, fetchAll }
})
```

### Adding Route Guards

The template ships without active route guards to keep it flexible. To add auth protection, update `src/router/index.ts`:

```ts
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const publicRoutes = ['login', 'register', 'forgot-password']

  if (!publicRoutes.includes(to.name as string) && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
```

---

## ⚙️ Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `VITE_APP_NAME` | Application name shown in UI | `Nala` |

---

## 📦 Scripts

```bash
pnpm dev      # Start dev server with HMR (http://localhost:5173)
pnpm build    # Type-check + build for production
pnpm preview  # Preview production build locally
```

---

## 🚀 Deployment

For production deployment instructions on Vercel, Netlify, Cloudflare Pages, GitHub Pages, Docker, and Nginx VPS, see the [Deployment Guide](./DEPLOYMENT.md).

---

## 📝 License

MIT License — free to use for personal and commercial projects.

---

<p align="center">
  Built with ❤️ using Vue 3 + Vite + Tailwind CSS v4
</p>
