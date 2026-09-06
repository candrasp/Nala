<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from '@/components/ui/sonner'
import {
  Ban,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  HelpCircle,
  Lock,
  LogIn,
  Mail,
  RefreshCw,
  UserX,
} from '@lucide/vue'

const router = useRouter()

// --- Account Status Types ---
type AccountStatus = 'suspended' | 'frozen' | 'pending_verification' | 'deactivated'

interface StatusConfig {
  icon: unknown
  badge: string
  badgeClass: string
  title: string
  subtitle: string
  color: string
  borderColor: string
  bgGradient: string
}

// --- Mock Simulation State ---
// In a real app this would come from the auth store / API response
const activeStatus = ref<AccountStatus>('suspended')

const statusConfigs: Record<AccountStatus, StatusConfig> = {
  suspended: {
    icon: Ban,
    badge: 'Account Suspended',
    badgeClass: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
    title: 'Your account has been suspended.',
    subtitle: 'Access to your workspace and all associated services has been temporarily revoked due to a policy violation or outstanding payment.',
    color: 'text-red-500',
    borderColor: 'border-red-500/30',
    bgGradient: 'from-red-500/10 via-red-500/5 to-transparent',
  },
  frozen: {
    icon: Lock,
    badge: 'Account Frozen',
    badgeClass: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    title: 'Your account is temporarily frozen.',
    subtitle: 'Your account has been placed on hold by your organization administrator. No changes can be made until the hold is lifted.',
    color: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
  },
  pending_verification: {
    icon: Clock,
    badge: 'Verification Pending',
    badgeClass: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    title: 'Your account is awaiting verification.',
    subtitle: 'Your identity or billing information is under review. Access will be restored once verification is complete — usually within 24 business hours.',
    color: 'text-amber-500',
    borderColor: 'border-amber-500/30',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
  },
  deactivated: {
    icon: UserX,
    badge: 'Account Deactivated',
    badgeClass: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
    title: 'Your account has been permanently deactivated.',
    subtitle: 'This account has been closed and is no longer accessible. If this was an error, you can submit a reactivation appeal below.',
    color: 'text-slate-500',
    borderColor: 'border-slate-500/30',
    bgGradient: 'from-slate-500/10 via-slate-500/5 to-transparent',
  },
}

const currentStatus = computed<StatusConfig>(() => statusConfigs[activeStatus.value])

// --- Ticket Info (from API in real app) ---
const ticketId = ref('TKT-20260905-89421')
const suspensionDate = ref('September 4, 2026')
const reviewEstimate = ref('2–5 business days')

// --- Appeal Form ---
const appealMessage = ref('')
const isSubmittingAppeal = ref(false)
const appealSubmitted = ref(false)

const handleAppeal = () => {
  if (!appealMessage.value.trim()) {
    toast.error('Please describe your situation before submitting an appeal.')
    return
  }
  isSubmittingAppeal.value = true
  setTimeout(() => {
    isSubmittingAppeal.value = false
    appealSubmitted.value = true
    toast.success('Appeal submitted successfully!', {
      description: `Your case has been assigned ticket ID ${ticketId.value}. Our team will respond within ${reviewEstimate.value}.`,
    })
  }, 1200)
}

// --- Data Export ---
const isExporting = ref(false)

const handleDataExport = () => {
  isExporting.value = true
  toast.info('Generating your data archive...', {
    description: 'A download link will be emailed to your registered address within 24 hours.',
  })
  setTimeout(() => {
    isExporting.value = false
    toast.success('Data export requested!', {
      description: 'Check your inbox for a secure download link.',
    })
  }, 1500)
}

// --- Contact Support ---
const handleContactSupport = () => {
  toast.info('Opening support portal...', {
    description: 'Reference your Ticket ID when contacting support: ' + ticketId.value,
  })
  setTimeout(() => {
    window.open('mailto:support@nala.app?subject=Account+Issue+' + ticketId.value, '_blank')
  }, 500)
}

// --- Status Demo Switcher (showcase only) ---
const statusOptions: { value: AccountStatus; label: string }[] = [
  { value: 'suspended', label: 'Suspended' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'pending_verification', label: 'Pending Verification' },
  { value: 'deactivated', label: 'Deactivated' },
]
</script>

