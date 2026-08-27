import { createRouter, createWebHistory } from 'vue-router'
import { loadingBar } from '@/lib/loading-bar'

// ─── Route Guard (Auth Protection) ────────────────────────────────────────────
// Uncomment the block below to enable authentication-based route protection.
// Make sure your auth store has an `isAuthenticated` boolean state.
//
// import { useAuthStore } from '@/stores/auth'
//
// const PUBLIC_ROUTES: string[] = [
//   'login',
//   'register',
//   'forgot-password',
//   'reset-password',
//   'verify-otp',
//   'confirm-email',
// ]
//
// router.beforeEach((to, _from, next) => {
//   const authStore = useAuthStore()
//   const isPublic = PUBLIC_ROUTES.includes(to.name as string)
//
//   if (!isPublic && !authStore.isAuthenticated) {
//     // Not authenticated → redirect to login, preserve intended destination
//     next({ name: 'login', query: { redirect: to.fullPath } })
//   } else if (isPublic && authStore.isAuthenticated) {
//     // Already authenticated → skip auth pages, go straight to dashboard
//     next({ name: 'dashboard' })
//   } else {
//     next()
//   }
// })
// ──────────────────────────────────────────────────────────────────────────────

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/IndexView.vue'),
        },
        {
          path: '_blank',
          name: 'starter-blank',
          component: () => import('@/views/_starter/BlankView.vue'),
        },
        {
          path: 'errors/404',
          name: 'not-found',
          component: () => import('@/views/errors/NotFoundView.vue'),
        },
        {
          path: 'errors/500',
          name: 'server-error',
          component: () => import('@/views/errors/ServerErrorView.vue'),
        },
        {
          path: 'errors/403',
          name: 'unauthorized',
          component: () => import('@/views/errors/UnauthorizedView.vue'),
        },
        {
          path: 'errors/maintenance',
          name: 'maintenance',
          component: () => import('@/views/errors/MaintenanceView.vue'),
        },
        {
          path: 'errors/coming-soon',
          name: 'coming-soon',
          component: () => import('@/views/errors/ComingSoonView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
        },
        {
          path: 'confirm-email',
          name: 'confirm-email',
          component: () => import('@/views/auth/ConfirmEmailView.vue'),
        },
        {
          path: 'verify-otp',
          name: 'verify-otp',
          component: () => import('@/views/auth/VerifyOtpView.vue'),
        },
        {
          path: 'lock-screen',
          name: 'lock-screen',
          component: () => import('@/views/auth/LockScreenView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'catch-all-not-found',
          component: () => import('@/views/errors/NotFoundView.vue'),
        },
      ],
    },
  ],
})

// ─── Global Route Transition Loading Indicator ──────────────────────────────
router.beforeEach(() => {
  loadingBar.start()
})

router.afterEach(() => {
  loadingBar.finish()
})

router.onError(() => {
  loadingBar.fail()
})

export default router
