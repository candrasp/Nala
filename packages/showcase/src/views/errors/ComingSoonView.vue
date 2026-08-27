<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Rocket,
  Sparkles,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Home,
  ArrowRight,
  Users,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AppLogo from '@/components/AppLogo.vue'
import { toast } from '@/components/ui/sonner'

const router = useRouter()

// Countdown state (Target: 14 days, 8 hours, 32 mins, 45 secs)
const days = ref(14)
const hours = ref(8)
const minutes = ref(32)
const seconds = ref(45)
let timer: ReturnType<typeof setInterval> | null = null

// Waitlist State
const email = ref('')
const isSubmitted = ref(false)
const isSubmitting = ref(false)

const upcomingFeatures = [
  {
    icon: Bot,
    title: 'Autonomous AI Orchestration',
    desc: 'Self-healing workflow pipelines with multi-agent collaborative tools.',
  },
  {
    icon: Zap,
    title: 'Sub-Millisecond Edge Sync',
    desc: 'Distributed global replication powered by modern event streaming.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Audit Framework',
    desc: 'Cryptographically immutable compliance logs and role policies.',
  },
]

onMounted(() => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else {
      seconds.value = 59
      if (minutes.value > 0) {
        minutes.value--
      } else {
        minutes.value = 59
        if (hours.value > 0) {
          hours.value--
        } else {
          hours.value = 23
          if (days.value > 0) {
            days.value--
          }
        }
      }
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

async function handleJoinWaitlist() {
  if (!email.value || !email.value.includes('@')) {
    toast.error('Please enter a valid work email.')
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    toast.success("You're on the early access waitlist! Check your inbox shortly.")
  }, 600)
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center p-4 sm:p-8">
    <div class="w-full max-w-3xl space-y-10 text-center">
      <!-- Brand Logo Header -->
      <div class="flex justify-center pb-2">
        <router-link to="/" class="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <AppLogo class="h-10 w-10" withBackground withText textClass="text-2xl font-bold tracking-tight" />
        </router-link>
      </div>

      <!-- Hero Teaser Header -->
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-xs">
          <Sparkles class="h-3.5 w-3.5" />
          <span>Next-Gen Enterprise Engine • v2.0 Release</span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
          Something Extraordinary is in the Works
        </h1>

        <p class="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          We are architecting the ultimate workspace intelligence suite — combining real-time edge streaming, AI orchestration, and enterprise compliance.
        </p>
      </div>

      <!-- Countdown Clock Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
        <!-- Days -->
        <Card class="border-border/80 bg-card/80 backdrop-blur-xs shadow-xs">
          <CardContent class="p-4 flex flex-col items-center justify-center">
            <span class="text-3xl sm:text-4xl font-mono font-black text-foreground">
              {{ String(days).padStart(2, '0') }}
            </span>
            <span class="text-[11px] font-semibold text-muted-foreground uppercase mt-1">Days</span>
          </CardContent>
        </Card>

        <!-- Hours -->
        <Card class="border-border/80 bg-card/80 backdrop-blur-xs shadow-xs">
          <CardContent class="p-4 flex flex-col items-center justify-center">
            <span class="text-3xl sm:text-4xl font-mono font-black text-foreground">
              {{ String(hours).padStart(2, '0') }}
            </span>
            <span class="text-[11px] font-semibold text-muted-foreground uppercase mt-1">Hours</span>
          </CardContent>
        </Card>

        <!-- Minutes -->
        <Card class="border-border/80 bg-card/80 backdrop-blur-xs shadow-xs">
          <CardContent class="p-4 flex flex-col items-center justify-center">
            <span class="text-3xl sm:text-4xl font-mono font-black text-foreground">
              {{ String(minutes).padStart(2, '0') }}
            </span>
            <span class="text-[11px] font-semibold text-muted-foreground uppercase mt-1">Minutes</span>
          </CardContent>
        </Card>

        <!-- Seconds -->
        <Card class="border-border/80 bg-card/80 backdrop-blur-xs shadow-xs">
          <CardContent class="p-4 flex flex-col items-center justify-center">
            <span class="text-3xl sm:text-4xl font-mono font-black text-primary">
              {{ String(seconds).padStart(2, '0') }}
            </span>
            <span class="text-[11px] font-semibold text-muted-foreground uppercase mt-1">Seconds</span>
          </CardContent>
        </Card>
      </div>

      <!-- Early Access VIP Waitlist Form -->
      <Card class="border-border/80 bg-card/60 backdrop-blur-xs shadow-md max-w-md mx-auto overflow-hidden">
        <CardContent class="p-6 space-y-4">
          <div v-if="!isSubmitted" class="space-y-3">
            <div class="text-left space-y-1">
              <h2 class="text-sm font-bold text-foreground">Request Early Access</h2>
              <p class="text-xs text-muted-foreground">
                Join our private beta pool and receive priority onboarding invitations.
              </p>
            </div>

            <form @submit.prevent="handleJoinWaitlist" class="flex flex-col sm:flex-row gap-2">
              <Input
                v-model="email"
                type="email"
                placeholder="name@company.com"
                class="h-10 text-xs bg-background"
                required
              />
              <Button type="submit" class="h-10 text-xs font-semibold gap-1.5 shrink-0" :disabled="isSubmitting">
                <Rocket class="h-3.5 w-3.5" />
                <span>{{ isSubmitting ? 'Joining...' : 'Join Waitlist' }}</span>
              </Button>
            </form>
          </div>

          <!-- Success Confirmation -->
          <div v-else class="py-2 text-center space-y-2">
            <div class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle2 class="h-5 w-5" />
            </div>
            <p class="text-sm font-bold text-foreground">You're on the VIP Waitlist!</p>
            <p class="text-xs text-muted-foreground">
              We've reserved spot <strong class="text-primary font-mono">#1,428</strong> for <span class="text-foreground font-medium">{{ email }}</span>.
            </p>
          </div>

          <div class="pt-2 flex items-center justify-center gap-4 text-[11px] text-muted-foreground border-t border-border/40">
            <span class="flex items-center gap-1">
              <Users class="h-3 w-3 text-primary" />
              <span>1,427 devs waiting</span>
            </span>
            <span>•</span>
            <span>No spam, unsubscribe anytime</span>
          </div>
        </CardContent>
      </Card>

      <!-- Teaser Features Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
        <div
          v-for="feat in upcomingFeatures"
          :key="feat.title"
          class="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all space-y-2 shadow-2xs"
        >
          <div class="inline-flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary">
            <component :is="feat.icon" class="h-4 w-4" />
          </div>
          <h3 class="text-xs font-bold text-foreground">{{ feat.title }}</h3>
          <p class="text-[11px] text-muted-foreground leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>

      <!-- Action Navigation -->
      <div class="pt-4 flex items-center justify-center gap-3">
        <Button variant="outline" size="sm" class="gap-1.5 text-xs h-9" @click="router.push('/')">
          <Home class="h-3.5 w-3.5" />
          <span>Back to Dashboard</span>
        </Button>

        <Button variant="ghost" size="sm" class="gap-1.5 text-xs h-9 text-muted-foreground hover:text-foreground" @click="router.push('/components/buttons')">
          <span>Explore UI Components</span>
          <ArrowRight class="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  </div>
</template>
