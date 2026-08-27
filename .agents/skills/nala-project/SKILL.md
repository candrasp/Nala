---
name: nala-project
description: >
  Skill for the Nala project - an Enterprise Admin Dashboard Template & Scaffolding Tool Monorepo built with Vue 3,
  Vite, TypeScript, Tailwind CSS v4, reka-ui (shadcn-vue), Pinia, and a Real API Service Layer.
  Activates when the user requests adding a page, component, store, API service, UI feature,
  scaffolding a new feature, or refactoring within the Nala project monorepo.
---

# Nala Project Skill

You are an expert developer for the **Nala** project — a modern, production-ready Enterprise Admin Dashboard Template and Scaffolding Tool (`pnpm create nala`) built with the Vue 3 + Vite + TypeScript + Tailwind CSS v4 stack.

Follow all guidelines below strictly whenever writing, modifying, or scaffolding features in this repository.

---

## 🏗️ Workspace Monorepo Architecture

This repository is structured as a **pnpm Workspace Monorepo**:

```
nala/                                    ← Root monorepo
├── packages/
│   ├── showcase/                        ← @nala/showcase (Full Enterprise Demo App)
│   │   ├── src/
│   │   │   ├── components/              ← 44+ UI Primitives, Layout, CodePreview
│   │   │   ├── views/                   ← Full showcase suite (Ecommerce, Analytics, RBAC, Billing, etc.)
│   │   │   ├── stores/                  ← auth, notification, activity, billing, role stores
│   │   │   └── services/                ← Real API adapters + DEV mock fallbacks
│   │   └── package.json                 ← name: "@nala/showcase"
│   │
│   └── create-nala/                     ← create-nala (Official Scaffolding CLI for npm)
│       ├── src/                         ← CLI source code (@clack/prompts + kolorist)
│       ├── template/                    ← Minimal, clean starter template for users
│       │   └── src/
│       │       ├── components/ui/       ← 34+ core UI primitives (no showcase extras)
│       │       ├── layouts/             ← Clean AdminLayout & AuthLayout (no ThemeCustomizer)
│       │       ├── stores/              ← auth.ts ONLY
│       │       ├── services/            ← auth.service.ts + user.service.ts ONLY
│       │       └── views/               ← dashboard, _starter/BlankView, auth/*, errors/*
│       ├── dist/                        ← Compiled CLI executable
│       └── package.json                 ← name: "create-nala"
│
├── pnpm-workspace.yaml                  ← Monorepo workspace configuration
├── package.json                         ← Root workspace delegation scripts
├── DEVELOPMENT.md                       ← Contributor & maintenance guide
├── ROADMAP.md                           ← Milestone & feature tracker
└── GEMINI.md / CLAUDE.md               ← AI Guardrails
```

---

## 🛠️ Tech Stack Overview

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Vue 3 (Composition API) | Always use `<script setup lang="ts">` |
| **Build Tool** | Vite 8 (`@vitejs/plugin-vue`) | Super fast HMR & production bundler |
| **Monorepo / Package Manager** | `pnpm` v10+ (Workspaces) | `pnpm-workspace.yaml` packages: `packages/*` |
| **Auto-Imports** | `unplugin-auto-import` & `unplugin-vue-components` | Auto-imports Vue, Router, Pinia, VueUse, & all UI components |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) + `tw-animate-css` | Modern OKLCH color tokens in `src/style.css` |
| **UI Primitives** | `reka-ui` + shadcn-vue (New York style) | 44+ primitive components in `src/components/ui/` |
| **Data Table** | `@tanstack/vue-table` | Headless table logic with sorting & pagination |
| **Form & Validation** | `vee-validate` + `@vee-validate/zod` + `zod` | Strictly-typed validation schemas |
| **Icons** | `@lucide/vue` | Must be imported explicitly (`import { Plus } from '@lucide/vue'`) |
| **State Management** | Pinia | Setup Stores pattern (`defineStore('name', () => { ... })`) |
| **Routing** | Vue Router v5 | HTML5 history mode with route guards |
| **API Client** | Axios + Enterprise Interceptors | Silent Token Refresh, Global Loading Bar, Auto Error Toast |
| **CLI Scaffolder** | `@clack/prompts` + `kolorist` + `tsup` | Powers `pnpm create nala my-app` |
| **Notifications** | `vue-sonner` | Toast notifications via `toast.success()`, `toast.error()` |
| **Language & Types** | TypeScript 6 + `vue-tsc` | Strict static typing, zero `any` |

