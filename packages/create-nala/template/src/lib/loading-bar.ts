import { ref } from 'vue'

export interface LoadingBarState {
  progress: number
  status: 'idle' | 'loading' | 'success' | 'error'
  visible: boolean
}

const progress = ref(0)
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const visible = ref(false)

let timer: ReturnType<typeof setInterval> | null = null
let activeRequests = 0

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/**
 * Global Top Loading Bar Controller
 * Supports multi-request counting and automatic micro-increments.
 */
export const loadingBar = {
  progress,
  status,
  visible,

  /**
   * Start or increment progress
   */
  start() {
    activeRequests++
    if (activeRequests > 1) return

    clearTimer()
    status.value = 'loading'
    visible.value = true
    progress.value = 10

    timer = setInterval(() => {
      if (progress.value < 85) {
        // Slow down as progress approaches 85%
        const inc = Math.max(1, (90 - progress.value) / 10)
        progress.value = Math.min(85, progress.value + inc)
      }
    }, 150)
  },

  /**
   * Finish loading with a smooth transition to 100%
   */
  finish() {
    activeRequests = Math.max(0, activeRequests - 1)
    if (activeRequests > 0) return

    clearTimer()
    progress.value = 100
    status.value = 'success'

    setTimeout(() => {
      visible.value = false
      setTimeout(() => {
        progress.value = 0
        status.value = 'idle'
      }, 200)
    }, 300)
  },

  /**
   * Fail loading bar with an error state (red bar)
   */
  fail() {
    activeRequests = Math.max(0, activeRequests - 1)
    if (activeRequests > 0) return

    clearTimer()
    progress.value = 100
    status.value = 'error'

    setTimeout(() => {
      visible.value = false
      setTimeout(() => {
        progress.value = 0
        status.value = 'idle'
      }, 200)
    }, 400)
  },

  /**
   * Force reset loading bar
   */
  reset() {
    activeRequests = 0
    clearTimer()
    visible.value = false
    progress.value = 0
    status.value = 'idle'
  },
}
