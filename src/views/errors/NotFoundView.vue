<script setup lang="ts">
import {
  FileQuestion,
  ArrowLeft,
  Home,
  Layers,
  Settings,
} from '@lucide/vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const quickLinks = [
  { label: 'Overview Dashboard', href: '/', icon: Home },
  { label: 'UI Components', href: '/components/buttons', icon: Layers },
  { label: 'System Settings', href: '/settings', icon: Settings },
]
</script>

<template>
  <div class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4 text-center sm:p-8">
    <div class="w-full max-w-lg space-y-6">
      <!-- Icon & Status Badge -->
      <div class="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-8 ring-primary/5">
        <FileQuestion class="h-12 w-12" />
        <span class="absolute -bottom-2.5 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold tracking-wider text-primary-foreground uppercase shadow-xs">
          404 Error
        </span>
      </div>

      <!-- Main Copy -->
      <div class="space-y-2">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Page Not Found
        </h1>
        <p class="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          The requested URL does not exist or has been moved. Check the URL spelling or choose one of the quick shortcuts below.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex flex-col gap-2.5 sm:flex-row sm:justify-center pt-2">
        <Button variant="outline" class="gap-2 cursor-pointer" @click="goBack">
          <ArrowLeft class="h-4 w-4" />
          Go Back
        </Button>
        <Button as-child class="gap-2 cursor-pointer">
          <router-link to="/">
            <Home class="h-4 w-4" />
            Back to Dashboard
          </router-link>
        </Button>
      </div>

      <!-- Quick Helpful Links -->
      <div class="pt-6 border-t border-border/60">
        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Popular Destinations
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <router-link
            v-for="link in quickLinks"
            :key="link.href"
            :to="link.href"
            class="flex items-center justify-center gap-2 p-2.5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-xs font-medium text-foreground transition-all shadow-2xs"
          >
            <component :is="link.icon" class="h-3.5 w-3.5 text-muted-foreground" />
            <span>{{ link.label }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
