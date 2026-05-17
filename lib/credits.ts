import type { Plan } from './plans'

export type CreditAction =
  | 'generate_site'
  | 'generate_site_ecommerce'
  | 'generate_site_ai_images'
  | 'generate_site_automations'
  | 'generate_video'
  | 'generate_variation'
  | 'chat_modify'
  | 'generate_ai_images'
  | 'export_zip'
  | 'generate_chatbot_simple'
  | 'generate_chatbot_advanced'
  | 'generate_sales_pack'

export const CREDIT_COSTS: Record<CreditAction, number> = {
  generate_site: 1,
  generate_site_ecommerce: 2,
  generate_site_ai_images: 2,
  generate_site_automations: 2,
  generate_video: 3,
  generate_variation: 1,
  chat_modify: 1,
  generate_ai_images: 1,
  export_zip: 1,
  generate_chatbot_simple: 1,
  generate_chatbot_advanced: 2,
  generate_sales_pack: 1,
}

export interface CreditHistoryEntry {
  id: string
  action: CreditAction
  amount: number
  reason: string
  timestamp: string
  balanceAfter: number
}

const CREDITS_KEY = 'sitepilot_credits'
const HISTORY_KEY = 'sitepilot_credit_history'
const INITIAL_CREDITS = 2

// ─── Internal helpers ────────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function appendHistory(entry: CreditHistoryEntry): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const history: CreditHistoryEntry[] = raw ? (JSON.parse(raw) as CreditHistoryEntry[]) : []
    history.unshift(entry)
    if (history.length > 100) history.length = 100
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // storage unavailable or JSON parse error — silently ignore
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getCredits(): number {
  if (typeof window === 'undefined') return INITIAL_CREDITS
  try {
    const raw = localStorage.getItem(CREDITS_KEY)
    if (raw === null) {
      localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS))
      return INITIAL_CREDITS
    }
    const parsed = parseInt(raw, 10)
    return isNaN(parsed) ? INITIAL_CREDITS : parsed
  } catch {
    return INITIAL_CREDITS
  }
}

export function setCredits(n: number): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CREDITS_KEY, String(n))
  } catch {
    // storage unavailable
  }
}

export function canAfford(action: CreditAction): boolean {
  return getCredits() >= CREDIT_COSTS[action]
}

export function consumeCredits(amount: number, action: CreditAction): boolean {
  if (typeof window === 'undefined') return false
  try {
    const current = getCredits()
    if (current < amount) return false
    const newBalance = current - amount
    setCredits(newBalance)
    appendHistory({
      id: generateId(),
      action,
      amount: -amount,
      reason: `Consommation : ${action}`,
      timestamp: new Date().toISOString(),
      balanceAfter: newBalance,
    })
    return true
  } catch {
    return false
  }
}

export function addCredits(amount: number, reason = 'Ajout de crédits'): void {
  if (typeof window === 'undefined') return
  try {
    const current = getCredits()
    const newBalance = current + amount
    setCredits(newBalance)
    appendHistory({
      id: generateId(),
      action: 'generate_site',
      amount,
      reason,
      timestamp: new Date().toISOString(),
      balanceAfter: newBalance,
    })
  } catch {
    // storage unavailable
  }
}

export function getCreditHistory(): CreditHistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CreditHistoryEntry[]
  } catch {
    return []
  }
}

export function resetMonthlyCredits(plan: Plan): void {
  if (typeof window === 'undefined') return
  try {
    setCredits(plan.monthlyCredits)
    appendHistory({
      id: generateId(),
      action: 'generate_site',
      amount: plan.monthlyCredits,
      reason: `Renouvellement mensuel — plan ${plan.name}`,
      timestamp: new Date().toISOString(),
      balanceAfter: plan.monthlyCredits,
    })
  } catch {
    // storage unavailable
  }
}

/**
 * Compatibilité ascendante avec l'ancien code qui appelait consumeCredit().
 * Consomme 5 crédits (coût de generate_site).
 */
export function consumeCredit(): boolean {
  return consumeCredits(CREDIT_COSTS['generate_site'], 'generate_site')
}

export function resetCredits(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CREDITS_KEY, String(INITIAL_CREDITS))
  } catch {
    // storage unavailable
  }
}
