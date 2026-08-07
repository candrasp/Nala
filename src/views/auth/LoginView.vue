<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  <Card class="w-full max-w-md shadow-lg">
    <CardHeader class="space-y-1 text-center">
      <CardTitle class="text-2xl font-bold">Sign in</CardTitle>
      <CardDescription>Enter your credentials to access Nala Admin panel</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="admin@example.com" required />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">Sign In</Button>
      </form>
    </CardContent>
  </Card>
</template>
