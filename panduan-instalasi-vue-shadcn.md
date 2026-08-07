# Panduan Instalasi Vue 3 + Vite + Tailwind CSS v4 + shadcn-vue
### (Admin Template — Update Agustus 2026)

---

## 0. Prasyarat

| Tool | Versi Minimum | Cek dengan |
|---|---|---|
| Node.js | 18+ (disarankan 20 LTS) | `node -v` |
| Package manager | pnpm (disarankan) | `pnpm -v` |

```bash
npm install -g pnpm
```

> shadcn-vue mendukung npm, yarn, dan bun juga — panduan ini pakai pnpm karena paling cepat dan direkomendasikan resmi oleh tim shadcn-vue.

---

## 1. Buat Project Vue 3 + Vite

```bash
pnpm create vite@latest my-admin --template vue-ts
cd my-admin
pnpm install
```

Pastikan pilih template **`vue-ts`** (Vue 3 + TypeScript) — bukan `vue` biasa, karena shadcn-vue CLI mengandalkan TypeScript untuk komponennya.

---

## 2. Install Tailwind CSS v4

```bash
pnpm add tailwindcss @tailwindcss/vite
```

Ganti seluruh isi `src/style.css` menjadi:

```css
@import "tailwindcss";
```

> Catatan: Tailwind v4 tidak lagi butuh `tailwind.config.js` + `postcss.config.js` seperti v3 — konfigurasi plugin cukup lewat Vite plugin di langkah berikutnya.

---

## 3. Setup Path Alias `@/`

### 3a. Install `@types/node`

Diperlukan agar `path.resolve(__dirname, ...)` tidak error di TypeScript.

```bash
pnpm add -D @types/node
```

### 3b. Edit `tsconfig.json` (root)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3c. Edit `tsconfig.app.json`

Tambahkan `baseUrl` dan `paths` ke dalam `compilerOptions` yang sudah ada:

```json
{
  "compilerOptions": {
    // ...opsi lain yang sudah ada, jangan dihapus
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3d. Edit `vite.config.ts`

> ⚠️ **Penting (Vite 8+):** config loader `native` di Vite 8 tidak lagi mendukung `__dirname` (API CommonJS lama). Gunakan `import.meta.dirname` sebagai gantinya, atau akan muncul warning saat `pnpm dev`.

```typescript
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
```

---

## 4. Jalankan shadcn-vue CLI

```bash
pnpm dlx shadcn-vue@latest init
```

CLI akan menanyakan beberapa hal seperti base color (mis. `Neutral`, `Zinc`, `Slate`). Setelah selesai, file `components.json` akan otomatis dibuat di root project — ini adalah file konfigurasi shadcn-vue (style, alias, icon library, dsb).

> Sejak versi terbaru, `init` otomatis meng-install **Reka UI** (penerus resmi Radix Vue) sebagai dependency headless component di balik layar. Ini normal, tidak perlu langkah tambahan.

### Alternatif lebih cepat (opsional)

Ada command `create` yang menggabungkan langkah 1–4 dalam satu perintah interaktif:

```bash
npx shadcn-vue create
```

Cocok untuk scaffolding cepat, tapi cara manual di atas lebih disarankan untuk admin template jangka panjang karena Anda memahami persis apa yang ter-setup — memudahkan debugging saat maintenance.

---

## 5. Tambah Komponen UI

```bash
pnpm dlx shadcn-vue@latest add button card table dropdown-menu sidebar dialog form input label separator breadcrumb avatar
```

Komponen masuk sebagai **source code** ke `src/components/ui/`, bukan npm package — jadi bebas dimodifikasi langsung tanpa "fighting the library". Cara pakai:

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>
```

---

## 6. Package Wajib untuk Admin Template

### Routing
```bash
pnpm add vue-router
```

### State Management
```bash
pnpm add pinia
```

### Form & Validasi (kombinasi resmi didukung shadcn-vue)

