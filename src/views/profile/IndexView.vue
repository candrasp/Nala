<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Mail,
  Building2,
  MapPin,
  Phone,
  Briefcase,
  Globe,
  Camera,
  Trash2,
  Check,
  AlertTriangle,
  Download,
  Calendar,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Laptop,
  ArrowRight,
  Eye,
  EyeOff,
  Share2,
  RefreshCw,
  Clock,
  Languages,
} from '@lucide/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon, InputAddon } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import PageHeader from '@/components/PageHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { useFormatter } from '@/composables/useFormatter'
import { toast } from '@/components/ui/sonner'

const router = useRouter()
const authStore = useAuthStore()
const fmt = useFormatter()

// ─── Preset Avatars for Fast Selection ─────────────────────────────────────────
const PRESET_AVATARS = [
  '/img/avatar.webp',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
]

// ─── Profile Form State ────────────────────────────────────────────────────────
const form = ref({
  name: '',
  username: '',
  email: '',
  phone: '',
  jobTitle: '',
  company: '',
  location: '',
  timezone: 'utc-7',
  bio: '',
  website: '',
  github: '',
  twitter: '',
  linkedin: '',
  avatar: '/img/avatar.webp',
})

// Preferences State
const language = ref('en-US')
const timeFormat = ref<'24h' | '12h'>('24h')
const dateFormat = ref<'short' | 'medium' | 'long'>('medium')

// Avatar Upload Simulation State
const customAvatarUrl = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)
const isSaving = ref(false)

// ─── Account Deletion Safeguard State ──────────────────────────────────────────
const isDeleteDialogOpen = ref(false)
const deleteConfirmationText = ref('')
const deletePassword = ref('')
const showDeletePassword = ref(false)
const isDeletingAccount = ref(false)
const isExportingData = ref(false)

// Populate initial values from authStore
function syncFormWithStore() {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name || 'Alex Morgan',
      username: authStore.user.username || 'alexmorgan',
      email: authStore.user.email || 'alex.morgan@nala.dev',
      phone: authStore.user.phone || '+1 (555) 234-5678',
      jobTitle: authStore.user.jobTitle || 'Lead Software Architect',
      company: authStore.user.company || 'Nala Corp',
      location: authStore.user.location || 'San Francisco, CA',
      timezone: authStore.user.timezone || 'utc-7',
      bio: authStore.user.bio || 'Staff Systems Engineer building enterprise design systems and cloud APIs.',
      website: authStore.user.website || 'https://nala.dev',
      github: authStore.user.github || 'candrasp',
      twitter: authStore.user.twitter || 'candrasp',
      linkedin: authStore.user.linkedin || 'candrasp',
      avatar: authStore.user.avatar || '/img/avatar.webp',
    }
  }
}

onMounted(() => {
  syncFormWithStore()
})

// ─── Computed Values ───────────────────────────────────────────────────────────
const initials = computed(() => fmt.initials(form.value.name || 'User'))
const joinDate = computed(() => authStore.user?.createdAt || '2025-01-15T00:00:00.000Z')
const bioCharacterCount = computed(() => form.value.bio.length)
const maxBioLength = 300

const isDeletePhraseMatching = computed(() => {
  return deleteConfirmationText.value.trim().toLowerCase() === 'delete my account'
})

const canConfirmDeletion = computed(() => {
  return isDeletePhraseMatching.value && deletePassword.value.length >= 6
})

// Live sample formatted date based on preferences
const sampleFormattedDate = computed(() => {
  return fmt.dateTime(new Date(), {
    dateStyle: dateFormat.value,
    format: timeFormat.value,
  })
})

// ─── Actions & Handlers ────────────────────────────────────────────────────────

function handleSelectPresetAvatar(url: string) {
  form.value.avatar = url
  toast.info('Avatar preview updated. Click "Save Profile" to apply.')
}

function handleApplyCustomAvatarUrl() {
  if (!customAvatarUrl.value.trim()) return
  form.value.avatar = customAvatarUrl.value.trim()
  customAvatarUrl.value = ''
  toast.info('Custom avatar image loaded. Click "Save Profile" to apply.')
}

