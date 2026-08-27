import {
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatDate,
  formatDateTime,
  formatTime,
  formatDateTimeWithTz,
  formatRelativeTime,
  formatBytes,
  getInitials,
  truncate,
  type CurrencyFormatOptions,
  type DateTimeFormatOptions,
  type TimeOnlyFormatOptions,
  type TimeFormat,
} from '@/lib/formatters'

/**
 * Composable that exposes all data formatting utilities under a single object.
 *
 * Auto-imported via unplugin-auto-import — no explicit import needed in <script setup>.
 *
 * @example
 * // In any <script setup> — no import required
 * const fmt = useFormatter()
 *
 * fmt.currency(price)                               // uses VITE_DEFAULT_CURRENCY / VITE_DEFAULT_LOCALE
 * fmt.currency(price, { currency: 'EUR', locale: 'de-DE' })  // per-call override
 * fmt.date(row.createdAt)                           // "Aug 21, 2026"
 * fmt.date(row.createdAt, 'short')                  // "8/21/26"
 * fmt.relative(row.lastActive)                      // "5 minutes ago"
 * fmt.compact(revenue)                              // "2.4M"
 * fmt.bytes(file.size)                              // "4.5 MB"
 * fmt.initials(user.name)                           // "OM"
 * fmt.truncate(description, 60)                     // "This is a long des..."
 */
export function useFormatter() {
  return {
    /** Format value as localized currency. Defaults to VITE_DEFAULT_CURRENCY / VITE_DEFAULT_LOCALE */
    currency: (value: number | string | null | undefined, opts?: CurrencyFormatOptions) =>
      formatCurrency(value, opts),

    /** Format number with thousand separators */
    number: (value: number | string | null | undefined, locale?: string) =>
      formatNumber(value, locale),

    /** Format large numbers in compact notation (1.5K, 2.4M, 1.2B) */
    compact: (value: number | string | null | undefined, locale?: string) =>
      formatCompactNumber(value, locale),

    /** Format date-only: 'short' | 'medium' | 'long' | 'full' */
    date: (
      date: string | number | Date | null | undefined,
      style: 'short' | 'medium' | 'long' | 'full' = 'medium',
      locale?: string,
    ) => formatDate(date, style, locale),

    /** Format date + time together with 24h / 12h clock and timezone support */
    dateTime: (
      date: string | number | Date | null | undefined,
      options?: DateTimeFormatOptions | string,
    ) => formatDateTime(date, options),

    /**
     * Format time only (e.g. "14:30" or "02:30 PM") with 24h / 12h clock support
     * @example fmt.time(order.createdAt) => "14:30" (default 24h)
     * @example fmt.time(order.createdAt, { format: '12h' }) => "02:30 PM"
     * @example fmt.time(order.createdAt, { showSeconds: true }) => "14:30:00"
     */
    time: (
      date: string | number | Date | null | undefined,
      options?: TimeOnlyFormatOptions,
    ) => formatTime(date, options),

    /** Format as relative time: "5 minutes ago", "yesterday", "in 3 days" */
    relative: (date: string | number | Date | null | undefined, locale?: string) =>
      formatRelativeTime(date, locale),

    /** Format byte sizes into human-readable units (KB, MB, GB) with locale-aware decimal separator */
    bytes: (bytes: number | null | undefined, decimals?: number, locale?: string) =>
      formatBytes(bytes, decimals, locale),

    /**
     * Format date + time with explicit timezone and clock format
     * @param timeZone IANA tz: 'Asia/Jakarta' (WIB) | 'Asia/Makassar' (WITA) | 'Asia/Jayapura' (WIT)
     * @param format '24h' | '12h' | 'auto' (defaults to .env: '24h')
     * @example fmt.dateTimeWithTz(date, 'Asia/Jakarta', '24h') => "21 Agt 2026, 14.30"
     */
    dateTimeWithTz: (
      date: string | number | Date | null | undefined,
      timeZone?: string,
      format?: TimeFormat,
      locale?: string,
    ) => formatDateTimeWithTz(date, timeZone, format, locale),

    /** Extract 2-letter initials from a full name ("Olivia Martin" → "OM") */
    initials: (name: string | null | undefined) =>
      getInitials(name),

    /** Truncate long strings with ellipsis */
    truncate: (text: string | null | undefined, length?: number) =>
      truncate(text, length),
  }
}
