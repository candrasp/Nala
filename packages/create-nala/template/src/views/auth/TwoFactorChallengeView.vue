<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Smartphone,
  AlertCircle,
  Loader2,
  Shield,
  Info,
} from '@lucide/vue'

const router = useRouter()

// Authentication state
const isRecoveryMode = ref(false)
const recoveryCode = ref('')
const digits = ref<string[]>(['', '', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])
const trustDevice = ref(true)
const isVerifying = ref(false)
const isVerified = ref(false)
const errorMessage = ref('')
const userEmail = ref('alex.morgan@example.com')

// Check if input is complete
const isCodeComplete = computed(() => {
  if (isRecoveryMode.value) {
    return recoveryCode.value.trim().length >= 8
  }
  return digits.value.every((d: string) => d.length === 1)
})

onMounted(() => {
  focusFirstInput()
})

const setInputRef = (el: unknown, index: number) => {
  if (el) {
    inputRefs.value[index] = el as HTMLInputElement
  }
}

const focusFirstInput = () => {
  setTimeout(() => {
    inputRefs.value[0]?.focus()
  }, 150)
}

const handleDigitInput = (index: number, event: Event) => {
  errorMessage.value = ''
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')

  digits.value[index] = value ? value.slice(-1) : ''

  // Auto-advance to next input
  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }

  // Auto-verify if all 6 digits are filled
  if (digits.value.every((d: string) => d.length === 1)) {
    handleVerify()
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

    if (numbers.length === 6) {
      handleVerify()
    }
  }
}

const handleVerify = () => {
  if (!isCodeComplete.value || isVerifying.value) return
  isVerifying.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isVerifying.value = false
    const enteredCode = isRecoveryMode.value ? recoveryCode.value.trim() : digits.value.join('')

    // Simulated test failure condition
    if (enteredCode === '000000') {
      errorMessage.value = 'Invalid verification code. Please check your authenticator app and try again.'
      toast.error('Authentication failed. Invalid code.')
      digits.value = ['', '', '', '', '', '']
      focusFirstInput()
    } else {
      isVerified.value = true
      toast.success('Two-factor authentication verified successfully!')
    }
  }, 1000)
}

const toggleRecoveryMode = () => {
  isRecoveryMode.value = !isRecoveryMode.value
  errorMessage.value = ''
  if (!isRecoveryMode.value) {
    digits.value = ['', '', '', '', '', '']
    focusFirstInput()
  }
}

const handleProceed = () => {
  router.push('/')
}
</script>

