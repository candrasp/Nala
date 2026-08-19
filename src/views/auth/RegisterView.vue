<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
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
import { Eye, EyeOff, Check, X, Lock, Mail, ShieldCheck, ArrowRight } from '@lucide/vue'

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)

// Zod Schema with modern password security requirements
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    email: '',
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
  // Simulating registration action
  setTimeout(() => {
    isSubmitting.value = false
    router.push('/auth/login')
  }, 1000)
})
</script>

<template>
  <Card flush class="w-full max-w-md shadow-xl border-border/80 bg-card">
    <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
      <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ShieldCheck class="h-6 w-6" />
      </div>
      <CardTitle class="text-2xl font-bold tracking-tight">Create an account</CardTitle>
      <CardDescription class="text-sm">
        Enter your email and create a secure password to register
      </CardDescription>
    </CardHeader>

    <CardContent class="px-6 sm:px-8 pb-6">
      <form @submit.prevent="onSubmit" class="space-y-4" novalidate>
        <!-- Email Field -->
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="space-y-1.5">
            <FormLabel class="text-xs font-semibold">Email address</FormLabel>
            <FormControl>
              <InputGroup>
                <InputIcon>
                  <Mail />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  autocomplete="email"
                  class="pl-9"
                  v-bind="componentField"
                />
              </InputGroup>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <!-- Password Field -->
        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="space-y-1.5">
            <FormLabel class="text-xs font-semibold">Password</FormLabel>
            <FormControl>
              <InputGroup>
                <InputIcon>
                  <Lock />
                </InputIcon>
                <Input
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
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
              </InputGroup>
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
            <FormLabel class="text-xs font-semibold">Confirm Password</FormLabel>
            <FormControl>
              <InputGroup>
                <InputIcon>
                  <Lock />
                </InputIcon>
                <Input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Repeat your password"
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
              </InputGroup>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <Button type="submit" class="w-full mt-2 font-medium cursor-pointer" :disabled="isSubmitting">
          <span v-if="isSubmitting">Creating account...</span>
          <span v-else class="flex items-center justify-center gap-2">
            Create Account
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>
      </form>
    </CardContent>

    <CardFooter class="border-t border-border/60 bg-muted/30 px-6 py-4 flex flex-col items-center justify-center text-center">
      <p class="text-xs text-muted-foreground">
        Already have an account?
        <router-link
          to="/auth/login"
          class="font-medium text-primary hover:underline transition-colors ml-1"
        >
          Sign in
        </router-link>
      </p>
    </CardFooter>
  </Card>
</template>
