<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogin() {
  router.push('/')
}
</script>

<template>
  <Card class="w-full max-w-md shadow-xl border-border/80 bg-card overflow-hidden py-0 gap-0">
    <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
      <CardTitle class="text-2xl font-bold tracking-tight">Sign in</CardTitle>
      <CardDescription class="text-sm">Enter your credentials to access Nala Admin panel</CardDescription>
    </CardHeader>
    <CardContent class="px-6 sm:px-8 pb-6">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="admin@example.com" required />
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <router-link
              to="/auth/forgot-password"
              class="text-xs font-medium text-primary hover:underline transition-colors"
            >
              Forgot password?
            </router-link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full font-medium cursor-pointer">Sign In</Button>
      </form>
    </CardContent>
    <CardFooter class="border-t border-border/60 bg-muted/30 px-6 py-4 flex flex-col items-center justify-center text-center">
      <p class="text-xs text-muted-foreground">
        Don't have an account?
        <router-link
          to="/auth/register"
          class="font-medium text-primary hover:underline transition-colors ml-1"
        >
          Sign up
        </router-link>
      </p>
    </CardFooter>
  </Card>
</template>
