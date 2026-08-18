---
name: nala-project
description: >
  Skill untuk proyek Nala - sebuah Enterprise Admin Dashboard Template berbasis Vue 3,
  Vite, TypeScript, Tailwind CSS v4, reka-ui (shadcn-vue), Pinia, dan Real API Service Layer.
  Aktif ketika pengguna meminta penambahan halaman, komponen, store, service API, fitur UI,
  atau refactoring pada proyek Nala.
---

# Nala Project Skill

Kamu adalah expert developer untuk proyek **Nala** — Enterprise Admin Dashboard Template modern dan siap pakai yang dibangun dengan stack Vue 3 + Vite + TypeScript + Tailwind CSS v4.

Ikuti semua panduan di bawah ini secara ketat setiap kali menulis atau memodifikasi kode pada proyek ini.

---

## 🛠️ Tech Stack Overview

| Layer | Teknologi |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup lang="ts">`) |
| Build Tool | Vite 8 (`@vitejs/plugin-vue`) |
| Package Manager | `pnpm` |
| Auto-Imports | `unplugin-auto-import` (Vue, Router, Pinia, VueUse) & `unplugin-vue-components` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + `tw-animate-css` |
| UI Primitives | `reka-ui` + shadcn-vue (style: New York) |
| Data Table | `@tanstack/vue-table` |
| Form & Validation | `vee-validate` + `@vee-validate/zod` + `zod` |
| Icon Set | `@lucide/vue` (selalu impor eksplisit) |
| State Management | Pinia |
| Routing | Vue Router v5 |
| HTTP & API Layer | Axios + Enterprise Interceptors (Silent Token Refresh, Error Toast, Loading Bar) |
| Notifications / Toast | `vue-sonner` |
| Utilities | `@vueuse/core`, `clsx`, `tailwind-merge`, `class-variance-authority` |
| Language & Types | TypeScript 6 + `vue-tsc` |

---

## 🛑 Aturan Ketat (WAJIB DIPATUHI)

1. **JANGAN PERNAH** jalankan `pnpm build` atau `npm run build` setelah selesai coding — hanya run dev server jika diminta eksplisit.
2. **JANGAN** gunakan Option API — selalu gunakan `<script setup lang="ts">`.
3. **JANGAN** gunakan `any` type — selalu definisikan tipe/interface eksplisit.
4. **JANGAN** install package baru tanpa konfirmasi eksplisit dari pengguna.
5. **JANGAN** buat file CSS terpisah per komponen — gunakan Tailwind utility classes.
6. **JANGAN** gunakan `style scoped` jika bisa diselesaikan dengan Tailwind.
7. **JANGAN** hapus komentar atau docstring yang tidak terkait dengan perubahan kode.
8. **SELALU** gunakan **Bahasa Inggris (English)** untuk teks antarmuka (UI), label, form validation message, notifikasi toast, dan penamaan fitur/halaman baru.
9. **JANGAN PERNAH** jalankan `git add`, `git commit`, maupun `git push` tanpa instruksi eksplisit dari pengguna.

---

## 📂 Struktur Direktori Proyek

```
src/
├── assets/
│   └── fonts/             # Local Inter font files (woff2)
├── components/
│   ├── AppLogo.vue        # Main application brand logo
│   └── ui/                # 34+ Primitive UI components (shadcn-vue / reka-ui)
│       ├── alert/         -> Alert, AlertTitle, AlertDescription
│       ├── alert-dialog/  -> AlertDialog, AlertDialogContent, AlertDialogTrigger, dll
│       ├── avatar/        -> Avatar, AvatarFallback, AvatarImage
│       ├── badge/         -> Badge (variants: default|secondary|destructive|outline|success|warning|info)
│       ├── breadcrumb/    -> Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, dll
│       ├── button/        -> Button (variants: default|destructive|outline|ghost|link|secondary)
│       ├── card/          -> Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
│       ├── checkbox/      -> Checkbox
│       ├── command/       -> Command, CommandInput, CommandList, CommandItem, CommandGroup
│       ├── date-picker/   -> DatePicker
│       ├── dialog/        -> Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
│       ├── dropdown-menu/ -> DropdownMenu, DropdownMenuContent, DropdownMenuItem, dll
│       ├── form/          -> Form, FormControl, FormField, FormItem, FormLabel, FormMessage
│       ├── input/         -> Input
│       ├── kbd/           -> Kbd
│       ├── label/         -> Label
│       ├── loading-bar/   -> LoadingBar (top progress indicator)
│       ├── pagination/    -> Pagination, PaginationList, PaginationItem, dll
│       ├── popover/       -> Popover, PopoverContent, PopoverTrigger
│       ├── radio-group/   -> RadioGroup, RadioGroupItem
│       ├── select/        -> Select, SelectContent, SelectItem, SelectTrigger, SelectValue
│       ├── separator/     -> Separator
│       ├── sheet/         -> Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
│       ├── sidebar/       -> SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, dll
│       ├── skeleton/      -> Skeleton
│       ├── slider/        -> Slider
│       ├── sonner/        -> Toaster, toast (re-exported from vue-sonner)
│       ├── stepper/       -> Stepper, StepperItem, StepperTrigger, dll
│       ├── switch/        -> Switch
│       ├── table/         -> Table, TableBody, TableCell, TableHead, TableHeader, TableRow
│       ├── tabs/          -> Tabs, TabsList, TabsTrigger, TabsContent
│       ├── textarea/      -> Textarea
│       ├── timeline/      -> Timeline, TimelineItem, TimelineContent, dll
│       └── tooltip/       -> Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
├── layouts/
│   ├── AdminLayout.vue    # Main layout: Sidebar + Navbar + Global Search + Notifications
│   └── AuthLayout.vue     # Auth layout: Responsive centered card layout
├── lib/
│   ├── axios.ts           # Enterprise Axios instance with silent refresh & toast interceptors
│   ├── loading-bar.ts     # Global Top Loading Bar state & controller
│   └── utils.ts           # cn() = clsx + tailwind-merge
├── router/
│   └── index.ts           # Route definitions + Route Guard boilerplate + Loading hooks
├── services/              # Typed API Services Layer
│   ├── types.ts           # Common API response interfaces (ApiResponse, PaginatedResponse, ApiError)
│   ├── auth.service.ts    # Authentication API service (login, register, profile, tokens)
│   ├── user.service.ts    # User management CRUD API service with smart local fallback
│   └── index.ts           # Barrel export
├── stores/
│   └── auth.ts            # Pinia Auth store with token & service integration
├── views/
│   ├── _starter/
│   │   └── BlankView.vue  # Blank starter template for new pages
│   ├── auth/
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── ForgotPasswordView.vue
│   │   ├── ResetPasswordView.vue
│   │   ├── VerifyOtpView.vue
│   │   └── ConfirmEmailView.vue
│   ├── components/        # 14 Documentation / Component Showcase pages
│   │   ├── BadgeAvatarView.vue
│   │   ├── ButtonView.vue
│   │   ├── CardView.vue
│   │   ├── ChartView.vue
│   │   ├── ColorsView.vue
│   │   ├── FeedbackView.vue
│   │   ├── FormView.vue
│   │   ├── IconsView.vue
│   │   ├── ModalView.vue
│   │   ├── NavigationView.vue
│   │   ├── OverlayView.vue
│   │   ├── TableView.vue
│   │   ├── ToastView.vue
│   │   └── TypographyView.vue
│   ├── dashboard/
│   │   └── IndexView.vue  # KPI stats, SVG charts, recent activity
│   ├── errors/
│   │   ├── NotFoundView.vue     # 404
│   │   ├── ServerErrorView.vue  # 500
│   │   └── UnauthorizedView.vue # 403
│   ├── settings/
│   │   └── IndexView.vue  # Profile, Security (2FA), Notifications, Appearance
│   └── users/
│       └── IndexView.vue  # User Management with CRUD modals & service integration
├── App.vue                # Root component (LoadingBar + RouterView + Toaster)
├── main.ts                # Application entry point
└── style.css              # Global styles + Tailwind v4 + CSS variables (oklch)
```

---

## 📐 Coding Conventions

### 1. Vue SFC Structure Order

```vue
<script setup lang="ts">
// 1. Import types & interfaces
// 2. Import komponen UI dari @/components/ui/* (jika tidak auto-imported)
// 3. Import icons dari @lucide/vue (selalu eksplisit)
// 4. Import composables / utilities (ref, computed, @vueuse/core, cn)
// 5. Import services & stores (@/services/*, @/stores/*)
// 6. Definisi interface / tipe lokal
// 7. Props & emits
// 8. State, computed & actions
</script>

