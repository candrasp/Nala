/**
 * Enterprise Data Formatting Utilities
 * Uses native browser Intl APIs for optimal performance without external libraries.
 *
 * Global defaults can be configured via environment variables:
 * - VITE_DEFAULT_LOCALE  (e.g. "en-US", "id-ID", "de-DE") → default: "en-US"
 * - VITE_DEFAULT_CURRENCY (e.g. "USD", "IDR", "EUR")      → default: "USD"
 */

/** Global locale — override via VITE_DEFAULT_LOCALE in .env */
const DEFAULT_LOCALE: string = import.meta.env.VITE_DEFAULT_LOCALE ?? 'en-US'

/** Global currency — override via VITE_DEFAULT_CURRENCY in .env */
const DEFAULT_CURRENCY: string = import.meta.env.VITE_DEFAULT_CURRENCY ?? 'USD'

/** Global timezone — override via VITE_DEFAULT_TIMEZONE in .env (e.g. "Asia/Jakarta") */
const DEFAULT_TIMEZONE: string = import.meta.env.VITE_DEFAULT_TIMEZONE ?? 'Asia/Jakarta'

/** Global time format — override via VITE_DEFAULT_TIME_FORMAT in .env ('24h' | '12h' | 'auto') */
export type TimeFormat = '24h' | '12h' | 'auto'
const DEFAULT_TIME_FORMAT: TimeFormat = (import.meta.env.VITE_DEFAULT_TIME_FORMAT as TimeFormat) ?? '24h'

export interface CurrencyFormatOptions {
  currency?: string
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export interface DateTimeFormatOptions {
  locale?: string
  timeZone?: string
  format?: TimeFormat
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  timeStyle?: 'short' | 'medium' | 'long'
  showSeconds?: boolean
}

export interface TimeOnlyFormatOptions {
  locale?: string
  timeZone?: string
  format?: TimeFormat
  showSeconds?: boolean
}

/**
 * Format numeric value to localized currency
 * @example formatCurrency(1500, { currency: 'USD' }) => "$1,500.00"
 * @example formatCurrency(50000, { currency: 'IDR', locale: 'id-ID' }) => "Rp 50.000"
 */
export function formatCurrency(
  value: number | string | null | undefined,
  options: CurrencyFormatOptions = {},
): string {
  if (value === null || value === undefined || value === '') return '-'
  const numeric = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(numeric)) return '-'

  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    minimumFractionDigits = currency === 'IDR' ? 0 : 2,
    maximumFractionDigits = currency === 'IDR' ? 0 : 2,
  } = options

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(numeric)
  } catch {
    return `${currency} ${numeric.toLocaleString()}`
  }
}

/**
 * Format numeric value with thousands separators
 * @example formatNumber(1250000) => "1,250,000"
 */
export function formatNumber(
  value: number | string | null | undefined,
  locale = DEFAULT_LOCALE,
): string {
  if (value === null || value === undefined || value === '') return '-'
  const numeric = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(numeric)) return '-'

  return new Intl.NumberFormat(locale).format(numeric)
}

/**
 * Format large numbers to compact notation (e.g., 1.5K, 2.4M)
 * @example formatCompactNumber(15400) => "15.4K"
 */
export function formatCompactNumber(
  value: number | string | null | undefined,
  locale = DEFAULT_LOCALE,
): string {
  if (value === null || value === undefined || value === '') return '-'
  const numeric = typeof value === 'string' ? Number(value) : value
  if (Number.isNaN(numeric)) return '-'

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(numeric)
}

/**
 * Format date string / Date object to localized readable string
 * @example formatDate('2026-08-21T07:00:00Z') => "Aug 21, 2026"
 * @example formatDate('2026-08-21', 'full') => "Friday, August 21, 2026"
 */
export function formatDate(
  date: string | number | Date | null | undefined,
  style: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale = DEFAULT_LOCALE,
): string {
  if (!date) return '-'
  const parsedDate = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return '-'

  const dateStyleMap: Record<'short' | 'medium' | 'long' | 'full', Intl.DateTimeFormatOptions['dateStyle']> = {
    short: 'short',
    medium: 'medium',
    long: 'long',
    full: 'full',
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: dateStyleMap[style],
  }).format(parsedDate)
}

/**
 * Helper to resolve hour12 boolean from '24h' | '12h' | 'auto'
 */
function resolveHour12(format: TimeFormat = DEFAULT_TIME_FORMAT): boolean | undefined {
  if (format === '24h') return false
  if (format === '12h') return true
  return undefined // auto: browser locale determines 12h/24h
}

/**
 * Format date to include time string with timezone and 24h/12h clock support
 * @example formatDateTime('2026-08-21T07:30:00Z') => "Aug 21, 2026, 14:30" (if 24h & WIB)
 * @example formatDateTime(date, { format: '12h' }) => "Aug 21, 2026, 02:30 PM"
 */
