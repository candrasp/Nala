<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import {
  User,
  Shield,
  Bell,
  Key,
  Camera,
  Check,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Laptop,
  Smartphone,
  AlertTriangle,
  Lock,
  Sparkles,
} from '@lucide/vue'

// ─── Profile State ────────────────────────────────────────────────────────────
const profileName = ref('Alex Morgan')
const profileUsername = ref('alexmorgan')
const profileEmail = ref('alex.morgan@supabase.io')
const profileBio = ref('Staff Systems Engineer building real-time databases and serverless edge functions.')
const profileTimezone = ref('utc-7')
const profileCompany = ref('Supabase Cloud Technologies')
const avatarSrc = ref('/img/avatar.webp')

// ─── Security State ───────────────────────────────────────────────────────────
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const enable2FA = ref(true)
const enablePasskey = ref(false)

const activeSessions = ref([
  {
    id: 'ses-1',
    device: 'MacBook Pro 16" (Sonoma)',
    location: 'San Francisco, US',
    ip: '192.0.2.42',
    icon: Laptop,
    isCurrent: true,
    lastActive: 'Active now',
  },
  {
    id: 'ses-2',
    device: 'iPhone 15 Pro (iOS 17.4)',
    location: 'San Francisco, US',
    ip: '192.0.2.89',
    icon: Smartphone,
    isCurrent: false,
    lastActive: '3 hours ago',
  },
  {
    id: 'ses-3',
    device: 'Chrome on Windows 11',
    location: 'Frankfurt, DE',
    ip: '198.51.100.12',
    icon: Laptop,
    isCurrent: false,
    lastActive: '2 days ago',
  },
])

// ─── Notification Settings State ──────────────────────────────────────────────
const notifySecurity = ref(true)
const notifyDigests = ref(true)
const notifyUsageSpikes = ref(true)
const notifyTeamChanges = ref(false)
const notifyMarketing = ref(false)

// ─── API Keys State ───────────────────────────────────────────────────────────
interface ApiToken {
  id: string
  name: string
  keyPrefix: string
  secretKey: string
  scope: 'Read & Write' | 'Read Only' | 'Admin'
  created: string
  lastUsed: string
}

const copiedKeyId = ref<string | null>(null)
const showSecretMap = ref<Record<string, boolean>>({})

const apiKeys = ref<ApiToken[]>([
  {
    id: 'key-1',
    name: 'Production Next.js Server',
    keyPrefix: 'sb_live_',
    secretKey: 'sb_live_98a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3',
    scope: 'Read & Write',
    created: 'Jan 14, 2026',
    lastUsed: '10 mins ago',
  },
  {
    id: 'key-2',
    name: 'Analytics ETL Pipeline',
    keyPrefix: 'sb_ro_',
    secretKey: 'sb_ro_12f3e4d5c6b7a89012345678abcdef01',
    scope: 'Read Only',
    created: 'Feb 02, 2026',
    lastUsed: '1 hour ago',
  },
  {
    id: 'key-3',
    name: 'GitHub CI/CD Deployment Action',
    keyPrefix: 'sb_adm_',
    secretKey: 'sb_adm_88492019384729104829104938201938',
    scope: 'Admin',
    created: 'Mar 11, 2026',
    lastUsed: 'Yesterday',
  },
])

// Create API Token Modal State
const isCreateTokenOpen = ref(false)
const newTokenName = ref('')
const newTokenScope = ref<'Read & Write' | 'Read Only' | 'Admin'>('Read & Write')
const newTokenExpiry = ref('90d')

// ─── Actions ──────────────────────────────────────────────────────────────────
const saveSuccessToast = ref(false)

function triggerSaveSuccess() {
  saveSuccessToast.value = true
  setTimeout(() => {
    saveSuccessToast.value = false
  }, 2500)
}

function handleCopy(keyString: string, id: string) {
  navigator.clipboard.writeText(keyString)
  copiedKeyId.value = id
  setTimeout(() => {
    copiedKeyId.value = null
  }, 2000)
}

function toggleShowSecret(id: string) {
  showSecretMap.value[id] = !showSecretMap.value[id]
}

