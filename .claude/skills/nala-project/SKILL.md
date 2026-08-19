---
name: nala-project
description: >
  Skill for the Nala project - an Enterprise Admin Dashboard Template built with Vue 3,
  Vite, TypeScript, Tailwind CSS v4, reka-ui (shadcn-vue), Pinia, and a Real API Service Layer.
  Activates when the user requests adding a page, component, store, API service, UI feature,
  scaffolding a new feature, or refactoring within the Nala project.
---

# Nala Project Skill

You are an expert developer for the **Nala** project — a modern, ready-to-use Enterprise Admin Dashboard Template built with the Vue 3 + Vite + TypeScript + Tailwind CSS v4 stack.

Follow all the guidelines below strictly whenever writing, modifying, or building a new feature in this project.

---

## 🛠️ Tech Stack Overview

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Vue 3 (Composition API) | Always use `<script setup lang="ts">` |
| **Build Tool** | Vite 8 (`@vitejs/plugin-vue`) | Super fast HMR & build |
| **Package Manager** | `pnpm` | pnpm v10 standard (`package.json` config) |
| **Auto-Imports** | `unplugin-auto-import` & `unplugin-vue-components` | Auto-imports Vue, Router, Pinia, VueUse, & all UI components |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) + `tw-animate-css` | OKLCH color tokens in `src/style.css` |
| **UI Primitives** | `reka-ui` + shadcn-vue (New York style) | 36+ primitive components in `src/components/ui/` |
| **Data Table** | `@tanstack/vue-table` | Headless table logic with sorting & pagination |
| **Form & Validation** | `vee-validate` + `@vee-validate/zod` + `zod` | Strictly-typed validation schemas |
| **Icons** | `@lucide/vue` | Must be imported explicitly (`import { Plus } from '@lucide/vue'`) |
| **State Management** | Pinia | Setup Stores pattern (`defineStore('name', () => { ... })`) |
| **Routing** | Vue Router v5 | HTML5 history mode with route guards |
| **API Client** | Axios + Enterprise Interceptors | Silent Token Refresh, Global Loading Bar, Auto Error Toast |
| **Notifications** | `vue-sonner` | Toast notifications via `toast.success()`, `toast.error()` |
| **Language & Types** | TypeScript 6 + `vue-tsc` | Strict static typing, zero `any` |

---

## 🛑 Strict Rules (MUST FOLLOW)

