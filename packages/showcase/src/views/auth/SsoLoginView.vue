<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Key,
  Globe,
  Lock,
  Layers,
} from '@lucide/vue'

const router = useRouter()

// SSO Mode: 'email' (smart domain detection) | 'domain' (manual org slug / SAML entity ID)
const ssoMode = ref<'email' | 'domain'>('email')
const workEmail = ref('')
const orgSlug = ref('')
const isConnecting = ref(false)
const selectedProvider = ref<string | null>(null)
const isAuthenticated = ref(false)
const errorMessage = ref('')

// Domain detection dictionary for realistic enterprise demo
interface SsoProviderConfig {
  name: string
  provider: 'okta' | 'azure' | 'google' | 'saml'
  logoBg: string
  badgeText: string
  authDomain: string
}

const KNOWN_DOMAINS: Record<string, SsoProviderConfig> = {
  'acme.com': { name: 'Acme Corp', provider: 'okta', logoBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', badgeText: 'Okta Verified', authDomain: 'acme.okta.com' },
  'microsoft.com': { name: 'Microsoft 365', provider: 'azure', logoBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', badgeText: 'Microsoft Entra ID', authDomain: 'login.microsoftonline.com' },
  'google.com': { name: 'Google Workspace', provider: 'google', logoBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', badgeText: 'Google Workspace', authDomain: 'accounts.google.com' },
  'nala.dev': { name: 'Nala Enterprise', provider: 'saml', logoBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', badgeText: 'Custom SAML 2.0', authDomain: 'sso.nala.dev' },
}

const detectedProvider = computed<SsoProviderConfig | null>(() => {
  if (!workEmail.value.includes('@')) return null
  const domain = workEmail.value.split('@')[1]?.toLowerCase().trim()
  if (!domain) return null
  return KNOWN_DOMAINS[domain] || {
    name: domain.charAt(0).toUpperCase() + domain.slice(1),
    provider: 'saml',
    logoBg: 'bg-primary/10 text-primary',
    badgeText: 'Enterprise SAML SSO',
    authDomain: `sso.${domain}`,
  }
})

const isValidInput = computed(() => {
  if (ssoMode.value === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.value)
  }
  return orgSlug.value.trim().length >= 3
})

const handleInitiateSso = (providerType?: string) => {
  if (!isValidInput.value && !providerType) return

  isConnecting.value = true
  errorMessage.value = ''
  selectedProvider.value = providerType || detectedProvider.value?.name || orgSlug.value

  setTimeout(() => {
    isConnecting.value = false
    isAuthenticated.value = true
    toast.success(`Redirected from ${selectedProvider.value} Identity Provider`)
  }, 1200)
}

const handleQuickDomain = (domain: string) => {
  workEmail.value = `alex@${domain}`
}

const handleProceed = () => {
  router.push('/')
}
</script>

<template>
  <Card flush class="w-full max-w-md shadow-xl border-border/80 bg-card">
    <!-- Success State -->
    <template v-if="isAuthenticated">
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-2 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">SSO Connected</CardTitle>
        <CardDescription class="text-sm">
          Successfully authenticated via
          <span class="font-semibold text-foreground">{{ selectedProvider }}</span>.
          Single Sign-On session established.
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-8 space-y-4">
        <div class="rounded-lg border border-border/70 bg-muted/20 p-4 text-xs space-y-1.5">
          <div class="flex items-center justify-between text-muted-foreground">
            <span>Identity Provider:</span>
            <span class="font-medium text-foreground">{{ selectedProvider }}</span>
          </div>
          <div class="flex items-center justify-between text-muted-foreground">
            <span>Protocol:</span>
            <span class="font-mono text-[11px] font-medium text-foreground">SAML 2.0 / OIDC</span>
          </div>
          <div class="flex items-center justify-between text-muted-foreground">
            <span>User Principal:</span>
            <span class="font-mono text-[11px] font-medium text-foreground">{{ workEmail || `${orgSlug}@enterprise` }}</span>
          </div>
        </div>

        <Button class="w-full font-medium cursor-pointer" @click="handleProceed">
          <span class="flex items-center justify-center gap-2">
            Continue to Dashboard
            <ArrowRight class="h-4 w-4" />
          </span>
        </Button>
      </CardContent>
    </template>

    <!-- Main SSO Form -->
    <template v-else>
      <CardHeader class="pt-8 pb-6 px-6 sm:px-8 space-y-1.5 text-center">
        <div class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 class="h-6 w-6" />
        </div>
        <CardTitle class="text-2xl font-bold tracking-tight">Enterprise Single Sign-On</CardTitle>
        <CardDescription class="text-sm">
          Sign in seamlessly using your corporate enterprise credentials (Okta, Azure AD, SAML, or Google Workspace).
        </CardDescription>
      </CardHeader>

      <CardContent class="px-6 sm:px-8 pb-6 space-y-5">
        <!-- Error Alert Banner -->
        <Alert v-if="errorMessage" variant="destructive" class="py-2.5 px-3.5">
          <AlertCircle class="h-4 w-4" />
          <AlertDescription class="text-xs font-medium ml-2">
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <!-- Mode Toggle (Email vs Org Slug) -->
        <div class="flex rounded-lg bg-muted p-1 text-xs">
          <button
            type="button"
            class="flex-1 py-1.5 font-medium rounded-md transition-all cursor-pointer text-center"
            :class="ssoMode === 'email' ? 'bg-background text-foreground shadow-2xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
            @click="ssoMode = 'email'"
          >
            Work Email
          </button>
          <button
            type="button"
            class="flex-1 py-1.5 font-medium rounded-md transition-all cursor-pointer text-center"
            :class="ssoMode === 'domain' ? 'bg-background text-foreground shadow-2xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
            @click="ssoMode = 'domain'"
          >
            Organization Slug
          </button>
        </div>

        <!-- Mode 1: Work Email with Auto Detection -->
        <div v-if="ssoMode === 'email'" class="space-y-3">
          <div class="space-y-1.5">
            <Label for="work-email" class="text-xs font-medium">Work Email Address</Label>
            <Input
              id="work-email"
              v-model="workEmail"
              type="email"
              placeholder="name@company.com"
              class="h-10 text-sm"
              :disabled="isConnecting"
              @keyup.enter="() => isValidInput && handleInitiateSso()"
            />
          </div>

          <!-- Detected IdP Badge Strip -->
          <div
            v-if="detectedProvider"
            class="rounded-lg border border-border/80 bg-muted/30 p-3 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div class="flex items-center gap-2">
              <span :class="['px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase', detectedProvider.logoBg]">
                {{ detectedProvider.provider }}
              </span>
              <div>
                <div class="font-medium text-foreground">{{ detectedProvider.name }}</div>
                <div class="text-[11px] text-muted-foreground font-mono">{{ detectedProvider.authDomain }}</div>
              </div>
            </div>
            <span class="text-xs text-primary font-medium flex items-center gap-1">
              <ShieldCheck class="h-3.5 w-3.5" />
              Detected
            </span>
          </div>

          <!-- Quick Test Domain Chips -->
          <div class="space-y-1.5 pt-1">
            <span class="text-[11px] text-muted-foreground">Try demo corporate domains:</span>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="domain in Object.keys(KNOWN_DOMAINS)"
                :key="domain"
                type="button"
                class="text-[11px] px-2 py-0.5 rounded-md border border-border/70 hover:border-primary/50 hover:bg-muted/60 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                @click="handleQuickDomain(domain)"
              >
                @{{ domain }}
              </button>
            </div>
          </div>
        </div>

        <!-- Mode 2: Org Slug / SAML Entity ID -->
        <div v-else class="space-y-3">
          <div class="space-y-1.5">
            <Label for="org-slug" class="text-xs font-medium">Organization Workspace ID</Label>
            <div class="relative flex items-center">
              <span class="absolute left-3 text-xs text-muted-foreground font-mono select-none">sso.nala.dev/</span>
              <Input
                id="org-slug"
                v-model="orgSlug"
                placeholder="acme-corp"
                class="pl-27 font-mono text-sm h-10"
                :disabled="isConnecting"
                @keyup.enter="() => isValidInput && handleInitiateSso()"
              />
            </div>
          </div>
          <p class="text-[11px] text-muted-foreground">
            Contact your IT Administrator if you do not know your organization slug.
          </p>
        </div>

        <!-- Action Button -->
        <Button
          class="w-full font-medium h-10 cursor-pointer"
          :disabled="!isValidInput || isConnecting"
          @click="() => handleInitiateSso()"
        >
          <Loader2 v-if="isConnecting" class="h-4 w-4 animate-spin mr-2" />
          <span v-else class="flex items-center justify-center gap-1.5">
            Continue with Single Sign-On
            <ArrowRight class="h-3.5 w-3.5" />
          </span>
        </Button>

        <!-- Divider with Direct IdP shortcuts -->
        <div class="relative py-1">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t border-border" />
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-2 text-[10px] tracking-wider text-muted-foreground">
              Or connect directly with
            </span>
          </div>
        </div>

        <!-- Direct Identity Providers Grid -->
        <div class="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-9 justify-start text-xs font-medium cursor-pointer"
            :disabled="isConnecting"
            @click="() => handleInitiateSso('Okta SSO')"
          >
            <Key class="h-3.5 w-3.5 text-blue-500 mr-2 shrink-0" />
            <span class="truncate">Okta Verify</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-9 justify-start text-xs font-medium cursor-pointer"
            :disabled="isConnecting"
            @click="() => handleInitiateSso('Microsoft Entra ID')"
          >
            <Lock class="h-3.5 w-3.5 text-sky-500 mr-2 shrink-0" />
            <span class="truncate">Microsoft Entra</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-9 justify-start text-xs font-medium cursor-pointer"
            :disabled="isConnecting"
            @click="() => handleInitiateSso('Google Workspace')"
          >
            <Globe class="h-3.5 w-3.5 text-emerald-500 mr-2 shrink-0" />
            <span class="truncate">Google Workspace</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            class="h-9 justify-start text-xs font-medium cursor-pointer"
            :disabled="isConnecting"
            @click="() => handleInitiateSso('SAML 2.0 Provider')"
          >
            <Layers class="h-3.5 w-3.5 text-purple-500 mr-2 shrink-0" />
            <span class="truncate">Custom SAML 2.0</span>
          </Button>
        </div>
      </CardContent>

      <CardFooter class="flex justify-center border-t border-border/60 py-4 bg-muted/10">
        <router-link
          to="/auth/login"
          class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          Return to standard email & password
        </router-link>
      </CardFooter>
    </template>
  </Card>
</template>
