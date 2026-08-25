import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type BillingInterval = 'monthly' | 'yearly'
export type InvoiceStatus = 'paid' | 'pending' | 'refunded'

export interface SubscriptionPlan {
  id: string
  name: string
  tagline: string
  priceMonthly: number
  priceYearly: number
  isPopular?: boolean
  features: string[]
  limits: {
    seats: number
    apiCalls: number
    storageGb: number
  }
}

export interface BillingUsage {
  seatsUsed: number
  seatsMax: number
  apiCallsUsed: number
  apiCallsMax: number
  storageGbUsed: number
  storageGbMax: number
}

export interface PaymentMethod {
  id: string
  brand: 'visa' | 'mastercard' | 'amex'
  last4: string
  expMonth: number
  expYear: number
  holderName: string
  isDefault: boolean
}

export interface InvoiceItem {
  id: string
  invoiceNumber: string
  date: string
  period: string
  planName: string
  amount: number
  currency: string
  status: InvoiceStatus
  paymentMethod: string
  pdfUrl?: string
}

export interface BillingOverview {
  currentPlanId: string
  interval: BillingInterval
  renewsAt: string
  billingEmail: string
  companyName: string
  taxId: string
  billingAddress: string
  usage: BillingUsage
  paymentMethods: PaymentMethod[]
  plans: SubscriptionPlan[]
}

// ─── Default Mock Data ─────────────────────────────────────────────────────────
const mockPlans: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter',
    tagline: 'Essential tools for small projects and individual developers.',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      'Up to 3 team members',
      '50,000 monthly API calls',
      '5 GB encrypted cloud storage',
      'Standard community support',
      'Basic audit log (7 days)',
    ],
    limits: {
      seats: 3,
      apiCalls: 50000,
      storageGb: 5,
    },
  },
  {
    id: 'plan-pro',
    name: 'Pro Team',
    tagline: 'Ideal for scaling teams requiring high throughput and fine-grained RBAC.',
    priceMonthly: 29,
    priceYearly: 278, // ~20% discount
    isPopular: true,
    features: [
      'Up to 15 team members',
      '250,000 monthly API calls',
      '50 GB encrypted cloud storage',
      'Priority email & chat support',
      'Granular Roles & Permissions (RBAC)',
      '90-day comprehensive audit log',
      'Custom webhook destinations',
    ],
    limits: {
      seats: 15,
      apiCalls: 250000,
      storageGb: 50,
    },
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Plus',
    tagline: 'Maximum security, custom quotas, and 24/7 dedicated engineering SLA.',
    priceMonthly: 99,
    priceYearly: 950, // ~20% discount
    features: [
      'Unlimited team members',
      'Unlimited monthly API throughput',
      '500 GB cloud storage + S3 sync',
      '24/7 Dedicated Slack support & 99.99% SLA',
      'Single Sign-On (SAML / Okta / Azure AD)',
      'Unlimited immutable compliance audit log',
      'Custom invoice payment terms (NET-30)',
    ],
    limits: {
      seats: 999,
      apiCalls: 5000000,
      storageGb: 500,
    },
  },
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2028,
    holderName: 'Alex Morgan',
    isDefault: true,
  },
  {
    id: 'pm-2',
    brand: 'mastercard',
    last4: '8892',
    expMonth: 6,
    expYear: 2027,
    holderName: 'Nala Workspace Inc',
    isDefault: false,
  },
]

const mockInvoices: InvoiceItem[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-003',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    period: 'Aug 1, 2026 – Aug 31, 2026',
    planName: 'Pro Team (Monthly)',
    amount: 29.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-002',
    date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    period: 'Jul 1, 2026 – Jul 31, 2026',
    planName: 'Pro Team (Monthly)',
    amount: 29.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-001',
    date: new Date(Date.now() - 73 * 24 * 60 * 60 * 1000).toISOString(),
    period: 'Jun 1, 2026 – Jun 30, 2026',
    planName: 'Pro Team (Monthly)',
    amount: 29.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'Mastercard •••• 8892',
  },
  {
    id: 'inv-100',
    invoiceNumber: 'INV-2026-000',
    date: new Date(Date.now() - 104 * 24 * 60 * 60 * 1000).toISOString(),
    period: 'May 1, 2026 – May 31, 2026',
    planName: 'Starter Tier Trial',
    amount: 0.00,
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'Free Promotion',
  },
]

