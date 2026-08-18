<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  ShieldCheck,
  Database,
  Lock,
  X,
  Plus,
} from '@lucide/vue'

const tags = ref(['Vue 3', 'Tailwind v4', 'TypeScript', 'Supabase', 'Vite'])

function removeTag(index: number) {
  tags.value.splice(index, 1)
}

function addTag() {
  const newTech = ['PostgreSQL', 'Pinia', 'Reka UI', 'Zod'][Math.floor(Math.random() * 4)]
  if (!tags.value.includes(newTech)) {
    tags.value.push(newTech)
  }
}
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="label-mono">Component Showcase</span>
          <span class="status-dot"></span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground mt-1">Badges &amp; Avatars</h1>
        <p class="text-sm text-muted-foreground">
          Compact visual indicators, status badges, counter pills, and user profile avatars.
        </p>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- SECTION 1: BADGES & STATUS PILLS                                      -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">

      <!-- 1. Semantic Variants -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Semantic Badges</CardTitle>
          <CardDescription class="text-xs">Standard UI primitive badge variants for category tags and indicators.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex flex-wrap gap-2.5 items-center">
          <Badge>Default Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <span class="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
            Brand Emerald
          </span>
          <span class="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Info Blue
          </span>
          <span class="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            Warning Amber
          </span>
        </CardContent>
      </Card>

      <!-- 2. Status Dot Indicators -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Live Status Indicators</CardTitle>
          <CardDescription class="text-xs">Contextual badges with integrated real-time state dots.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex flex-wrap gap-3 items-center">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Operational
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            High Latency
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
            <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            Outage
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            <span class="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
            Maintenance
          </span>
        </CardContent>
      </Card>

      <!-- 3. Icon & Feature Pills -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Icon &amp; Feature Pills</CardTitle>
          <CardDescription class="text-xs">Badges decorated with Lucide iconography for telemetry and security.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex flex-wrap gap-2.5 items-center">
          <Badge variant="outline" class="gap-1.5 py-1">
            <ShieldCheck class="h-3.5 w-3.5 text-primary" />
            2FA Protected
          </Badge>
          <Badge variant="outline" class="gap-1.5 py-1">
            <Database class="h-3.5 w-3.5 text-blue-500" />
            PostgreSQL 16.3
          </Badge>
          <Badge variant="outline" class="gap-1.5 py-1">
            <Sparkles class="h-3.5 w-3.5 text-amber-500" />
            Enterprise Tier
          </Badge>
          <Badge variant="outline" class="gap-1.5 py-1">
            <Lock class="h-3.5 w-3.5 text-emerald-500" />
            End-to-End Encrypted
          </Badge>
        </CardContent>
      </Card>

      <!-- 4. Dismissible & Removable Tags -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-semibold">Interactive Tags</CardTitle>
            <CardDescription class="text-xs">Removable tag badges with close actions.</CardDescription>
          </div>
          <Button variant="outline" size="sm" class="h-7 text-xs gap-1" @click="addTag">
            <Plus class="h-3 w-3" />
            Add Tag
          </Button>
        </CardHeader>
        <CardContent class="p-6 flex flex-wrap gap-2 items-center min-h-20">
          <span
            v-for="(tag, idx) in tags"
            :key="tag"
            class="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:bg-muted"
          >
            <span>{{ tag }}</span>
            <button
              @click="removeTag(idx)"
              class="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              aria-label="Remove tag"
            >
              <X class="h-3 w-3" />
            </button>
          </span>
          <span v-if="tags.length === 0" class="text-xs text-muted-foreground">
            No tags remaining. Click "Add Tag" to insert more.
          </span>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- SECTION 2: AVATARS & PRESENCE                                         -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">

      <!-- 1. Size Scale -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Avatar Size Scale</CardTitle>
          <CardDescription class="text-xs">Hierarchy of avatar dimensions from inline compact to hero profile.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex items-end gap-4 flex-wrap">
          <div class="flex flex-col items-center gap-1.5">
            <Avatar class="h-6 w-6 text-[10px]">
              <AvatarFallback class="bg-primary/10 text-primary">XS</AvatarFallback>
            </Avatar>
            <span class="label-mono text-[10px]">24px</span>
          </div>

          <div class="flex flex-col items-center gap-1.5">
            <Avatar class="h-8 w-8 text-xs">
              <AvatarFallback class="bg-blue-500/10 text-blue-600 dark:text-blue-400">SM</AvatarFallback>
            </Avatar>
            <span class="label-mono text-[10px]">32px</span>
          </div>

          <div class="flex flex-col items-center gap-1.5">
            <Avatar class="h-10 w-10 text-sm">
              <AvatarFallback class="bg-violet-500/10 text-violet-600 dark:text-violet-400">MD</AvatarFallback>
            </Avatar>
            <span class="label-mono text-[10px]">40px</span>
          </div>

          <div class="flex flex-col items-center gap-1.5">
            <Avatar class="h-12 w-12 text-base">
              <AvatarFallback class="bg-amber-500/10 text-amber-600 dark:text-amber-400">LG</AvatarFallback>
            </Avatar>
            <span class="label-mono text-[10px]">48px</span>
          </div>

          <div class="flex flex-col items-center gap-1.5">
            <Avatar class="h-16 w-16 text-lg font-bold">
              <AvatarFallback class="bg-primary/10 text-primary">XL</AvatarFallback>
            </Avatar>
            <span class="label-mono text-[10px]">64px</span>
          </div>
        </CardContent>
      </Card>

      <!-- 2. Presence Status Dots -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Avatars with Presence Indicators</CardTitle>
          <CardDescription class="text-xs">Avatars displaying online, busy, away, and offline presence status.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex items-center gap-6 flex-wrap">
          <!-- Online -->
          <div class="relative">
            <Avatar class="h-12 w-12 border">
              <AvatarFallback class="bg-muted font-semibold text-foreground">OM</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background" title="Online"></span>
          </div>

          <!-- Busy / In Call -->
          <div class="relative">
            <Avatar class="h-12 w-12 border">
              <AvatarFallback class="bg-muted font-semibold text-foreground">JL</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background" title="Do Not Disturb"></span>
          </div>

          <!-- Away -->
          <div class="relative">
            <Avatar class="h-12 w-12 border">
              <AvatarFallback class="bg-muted font-semibold text-foreground">ER</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-background" title="Away"></span>
          </div>

          <!-- Offline -->
          <div class="relative">
            <Avatar class="h-12 w-12 border">
              <AvatarFallback class="bg-muted font-semibold text-foreground">WK</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-muted-foreground/60 border-2 border-background" title="Offline"></span>
          </div>
        </CardContent>
      </Card>

      <!-- 3. Avatar Stack / Group Overlap -->
      <Card class="overflow-hidden py-0 gap-0 shadow-sm border lg:col-span-2">
        <CardHeader class="p-6 border-b border-border bg-muted/10">
          <CardTitle class="text-base font-semibold">Avatar Group Stack</CardTitle>
          <CardDescription class="text-xs">Stacked avatars for collaborating team members and database contributors.</CardDescription>
        </CardHeader>
        <CardContent class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="flex items-center">
            <div class="flex -space-x-3 overflow-hidden p-1">
              <Avatar class="inline-block h-10 w-10 border-2 border-background ring-1 ring-border">
                <AvatarFallback class="bg-emerald-500/10 text-emerald-600 font-semibold text-xs">OM</AvatarFallback>
              </Avatar>
              <Avatar class="inline-block h-10 w-10 border-2 border-background ring-1 ring-border">
                <AvatarFallback class="bg-blue-500/10 text-blue-600 font-semibold text-xs">JL</AvatarFallback>
              </Avatar>
              <Avatar class="inline-block h-10 w-10 border-2 border-background ring-1 ring-border">
                <AvatarFallback class="bg-violet-500/10 text-violet-600 font-semibold text-xs">IN</AvatarFallback>
              </Avatar>
              <Avatar class="inline-block h-10 w-10 border-2 border-background ring-1 ring-border">
                <AvatarFallback class="bg-amber-500/10 text-amber-600 font-semibold text-xs">SD</AvatarFallback>
              </Avatar>
              <Avatar class="inline-block h-10 w-10 border-2 border-background ring-1 ring-border">
                <AvatarFallback class="bg-muted text-muted-foreground font-semibold text-xs">+8</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div class="text-xs text-muted-foreground">
            <span class="font-medium text-foreground">12 team contributors</span> active in this repository branch
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