export function formatDateTime(
  date: string | number | Date | null | undefined,
  options: DateTimeFormatOptions | string = {},
): string {
  if (!date) return '-'
  const parsedDate = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return '-'

  const opts: DateTimeFormatOptions = typeof options === 'string' ? { locale: options } : options
  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIMEZONE,
    format = DEFAULT_TIME_FORMAT,
    dateStyle = 'medium',
    timeStyle = 'short',
  } = opts

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    timeZone,
    hour12: resolveHour12(format),
  }).format(parsedDate)
}

/**
 * Format time only (without date) with 24h / 12h clock support
 * @example formatTime('2026-08-21T07:30:00Z') => "14:30" (if 24h & WIB)
 * @example formatTime('2026-08-21T07:30:00Z', { format: '12h' }) => "02:30 PM"
 * @example formatTime('2026-08-21T07:30:00Z', { showSeconds: true }) => "14:30:00"
 */
export function formatTime(
  date: string | number | Date | null | undefined,
  options: TimeOnlyFormatOptions = {},
): string {
  if (!date) return '-'
  const parsedDate = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return '-'

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIMEZONE,
    format = DEFAULT_TIME_FORMAT,
    showSeconds = false,
  } = options

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds ? { second: '2-digit' } : {}),
    timeZone,
    hour12: resolveHour12(format),
  }).format(parsedDate)
}

/**
 * Format relative time (e.g. "5 minutes ago", "in 2 hours", "kemarin")
 * Fully locale-aware including the "just now" / "baru saja" fallback phrase.
 */
export function formatRelativeTime(
  date: string | number | Date | null | undefined,
  locale = DEFAULT_LOCALE,
): string {
  if (!date) return '-'
  const parsedDate = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return '-'

  const diffInSeconds = Math.round((parsedDate.getTime() - Date.now()) / 1000)
  const absDiff = Math.abs(diffInSeconds)

  // Locale-aware "just now" phrase map — add more locales as needed
  const justNowPhrases: Record<string, string> = {
    'id-ID': 'baru saja',
    'id':    'baru saja',
    'de-DE': 'gerade eben',
    'fr-FR': "à l'instant",
    'ja-JP': 'たった今',
    'zh-CN': '刚才',
  }
  const justNow = justNowPhrases[locale] ?? 'just now'

  if (absDiff < 45) return justNow

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const intervals = [
    { unit: 'year',   seconds: 31536000 },
    { unit: 'month',  seconds: 2592000  },
    { unit: 'week',   seconds: 604800   },
    { unit: 'day',    seconds: 86400    },
    { unit: 'hour',   seconds: 3600     },
    { unit: 'minute', seconds: 60       },
  ] as const

  for (const { unit, seconds } of intervals) {
    if (absDiff >= seconds) {
      const delta = Math.round(diffInSeconds / seconds)
      return rtf.format(delta, unit)
    }
  }

  return justNow
}

/**
 * Format raw bytes into human-readable data units (KB, MB, GB)
 * Uses locale-aware decimal separator (e.g. "1,5 MB" for id-ID, "1.5 MB" for en-US)
 * @example formatBytes(1048576) => "1 MB"
 * @example formatBytes(1536, 1, 'id-ID') => "1,5 KB"
 */
export function formatBytes(
  bytes: number | null | undefined,
  decimals = 2,
  locale = DEFAULT_LOCALE,
): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return '-'
  if (bytes === 0) return '0 B'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: dm,
  }).format(value)

  return `${formatted} ${sizes[i]}`
}

/**
 * Format date with time and explicit timezone (important for Indonesia: WIB/WITA/WIT)
 * @param timeZone IANA timezone string. Indonesia: 'Asia/Jakarta' (WIB), 'Asia/Makassar' (WITA), 'Asia/Jayapura' (WIT)
 * @example formatDateTimeWithTz(date, 'Asia/Jakarta', '24h') => "21 Agt 2026, 14.30"
 */
export function formatDateTimeWithTz(
  date: string | number | Date | null | undefined,
  timeZone: string = DEFAULT_TIMEZONE,
  format: TimeFormat = DEFAULT_TIME_FORMAT,
  locale = DEFAULT_LOCALE,
): string {
  if (!date) return '-'
  const parsedDate = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return '-'

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
    hour12: resolveHour12(format),
  }).format(parsedDate)
}

/**
 * Get 2-letter uppercase initials from a full name (safe for Avatar fallback)
 * @example getInitials("Olivia Martin") => "OM"
 * @example getInitials("John") => "JO"
 */
export function getInitials(name?: string | null): string {
  if (!name || typeof name !== 'string') return 'NA'
  const trimmed = name.trim()
  if (!trimmed) return 'NA'

  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Truncate long strings with ellipsis
 * @example truncate("This is a very long text", 10) => "This is a..."
 */
export function truncate(text: string | null | undefined, length = 30): string {
  if (!text) return ''
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}
