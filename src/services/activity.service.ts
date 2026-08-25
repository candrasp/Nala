import { apiClient } from '@/lib/axios'
import type { ApiResponse } from './types'

export type ActivityCategory = 'auth' | 'security' | 'user' | 'system' | 'billing' | 'api'
export type ActivityStatus = 'success' | 'warning' | 'failed' | 'info'

export interface ActivityActor {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export interface ActivityLogItem {
  id: string
  action: string
  title: string
  description: string
  category: ActivityCategory
  status: ActivityStatus
  actor: ActivityActor
  target?: string
  ipAddress: string
  userAgent: string
  location: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface ActivityFilterParams {
  search?: string
  category?: string
  status?: string
  page?: number
  perPage?: number
}

// In-memory mock audit logs
const mockActivities: ActivityLogItem[] = [
  {
    id: 'act-101',
    action: 'user.login.success',
    title: 'Administrator Session Started',
    description: 'Successful authentication via SSO / OAuth2 provider with MFA token verification.',
    category: 'auth',
    status: 'success',
    actor: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
      role: 'Administrator',
    },
    target: 'Web Console Dashboard',
    ipAddress: '192.0.2.42',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    location: 'San Francisco, US',
    metadata: {
      authMethod: 'OAuth2 / Google Workspace',
      mfaType: 'TOTP Authenticator',
      sessionId: 'ses_98f2a1b0c9d8',
      responseCode: 200,
    },
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 mins ago
  },
  {
    id: 'act-102',
    action: 'api_key.created',
    title: 'Production API Secret Key Generated',
    description: 'Generated new scoped API access token `sb_live_edge_worker` with Read & Write permissions.',
    category: 'api',
    status: 'info',
    actor: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
      role: 'Administrator',
    },
    target: 'Key #sb_live_98a7b6c5',
    ipAddress: '192.0.2.42',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36',
    location: 'San Francisco, US',
    metadata: {
      keyPrefix: 'sb_live_',
      scope: 'Read & Write',
      expiresIn: '90 days',
      associatedService: 'Vercel Staging Worker',
    },
    createdAt: new Date(Date.now() - 34 * 60 * 1000).toISOString(), // 34 mins ago
  },
  {
    id: 'act-103',
    action: 'security.failed_login',
    title: 'Multiple Failed Login Attempts Detected',
    description: 'Brute force mitigation triggered after 5 consecutive failed password attempts on account `support@nala.dev`.',
    category: 'security',
    status: 'warning',
    actor: {
      id: 'usr-anon',
      name: 'Unrecognized Client',
      email: 'support@nala.dev',
      role: 'Guest / External',
    },
    target: 'Auth Endpoint `/auth/login`',
    ipAddress: '198.51.100.12',
    userAgent: 'Python-urllib/3.10 (Automated Probe)',
    location: 'Frankfurt, DE',
    metadata: {
      attemptCount: 5,
      mitigationAction: 'IP Throttled (15 min cooldown)',
      geoRiskScore: 'High (0.87)',
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: 'act-104',
    action: 'database.backup.success',
    title: 'PostgreSQL Automated Snapshot Exported',
    description: 'Daily point-in-time recovery backup completed and archived to encrypted AWS S3 storage.',
    category: 'system',
    status: 'success',
    actor: {
      id: 'sys-cron',
      name: 'System Orchestrator',
      email: 'cron-daemon@nala.internal',
      role: 'System Bot',
    },
    target: 'Cluster `db-primary-us-west`',
    ipAddress: '10.0.4.15',
    userAgent: 'pg_dump/16.2 (PostgreSQL Internal Client)',
    location: 'Oregon, US (Data Center)',
    metadata: {
      snapshotSize: '1.42 GB',
      compressionRatio: '3.8x',
      archiveChecksum: 'sha256:8f2a1b0c9d8e7f6a5b4c3d2e1f0',
      durationSeconds: 42,
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: 'act-105',
    action: 'user.created',
    title: 'New Member Invited to Workspace',
    description: 'Invited `sarah.connor@cyberdyne.io` with Developer access role.',
    category: 'user',
    status: 'success',
    actor: {
      id: 'usr-2',
      name: 'Sarah Connor',
      email: 'sarah.connor@cyberdyne.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'Developer',
    },
    target: 'Workspace #nala-main',
    ipAddress: '203.0.113.88',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/127.0.0.0 Safari/537.36',
    location: 'London, UK',
    metadata: {
      assignedRole: 'Developer',
      team: 'Core Engine',
      inviteChannel: 'Email Invite Link',
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
  },
  {
    id: 'act-106',
    action: 'role.permission.modified',
    title: 'Role Permissions Matrix Updated',
    description: 'Modified role `Support Specialist` to grant read-only access to customer transaction receipts.',
    category: 'security',
    status: 'info',
    actor: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
      role: 'Administrator',
    },
    target: 'Role `Support Specialist`',
    ipAddress: '192.0.2.42',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
    location: 'San Francisco, US',
    metadata: {
      previousPermissions: ['users.read', 'tickets.manage'],
      newPermissions: ['users.read', 'tickets.manage', 'billing.read_receipts'],
      reason: 'Support ticket resolution requirement',
    },
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
  },
  {
    id: 'act-107',
    action: 'billing.subscription.upgraded',
    title: 'Subscription Tier Upgraded to Enterprise Pro',
    description: 'Upgraded monthly billing seat capacity from 10 to 50 active engineering seats.',
    category: 'billing',
    status: 'success',
    actor: {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@nala.dev',
      avatar: '/img/avatar.webp',
      role: 'Administrator',
    },
    target: 'Stripe Customer `cus_NalaEnterprise_99`',
    ipAddress: '192.0.2.42',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/128.0.0.0 Safari/537.36',
    location: 'San Francisco, US',
    metadata: {
      invoiceId: 'in_1P8a9b2c3d4e5f6',
      amountPaid: 499.00,
      currency: 'USD',
      seatsAllocated: 50,
    },
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'act-108',
    action: 'webhook.delivery.failed',
    title: 'Customer Webhook Delivery Timeout',
    description: 'HTTP POST webhook delivery to `https://api.external-partner.com/events` timed out after 10,000ms (504 Gateway Timeout).',
    category: 'system',
    status: 'failed',
    actor: {
      id: 'sys-webhook',
      name: 'Webhook Dispatcher',
      email: 'webhook-worker@nala.internal',
      role: 'System Bot',
    },
    target: 'Webhook Endpoint #whk_88492019',
    ipAddress: '10.0.2.89',
    userAgent: 'Nala-Webhook-Agent/1.3.0',
    location: 'Virginia, US (Data Center)',
    metadata: {
      httpStatus: 504,
      retryCount: 3,
      payloadSize: '2.4 KB',
      errorMessage: 'Gateway Timeout (Connection timed out after 10002ms)',
    },
    createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(), // 1.3 days ago
  },
]

export const activityService = {
  /**
   * Fetch list of audit activities
   */
  async getActivities(_params?: ActivityFilterParams): Promise<ActivityLogItem[]> {
    try {
      const res = await apiClient.get<ApiResponse<ActivityLogItem[]> | ActivityLogItem[]>('/activity', { skipToast: true })
      return Array.isArray(res) ? res : res.data
    } catch (error) {
      if (import.meta.env.DEV) {
        return [...mockActivities]
      }
      throw error
    }
  },

  /**
   * Export activities in specified format
   */
  async exportActivities(format: 'json' | 'csv' = 'json'): Promise<string> {
    const activities = await this.getActivities()
    if (format === 'csv') {
      const headers = ['ID', 'Timestamp', 'Action', 'Title', 'Category', 'Status', 'Actor Name', 'Actor Email', 'IP Address', 'Location', 'Target']
      const rows = activities.map((a) => [
        a.id,
        a.createdAt,
        a.action,
        `"${a.title.replace(/"/g, '""')}"`,
        a.category,
        a.status,
        `"${a.actor.name}"`,
        a.actor.email,
        a.ipAddress,
        `"${a.location}"`,
        `"${a.target || ''}"`,
      ])
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    }
    return JSON.stringify(activities, null, 2)
  },
}