<template>
  <div class="w-full space-y-5">
    <!-- Demo State Switcher (visible in showcase) -->
    <div class="flex items-center gap-1.5 flex-wrap p-2.5 rounded-xl bg-muted/40 border border-border/60">
      <span class="text-[11px] font-medium text-muted-foreground mr-1 shrink-0">Preview status:</span>
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        type="button"
        :class="[
          'px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer',
          activeStatus === opt.value ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground hover:text-foreground'
        ]"
        @click="activeStatus = opt.value; appealSubmitted = false"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Status Indicator Header -->
    <Card class="border-border/80 shadow-md overflow-hidden">
      <!-- Ambient Gradient Accent Band -->
      <div :class="['h-0.5 w-full bg-linear-to-r', currentStatus.bgGradient]" />

      <CardHeader class="pb-4">
        <!-- Icon + Status Badge Row -->
        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
          <!-- Status Icon Block -->
          <div
            :class="[
              'h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border',
              currentStatus.borderColor, 'bg-card'
            ]"
          >
            <component :is="currentStatus.icon" :class="['h-6 w-6', currentStatus.color]" />
          </div>

          <div class="space-y-1.5 flex-1">
            <!-- Status Badge -->
            <span
              :class="[
                'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold',
                currentStatus.badgeClass
              ]"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {{ currentStatus.badge }}
            </span>

            <CardTitle class="text-lg font-bold text-foreground leading-snug">
              {{ currentStatus.title }}
            </CardTitle>
            <CardDescription class="text-xs text-muted-foreground leading-relaxed">
              {{ currentStatus.subtitle }}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent class="space-y-4 pt-0 pb-6">
        <!-- Ticket & Metadata Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div class="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border border-border/60">
            <div class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Support Ticket</div>
            <div class="text-xs font-mono font-semibold text-foreground tracking-wider">{{ ticketId }}</div>
          </div>
          <div class="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border border-border/60">
            <div class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Action Date</div>
            <div class="text-xs font-semibold text-foreground">{{ suspensionDate }}</div>
          </div>
          <div class="flex flex-col gap-1 p-3 rounded-lg bg-muted/40 border border-border/60">
            <div class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Review Estimate</div>
            <div class="text-xs font-semibold text-foreground">{{ reviewEstimate }}</div>
          </div>
        </div>

        <!-- Appeal Already Submitted State -->
        <Alert v-if="appealSubmitted" class="border-emerald-500/30 bg-emerald-500/10">
          <AlertDescription class="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <HeartHandshake class="h-4 w-4 shrink-0" />
            Your appeal has been submitted. Our compliance team will review your case and respond via email. Refer to ticket <strong class="font-mono">{{ ticketId }}</strong>.
          </AlertDescription>
        </Alert>

        <!-- Appeal Form -->
        <div v-else class="space-y-3 p-4 rounded-xl border border-border/70 bg-card">
          <div class="flex items-center gap-2">
            <HeartHandshake class="h-4 w-4 text-primary shrink-0" />
            <h3 class="text-xs font-semibold text-foreground">Submit an Appeal</h3>
          </div>
          <p class="text-[11px] text-muted-foreground">
            Believe this action was made in error? Provide context below and our team will review your case promptly.
          </p>

          <div class="space-y-1.5">
            <Label for="appeal-message" class="text-xs font-medium">Describe Your Situation</Label>
            <textarea
              id="appeal-message"
              v-model="appealMessage"
              rows="3"
              placeholder="e.g. My account was suspended after an automated billing flag, but the payment was processed successfully. Please find the receipt attached..."
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <Button
            class="w-full gap-2 text-xs cursor-pointer"
            size="sm"
            :disabled="isSubmittingAppeal || !appealMessage.trim()"
            @click="handleAppeal"
          >
            <RefreshCw v-if="isSubmittingAppeal" class="h-3.5 w-3.5 animate-spin" />
            <HeartHandshake v-else class="h-3.5 w-3.5" />
            {{ isSubmittingAppeal ? 'Submitting Appeal...' : 'Submit Appeal' }}
          </Button>
        </div>

        <!-- Secondary Actions Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <!-- Request Data Export -->
          <div class="flex flex-col gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card/60">
            <div class="flex items-center gap-2">
              <Download class="h-4 w-4 text-muted-foreground shrink-0" />
              <span class="text-xs font-semibold text-foreground">Export Your Data</span>
            </div>
            <p class="text-[11px] text-muted-foreground leading-relaxed">
              You have the right to request a copy of all data associated with your account before permanent deletion.
            </p>
            <Button
              variant="outline"
              size="sm"
              class="text-xs cursor-pointer gap-1.5 mt-auto"
              :disabled="isExporting"
              @click="handleDataExport"
            >
              <RefreshCw v-if="isExporting" class="h-3 w-3 animate-spin" />
              <Download v-else class="h-3 w-3" />
              {{ isExporting ? 'Requesting...' : 'Request Data Archive' }}
            </Button>
          </div>

          <!-- Contact Support -->
          <div class="flex flex-col gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card/60">
            <div class="flex items-center gap-2">
              <Mail class="h-4 w-4 text-muted-foreground shrink-0" />
              <span class="text-xs font-semibold text-foreground">Contact Support</span>
            </div>
            <p class="text-[11px] text-muted-foreground leading-relaxed">
              For urgent matters or questions about this action, reach our compliance and trust & safety team directly.
            </p>
            <Button
              variant="outline"
              size="sm"
              class="text-xs cursor-pointer gap-1.5 mt-auto"
              @click="handleContactSupport"
            >
              <Mail class="h-3 w-3" />
              Email Support Team
            </Button>
          </div>
        </div>

        <!-- Policy Notice -->
        <Alert class="border-border/60 bg-muted/30">
          <AlertDescription class="text-[11px] text-muted-foreground flex items-start gap-2">
            <FileText class="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
            <span>
              Account actions are governed by our
              <a href="#" class="text-primary hover:underline">Terms of Service</a> and
              <a href="#" class="text-primary hover:underline">Acceptable Use Policy</a>.
              Data is retained for 30 days after deactivation in accordance with our
              <a href="#" class="text-primary hover:underline">Data Retention Policy</a>.
            </span>
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter class="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          @click="router.push('/auth/login')"
        >
          <LogIn class="h-3.5 w-3.5" />
          Sign in with a different account
        </button>
        <div class="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <HelpCircle class="h-3.5 w-3.5" />
          Need help?
          <a href="#" class="text-primary hover:underline">Visit Help Center</a>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
