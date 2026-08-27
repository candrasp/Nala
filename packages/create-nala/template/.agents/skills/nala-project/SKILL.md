---
name: nala-project
description: >
  Skill for the Nala Admin Dashboard Project - Single SPA application built with Vue 3,
  Vite, TypeScript, Tailwind CSS v4, Reka UI (shadcn-vue), Pinia, and Axios.
  Activates when building views, components, stores, API services, or scaffolding features.
---

# Nala Project Skill (Starter Edition)

You are an expert frontend engineer building features for this **Nala Admin Dashboard** application. Follow these instructions strictly to ensure clean architecture, design consistency, and zero UI regressions.

---

## 🛠️ Tech Stack Overview

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Vue 3 (Composition API) | Always use `<script setup lang="ts">` |
| **Build Tool** | Vite 8 (`@vitejs/plugin-vue`) | Super-fast HMR & production bundler |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) + `tw-animate-css` | OKLCH color tokens in `src/style.css` |
| **UI Primitives** | `reka-ui` + shadcn-vue (New York style) | 34+ primitive components in `src/components/ui/` |
| **Data Table** | `@tanstack/vue-table` | Headless table logic with sorting & pagination |
| **Form & Validation** | `vee-validate` + `@vee-validate/zod` + `zod` | Strongly-typed validation schemas |
| **Icons** | `@lucide/vue` | Must be imported explicitly (`import { Plus } from '@lucide/vue'`) |
| **State Management** | Pinia | Setup Stores pattern (`defineStore('name', () => { ... })`) |
| **Routing** | Vue Router v5 | HTML5 history mode with route guards |
| **API Client** | Axios + Enterprise Interceptors | Silent Token Refresh, Global Loading Bar, Auto Error Toast |
| **Notifications** | `vue-sonner` | Toast notifications via `toast.success()`, `toast.error()` |
| **Language & Types** | TypeScript 6 + `vue-tsc` | Strict static typing, zero `any` |

---

## 🛑 Strict Guardrails (MUST FOLLOW)

1. **Composition API Only:** Never use Options API — always use `<script setup lang="ts">`.
2. **Strict TypeScript:** No `any` type — define explicit TypeScript interfaces for all props, emits, and API payloads.
3. **English Standard:** All user-facing UI text, form labels, placeholders, error messages, toast notifications, and in-code comments must be in **English**.
4. **Tailwind CSS v4 Strict Compliance:**
   - **Gradients:** ALWAYS use `bg-linear-to-r`, `bg-linear-to-b`, `bg-linear-to-tr` (NEVER use legacy v3 `bg-gradient-to-*`).
   - **Sizing Scale:** NEVER write arbitrary bracket sizing like `max-w-[170px]`, `w-[300px]`, or `p-[1px]`. ALWAYS use Tailwind v4 scale (`max-w-44`, `max-w-28`, `w-75`, `max-h-75`, `p-px`).
   - **Shadows:** Use `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`.
5. **No Scoped CSS:** Use Tailwind utility classes. Do not write `<style scoped>`.
6. **Dialog Accessibility:** Every `DialogContent` MUST include `DialogTitle` and `DialogDescription` (use `sr-only` if visually hidden) to comply with Reka UI ARIA standards.

---

## ⚡ Auto-Import Guide Matrix

| Auto-Imported (No Import Needed) | Manual Import Required |
|---|---|
| Vue Reactivity (`ref`, `computed`, `watch`, `onMounted`, etc.) | Lucide Icons (`import { Plus, Search, Trash2 } from '@lucide/vue'`) |
| Vue Router (`useRoute`, `useRouter`) | Toast Notifications (`import { toast } from '@/components/ui/sonner'`) |
| VueUse (`useColorMode`, `useLocalStorage`, etc.) | Axios Client (`import { apiClient } from '@/lib/axios'`) |
| Pinia (`defineStore`, `storeToRefs`) | Form Validation (`import { z } from 'zod'`, `import { useForm } from 'vee-validate'`) |
| All UI Components (`<Button>`, `<Card>`, `<Dialog>`, `<Input>`, `<Table>`, `<PageHeader>`, etc.) | Class Merger (`import { cn } from '@/lib/utils'`) |

---

## 🎨 UI Design System & Component Blueprints

