<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  CreditCard,
  Check,
  Zap,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Users,
  HardDrive,
  Activity,
  ArrowUpRight,
  Search,
  Building2,
  Receipt,
  RefreshCw,
  FileText,
} from '@lucide/vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, InputGroup, InputIcon } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import PageHeader from '@/components/PageHeader.vue'
import { useBillingStore } from '@/stores/billing'
import { useFormatter } from '@/composables/useFormatter'
import { toast } from '@/components/ui/sonner'
import type { InvoiceStatus, SubscriptionPlan } from '@/services/billing.service'

const billingStore = useBillingStore()
const fmt = useFormatter()

// ─── Add Card Form State ───────────────────────────────────────────────────────
const cardHolder = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvc = ref('')
const cardMakeDefault = ref(true)

onMounted(() => {
  billingStore.loadBillingData()
})

function formatCardNumber(e: Event) {
  const input = e.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, '').substring(0, 16)
  const parts = raw.match(/.{1,4}/g) || []
  cardNumber.value = parts.join(' ')
}

function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement
  const raw = input.value.replace(/\D/g, '').substring(0, 4)
  if (raw.length >= 3) {
    cardExpiry.value = `${raw.substring(0, 2)}/${raw.substring(2, 4)}`
  } else {
    cardExpiry.value = raw
  }
}

async function handleAddPaymentSubmit() {
  const cleanNumber = cardNumber.value.replace(/\s+/g, '')
  if (cleanNumber.length < 15) {
    toast.error('Please enter a valid card number.')
    return
  }

  const [expM, expY] = cardExpiry.value.split('/')
  const month = parseInt(expM, 10)
  const year = 2000 + parseInt(expY, 10)

  if (!month || month < 1 || month > 12 || !year) {
    toast.error('Please enter a valid expiration date (MM/YY).')
    return
  }

  let brand: 'visa' | 'mastercard' | 'amex' = 'visa'
  if (cleanNumber.startsWith('5')) brand = 'mastercard'
  if (cleanNumber.startsWith('3')) brand = 'amex'

  const success = await billingStore.addPaymentMethod({
    brand,
    last4: cleanNumber.slice(-4),
    expMonth: month,
    expYear: year,
    holderName: cardHolder.value.trim() || 'Alex Morgan',
    isDefault: cardMakeDefault.value,
  })

  if (success) {
    cardHolder.value = ''
    cardNumber.value = ''
    cardExpiry.value = ''
    cardCvc.value = ''
    cardMakeDefault.value = true
  }
}

function getInvoiceStatusBadge(status: InvoiceStatus): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'info' | 'warning' {
  switch (status) {
    case 'paid':
      return 'success'
    case 'pending':
      return 'warning'
    case 'refunded':
      return 'secondary'
    default:
      return 'outline'
  }
}

function getPlanPrice(plan: SubscriptionPlan): number {
  return billingStore.selectedInterval === 'monthly' ? plan.priceMonthly : Math.round(plan.priceYearly / 12)
}
</script>

