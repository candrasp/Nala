# Nala - Admin Dashboard Template

Template dashboard admin modern, bersih, dan performan yang dibangun menggunakan **Vue 3**, **Vite**, **TypeScript**, **Tailwind CSS v4**, serta komponen UI berbasis **shadcn-vue** (`reka-ui`) yang telah dimodifikasi ulang.

---

## ✨ Fitur Utama

- **⚡ Core Stack:** Vue 3 (Composition API `<script setup lang="ts">`) + Vite + TypeScript.
- **🎨 Modern Styling:** Tailwind CSS v4 (`@tailwindcss/vite` & `tw-animate-css`) dengan CSS Variables (`oklch`).
- **🧩 UI Component Library:** Component Primitives berbasis `reka-ui` & `shadcn-vue`.
- **🌙 Switcher Tema (System / Dark / Light):** Menggunakan `@vueuse/core` (`useColorMode`) yang persisten di `localStorage`.
- **📱 Responsive Layout:** Optimized dari layar smartphone (Mobile Drawer), Tablet, Desktop, hingga Layar 2K/4K Ultra-wide.
- **🔔 Notification Sheet:** Panel slide-over (Off-Canvas) interaktif dari sisi kanan dengan badge notifikasi, indikator terbaca/belum, dan aksi masal.
- **🗺️ Navigation & State:** Vue Router 4 (dengan layout wrapper `AdminLayout` & `AuthLayout`) dan Pinia Store.
- **🛡️ Strict Type Safety:** TypeScript + `vue-tsc` integration.

---

## 📂 Struktur Direktori

```text
nala/
├── src/
│   ├── assets/          # Assets statis (Inter fonts, logo, gambar)
│   ├── components/
│   │   └── ui/          # Primitive UI components (Avatar, Button, Sheet, Sidebar, Table, dll)
│   ├── layouts/         # Layout wrapper (AdminLayout.vue, AuthLayout.vue)
│   ├── lib/             # Helper utilities (cn() helper clsx + tailwind-merge)
│   ├── router/          # Vue Router setup
│   ├── stores/          # Pinia stores (auth.ts)
│   ├── views/           # Halaman tampilan (Dashboard, Users, Settings, Auth Login)
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global CSS + Tailwind v4 + Layer base overrides
├── .gitignore           # File pengabaian Git
├── package.json
└── vite.config.ts
```

---

## 🚀 Panduan Memulai

### Prasyarat

- Node.js (v20.0.0 atau lebih baru disarankan)
- `pnpm` Package Manager (`npm i -g pnpm`)

### Langkah Instalasi

1. **Clone repository ini:**
   ```bash
   git clone <repository-url>
   cd nala
   ```

2. **Install dependensi proyek:**
   ```bash
   pnpm install
   ```

3. **Jalankan Development Server:**
   ```bash
   pnpm dev
   ```
   Buka URL lokal yang muncul di terminal (biasanya `http://localhost:5173`) di browser Anda.

---

## 🛠️ Perintah Utama (Scripts)

| Perintah | Deskripsi |
| --- | --- |
| `pnpm dev` | Menjalankan Vite development server dengan HMR. |
| `pnpm build` | Memeriksa tipe data (`vue-tsc`) & melakukan build bundel produksi ke direktori `/dist`. |
| `pnpm preview` | Menjalankan preview lokal dari hasil build direktori `/dist`. |

---

## 📝 Lisensi

Proyek ini dibuat untuk penggunaan internal / bebas digunakan dan dikembangkan lebih lanjut.
