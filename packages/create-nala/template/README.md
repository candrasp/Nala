# NALA_APP_NAME

> Built with **Nala** — Enterprise Admin Dashboard Starter Template powered by Vue 3, Vite, TypeScript, and Tailwind CSS v4.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# with pnpm (Recommended)
pnpm install

# with npm
npm install

# with yarn
yarn install

# with bun
bun install
```

### 2. Environment Configuration

Copy the example environment file and customize as needed:

```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
pnpm dev
```

Open **http://localhost:5173** in your browser.

---

## 🛠️ Available Scripts

| Script | Command | Description |
|---|---|---|
| `pnpm dev` | `vite` | Starts local dev server with blazing fast HMR |
| `pnpm build` | `vue-tsc -b && vite build` | Type-checks & compiles production bundle to `dist/` |
| `pnpm preview` | `vite preview` | Previews production build locally |

---

## 📁 Project Structure

```
src/
├── assets/fonts/            # High-performance local Inter fonts (woff2)
├── components/
│   ├── layout/              # Admin shell (AppNavbar, AppSidebar, CommandPalette)
│   ├── ui/                  # 46 accessible UI primitives (Reka UI / shadcn-vue & Tiptap)
│   ├── AppLogo.vue          # Auto-imported brand logo component
│   ├── EmptyState.vue       # Auto-imported empty state component
│   └── PageHeader.vue       # Standardized page header component
├── composables/
│   ├── useFormatter.ts      # Native Intl data formatting helpers (auto-imported)
│   └── useThemeConfig.ts    # Runtime theme & layout state (auto-imported)
├── layouts/
│   ├── AdminLayout.vue      # Main authenticated dashboard layout
│   └── AuthLayout.vue       # Centered layout for login/register/auth flows
├── lib/
│   ├── axios.ts             # Central Axios client with silent refresh & error toasts
│   ├── formatters.ts        # Currency, Date, Number & Relative Time helpers
│   └── utils.ts             # cn() class merger (clsx + tailwind-merge)
├── router/
│   └── index.ts             # Route definitions & auth navigation guards
├── services/
│   ├── auth.service.ts      # Authentication API service (with safe DEV mock fallback)
│   ├── user.service.ts      # User profile API service
│   └── types.ts             # Shared API response contracts
├── stores/
│   └── auth.ts              # Pinia authentication & user session store
├── views/
│   ├── _starter/
│   │   └── BlankView.vue    # Clean blank template for creating new pages
│   ├── auth/                # Login, Register, Forgot/Reset Password, OTP, Lock Screen
│   ├── dashboard/           # Clean starter dashboard with KPI cards & recent table
│   └── errors/              # 404, 500, and 403 error pages
├── App.vue                  # Root application component with Toaster
├── main.ts                  # App initialization & Pinia/Router registration
└── style.css                # Tailwind CSS v4 & OKLCH color design tokens
```

---

## 📡 Connecting Your Backend API

This starter includes a production-grade Axios service layer in `src/lib/axios.ts` and `src/services/`.

1. Open `.env` and set your API endpoint:
   ```env
   VITE_API_BASE_URL=https://api.yourcompany.com/v1
   ```
2. **Safe DEV Mock Fallback:**
   While developing (`import.meta.env.DEV`), if your backend is offline, services will automatically fall back to safe in-memory mock data so you can build UI uninterrupted. In production (`pnpm build`), real API errors will be thrown normally.

---

## 🎨 Customizing Theme & Branding

- **Brand Colors:** Update `--primary` and `--ring` in `src/style.css` using standard `oklch` color format.
- **Default Theme Config:** Modify `DEFAULT_CONFIG` in `src/composables/useThemeConfig.ts`:
  ```ts
  const DEFAULT_CONFIG: ThemeConfig = {
    primaryColor: 'emerald', // emerald | indigo | violet | rose | amber | cyan | zinc
    radius: '0.375',         // 0 | 0.25 | 0.375 | 0.5 | 0.75 | 1.0
    contentWidth: 'fluid',   // fluid | boxed
  }
  ```

---

## 🤖 AI-Assisted Development

This project is configured out-of-the-box for AI coding assistants:
- **`AGENTS.md`** — Universal rules for Antigravity, Cursor, Claude Code, GitHub Copilot, Roo Code, and Windsurf.
- **`.agents/skills/nala-project/SKILL.md`** — Deep technical blueprints for building components, Pinia stores, and API services without hallucinations.

---

## 📄 License

This project is open-sourced software licensed under the [MIT License](./LICENSE).