<template>
  <!-- Template dengan Tailwind utility classes -->
</template>
```

### 2. Icon Usage (Selalu Eksplisit)

```ts
// BENAR - import eksplisit
import { Search, User, Plus, ChevronDown, Loader2, Trash2, Edit2 } from '@lucide/vue'

// SALAH - jangan import namespace
// import * as Icons from '@lucide/vue'
```

### 3. Utility `cn()` untuk Dynamic Class Merging

```ts
import { cn } from '@/lib/utils'

const buttonClass = cn(
  'flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors',
  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent',
  props.customClass
)
```

---

## 🌐 API & Service Layer Pattern (v0.8 Standard)

### 1. Memanggil API via `apiClient`

Gunakan `apiClient` dari `@/lib/axios` untuk request HTTP standar. Sudah mendukung TypeScript Generics, otomatis menginjeksi token Bearer, dan menampilkan error toast otomatis jika gagal.

```ts
import { apiClient } from '@/lib/axios'
import type { ApiResponse } from '@/services/types'

// GET request typed
const users = await apiClient.get<UserItem[]>('/users')

// POST request typed
const newUser = await apiClient.post<UserItem>('/users', payload)

// Custom config (skip error toast / skip auth)
const data = await apiClient.get('/public-stats', { skipAuth: true, skipToast: true })
```

### 2. Membuat API Service Baru (`src/services/`)

Buat modul service yang mengisolasi endpoint API dan menyediakan sistem *graceful fallback* agar template tetap bekerja baik secara online maupun saat backend belum siap:

```ts
// src/services/product.service.ts
import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export interface ProductItem {
  id: string
  title: string
  price: number
}

