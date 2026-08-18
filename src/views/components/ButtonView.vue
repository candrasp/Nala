<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Plus,
  Trash2,
  Download,
  Share2,
  Mail,
  Loader2,
  ArrowRight,
  Settings,
  Search,
  Bookmark,
  Heart,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Send,
  RefreshCw,
  ChevronDown,
  AlertTriangle,
  RotateCcw,
  Zap,
  ShieldCheck,
} from '@lucide/vue'

const isLoading = ref(false)
const isCopied = ref(false)
const liked = ref(false)
const selectedSegment = ref('day')

// Danger confirm pattern
type ConfirmStep = 'idle' | 'confirm' | 'deleted'
const confirmStep = ref<ConfirmStep>('idle')

function handleDangerConfirm() {
  if (confirmStep.value === 'idle') {
    confirmStep.value = 'confirm'
  } else if (confirmStep.value === 'confirm') {
    confirmStep.value = 'deleted'
    setTimeout(() => { confirmStep.value = 'idle' }, 2500)
  }
}

function cancelDanger() {
  confirmStep.value = 'idle'
}

function triggerLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

function handleCopy() {
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 max-w-[1920px] mx-auto pb-10">
    <!-- Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-foreground">Buttons</h2>
        <p class="text-sm text-muted-foreground">
          Comprehensive showcase of all button variants, sizes, icon placements, and interactive states.
        </p>
      </div>
      <div class="flex items-center gap-2 pt-2 sm:pt-0">
        <Button variant="outline" size="sm" @click="triggerLoading">
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': isLoading }" />
          Test Loading
        </Button>
        <Button size="sm" class="gap-1.5">
          <Sparkles class="h-3.5 w-3.5" />
          Primary Action
        </Button>
      </div>
    </div>

    <!-- 1. Variants Showcase -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Button Variants</CardTitle>
        <CardDescription>
          The 6 core design system variants styled with Supabase emerald green tokens and tactile borders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="default">
            Default (Primary)
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="destructive">
            Destructive
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
          <Button variant="link">
            Link Button
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- 1b. Outline Color Variants -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Outline Variants</CardTitle>
        <CardDescription>
          Outline buttons with semantic color intent — neutral, primary, success, warning, and destructive.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-5">
        <!-- Semantic row -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Semantic Color Outlines</div>
          <div class="flex flex-wrap items-center gap-3">
            <!-- Neutral (default outline) -->
            <Button variant="outline">
              Neutral
            </Button>
            <!-- Primary / Brand -->
            <Button variant="outline" class="text-primary border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-primary/40 dark:hover:bg-primary/10">
              <Zap class="h-4 w-4" />
              Primary
            </Button>
            <!-- Success / Emerald -->
            <Button variant="outline" class="text-emerald-600 border-emerald-500/40 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300">
              <ShieldCheck class="h-4 w-4" />
              Success
            </Button>
            <!-- Warning / Amber -->
            <Button variant="outline" class="text-amber-600 border-amber-500/40 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-400 dark:border-amber-500/40 dark:hover:bg-amber-500/10 dark:hover:text-amber-300">
              <AlertTriangle class="h-4 w-4" />
              Warning
            </Button>
            <!-- Destructive -->
            <Button variant="outline" class="text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/40">
              <Trash2 class="h-4 w-4" />
              Destructive
            </Button>
          </div>
        </div>

        <!-- Muted / Subtle row -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Muted & Subtle Variants</div>
          <div class="flex flex-wrap items-center gap-3">
            <Button variant="outline" class="text-muted-foreground hover:text-foreground">
              Muted
            </Button>
            <Button variant="outline" class="border-dashed text-muted-foreground hover:text-foreground hover:border-solid">
              <Plus class="h-4 w-4" />
              Dashed (Add)
            </Button>
            <Button variant="outline" class="border-dashed border-primary/50 text-primary hover:border-solid hover:bg-primary/5">
              <Plus class="h-4 w-4" />
              Dashed Primary
            </Button>
          </div>
        </div>

        <!-- Icon-only color outlines -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Icon-Only Outline</div>
          <div class="flex flex-wrap items-center gap-3">
            <Button size="icon" variant="outline" aria-label="Neutral">
              <Settings class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" class="text-primary border-primary/40 hover:bg-primary/5 hover:text-primary dark:border-primary/40" aria-label="Primary">
              <Zap class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" class="text-emerald-600 border-emerald-500/40 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-500/40 dark:hover:bg-emerald-500/10" aria-label="Success">
              <ShieldCheck class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" class="text-amber-600 border-amber-500/40 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-500/40 dark:hover:bg-amber-500/10" aria-label="Warning">
              <AlertTriangle class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" class="text-destructive border-destructive/30 hover:bg-destructive/5 dark:border-destructive/40" aria-label="Destructive">
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 2. Sizes Showcase -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Button Sizes</CardTitle>
        <CardDescription>
          Standardized scale sizes ranging from compact micro-actions to prominent large buttons.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Primary Variant
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small (xs)</Button>
            <Button size="sm">Small (sm)</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large (lg)</Button>
          </div>
        </div>

        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Secondary & Outline Variants
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="xs">Extra Small (xs)</Button>
            <Button variant="outline" size="sm">Small (sm)</Button>
            <Button variant="secondary" size="default">Default</Button>
            <Button variant="outline" size="lg">Large (lg)</Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 3. Icon Buttons & Placements -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Buttons with Icons</CardTitle>
        <CardDescription>
          Leading icons, trailing icons, and standalone square icon buttons.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Icon + Label
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Button>
              <Plus class="h-4 w-4" />
              Create Project
            </Button>
            <Button variant="secondary">
              <Download class="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline">
              <Mail class="h-4 w-4" />
              Send Invite
            </Button>
            <Button variant="destructive">
              <Trash2 class="h-4 w-4" />
              Delete Resource
            </Button>
            <Button variant="outline" class="group">
              Get Started
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Icon-Only Buttons (Square)
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <Button size="icon-xs" variant="outline" aria-label="Settings">
              <Settings class="h-3 w-3" />
            </Button>
            <Button size="icon-sm" variant="secondary" aria-label="Search">
              <Search class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Share">
              <Share2 class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="default" aria-label="Bookmark">
              <Bookmark class="h-4 w-4" />
            </Button>
            <Button size="icon-lg" variant="secondary" aria-label="External Link">
              <ExternalLink class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 4. Interactive & State Showcase -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Loading & Disabled States -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">States & Feedbacks</CardTitle>
          <CardDescription>
            Disabled states and dynamic asynchronous loading indicators.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <Button disabled>
              Disabled Primary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button variant="ghost" disabled>
              Disabled Ghost
            </Button>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <Button :disabled="isLoading" @click="triggerLoading">
              <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
              <Send v-else class="h-4 w-4" />
              {{ isLoading ? 'Submitting...' : 'Submit Form' }}
            </Button>

            <Button variant="outline" :disabled="isLoading" @click="triggerLoading">
              <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
              <span v-else>Save Changes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Interactive Micro-actions -->
      <Card class="shadow-sm">
        <CardHeader>
          <CardTitle class="text-base font-semibold">Interactive Micro-actions</CardTitle>
          <CardDescription>
            Clickable components with instant state transition feedback.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              class="gap-1.5"
              :class="isCopied ? 'text-primary border-primary/40' : ''"
              @click="handleCopy"
            >
              <Check v-if="isCopied" class="h-3.5 w-3.5 text-primary" />
              <Copy v-else class="h-3.5 w-3.5" />
              {{ isCopied ? 'Copied to Clipboard!' : 'Copy Code' }}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              class="gap-1.5"
              :class="liked ? 'text-red-500 hover:text-red-600 dark:text-red-400' : ''"
              @click="liked = !liked"
            >
              <Heart class="h-3.5 w-3.5" :class="liked ? 'fill-current' : ''" />
              {{ liked ? 'Favorited' : 'Add to Favorites' }}
            </Button>
          </div>

          <!-- Segmented Button Group -->
          <div class="pt-2">
            <div class="text-xs font-semibold text-muted-foreground mb-2">Segmented Control</div>
            <div class="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                v-for="seg in ['day', 'week', 'month', 'year']"
                :key="seg"
                @click="selectedSegment = seg"
                class="rounded-md px-3 py-1 text-xs font-medium capitalize transition-all cursor-pointer"
                :class="selectedSegment === seg ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
              >
                {{ seg }}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 5. Button Group -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Button Groups</CardTitle>
        <CardDescription>
          Grouped buttons with collapsed borders for toolbars, pagination controls, and split actions.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Standard Group -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Toolbar Group</div>
          <div class="inline-flex rounded-md shadow-xs" role="group">
            <Button variant="outline" class="rounded-r-none border-r-0">Day</Button>
            <Button variant="outline" class="rounded-none border-r-0">Week</Button>
            <Button variant="outline" class="rounded-none border-r-0">Month</Button>
            <Button variant="outline" class="rounded-l-none">Year</Button>
          </div>
        </div>

        <!-- Split Button -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Split Action Button</div>
          <div class="inline-flex rounded-md shadow-xs" role="group">
            <Button class="rounded-r-none border-r-0 border-r-emerald-700/40">
              <Plus class="h-4 w-4" />
              Create Project
            </Button>
            <Button class="rounded-l-none px-2.5 border-l border-l-emerald-700/40" aria-label="More options">
              <ChevronDown class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Mixed Variant Group -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Mixed Variant Group</div>
          <div class="inline-flex rounded-md shadow-xs" role="group">
            <Button variant="secondary" class="rounded-r-none border-r-0">
              <Download class="h-4 w-4" />
              Export
            </Button>
            <Button variant="secondary" class="rounded-none border-r-0">
              <Share2 class="h-4 w-4" />
              Share
            </Button>
            <Button variant="destructive" class="rounded-l-none">
              <Trash2 class="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 6. Full-Width Buttons -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Full-Width Buttons</CardTitle>
        <CardDescription>
          Block-level buttons spanning the full container width — common in forms, dialogs, and mobile layouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="max-w-sm space-y-3">
          <Button class="w-full">
            <Send class="h-4 w-4" />
            Submit Form
          </Button>
          <Button variant="outline" class="w-full">
            <Download class="h-4 w-4" />
            Download Report
          </Button>
          <Button variant="secondary" class="w-full">
            <RotateCcw class="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button variant="destructive" class="w-full">
            <Trash2 class="h-4 w-4" />
            Delete Account
          </Button>
          <Button variant="ghost" class="w-full">Cancel</Button>
        </div>
      </CardContent>
    </Card>

    <!-- 7. Danger Confirm Pattern -->
    <Card class="shadow-sm">
      <CardHeader>
        <CardTitle class="text-base font-semibold">Danger Confirm Pattern</CardTitle>
        <CardDescription>
          Two-step confirmation for destructive actions — prevents accidental data loss.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <!-- Inline confirm -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Inline Two-Step</div>
          <div class="flex items-center gap-3 flex-wrap">
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
              mode="out-in"
            >
              <!-- Deleted state -->
              <div v-if="confirmStep === 'deleted'" class="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check class="h-4 w-4 text-emerald-500" />
                Record deleted.
              </div>

              <!-- Confirm state -->
              <div v-else-if="confirmStep === 'confirm'" class="flex items-center gap-2 flex-wrap">
                <div class="flex items-center gap-1.5 text-sm text-destructive font-medium">
                  <AlertTriangle class="h-4 w-4" />
                  Are you sure?
                </div>
                <Button variant="destructive" size="sm" @click="handleDangerConfirm">
                  <Trash2 class="h-3.5 w-3.5" />
                  Yes, Delete
                </Button>
                <Button variant="ghost" size="sm" @click="cancelDanger">Cancel</Button>
              </div>

              <!-- Idle state -->
              <Button v-else variant="outline" class="text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/40" @click="handleDangerConfirm">
                <Trash2 class="h-4 w-4" />
                Delete Record
              </Button>
            </Transition>
          </div>
          <p class="mt-3 text-xs text-muted-foreground">Click <em>Delete Record</em>, then confirm — resets automatically after deletion.</p>
        </div>

        <!-- Context examples -->
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Common Danger Actions</div>
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" class="text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/40">
              <Trash2 class="h-4 w-4" />
              Remove Member
            </Button>
            <Button variant="outline" class="text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive dark:border-destructive/40">
              <AlertTriangle class="h-4 w-4" />
              Revoke API Key
            </Button>
            <Button variant="destructive">
              <Trash2 class="h-4 w-4" />
              Delete Project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
