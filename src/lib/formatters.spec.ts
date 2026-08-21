import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  formatCurrency,
  formatNumber,
  formatCompactNumber,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatBytes,
  getInitials,
  truncate,
} from './formatters'

describe('Formatters Utility', () => {
  describe('formatCurrency', () => {
    it('formats USD currency by default', () => {
      const result = formatCurrency(1250.5)
      expect(result).toBe('$1,250.50')
    })

    it('formats IDR without decimals by default', () => {
      const result = formatCurrency(50000, { currency: 'IDR', locale: 'id-ID' })
      expect(result.replace(/\s/g, ' ')).toMatch(/Rp\s?50\.000/)
    })

    it('handles null, undefined, empty, or invalid inputs safely', () => {
      expect(formatCurrency(null)).toBe('-')
      expect(formatCurrency(undefined)).toBe('-')
      expect(formatCurrency('')).toBe('-')
      expect(formatCurrency('not-a-number')).toBe('-')
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with thousand separators', () => {
      expect(formatNumber(1000000)).toBe('1,000,000')
      expect(formatNumber('4500.5')).toBe('4,500.5')
    })

    it('returns "-" for invalid numbers', () => {
      expect(formatNumber(null)).toBe('-')
      expect(formatNumber('invalid')).toBe('-')
    })
  })

  describe('formatCompactNumber', () => {
    it('formats large numbers into compact strings', () => {
      expect(formatCompactNumber(1500)).toBe('1.5K')
      expect(formatCompactNumber(2500000)).toBe('2.5M')
    })

    it('handles small numbers', () => {
      expect(formatCompactNumber(120)).toBe('120')
    })
  })

  describe('formatDate and formatDateTime', () => {
    it('formats dates into readable format', () => {
      const date = new Date('2026-08-21T07:00:00Z')
      expect(formatDate(date, 'medium')).toContain('2026')
      expect(formatDateTime(date)).toContain('2026')
    })

    it('returns "-" for invalid dates', () => {
      expect(formatDate(null)).toBe('-')
      expect(formatDate('invalid-date')).toBe('-')
      expect(formatDateTime(undefined)).toBe('-')
    })
  })

  describe('formatRelativeTime', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-08-21T12:00:00Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns "just now" for dates within 45 seconds', () => {
      const date = new Date('2026-08-21T11:59:30Z')
      expect(formatRelativeTime(date)).toBe('just now')
    })

    it('returns relative minutes, hours, or days', () => {
      const fiveMinsAgo = new Date('2026-08-21T11:55:00Z')
      expect(formatRelativeTime(fiveMinsAgo)).toBe('5 minutes ago')

      const twoHoursAgo = new Date('2026-08-21T10:00:00Z')
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
    })
  })

  describe('formatBytes', () => {
    it('formats bytes into KB, MB, GB accurately', () => {
      expect(formatBytes(0)).toBe('0 B')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1048576)).toBe('1 MB')
      expect(formatBytes(1073741824)).toBe('1 GB')
    })

    it('handles null/invalid bytes', () => {
      expect(formatBytes(null)).toBe('-')
      expect(formatBytes(undefined)).toBe('-')
    })
  })

  describe('getInitials', () => {
    it('extracts two letter initials from full names', () => {
      expect(getInitials('Olivia Martin')).toBe('OM')
      expect(getInitials('John')).toBe('JO')
      expect(getInitials('Alexander Graham Bell')).toBe('AB')
    })

    it('returns fallback NA for empty or invalid values', () => {
      expect(getInitials('')).toBe('NA')
      expect(getInitials(null)).toBe('NA')
      expect(getInitials(undefined)).toBe('NA')
    })
  })

  describe('truncate', () => {
    it('truncates text that exceeds maximum length', () => {
      expect(truncate('Hello world this is a test', 10)).toBe('Hello worl...')
    })

    it('keeps text untouched if below limit', () => {
      expect(truncate('Short', 10)).toBe('Short')
    })

    it('handles empty strings safely', () => {
      expect(truncate('')).toBe('')
      expect(truncate(null)).toBe('')
    })
  })
})
