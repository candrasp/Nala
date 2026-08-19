<script setup lang="ts">
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

// ─── Code Documentation Snippets ─────────────────────────────────────────────
const semanticBadgesSnippet = `<!-- Standard Primitive Badge Variants -->
<Badge>Default Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

<!-- Semantic Tint Variants via CVA (shape="pill" for rounded-full) -->
<Badge variant="success" shape="pill">Success</Badge>
<Badge variant="info"    shape="pill">Info</Badge>
<Badge variant="warning" shape="pill">Warning</Badge>`

const statusBadgesSnippet = `<!-- Live Status Indicator Badges (dot + pulse props) -->
<Badge variant="success" shape="pill" dot pulse>Operational</Badge>
<Badge variant="warning" shape="pill" dot>High Latency</Badge>
<Badge variant="destructive" shape="pill" dot>Outage</Badge>
<Badge variant="outline"  shape="pill" dot>Maintenance</Badge>`

const iconPillsSnippet = `<!-- Badges Decorated with Icons -->
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
</Badge>`

const interactiveTagsSnippet = `<!-- Removable Interactive Tags -->
<span
  v-for="(tag, idx) in tags"
  :key="tag"
  class="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:bg-muted"
>
  <span>{{ tag }}</span>
  <button @click="removeTag(idx)" class="text-muted-foreground hover:text-destructive cursor-pointer">
    <X class="h-3 w-3" />
  </button>
</span>`

const avatarSizesSnippet = `<!-- Avatar Hierarchy Scale -->
<Avatar class="h-6 w-6 text-[10px]">
  <AvatarFallback class="bg-primary/10 text-primary">XS</AvatarFallback>
</Avatar>

<Avatar class="h-8 w-8 text-xs">
  <AvatarFallback class="bg-blue-500/10 text-blue-600 dark:text-blue-400">SM</AvatarFallback>
</Avatar>

<Avatar class="h-10 w-10 text-sm">
  <AvatarFallback class="bg-violet-500/10 text-violet-600 dark:text-violet-400">MD</AvatarFallback>
</Avatar>

<Avatar class="h-12 w-12 text-base">
  <AvatarFallback class="bg-amber-500/10 text-amber-600 dark:text-amber-400">LG</AvatarFallback>
</Avatar>

<Avatar class="h-16 w-16 text-lg font-bold">
  <AvatarFallback class="bg-primary/10 text-primary">XL</AvatarFallback>
</Avatar>`

const avatarPresenceSnippet = `<!-- Avatars with status prop — presence pip is built-in -->
<Avatar class="h-12 w-12 border" status="online">
  <AvatarFallback class="bg-muted font-semibold text-foreground">OM</AvatarFallback>
</Avatar>

<Avatar class="h-12 w-12 border" status="busy">
  <AvatarFallback class="bg-muted font-semibold text-foreground">JL</AvatarFallback>
</Avatar>

<Avatar class="h-12 w-12 border" status="away">
  <AvatarFallback class="bg-muted font-semibold text-foreground">ER</AvatarFallback>
</Avatar>

<Avatar class="h-12 w-12 border" status="offline">
  <AvatarFallback class="bg-muted font-semibold text-foreground">WK</AvatarFallback>
</Avatar>`

