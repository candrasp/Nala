<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ShieldAlert, ArrowLeft, Home, HelpCircle } from '@lucide/vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center sm:p-8">
    <div class="w-full max-w-md space-y-6">
      <!-- Icon & Status Badge -->
      <div class="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 text-destructive ring-8 ring-destructive/5">
        <ShieldAlert class="h-12 w-12" />
        <span class="absolute -bottom-2.5 rounded-full bg-destructive px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-destructive-foreground uppercase shadow-xs">
          403 Error
        </span>
      </div>

      <!-- Main Copy -->
      <div class="space-y-2">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Access Denied
        </h1>
        <p class="text-sm text-muted-foreground leading-relaxed">
          You don't have permission to access this page or resource. If you believe this is an error, please contact your administrator.
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

      <!-- Help / Support Hint -->
      <div class="pt-6 border-t border-border/60">
        <div class="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <HelpCircle class="h-3.5 w-3.5" />
          <span>Need elevated permissions?</span>
          <router-link to="/settings" class="font-medium text-primary hover:underline transition-colors">
            Contact Support
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
