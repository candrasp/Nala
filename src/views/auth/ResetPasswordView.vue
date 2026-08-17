<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Eye, EyeOff, Check, X, Lock, KeyRound, CheckCircle2, ArrowRight, ArrowLeft } from '@lucide/vue'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const isResetComplete = ref(false)

// Zod Schema with modern password security requirements
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const form = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

// Password criteria checks
const passwordValue = computed(() => form.values.password || '')

const criteria = computed(() => [
  {
    id: 'length',
    label: 'At least 8 characters',
    met: passwordValue.value.length >= 8,
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    met: /[a-z]/.test(passwordValue.value),
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    met: /[A-Z]/.test(passwordValue.value),
  },
  {
    id: 'number',
    label: 'One number (0-9)',
    met: /[0-9]/.test(passwordValue.value),
  },
  {
    id: 'special',
    label: 'One special character (!@#$%...)',
    met: /[^A-Za-z0-9]/.test(passwordValue.value),
  },
])

// Password strength calculation
const strengthScore = computed(() => {
  if (!passwordValue.value) return 0
  return criteria.value.filter((c) => c.met).length
})

const strengthConfig = computed(() => {
  const score = strengthScore.value
  if (score === 0) return { label: 'Empty', color: 'bg-muted', textClass: 'text-muted-foreground', percent: 0 }
  if (score <= 2) return { label: 'Weak', color: 'bg-destructive', textClass: 'text-destructive', percent: 25 }
  if (score === 3) return { label: 'Fair', color: 'bg-amber-500', textClass: 'text-amber-500', percent: 50 }
  if (score === 4) return { label: 'Good', color: 'bg-blue-500', textClass: 'text-blue-500', percent: 75 }
  return { label: 'Strong', color: 'bg-emerald-500', textClass: 'text-emerald-500', percent: 100 }
})

const onSubmit = form.handleSubmit(() => {
  isSubmitting.value = true
  // Simulating reset password request
  setTimeout(() => {
    isSubmitting.value = false
    isResetComplete.value = true
  }, 1000)
})
</script>

<template>
  <Card class="w-full max-w-md shadow-xl border-border/80 bg-card overflow-hidden py-0 gap-0">
    <!-- Success State -->
    <template v-if="isResetComplete">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Password reset successful</CardTitle>
        <CardDescription class="text-sm">
          Your password has been updated. You can now sign in with your new password.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-8">
        <Button as-child class="w-full font-medium cursor-pointer">
          <router-link to="/auth/login" class="flex items-center justify-center gap-2">
            Continue to Sign in
            <ArrowRight class="h-4 w-4" />
          </router-link>
        </Button>
      </CardContent>
    </template>

    <!-- Reset Form State -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <KeyRound class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Reset password</CardTitle>
        <CardDescription class="text-sm">
          Please enter and confirm your new secure password.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6">
        <form @submit.prevent="onSubmit" class="space-y-4" novalidate>
          <!-- New Password Field -->
          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="space-y-1.5">
              <FormLabel class="text-xs font-semibold">New Password</FormLabel>
              <FormControl>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter new password"
                    autocomplete="new-password"
                    class="pl-9 pr-10"
                    v-bind="componentField"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <EyeOff v-if="showPassword" class="h-4 w-4" />
                    <Eye v-else class="h-4 w-4" />
                  </button>
                </div>
              </FormControl>

              <!-- Password Strength Bar & Label -->
              <div v-if="passwordValue.length > 0" class="pt-1.5 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-muted-foreground">Password strength:</span>
                  <span :class="['font-semibold transition-colors', strengthConfig.textClass]">
                    {{ strengthConfig.label }}
                  </span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full transition-all duration-300 rounded-full"
                    :class="strengthConfig.color"
                    :style="{ width: `${strengthConfig.percent}%` }"
                  ></div>
                </div>

                <!-- Security Criteria Checklist -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div
                    v-for="item in criteria"
                    :key="item.id"
                    class="flex items-center gap-1.5 transition-colors"
                    :class="item.met ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-muted-foreground'"
                  >
                    <Check v-if="item.met" class="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <X v-else class="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                    <span>{{ item.label }}</span>
                  </div>
                </div>
              </div>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>

          <!-- Confirm Password Field -->
          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem class="space-y-1.5">
              <FormLabel class="text-xs font-semibold">Confirm New Password</FormLabel>
              <FormControl>
                <div class="relative">
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm new password"
                    autocomplete="new-password"
                    class="pl-9 pr-10"
                    v-bind="componentField"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                  >
                    <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                    <Eye v-else class="h-4 w-4" />
                  </button>
                </div>
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>

          <!-- Submit Button -->
          <Button type="submit" class="w-full mt-2 font-medium cursor-pointer" :disabled="isSubmitting">
            <span v-if="isSubmitting">Updating password...</span>
            <span v-else class="flex items-center justify-center gap-2">
              Reset Password
              <ArrowRight class="h-4 w-4" />
            </span>
          </Button>
        </form>
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