<template>
  <div class="space-y-6 max-w-[1920px] mx-auto pb-12">
    <!-- Top PageHeader -->
    <PageHeader
      title="Billing & Invoicing"
      description="Manage workspace subscription plans, payment instruments, resource usage quotas, and historical invoices."
      badge="Billing & Plans"
      :statusDot="true"
    >
      <template #actions>
        <div class="flex items-center gap-2">
          <!-- Refresh Logs / Info -->
          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="billingStore.isLoading"
            @click="billingStore.loadBillingData"
          >
            <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': billingStore.isLoading }" />
            <span class="hidden sm:inline">Refresh Data</span>
          </Button>

          <!-- Add Payment Method -->
          <Button
            size="sm"
            class="text-xs gap-1.5"
            @click="billingStore.isAddPaymentModalOpen = true"
          >
            <Plus class="h-3.5 w-3.5" />
            Add Payment Card
          </Button>
        </div>
      </template>
    </PageHeader>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- ACTIVE PLAN SNAPSHOT & USAGE METERS                                   -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Current Subscription Banner -->
      <Card class="shadow-sm border lg:col-span-1 bg-linear-to-br from-primary/5 via-card to-card flex flex-col justify-between">
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <Badge variant="outline" class="text-xs font-semibold uppercase tracking-wider bg-background/80">
              Active Subscription
            </Badge>
            <Badge variant="success" shape="pill" dot class="text-xs">
              Auto-Renew
            </Badge>
          </div>
          <CardTitle class="text-2xl font-bold mt-2 text-foreground flex items-center gap-2">
            {{ billingStore.currentPlan?.name || 'Pro Team' }}
            <Zap class="h-5 w-5 text-amber-500 fill-amber-500" />
          </CardTitle>
          <CardDescription class="text-xs leading-relaxed mt-1">
            {{ billingStore.currentPlan?.tagline }}
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-3 pt-0">
          <div class="p-3 rounded-lg bg-background/80 border text-xs space-y-1.5">
            <div class="flex justify-between items-center text-muted-foreground">
              <span>Billing Cycle:</span>
              <span class="font-medium text-foreground capitalize">{{ billingStore.overview?.interval }}</span>
            </div>
            <div class="flex justify-between items-center text-muted-foreground">
              <span>Next Renewal Date:</span>
              <span class="font-medium text-foreground">
                {{ billingStore.overview?.renewsAt ? fmt.date(billingStore.overview.renewsAt, 'medium') : '—' }}
              </span>
            </div>
            <div class="flex justify-between items-center text-muted-foreground">
              <span>Billed Amount:</span>
              <span class="font-bold text-foreground">
                ${{ billingStore.overview?.interval === 'yearly' ? billingStore.currentPlan?.priceYearly : billingStore.currentPlan?.priceMonthly }}.00 / {{ billingStore.overview?.interval === 'yearly' ? 'yr' : 'mo' }}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Usage Quota Progress Meters -->
      <Card class="shadow-sm border lg:col-span-2 flex flex-col justify-between">
        <CardHeader class="pb-2">
          <CardTitle class="text-base font-semibold flex items-center gap-2">
            <Activity class="h-4 w-4 text-primary" />
            Resource Usage &amp; Quota Limits
          </CardTitle>
          <CardDescription class="text-xs">
            Current consumption across workspace limits under the {{ billingStore.currentPlan?.name }} plan.
          </CardDescription>
        </CardHeader>

        <CardContent class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <!-- 1. Active Team Seats -->
          <div class="p-3.5 rounded-xl border bg-muted/20 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-muted-foreground flex items-center gap-1.5">
                <Users class="h-3.5 w-3.5 text-primary" />
                Team Seats
              </span>
              <span class="font-bold text-foreground">{{ billingStore.seatsPercent }}%</span>
            </div>
            <Progress :model-value="billingStore.seatsPercent" class="h-2" />
            <p class="text-[11px] text-muted-foreground font-mono">
              {{ billingStore.overview?.usage.seatsUsed }} / {{ billingStore.overview?.usage.seatsMax }} seats allocated
            </p>
          </div>

          <!-- 2. API Call Throughput -->
          <div class="p-3.5 rounded-xl border bg-muted/20 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-muted-foreground flex items-center gap-1.5">
                <Zap class="h-3.5 w-3.5 text-amber-500" />
                API Calls
              </span>
              <span class="font-bold text-foreground">{{ billingStore.apiCallsPercent }}%</span>
            </div>
            <Progress :model-value="billingStore.apiCallsPercent" class="h-2" />
            <p class="text-[11px] text-muted-foreground font-mono">
              {{ fmt.number(billingStore.overview?.usage.apiCallsUsed || 0) }} / {{ fmt.number(billingStore.overview?.usage.apiCallsMax || 0) }} reqs
            </p>
          </div>

          <!-- 3. Cloud Storage -->
          <div class="p-3.5 rounded-xl border bg-muted/20 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-muted-foreground flex items-center gap-1.5">
                <HardDrive class="h-3.5 w-3.5 text-emerald-500" />
                Encrypted Storage
              </span>
              <span class="font-bold text-foreground">{{ billingStore.storagePercent }}%</span>
            </div>
            <Progress :model-value="billingStore.storagePercent" class="h-2" />
            <p class="text-[11px] text-muted-foreground font-mono">
              {{ billingStore.overview?.usage.storageGbUsed }} GB / {{ billingStore.overview?.usage.storageGbMax }} GB used
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- SUBSCRIPTION TIERS COMPARISON                                         -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 class="text-base font-semibold text-foreground">Subscription Tiers</h3>
          <p class="text-xs text-muted-foreground">Select the ideal capacity and security tier for your team.</p>
        </div>

        <!-- Interval Switcher (Monthly / Yearly) -->
        <div class="flex items-center gap-2 p-1 rounded-xl border bg-muted/40 self-start sm:self-auto">
          <button
            type="button"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer"
            :class="billingStore.selectedInterval === 'monthly' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
            @click="billingStore.selectedInterval = 'monthly'"
          >
            Monthly Billing
          </button>
          <button
            type="button"
            class="px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            :class="billingStore.selectedInterval === 'yearly' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
            @click="billingStore.selectedInterval = 'yearly'"
          >
            <span>Annual Billing</span>
            <Badge variant="success" shape="pill" class="text-[10px] py-0 px-1.5">Save 20%</Badge>
          </button>
        </div>
      </div>

      <!-- Plan Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          v-for="plan in billingStore.overview?.plans"
          :key="plan.id"
          class="shadow-sm border relative overflow-hidden flex flex-col justify-between transition-all"
          :class="[
            plan.id === billingStore.overview?.currentPlanId
              ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
              : 'hover:border-primary/40'
          ]"
        >
          <!-- Popular Ribbon Badge -->
          <div
            v-if="plan.isPopular"
            class="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-bl-lg flex items-center gap-1"
          >
            <Sparkles class="h-3 w-3" />
            Most Popular
          </div>

          <CardHeader class="pb-3">
            <div class="space-y-1">
              <span class="text-base font-bold text-foreground">{{ plan.name }}</span>
              <p class="text-xs text-muted-foreground min-h-8">{{ plan.tagline }}</p>
            </div>

            <!-- Price -->
            <div class="pt-3 pb-1">
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold text-foreground tracking-tight">
                  ${{ getPlanPrice(plan) }}
                </span>
                <span class="text-xs text-muted-foreground font-medium">/ month</span>
              </div>
              <p class="text-[11px] text-muted-foreground mt-0.5">
                {{ billingStore.selectedInterval === 'yearly' && plan.priceYearly > 0 ? `Billed annually ($${plan.priceYearly}/yr)` : 'Billed monthly' }}
              </p>
            </div>
          </CardHeader>

          <CardContent class="space-y-3 pt-0 flex-1">
            <div class="border-t pt-3 space-y-2">
              <span class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Includes:</span>
              <ul class="space-y-2 text-xs">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-start gap-2 text-muted-foreground"
                >
                  <Check class="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter class="pt-3 border-t bg-muted/10">
            <Button
              v-if="plan.id === billingStore.overview?.currentPlanId && billingStore.selectedInterval === billingStore.overview?.interval"
              variant="outline"
              size="sm"
              class="w-full text-xs font-semibold bg-background"
              disabled
            >
              Current Active Plan
            </Button>
            <Button
              v-else
              :variant="plan.isPopular ? 'default' : 'outline'"
              size="sm"
              class="w-full text-xs font-semibold gap-1.5"
              @click="billingStore.promptChangePlan(plan)"
            >
              <span>{{ plan.priceMonthly > (billingStore.currentPlan?.priceMonthly || 0) ? 'Upgrade to ' + plan.name : 'Switch to ' + plan.name }}</span>
              <ArrowUpRight class="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- PAYMENT METHODS & BILLING CONTACT DETAILS                             -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- 1. Payment Methods Card -->
      <Card class="shadow-sm border">
        <CardHeader class="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle class="text-base font-semibold flex items-center gap-2">
              <CreditCard class="h-4 w-4 text-primary" />
              Payment Instruments
            </CardTitle>
            <CardDescription class="text-xs">
              Credit cards and automated payment options associated with this account.
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="sm"
            class="text-xs gap-1"
            @click="billingStore.isAddPaymentModalOpen = true"
          >
            <Plus class="h-3 w-3" />
            Add Card
          </Button>
        </CardHeader>

        <CardContent class="space-y-3">
          <div
            v-for="pm in billingStore.overview?.paymentMethods"
            :key="pm.id"
            class="p-3.5 rounded-xl border flex items-center justify-between gap-3 bg-muted/20"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="h-9 w-12 rounded-lg bg-background border flex items-center justify-center font-bold text-xs uppercase tracking-wider text-muted-foreground">
                {{ pm.brand }}
              </div>
              <div class="min-w-0 space-y-0.5">
                <div class="flex items-center gap-2">
                  <p class="text-xs font-semibold text-foreground capitalize">
                    {{ pm.brand }} ending in {{ pm.last4 }}
                  </p>
                  <Badge v-if="pm.isDefault" variant="secondary" class="text-[10px] py-0 px-1.5">
                    Default
                  </Badge>
                </div>
                <p class="text-[11px] text-muted-foreground">
                  Expires {{ pm.expMonth.toString().padStart(2, '0') }}/{{ pm.expYear }} • {{ pm.holderName }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <Button
                v-if="!pm.isDefault"
                variant="ghost"
                size="sm"
                class="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                @click="billingStore.setDefaultPaymentMethod(pm.id)"
              >
                Set Default
              </Button>
              <Button
                v-if="!pm.isDefault"
                variant="ghost"
                size="icon-xs"
                class="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Remove Card"
                @click="billingStore.removePaymentMethod(pm.id)"
              >
                <Trash2 class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 2. Billing & Invoicing Details Card -->
      <Card class="shadow-sm border">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-semibold flex items-center gap-2">
            <Building2 class="h-4 w-4 text-primary" />
            Billing Contact &amp; Tax Information
          </CardTitle>
          <CardDescription class="text-xs">
            Official company entity information formatted on outgoing invoice receipts.
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-3 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-lg border bg-muted/20 space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Invoicing Entity</span>
              <p class="font-semibold text-foreground">{{ billingStore.overview?.companyName }}</p>
              <p class="text-[10px] text-muted-foreground font-mono">Tax ID: {{ billingStore.overview?.taxId }}</p>
            </div>

            <div class="p-3 rounded-lg border bg-muted/20 space-y-1">
              <span class="text-[11px] text-muted-foreground font-medium">Invoicing Email</span>
              <p class="font-semibold text-foreground font-mono">{{ billingStore.overview?.billingEmail }}</p>
              <p class="text-[10px] text-emerald-600 dark:text-emerald-400">PDF auto-dispatched</p>
            </div>
          </div>

          <div class="p-3 rounded-lg border bg-muted/20 space-y-1">
            <span class="text-[11px] text-muted-foreground font-medium">Registered Billing Address</span>
            <p class="text-foreground font-medium">{{ billingStore.overview?.billingAddress }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- INVOICE DOWNLOAD HISTORY TABLE                                        -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Card flush class="shadow-sm border overflow-hidden">
      <!-- Header Toolbar -->
      <CardHeader section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle class="text-base font-semibold flex items-center gap-2">
            <Receipt class="h-4 w-4 text-primary" />
            Invoice History &amp; Receipts
          </CardTitle>
          <CardDescription class="text-xs mt-0.5">
            Download past invoice records and transaction receipts for financial accounting.
          </CardDescription>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <!-- Search Input -->
          <div class="w-full sm:w-60">
            <InputGroup>
              <InputIcon side="left">
                <Search class="h-3.5 w-3.5" />
              </InputIcon>
              <Input
                v-model="billingStore.invoiceSearch"
                placeholder="Search invoice number..."
                class="pl-9 h-8 text-xs bg-background"
              />
            </InputGroup>
          </div>

          <!-- Status Filter -->
          <Select v-model="billingStore.invoiceStatusFilter">
            <SelectTrigger class="h-8 text-xs w-full sm:w-36 bg-background">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" class="text-xs">All Statuses</SelectItem>
              <SelectItem value="paid" class="text-xs">Paid</SelectItem>
              <SelectItem value="pending" class="text-xs">Pending</SelectItem>
              <SelectItem value="refunded" class="text-xs">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <!-- Table Content -->
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-36 font-semibold">Invoice ID</TableHead>
              <TableHead class="w-36">Billing Date</TableHead>
              <TableHead class="w-56">Plan &amp; Period</TableHead>
              <TableHead class="w-28">Amount</TableHead>
              <TableHead class="w-28">Status</TableHead>
              <TableHead class="w-44">Payment Instrument</TableHead>
              <TableHead class="w-24 text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <template v-if="billingStore.filteredInvoices.length > 0">
              <TableRow
                v-for="inv in billingStore.filteredInvoices"
                :key="inv.id"
                class="hover:bg-muted/30 transition-colors"
              >
                <!-- Invoice ID -->
                <TableCell class="font-mono text-xs font-semibold text-foreground">
                  {{ inv.invoiceNumber }}
                </TableCell>

                <!-- Date -->
                <TableCell class="text-xs text-muted-foreground whitespace-nowrap">
                  {{ fmt.date(inv.date, 'medium') }}
                </TableCell>

                <!-- Plan & Period -->
                <TableCell>
                  <div class="space-y-0.5">
                    <p class="text-xs font-medium text-foreground">{{ inv.planName }}</p>
                    <p class="text-[10px] text-muted-foreground">{{ inv.period }}</p>
                  </div>
                </TableCell>

                <!-- Amount -->
                <TableCell class="font-bold text-xs text-foreground">
                  ${{ inv.amount.toFixed(2) }}
                </TableCell>

                <!-- Status -->
                <TableCell>
                  <Badge :variant="getInvoiceStatusBadge(inv.status)" shape="pill" dot class="text-[11px] capitalize">
                    {{ inv.status }}
                  </Badge>
                </TableCell>

                <!-- Payment Instrument -->
                <TableCell class="text-xs font-mono text-muted-foreground">
                  {{ inv.paymentMethod }}
                </TableCell>

                <!-- Download Action -->
                <TableCell class="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-7 text-xs gap-1 text-primary hover:text-primary"
                    @click="billingStore.downloadInvoice(inv)"
                  >
                    <Download class="h-3 w-3" />
                    <span>PDF</span>
                  </Button>
                </TableCell>
              </TableRow>
            </template>

            <!-- Empty Search State -->
            <template v-else>
              <TableRow>
                <TableCell colspan="7" class="h-36 text-center text-muted-foreground">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <FileText class="h-6 w-6 text-muted-foreground/40" />
                    <p class="text-xs font-medium text-foreground">No matching invoices found</p>
                    <p class="text-[11px] text-muted-foreground">Try adjusting your search query or status filter.</p>
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- CHANGE SUBSCRIPTION PLAN CONFIRMATION MODAL                           -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="billingStore.isChangePlanModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <div class="flex items-center gap-2">
            <Zap class="h-5 w-5 text-primary fill-primary" />
            <DialogTitle class="text-base font-bold">
              Switch to {{ billingStore.targetPlan?.name }} Plan?
            </DialogTitle>
          </div>
          <DialogDescription class="text-xs">
            Confirm your subscription update. New quota capacities will apply immediately.
          </DialogDescription>
        </DialogHeader>

        <div v-if="billingStore.targetPlan" class="space-y-3 py-2 text-xs">
          <div class="p-3.5 rounded-xl border bg-muted/30 space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground font-medium">Selected Plan:</span>
              <span class="font-bold text-foreground text-sm">{{ billingStore.targetPlan.name }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground font-medium">Billing Interval:</span>
              <span class="font-medium text-foreground capitalize">{{ billingStore.selectedInterval }}</span>
            </div>
            <div class="flex justify-between items-center border-t pt-2">
              <span class="text-muted-foreground font-medium">New Recurring Charge:</span>
              <span class="font-extrabold text-base text-primary">
                ${{ getPlanPrice(billingStore.targetPlan) }}.00 / mo
              </span>
            </div>
          </div>

          <p class="text-[11px] text-muted-foreground leading-relaxed">
            Your payment card on file (<strong class="font-semibold">Visa •••• 4242</strong>) will be charged a prorated difference for the remainder of this billing cycle.
          </p>
        </div>

        <DialogFooter class="gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="text-xs"
            @click="billingStore.isChangePlanModalOpen = false"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            class="text-xs gap-1.5"
            :disabled="billingStore.isSaving"
            @click="billingStore.executeChangePlan"
          >
            <Check v-if="!billingStore.isSaving" class="h-3.5 w-3.5" />
            <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
            {{ billingStore.isSaving ? 'Updating...' : 'Confirm Subscription Change' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <!-- ADD PAYMENT METHOD MODAL                                              -->
    <!-- ═════════════════════════════════════════════════════════════════════ -->
    <Dialog v-model:open="billingStore.isAddPaymentModalOpen">
      <DialogContent class="sm:max-w-120">
        <DialogHeader>
          <div class="flex items-center gap-2">
            <CreditCard class="h-5 w-5 text-primary" />
            <DialogTitle class="text-base font-bold">
              Add New Payment Instrument
            </DialogTitle>
          </div>
          <DialogDescription class="text-xs">
            Add a credit card for automated subscription renewals and invoice settlements.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="handleAddPaymentSubmit" class="space-y-4 py-2 text-xs">
          <!-- Cardholder Name -->
          <div class="space-y-1.5">
            <Label for="card-holder" class="text-xs font-semibold">Cardholder Name</Label>
            <Input
              id="card-holder"
              v-model="cardHolder"
              placeholder="e.g. Alex Morgan"
              class="h-9 text-xs"
              required
            />
          </div>

          <!-- Card Number -->
          <div class="space-y-1.5">
            <Label for="card-number" class="text-xs font-semibold">Card Number</Label>
            <InputGroup>
              <InputIcon side="left">
                <CreditCard class="h-3.5 w-3.5" />
              </InputIcon>
              <Input
                id="card-number"
                v-model="cardNumber"
                placeholder="4242 4242 4242 4242"
                class="pl-9 h-9 text-xs font-mono"
                required
                @input="formatCardNumber"
              />
            </InputGroup>
          </div>

          <!-- Expiry & CVC -->
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <Label for="card-expiry" class="text-xs font-semibold">Expiration (MM/YY)</Label>
              <Input
                id="card-expiry"
                v-model="cardExpiry"
                placeholder="12/28"
                class="h-9 text-xs font-mono"
                required
                @input="formatExpiry"
              />
            </div>

            <div class="space-y-1.5">
              <Label for="card-cvc" class="text-xs font-semibold">Security CVC</Label>
              <Input
                id="card-cvc"
                v-model="cardCvc"
                placeholder="123"
                maxlength="4"
                class="h-9 text-xs font-mono"
                required
              />
            </div>
          </div>

          <!-- Make Default Checkbox -->
          <div class="flex items-center gap-2 pt-1">
            <Checkbox id="card-default" v-model:checked="cardMakeDefault" />
            <Label for="card-default" class="text-xs cursor-pointer">
              Set as primary default payment card
            </Label>
          </div>

          <DialogFooter class="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              class="text-xs"
              @click="billingStore.isAddPaymentModalOpen = false"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              class="text-xs gap-1.5"
              :disabled="billingStore.isSaving"
            >
              <Check v-if="!billingStore.isSaving" class="h-3.5 w-3.5" />
              <RefreshCw v-else class="h-3.5 w-3.5 animate-spin" />
              {{ billingStore.isSaving ? 'Saving...' : 'Save Payment Card' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
