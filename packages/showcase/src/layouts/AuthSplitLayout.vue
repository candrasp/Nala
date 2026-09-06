<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import {
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Zap,
} from '@lucide/vue'
import AppLogo from '@/components/AppLogo.vue'

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Testimonial Carousel
interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Nala reduced our frontend delivery cycles by over 70%. The architecture, real API adapters, and UI primitives are exceptionally well-crafted.',
    author: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Horizon SaaS',
    avatar: 'SJ',
  },
  {
    quote: 'The strict TypeScript hygiene, Tailwind v4 design tokens, and zero-boilerplate auto-imports make pairing with AI agents effortless.',
    author: 'David Chen',
    role: 'Lead Architect',
    company: 'CloudScale Technologies',
    avatar: 'DC',
  },
  {
    quote: 'By far the cleanest, fastest, and most comprehensive Vue 3 enterprise admin dashboard available. Exceptional attention to detail.',
    author: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'Synapse AI',
    avatar: 'ER',
  },
]

const activeIndex = ref(0)
let carouselTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  carouselTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % testimonials.length
  }, 6000)
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
})
</script>

<template>
  <div class="min-h-dvh lg:h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-background text-foreground transition-colors duration-200 lg:overflow-hidden">
    <!-- Left Column: Authentication Form Container (5 Cols / 7 Cols responsive) -->
    <div class="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-8 xl:p-10 lg:col-span-6 xl:col-span-5 relative overflow-y-auto lg:h-full">
      <!-- Top Brand Navigation Header -->
      <header class="flex items-center justify-between w-full shrink-0">
        <router-link to="/" class="inline-flex items-center gap-2.5 group focus:outline-none">
          <AppLogo size="md" :withText="true" />
        </router-link>

        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button
            type="button"
            class="h-8 w-8 rounded-lg border border-border/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
            title="Toggle theme"
            @click="toggleColorMode"
          >
            <Sun v-if="colorMode === 'dark'" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>
        </div>
      </header>

      <!-- Center Auth Content Area -->
      <main class="my-auto py-6 w-full max-w-md mx-auto flex flex-col justify-center">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <!-- Bottom Footer -->
      <footer class="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 border-t border-border/40 shrink-0">
        <p>&copy; {{ new Date().getFullYear() }} Nala Dashboard. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-foreground transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-foreground transition-colors">Security</a>
        </div>
      </footer>
    </div>

    <!-- Right Column: Hero Side-Banner Panel (7 Cols / 8 Cols on desktop) -->
    <aside class="hidden lg:flex lg:col-span-6 xl:col-span-7 relative flex-col justify-between p-8 xl:p-10 overflow-hidden bg-muted/30 border-l border-border/60 lg:h-full">
      <!-- Ambient Gradient Backdrops -->
      <div class="absolute inset-0 bg-linear-to-br from-primary/10 via-primary/5 to-transparent pointer-events-none" />
      <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <!-- Top Badge / Header info -->
      <div class="relative z-10 flex items-center justify-between shrink-0">
        <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-xs">
          <Sparkles class="h-3.5 w-3.5" />
          Enterprise Admin Platform
        </div>

        <div class="flex items-center gap-4 text-xs text-muted-foreground">
          <span class="inline-flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            v3.1.1 Production Ready
          </span>
        </div>
      </div>

      <!-- Center Hero Graphic & Value Proposition -->
      <div class="relative z-10 my-auto py-4 xl:py-6 space-y-5 xl:space-y-6 max-w-xl">
        <div class="space-y-2">
          <h2 class="text-2xl xl:text-3xl font-bold tracking-tight text-foreground">
            The Enterprise Architecture for High-Velocity Teams.
          </h2>
          <p class="text-xs xl:text-sm text-muted-foreground leading-relaxed">
            Built with Vue 3 Composition API, Tailwind CSS v4 OKLCH tokens, Reka UI primitives, and real API adapters with safe offline fallbacks.
          </p>
        </div>

        <!-- Key Capability Badges -->
        <div class="grid grid-cols-2 gap-3 pt-1">
          <div class="flex items-start gap-2.5 rounded-xl border border-border/70 bg-card/60 p-3 backdrop-blur-xs shadow-2xs">
            <ShieldCheck class="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 class="text-xs font-semibold text-foreground">Enterprise Security</h4>
              <p class="text-[11px] text-muted-foreground mt-0.5">2FA TOTP & SAML Single Sign-On</p>
            </div>
          </div>

          <div class="flex items-start gap-2.5 rounded-xl border border-border/70 bg-card/60 p-3 backdrop-blur-xs shadow-2xs">
            <Zap class="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h4 class="text-xs font-semibold text-foreground">Sub-Second HMR</h4>
              <p class="text-[11px] text-muted-foreground mt-0.5">Vite 8 bundler with zero-import</p>
            </div>
          </div>
        </div>

        <!-- Dynamic Testimonial Card with Transition -->
        <div class="rounded-2xl border border-border/80 bg-card/80 p-5 backdrop-blur-md shadow-xs relative overflow-hidden transition-all duration-300">
          <div class="space-y-3">
            <p class="text-xs xl:text-sm text-foreground/90 italic leading-relaxed min-h-12 xl:min-h-14">
              "{{ testimonials[activeIndex].quote }}"
            </p>

            <div class="flex items-center justify-between pt-2 border-t border-border/50">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 rounded-full bg-primary/15 text-primary font-semibold text-xs flex items-center justify-center border border-primary/20 shrink-0">
                  {{ testimonials[activeIndex].avatar }}
                </div>
                <div>
                  <div class="text-xs font-semibold text-foreground">{{ testimonials[activeIndex].author }}</div>
                  <div class="text-[11px] text-muted-foreground">{{ testimonials[activeIndex].role }} &middot; {{ testimonials[activeIndex].company }}</div>
                </div>
              </div>

              <!-- Carousel Dots -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(_, index) in testimonials"
                  :key="index"
                  type="button"
                  :class="[
                    'h-1.5 rounded-full transition-all cursor-pointer',
                    activeIndex === index ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  ]"
                  @click="activeIndex = index"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Platform Metrics Strip -->
      <div class="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-border/50 shrink-0">
        <div>
          <div class="text-xl xl:text-2xl font-bold tracking-tight text-foreground">46+</div>
          <div class="text-xs text-muted-foreground mt-0.5">UI Primitives</div>
        </div>
        <div>
          <div class="text-xl xl:text-2xl font-bold tracking-tight text-foreground">99.9%</div>
          <div class="text-xs text-muted-foreground mt-0.5">SLA Availability</div>
        </div>
        <div>
          <div class="text-xl xl:text-2xl font-bold tracking-tight text-foreground">&lt;100ms</div>
          <div class="text-xs text-muted-foreground mt-0.5">API Latency</div>
        </div>
      </div>
    </aside>
  </div>
</template>
