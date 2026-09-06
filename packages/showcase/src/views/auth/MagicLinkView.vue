<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import {
  Sparkles,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ExternalLink,
  RotateCw,
  AlertCircle,
  Clock,
  Shield,
} from '@lucide/vue'

const router = useRouter()

const email = ref('')
const isSubmitted = ref(false)
const isSending = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const countdown = ref(60)
let timer: ReturnType<typeof setInterval> | null = null

const startCountdown = () => {
  countdown.value = 60
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      if (timer) clearInterval(timer)
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const handleSendMagicLink = () => {
  const trimmed = email.value.trim()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  isSending.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isSending.value = false
    isSubmitted.value = true
    startCountdown()
    toast.success('Magic link has been dispatched to your inbox!')
  }, 1000)
}

const handleResend = () => {
  if (countdown.value > 0 || isResending.value) return
  isResending.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isResending.value = false
    startCountdown()
    toast.info('A fresh magic link has been sent!')
  }, 900)
}

const openEmailClient = (provider: 'gmail' | 'outlook') => {
  if (provider === 'gmail') {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer')
  } else {
    window.open('https://outlook.live.com', '_blank', 'noopener,noreferrer')
  }
}

const simulateInstantLogin = () => {
  toast.success('Simulated magic link clicked from email client!')
  router.push('/')
}
</script>

<template>
  <Card flush class="w-full max-w-md shadow-xl border-border/80 bg-card">
    <!-- State 2: Magic Link Dispatched (Awaiting Email Click) -->
    <template v-if="isSubmitted">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="relative mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Mail class="h-7 w-7 animate-pulse" />
          <div class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
            <CheckCircle2 class="h-3.5 w-3.5" />
          </div>
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Check your email</CardTitle>
        <CardDescription class="text-sm">
          We've sent a passwordless sign-in link to
          <span class="font-semibold text-foreground">{{ email }}</span>.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-4">
        <!-- Explanatory note -->
        <div class="rounded-lg border border-border/70 bg-muted/20 p-3.5 text-xs text-muted-foreground space-y-1.5">
          <div class="flex items-center gap-1.5 font-medium text-foreground">
            <Shield class="h-3.5 w-3.5 text-primary" />
            <span>Secure Passwordless Authentication</span>
          </div>
          <p>
            Click the button inside the email to sign in instantly. The link expires in 15 minutes and can only be used once.
          </p>
        </div>

        <!-- Direct Email Providers Launcher -->
        <div class="space-y-2 pt-1">
          <span class="text-[11px] font-medium text-muted-foreground">Quick open mailbox:</span>
          <div class="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="h-9 text-xs justify-center cursor-pointer"
              @click="openEmailClient('gmail')"
            >
              Open Gmail
              <ExternalLink class="h-3.5 w-3.5 ml-1.5 opacity-70" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="h-9 text-xs justify-center cursor-pointer"
              @click="openEmailClient('outlook')"
            >
              Open Outlook
              <ExternalLink class="h-3.5 w-3.5 ml-1.5 opacity-70" />
            </Button>
          </div>
        </div>

        <!-- Simulated One-Click Callback Demo -->
        <div class="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs space-y-2">
          <div class="flex items-center justify-between text-[11px] text-primary font-medium">
            <span>Developer Sandbox Demo</span>
            <Sparkles class="h-3.5 w-3.5" />
          </div>
          <p class="text-[11px] text-muted-foreground">
            Testing locally without access to an actual mail inbox? Simulate clicking the magic link callback below:
          </p>
          <Button
            type="button"
            class="w-full h-8 text-xs font-medium cursor-pointer"
            @click="simulateInstantLogin"
          >
            Simulate Email Link Click
            <ArrowRight class="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>

        <!-- Resend Countdown -->
        <div class="pt-2 text-center">
          <p class="text-xs text-muted-foreground">
            Didn't receive the email?
            <button
              v-if="countdown === 0"
              type="button"
              class="text-primary hover:underline font-medium ml-1 inline-flex items-center gap-1 cursor-pointer"
              :disabled="isResending"
              @click="handleResend"
            >
              <RotateCw v-if="isResending" class="h-3 w-3 animate-spin" />
              Resend magic link
            </button>
            <span v-else class="text-foreground/70 font-mono ml-1 inline-flex items-center gap-1">
              <Clock class="h-3 w-3 text-muted-foreground" />
              Resend in {{ countdown }}s
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter class="flex justify-center border-t border-border/60 py-4 bg-muted/10">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          @click="isSubmitted = false"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          Use a different email address
        </button>
      </CardFooter>
    </template>

    <!-- State 1: Magic Link Request Form -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Passwordless Sign In</CardTitle>
        <CardDescription class="text-sm">
          Enter your email address and we'll send you a secure magic link to sign in instantly without a password.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-4">
        <!-- Error Alert Banner -->
        <Alert v-if="errorMessage" variant="destructive" class="py-2.5 px-3.5">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription class="text-xs font-medium ml-2">
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <form @submit.prevent="handleSendMagicLink" class="space-y-4">
          <div class="space-y-1.5">
            <Label for="magic-email" class="text-xs font-medium">Email address</Label>
            <div class="relative flex items-center">
              <Mail class="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="magic-email"
                v-model="email"
                type="email"
                placeholder="name@example.com"
                class="pl-9 h-10 text-sm"
                :disabled="isSending"
                autofocus
              />
            </div>
          </div>

          <Button
            type="submit"
            class="w-full font-medium h-10 cursor-pointer"
            :disabled="!email.trim() || isSending"
          >
            <Loader2 v-if="isSending" class="h-4 w-4 animate-spin mr-2" />
            <span v-else class="flex items-center justify-center gap-1.5">
              Send Magic Link
              <ArrowRight class="h-3.5 w-3.5" />
            </span>
          </Button>
        </form>

        <!-- Demo auto-fill hint -->
        <div class="pt-1 text-center">
          <button
            type="button"
            class="text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            @click="email = 'alex.morgan@example.com'"
          >
            Click to fill demo: <span class="font-mono text-foreground">alex.morgan@example.com</span>
          </button>
        </div>
      </CardContent>

      <CardFooter class="flex justify-center border-t border-border/60 py-4 bg-muted/10">
        <router-link
          to="/auth/login"
          class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          Return to password sign in
        </router-link>
      </CardFooter>
    </template>
  </Card>
</template>