> ⚠️ **Penting:** `@vee-validate/zod@4.15.1` masih hanya mendukung **Zod v3** sebagai peer dependency. Jika Anda install `zod` tanpa versi spesifik, pnpm akan menarik Zod v4 (versi terbaru) dan memicu warning peer dependency. Pin ke v3 secara eksplisit:

```bash
pnpm add vee-validate @vee-validate/zod
pnpm add zod@^3.24.0
```

Dukungan Zod v4 sedang dikerjakan di vee-validate v5 (masih beta, belum stabil) — tetap pakai v3 sampai rilis stabil tersedia.

### HTTP Client
```bash
pnpm add axios
```

### Icon

> ⚠️ **Penting:** `lucide-vue-next` sudah **deprecated**. Package penggantinya adalah `@lucide/vue`.

```bash
pnpm add @lucide/vue
```

Import-nya:
```ts
import { Home } from '@lucide/vue'
```

Jika ada komponen shadcn-vue (mis. `sidebar`) yang di-generate CLI masih meng-import dari `lucide-vue-next`, cari-ganti impor tersebut ke `@lucide/vue` di seluruh `src/components/ui/`.

---

## 7. Tooling untuk Maintainability

```bash
pnpm create @eslint/config
pnpm add -D prettier eslint-config-prettier eslint-plugin-vue
pnpm add -D husky lint-staged
pnpm dlx husky init
```

Tambahkan di `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,vue}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 8. Struktur Folder yang Disarankan

```
src/
├── assets/
├── components/
│   ├── ui/              # komponen shadcn-vue (auto-generated, jangan diedit manual selain kustomisasi sadar)
│   └── shared/           # komponen custom reusable (DataTable, PageHeader, dll)
├── layouts/
│   ├── AdminLayout.vue
│   └── AuthLayout.vue
├── views/
│   ├── dashboard/
│   ├── users/
│   └── settings/
├── router/
│   ├── index.ts
│   └── routes/
├── stores/                # Pinia stores
├── composables/           # useXxx() reusable logic
├── lib/
│   └── utils.ts           # cn() helper dari shadcn-vue
├── services/               # axios instance & API calls
├── types/                  # TypeScript interfaces
└── App.vue
```

---

## 9. Verifikasi Instalasi

```bash
pnpm dev
```

Buka `http://localhost:5173`, lalu tambahkan `<Button>Test</Button>` sementara di `App.vue` untuk memastikan styling shadcn-vue ter-load dengan benar (tombol harus tampil dengan style, bukan tombol HTML polos).

---

## Ringkasan Versi (per Agustus 2026)

| Package | Versi/Status |
|---|---|
| shadcn-vue | 2.8.1 (aktif) |
| Tailwind CSS | v4 (via `@tailwindcss/vite`, tanpa config file terpisah) |
| Headless UI di balik shadcn-vue | Reka UI v2 (bukan Radix Vue lagi) |
| Vue | 3.x (via template `vue-ts`) |
| zod | **pin ke v3.x** — `@vee-validate/zod` belum resmi dukung v4 |
| lucide-vue-next | **deprecated** — gunakan `@lucide/vue` |

### Known Issues (Agustus 2026)

- **`zod` v4 vs `@vee-validate/zod`**: install `zod` tanpa versi akan menarik v4 dan memicu warning peer dependency karena `@vee-validate/zod@4.15.1` masih target `zod@^3.24.0`. Selalu pin `zod@^3.24.0` saat pakai vee-validate.
- **`lucide-vue-next` deprecated**: ganti ke `@lucide/vue`, termasuk di komponen `src/components/ui/` hasil generate CLI yang mungkin masih memakai import lama.
- **Vite 8 `__dirname` deprecated**: config loader `native` di Vite 8 minta `import.meta.dirname` menggantikan `__dirname` di `vite.config.ts`.

---

## Urutan Kerja Setelah Instalasi

1. Bangun `AdminLayout.vue` pakai komponen `sidebar` dari shadcn-vue
2. Setup `vue-router` dengan nested routes di dalam layout
3. Setup Pinia store untuk auth/user state
4. Buat halaman fitur satu per satu di `views/`