function handleTriggerFileInput() {
  fileInputRef.value?.click()
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    toast.error('File size exceeds 2MB limit. Please choose a smaller image.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    if (result) {
      form.value.avatar = result
      toast.success('Photo uploaded! Click "Save Profile" to apply.')
    }
  }
  reader.readAsDataURL(file)
}

function handleRemoveAvatar() {
  form.value.avatar = ''
  toast.info('Avatar removed. Using default monogram initials.')
}

async function handleSaveProfile() {
  if (!form.value.name.trim()) {
    toast.error('Full Name is required.')
    return
  }
  if (!form.value.email.trim()) {
    toast.error('Email address is required.')
    return
  }

  isSaving.value = true
  try {
    await authStore.updateProfile({
      name: form.value.name,
      email: form.value.email,
      username: form.value.username,
      avatar: form.value.avatar,
      phone: form.value.phone,
      jobTitle: form.value.jobTitle,
      company: form.value.company,
      location: form.value.location,
      timezone: form.value.timezone,
      bio: form.value.bio,
      website: form.value.website,
      github: form.value.github,
      twitter: form.value.twitter,
      linkedin: form.value.linkedin,
    })
    toast.success('Profile changes saved successfully!')
  } catch {
    toast.error('Failed to update profile. Please try again.')
  } finally {
    isSaving.value = false
  }
}

function handleResetForm() {
  syncFormWithStore()
  toast.info('Form reverted to current profile values.')
}

function handleCopyProfileLink() {
  const profileUrl = window.location.href
  navigator.clipboard.writeText(profileUrl)
  toast.success('Profile link copied to clipboard!')
}

async function handleExportData() {
  isExportingData.value = true
  try {
    // Simulate export compilation
    await new Promise((r) => setTimeout(r, 1200))
    const exportPayload = {
      user: authStore.user,
      preferences: {
        language: language.value,
        timeFormat: timeFormat.value,
        dateFormat: dateFormat.value,
      },
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    }
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nala-account-export-${authStore.user?.username || 'user'}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Account archive downloaded successfully.')
  } catch {
    toast.error('Failed to generate export file.')
  } finally {
    isExportingData.value = false
  }
}