---

## 🛑 Strict Rules (MUST FOLLOW)

1. **NEVER** run `pnpm build` or `npm run build` after finishing code changes — only run the dev server or build checks if explicitly requested by the user.
2. **DO NOT** use the Options API — always use `<script setup lang="ts">`.
3. **DO NOT** use the `any` type — always define an explicit TypeScript interface or type.
4. **New Package Installation Confirmation:** DO NOT install new npm packages without explicit confirmation in chat. Always ask the user directly before running `pnpm add`.
5. **DO NOT** create separate CSS files per component — use Tailwind utility classes.
6. **DO NOT** use `style scoped` if it can be solved with Tailwind.
7. **DO NOT** remove comments or docstrings unrelated to the change being made.
8. **Output & Code Comment Language (English Standard):**
   - All user-facing UI text, form labels, placeholders, validation/error messages, page titles, status badges, and toast notifications **MUST be written in English**.
   - All code comments (JSDoc, inline code comments, TODO notes) inside `.vue` and `.ts` source files **MUST be written in English**.
9. **NEVER** run `git add`, `git commit`, or `git push` without explicit instruction from the user.
10. **Tailwind CSS v4 Strict Syntax & Sizing Scale Compliance:**
    - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr`, etc. (NEVER write legacy v3 `bg-gradient-to-*`).
    - **Sizing Scale:** NEVER write arbitrary pixel brackets like `max-w-[170px]`, `w-[300px]`, or `p-[1px]`. ALWAYS use Tailwind v4 scale (`max-w-44`, `max-w-28`, `w-75`, `max-h-75`, `p-px`).
    - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
11. **Workspace Monorepo Architecture:**
    - Main showcase app lives in `packages/showcase/`.
    - CLI tool & clean starter template live in `packages/create-nala/`.
    - Root `package.json` delegates commands via `pnpm --filter`.
12. **Testing Scope & Execution:** Unit tests (`vitest`, `pnpm test`, `pnpm test:run`) are executed ONLY upon explicit instruction from the user.

---

## ⚡ Auto-Import Guide Matrix

To avoid import hallucination:

| Category | Auto-Import Status | Usage |
|---|---|---|
| **Vue Reactivity** (`ref`, `computed`, `watch`, `onMounted`, `reactive`, etc.) | ✅ **AUTOMATIC** | Use directly: `const count = ref(0)` (no `import { ref } from 'vue'` needed) |
| **Vue Router** (`useRoute`, `useRouter`) | ✅ **AUTOMATIC** | Use directly: `const router = useRouter()` |
| **VueUse** (`useColorMode`, `useLocalStorage`, `useDebounceFn`, etc.) | ✅ **AUTOMATIC** | Use directly: `const mode = useColorMode()` |
| **Pinia** (`defineStore`, `storeToRefs`) | ✅ **AUTOMATIC** | Use directly: `defineStore(...)` |
| **All UI Components** (`Button`, `Card`, `Dialog`, `Input`, `InputGroup`, `PageHeader`, `Select`, `Table`, `Tabs`, etc.) | ✅ **AUTOMATIC** | Use directly in template: `<PageHeader>`, `<Card>`, `<InputGroup>`, etc. |
| **Lucide Icons** (`Plus`, `Search`, `Trash2`, `Edit`, etc.) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { Plus, Search } from '@lucide/vue'` |
| **Toast Notifications** (`toast`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { toast } from '@/components/ui/sonner'` |
| **HTTP API Client** (`apiClient`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { apiClient } from '@/lib/axios'` |
| **Class Merging Utility** (`cn`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { cn } from '@/lib/utils'` |
| **Form Validation** (`zod`, `toTypedSchema`, `useForm`) | ⚠️ **MANUAL IMPORT REQUIRED** | `import { z } from 'zod'`, `import { useForm } from 'vee-validate'` |

---

## 📦 Full UI Primitives Component Catalog (`src/components/ui/`)

All components below are registered in the template and can be used directly in Vue templates without manual import:

| Component Directory | Available Components & Sub-Components |
|---|---|
| `PageHeader.vue` | `PageHeader` (standardized top page header with `title`, `description`, `badge`, `statusDot`, and `#actions` slot) |
| `CodePreview.vue` | `CodePreview` (interactive showcase component with syntax highlighting & clipboard copy) |
| `accordion/` | `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionContent` |
| `alert/` | `Alert` (variant: `default`, `destructive`, `info`, `success`, `warning`), `AlertTitle`, `AlertDescription` |
| `alert-dialog/` | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel` |
| `avatar/` | `Avatar` (prop: `status: 'online'\|'busy'\|'away'\|'offline'`), `AvatarImage`, `AvatarFallback`, `AvatarGroup` (props: `max`, `overlap: 2\|3\|4`) |
| `badge/` | `Badge` (variant: `default`, `secondary`, `destructive`, `outline`, `success`, `info`, `warning`; shape: `default`, `pill`; props: `dot`, `pulse`) |
| `breadcrumb/` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` |
| `button/` | `Button` (variant: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`; size: `xs`, `sm`, `default`, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg`) |
| `calendar/` | `Calendar` (full month view calendar grid) |
| `card/` | `Card` (prop: `flush`), `CardHeader` (prop: `section`), `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` |
| `chart/` | `AreaChart`, `LineChart`, `BarChart`, `DonutChart` (Standardized Unovis/shadcn-vue chart components) |
| `checkbox/` | `Checkbox` |
| `collapsible/` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `command/` | `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`, `CommandDialog` |
| `context-menu/` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent` |
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
| `pin-input/` | `PinInput`, `PinInputGroup`, `PinInputInput`, `PinInputSeparator` |
| `popover/` | `Popover`, `PopoverTrigger`, `PopoverContent` |
| `progress/` | `Progress` (determinate & indeterminate) |
| `radio-group/` | `RadioGroup`, `RadioGroupItem` |
| `scroll-area/` | `ScrollArea`, `ScrollBar` |
| `select/` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator` |
| `separator/` | `Separator` (orientation: horizontal, vertical) |
| `sheet/` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` |
| `sidebar/` | `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger`, `SidebarInset`, `SidebarHeader`, `SidebarFooter`, `SidebarControl` |
| `skeleton/` | `Skeleton` |
| `slider/` | `Slider` |
| `sonner/` | `Toaster`, `toast` (from `vue-sonner`) |
| `stepper/` | `Stepper`, `StepperItem`, `StepperTrigger`, `StepperTitle`, `StepperDescription`, `StepperSeparator` |
| `switch/` | `Switch` |
| `table/` | `Table`, `TableHeader`, `TableBody`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`, `TableEmpty` |
| `tabs/` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `textarea/` | `Textarea` |
| `timeline/` | `Timeline`, `TimelineItem`, `TimelineContent`, `TimelineTitle`, `TimelineDescription`, `TimelineTime`, `TimelineIndicator` |
| `toggle/` | `Toggle` (variant: `default`, `outline`; size: `sm`, `default`, `lg`) |
| `toggle-group/` | `ToggleGroup`, `ToggleGroupItem` (type: `single` \| `multiple`) |
| `tooltip/` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

---

## 🚀 Golden Blueprint: Building a New Feature from Scratch (End-to-End)

Use this 5-part pattern when asked to build a new module/feature (e.g. "Products", "Invoices", "Customers"):

### 1. API Service with Safe DEV Fallback (`packages/showcase/src/services/product.service.ts`)
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

export interface CreateProductPayload {
  name: string
  sku: string
  price: number
  stock: number
}

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

### 2. Pinia Store (`packages/showcase/src/stores/product.ts`)
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
      products.value = products.value.filter(p => p.id !== id)
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
  <div class="space-y-6 w-full mx-auto pb-10">
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
            <InputIcon side="left">
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

---

## 🎨 UI/UX & Layout Best Practices (Global Guidelines)

### 1. Standard Page Header (`<PageHeader>`)
Always use the `<PageHeader>` component instead of manual header layouts:
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
- **Card Container:** Use `<Card flush>` (applies `overflow-hidden py-0 gap-0` automatically).
- **CardHeader:** Use `<CardHeader section>` (applies `p-6 border-b border-border bg-muted/10` automatically).
- **CardContent:** Provide explicit internal padding (e.g. `p-6`, or `p-0` for Tables).
- **CardFooter:** Provide internal padding and separator border (`border-t border-border bg-muted/20 px-6 py-4 flex items-center justify-between`).

### 3. Input Affixes & Addons (`<InputGroup>`, `<InputIcon>`, `<InputAddon>`)
Never write manual absolute positioning for input icons:
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

### 4. Dialog / Modal Accessibility Standard
- **IMPORTANT:** Every `DialogContent` MUST have a `DialogTitle` and `DialogDescription` (use `sr-only` class if visually hidden) to meet Reka UI ARIA standards.
- Do not add native `autoFocus` attributes to inputs inside Dialogs.

### 5. Tailwind CSS v4 Syntax Reference & Anti-Patterns (CRITICAL)

| Category | ❌ NEVER USE (v3 / Anti-Pattern) | ✅ ALWAYS USE (Tailwind v4) | Notes |
|---|---|---|---|
| **Linear Gradients** | `bg-gradient-to-r`<br>`bg-gradient-to-b` | `bg-linear-to-r`<br>`bg-linear-to-b` | In v4, `bg-gradient-*` is renamed to `bg-linear-*` |
| **Arbitrary Max Width** | `max-w-[170px]`<br>`max-w-[300px]` | `max-w-44`<br>`max-w-75` | Use standard scale |
| **Arbitrary Width/Height** | `w-[300px]`<br>`h-[400px]` | `w-75`<br>`h-100` | Multiply rems by 4 |
| **1-pixel Padding/Border** | `p-[1px]`<br>`m-[1px]` | `p-px`<br>`m-px` | Built-in `px` scale (`1px`) |
| **Shadow Scale** | `shadow-[0_1px_2px_...]` | `shadow-2xs`<br>`shadow-xs`<br>`shadow-sm`<br>`shadow-md` | Standard built-in shadows |
| **Viewport Heights** | `min-h-screen`<br>`h-screen` | `min-h-dvh`<br>`h-dvh` / `h-svh` | Prevents mobile address-bar viewport overflow bugs |
| **Color Opacity** | `bg-primary/0.5` | `bg-primary/50`<br>`border-border/40` | Use integer percentage (1-100) after `/` |

---

## 🛠️ Workspace Dev Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start showcase dev server (`@nala/showcase`) |
| `pnpm build:cli` | Compile CLI tool (`create-nala`) to `dist/index.js` |
| `pnpm sync:ui` | Copy UI primitives from `showcase` to `create-nala/template` |
| `pnpm test` | Run unit tests in watch mode (showcase) |
| `pnpm test:run` | Run unit tests once in CI mode |
| `pnpm preview` | Preview production build of showcase |
