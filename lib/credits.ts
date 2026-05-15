const CREDITS_KEY = 'sitepilot_credits'
const INITIAL_CREDITS = 12

export function getCredits(): number {
  if (typeof window === 'undefined') return INITIAL_CREDITS
  try {
    const raw = localStorage.getItem(CREDITS_KEY)
    if (raw === null) {
      localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS))
      return INITIAL_CREDITS
    }
    return parseInt(raw, 10)
  } catch {
    return INITIAL_CREDITS
  }
}

export function consumeCredit(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const current = getCredits()
    if (current <= 0) return false
    localStorage.setItem(CREDITS_KEY, String(current - 1))
    return true
  } catch {
    return false
  }
}

export function addCredits(amount: number): void {
  if (typeof window === 'undefined') return
  try {
    const current = getCredits()
    localStorage.setItem(CREDITS_KEY, String(current + amount))
  } catch {
    // storage unavailable
  }
}

export function resetCredits(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS))
  } catch {
    // storage unavailable
  }
}
