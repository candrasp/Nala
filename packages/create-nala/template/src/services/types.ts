/**
 * Common API Response & Request Types
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data: T
}

export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiError {
  statusCode: number
  message: string
  error?: string
  details?: Record<string, string[]>
}