function handleCreateToken() {
  if (!newTokenName.value) return
  const randomHex = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')

  const prefixMap: Record<string, string> = {
    'Read & Write': 'sb_live_',
    'Read Only': 'sb_ro_',
    'Admin': 'sb_adm_',
  }

  const prefix = prefixMap[newTokenScope.value] || 'sb_tok_'

  const createdToken: ApiToken = {
    id: `key-${Date.now()}`,
    name: newTokenName.value,
    keyPrefix: prefix,
    secretKey: `${prefix}${randomHex}`,
    scope: newTokenScope.value,
    created: 'Just now',
    lastUsed: 'Never',
  }

  apiKeys.value.unshift(createdToken)
  newTokenName.value = ''
  newTokenScope.value = 'Read & Write'
  newTokenExpiry.value = '90d'
  isCreateTokenOpen.value = false
  triggerSaveSuccess()
}

function revokeSession(id: string) {
  activeSessions.value = activeSessions.value.filter((s) => s.id !== id)
}

function deleteApiKey(id: string) {
  apiKeys.value = apiKeys.value.filter((k) => k.id !== id)
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Preferences"
      description="Manage personal identity, security credentials, notification channels, and API tokens."
      badge="Settings & Configuration"
    >
      <template #actions>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <span
            v-if="saveSuccessToast"
            class="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
          >
            <Check class="h-3.5 w-3.5" />
            Changes saved
          </span>
        </transition>
        <Button size="sm" class="gap-1.5 text-xs" @click="triggerSaveSuccess">
          Save Changes
        </Button>
      </template>
    </PageHeader>

    <!-- Tabbed Settings Navigation -->
    <Tabs default-value="profile" class="w-full space-y-6">
      <TabsList class="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto h-auto p-1 bg-muted/50 border">
        <TabsTrigger value="profile" class="gap-2 text-xs py-2">
          <User class="h-3.5 w-3.5" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="security" class="gap-2 text-xs py-2">
          <Shield class="h-3.5 w-3.5" />
          <span>Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" class="gap-2 text-xs py-2">
          <Bell class="h-3.5 w-3.5" />
          <span>Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="api-keys" class="gap-2 text-xs py-2">
          <Key class="h-3.5 w-3.5" />
          <span>API Keys</span>
        </TabsTrigger>
      </TabsList>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- TAB 1: PROFILE                                                        -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <TabsContent value="profile" class="space-y-6 focus-visible:outline-none">
        <!-- 1. Avatar & Identity -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Avatar &amp; Identity</CardTitle>
            <CardDescription class="text-xs">This profile picture is displayed across team projects and audit logs.</CardDescription>
          </CardHeader>
          <CardContent class="p-6">
            <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="relative group">
                <Avatar class="h-20 w-20 border-2 border-border shadow-sm">
                  <AvatarImage :src="avatarSrc" />
                  <AvatarFallback class="text-lg font-bold bg-primary/10 text-primary">
                    AM
                  </AvatarFallback>
                </Avatar>
                <button
                  class="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Upload picture"
                >
                  <Camera class="h-5 w-5" />
                </button>
              </div>

              <div class="space-y-1.5 flex-1">
                <div class="flex items-center gap-2">
                  <Button variant="outline" size="sm" class="text-xs gap-1.5">
                    <Camera class="h-3.5 w-3.5" />
                    Upload Image
                  </Button>
                  <Button variant="ghost" size="sm" class="text-xs text-muted-foreground hover:text-destructive">
                    Remove
                  </Button>
                </div>
                <p class="text-[11px] text-muted-foreground">
                  Recommended size: 400x400px. JPG, PNG or WebP under 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 2. Personal Information -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Personal Information</CardTitle>
            <CardDescription class="text-xs">Manage your public name, contact email, and workspace handle.</CardDescription>
          </CardHeader>
          <CardContent class="p-6 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="full-name" class="text-xs font-medium">Full Name</Label>
                <Input id="full-name" v-model="profileName" class="h-9 text-xs" />
              </div>

              <div class="space-y-1.5">
                <Label for="username" class="text-xs font-medium">Username Handle</Label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">@</span>
                  <Input id="username" v-model="profileUsername" class="pl-7 h-9 text-xs" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <Label for="email" class="text-xs font-medium">Primary Email</Label>
                <Input id="email" v-model="profileEmail" type="email" class="h-9 text-xs" />
              </div>

              <div class="space-y-1.5">
                <Label for="company" class="text-xs font-medium">Company / Organization</Label>
                <Input id="company" v-model="profileCompany" class="h-9 text-xs" />
              </div>
            </div>

            <div class="space-y-1.5">
              <Label for="bio" class="text-xs font-medium">Public Bio</Label>
              <Textarea
                id="bio"
                v-model="profileBio"
                rows="3"
                class="text-xs resize-none"
                placeholder="Write a short summary about your engineering focus..."
              />
              <p class="text-[11px] text-muted-foreground">Brief description for your developer profile.</p>
            </div>

            <div class="space-y-1.5 max-w-sm">
              <Label class="text-xs font-medium">Timezone Preference</Label>
              <Select v-model="profileTimezone">
                <SelectTrigger class="h-9 text-xs">
                  <SelectValue placeholder="Select Timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-8" class="text-xs">(UTC-08:00) Pacific Time (US &amp; Canada)</SelectItem>
                  <SelectItem value="utc-7" class="text-xs">(UTC-07:00) Mountain Time</SelectItem>
                  <SelectItem value="utc-5" class="text-xs">(UTC-05:00) Eastern Time</SelectItem>
                  <SelectItem value="utc+0" class="text-xs">(UTC+00:00) London, Dublin</SelectItem>
                  <SelectItem value="utc+1" class="text-xs">(UTC+01:00) Berlin, Paris, Frankfurt</SelectItem>
                  <SelectItem value="utc+7" class="text-xs">(UTC+07:00) Jakarta, Bangkok</SelectItem>
                  <SelectItem value="utc+8" class="text-xs">(UTC+08:00) Singapore, Hong Kong</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex justify-end">
            <Button size="sm" class="text-xs" @click="triggerSaveSuccess">
              Save Profile
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- TAB 2: SECURITY                                                       -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <TabsContent value="security" class="space-y-6 focus-visible:outline-none">
        <!-- 1. Password Management -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Password Management</CardTitle>
            <CardDescription class="text-xs">Ensure your account uses a strong, random password with at least 12 characters.</CardDescription>
          </CardHeader>
          <CardContent class="p-6 space-y-4">
            <div class="space-y-1.5 max-w-md">
              <Label for="current-pwd" class="text-xs font-medium">Current Password</Label>
              <div class="relative">
                <Input
                  id="current-pwd"
                  v-model="currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="pr-9 h-9 text-xs"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  tabindex="-1"
                >
                  <component :is="showCurrentPassword ? EyeOff : Eye" class="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div class="space-y-1.5">
                <Label for="new-pwd" class="text-xs font-medium">New Password</Label>
                <div class="relative">
                  <Input
                    id="new-pwd"
                    v-model="newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    class="pr-9 h-9 text-xs"
                    placeholder="At least 12 characters"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    tabindex="-1"
                  >
                    <component :is="showNewPassword ? EyeOff : Eye" class="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div class="space-y-1.5">
                <Label for="confirm-pwd" class="text-xs font-medium">Confirm Password</Label>
                <Input
                  id="confirm-pwd"
                  v-model="confirmPassword"
                  type="password"
                  class="h-9 text-xs"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex justify-between items-center">
            <span class="text-[11px] text-muted-foreground">Last password change: 45 days ago</span>
            <Button size="sm" class="text-xs" @click="triggerSaveSuccess">
              Update Password
            </Button>
          </CardFooter>
        </Card>

        <!-- 2. Two-Factor Authentication -->
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription class="text-xs">Add an additional security layer requiring a time-based TOTP code during login.</CardDescription>
          </CardHeader>
          <CardContent class="p-6 space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
              <div class="flex items-start gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Lock class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-foreground">Authenticator App (TOTP)</p>
                  <p class="text-[11px] text-muted-foreground mt-0.5">
                    Use Google Authenticator, 1Password, or Authy to generate secure verification codes.
                  </p>
                </div>
              </div>
              <Switch v-model="enable2FA" />
            </div>

            <div class="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
              <div class="flex items-start gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                  <Key class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-foreground">Hardware Security Keys (WebAuthn / Passkey)</p>
                  <p class="text-[11px] text-muted-foreground mt-0.5">
                    Sign in with biometric TouchID, Windows Hello, or YubiKey hardware tokens.
                  </p>
                </div>
              </div>
              <Switch v-model="enablePasskey" />
            </div>
          </CardContent>
        </Card>

        <!-- 3. Active Sessions -->
        <Card flush class="shadow-sm border">
          <CardHeader section class="flex flex-row items-center justify-between">
            <div>
              <CardTitle class="text-base font-semibold">Active Login Sessions</CardTitle>
              <CardDescription class="text-xs">Devices that are currently signed into your administrative console.</CardDescription>
            </div>
            <Button variant="outline" size="sm" class="text-xs text-destructive hover:bg-destructive/10">
              Revoke All Others
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <div class="divide-y divide-border">
              <div
                v-for="s in activeSessions"
                :key="s.id"
                class="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
                    <component :is="s.icon" class="h-4 w-4" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-xs font-medium text-foreground">{{ s.device }}</p>
                      <span
                        v-if="s.isCurrent"
                        class="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                      >
                        Current Device
                      </span>
                    </div>
                    <p class="text-[11px] text-muted-foreground mt-0.5">
                      {{ s.location }} • {{ s.ip }} • <span class="text-foreground/70">{{ s.lastActive }}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <Button
                    v-if="!s.isCurrent"
                    variant="ghost"
                    size="sm"
                    class="text-xs text-muted-foreground hover:text-destructive h-8"
                    @click="revokeSession(s.id)"
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- TAB 3: NOTIFICATIONS                                                  -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <TabsContent value="notifications" class="space-y-6 focus-visible:outline-none">
        <Card flush class="shadow-sm border">
          <CardHeader section>
            <CardTitle class="text-base font-semibold">Email &amp; System Alerts</CardTitle>
            <CardDescription class="text-xs">Configure how and when you receive automated security notices and performance digests.</CardDescription>
          </CardHeader>
          <CardContent class="p-6 space-y-5">
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-xs font-semibold">Security &amp; Auth Alerts</Label>
                <p class="text-[11px] text-muted-foreground">
                  Receive instant emails upon new device sign-ins, IP anomalies, or password updates.
                </p>
              </div>
              <Switch v-model="notifySecurity" />
            </div>

            <div class="border-t border-border pt-4 flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-xs font-semibold">Database Latency &amp; Spike Alarms</Label>
                <p class="text-[11px] text-muted-foreground">
                  Get notified when CPU or memory consumption exceeds 85% for more than 5 minutes.
                </p>
              </div>
              <Switch v-model="notifyUsageSpikes" />
            </div>

            <div class="border-t border-border pt-4 flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-xs font-semibold">Weekly Analytics &amp; Revenue Digest</Label>
                <p class="text-[11px] text-muted-foreground">
                  A Monday morning summary email covering user growth, active subscriptions, and SLA metrics.
                </p>
              </div>
              <Switch v-model="notifyDigests" />
            </div>

            <div class="border-t border-border pt-4 flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-xs font-semibold">Team Membership Changes</Label>
                <p class="text-[11px] text-muted-foreground">
                  Notifications when a collaborator accepts an invitation or changes their role.
                </p>
              </div>
              <Switch v-model="notifyTeamChanges" />
            </div>

            <div class="border-t border-border pt-4 flex items-center justify-between">
              <div class="space-y-0.5">
                <Label class="text-xs font-semibold">Product Changelog &amp; Developer Announcements</Label>
                <p class="text-[11px] text-muted-foreground">
                  Monthly updates on new platform features, SDK releases, and API deprecations.
                </p>
              </div>
              <Switch v-model="notifyMarketing" />
            </div>
          </CardContent>
          <CardFooter class="px-6 py-3 border-t border-border bg-muted/20 flex justify-end">
            <Button size="sm" class="text-xs" @click="triggerSaveSuccess">
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <!-- TAB 4: API KEYS & TOKENS                                              -->
      <!-- ═════════════════════════════════════════════════════════════════════ -->
      <TabsContent value="api-keys" class="space-y-6 focus-visible:outline-none">
        <!-- Warning Banner -->
        <div class="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-700 dark:text-amber-300">
          <AlertTriangle class="h-5 w-5 shrink-0 mt-0.5" />
          <div class="text-xs leading-relaxed space-y-1">
            <p class="font-semibold">Protect Your Secret API Keys</p>
            <p class="text-amber-600 dark:text-amber-300/80">
              API tokens carry full authorization privileges. Never expose service role secrets in public client-side JavaScript or source code repositories.
            </p>
          </div>
        </div>

        <!-- API Tokens Card -->
        <Card flush class="shadow-sm border">
          <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle class="text-base font-semibold">Project API Tokens</CardTitle>
              <CardDescription class="text-xs">Generate scoped credentials for backend servers, CLI tools, and automation workers.</CardDescription>
            </div>
            <Button size="sm" class="gap-1.5 text-xs self-start sm:self-auto" @click="isCreateTokenOpen = true">
              <Plus class="h-3.5 w-3.5" />
              Generate Token
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <div class="divide-y divide-border">
              <div
                v-for="k in apiKeys"
                :key="k.id"
                class="p-4 sm:p-6 space-y-3 hover:bg-muted/10 transition-colors"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-xs font-semibold text-foreground">{{ k.name }}</h4>
                      <span
                        :class="[
                          'rounded-md border px-2 py-0.2 text-[10px] font-medium',
                          k.scope === 'Admin'
                            ? 'bg-destructive/10 text-destructive border-destructive/20'
                            : k.scope === 'Read & Write'
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-muted text-muted-foreground border-border'
                        ]"
                      >
                        {{ k.scope }}
                      </span>
                    </div>
                    <p class="text-[11px] text-muted-foreground mt-0.5">
                      Created on {{ k.created }} • Last used {{ k.lastUsed }}
                    </p>
                  </div>

                  <div class="flex items-center gap-1.5 self-end sm:self-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-xs h-7 px-2 text-muted-foreground hover:text-destructive"
                      @click="deleteApiKey(k.id)"
                    >
                      <Trash2 class="h-3.5 w-3.5 mr-1" />
                      Revoke
                    </Button>
                  </div>
                </div>

                <!-- Secret String Display -->
                <div class="flex items-center gap-2 rounded-md border bg-muted/40 p-2 font-mono text-xs">
                  <span class="flex-1 truncate text-muted-foreground">
                    {{ showSecretMap[k.id] ? k.secretKey : `${k.secretKey.slice(0, 12)}••••••••••••••••••••••••` }}
                  </span>
                  <button
                    @click="toggleShowSecret(k.id)"
                    class="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                    title="Toggle Visibility"
                  >
                    <component :is="showSecretMap[k.id] ? EyeOff : Eye" class="h-3.5 w-3.5" />
                  </button>
                  <button
                    @click="handleCopy(k.secretKey, k.id)"
                    class="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer flex items-center gap-1 text-[11px] font-sans"
                    title="Copy Key"
                  >
                    <component :is="copiedKeyId === k.id ? Check : Copy" class="h-3.5 w-3.5" />
                    <span class="hidden sm:inline">{{ copiedKeyId === k.id ? 'Copied' : 'Copy' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- ── Create API Token Dialog Modal ───────────────────────────────────── -->
    <Dialog v-model:open="isCreateTokenOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2">
            <Sparkles class="h-4 w-4 text-primary" />
            Generate New API Token
          </DialogTitle>
          <DialogDescription>
            Create an API key with fine-grained access control for external microservices.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleCreateToken" class="space-y-4 py-2">
          <div class="space-y-1.5">
            <Label for="token-name" class="text-xs font-medium">Token Description / Application</Label>
            <Input
              id="token-name"
              v-model="newTokenName"
              placeholder="e.g. Staging Vercel Edge Server"
              class="h-9 text-xs"
              required
            />
          </div>

          <div class="space-y-1.5">
            <Label class="text-xs font-medium">Access Scope Permissions</Label>
            <Select v-model="newTokenScope">
              <SelectTrigger class="h-9 text-xs w-full">
                <SelectValue placeholder="Select scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Read & Write" class="text-xs">
                  Read &amp; Write — Standard database query &amp; mutation access
                </SelectItem>
                <SelectItem value="Read Only" class="text-xs">
                  Read Only — Telemetry and read queries without mutation
                </SelectItem>
                <SelectItem value="Admin" class="text-xs">
                  Admin (Service Role) — Full database superuser bypass
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-1.5">
            <Label class="text-xs font-medium">Expiration Period</Label>
            <Select v-model="newTokenExpiry">
              <SelectTrigger class="h-9 text-xs w-full">
                <SelectValue placeholder="Select expiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d" class="text-xs">30 Days</SelectItem>
                <SelectItem value="60d" class="text-xs">60 Days</SelectItem>
                <SelectItem value="90d" class="text-xs">90 Days (Recommended)</SelectItem>
                <SelectItem value="1y" class="text-xs">1 Year</SelectItem>
                <SelectItem value="never" class="text-xs">Never Expire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter class="pt-2">
            <Button type="button" variant="outline" size="sm" @click="isCreateTokenOpen = false">
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Generate Key
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

