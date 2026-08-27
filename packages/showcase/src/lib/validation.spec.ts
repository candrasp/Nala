import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['Admin', 'Developer', 'Editor', 'Viewer']),
  status: z.enum(['Active', 'Pending', 'Suspended']),
  twoFactor: z.boolean().default(false),
})

describe('Form Validation Schemas (Zod)', () => {
  describe('loginSchema', () => {
    it('validates correct email and password', () => {
      const validData = {
        email: 'admin@nala.dev',
        password: 'password123',
      }
      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email formats', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
      }
      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address')
      }
    })

    it('rejects short passwords', () => {
      const shortPass = {
        email: 'admin@nala.dev',
        password: '123',
      }
      const result = loginSchema.safeParse(shortPass)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters')
      }
    })
  })

  describe('userFormSchema', () => {
    it('accepts valid user creation payload', () => {
      const validUser = {
        name: 'Olivia Martin',
        email: 'olivia@supabase.io',
        role: 'Admin',
        status: 'Active',
        twoFactor: true,
      }
      const result = userFormSchema.safeParse(validUser)
      expect(result.success).toBe(true)
    })

    it('rejects invalid role selection', () => {
      const invalidUser = {
        name: 'Olivia Martin',
        email: 'olivia@supabase.io',
        role: 'SuperMaster',
        status: 'Active',
        twoFactor: true,
      }
      const result = userFormSchema.safeParse(invalidUser)
      expect(result.success).toBe(false)
    })
  })
})