export const productService = {
  async getProducts(): Promise<ProductItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<ProductItem[]> | ProductItem[]>('/products')
      return Array.isArray(res) ? res : res.data
    } catch {
      // Fallback mock data saat backend offline
      return [
        { id: 'prd-1', title: 'Standard Subscription', price: 29 },
        { id: 'prd-2', title: 'Enterprise Dedicated', price: 199 },
      ]
    }
  },

  async createProduct(payload: Omit<ProductItem, 'id'>): Promise<ProductItem> {
    const res = await apiClient.post<ProductItem>('/products', payload)
    return res
  },
}
```

### 3. Pinia Store Pattern (Setup Store)

```ts
// src/stores/products.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService, type ProductItem } from '@/services/product.service'
import { toast } from '@/components/ui/sonner'

export const useProductStore = defineStore('products', () => {
  const items = ref<ProductItem[]>([])
  const isLoading = ref(false)
  const totalCount = computed(() => items.value.length)

  async function fetchProducts() {
    isLoading.value = true
    try {
      items.value = await productService.getProducts()
    } catch {
      toast.error('Failed to load products.')
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, totalCount, fetchProducts }
})
```

---

## 🎨 Design System & Tokens (oklch)

Semua warna menggunakan CSS variables berbasis **oklch**. Tersedia mode light dan dark.

| Token Tailwind | CSS Variable | Kegunaan |
|---|---|---|
| `bg-background` / `text-foreground` | `--background` / `--foreground` | Latar belakang & teks utama |
| `bg-primary` / `text-primary-foreground` | `--primary` / `--primary-foreground` | Aksi utama, tombol aktif, brand color |
| `bg-secondary` / `text-secondary-foreground` | `--secondary` / `--secondary-foreground` | Elemen sekunder |
| `bg-muted` / `text-muted-foreground` | `--muted` / `--muted-foreground` | Teks redup, background abu-abu lembut |
| `bg-accent` / `text-accent-foreground` | `--accent` / `--accent-foreground` | Hover state, highlight elemen |
| `bg-destructive` / `text-destructive-foreground` | `--destructive` | Aksi berbahaya (delete, error, revoked) |
| `border-border` | `--border` | Garis tepi dan pemisah |
| `bg-card` / `text-card-foreground` | `--card` / `--card-foreground` | Background container card |
| `bg-sidebar` / `text-sidebar-foreground` | `--sidebar` / `--sidebar-*` | Token khusus sidebar |

### Theme Switcher

Dikelola via `useColorMode` dari `@vueuse/core`. Dark mode aktif dengan class `.dark` pada tag `<html>`. Mode: `auto` (default sistem), `dark`, `light`.

---

## 🧭 Routing & Navigation Guide

### Menambah Halaman Baru (Admin Area)

1. Buat view di `src/views/<feature>/IndexView.vue` (bisa duplikasi dari `src/views/_starter/BlankView.vue`).
2. Daftarkan route di `src/router/index.ts` pada array `children` di path `/`:
   ```ts
   { path: 'products', name: 'products', component: () => import('@/views/products/IndexView.vue') }
   ```
3. Tambahkan ke navigasi sidebar di `src/layouts/AdminLayout.vue` (`mainNav`, `componentNav`, atau `systemNav`):
   ```ts
   { name: 'Products', routeName: 'products', href: '/products', icon: Package }
   ```
4. Perbarui computed `pageTitle` di `src/layouts/AdminLayout.vue`:
   ```ts
   if (route.name === 'products') return 'Product Management'
   ```

---

## 🧩 Cheat Sheet Komponen UI Populer

### 1. Toast Notification (Vue Sonner)
```ts
import { toast } from '@/components/ui/sonner'

toast.success('User updated successfully!')
toast.error('Network request failed.')
toast.info('Export process started.')
```

### 2. Button & Variants
```vue
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm" :disabled="isSubmitting">
  <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin mr-1.5" />
  Save Changes
</Button>
```

### 3. Dialog / Modal (Accessibility Standard)
> **Penting:** Setiap `DialogContent` WAJIB memiliki `DialogTitle` dan `DialogDescription` untuk standar ARIA Reka UI.
```vue
<Dialog v-model:open="isOpen">
  <DialogContent class="sm:max-w-120">
    <DialogHeader>
      <DialogTitle>Edit Member</DialogTitle>
      <DialogDescription>Update member credentials and role.</DialogDescription>
    </DialogHeader>
    <!-- Content / Form -->
    <DialogFooter>
      <Button variant="outline" @click="isOpen = false">Cancel</Button>
      <Button @click="handleSave">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 4. Select Dropdown
```vue
<Select v-model="selectedRole">
  <SelectTrigger class="h-9 text-xs w-48">
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Admin" class="text-xs">Admin</SelectItem>
    <SelectItem value="Developer" class="text-xs">Developer</SelectItem>
  </SelectContent>
</Select>
```

### 5. Switch & Checkbox
```vue
<div class="flex items-center justify-between rounded-lg border p-3 bg-muted/20">
  <div class="space-y-0.5">
    <Label class="text-xs font-medium">Two-Factor Authentication</Label>
    <p class="text-[11px] text-muted-foreground">Secure your account with 2FA verification.</p>
  </div>
  <Switch v-model="enable2FA" />
</div>
```

---

## 🎨 UI/UX & Layout Best Practices (Global Guidelines)

### 1. Card dengan Footer/Header Edge-to-Edge (Flush Layouts)
Komponen dasar `Card.vue` memiliki utility bawaan `py-6` dan `gap-6`. Jika membuat card (form, statistik, widget, dialog banner, table wrapper) yang memiliki header/footer berlatar khusus (`bg-muted/20`, garis pemisah `border-t`/`border-b`):
- **Container Card:** Wajib override dengan kelas `overflow-hidden py-0 gap-0` (contoh: `<Card class="overflow-hidden py-0 gap-0 shadow-sm border">`).
- **CardHeader:** Berikan padding internal eksplisit (misal: `p-6 pb-4` atau `p-4 border-b border-border bg-muted/20`).
- **CardContent:** Berikan padding internal eksplisit (misal: `p-6` atau `p-4`).
- **CardFooter:** Berikan padding internal dan border pemisah (`border-t border-border bg-muted/20 px-6 py-4 flex items-center justify-between`). Footer akan menempel rapat penuh (*flush*) mengikuti sudut bawah card.

### 2. Standar Layout Halaman & Form Mobile (Keyboard-Safe & Scrollable)
Saat membuat halaman auth, wizard, onboarding, atau dialog fullscreen:
- **JANGAN PERNAH** menggunakan vertical centering statis (`items-center justify-center min-h-screen`) pada layar mobile, karena input field akan tertutup virtual keyboard saat user mengetik.
- **SELALU GUNAKAN** pola dynamic viewport height:
  `min-h-dvh flex flex-col items-center justify-start pt-6 sm:pt-8 pb-12 px-4 sm:justify-center sm:py-8 sm:px-6 overflow-y-auto`
- **Mobile (`< sm`):** Form diposisikan di bagian atas yang natural (`justify-start pt-6 pb-12`).
- **Desktop (`≥ sm`):** Card otomatis kembali terpusat di tengah layar secara estetis (`sm:justify-center sm:py-8`).

### 3. Presisi Alignment Horizontal Antara Navbar dan Sidebar
Saat membuat navbar / header atas yang berada di atas sidebar yang dapat di-collapse:
- **Lebar Kolom Ikon Sidebar:** Lebar saat collapse adalah `3.5rem` = 56px (`w-14`), dengan titik tengah ikon berada pada $x = 28\text{px}$.
- **Container Elemen Kiri Navbar:** Logo atau collapse trigger pada header WAJIB dibungkus dalam container berukuran `w-14 h-14 flex items-center justify-center` yang menempel dari tepi paling kiri ($x = 0$) dengan padding header kanan `pr-4 sm:pr-6` (tanpa padding kiri `pl-*`).

### 4. Type Safety & Zero Unused Identifiers (TS Hygiene)
- Pastikan tidak ada variabel, composable (`useRouter()`), props, atau parameter callback yang diimpor/dideklarasikan tanpa digunakan untuk mencegah warning `TS6133` saat type-checking.

---

## 🛠️ Dev Commands

```bash
pnpm dev      # Vite dev server + HMR (http://localhost:5173)
pnpm preview  # Preview production build locally
# JANGAN: pnpm build (kecuali diminta eksplisit oleh pengguna)
```
