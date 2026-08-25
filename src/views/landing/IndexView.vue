<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Activity,
  CreditCard,
  Lock,
  Moon,
  Sun,
  LayoutDashboard,
  ExternalLink,
  ChevronDown,
  Boxes,
  Palette,
  Check,
  Star,
  FileCode2,
  Table2,
  Smartphone,
  Server,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AppLogo from '@/components/AppLogo.vue'

const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: '',
  },
})

const toggleTheme = () => {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

// Pricing billing interval toggle
const billingInterval = ref<'monthly' | 'yearly'>('yearly')

// Active Showcase Tab
const activeTab = ref<'dashboard' | 'tables' | 'roles' | 'billing'>('dashboard')

// FAQ Open States
const openFaqIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// Tech Stack Features
const techStack = [
  { name: 'Vue 3.5+', desc: 'Composition API with <script setup lang="ts">', icon: Boxes },
  { name: 'Tailwind CSS v4', desc: 'Next-gen CSS engine with OKLCH color palettes', icon: Palette },
  { name: 'Vite 8 Powered', desc: 'Instant sub-millisecond HMR & optimized bundling', icon: Zap },
  { name: 'Strict TypeScript', desc: '100% type-safe schemas & payload interfaces', icon: FileCode2 },
  { name: 'Reka UI Primitives', desc: 'Accessible headless components compliant with WAI-ARIA', icon: Layers },
  { name: 'Enterprise Axios', desc: 'Silent JWT token refresh & interceptor loading bars', icon: Server },
]

// Feature Highlights
const features = [
  {
    title: 'Role & Permission Matrix',
    desc: 'Fine-grained RBAC with module-level and action-level permission matrix control.',
    icon: ShieldCheck,
    badge: 'Security',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Real-time Audit Trail',
    desc: 'Comprehensive activity logs with IP geo-lookup, client user-agents, and raw payload inspect.',
    icon: Activity,
    badge: 'Governance',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Billing & Invoice Engine',
    desc: 'Stripe-ready plan subscriptions, automated quota meters, card vault, and downloadable PDFs.',
    icon: CreditCard,
    badge: 'Monetization',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    title: 'Console-Grade Tables',
    desc: 'TanStack Vue table with multi-column sorting, fuzzy live search, batch selection, and pagination.',
    icon: Table2,
    badge: 'Data UX',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: '36+ UI Primitives',
    desc: 'Production-ready buttons, modals, dropdowns, forms with Zod validation, toast notifications, and tabs.',
    icon: Boxes,
    badge: 'Design System',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  },
  {
    title: 'Mobile Keyboard-Safe UX',
    desc: 'Fully adaptive viewport layouts that handle virtual keyboards smoothly without breaking layout.',
    icon: Smartphone,
    badge: 'Responsive',
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
  },
]

// Pricing Tiers
const pricingPlans = [
  {
    name: 'Community',
    desc: 'Ideal for independent developers and open-source hobbyists.',
    priceMonthly: 0,
    priceYearly: 0,
    isPopular: false,
    cta: 'Get Started Free',
    features: [
      'Full source code access',
      'All 36+ UI primitives included',
      'Community Discord & GitHub Discussions',
      'Standard MIT License',
    ],
  },
  {
    name: 'Pro Developer',
    desc: 'Complete commercial license for freelancers, startups, and SaaS products.',
    priceMonthly: 49,
    priceYearly: 39,
    isPopular: true,
    cta: 'Launch with Pro',
    features: [
      'Everything in Community',
      'Unlimited commercial SaaS deployments',
      'Advanced RBAC & Audit Trail modules',
      'Stripe Billing & Invoicing templates',
      'Lifetime minor & patch updates',
      'Priority GitHub support response',
    ],
  },
  {
    name: 'Enterprise',
    desc: 'For growing organizations needing tailored architecture and dedicated SLAs.',
    priceMonthly: 199,
    priceYearly: 159,
    isPopular: false,
    cta: 'Contact Architecture Team',
    features: [
      'Everything in Pro Developer',
      'Multi-tenant SSO / SAML / OIDC scaffolds',
      'Custom backend API integration audit',
      'Private Slack / Teams channel',
      'Dedicated 99.9% support SLA',
      'Custom invoice & PO billing',
    ],
  },
]

// Frequently Asked Questions
const faqs = [
  {
    q: 'What makes Nala different from other Vue admin templates?',
    a: 'Nala is built on the absolute latest 2026 web standard: Vite 8, Vue 3.5 Composition API, and Tailwind CSS v4 using modern OKLCH color spaces. Unlike bloated legacy templates, Nala uses headless Reka UI primitives and zero-config utility architecture for peak performance and strict TypeScript hygiene.',
  },
  {
    q: 'Can I use Nala for commercial client projects and SaaS applications?',
    a: 'Yes! The Nala codebase is engineered specifically as a robust springboard for SaaS products, internal tools, customer portals, and enterprise backoffices.',
  },
  {
    q: 'How does Nala connect to my custom backend API?',
    a: 'Nala features a centralized Axios service layer with automatic JWT bearer token injection, silent 401 refresh interceptors, top loading progress bars, and safe DEV mock fallbacks so frontend development is fast and seamless even while the backend is still being built.',
  },
  {
    q: 'Does Nala support dark mode out of the box?',
    a: 'Yes! Dark mode is natively configured via VueUse and Tailwind CSS v4 CSS variables. All 36+ components automatically adjust their borders, shadows, and contrast seamlessly.',
  },
]
</script>

<template>
  <div class="min-h-screen w-full bg-background text-foreground selection:bg-primary/20 selection:text-primary relative overflow-x-hidden flex flex-col">
    <!-- Background Ambient Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-120 bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- STICKY TOP NAVBAR                                                      -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <header class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Brand Logo with AppLogo component -->
        <router-link to="/" class="flex items-center gap-2.5 group" aria-label="Nala Home">
          <AppLogo withText withBackground size="xl" textClass="text-lg font-bold" />
          <Badge variant="outline" class="text-[10px] py-0 px-1.5 font-mono text-primary border-primary/30 bg-primary/5">
            v2.0
          </Badge>
        </router-link>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" class="hover:text-foreground transition-colors">Features</a>
          <a href="#architecture" class="hover:text-foreground transition-colors">Architecture</a>
          <a href="#showcase" class="hover:text-foreground transition-colors">Showcase</a>
          <a href="#pricing" class="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" class="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        <!-- Right Header Actions -->
        <div class="flex items-center gap-2.5">
          <!-- Theme Switcher -->
          <Button
            variant="ghost"
            size="icon-sm"
            class="rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <Sun v-if="mode === 'dark'" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </Button>

          <!-- GitHub Link -->
          <a
            href="https://github.com/candrasp/Nala"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex"
          >
            <Button variant="outline" size="sm" class="gap-1.5 text-xs">
              <Star class="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span>Star on GitHub</span>
            </Button>
          </a>

          <!-- Go to Dashboard CTA -->
          <router-link to="/">
            <Button size="sm" class="gap-1.5 text-xs font-semibold shadow-sm shadow-primary/20">
              <LayoutDashboard class="h-3.5 w-3.5" />
              <span>Live Dashboard</span>
            </Button>
          </router-link>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full flex flex-col">
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- HERO SECTION                                                          -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section class="w-full pt-16 sm:pt-24 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <!-- Floating Announcement Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-8 shadow-xs hover:bg-primary/15 transition-colors">
          <Sparkles class="h-3.5 w-3.5" />
          <span>Tailwind CSS v4 + Vue 3.5 Enterprise Stack</span>
          <ArrowRight class="h-3 w-3 ml-0.5" />
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1]">
          The Enterprise Admin Template Built for <span class="bg-linear-to-r from-primary via-emerald-500 to-teal-400 bg-clip-text text-transparent">Velocity</span>
        </h1>

        <!-- Subheading -->
        <p class="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Crafted with Vue 3 Composition API, Vite 8, strict TypeScript, and Reka UI primitives. Packed with production-ready RBAC, audit trails, and Stripe billing.
        </p>

        <!-- CTA Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <router-link to="/" class="w-full sm:w-auto">
            <Button size="lg" class="w-full sm:w-auto gap-2 text-sm font-semibold shadow-md shadow-primary/25 h-11 px-6">
              <LayoutDashboard class="h-4 w-4" />
              <span>Explore Live Dashboard</span>
            </Button>
          </router-link>

          <router-link to="/auth/login" class="w-full sm:w-auto">
            <Button variant="outline" size="lg" class="w-full sm:w-auto gap-2 text-sm font-medium h-11 px-6">
              <Lock class="h-4 w-4 text-muted-foreground" />
              <span>Sign In Console</span>
            </Button>
          </router-link>
        </div>

        <!-- Key Metrics Strip -->
        <div class="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div class="space-y-1">
            <p class="text-2xl sm:text-3xl font-extrabold text-foreground">36+</p>
            <p class="text-xs text-muted-foreground font-medium">UI Primitives Built-in</p>
          </div>
          <div class="space-y-1">
            <p class="text-2xl sm:text-3xl font-extrabold text-emerald-500">100%</p>
            <p class="text-xs text-muted-foreground font-medium">Strict TypeScript Safety</p>
          </div>
          <div class="space-y-1">
            <p class="text-2xl sm:text-3xl font-extrabold text-blue-500">&lt;100ms</p>
            <p class="text-xs text-muted-foreground font-medium">Vite Instant HMR</p>
          </div>
          <div class="space-y-1">
            <p class="text-2xl sm:text-3xl font-extrabold text-purple-500">Zero</p>
            <p class="text-xs text-muted-foreground font-medium">Legacy Build Bloat</p>
          </div>
        </div>

        <!-- Hero Dashboard Mockup Preview Image -->
        <div class="mt-14 relative mx-auto max-w-6xl w-full">
          <div class="rounded-2xl border border-border/80 bg-card/60 shadow-2xl p-2 sm:p-3 backdrop-blur-sm overflow-hidden group">
            <div class="rounded-xl border border-border/60 bg-card overflow-hidden shadow-lg">
              <img
                src="/screenshot.png"
                alt="Nala Admin Dashboard Console Preview"
                class="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- TECH STACK SECTION                                                    -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section id="architecture" class="w-full py-16 sm:py-20 border-y border-border/60 bg-muted/20">
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Architecture Standards</h2>
            <p class="mt-2 text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Engineered with Modern Technologies
            </p>
            <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
              No legacy dependencies, no jQuery baggage. Built strictly for the 2026 frontend ecosystem.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="item in techStack" :key="item.name" class="shadow-sm border hover:border-primary/40 transition-colors">
              <CardContent class="p-5 flex items-start gap-4">
                <div class="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                  <component :is="item.icon" class="h-5 w-5" />
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-bold text-foreground">{{ item.name }}</p>
                  <p class="text-xs text-muted-foreground leading-relaxed">{{ item.desc }}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- CORE FEATURES GRID                                                    -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section id="features" class="w-full py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Enterprise Ready</h2>
          <p class="mt-2 text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
            Everything You Need to Ship High-Value Apps
          </p>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Pre-built architectural blueprints, business modules, and UI utilities designed to save 300+ development hours.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="feat in features"
            :key="feat.title"
            class="shadow-sm border hover:shadow-md transition-all group relative overflow-hidden"
          >
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between mb-3">
                <div :class="['p-2.5 rounded-xl border', feat.color]">
                  <component :is="feat.icon" class="h-5 w-5" />
                </div>
                <Badge variant="outline" class="text-[10px] font-mono">{{ feat.badge }}</Badge>
              </div>
              <CardTitle class="text-base font-bold">{{ feat.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ feat.desc }}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- INTERACTIVE SHOWCASE TABS                                             -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section id="showcase" class="w-full py-20 bg-muted/20 border-y border-border/60">
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Live Previews</h2>
            <p class="mt-2 text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Inspect Core Modules in Action
            </p>
          </div>

          <!-- Tab Selector Buttons -->
          <div class="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-primary text-primary-foreground border-primary': activeTab === 'dashboard' }"
              @click="activeTab = 'dashboard'"
              class="gap-1.5 text-xs rounded-lg"
            >
              <LayoutDashboard class="h-3.5 w-3.5" />
              <span>Dashboard Core</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-primary text-primary-foreground border-primary': activeTab === 'tables' }"
              @click="activeTab = 'tables'"
              class="gap-1.5 text-xs rounded-lg"
            >
              <Table2 class="h-3.5 w-3.5" />
              <span>Data Tables</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-primary text-primary-foreground border-primary': activeTab === 'roles' }"
              @click="activeTab = 'roles'"
              class="gap-1.5 text-xs rounded-lg"
            >
              <ShieldCheck class="h-3.5 w-3.5" />
              <span>RBAC Matrix</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              :class="{ 'bg-primary text-primary-foreground border-primary': activeTab === 'billing' }"
              @click="activeTab = 'billing'"
              class="gap-1.5 text-xs rounded-lg"
            >
              <CreditCard class="h-3.5 w-3.5" />
              <span>Billing &amp; Invoices</span>
            </Button>
          </div>

          <!-- Tab Content Cards -->
          <div class="max-w-4xl mx-auto w-full">
            <Card class="shadow-md border overflow-hidden">
              <div v-if="activeTab === 'dashboard'" class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 class="font-bold text-sm">Executive Overview &amp; Health Telemetry</h3>
                    <p class="text-xs text-muted-foreground">Real-time metrics aggregating users, invoices, and uptime.</p>
                  </div>
                  <router-link to="/">
                    <Button size="xs" class="gap-1">Open View <ArrowRight class="h-3 w-3" /></Button>
                  </router-link>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div class="p-4 rounded-lg border bg-muted/20 space-y-1">
                    <span class="text-muted-foreground">Total Managed Nodes</span>
                    <p class="text-xl font-extrabold text-foreground">48 Node Clusters</p>
                    <p class="text-[11px] text-emerald-500 font-medium">All clusters healthy</p>
                  </div>
                  <div class="p-4 rounded-lg border bg-muted/20 space-y-1">
                    <span class="text-muted-foreground">Active Monthly Users</span>
                    <p class="text-xl font-extrabold text-foreground">12,840 DAU</p>
                    <p class="text-[11px] text-blue-500 font-medium">+24% user growth</p>
                  </div>
                </div>
              </div>

              <div v-else-if="activeTab === 'tables'" class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 class="font-bold text-sm">Data Table Sorting &amp; Batch Operations</h3>
                    <p class="text-xs text-muted-foreground">Complete keyboard accessibility, checkboxes, and status dots.</p>
                  </div>
                  <router-link to="/components/tables">
                    <Button size="xs" class="gap-1">Open View <ArrowRight class="h-3 w-3" /></Button>
                  </router-link>
                </div>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Engineered with TanStack headless engine, offering blazing-fast in-memory client filtering, multi-row bulk actions toolbar, and instant CSV export.
                </p>
              </div>

              <div v-else-if="activeTab === 'roles'" class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 class="font-bold text-sm">Fine-Grained RBAC Permission Matrix</h3>
                    <p class="text-xs text-muted-foreground">Manage user scopes across Admin, Editor, Billing Manager, and Viewer.</p>
                  </div>
                  <router-link to="/roles">
                    <Button size="xs" class="gap-1">Open View <ArrowRight class="h-3 w-3" /></Button>
                  </router-link>
                </div>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Interactive matrix allowing instantaneous permission scope toggling with clean visual feedback and safety guards for system roles.
                </p>
              </div>

              <div v-else-if="activeTab === 'billing'" class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 class="font-bold text-sm">Subscription &amp; Payment Instrument Vault</h3>
                    <p class="text-xs text-muted-foreground">Manage payment cards, active tiers, and PDF receipts.</p>
                  </div>
                  <router-link to="/billing">
                    <Button size="xs" class="gap-1">Open View <ArrowRight class="h-3 w-3" /></Button>
                  </router-link>
                </div>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Stripe-ready components with visual brand logos (Visa, Mastercard, AMEX) and automated invoice status badges.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- PRICING SECTION                                                       -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section id="pricing" class="w-full py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Transparent Pricing</h2>
          <p class="mt-2 text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
            Choose the Perfect Plan for Your Project
          </p>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            All plans include lifetime access with zero recurring royalties on your products.
          </p>

          <!-- Interval Switcher -->
          <div class="mt-8 inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border">
            <button
              type="button"
              @click="billingInterval = 'monthly'"
              :class="[
                'px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer',
                billingInterval === 'monthly' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              Monthly Billing
            </button>
            <button
              type="button"
              @click="billingInterval = 'yearly'"
              :class="[
                'px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
                billingInterval === 'yearly' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
              ]"
            >
              <span>Yearly Billing</span>
              <span class="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch w-full">
          <Card
            v-for="plan in pricingPlans"
            :key="plan.name"
            :class="[
              'shadow-sm border flex flex-col justify-between relative transition-all',
              plan.isPopular ? 'border-primary shadow-lg ring-1 ring-primary/40' : 'hover:border-primary/40'
            ]"
          >
            <div v-if="plan.isPopular" class="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="default" class="text-[10px] uppercase font-bold tracking-wider py-0.5 px-3 shadow-sm">
                Most Popular Choice
              </Badge>
            </div>

            <CardHeader class="pb-4">
              <span class="text-base font-bold text-foreground">{{ plan.name }}</span>
              <p class="text-xs text-muted-foreground min-h-8">{{ plan.desc }}</p>

              <!-- Price Display -->
              <div class="pt-4 pb-2">
                <div class="flex items-baseline gap-1">
                  <span class="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    ${{ billingInterval === 'yearly' ? plan.priceYearly : plan.priceMonthly }}
                  </span>
                  <span class="text-xs text-muted-foreground font-medium">/ month</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  {{ billingInterval === 'yearly' && plan.priceYearly > 0 ? `Billed annually ($${plan.priceYearly * 12}/year)` : 'Billed monthly' }}
                </p>
              </div>
            </CardHeader>

            <CardContent class="space-y-4 pt-0 flex-1">
              <div class="border-t pt-4 space-y-2.5">
                <span class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Features included:</span>
                <ul class="space-y-2.5 text-xs">
                  <li
                    v-for="feat in plan.features"
                    :key="feat"
                    class="flex items-start gap-2 text-muted-foreground"
                  >
                    <Check class="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>
            </CardContent>

            <div class="p-6 pt-0">
              <router-link to="/">
                <Button
                  :variant="plan.isPopular ? 'default' : 'outline'"
                  size="sm"
                  class="w-full text-xs font-semibold h-10"
                >
                  {{ plan.cta }}
                </Button>
              </router-link>
            </div>
          </Card>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- FAQ ACCORDION                                                         -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section id="faq" class="w-full py-20 bg-muted/20 border-t border-border/60">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest">Questions &amp; Answers</h2>
            <p class="mt-2 text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>

          <div class="space-y-3">
            <div
              v-for="(faq, idx) in faqs"
              :key="faq.q"
              class="rounded-xl border bg-card transition-all overflow-hidden"
            >
              <button
                type="button"
                @click="toggleFaq(idx)"
                class="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/20 transition-colors"
              >
                <span class="text-sm font-semibold text-foreground">{{ faq.q }}</span>
                <ChevronDown
                  class="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200"
                  :class="{ 'rotate-180 text-primary': openFaqIndex === idx }"
                />
              </button>
              <div
                v-if="openFaqIndex === idx"
                class="px-4 sm:px-5 pb-5 pt-0 text-xs text-muted-foreground leading-relaxed border-t bg-muted/10"
              >
                <div class="pt-3">
                  {{ faq.a }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- CALL TO ACTION BANNER                                                 -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <section class="w-full py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl border border-primary/30 bg-linear-to-br from-primary/15 via-primary/5 to-background p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          <div class="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Ready to Accelerate Your Enterprise Web App?
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Skip weeks of boilerplate configuration. Clone the repository and build on a battle-tested Vue 3 + Tailwind CSS v4 foundation.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <router-link to="/" class="w-full sm:w-auto">
                <Button size="lg" class="w-full sm:w-auto text-sm font-semibold h-11 px-8 gap-2 shadow-md shadow-primary/25">
                  <LayoutDashboard class="h-4 w-4" />
                  <span>Launch Admin Console</span>
                </Button>
              </router-link>
              <a
                href="https://github.com/candrasp/Nala"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" class="w-full sm:w-auto text-sm font-medium h-11 px-8 gap-2">
                  <ExternalLink class="h-4 w-4 text-muted-foreground" />
                  <span>View GitHub Repository</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- PUBLIC FOOTER                                                         -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <footer class="w-full border-t border-border/60 bg-muted/20 py-10 text-xs text-muted-foreground">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Logo & Copyright with Developer Link -->
        <div class="flex items-center gap-3 text-center sm:text-left">
          <AppLogo withBackground size="xl" />
          <div class="space-y-0.5">
            <p class="text-xs text-foreground font-semibold">Nala Enterprise Admin Template</p>
            <p class="text-[11px] text-muted-foreground">
              © 2026 Nala. Developed by
              <a
                href="https://github.com/candrasp"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold text-foreground hover:text-primary hover:underline inline-flex items-center gap-1 transition-colors"
              >
                CandraSp <ExternalLink class="h-3 w-3 inline" />
              </a>
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="flex items-center gap-6">
          <router-link to="/" class="hover:text-foreground transition-colors font-medium">Dashboard</router-link>
          <router-link to="/components/tables" class="hover:text-foreground transition-colors font-medium">Components</router-link>
          <router-link to="/auth/login" class="hover:text-foreground transition-colors font-medium">Sign In</router-link>
          <a href="https://github.com/candrasp/Nala" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors font-medium">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>
