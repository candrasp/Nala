<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ArrowRight,
  UserCheck,
  Sparkles,
} from '@lucide/vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import AppLogo from '@/components/AppLogo.vue'
import { toast } from '@/components/ui/sonner'

const router = useRouter()

const password = ref('')
const showPassword = ref(false)
const isUnlocking = ref(false)
const lockedAt = ref('')

// Mock Locked User Profile
const userProfile = {
  name: 'Alex Morgan',
  role: 'Lead Administrator',
  email: 'alex.morgan@nala.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  initials: 'AM',
}

onMounted(() => {
  const now = new Date()
  lockedAt.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

async function handleUnlock() {
  if (!password.value) {
    toast.error('Please enter your password to unlock the session.')
    return
  }

  isUnlocking.value = true

  // Simulate verification delay
  setTimeout(() => {
    isUnlocking.value = false
    toast.success(`Welcome back, ${userProfile.name}! Session unlocked.`)
    router.push('/')
  }, 650)
}

function fillDemoPassword() {
  password.value = 'password123'
  toast.info('Demo password autofilled. Click Unlock to proceed.')
}
</script>

<template>
  <div class="w-full max-w-md space-y-6">
    <!-- Brand Logo Header -->
    <div class="flex flex-col items-center justify-center text-center pb-1">
      <router-link
        to="/"
        class="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        aria-label="Nala Home"
      >
        <AppLogo class="h-10 w-10" withBackground withText textClass="text-2xl font-bold tracking-tight" />
      </router-link>
    </div>

    <!-- Lock Screen Card -->
    <Card class="border-border/80 shadow-lg bg-card/95 backdrop-blur-xs relative overflow-hidden">
      <!-- Glow Accent Line -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/50 via-primary to-primary/50" />

      <CardHeader class="pb-4 text-center">
        <!-- Avatar with Lock Pip -->
        <div class="relative mx-auto mb-2">
          <Avatar class="h-20 w-20 border-2 border-primary/40 ring-4 ring-primary/10 shadow-md">
            <AvatarImage :src="userProfile.avatar" :alt="userProfile.name" />
            <AvatarFallback class="bg-primary/10 text-primary text-lg font-bold">
              {{ userProfile.initials }}
            </AvatarFallback>
          </Avatar>
          <div
            class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-background"
            title="Session Locked"
          >
            <Lock class="h-3.5 w-3.5" />
          </div>
        </div>

        <CardTitle class="text-xl font-bold tracking-tight text-foreground">
          {{ userProfile.name }}
        </CardTitle>
        <CardDescription class="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
          <Badge variant="secondary" shape="pill" class="text-[10px] py-0 px-2 font-medium">
            {{ userProfile.role }}
          </Badge>
          <span>•</span>
          <span>Locked at {{ lockedAt || 'just now' }}</span>
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <form @submit.prevent="handleUnlock" class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="unlock-password" class="text-xs font-medium text-foreground">
                Password
              </Label>
              <button
                type="button"
                class="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-1"
                @click="fillDemoPassword"
              >
                <Sparkles class="h-3 w-3" />
                <span>Auto-fill Demo</span>
              </button>
            </div>

            <div class="relative">
              <Input
                id="unlock-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter password to unlock"
                class="h-10 text-sm pr-10 bg-background"
                autofocus
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button
            type="submit"
            class="w-full h-10 gap-2 font-medium cursor-pointer shadow-xs"
            :disabled="isUnlocking"
          >
            <component :is="isUnlocking ? Unlock : Lock" class="h-4 w-4" :class="{ 'animate-bounce': isUnlocking }" />
            <span>{{ isUnlocking ? 'Unlocking Session...' : 'Unlock Dashboard' }}</span>
            <ArrowRight v-if="!isUnlocking" class="h-3.5 w-3.5" />
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex flex-col items-center justify-center border-t border-border/50 py-4 bg-muted/20 text-xs text-muted-foreground">
        <div class="flex items-center gap-1.5">
          <span>Not {{ userProfile.name }}?</span>
          <router-link
            to="/auth/login"
            class="font-semibold text-primary hover:underline transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <UserCheck class="h-3.5 w-3.5" />
            <span>Switch Account</span>
          </router-link>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
