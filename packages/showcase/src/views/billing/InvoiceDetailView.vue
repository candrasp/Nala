<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Printer,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  RotateCcw,
  Copy,
  Check,
  FileText,
  Send,
  ShieldCheck,
} from '@lucide/vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/AppLogo.vue'
import { useFormatter } from '@/composables/useFormatter'
import { billingService, type InvoiceDetail } from '@/services/billing.service'
import { toast } from '@/components/ui/sonner'

const route = useRoute()
const router = useRouter()
const fmt = useFormatter()

const invoiceId = computed(() => (route.params.id as string) || 'inv-101')
const invoice = ref<InvoiceDetail | null>(null)
const isLoading = ref<boolean>(true)
const isCopied = ref<boolean>(false)

// Email Dialog State
const isEmailDialogOpen = ref<boolean>(false)
const emailRecipient = ref<string>('')
const emailSubject = ref<string>('')
const isSendingEmail = ref<boolean>(false)

onMounted(async () => {
  await fetchInvoice()
})

async function fetchInvoice() {
  isLoading.value = true
  try {
    const data = await billingService.getInvoiceById(invoiceId.value)
    invoice.value = data
    emailRecipient.value = data.customer.email
    emailSubject.value = `Invoice ${data.invoiceNumber} from Nala Technologies`
  } catch {
    toast.error('Failed to load invoice details.')
  } finally {
    isLoading.value = false
  }
}

function handlePrint() {
  window.print()
}

