<script setup lang="ts">
import { ref } from 'vue'
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
import { Mail, KeyRound, ArrowLeft, CheckCircle2, RotateCw } from '@lucide/vue'

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submittedEmail = ref('')

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
})

const form = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: '',
  },
})

const onSubmit = form.handleSubmit((values) => {
  isSubmitting.value = true
  submittedEmail.value = values.email

  // Simulate API request to send reset link
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
  }, 1000)
})

const handleResend = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
  }, 800)
}
</script>

<template>
  <Card class="w-full max-w-md shadow-xl border-border/80 bg-card overflow-hidden py-0 gap-0">
    <!-- Success State -->
    <template v-if="isSubmitted">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Check your email</CardTitle>
        <CardDescription class="text-sm">
          We have sent a password reset link to
          <span class="font-medium text-foreground block mt-1">{{ submittedEmail }}</span>
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-4">
        <p class="text-xs text-center text-muted-foreground leading-relaxed">
          Please check your inbox and spam folder. If you don't receive an email within a few minutes, you can request a new link.
        </p>

        <Button
          type="button"
          variant="outline"
          class="w-full gap-2 cursor-pointer"
          :disabled="isSubmitting"
          @click="handleResend"
        >
          <RotateCw class="h-4 w-4" :class="{ 'animate-spin': isSubmitting }" />
          {{ isSubmitting ? 'Resending...' : 'Click to resend' }}
        </Button>
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

    <!-- Request Form State -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <KeyRound class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Forgot password?</CardTitle>
        <CardDescription class="text-sm">
          No worries, enter your registered email and we'll send you reset instructions.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6">
        <form @submit.prevent="onSubmit" class="space-y-4" novalidate>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="space-y-1.5">
              <FormLabel class="text-xs font-semibold">Email address</FormLabel>
              <FormControl>
                <div class="relative">
                  <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    autocomplete="email"
                    class="pl-9"
                    v-bind="componentField"
                  />
                </div>
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full mt-2 font-medium cursor-pointer" :disabled="isSubmitting">
            <span v-if="isSubmitting">Sending reset link...</span>
            <span v-else>Send Reset Link</span>
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