export const billingService = {
  /**
   * Fetch current billing overview and subscriptions
   */
  async getBillingOverview(): Promise<BillingOverview> {
    try {
      const res = await apiClient.get<ApiResponse<BillingOverview> | BillingOverview>('/billing/overview', { skipToast: true })
      return (res as ApiResponse<BillingOverview>).data || (res as BillingOverview)
    } catch {
      return {
        currentPlanId: 'plan-pro',
        interval: 'monthly',
        renewsAt: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        billingEmail: 'billing@nala.dev',
        companyName: 'Nala Global Technologies, Inc.',
        taxId: 'US-EIN-948201948',
        billingAddress: '548 Market St, Suite 29012, San Francisco, CA 94104',
        usage: {
          seatsUsed: 8,
          seatsMax: 15,
          apiCallsUsed: 142500,
          apiCallsMax: 250000,
          storageGbUsed: 18.4,
          storageGbMax: 50,
        },
        paymentMethods: [...mockPaymentMethods],
        plans: [...mockPlans],
      }
    }
  },

  /**
   * Fetch invoice history
   */
  async getInvoices(): Promise<InvoiceItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<InvoiceItem[]> | InvoiceItem[]>('/billing/invoices', { skipToast: true })
      return Array.isArray(res) ? res : (res as ApiResponse<InvoiceItem[]>).data || [...mockInvoices]
    } catch {
      return [...mockInvoices]
    }
  },

  /**
   * Switch subscription plan
   */
  async changePlan(planId: string, interval: BillingInterval): Promise<{ planId: string; interval: BillingInterval }> {
    try {
      const res = await apiClient.post<{ planId: string; interval: BillingInterval }>('/billing/plan', { planId, interval })
      return res
    } catch {
      return { planId, interval }
    }
  },

  /**
   * Add new payment method
   */
  async addPaymentMethod(payload: {
    brand: 'visa' | 'mastercard' | 'amex'
    last4: string
    expMonth: number
    expYear: number
    holderName: string
    isDefault?: boolean
  }): Promise<PaymentMethod> {
    try {
      const res = await apiClient.post<PaymentMethod>('/billing/payment-methods', payload)
      return res
    } catch (error) {
      if (import.meta.env.DEV) {
        const newPm: PaymentMethod = {
          id: `pm-${Date.now()}`,
          brand: payload.brand,
          last4: payload.last4,
          expMonth: payload.expMonth,
          expYear: payload.expYear,
          holderName: payload.holderName,
          isDefault: !!payload.isDefault,
        }
        if (newPm.isDefault) {
          mockPaymentMethods.forEach((pm) => (pm.isDefault = false))
        }
        mockPaymentMethods.push(newPm)
        return newPm
      }
      throw error
    }
  },

  /**
   * Remove payment method
   */
  async deletePaymentMethod(id: string): Promise<void> {
    try {
      await apiClient.delete(`/billing/payment-methods/${id}`)
    } catch (error) {
      if (import.meta.env.DEV) {
        const idx = mockPaymentMethods.findIndex((pm) => pm.id === id)
        if (idx !== -1) mockPaymentMethods.splice(idx, 1)
        return
      }
      throw error
    }
  },

  /**
   * Set payment method as default
   */
  async setDefaultPaymentMethod(id: string): Promise<void> {
    try {
      await apiClient.put(`/billing/payment-methods/${id}/default`)
    } catch (error) {
      if (import.meta.env.DEV) {
        mockPaymentMethods.forEach((pm) => {
          pm.isDefault = pm.id === id
        })
        return
      }
      throw error
    }
  },
}
