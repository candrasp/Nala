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
          path: 'dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('@/views/dashboard/EcommerceView.vue'),
        },
        {
          path: 'ecommerce',
          redirect: '/dashboard/ecommerce',
        },
        {
          path: 'dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('@/views/dashboard/AnalyticsView.vue'),
        },
        {
          path: 'analytics',
          redirect: '/dashboard/analytics',
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/users/IndexView.vue'),
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: () => import('@/views/notifications/IndexView.vue'),
        },
        {
          path: 'activity',
          name: 'activity',
          component: () => import('@/views/activity/IndexView.vue'),
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('@/views/roles/IndexView.vue'),
        },
        {
          path: 'billing',
          name: 'billing',
          component: () => import('@/views/billing/IndexView.vue'),
        },
        {
          path: 'billing/invoice/:id',
          name: 'billing-invoice',
          component: () => import('@/views/billing/InvoiceDetailView.vue'),
        },
        {
          path: 'billing/invoices/:id',
          redirect: (to) => `/billing/invoice/${to.params.id}`,
        },
        {
          path: 'apps/kanban',
          name: 'apps-kanban',
          component: () => import('@/views/apps/KanbanView.vue'),
        },
        {
          path: 'kanban',
          redirect: '/apps/kanban',
        },
        {
          path: 'apps/file-manager',
          name: 'apps-file-manager',
          component: () => import('@/views/apps/FileManagerView.vue'),
        },
        {
          path: 'file-manager',
          redirect: '/apps/file-manager',
        },
        {
          path: 'apps/chat',
          name: 'apps-chat',
          component: () => import('@/views/apps/ChatView.vue'),
        },
        {
          path: 'chat',
          redirect: '/apps/chat',
        },
        {
          path: 'components/buttons',
          name: 'components-buttons',
          component: () => import('@/views/components/ButtonView.vue'),
        },
        {
          path: 'buttons',
          redirect: '/components/buttons',
        },
        {
          path: 'components/forms',
          name: 'components-forms',
          component: () => import('@/views/components/FormView.vue'),
        },
        {
          path: 'components/modals',
          name: 'components-modals',
          component: () => import('@/views/components/ModalView.vue'),
        },
        {
          path: 'components/cards',
          name: 'components-cards',
          component: () => import('@/views/components/CardView.vue'),
        },
        {
          path: 'components/tables',
          name: 'components-tables',
          component: () => import('@/views/components/TableView.vue'),
        },
        {
          path: 'components/overlays',
          name: 'components-overlays',
          component: () => import('@/views/components/OverlayView.vue'),
        },
        {
          path: 'components/feedback',
          name: 'components-feedback',
          component: () => import('@/views/components/FeedbackView.vue'),
        },
        {
          path: 'components/badges',
          name: 'components-badges',
          component: () => import('@/views/components/BadgeAvatarView.vue'),
        },
        {
          path: 'components/formatters',
          name: 'components-formatters',
          component: () => import('@/views/components/FormatterView.vue'),
        },
        {
          path: 'components/toasts',
          name: 'components-toasts',
          component: () => import('@/views/components/ToastView.vue'),
        },
        {
          path: 'components/charts',
          name: 'components-charts',
          component: () => import('@/views/components/ChartView.vue'),
        },
        {
          path: 'components/navigation',
          name: 'components-navigation',
          component: () => import('@/views/components/NavigationView.vue'),
        },
        {
          path: 'components/typography',
          name: 'components-typography',
          component: () => import('@/views/components/TypographyView.vue'),
        },
        {
          path: 'components/colors',
          name: 'components-colors',
          component: () => import('@/views/components/ColorsView.vue'),
        },
        {
          path: 'components/icons',
          name: 'components-icons',
          component: () => import('@/views/components/IconsView.vue'),
        },
        {
          path: 'starter/blank',
          name: 'starter-blank',
          component: () => import('@/views/_starter/BlankView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/profile/IndexView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/settings/IndexView.vue'),
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
          path: 'unauthorized',
          redirect: '/errors/403',
        },
        {
          path: 'errors/maintenance',
          name: 'maintenance',
          component: () => import('@/views/errors/MaintenanceView.vue'),
        },
        {
          path: 'maintenance',
          redirect: '/errors/maintenance',
        },
        {
          path: 'errors/coming-soon',
          name: 'coming-soon',
          component: () => import('@/views/errors/ComingSoonView.vue'),
        },
        {
          path: 'coming-soon',
          redirect: '/errors/coming-soon',
        },
      ],
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/landing/IndexView.vue'),
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