const avatarStackSnippet = `<!-- AvatarGroup: max prop clips to N avatars + overflow chip -->
<AvatarGroup :max="4" :overlap="3">
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-emerald-500/10 text-emerald-600 font-semibold text-xs">OM</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-blue-500/10 text-blue-600 font-semibold text-xs">JL</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-violet-500/10 text-violet-600 font-semibold text-xs">IN</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-amber-500/10 text-amber-600 font-semibold text-xs">SD</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-rose-500/10 text-rose-600 font-semibold text-xs">PK</AvatarFallback>
  </Avatar>
  <Avatar class="h-10 w-10 border-2 border-background">
    <AvatarFallback class="bg-teal-500/10 text-teal-600 font-semibold text-xs">YR</AvatarFallback>
  </Avatar>
</AvatarGroup>`
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Badges & Avatars"
      description="Compact visual indicators, status badges, counter pills, and user profile avatars with copy-ready code snippets."
      badge="UI Component"
    />

    <!-- 1. Semantic Variants -->
    <CodePreview
      title="Semantic Badges"
      description="Standard UI primitive badge variants plus CVA-powered semantic tint variants with pill shape support."
      :code="semanticBadgesSnippet"
    >
      <div class="flex flex-wrap gap-2.5 items-center">
        <Badge>Default Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success" shape="pill">Success</Badge>
        <Badge variant="info"    shape="pill">Info</Badge>
        <Badge variant="warning" shape="pill">Warning</Badge>
      </div>
    </CodePreview>

    <!-- 2. Status Dot Indicators -->
    <CodePreview
      title="Live Status Indicators"
      description="Contextual badges with integrated real-time state dots using the dot + pulse props."
      :code="statusBadgesSnippet"
    >
      <div class="flex flex-wrap gap-3 items-center">
        <Badge variant="success"     shape="pill" dot pulse>Operational</Badge>
        <Badge variant="warning"     shape="pill" dot>High Latency</Badge>
        <Badge variant="destructive" shape="pill" dot>Outage</Badge>
        <Badge variant="outline"     shape="pill" dot>Maintenance</Badge>
      </div>
    </CodePreview>

    <!-- 3. Icon & Feature Pills -->
    <CodePreview
      title="Icon & Feature Pills"
      description="Badges decorated with Lucide iconography for telemetry, feature tiers, and security scopes."
      :code="iconPillsSnippet"
    >
      <div class="flex flex-wrap gap-2.5 items-center">
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
      </div>
    </CodePreview>

    <!-- 4. Dismissible & Removable Tags -->
    <CodePreview
      title="Interactive Removable Tags"
      description="Removable tag badges with dismiss actions and add triggers."
      :code="interactiveTagsSnippet"
    >
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="h-7 text-xs gap-1" @click="addTag">
            <Plus class="h-3 w-3" />
            Add Tag
          </Button>
        </div>
        <div class="flex flex-wrap gap-2 items-center min-h-10">
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
        </div>
      </div>
    </CodePreview>

    <!-- 5. Avatar Size Scale -->
    <CodePreview
      title="Avatar Size Scale"
      description="Hierarchy of avatar dimensions from inline compact (24px) to hero profile (64px)."
      :code="avatarSizesSnippet"
    >
      <div class="flex items-end gap-4 flex-wrap">
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
      </div>
    </CodePreview>

    <!-- 6. Presence Status Dots -->
    <CodePreview
      title="Avatars with Presence Indicators"
      description="Built-in status prop renders presence pip automatically — no manual absolute wrappers needed."
      :code="avatarPresenceSnippet"
    >
      <div class="flex items-center gap-6 flex-wrap">
        <div class="flex flex-col items-center gap-2">
          <Avatar class="h-12 w-12 border" status="online">
            <AvatarFallback class="bg-muted font-semibold text-foreground">OM</AvatarFallback>
          </Avatar>
          <span class="text-[10px] label-mono text-muted-foreground">online</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Avatar class="h-12 w-12 border" status="busy">
            <AvatarFallback class="bg-muted font-semibold text-foreground">JL</AvatarFallback>
          </Avatar>
          <span class="text-[10px] label-mono text-muted-foreground">busy</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Avatar class="h-12 w-12 border" status="away">
            <AvatarFallback class="bg-muted font-semibold text-foreground">ER</AvatarFallback>
          </Avatar>
          <span class="text-[10px] label-mono text-muted-foreground">away</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <Avatar class="h-12 w-12 border" status="offline">
            <AvatarFallback class="bg-muted font-semibold text-foreground">WK</AvatarFallback>
          </Avatar>
          <span class="text-[10px] label-mono text-muted-foreground">offline</span>
        </div>
      </div>
    </CodePreview>

    <!-- 7. Avatar Stack / Group Overlap -->
    <CodePreview
      title="Avatar Group Stack"
      description="AvatarGroup component with max prop, automatic overflow chip, and configurable overlap."
      :code="avatarStackSnippet"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-lg border border-border bg-muted/10">
        <AvatarGroup :max="4" :overlap="3">
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-emerald-500/10 text-emerald-600 font-semibold text-xs">OM</AvatarFallback>
          </Avatar>
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-blue-500/10 text-blue-600 font-semibold text-xs">JL</AvatarFallback>
          </Avatar>
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-violet-500/10 text-violet-600 font-semibold text-xs">IN</AvatarFallback>
          </Avatar>
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-amber-500/10 text-amber-600 font-semibold text-xs">SD</AvatarFallback>
          </Avatar>
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-rose-500/10 text-rose-600 font-semibold text-xs">PK</AvatarFallback>
          </Avatar>
          <Avatar class="h-10 w-10 border-2 border-background">
            <AvatarFallback class="bg-teal-500/10 text-teal-600 font-semibold text-xs">YR</AvatarFallback>
          </Avatar>
        </AvatarGroup>

        <div class="text-xs text-muted-foreground">
          <span class="font-medium text-foreground">6 team contributors</span> active in this repository branch
        </div>
      </div>
    </CodePreview>
  </div>
</template>
