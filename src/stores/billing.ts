import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  billingService,
  type BillingOverview,
  type BillingInterval,
  type SubscriptionPlan,
  type PaymentMethod,
  type InvoiceItem,
} from '@/services/billing.service'
import { toast } from '@/components/ui/sonner'

export const useBillingStore = defineStore('billing', () => {
  const overview = ref<BillingOverview | null>(null)
  const invoices = ref<InvoiceItem[]>([])
  const selectedInterval = ref<BillingInterval>('monthly')
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  // Filters for Invoices
  const invoiceSearch = ref<string>('')
  const invoiceStatusFilter = ref<string>('all')

  // Modals
  const isChangePlanModalOpen = ref<boolean>(false)
  const targetPlan = ref<SubscriptionPlan | null>(null)
  const isAddPaymentModalOpen = ref<boolean>(false)

  // ─── Computed Getters ────────────────────────────────────────────────────────

  const currentPlan = computed<SubscriptionPlan | undefined>(() => {
    if (!overview.value) return undefined
    return overview.value.plans.find((p) => p.id === overview.value?.currentPlanId)
  })

  const seatsPercent = computed<number>(() => {
    if (!overview.value?.usage) return 0
    return Math.min(100, Math.round((overview.value.usage.seatsUsed / overview.value.usage.seatsMax) * 100))
  })

  const apiCallsPercent = computed<number>(() => {
    if (!overview.value?.usage) return 0
    return Math.min(100, Math.round((overview.value.usage.apiCallsUsed / overview.value.usage.apiCallsMax) * 100))
  })

  const storagePercent = computed<number>(() => {
    if (!overview.value?.usage) return 0
    return Math.min(100, Math.round((overview.value.usage.storageGbUsed / overview.value.usage.storageGbMax) * 100))
  })

  const filteredInvoices = computed<InvoiceItem[]>(() => {
    return invoices.value.filter((inv) => {
      // Status Filter
      if (invoiceStatusFilter.value !== 'all' && inv.status !== invoiceStatusFilter.value) {
        return false
      }

      // Keyword Search
      if (invoiceSearch.value.trim()) {
        const q = invoiceSearch.value.toLowerCase()
        const matchNum = inv.invoiceNumber.toLowerCase().includes(q)
        const matchPlan = inv.planName.toLowerCase().includes(q)
        const matchMethod = inv.paymentMethod.toLowerCase().includes(q)
        return matchNum || matchPlan || matchMethod
      }

      return true
    })
  })

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async function loadBillingData() {
    isLoading.value = true
    try {
      const [fetchedOverview, fetchedInvoices] = await Promise.all([
        billingService.getBillingOverview(),
        billingService.getInvoices(),
      ])
      overview.value = fetchedOverview
      selectedInterval.value = fetchedOverview.interval
      invoices.value = fetchedInvoices
    } catch {
      toast.error('Failed to load billing configuration.')
    } finally {
      isLoading.value = false
    }
  }

  function promptChangePlan(plan: SubscriptionPlan) {
    if (plan.id === overview.value?.currentPlanId && selectedInterval.value === overview.value?.interval) {
      toast.info(`You are currently on the ${plan.name} (${selectedInterval.value}) plan.`)
      return
    }
    targetPlan.value = plan
    isChangePlanModalOpen.value = true
  }

  async function executeChangePlan(): Promise<boolean> {
    if (!targetPlan.value || !overview.value) return false
    isSaving.value = true
    try {
      const result = await billingService.changePlan(targetPlan.value.id, selectedInterval.value)
      overview.value.currentPlanId = result.planId
      overview.value.interval = result.interval
      isChangePlanModalOpen.value = false
      toast.success(`Successfully switched to ${targetPlan.value.name} (${result.interval})!`)
      return true
    } catch {
      toast.error('Failed to update subscription plan.')
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function addPaymentMethod(payload: {
    brand: 'visa' | 'mastercard' | 'amex'
    last4: string
    expMonth: number
    expYear: number
    holderName: string
    isDefault?: boolean
  }): Promise<boolean> {
    isSaving.value = true
    try {
      const newPm = await billingService.addPaymentMethod(payload)
      if (overview.value) {
        if (newPm.isDefault) {
          overview.value.paymentMethods.forEach((pm) => (pm.isDefault = false))
        }
        overview.value.paymentMethods.push(newPm)
      }
      isAddPaymentModalOpen.value = false
      toast.success(`Payment card •••• ${payload.last4} added successfully!`)
      return true
    } catch {
      toast.error('Failed to add payment method.')
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function removePaymentMethod(id: string): Promise<boolean> {
    if (!overview.value) return false
    const pm = overview.value.paymentMethods.find((p) => p.id === id)
    if (pm?.isDefault && overview.value.paymentMethods.length > 1) {
      toast.error('Please assign a new default payment method before removing this card.')
      return false
    }
    isSaving.value = true
    try {
      await billingService.deletePaymentMethod(id)
      overview.value.paymentMethods = overview.value.paymentMethods.filter((p) => p.id !== id)
      toast.success('Payment method removed.')
      return true
    } catch {
      toast.error('Failed to remove payment method.')
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function setDefaultPaymentMethod(id: string): Promise<boolean> {
    if (!overview.value) return false
    isSaving.value = true
    try {
      await billingService.setDefaultPaymentMethod(id)
      overview.value.paymentMethods.forEach((pm) => {
        pm.isDefault = pm.id === id
      })
      toast.success('Default payment method updated.')
      return true
    } catch {
      toast.error('Failed to set default payment method.')
      return false
    } finally {
      isSaving.value = false
    }
  }

  function downloadInvoice(invoice: InvoiceItem) {
    const receiptData = `
========================================
             NALA RECEIPT
========================================
Invoice Number: ${invoice.invoiceNumber}
Date:           ${invoice.date}
Billing Period: ${invoice.period}
Plan:           ${invoice.planName}
Amount:         $${invoice.amount.toFixed(2)} ${invoice.currency}
Status:         ${invoice.status.toUpperCase()}
Payment Method: ${invoice.paymentMethod}
========================================
Thank you for building with Nala!
========================================`

    const blob = new Blob([receiptData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${invoice.invoiceNumber}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Receipt ${invoice.invoiceNumber} downloaded!`)
  }

  return {
    overview,
    invoices,
    selectedInterval,
    isLoading,
    isSaving,
    invoiceSearch,
    invoiceStatusFilter,
    isChangePlanModalOpen,
    targetPlan,
    isAddPaymentModalOpen,
    currentPlan,
    seatsPercent,
    apiCallsPercent,
    storagePercent,
    filteredInvoices,
    loadBillingData,
    promptChangePlan,
    executeChangePlan,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    downloadInvoice,
  }
})
