# Mock Data & Real API Integration Guide

> **Nala** is engineered as a pure frontend enterprise admin template. It works 100% out of the box with zero backend dependencies via safe DEV mock fallbacks, while providing a centralized, production-grade **Axios Service Layer** ready to connect to your real REST or GraphQL backend.

---

## 🏛️ Architecture Overview

The API and data flow in Nala follows a clean 3-tier architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Vue Views / Components               │
│         (e.g., src/views/users/IndexView.vue)           │
└───────────────────────────┬─────────────────────────────┘
                            │ Calls Pinia Actions or Services
┌───────────────────────────▼─────────────────────────────┐
│                 Pinia Stores / Service Layer            │
│         (e.g., src/services/user.service.ts)            │
└───────────────────────────┬─────────────────────────────┘
                            │ Typed Axios Request
┌───────────────────────────▼─────────────────────────────┐
│           Centralized Axios Client (src/lib/axios.ts)   │
│  - Silent Bearer JWT Injection                          │
│  - Top Loading Bar Interceptor                          │
│  - Global Error Toast Handling (vue-sonner)             │
│  - 401 Silent Token Refresh Queue                       │
│  - Safe DEV Mock Fallbacks                              │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTP
┌───────────────────────────▼─────────────────────────────┐
│         Your Real Backend (Node, Go, Laravel, etc.)     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start: Connecting Your Backend

### Step 1: Configure Your API Base URL

Open or create your `.env` file (copied from `.env.example`) and point `VITE_API_BASE_URL` to your backend:

```env
# Local backend server
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Staging backend server
# VITE_API_BASE_URL=https://api-staging.yourdomain.com
```

### Step 2: Understand How Mock Fallbacks Work

All services in `src/services/` (e.g. `auth.service.ts`, `user.service.ts`, `activity.service.ts`, `billing.service.ts`, `role.service.ts`) follow a resilient fallback pattern:

1. **Attempts Real Network Request**: First tries to call your real API endpoint.
2. **Safe DEV Fallback**: In `development` mode (`import.meta.env.DEV`), if your backend is offline, unreachable, or returns an error, the service automatically falls back to in-memory mock data so you can continue building and testing UI seamlessly.

```ts
// Example from src/services/user.service.ts
async getUsers(params: UserQueryParams = {}): Promise<UserListResponse> {
  try {
    const response = await apiClient.get<UserListResponse>('/users', { params })
    return response.data
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[User Service] Real API failed, falling back to mock dataset')
      return mockGetUsers(params)
    }
    throw error
  }
}
```

---

## 🛠️ Step-by-Step: Replacing Mock Services

### Example: Connecting Real User CRUD (`src/services/user.service.ts`)

When your backend API is ready for production, you can either:

#### Option A: Keep Safe DEV Fallback (Recommended)
Keep the `try/catch` with `import.meta.env.DEV` fallback so offline developers can still run the template, while production builds will strictly throw network errors to your error boundary / toast handlers.

#### Option B: Switch to Pure Backend Mode
Remove the mock fallback functions and let `apiClient` handle requests directly:

```ts
// src/services/user.service.ts (Pure API Mode)
import { apiClient } from '@/lib/axios'
import type { UserItem, UserListResponse, UserQueryParams, CreateUserDto, UpdateUserDto } from './types'

export const userService = {
  async getUsers(params: UserQueryParams = {}): Promise<UserListResponse> {
    const { data } = await apiClient.get<UserListResponse>('/users', { params })
    return data
  },

  async getUserById(id: string): Promise<UserItem> {
    const { data } = await apiClient.get<UserItem>(`/users/${id}`)
    return data
  },

  async createUser(dto: CreateUserDto): Promise<UserItem> {
    const { data } = await apiClient.post<UserItem>('/users', dto)
    return data
  },

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserItem> {
    const { data } = await apiClient.put<UserItem>(`/users/${id}`, dto)
    return data
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}
```

---

## 🧩 Adding a New API Service

To add a new backend resource (e.g. `products`):

### 1. Define TypeScript Interfaces (`src/services/types.ts`)

```ts
export interface ProductItem {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  createdAt: string
}

export interface CreateProductDto {
  name: string
  sku: string
  price: number
  stock: number
}
```

### 2. Create the Service (`src/services/product.service.ts`)

```ts
import { apiClient } from '@/lib/axios'
import type { ProductItem, CreateProductDto } from './types'

export const productService = {
  async getProducts(): Promise<ProductItem[]> {
    const { data } = await apiClient.get<ProductItem[]>('/products')
    return data
  },

  async createProduct(dto: CreateProductDto): Promise<ProductItem> {
    const { data } = await apiClient.post<ProductItem>('/products', dto)
    return data
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`)
  },
}
```

### 3. Consume in Views or Pinia Stores

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '@/services/product.service'
import type { ProductItem } from '@/services/types'
import { toast } from 'vue-sonner'

const products = ref<ProductItem[]>([])
const isLoading = ref(true)

const loadProducts = async () => {
  isLoading.value = true
  try {
    products.value = await productService.getProducts()
  } catch (error) {
    toast.error('Failed to load products from server')
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProducts)
</script>
```

---

## 🔐 Authentication & Token Management

Nala provides built-in token lifecycle management in `src/lib/axios.ts`:

- **Bearer Token Storage**: Tokens are stored via `getToken()` and `setToken()`.
- **Silent 401 Refresh**: When an API call returns `401 Unauthorized`, `apiClient` pauses queued requests, invokes `/auth/refresh`, updates the JWT in memory/storage, and seamlessly replays the original requests.
- **Auto Logout**: If token refresh fails, user session is cleared and redirected to `/auth/login`.

---

## 🌐 Handling CORS (Cross-Origin Resource Sharing)

During local development with a backend on another port (e.g. frontend on `5173`, backend on `8000`):

### Option 1: Configure Backend CORS
Ensure your backend returns headers:
```http
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
```

### Option 2: Vite Dev Server Proxy
You can forward `/api` requests through Vite in `vite.config.ts`:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```
