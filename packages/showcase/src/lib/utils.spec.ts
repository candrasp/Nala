import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-blue-500')
    expect(result).toBe('px-2 py-1 bg-blue-500')
  })

  it('handles conditional class names', () => {
    const isActive = true
    const isDisabled = false
    const result = cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')
    expect(result).toBe('btn btn-active')
  })

  it('resolves tailwind class conflicts using tailwind-merge', () => {
    const result = cn('p-4', 'p-2', 'text-red-500', 'text-blue-500')
    expect(result).toBe('p-2 text-blue-500')
  })

  it('handles array and object inputs', () => {
    const result = cn(['base-class', 'extra-class'], { 'is-open': true, 'is-hidden': false })
    expect(result).toBe('base-class extra-class is-open')
  })
})