### 1. Standard Page Header (`<PageHeader>`)
Always use the standardized `<PageHeader>` component at the top of every view:
```vue
<PageHeader
  title="Products"
  description="Manage your product inventory and pricing."
>
  <template #actions>
    <Button size="sm" class="gap-1.5" @click="isDialogOpen = true">
      <Plus class="h-3.5 w-3.5" />
      Add Product
    </Button>
  </template>
</PageHeader>
```

### 2. Standard KPI Stats Cards Blueprint
When building summary metrics / stats cards, follow this exact blueprint:
```vue
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card
    v-for="stat in stats"
    :key="stat.title"
    flush
    class="highlight-card shadow-xs border-border/80 bg-card hover:border-border transition-all duration-200"
  >
    <CardContent class="p-5 space-y-2">
      <!-- 1. Top Row: Title + Icon -->
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-muted-foreground">{{ stat.title }}</span>
        <component :is="stat.icon" class="h-4 w-4 text-primary" />
      </div>

      <!-- 2. Value -->
      <div class="text-2xl font-bold tracking-tight text-foreground">{{ stat.value }}</div>

      <!-- 3. Trend Indicator -->
      <p class="text-xs text-muted-foreground flex items-center gap-1">
        <span
          class="font-semibold inline-flex items-center gap-0.5"
          :class="stat.positive ? 'text-emerald-500' : 'text-rose-500'"
        >
          <component :is="stat.positive ? ArrowUpRight : ArrowDownRight" class="h-3.5 w-3.5" />
          {{ stat.change }}
        </span>
        <span>{{ stat.changeLabel }}</span>
      </p>
    </CardContent>
  </Card>
</div>
```

### 3. Input Groups with Icons & Addons
Never write manual absolute positioning for input icons:
```vue
<!-- Search Icon Input -->
<InputGroup>
  <InputIcon side="left">
    <Search class="h-3.5 w-3.5" />
  </InputIcon>
  <Input v-model="searchQuery" placeholder="Search..." class="pl-8 h-8 text-xs" />
</InputGroup>

<!-- URL Prefix / Suffix Addon -->
<InputGroup>
  <InputAddon side="left">https://</InputAddon>
  <Input placeholder="my-subdomain" class="rounded-none border-x-0" />
  <InputAddon side="right">.nala.dev</InputAddon>
</InputGroup>
```

---

## 🚀 Golden Blueprint: End-to-End CRUD Feature Pattern

Use this complete 4-file pattern when asked to build a new feature (e.g. "Products", "Invoices", "Customers"):

### 1. API Service with Safe DEV Fallback (`src/services/product.service.ts`)
```ts
import { apiClient } from '@/lib/axios'

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

// In-memory mock store for local development when backend is offline
const mockProducts: ProductItem[] = [
  { id: '1', name: 'MacBook Pro 14"', sku: 'MBP-14', price: 1999, stock: 12, status: 'active' },
  { id: '2', name: 'Dell XPS 15', sku: 'XPS-15', price: 1499, stock: 5, status: 'active' },
]

export const productService = {
  async getProducts(): Promise<ProductItem[]> {
    try {
      return await apiClient.get<ProductItem[]>('/products')
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
      return await apiClient.post<ProductItem>('/products', payload)
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
      products.value = products.value.filter(p => p.id !== id)
      toast.success('Product deleted.')
    } catch {
      toast.error('Failed to delete product.')
    }
  }

  return { products, isLoading, loadProducts, addProduct, removeProduct }
})
```

### 3. Modal Form with Zod (`src/views/products/components/ProductFormDialog.vue`)
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

### 4. Main Page View with Table & Skeleton (`src/views/products/IndexView.vue`)
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
    <PageHeader
      title="Products"
      description="Manage your product catalog and inventory."
    >
      <template #actions>
        <Button size="sm" class="gap-1.5" @click="isDialogOpen = true">
          <Plus class="h-3.5 w-3.5" />
          Add Product
        </Button>
      </template>
    </PageHeader>

    <Card flush class="shadow-xs border">
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
            <!-- 1. Skeleton Loading -->
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

    <ProductFormDialog v-model:open="isDialogOpen" />
  </div>
</template>
```

### 5. Register in Router & Sidebar
- **`src/router/index.ts`:**
  ```ts
  {
    path: 'products',
    name: 'products',
    component: () => import('@/views/products/IndexView.vue'),
  }
  ```
- **`src/components/layout/AppSidebar.vue`:**
  ```ts
  import { Package } from '@lucide/vue'

  const mainNav = [
    { name: 'Dashboard', routeName: 'dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Products', routeName: 'products', href: '/products', icon: Package },
  ]
  ```
