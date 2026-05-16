export type PlanId = 'free' | 'starter' | 'pro' | 'agency'

export interface Plan {
  id: PlanId
  name: string
  price: number
  monthlyCredits: number
  maxSitesPerMonth: number
  maxSavedProjects: number
  canExportHtml: boolean
  canExportZip: boolean
  canUseAiImages: boolean
  canUseVideoDemo: boolean
  canUseChatbot: boolean
  chatbotLevel: 'none' | 'simple' | 'advanced'
  canUseAutomations: boolean
  canUseSmartQuote: boolean
  canUseSalesPack: boolean
  canUseVariations: boolean
  watermark: boolean
  maxStyles: number
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated'
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    monthlyCredits: 2,
    maxSitesPerMonth: 1,
    maxSavedProjects: 1,
    canExportHtml: false,
    canExportZip: false,
    canUseAiImages: false,
    canUseVideoDemo: false,
    canUseChatbot: false,
    chatbotLevel: 'none',
    canUseAutomations: false,
    canUseSmartQuote: false,
    canUseSalesPack: false,
    canUseVariations: false,
    watermark: true,
    maxStyles: 3,
    supportLevel: 'community',
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 19,
    monthlyCredits: 20,
    maxSitesPerMonth: 5,
    maxSavedProjects: 5,
    canExportHtml: true,
    canExportZip: false,
    canUseAiImages: false,
    canUseVideoDemo: false,
    canUseChatbot: false,
    chatbotLevel: 'none',
    canUseAutomations: false,
    canUseSmartQuote: false,
    canUseSalesPack: false,
    canUseVariations: false,
    watermark: false,
    maxStyles: 5,
    supportLevel: 'email',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 39,
    monthlyCredits: 80,
    maxSitesPerMonth: 20,
    maxSavedProjects: 50,
    canExportHtml: true,
    canExportZip: true,
    canUseAiImages: true,
    canUseVideoDemo: true,
    canUseChatbot: true,
    chatbotLevel: 'simple',
    canUseAutomations: true,
    canUseSmartQuote: true,
    canUseSalesPack: true,
    canUseVariations: true,
    watermark: false,
    maxStyles: 12,
    supportLevel: 'priority',
  },
  agency: {
    id: 'agency',
    name: 'Agency',
    price: 79,
    monthlyCredits: 250,
    maxSitesPerMonth: 60,
    maxSavedProjects: -1,
    canExportHtml: true,
    canExportZip: true,
    canUseAiImages: true,
    canUseVideoDemo: true,
    canUseChatbot: true,
    chatbotLevel: 'advanced',
    canUseAutomations: true,
    canUseSmartQuote: true,
    canUseSalesPack: true,
    canUseVariations: true,
    watermark: false,
    maxStyles: 12,
    supportLevel: 'dedicated',
  },
}

const PLAN_KEY = 'sitepilot_plan'
const DEFAULT_PLAN: PlanId = 'free'

export function getCurrentPlanId(): PlanId {
  if (typeof window === 'undefined') return DEFAULT_PLAN
  try {
    const raw = localStorage.getItem(PLAN_KEY)
    if (raw && raw in PLANS) return raw as PlanId
    return DEFAULT_PLAN
  } catch {
    return DEFAULT_PLAN
  }
}

export function getCurrentPlan(): Plan {
  return PLANS[getCurrentPlanId()]
}

export function setCurrentPlan(id: PlanId): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(PLAN_KEY, id)
  } catch {
    // storage unavailable
  }
}