async function handleConfirmDeleteAccount() {
  if (!canConfirmDeletion.value) return

  isDeletingAccount.value = true
  try {
    const success = await authStore.deleteAccount(deletePassword.value)
    if (success) {
      isDeleteDialogOpen.value = false
      toast.success('Account permanently deleted. Goodbye!')
      router.push('/auth/login')
    }
  } catch {
    toast.error('Failed to delete account. Please verify your password.')
  } finally {
    isDeletingAccount.value = false
  }
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Top Header using standard PageHeader -->
    <PageHeader
      title="User Profile"
      description="Manage your personal identity, avatar, contact details, regional preferences, and account safeguards."
      badge="Personal Account"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="gap-1.5 text-xs" @click="handleCopyProfileLink">
            <Share2 class="h-3.5 w-3.5" />
            Share Profile
          </Button>
          <Button size="sm" class="gap-1.5 text-xs" :disabled="isSaving" @click="handleSaveProfile">
            <Check v-if="!isSaving" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            {{ isSaving ? 'Saving...' : 'Save Profile' }}
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- PROFILE HERO BANNER                                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm border overflow-hidden">
      <!-- Decorative Gradient Cover -->
      <div class="h-32 sm:h-44 w-full bg-linear-to-r from-primary/25 via-primary/10 to-accent/30 relative border-b border-border/50">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div class="absolute right-4 top-4 flex gap-2">
          <Badge variant="outline" class="bg-background/80 backdrop-blur-sm gap-1.5 text-xs font-normal">
            <Calendar class="h-3.5 w-3.5 text-primary" />
            Member since {{ fmt.date(joinDate, 'medium') }}
          </Badge>
        </div>
      </div>

      <!-- Hero Profile Details -->
      <div class="px-6 pb-6 pt-0 relative">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <!-- Avatar + Presence and Identity Info -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <!-- Avatar with negative top margin so only the avatar overlaps the banner -->
            <div class="relative group w-fit -mt-12 sm:-mt-16 shrink-0">
              <Avatar class="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg ring-1 ring-border/50">
                <AvatarImage :src="form.avatar" :alt="form.name" />
                <AvatarFallback class="text-2xl font-bold bg-primary/10 text-primary">
                  {{ initials }}
                </AvatarFallback>
              </Avatar>
              <button
                @click="handleTriggerFileInput"
                class="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                aria-label="Change profile picture"
                title="Change picture"
              >
                <Camera class="h-6 w-6" />
              </button>
            </div>

            <!-- Identity info -->
            <div class="space-y-1.5 pt-1 sm:pt-3">
              <div class="flex flex-wrap items-center gap-2">
                <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-none">
                  {{ form.name || 'User Profile' }}
                </h1>
                <Badge variant="default" shape="pill" class="text-xs">
                  {{ authStore.user?.role || 'Administrator' }}
                </Badge>
                <Badge variant="success" shape="pill" dot pulse class="text-xs">
                  Active
                </Badge>
              </div>

              <div class="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span class="font-mono text-primary font-medium">@{{ form.username }}</span>
                <span class="hidden sm:inline opacity-40">•</span>
                <span class="flex items-center gap-1.5">
                  <Mail class="h-3.5 w-3.5" />
                  {{ form.email }}
                </span>
                <template v-if="form.company">
                  <span class="hidden sm:inline opacity-40">•</span>
                  <span class="flex items-center gap-1.5">
                    <Building2 class="h-3.5 w-3.5" />
                    {{ form.company }}
                  </span>
                </template>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center gap-2 pt-2 sm:pt-3 shrink-0">
            <Button variant="outline" size="sm" class="text-xs gap-1.5" @click="handleTriggerFileInput">
              <Camera class="h-3.5 w-3.5" />
              Change Photo
            </Button>
            <Button variant="ghost" size="sm" class="text-xs gap-1.5" @click="router.push('/settings')">
              Preferences
              <ArrowRight class="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <p v-if="form.bio" class="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed pt-1">
          {{ form.bio }}
        </p>
      </div>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- PROFILE TABS SECTION                                                  -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Tabs default-value="general" class="w-full space-y-6">
      <TabsList class="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto h-auto p-1 bg-muted/50 border">
        <TabsTrigger value="general" class="gap-2 text-xs py-2">
          <User class="h-3.5 w-3.5" />
          <span>General Info</span>
        </TabsTrigger>
        <TabsTrigger value="avatar" class="gap-2 text-xs py-2">
          <Camera class="h-3.5 w-3.5" />
          <span>Avatar Studio</span>
        </TabsTrigger>
        <TabsTrigger value="preferences" class="gap-2 text-xs py-2">
          <Languages class="h-3.5 w-3.5" />
          <span>Regional & Time</span>
        </TabsTrigger>
        <TabsTrigger value="danger" class="gap-2 text-xs py-2 text-destructive data-[state=active]:text-destructive">
          <AlertTriangle class="h-3.5 w-3.5" />
          <span>Danger Zone</span>
        </TabsTrigger>
      </TabsList>

      <!-- ───────────────────────────────────────────────────────────────── -->
      <!-- TAB 1: GENERAL INFO & CONTACT DETAILS                             -->
      <!-- ───────────────────────────────────────────────────────────────── -->
      <TabsContent value="general" class="space-y-6 focus-visible:outline-none">
        <!-- Personal Information Form Card -->
        <Card flush class="shadow-sm border">
          <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle class="text-base font-semibold">Personal Information</CardTitle>
              <CardDescription class="text-xs">Update your public identity and profile credentials.</CardDescription>
            </div>
            <Badge variant="outline" class="w-fit text-xs gap-1">
              <Sparkles class="h-3.5 w-3.5 text-primary" />
              Publicly Visible
            </Badge>
          </CardHeader>

          <CardContent class="p-6 space-y-5">
            <!-- Full Name & Username -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="full-name" class="text-xs font-medium">Full Name</Label>
                <Input
                  id="full-name"
                  v-model="form.name"
                  placeholder="e.g. Alex Morgan"
                  class="h-9 text-xs"
                  required
                />
              </div>

              <div class="space-y-1.5">
                <Label for="username" class="text-xs font-medium">Username Handle</Label>
                <InputGroup>
                  <InputAddon side="left">@</InputAddon>
                  <Input
                    id="username"
                    v-model="form.username"
                    placeholder="alexmorgan"
                    class="h-9 text-xs rounded-l-none"
                  />
                </InputGroup>
              </div>
            </div>

            <!-- Email & Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="email" class="text-xs font-medium">Primary Email</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <Mail class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="alex.morgan@nala.dev"
                    class="pl-9 h-9 text-xs"
                    required
                  />
                </InputGroup>
              </div>

              <div class="space-y-1.5">
                <Label for="phone" class="text-xs font-medium">Phone Number</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <Phone class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="phone"
                    v-model="form.phone"
                    placeholder="+1 (555) 000-0000"
                    class="pl-9 h-9 text-xs"
                  />
                </InputGroup>
              </div>
            </div>

            <!-- Job Title & Company -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="job-title" class="text-xs font-medium">Job Title / Role</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <Briefcase class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="job-title"
                    v-model="form.jobTitle"
                    placeholder="Staff Software Engineer"
                    class="pl-9 h-9 text-xs"
                  />
                </InputGroup>
              </div>

              <div class="space-y-1.5">
                <Label for="company" class="text-xs font-medium">Company / Organization</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <Building2 class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="company"
                    v-model="form.company"
                    placeholder="Supabase / Nala Design"
                    class="pl-9 h-9 text-xs"
                  />
                </InputGroup>
              </div>
            </div>

            <!-- Location & Timezone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="location" class="text-xs font-medium">Location</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <MapPin class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="location"
                    v-model="form.location"
                    placeholder="San Francisco, CA"
                    class="pl-9 h-9 text-xs"
                  />
                </InputGroup>
              </div>

              <div class="space-y-1.5">
                <Label class="text-xs font-medium">Timezone</Label>
                <Select v-model="form.timezone">
                  <SelectTrigger class="h-9 text-xs w-full">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8" class="text-xs">(UTC-08:00) Pacific Time (US &amp; Canada)</SelectItem>
                    <SelectItem value="utc-7" class="text-xs">(UTC-07:00) Mountain Time</SelectItem>
                    <SelectItem value="utc-5" class="text-xs">(UTC-05:00) Eastern Time (US &amp; Canada)</SelectItem>
                    <SelectItem value="utc+0" class="text-xs">(UTC+00:00) London, Dublin, Lisbon</SelectItem>
                    <SelectItem value="utc+1" class="text-xs">(UTC+01:00) Berlin, Paris, Frankfurt</SelectItem>
                    <SelectItem value="utc+7" class="text-xs">(UTC+07:00) Jakarta, Bangkok, Hanoi</SelectItem>
                    <SelectItem value="utc+8" class="text-xs">(UTC+08:00) Singapore, Hong Kong, Perth</SelectItem>
                    <SelectItem value="utc+9" class="text-xs">(UTC+09:00) Tokyo, Seoul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <!-- Bio -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <Label for="bio" class="text-xs font-medium">Public Bio</Label>
                <span class="text-[11px] text-muted-foreground" :class="{ 'text-destructive font-semibold': bioCharacterCount > maxBioLength }">
                  {{ bioCharacterCount }} / {{ maxBioLength }}
                </span>
              </div>
              <Textarea
                id="bio"
                v-model="form.bio"
                rows="3"
                class="text-xs resize-none"
                placeholder="Write a brief professional description about your engineering experience..."
                :maxlength="maxBioLength"
              />
              <p class="text-[11px] text-muted-foreground">
                Markdown syntax is supported for rich bios displayed on public dashboards.
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Social Profiles Card -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Social Links &amp; Profiles</CardTitle>
            <CardDescription class="text-xs">Connect your external developer platforms and social accounts.</CardDescription>
          </CardHeader>

          <CardContent class="p-6 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Website -->
              <div class="space-y-1.5">
                <Label for="website" class="text-xs font-medium">Portfolio / Website</Label>
                <InputGroup>
                  <InputIcon side="left">
                    <Globe class="h-3.5 w-3.5" />
                  </InputIcon>
                  <Input
                    id="website"
                    v-model="form.website"
                    placeholder="https://nala.dev"
                    class="pl-9 h-9 text-xs"
                  />
                </InputGroup>
              </div>

              <!-- GitHub -->
              <div class="space-y-1.5">
                <Label for="github" class="text-xs font-medium">GitHub Profile</Label>
                <InputGroup>
                  <InputAddon side="left">github.com/</InputAddon>
                  <Input
                    id="github"
                    v-model="form.github"
                    placeholder="username"
                    class="h-9 text-xs rounded-l-none"
                  />
                </InputGroup>
              </div>

              <!-- Twitter / X -->
              <div class="space-y-1.5">
                <Label for="twitter" class="text-xs font-medium">Twitter / X</Label>
                <InputGroup>
                  <InputAddon side="left">x.com/</InputAddon>
                  <Input
                    id="twitter"
                    v-model="form.twitter"
                    placeholder="handle"
                    class="h-9 text-xs rounded-l-none"
                  />
                </InputGroup>
              </div>

              <!-- LinkedIn -->
              <div class="space-y-1.5">
                <Label for="linkedin" class="text-xs font-medium">LinkedIn</Label>
                <InputGroup>
                  <InputAddon side="left">linkedin.com/in/</InputAddon>
                  <Input
                    id="linkedin"
                    v-model="form.linkedin"
                    placeholder="username"
                    class="h-9 text-xs rounded-l-none"
                  />
                </InputGroup>
              </div>
            </div>
          </CardContent>

          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
            <Button variant="ghost" size="sm" class="text-xs text-muted-foreground" @click="handleResetForm">
              Reset Changes
            </Button>
            <Button size="sm" class="text-xs gap-1.5" :disabled="isSaving" @click="handleSaveProfile">
              <Check v-if="!isSaving" class="h-3.5 w-3.5" />
              <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
              {{ isSaving ? 'Saving...' : 'Save Profile Changes' }}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- ───────────────────────────────────────────────────────────────── -->
      <!-- TAB 2: AVATAR STUDIO                                              -->
      <!-- ───────────────────────────────────────────────────────────────── -->
      <TabsContent value="avatar" class="space-y-6 focus-visible:outline-none">
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Avatar Studio</CardTitle>
            <CardDescription class="text-xs">Customize your visual presence across comments, audit logs, and team workspaces.</CardDescription>
          </CardHeader>

          <CardContent class="p-6 space-y-6">
            <!-- Live Preview -->
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-xl bg-muted/30 border">
              <div class="relative">
                <Avatar class="h-24 w-24 border-2 border-border shadow-md" status="online">
                  <AvatarImage :src="form.avatar" />
                  <AvatarFallback class="text-2xl font-bold bg-primary/10 text-primary">
                    {{ initials }}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div class="space-y-2 text-center sm:text-left flex-1">
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 class="text-sm font-semibold text-foreground">Current Avatar Preview</h2>
                  <Badge variant="outline" class="text-[10px]">Presence: Online</Badge>
                </div>
                <p class="text-xs text-muted-foreground">
                  Supports JPG, PNG, GIF, or WebP. Maximum file size is 2MB. Square ratio recommended (400x400px).
                </p>
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <!-- Hidden File Input -->
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    class="hidden"
                    @change="handleFileUpload"
                  />
                  <Button size="sm" class="text-xs gap-1.5" @click="handleTriggerFileInput">
                    <Camera class="h-3.5 w-3.5" />
                    Upload File
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    class="text-xs text-destructive hover:bg-destructive/10 gap-1.5"
                    @click="handleRemoveAvatar"
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                    Remove Avatar
                  </Button>
                </div>
              </div>
            </div>

            <!-- Preset Avatar Gallery -->
            <div class="space-y-3">
              <div>
                <Label class="text-xs font-semibold">Preset Avatar Gallery</Label>
                <p class="text-[11px] text-muted-foreground">Choose from our curated collection of enterprise avatars.</p>
              </div>

              <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
                <button
                  v-for="(preset, index) in PRESET_AVATARS"
                  :key="index"
                  type="button"
                  @click="handleSelectPresetAvatar(preset)"
                  class="group relative rounded-xl border-2 p-1 transition-all cursor-pointer hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                  :class="form.avatar === preset ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-card'"
                >
                  <Avatar class="h-14 w-14 rounded-lg">
                    <AvatarImage :src="preset" class="object-cover" />
                    <AvatarFallback>{{ index + 1 }}</AvatarFallback>
                  </Avatar>
                  <div
                    v-if="form.avatar === preset"
                    class="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm"
                  >
                    <Check class="h-3 w-3" />
                  </div>
                </button>
              </div>
            </div>

            <!-- Direct Image URL Input -->
            <div class="space-y-2 pt-2 border-t">
              <Label for="custom-avatar-url" class="text-xs font-semibold">External Image URL</Label>
              <p class="text-[11px] text-muted-foreground">Paste a direct image link from Unsplash, Gravatar, or Cloudinary.</p>
              <div class="flex gap-2">
                <Input
                  id="custom-avatar-url"
                  v-model="customAvatarUrl"
                  placeholder="https://example.com/avatar.jpg"
                  class="h-9 text-xs"
                />
                <Button variant="outline" size="sm" class="text-xs shrink-0" @click="handleApplyCustomAvatarUrl">
                  Apply URL
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex justify-end">
            <Button size="sm" class="text-xs gap-1.5" :disabled="isSaving" @click="handleSaveProfile">
              <Check v-if="!isSaving" class="h-3.5 w-3.5" />
              <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
              {{ isSaving ? 'Saving...' : 'Save Avatar' }}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- ───────────────────────────────────────────────────────────────── -->
      <!-- TAB 3: REGIONAL & PREFERENCES                                     -->
      <!-- ───────────────────────────────────────────────────────────────── -->
      <TabsContent value="preferences" class="space-y-6 focus-visible:outline-none">
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Regional &amp; Localization Preferences</CardTitle>
            <CardDescription class="text-xs">Configure how timestamps, dates, and number formats are displayed across the app.</CardDescription>
          </CardHeader>

          <CardContent class="p-6 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Language -->
              <div class="space-y-2">
                <Label class="text-xs font-semibold">Display Language</Label>
                <Select v-model="language">
                  <SelectTrigger class="h-9 text-xs w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US" class="text-xs">English (US)</SelectItem>
                    <SelectItem value="en-GB" class="text-xs">English (UK)</SelectItem>
                    <SelectItem value="id-ID" class="text-xs">Bahasa Indonesia (ID)</SelectItem>
                    <SelectItem value="ja-JP" class="text-xs">Japanese (日本語)</SelectItem>
                    <SelectItem value="de-DE" class="text-xs">German (Deutsch)</SelectItem>
                    <SelectItem value="fr-FR" class="text-xs">French (Français)</SelectItem>
                  </SelectContent>
                </Select>
                <p class="text-[11px] text-muted-foreground">Primary interface and system notification language.</p>
              </div>

              <!-- Time Format -->
              <div class="space-y-2">
                <Label class="text-xs font-semibold">Clock &amp; Time Format</Label>
                <Select v-model="timeFormat">
                  <SelectTrigger class="h-9 text-xs w-full">
                    <SelectValue placeholder="Select Time Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h" class="text-xs">24-Hour (14:30:00)</SelectItem>
                    <SelectItem value="12h" class="text-xs">12-Hour AM/PM (02:30:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
                <p class="text-[11px] text-muted-foreground">Affects charts, audit logs, and table timestamp columns.</p>
              </div>

              <!-- Date Format Style -->
              <div class="space-y-2">
                <Label class="text-xs font-semibold">Date Display Style</Label>
                <Select v-model="dateFormat">
                  <SelectTrigger class="h-9 text-xs w-full">
                    <SelectValue placeholder="Select Date Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short" class="text-xs">Short (e.g. 08/25/2026)</SelectItem>
                    <SelectItem value="medium" class="text-xs">Medium (e.g. Aug 25, 2026)</SelectItem>
                    <SelectItem value="long" class="text-xs">Long (e.g. August 25, 2026)</SelectItem>
                  </SelectContent>
                </Select>
                <p class="text-[11px] text-muted-foreground">Standard date formatting for orders and invoices.</p>
              </div>

              <!-- Live Formatter Preview -->
              <div class="space-y-2">
                <Label class="text-xs font-semibold">Live Formatter Preview</Label>
                <div class="p-3 rounded-md bg-muted/40 border text-xs space-y-1">
                  <div class="flex items-center justify-between text-muted-foreground">
                    <span class="flex items-center gap-1.5">
                      <Clock class="h-3.5 w-3.5 text-primary" />
                      Current Timestamp:
                    </span>
                    <span class="font-mono font-medium text-foreground">{{ sampleFormattedDate }}</span>
                  </div>
                </div>
                <p class="text-[11px] text-muted-foreground">Driven by Nala's auto-imported <code class="text-primary font-mono text-[10px]">useFormatter()</code> composable.</p>
              </div>
            </div>

            <!-- Security Snapshot -->
            <div class="pt-4 border-t space-y-3">
              <Label class="text-xs font-semibold">Security &amp; Active Device Snapshot</Label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-lg border bg-card flex items-start gap-3">
                  <ShieldCheck class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs font-semibold">Two-Factor Authentication</p>
                    <p class="text-[11px] text-muted-foreground">Authenticator App Enabled</p>
                  </div>
                </div>

                <div class="p-3 rounded-lg border bg-card flex items-start gap-3">
                  <Laptop class="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs font-semibold">Current Session</p>
                    <p class="text-[11px] text-muted-foreground">MacBook Pro 16" (Sonoma)</p>
                  </div>
                </div>

                <div class="p-3 rounded-lg border bg-card flex items-start gap-3">
                  <Smartphone class="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p class="text-xs font-semibold">Mobile Devices</p>
                    <p class="text-[11px] text-muted-foreground">iPhone 15 Pro (Active 3h ago)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex justify-end">
            <Button size="sm" class="text-xs" @click="toast.success('Regional preferences updated!')">
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- ───────────────────────────────────────────────────────────────── -->
      <!-- TAB 4: DANGER ZONE & ACCOUNT DELETION SAFEGUARD                   -->
      <!-- ───────────────────────────────────────────────────────────────── -->
      <TabsContent value="danger" class="space-y-6 focus-visible:outline-none">
        <!-- Export Data Card -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Export Account Archive</CardTitle>
            <CardDescription class="text-xs">Download a portable machine-readable archive of your personal profile, activity, and preferences.</CardDescription>
          </CardHeader>
          <CardContent class="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="text-xs font-medium text-foreground">Data Archive (JSON / CSV)</p>
              <p class="text-[11px] text-muted-foreground max-w-xl">
                Contains your profile information, authentication logs, workspace configurations, and telemetry history for GDPR and compliance export.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              class="text-xs gap-1.5 shrink-0"
              :disabled="isExportingData"
              @click="handleExportData"
            >
              <Download v-if="!isExportingData" class="h-3.5 w-3.5" />
              <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
              {{ isExportingData ? 'Generating Archive...' : 'Export My Data' }}
            </Button>
          </CardContent>
        </Card>

        <!-- Account Deletion Safeguard Card -->
        <Card flush class="shadow-sm border-destructive/40 bg-destructive/5">
          <CardHeader section class="border-destructive/20 bg-destructive/10">
            <div class="flex items-center gap-2 text-destructive">
              <AlertTriangle class="h-4 w-4" />
              <CardTitle class="text-base font-semibold text-destructive">Delete Account Safeguard</CardTitle>
            </div>
            <CardDescription class="text-xs text-destructive/80">
              Permanently delete your personal profile, access privileges, and workspace resources.
            </CardDescription>
          </CardHeader>

          <CardContent class="p-6 space-y-4">
            <Alert variant="destructive" class="border-destructive/30 bg-destructive/10 text-destructive">
              <AlertTriangle class="h-4 w-4" />
              <AlertTitle class="text-xs font-semibold">Irreversible Administrative Action</AlertTitle>
              <AlertDescription class="text-xs mt-1 leading-relaxed">
                Once deleted, all personal workspaces, API keys, database credentials, and audit traces linked directly to your account will be immediately purged. This action cannot be reversed.
              </AlertDescription>
            </Alert>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div class="space-y-0.5">
                <p class="text-xs font-semibold text-foreground">Initiate Account Deletion</p>
                <p class="text-[11px] text-muted-foreground">
                  Opens a secure, multi-step confirmation dialog requiring password verification.
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                class="text-xs gap-1.5 shrink-0"
                @click="isDeleteDialogOpen = true"
              >
                <Trash2 class="h-3.5 w-3.5" />
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- ACCOUNT DELETION SAFEGUARD DIALOG MODAL                               -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <div class="flex items-center gap-2 text-destructive">
            <div class="p-2 rounded-full bg-destructive/10 border border-destructive/20">
              <AlertTriangle class="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle class="text-base font-bold text-destructive">
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription class="text-xs mt-0.5">
                This action is permanent and cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div class="space-y-4 py-2 text-xs">
          <!-- Warning Points -->
          <div class="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive space-y-1.5">
            <p class="font-semibold">The following resources will be permanently removed:</p>
            <ul class="list-disc list-inside space-y-0.5 text-[11px] text-destructive/90">
              <li>Your profile record (@{{ form.username }}) and avatar</li>
              <li>Active authentication tokens and API secret keys</li>
              <li>Administrator permissions in team projects</li>
              <li>Any active subscriptions and automated webhook endpoints</li>
            </ul>
          </div>

          <!-- Step 1: Confirmation Phrase -->
          <div class="space-y-1.5">
            <Label for="confirm-phrase" class="text-xs font-semibold">
              1. Type <span class="font-mono font-bold text-destructive select-all">delete my account</span> to confirm:
            </Label>
            <Input
              id="confirm-phrase"
              v-model="deleteConfirmationText"
              placeholder="delete my account"
              class="h-9 text-xs font-mono"
              :class="{ 'border-emerald-500 focus-visible:ring-emerald-500': isDeletePhraseMatching }"
            />
          </div>

          <!-- Step 2: Password Verification -->
          <div class="space-y-1.5">
            <Label for="delete-password" class="text-xs font-semibold">
              2. Enter your current password for identity verification:
            </Label>
            <div class="relative">
              <Input
                id="delete-password"
                v-model="deletePassword"
                :type="showDeletePassword ? 'text' : 'password'"
                placeholder="Enter account password"
                class="h-9 pr-9 text-xs"
              />
              <button
                type="button"
                @click="showDeletePassword = !showDeletePassword"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                tabindex="-1"
                aria-label="Toggle password visibility"
              >
                <component :is="showDeletePassword ? EyeOff : Eye" class="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <DialogFooter class="gap-2 sm:gap-0 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="text-xs"
            @click="isDeleteDialogOpen = false"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="!canConfirmDeletion || isDeletingAccount"
            @click="handleConfirmDeleteAccount"
          >
            <Trash2 v-if="!isDeletingAccount" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            {{ isDeletingAccount ? 'Purging Account...' : 'Permanently Delete Account' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
