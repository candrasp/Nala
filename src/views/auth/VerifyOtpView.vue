<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, RotateCw, KeyRound, Smartphone } from '@lucide/vue'

const router = useRouter()
const isRecoveryMode = ref(false)
const recoveryCode = ref('')
const digits = ref<string[]>(['', '', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])
const isVerifying = ref(false)
const isVerified = ref(false)
const errorMessage = ref('')
const countdown = ref(60)
const isResending = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const isCodeComplete = computed(() => {
  if (isRecoveryMode.value) {
    return recoveryCode.value.trim().length >= 8
  }
  return digits.value.every((d) => d.length === 1)
})

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

onMounted(() => {
  startCountdown()
  setTimeout(() => {
    inputRefs.value[0]?.focus()
  }, 100)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const handleInput = (index: number, event: Event) => {
  errorMessage.value = ''
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')

  digits.value[index] = value ? value.slice(-1) : ''

  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text') || ''
  const numbers = pastedData.replace(/\D/g, '').slice(0, 6)

  if (numbers.length > 0) {
    for (let i = 0; i < 6; i++) {
      digits.value[i] = numbers[i] || ''
    }
    const nextIndex = Math.min(numbers.length, 5)
    inputRefs.value[nextIndex]?.focus()
  }
}

const handleVerify = () => {
  if (!isCodeComplete.value) return
  isVerifying.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isVerifying.value = false
    const enteredCode = isRecoveryMode.value ? recoveryCode.value.trim() : digits.value.join('')

    if (enteredCode === '000000') {
      errorMessage.value = 'Invalid OTP code. Please check and try again.'
    } else {
      isVerified.value = true
    }
  }, 1000)
}

const handleResend = () => {
  if (countdown.value > 0 || isResending.value) return
  isResending.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isResending.value = false
    digits.value = ['', '', '', '', '', '']
    inputRefs.value[0]?.focus()
    startCountdown()
  }, 800)
}

const toggleRecoveryMode = () => {
  isRecoveryMode.value = !isRecoveryMode.value
  errorMessage.value = ''
}

const handleProceed = () => {
  router.push('/')
}
</script>

<template>
  <Card class="w-full max-w-md shadow-xl border-border/80 bg-card overflow-hidden py-0 gap-0">
    <!-- Success State -->
    <template v-if="isVerified">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Authentication verified</CardTitle>
        <CardDescription class="text-sm">
          Two-factor authentication verified successfully. Redirecting you to your account...
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-8">
        <Button class="w-full font-medium cursor-pointer" @click="handleProceed">
          <span class="flex items-center justify-center gap-2">
            Continue to Dashboard
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>
      </CardContent>
    </template>

    <!-- OTP Form State -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <component :is="isRecoveryMode ? KeyRound : ShieldCheck" class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">
          {{ isRecoveryMode ? 'Enter recovery code' : 'Two-Factor Authentication' }}
        </CardTitle>
        <CardDescription class="text-sm">
          {{
            isRecoveryMode
              ? 'Enter one of your emergency recovery codes to access your account.'
              : 'Enter the 6-digit verification code generated by your authenticator app or sent to your phone.'
          }}
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-5">
        <!-- Recovery Code Input -->
        <div v-if="isRecoveryMode" class="space-y-2">
          <Label for="recoveryCode" class="text-xs font-semibold">Recovery Code</Label>
          <div class="relative">
            <KeyRound class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="recoveryCode"
              v-model="recoveryCode"
              type="text"
              placeholder="e.g. ABCD-1234-EFGH"
              class="pl-9 font-mono uppercase"
              autocomplete="off"
            />
          </div>
        </div>

        <!-- 6-Digit OTP Inputs -->
        <div v-else class="flex items-center justify-center gap-2 sm:gap-3" @paste="handlePaste">
          <input
            v-for="(_, index) in digits"
            :key="index"
            ref="inputRefs"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="1"
            :value="digits[index]"
            class="h-12 w-11 sm:h-13 sm:w-12 rounded-lg border border-input bg-background text-center text-lg font-semibold shadow-xs outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            @input="handleInput(index, $event)"
            @keydown="handleKeyDown(index, $event)"
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-xs font-medium text-destructive text-center">
          {{ errorMessage }}
        </p>

        <!-- Submit Button -->
        <Button
          type="button"
          class="w-full font-medium cursor-pointer"
          :disabled="!isCodeComplete || isVerifying"
          @click="handleVerify"
        >
          <span v-if="isVerifying">Verifying...</span>
          <span v-else class="flex items-center justify-center gap-2">
            Verify Code
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>

        <!-- Method Alternatives & Resend Options -->
        <div class="space-y-3 text-center text-xs text-muted-foreground">
          <div v-if="!isRecoveryMode">
            <span>Didn't get a code? </span>
            <button
              type="button"
              class="font-medium text-primary hover:underline transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline inline-flex items-center gap-1"
              :disabled="countdown > 0 || isResending"
              @click="handleResend"
            >
              <RotateCw v-if="isResending" class="h-3 w-3 animate-spin" />
              <span v-if="countdown > 0">Resend code in {{ countdown }}s</span>
              <span v-else>Resend code</span>
            </button>
          </div>

          <div>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              @click="toggleRecoveryMode"
            >
              <component :is="isRecoveryMode ? Smartphone : KeyRound" class="h-3.5 w-3.5" />
              {{ isRecoveryMode ? 'Use authenticator code instead' : 'Use a backup recovery code' }}
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter class="border-t border-border/60 bg-muted/30 px-6 py-4 flex flex-col items-center justify-center text-center">
        <router-link
          to="/auth/login"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          Back to sign in
        </router-link>
      </CardFooter>
    </template>
  </Card>
</template>
