# GEMINI.md - Project Context & Coding Guidelines

Dokumen ini berisi konteks teknologi, aturan pengodean, dan panduan arsitektur untuk pengembangan proyek **Nala**.

---

## 🛠️ Tech Stack Overview

- **Framework:** Vue 3 (Composition API dengan `<script setup>`)
- **Build Tool:** Vite (`@vitejs/plugin-vue`)
- **Package Manager:** `pnpm`
- **Auto-Imports (DX):** `unplugin-auto-import` (Vue, Router, Pinia, VueUse) & `unplugin-vue-components` (shadcn-vue / Reka UI components)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` & `tw-animate-css`)
- **UI Primitive / Component Library:** Primitive via `reka-ui` & shadcn-vue
- **Data Table:** `@tanstack/vue-table`
- **Form & Validation:** `vee-validate`, `@vee-validate/zod`, dan `zod`
- **Icon Set:** `@lucide/vue`
- **State Management:** Pinia
- **Routing:** Vue Router
- **Utilities:** `@vueuse/core`, `axios`, `clsx`, `tailwind-merge`, `class-variance-authority`
- **Language & Type Check:** TypeScript & `vue-tsc`

---

## 🛑 Important Rules for AI Agent

1. **JANGAN JALANKAN `pnpm build` / `npm run build` SETELAH CODING:**
   - Setelah selesai menulis, mengedit, atau merestrukturisasi kode, **dilarang keras** menjalankan perintah `pnpm build` secara otomatis.
   - Pengecekan build/transpile hanya dilakukan jika pengguna memintanya secara eksplisit.
2. **Type Safety Strict Review:** Pastikan sintaks TypeScript, skema Zod, dan tipe Vue 3 valid secara statis tanpa harus mengeksekusi build.
3. **UI Language (English Only):** Semua teks antarmuka (UI), label form, placeholder, pesan validasi/error, judul halaman, status badge, dan notifikasi fitur baru WAJIB menggunakan **Bahasa Inggris** agar standar dan mudah dipahami oleh developer global.
4. **JANGAN JALANKAN `git add`, `git commit`, MAUPUN `git push` TANPA DIMINTA:**
   - Dilarang keras melakukan staging (`git add`), commit (`git commit`), maupun push ke GitHub (`git push`) secara otomatis atau mandiri.
   - Perintah Git hanya boleh dijalankan jika pengguna memberikan instruksi eksplisit untuk melakukannya.

---

## 📐 General Principles & Guidelines

1. **Composition API & Script Setup:** Selalu gunakan Vue 3 `<script setup lang="ts">`. Hindari Option API.
2. **UI Text & Localization Standard:** Gunakan bahasa Inggris untuk seluruh teks UI, deskripsi komponen, tooltip, placeholder, dan alert/dialog.
3. **Type Safety & Zod Validation:**
   - Manfaatkan `zod` bersama `vee-validate` dan `@vee-validate/zod` untuk menangani form validation.
   - Selalu definisikan tipe/interface eksplisit untuk props, emits, dan API response (Axios).
4. **Tailwind CSS v4 Setup:**
   - Menggunakan integrasi Vite `@tailwindcss/vite`.
   - Gunakan `clsx` dan `tailwind-merge` (via helper `cn()`) untuk penggabungan kelas styling Tailwind.
   - **Utamakan Konvensi Skala Sizing Tailwind v4:** Gunakan kelas nilai bawaan alih-alih arbitrary value jika tersedia. Contoh: gunakan `max-h-75` (75 x 4px = 300px), `w-75`, `h-75` daripada `max-h-[300px]`.
5. **Shadcn UI & Reka UI Patterns:**
   - Komponen UI dikembangkan di `@/components/ui` menggunakan komponen dasar dari `reka-ui`.
   - **Dialog/Modal Accessibility:** Setiap `DialogContent` WAJIB memiliki `DialogTitle` dan `DialogDescription` (bisa menggunakan `sr-only` jika ingin disembunyikan secara visual) untuk memenuhi standar aksesibilitas ARIA dan mencegah warning Reka UI.
   - **Avoid Native `autoFocus` in Dialogs:** Jangan tambahkan atribut `autoFocus` HTML bawaan pada elemen `<input>` di dalam Dialog/Modal, karena Reka UI secara otomatis telah mengelola pencapaian fokus keyboard.
6. **Icon Usage:**
   - Gunakan paket `@lucide/vue` untuk ikon.
   - Import ikon secara eksplisit (misal: `import { Search, User } from '@lucide/vue'`).
7. **State & Utilities:**
   - Manfaatkan Pinia untuk global state management.
   - Gunakan `@vueuse/core` untuk komposabel umum (seperti `useLocalStorage`, `useDebounceFn`, dll) sebelum membuat logika manual.
8. **Card Edge-to-Edge Sections (Flush Layout):** Pada komponen `Card` apa pun (widget, tabel, modal, form card) yang memiliki header/footer khusus (`bg-muted`, `border-t`/`border-b`), selalu override dengan `class="overflow-hidden py-0 gap-0"` agar padding bawaan card tidak merusak perataan dan footer/header menempel presisi ke sudut lengkung (`rounded-b-xl` / `rounded-t-xl`).
9. **Mobile Form Layouts (Keyboard-Safe):** Hindari vertical centering statis (`min-h-screen items-center justify-center`) pada halaman/tampilan mobile yang berisi form input. Selalu gunakan `min-h-dvh flex flex-col items-center justify-start pt-6 sm:pt-8 pb-12 px-4 sm:justify-center sm:py-8 sm:px-6 overflow-y-auto` agar form tidak tertutup keyboard layar.
10. **Navbar & Sidebar Horizontal Alignment:** Lebar sidebar saat collapse adalah `3.5rem` = 56px (`w-14`), tinggi navbar `h-14` (56px) — rasio 1:1 bujur sangkar pada sudut kiri atas. Elemen logo/brand di navbar wajib dibungkus dalam container `w-14 h-14 flex items-center justify-center` yang menempel dari tepi kiri ($x = 0$) dengan padding header kanan `pr-4 sm:pr-6` (tanpa `pl-*`) agar sejajar 100% dengan kolom ikon sidebar di bawahnya.

---

## 📂 Directory Structure

```text
src/
├── assets/                  # Static assets
│   ├── fonts/               # Local font files (Inter woff2)
│   ├── hero.png
│   ├── vite.svg
│   └── vue.svg
├── components/              # Component directory
│   ├── ui/                  # Primitive UI components (shadcn-vue / reka-ui)
│   │   ├── avatar/
│   │   ├── breadcrumb/
│   │   ├── button/
│   │   ├── card/
│   │   ├── dialog/
│   │   ├── dropdown-menu/
│   │   ├── form/
│   │   ├── input/
│   │   ├── label/
│   │   ├── separator/
│   │   ├── sheet/
│   │   ├── sidebar/
│   │   ├── skeleton/
│   │   ├── table/
│   │   └── tooltip/
│   └── HelloWorld.vue       # (legacy, can be removed)
├── layouts/                 # Application layout wrappers
│   ├── AdminLayout.vue      # Main admin layout with sidebar + navbar
│   └── AuthLayout.vue       # Auth pages layout (login, register)
├── lib/                     # Utilities
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── router/                  # Vue Router
│   └── index.ts             # Route definitions
├── stores/                  # Pinia stores
│   └── auth.ts              # Auth store (user session)
├── views/                   # Page views
│   ├── auth/
│   │   ├── ConfirmEmailView.vue
│   │   ├── ForgotPasswordView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── ResetPasswordView.vue
│   │   └── VerifyOtpView.vue
│   ├── dashboard/
│   │   └── IndexView.vue
│   ├── errors/
│   │   └── UnauthorizedView.vue
│   ├── settings/
│   │   └── IndexView.vue
│   └── users/
│       └── IndexView.vue
├── App.vue
├── main.ts
└── style.css                # Global styles + Tailwind v4 + CSS variables
```