function copyInvoiceLink() {
  navigator.clipboard.writeText(window.location.href)
  isCopied.value = true
  toast.success('Invoice URL copied to clipboard!')
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

function downloadReceipt() {
  if (!invoice.value) return
  const receiptData = `========================================
            NALA INVOICE RECEIPT
========================================
Invoice Number: ${invoice.value.invoiceNumber}
Status:         ${invoice.value.status.toUpperCase()}
Issued Date:    ${invoice.value.date}
Due Date:       ${invoice.value.dueDate}
Plan:           ${invoice.value.planName}
Billing Period: ${invoice.value.period}

ISSUED TO:
${invoice.value.customer.name}
${invoice.value.customer.company}
${invoice.value.customer.address}

LINE ITEMS:
${invoice.value.items.map((i) => `- ${i.description} (x${i.quantity}) - $${i.total.toFixed(2)}`).join('\n')}

SUMMARY:
Subtotal:       $${invoice.value.subtotal.toFixed(2)}
Tax / VAT:      $${invoice.value.taxAmount.toFixed(2)}
Total Amount:   $${invoice.value.total.toFixed(2)} ${invoice.value.currency}
Payment Method: ${invoice.value.paymentMethod}
========================================
Thank you for building with Nala!
========================================`

  const blob = new Blob([receiptData], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${invoice.value.invoiceNumber}.txt`
  a.click()
  URL.revokeObjectURL(url)
  toast.success(`Invoice ${invoice.value.invoiceNumber} downloaded!`)
}

async function sendInvoiceEmail() {
  if (!emailRecipient.value.trim()) {
    toast.error('Please enter an email recipient.')
    return
  }
  isSendingEmail.value = true
  try {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    isEmailDialogOpen.value = false
    toast.success(`Invoice copy successfully dispatched to ${emailRecipient.value}!`)
  } finally {
    isSendingEmail.value = false
  }
}

function getStatusBadgeVariant(status: string): 'success' | 'warning' | 'secondary' {
  switch (status) {
    case 'paid':
      return 'success'
    case 'pending':
      return 'warning'
    case 'refunded':
      return 'secondary'
    default:
      return 'secondary'
  }
}
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-12 print:p-0 print:m-0 print:max-w-none">
    <!-- Top Action Toolbar (Hidden during Print) -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
      <div class="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          class="h-9 gap-1.5 text-xs shadow-xs"
          @click="router.push('/billing')"
        >
          <ArrowLeft class="h-4 w-4" />
          <span>Back to Billing</span>
        </Button>
        <div class="h-4 w-px bg-border hidden sm:block" />
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">Invoice:</span>
          <span class="text-xs font-mono font-bold text-foreground">
            {{ invoice?.invoiceNumber || invoiceId }}
          </span>
          <Badge
            v-if="invoice"
            :variant="getStatusBadgeVariant(invoice.status)"
            shape="pill"
            dot
            class="text-[11px] capitalize ml-1"
          >
            {{ invoice.status }}
          </Badge>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          class="h-9 text-xs gap-1.5 shadow-xs"
          @click="copyInvoiceLink"
        >
          <component :is="isCopied ? Check : Copy" class="h-3.5 w-3.5 text-muted-foreground" />
          <span>{{ isCopied ? 'Copied' : 'Share Link' }}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          class="h-9 text-xs gap-1.5 shadow-xs"
          @click="isEmailDialogOpen = true"
        >
          <Mail class="h-3.5 w-3.5 text-muted-foreground" />
          <span>Email PDF</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          class="h-9 text-xs gap-1.5 shadow-xs"
          @click="downloadReceipt"
        >
          <Download class="h-3.5 w-3.5 text-muted-foreground" />
          <span>Download</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          class="h-9 text-xs gap-1.5 shadow-xs font-medium"
          @click="handlePrint"
        >
          <Printer class="h-3.5 w-3.5" />
          <span>Print Invoice</span>
        </Button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-12 text-center text-muted-foreground">
      <div class="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-3 animate-pulse">
        <FileText class="h-6 w-6" />
      </div>
      <p class="text-sm font-medium text-foreground">Loading invoice details...</p>
    </div>

    <!-- Invoice Paper Sheet -->
    <Card
      v-else-if="invoice"
      class="border border-border/80 shadow-md bg-card print:border-none print:shadow-none print:bg-white print:text-black print:p-0 overflow-hidden relative"
    >
      <!-- Accent Top Border -->
      <div class="h-1.5 w-full bg-primary print:hidden" />

      <CardContent class="p-8 sm:p-12 space-y-10 print:p-0 print:space-y-8">
        <!-- 1. Header & Branding -->
        <div class="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-border/60 pb-8 print:border-neutral-300">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <AppLogo size="lg" withBackground class="rounded-xl print:invert-0" />
              <div>
                <h1 class="text-xl font-bold tracking-tight text-foreground print:text-black">
                  {{ invoice.issuer.name }}
                </h1>
                <p class="text-xs text-muted-foreground print:text-neutral-600">
                  {{ invoice.issuer.company }}
                </p>
              </div>
            </div>

            <div class="text-xs text-muted-foreground space-y-1 leading-relaxed print:text-neutral-600">
              <p class="whitespace-pre-line">{{ invoice.issuer.address }}</p>
              <p>Email: <span class="text-foreground print:text-black font-medium">{{ invoice.issuer.email }}</span></p>
              <p v-if="invoice.issuer.taxId">Tax ID / VAT: <span class="font-mono">{{ invoice.issuer.taxId }}</span></p>
            </div>
          </div>

          <!-- Invoice Title & Status Stamp -->
          <div class="text-left sm:text-right space-y-2">
            <span class="inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground font-bold print:text-neutral-500">
              Official Tax Invoice
            </span>
            <div class="text-2xl sm:text-3xl font-black font-mono tracking-tight text-foreground print:text-black">
              {{ invoice.invoiceNumber }}
            </div>

            <!-- Status Indicator Stamp -->
            <div class="pt-1 flex items-center sm:justify-end gap-2">
              <div
                v-if="invoice.status === 'paid'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 print:border-emerald-600 print:text-emerald-700"
              >
                <CheckCircle2 class="h-3.5 w-3.5" />
                <span>PAID</span>
              </div>
              <div
                v-else-if="invoice.status === 'pending'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 print:border-amber-600 print:text-amber-700"
              >
                <Clock class="h-3.5 w-3.5" />
                <span>PENDING PAYMENT</span>
              </div>
              <div
                v-else
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 print:border-purple-600 print:text-purple-700"
              >
                <RotateCcw class="h-3.5 w-3.5" />
                <span>REFUNDED</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Invoice Metadata & Billing Parties -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
          <!-- Billed To -->
          <div class="space-y-2 p-4 rounded-lg bg-muted/30 border border-border/50 print:bg-transparent print:border-neutral-200">
            <span class="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
              Billed To
            </span>
            <p class="text-sm font-bold text-foreground print:text-black">
              {{ invoice.customer.name }}
            </p>
            <p class="font-medium text-foreground print:text-black">
              {{ invoice.customer.company }}
            </p>
            <p class="text-muted-foreground whitespace-pre-line leading-relaxed print:text-neutral-600">
              {{ invoice.customer.address }}
            </p>
            <div class="pt-1 text-muted-foreground space-y-0.5 print:text-neutral-600">
              <p>Email: <span class="text-foreground print:text-black">{{ invoice.customer.email }}</span></p>
              <p v-if="invoice.customer.taxId">Tax ID / VAT: <span class="font-mono">{{ invoice.customer.taxId }}</span></p>
            </div>
          </div>

          <!-- Invoice Details / Dates -->
          <div class="space-y-2 p-4 rounded-lg bg-muted/30 border border-border/50 print:bg-transparent print:border-neutral-200">
            <span class="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] block">
              Invoice Summary
            </span>
            <div class="grid grid-cols-2 gap-y-2.5 pt-1">
              <div>
                <p class="text-muted-foreground text-[11px] print:text-neutral-500">Invoice Date:</p>
                <p class="font-semibold text-foreground print:text-black">{{ fmt.date(invoice.date, 'long') }}</p>
              </div>
              <div>
                <p class="text-muted-foreground text-[11px] print:text-neutral-500">Due Date:</p>
                <p class="font-semibold text-foreground print:text-black">{{ fmt.date(invoice.dueDate, 'long') }}</p>
              </div>
              <div>
                <p class="text-muted-foreground text-[11px] print:text-neutral-500">Billing Period:</p>
                <p class="font-medium text-foreground print:text-black">{{ invoice.period }}</p>
              </div>
              <div>
                <p class="text-muted-foreground text-[11px] print:text-neutral-500">Payment Instrument:</p>
                <p class="font-mono font-medium text-foreground print:text-black">{{ invoice.paymentMethod }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Line Items Table -->
        <div class="space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-muted-foreground print:text-neutral-700">
            Invoice Items &amp; Services
          </h2>

          <div class="rounded-lg border border-border/80 overflow-hidden print:border-neutral-300">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-muted/60 border-b border-border/80 text-muted-foreground font-semibold print:bg-neutral-100 print:border-neutral-300 print:text-black">
                  <th class="py-3 px-4 w-8 text-center">#</th>
                  <th class="py-3 px-4">Item &amp; Description</th>
                  <th class="py-3 px-4 text-center w-20">Qty</th>
                  <th class="py-3 px-4 text-right w-28">Unit Price</th>
                  <th class="py-3 px-4 text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/60 print:divide-neutral-200">
                <tr
                  v-for="(item, idx) in invoice.items"
                  :key="item.id || idx"
                  class="hover:bg-muted/20 print:hover:bg-transparent"
                >
                  <td class="py-3 px-4 text-center text-muted-foreground font-mono text-[11px]">
                    {{ idx + 1 }}
                  </td>
                  <td class="py-3 px-4">
                    <p class="font-bold text-foreground print:text-black text-xs">
                      {{ item.description }}
                    </p>
                    <p v-if="item.details" class="text-[11px] text-muted-foreground print:text-neutral-600 mt-0.5">
                      {{ item.details }}
                    </p>
                  </td>
                  <td class="py-3 px-4 text-center font-mono text-foreground print:text-black">
                    {{ item.quantity }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono text-foreground print:text-black">
                    ${{ item.unitPrice.toFixed(2) }}
                  </td>
                  <td class="py-3 px-4 text-right font-mono font-bold text-foreground print:text-black">
                    ${{ item.total.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Calculation Summary Breakdown -->
        <div class="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2">
          <!-- Left: Payment Notes & Authorization -->
          <div class="space-y-4 max-w-sm text-xs text-muted-foreground print:text-neutral-600">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30 border border-border/40 print:border-neutral-200 print:bg-transparent">
              <ShieldCheck class="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div class="space-y-1">
                <p class="font-semibold text-foreground print:text-black text-[11px]">Payment Authorization</p>
                <p class="text-[11px] leading-relaxed">
                  {{ invoice.notes || 'Payment was charged automatically to the card on file.' }}
                </p>
              </div>
            </div>

            <div class="text-[11px] leading-relaxed space-y-1">
              <p><strong class="text-foreground print:text-black">Terms:</strong> {{ invoice.paymentTerms || 'Due upon receipt' }}</p>
              <p>For questions or support, contact <span class="text-foreground print:text-black underline">billing@nala.dev</span>.</p>
            </div>
          </div>

          <!-- Right: Totals Box -->
          <div class="w-full sm:w-72 space-y-2 text-xs">
            <div class="flex justify-between py-1.5 text-muted-foreground border-b border-border/40 print:border-neutral-200 print:text-neutral-600">
              <span>Subtotal:</span>
              <span class="font-mono font-medium text-foreground print:text-black">
                ${{ invoice.subtotal.toFixed(2) }}
              </span>
            </div>

            <div
              v-if="invoice.discountAmount && invoice.discountAmount > 0"
              class="flex justify-between py-1.5 text-emerald-600 dark:text-emerald-400 border-b border-border/40 print:border-neutral-200"
            >
              <span class="flex items-center gap-1">
                <span>Discount</span>
                <span v-if="invoice.discountCode" class="text-[10px] font-mono px-1 rounded bg-emerald-500/10">
                  ({{ invoice.discountCode }})
                </span>:
              </span>
              <span class="font-mono font-medium">
                -${{ invoice.discountAmount.toFixed(2) }}
              </span>
            </div>

            <div class="flex justify-between py-1.5 text-muted-foreground border-b border-border/40 print:border-neutral-200 print:text-neutral-600">
              <span>Tax / VAT ({{ invoice.taxRate }}%):</span>
              <span class="font-mono font-medium text-foreground print:text-black">
                ${{ invoice.taxAmount.toFixed(2) }}
              </span>
            </div>

            <div class="flex justify-between items-baseline pt-2 text-sm font-bold text-foreground print:text-black">
              <span>Total Amount:</span>
              <div class="text-right">
                <span class="text-lg font-black font-mono text-primary print:text-black">
                  ${{ invoice.total.toFixed(2) }}
                </span>
                <span class="text-[10px] font-mono text-muted-foreground block">
                  {{ invoice.currency }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Invoice Footer Note -->
        <div class="border-t border-border/60 pt-6 text-center text-[11px] text-muted-foreground print:border-neutral-300 print:text-neutral-500">
          <p class="font-medium text-foreground print:text-black">
            Thank you for your business with {{ invoice.issuer.name }}.
          </p>
          <p class="mt-0.5">
            This is a computer-generated tax invoice and is valid without a physical signature.
          </p>
        </div>
      </CardContent>
    </Card>

    <!-- Email Invoice Dialog -->
    <Dialog v-model:open="isEmailDialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle class="text-base font-bold">Email Invoice PDF</DialogTitle>
          <DialogDescription class="text-xs">
            Send an official PDF copy of invoice <span class="font-mono font-bold">{{ invoice?.invoiceNumber }}</span> to your accounting department or client.
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4 py-3 text-xs">
          <div class="space-y-1.5">
            <Label for="recipient-email" class="text-xs">Recipient Email Address</Label>
            <Input
              id="recipient-email"
              v-model="emailRecipient"
              type="email"
              placeholder="accounting@company.com"
              class="h-9 text-xs"
            />
          </div>

          <div class="space-y-1.5">
            <Label for="email-subject" class="text-xs">Subject Line</Label>
            <Input
              id="email-subject"
              v-model="emailSubject"
              placeholder="Invoice Subject"
              class="h-9 text-xs"
            />
          </div>
        </div>

        <DialogFooter class="gap-2 sm:gap-0">
          <Button variant="outline" size="sm" class="text-xs" @click="isEmailDialogOpen = false">
            Cancel
          </Button>
          <Button
            size="sm"
            class="text-xs gap-1.5"
            :disabled="isSendingEmail"
            @click="sendInvoiceEmail"
          >
            <Send class="h-3.5 w-3.5" />
            <span>{{ isSendingEmail ? 'Sending...' : 'Send Invoice' }}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
@media print {
  /* Hide unnecessary layout elements during window.print() */
  :global(header),
  :global(aside),
  :global(nav),
  :global(.sidebar-provider aside),
  :global([data-sidebar="sidebar"]),
  :global(#nala-theme-customizer),
  :global([data-sonner-toaster]) {
    display: none !important;
  }

  :global(body),
  :global(html),
  :global(main) {
    background: #ffffff !important;
    color: #000000 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
    height: auto !important;
  }

  @page {
    margin: 1.5cm;
    size: auto;
  }
}
</style>