1. **NEVER** run `pnpm build` or `npm run build` after finishing code changes — only run the dev server if explicitly requested.
2. **DO NOT** use the Options API — always use `<script setup lang="ts">`.
3. **DO NOT** use the `any` type — always define an explicit type/interface.
4. **New Package Installation Confirmation:** DO NOT install new packages without explicit confirmation from the user. If a new external library is required, the Agent **must ask directly in chat** for approval before running any `pnpm add` command.
5. **DO NOT** create separate CSS files per component — use Tailwind utility classes.
6. **DO NOT** use `style scoped` if it can be solved with Tailwind.
7. **DO NOT** remove comments or docstrings unrelated to the change being made.
8. **Output & Code Comment Language (English Standard):**
   - All UI text, form labels, placeholders, validation/error messages, page titles, status badges, and toast notifications **MUST be written in English**.
   - All code comments (JSDoc, inline code comments, TODO notes) inside `.vue` and `.ts` source files **MUST be written in English**.
   - (Internal agent documentation such as `SKILL.md` may be written in any language for the team's convenience.)
9. **NEVER** run `git add`, `git commit`, or `git push` without explicit instruction from the user.
10. **Prefer Tailwind CSS v4's Built-in Sizing Scale:** Use built-in scale values (e.g. `w-75`, `max-h-75`, `max-w-120`, `gap-3`) instead of arbitrary brackets (`max-h-[300px]`).
11. **Single SPA Repository (Non-Monorepo):** This project is a pure Single Page Application. Do not create a `pnpm-workspace.yaml`. All pnpm configuration (e.g. `ignoredBuiltDependencies`) is managed in `package.json`.
12. **Testing Scope:** This project is a Vite-based UI template. Creating unit tests (Vitest) or E2E tests is optional and should only be done on explicit instruction from the user.

---

## 🏗️ Project Architecture: Core App vs Showcase Demo

When a developer clones the Nala template to build a real application (e.g. CRM, SaaS, E-Commerce, ERP):
- **Core Production Shell (PERMANENT):**
  `src/components/ui/` (36+ components), `src/components/PageHeader.vue`, `src/components/CodePreview.vue`, `src/layouts/` (AdminLayout & AuthLayout), `src/lib/` (Axios, utils), `src/stores/`, `src/services/`, `src/views/auth/`, `src/views/settings/`, `src/views/users/`, `src/views/errors/`, and `src/views/_starter/BlankView.vue`.
- **Showcase Demo Area (OPTIONAL / SAFE TO DELETE):**
  `src/views/components/*View.vue` (demo pages for buttons, forms, tables, etc.). If this folder is deleted by the developer to build a clean new UI, **all 36+ components in `src/components/ui/` remain fully available** and ready to use at any time.

---

## ⚡ Auto-Import Guide Matrix

To avoid import hallucination:

| Category | Auto-Import Status | Usage |
|---|---|---|
| **Vue Reactivity** (`ref`, `computed`, `watch`, `onMounted`, `reactive`, etc.) | ✅ **AUTOMATIC** | Use directly: `const count = ref(0)` (no `import { ref } from 'vue'` needed) |
| **Vue Router** (`useRoute`, `useRouter`) | ✅ **AUTOMATIC** | Use directly: `const router = useRouter()` |
| **VueUse** (`useColorMode`, `useLocalStorage`, `useDebounceFn`, etc.) | ✅ **AUTOMATIC** | Use directly: `const mode = useColorMode()` |
| **Pinia** (`defineStore`, `storeToRefs`) | ✅ **AUTOMATIC** | Use directly: `defineStore(...)` |
| **All UI Components** (`Button`, `Card`, `Dialog`, `Input`, `InputGroup`, `PageHeader`, `Select`, `Table`, `Tabs`, `CodePreview`, etc.) | ✅ **AUTOMATIC** | Use directly in template: `<PageHeader>`, `<Card>`, `<InputGroup>`, etc. |
| **Lucide Icons** (`Plus`, `Search`, `Trash2`, `Edit`, etc.) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { Plus, Search } from '@lucide/vue'` |
| **Toast Notifications** (`toast`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { toast } from '@/components/ui/sonner'` |
| **HTTP API Client** (`apiClient`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { apiClient } from '@/lib/axios'` |
| **Class Merging Utility** (`cn`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { cn } from '@/lib/utils'` |
| **Form Validation** (`zod`, `toTypedSchema`, `useForm`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { z } from 'zod'`, `import { useForm } from 'vee-validate'` |

---

## 📦 Full UI Primitives Component Catalog (`src/components/ui/`)

All components below are already registered in the template and can be used directly in Vue templates without manual import:

| Component Directory | Available Components & Sub-Components |
|---|---|
| `PageHeader.vue` | `PageHeader` (standardized top page header with `title`, `description`, `badge`, `statusDot`, and `#actions` slot) |
| `CodePreview.vue` | `CodePreview` (interactive documentation component with One Dark Pro syntax highlighting & clipboard copy) |
| `alert/` | `Alert` (variant: `default`, `destructive`, `info`, `success`, `warning`), `AlertTitle`, `AlertDescription` |
| `alert-dialog/` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel` |
| `avatar/` | `Avatar` (prop: `status: 'online'\|'busy'\|'away'\|'offline'` — renders built-in presence pip), `AvatarImage`, `AvatarFallback`, `AvatarGroup` (props: `max`, `overlap: 2\|3\|4`) |
| `badge/` | `Badge` (variant: `default`, `secondary`, `destructive`, `outline`, `success`, `info`, `warning`; shape: `default`, `pill`; props: `dot`, `pulse`) |
| `breadcrumb/` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` |
| `button/` | `Button` (variant: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`; size: `xs`, `sm`, `default`, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`) |
| `card/` | `Card` (prop: `flush`), `CardHeader` (prop: `section`), `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` |
| `checkbox/` | `Checkbox` |
| `command/` | `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`, `CommandDialog` |
| `date-picker/` | `DatePicker` (single & range date selector) |
| `dialog/` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| `dropdown-menu/` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup` |
| `form/` | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `FormDescription` |
| `hover-card/` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` |
| `input/` | `Input`, `InputGroup` (relative flex wrapper), `InputIcon` (side: `left` \| `right`), `InputAddon` (side: `left` \| `right`) |
| `kbd/` | `Kbd` (keyboard key badge) |
| `label/` | `Label` |
| `loading-bar/` | `LoadingBar` (top progress bar) |
| `pagination/` | `Pagination`, `PaginationList`, `PaginationItem`, `PaginationFirst`, `PaginationPrev`, `PaginationNext`, `PaginationLast`, `PaginationEllipsis` |
| `popover/` | `Popover`, `PopoverTrigger`, `PopoverContent` |
| `progress/` | `Progress` (determinate & indeterminate) |
| `radio-group/` | `RadioGroup`, `RadioGroupItem` |
| `select/` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator` |
| `separator/` | `Separator` (orientation: horizontal, vertical) |
| `sheet/` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` |
| `sidebar/` | `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger`, `SidebarInset`, `SidebarHeader`, `SidebarFooter` |
| `skeleton/` | `Skeleton` |
| `slider/` | `Slider` |
| `sonner/` | `Toaster`, `toast` (from `vue-sonner`) |
| `stepper/` | `Stepper`, `StepperItem`, `StepperTrigger`, `StepperTitle`, `StepperDescription`, `StepperSeparator` |
| `switch/` | `Switch` |
| `table/` | `Table`, `TableHeader`, `TableBody`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`, `TableEmpty` |
| `tabs/` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `textarea/` | `Textarea` |
| `timeline/` | `Timeline`, `TimelineItem`, `TimelineContent`, `TimelineTitle`, `TimelineDescription`, `TimelineTime`, `TimelineIndicator` |
| `tooltip/` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

---

## 🚀 Golden Blueprint: Building a New Feature from Scratch (End-to-End)

Use this 5-part pattern when asked to build a new module/feature (e.g. "Products", "Invoices", "Customers"):

### 1. API Service with Safe DEV Fallback (`src/services/product.service.ts`)
> **Enterprise Rule:** Mock fallback may ONLY be active when `import.meta.env.DEV`. In production mode, throw the real error (`throw error`) so the app never displays fake data when the backend is offline.

```ts
import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export interface ProductItem {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
}

// Explicit payload interface is preferred over Omit<> for AI readability & API contract clarity
export interface CreateProductPayload {
  name: string
  sku: string
  price: number
  stock: number
}

// In-memory mock store for local development only (resets on full page reload / Vite HMR)
const mockProducts: ProductItem[] = [
  { id: '1', name: 'MacBook Pro 14"', sku: 'MBP-14', price: 1999, stock: 12, status: 'active' },
  { id: '2', name: 'Dell XPS 15', sku: 'XPS-15', price: 1499, stock: 5, status: 'active' },
]

export const productService = {
  async getProducts(): Promise<ProductItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<ProductItem[]> | ProductItem[]>('/products')
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('[DEV MOCK] Backend offline, returning mock products.')
        return mockProducts
      }
      throw error
    }
  },

  async createProduct(payload: CreateProductPayload): Promise<ProductItem> {
    try {
      const res = await apiClient.post<ProductItem>('/products', payload)
      return res
    } catch (error) {
      if (import.meta.env.DEV) {
        const newItem: ProductItem = { id: String(Date.now()), ...payload, status: 'active' }
        mockProducts.unshift(newItem)
        return newItem
      }
      throw error
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`)
    } catch (error) {
      if (import.meta.env.DEV) {
        const idx = mockProducts.findIndex(p => p.id === id)
        if (idx !== -1) mockProducts.splice(idx, 1)
        return
      }
      throw error
    }
  }
}
```

### 2. Pinia Store (`src/stores/product.ts`)
```ts
import { defineStore } from 'pinia'
import { productService, type ProductItem, type CreateProductPayload } from '@/services/product.service'
import { toast } from '@/components/ui/sonner'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductItem[]>([])
  const isLoading = ref(false)

  async function loadProducts() {
    isLoading.value = true
    try {
      products.value = await productService.getProducts()
    } catch {
      toast.error('Failed to load products.')
    } finally {
      isLoading.value = false
    }
  }

  async function addProduct(payload: CreateProductPayload) {
    try {
      const created = await productService.createProduct(payload)
      products.value.unshift(created)
      toast.success('Product created successfully!')
      return true
    } catch {
      toast.error('Failed to create product.')
      return false
    }
  }

  async function removeProduct(id: string) {
    try {
      await productService.deleteProduct(id)
      products.value.filter(p => p.id !== id)
      toast.success('Product deleted successfully.')
    } catch {
      toast.error('Failed to delete product.')
    }
  }

  return { products, isLoading, loadProducts, addProduct, removeProduct }
})
```

### 3. Modal Form with Zod & Vee-Validate (`src/views/products/components/ProductFormDialog.vue`)
```vue
<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useProductStore } from '@/stores/product'
import { Loader2 } from '@lucide/vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
}>()

const productStore = useProductStore()

// Strict validation schema using Zod
const productSchema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'Product name must be at least 3 characters'),
    sku: z.string().min(2, 'SKU must be at least 2 characters').toUpperCase(),
    price: z.number({ invalid_type_error: 'Price is required' }).positive('Price must be greater than 0'),
    stock: z.number({ invalid_type_error: 'Stock is required' }).int().min(0, 'Stock cannot be negative'),
  })
)

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: productSchema,
  initialValues: {
    name: '',
    sku: '',
    price: 0,
    stock: 1,
  }
})

const onSubmit = handleSubmit(async (values) => {
  const success = await productStore.addProduct(values)
  if (success) {
    resetForm()
    emit('update:open', false)
  }
})
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-120">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>Fill in product details to add to inventory.</DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4 py-2">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="e.g. MacBook Pro 14" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="sku">
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="e.g. MBP-14" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="price">
            <FormItem>
              <FormLabel>Price ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" v-bind="componentField" placeholder="1999" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="stock">
          <FormItem>
            <FormLabel>Initial Stock</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" placeholder="10" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter class="pt-4">
          <Button type="button" variant="outline" @click="emit('update:open', false)">Cancel</Button>
          <Button type="submit" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="h-3.5 w-3.5 animate-spin mr-1.5" />
            Save Product
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
```

### 4. Main Page View with Standard Components (`src/views/products/IndexView.vue`)
```vue
<script setup lang="ts">
import { Plus, Search, Trash2, Package } from '@lucide/vue'
import { useProductStore } from '@/stores/product'
import ProductFormDialog from './components/ProductFormDialog.vue'

const productStore = useProductStore()
const searchQuery = ref('')
const isDialogOpen = ref(false)

onMounted(() => {
  productStore.loadProducts()
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.products
  return productStore.products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-10">
    <!-- Header using Reusable PageHeader -->
    <PageHeader
      title="Products"
      description="Manage your product catalog and inventory."
    >
      <template #actions>
        <Button size="sm" class="gap-1.5 shrink-0" @click="isDialogOpen = true">
          <Plus class="h-3.5 w-3.5" />
          Add Product
        </Button>
      </template>
    </PageHeader>

    <!-- Main Card with Flush & Section Header -->
    <Card flush class="shadow-sm border">
      <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle class="text-base font-semibold">Product Catalog</CardTitle>
          <CardDescription class="text-xs mt-0.5">Showing all active items in warehouse.</CardDescription>
        </div>
        <div class="w-full sm:w-64">
          <InputGroup>
            <InputIcon>
              <Search class="h-3.5 w-3.5" />
            </InputIcon>
            <Input v-model="searchQuery" placeholder="Search product or SKU..." class="pl-8 h-8 text-xs" />
          </InputGroup>
        </div>
      </CardHeader>
      
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <!-- 1. Skeleton Loading State -->
            <template v-if="productStore.isLoading">
              <TableRow v-for="n in 3" :key="n">
                <TableCell><Skeleton class="h-4 w-40" /></TableCell>
                <TableCell><Skeleton class="h-4 w-20" /></TableCell>
                <TableCell><Skeleton class="h-4 w-16" /></TableCell>
                <TableCell><Skeleton class="h-4 w-24" /></TableCell>
                <TableCell class="text-right"><Skeleton class="h-8 w-8 ml-auto rounded-md" /></TableCell>
              </TableRow>
            </template>

            <!-- 2. Data Rows -->
            <template v-else>
              <TableRow v-for="item in filteredProducts" :key="item.id">
                <TableCell class="font-medium">{{ item.name }}</TableCell>
                <TableCell class="font-mono text-xs text-muted-foreground">{{ item.sku }}</TableCell>
                <TableCell>${{ item.price.toLocaleString() }}</TableCell>
                <TableCell>{{ item.stock }} in stock</TableCell>
                <TableCell class="text-right">
                  <Button variant="ghost" size="icon-sm" class="text-destructive hover:bg-destructive/10" @click="productStore.removeProduct(item.id)">
                    <Trash2 class="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>

              <!-- 3. Empty State -->
              <TableRow v-if="filteredProducts.length === 0">
                <TableCell colspan="5" class="h-48 text-center text-muted-foreground">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <Package class="h-8 w-8 text-muted-foreground/50" />
                    <p class="text-sm font-medium">No products found</p>
                    <p class="text-xs text-muted-foreground">Try adjusting your search query or add a new product.</p>
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Dialog Form Modal -->
    <ProductFormDialog v-model:open="isDialogOpen" />
  </div>
</template>
```

### 5. Register in Router & Sidebar Navigation
> **Architecture Note:** `AdminLayout.vue` is the *Single Source of Truth* for all sidebar navigation and Command Palette search items (`searchItems`). Register each new feature manually so entries stay easy to trace (*searchable*):

- **`src/router/index.ts`:**
  ```ts
  {
    path: 'products',
    name: 'products',
    component: () => import('@/views/products/IndexView.vue'),
  }
  ```
- **`src/layouts/AdminLayout.vue` (`mainNav`):**
  ```ts
  import { Package } from '@lucide/vue'

  const mainNav = [
    { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Products', routeName: 'products', href: '/products', icon: Package },
    { name: 'Users', routeName: 'users', href: '/users', icon: Users },
  ]
  ```
- **`src/layouts/AdminLayout.vue` (`searchItems` & `pageTitle`):**
  ```ts
  // searchItems (Command Palette Ctrl+K)
  { title: 'Products', href: '/products', icon: Package, category: 'Main' },

  // pageTitle
  if (route.name === 'products') return 'Products'
  ```

---

## 🎨 UI/UX & Layout Best Practices (Global Guidelines)

### 1. Standard Page Header (`<PageHeader>`)
Instead of duplicating the ~12-line header layout in every view, always use the `<PageHeader>` component:
```vue
<PageHeader
  title="Page Title"
  description="Subtitle or description text"
  badge="Optional Label Chip"
  :statusDot="true"
>
  <template #actions>
    <Button size="sm">Action</Button>
  </template>
</PageHeader>
```

### 2. Edge-to-Edge Card Layouts (`<Card flush>` & `<CardHeader section>`)
The base `Card.vue` component has built-in `py-6` and `gap-6` utilities. When building a card (form, stat widget, banner dialog, table wrapper) that has a header/footer with a distinct background (`bg-muted/10`, separator lines `border-t`/`border-b`):
- **Card Container:** Use `<Card flush>` (applies `overflow-hidden py-0 gap-0` automatically).
- **CardHeader:** Use `<CardHeader section>` (applies `p-6 border-b border-border bg-muted/10` automatically).
- **CardContent:** Provide explicit internal padding (e.g. `p-6`, or `p-0` for Tables).
- **CardFooter:** Provide internal padding and a separator border (`border-t border-border bg-muted/20 px-6 py-4 flex items-center justify-between`).

### 3. Input Affixes & Addons (`<InputGroup>`, `<InputIcon>`, `<InputAddon>`)
Never write manual absolute positioning (`absolute left-3 top-1/2 -translate-y-1/2`) for input icons or prefix/suffix text:
```vue
<!-- Leading Icon Input -->
<InputGroup>
  <InputIcon side="left"><Mail /></InputIcon>
  <Input placeholder="user@example.com" class="pl-9" />
</InputGroup>

<!-- URL Prefix / Suffix Addon -->
<InputGroup>
  <InputAddon side="left">https://</InputAddon>
  <Input placeholder="my-subdomain" class="rounded-none border-x-0" />
  <InputAddon side="right">.nala.dev</InputAddon>
</InputGroup>
```

### 4. Mobile Page & Form Layout Standard (Keyboard-Safe & Scrollable)
When building auth pages, wizards, onboarding flows, or fullscreen dialogs:
- **NEVER** use static vertical centering (`items-center justify-center min-h-screen`) on mobile screens, since input fields will be covered by the virtual keyboard while typing.
- **ALWAYS USE** the dynamic viewport height pattern:
  `min-h-dvh flex flex-col items-center justify-start pt-6 sm:pt-8 pb-12 px-4 sm:justify-center sm:py-8 sm:px-6 overflow-y-auto`
- **Mobile (`< sm`):** Form sits naturally near the top (`justify-start pt-6 pb-12`).
- **Desktop (`≥ sm`):** Card automatically re-centers on screen for a polished look (`sm:justify-center sm:py-8`).

### 5. Precise Horizontal Alignment Between Navbar and Sidebar
When building a top navbar/header that sits above a collapsible sidebar:
- **Sidebar Icon Column Width:** Collapsed width is `3.5rem` = 56px (`w-14`), with the icon's center point at $x = 28\text{px}$.
- **Navbar Left Element Container:** The logo or collapse trigger in the header MUST be wrapped in a `w-14 h-14 flex items-center justify-center` container flush against the leftmost edge ($x = 0$), with right padding `pr-4 sm:pr-6` on the header (no left padding `pl-*`).

### 6. Dialog / Modal Accessibility Standard
- **IMPORTANT:** Every `DialogContent` MUST have a `DialogTitle` and `DialogDescription` (use the `sr-only` class if you want them visually hidden) to meet Reka UI's ARIA standards and prevent runtime warnings.
- **Avoid Native `autoFocus` in Dialogs:** Do not add the native HTML `autoFocus` attribute to `<input>` elements inside a Dialog/Modal, since Reka UI already manages keyboard focus transitions automatically.

### 7. Badge Semantic Variants, Shape & Status Dot

Never write raw inline `<span>` pills for semantic state badges. Use `<Badge>` with the CVA variant + shape props:

```vue
<!-- Semantic color tint variants (pill shape recommended) -->
<Badge variant="success" shape="pill">Active</Badge>
<Badge variant="info"    shape="pill">Syncing</Badge>
<Badge variant="warning" shape="pill">Degraded</Badge>

<!-- Built-in status dot (dot prop inherits bg-current from variant) -->
<Badge variant="success" shape="pill" dot pulse>Operational</Badge>
<Badge variant="warning" shape="pill" dot>High Latency</Badge>
<Badge variant="destructive" shape="pill" dot>Outage</Badge>

<!-- Icon badge (standard outline with Lucide icon) -->
<Badge variant="outline" class="gap-1.5 py-1">
  <ShieldCheck class="h-3.5 w-3.5 text-primary" />
  2FA Protected
</Badge>
```

### 8. Avatar Presence & AvatarGroup

`<Avatar>` is strictly a circular component (`rounded-full` is built into its outer wrapper and inner `AvatarRoot`). Any utility classes like `border`, `border-2`, `ring`, or `shadow` passed to `<Avatar>` will strictly render as circles.

Never write manual `div.relative` + `span.absolute` for presence indicators, and never write manual `div.-space-x-3` for avatar stacks:

```vue
<!-- Presence pip via status prop — relative wrapper & rounded-full are built-in -->
<Avatar class="h-10 w-10 border" status="online">
  <AvatarFallback>OM</AvatarFallback>
</Avatar>
<!-- status values: 'online' (emerald) | 'busy' (red) | 'away' (amber) | 'offline' (muted) -->

<!-- Stacked avatar group with automatic overflow chip (+N) -->
<AvatarGroup :max="4" :overlap="3">
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-emerald-500/10 text-emerald-600 text-xs font-semibold">OM</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-blue-500/10 text-blue-600 text-xs font-semibold">JL</AvatarFallback>
  </Avatar>
  <!-- Additional avatars beyond :max will render as "+N" overflow chip -->
</AvatarGroup>
```

---

## 🛠️ Dev Commands

```bash
pnpm dev      # Vite dev server + HMR (http://localhost:5173)
pnpm preview  # Preview production build locally
# DO NOT run pnpm build (unless explicitly requested by the user)
```