<template>
  <Card flush class="w-full max-w-md shadow-xl border-border/80 bg-card">
    <!-- Success State -->
    <template v-if="isVerified">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Identity verified</CardTitle>
        <CardDescription class="text-sm">
          Two-factor authentication verified successfully. Welcome back to your account!
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-8 space-y-4">
        <div class="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-muted-foreground">
          <div class="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400 mb-1">
            <Shield class="h-4 w-4" />
            Device Trusted Session
          </div>
          {{ trustDevice ? 'This device has been marked as trusted for 30 days.' : 'Single session verified.' }}
        </div>

        <Button class="w-full font-medium cursor-pointer" @click="handleProceed">
          <span class="flex items-center justify-center gap-2">
            Continue to Dashboard
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>
      </CardContent>
    </template>

    <!-- Challenge State -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <component :is="isRecoveryMode ? KeyRound : ShieldCheck" class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">
          {{ isRecoveryMode ? 'Emergency Recovery Code' : 'Two-Factor Challenge' }}
        </CardTitle>
        <CardDescription class="text-sm">
          <template v-if="isRecoveryMode">
            Enter one of your 8-character backup codes saved during 2FA setup.
          </template>
          <template v-else>
            Enter the 6-digit security code generated by your authenticator app for
            <span class="font-medium text-foreground">{{ userEmail }}</span>.
          </template>
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-5">
        <!-- Error Alert Banner -->
        <Alert v-if="errorMessage" variant="destructive" class="py-2.5 px-3.5">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription class="text-xs font-medium ml-2">
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <!-- Standard TOTP Mode (6 Segments) -->
        <div v-if="!isRecoveryMode" class="space-y-4">
          <div class="flex items-center justify-between">
            <Label class="text-xs font-medium text-muted-foreground">Authenticator Code</Label>
            <span class="text-[11px] text-muted-foreground flex items-center gap-1">
              <Smartphone class="h-3 w-3" />
              TOTP App
            </span>
          </div>

          <div class="flex justify-between items-center gap-2">
            <input
              v-for="(_, index) in digits"
              :key="index"
              :ref="(el) => setInputRef(el, index)"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="1"
              :value="digits[index]"
              :disabled="isVerifying"
              class="h-12 w-11 sm:w-12 text-center text-xl font-bold rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
              @input="handleDigitInput(index, $event)"
              @keydown="handleKeyDown(index, $event)"
              @paste="handlePaste"
            />
          </div>

          <!-- Trust Device Option -->
          <div class="flex items-center space-x-2 pt-1">
            <Checkbox id="trust-device" v-model="trustDevice" />
            <label
              for="trust-device"
              class="text-xs font-medium leading-none cursor-pointer text-muted-foreground select-none hover:text-foreground transition-colors"
            >
              Don't ask for codes on this device for 30 days
            </label>
          </div>
        </div>

        <!-- Backup Recovery Code Mode -->
        <div v-else class="space-y-3">
          <div class="space-y-1.5">
            <Label for="recovery-code" class="text-xs font-medium">Backup Recovery Code</Label>
            <Input
              id="recovery-code"
              v-model="recoveryCode"
              placeholder="e.g. NALA-2026-AUTH"
              class="font-mono text-center tracking-wider uppercase h-11"
              maxlength="20"
              :disabled="isVerifying"
              @keyup.enter="handleVerify"
            />
          </div>
          <p class="text-[11px] text-muted-foreground text-center">
            Each backup recovery code can only be used once.
          </p>
        </div>

        <!-- Submit Button -->
        <Button
          class="w-full font-medium h-10 cursor-pointer"
          :disabled="!isCodeComplete || isVerifying"
          @click="handleVerify"
        >
          <Loader2 v-if="isVerifying" class="h-4 w-4 animate-spin mr-2" />
          <span v-else class="flex items-center justify-center gap-1.5">
            {{ isRecoveryMode ? 'Verify Recovery Code' : 'Verify & Continue' }}
            <ArrowRight class="h-3.5 w-3.5" />
          </span>
        </Button>

        <!-- Mode Switcher Trigger -->
        <div class="pt-2 text-center">
          <button
            type="button"
            class="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1.5 cursor-pointer"
            @click="toggleRecoveryMode"
          >
            <component :is="isRecoveryMode ? Smartphone : KeyRound" class="h-3.5 w-3.5" />
            {{ isRecoveryMode ? 'Use 6-digit authenticator code instead' : "Lost phone? Use a backup recovery code" }}
          </button>
        </div>

        <!-- Demo Hint Box -->
        <div class="rounded-lg border border-border/60 bg-muted/30 p-3 text-[11px] text-muted-foreground space-y-1">
          <div class="flex items-center gap-1.5 font-medium text-foreground">
            <Info class="h-3.5 w-3.5 text-primary" />
            <span>Demo Instructions</span>
          </div>
          <p>
            Enter any 6 digits (e.g. <span class="font-mono font-semibold text-foreground">123456</span>) to succeed, or <span class="font-mono font-semibold text-destructive">000000</span> to test invalid code state.
          </p>
        </div>
      </CardContent>

      <CardFooter class="flex justify-center border-t border-border/60 py-4 bg-muted/10">
        <router-link
          to="/auth/login"
          class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          Return to sign in
        </router-link>
      </CardFooter>
    </template>
  </Card>
</template>
