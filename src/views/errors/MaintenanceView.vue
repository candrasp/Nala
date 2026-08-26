<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Wrench,
  RefreshCw,
  Home,
  CheckCircle2,
  Clock,
  Bell,
  Mail,
  Activity,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import AppLogo from '@/components/AppLogo.vue'
import { toast } from '@/components/ui/sonner'

const router = useRouter()

// Countdown Timer State (Target: 2 hours 45 minutes from now)
const hours = ref(2)
const minutes = ref(45)
const seconds = ref(18)
let timerInterval: ReturnType<typeof setInterval> | null = null

// Subscription State
const notifyEmail = ref('')
const isSubscribed = ref(false)
const isSubmitting = ref(false)
const isRefreshing = ref(false)

const maintenanceTasks = [
  { id: 1, title: 'Database Backup & Snapshot', status: 'completed', desc: 'Immutable backup archive verified' },
  { id: 2, title: 'Core API Cluster Upgrade', status: 'completed', desc: 'Deploying v2.4 kernel patches' },
  { id: 3, title: 'Search Index Rebuilding', status: 'in-progress', progress: 78, desc: 'Vector indexes processing' },
  { id: 4, title: 'Edge CDN Cache Warming', status: 'pending', desc: 'Global edge node cache purge' },
]

onMounted(() => {
  timerInterval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else {
      if (minutes.value > 0) {
        minutes.value--
        seconds.value = 59
      } else {
        if (hours.value > 0) {
          hours.value--
          minutes.value = 59
          seconds.value = 59
        } else {
          if (timerInterval) clearInterval(timerInterval)
        }
      }
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

async function handleSubscribe() {
  if (!notifyEmail.value || !notifyEmail.value.includes('@')) {
    toast.error('Please enter a valid email address.')
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubscribed.value = true
    toast.success(`We will notify ${notifyEmail.value} as soon as systems are live!`)
  }, 600)
}

function handleRefresh() {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    toast.info('System status refreshed: Maintenance is 78% complete.')
  }, 750)
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center p-4 sm:p-8">
    <div class="w-full max-w-2xl space-y-8 text-center">
      <!-- Brand Logo -->
      <div class="flex justify-center pb-2">
        <router-link to="/" class="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <AppLogo class="h-10 w-10" withBackground withText textClass="text-2xl font-bold tracking-tight" />
        </router-link>
      </div>

      <!-- Icon & Status Badge -->
      <div class="space-y-3">
        <div class="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-8 ring-amber-500/5 shadow-xs">
          <Wrench class="h-10 w-10 animate-spin-slow" />
          <span class="absolute -bottom-2 rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs">
            Maintenance
          </span>
        </div>

        <div class="space-y-2 pt-2">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            System Maintenance in Progress
          </h1>
          <p class="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            We are performing scheduled core infrastructure updates and database optimizations. All services are expected to resume shortly.
          </p>
        </div>
      </div>

      <!-- Live Countdown Card -->
      <Card class="border-border/80 bg-card/80 backdrop-blur-xs shadow-md">
        <CardContent class="p-6">
          <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Estimated Completion In
          </p>

          <div class="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm mx-auto">
            <!-- Hours -->
            <div class="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/60">
              <span class="text-3xl sm:text-4xl font-mono font-extrabold text-foreground">
                {{ String(hours).padStart(2, '0') }}
              </span>
              <span class="text-[11px] font-medium text-muted-foreground uppercase mt-1">Hours</span>
            </div>

            <!-- Minutes -->
            <div class="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/60">
              <span class="text-3xl sm:text-4xl font-mono font-extrabold text-foreground">
                {{ String(minutes).padStart(2, '0') }}
              </span>
              <span class="text-[11px] font-medium text-muted-foreground uppercase mt-1">Minutes</span>
            </div>

            <!-- Seconds -->
            <div class="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/60">
              <span class="text-3xl sm:text-4xl font-mono font-extrabold text-primary">
                {{ String(seconds).padStart(2, '0') }}
              </span>
              <span class="text-[11px] font-medium text-muted-foreground uppercase mt-1">Seconds</span>
            </div>
          </div>

          <!-- Live Progress Tracker -->
          <div class="mt-8 pt-6 border-t border-border/60 text-left space-y-3">
            <div class="flex items-center justify-between text-xs">
              <span class="font-semibold text-foreground flex items-center gap-1.5">
                <Activity class="h-3.5 w-3.5 text-primary animate-pulse" />
                <span>Migration Pipeline Progress</span>
              </span>
              <span class="font-mono font-bold text-primary">78%</span>
            </div>
            <Progress :model-value="78" class="h-2" />

            <!-- Subtask checklist -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
              <div
                v-for="task in maintenanceTasks"
                :key="task.id"
                class="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/50 bg-background/50 text-xs"
              >
                <CheckCircle2 v-if="task.status === 'completed'" class="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <RefreshCw v-else-if="task.status === 'in-progress'" class="h-4 w-4 text-primary animate-spin shrink-0 mt-0.5" />
                <Clock v-else class="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />

                <div class="space-y-0.5">
                  <p class="font-medium text-foreground text-xs leading-none">{{ task.title }}</p>
                  <p class="text-[11px] text-muted-foreground">{{ task.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Email Notification Capture -->
      <Card class="border-border/80 bg-card/60 shadow-xs max-w-lg mx-auto">
        <CardContent class="p-5 text-center">
          <div v-if="!isSubscribed" class="space-y-3">
            <div class="flex items-center justify-center gap-2 text-xs font-semibold text-foreground">
              <Bell class="h-4 w-4 text-primary" />
              <span>Get notified immediately when we're back online</span>
            </div>

            <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row gap-2">
              <Input
                v-model="notifyEmail"
                type="email"
                placeholder="Enter your work email"
                class="h-9 text-xs bg-background"
                required
              />
              <Button type="submit" size="sm" class="h-9 text-xs gap-1.5 shrink-0" :disabled="isSubmitting">
                <Mail class="h-3.5 w-3.5" />
                <span>{{ isSubmitting ? 'Subscribing...' : 'Notify Me' }}</span>
              </Button>
            </form>
          </div>

          <div v-else class="flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium py-1">
            <CheckCircle2 class="h-4 w-4" />
            <span>You're subscribed! We'll email you the moment systems are operational.</span>
          </div>
        </CardContent>
      </Card>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          variant="outline"
          class="gap-2 cursor-pointer text-xs h-9"
          :disabled="isRefreshing"
          @click="handleRefresh"
        >
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': isRefreshing }" />
          <span>{{ isRefreshing ? 'Checking...' : 'Refresh Status' }}</span>
        </Button>

        <Button
          variant="default"
          class="gap-2 cursor-pointer text-xs h-9"
          @click="router.push('/')"
        >
          <Home class="h-3.5 w-3.5" />
          <span>Dashboard Home</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spinSlow 12s linear infinite;
}
</style>
