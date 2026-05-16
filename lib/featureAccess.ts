import type { PlanId } from './plans'
import { getCurrentPlanId, PLANS } from './plans'

export type Feature =
  | 'generate_site'
  | 'export_html'
  | 'export_zip'
  | 'ai_images'
  | 'design_variations'
  | 'smart_quote'
  | 'automations'
  | 'sales_pack'
  | 'video_demo'
  | 'chatbot_simple'
  | 'chatbot_advanced'
  | 'mini_crm'
  | 'lead_dashboard'
  | 'remove_watermark'
  | 'save_project'
  | 'unlimited_projects'

// Plan order for comparison
const PLAN_ORDER: PlanId[] = ['free', 'starter', 'pro', 'agency']

const FEATURE_MIN_PLAN: Record<Feature, PlanId> = {
  generate_site: 'free',
  export_html: 'starter',
  export_zip: 'pro',
  ai_images: 'pro',
  design_variations: 'pro',
  smart_quote: 'pro',
  automations: 'pro',
  sales_pack: 'pro',
  video_demo: 'pro',
  chatbot_simple: 'pro',
  chatbot_advanced: 'agency',
  mini_crm: 'agency',
  lead_dashboard: 'agency',
  remove_watermark: 'starter',
  save_project: 'starter',
  unlimited_projects: 'agency',
}

const UPGRADE_MESSAGES: Record<Feature, string> = {
  generate_site:
    'Créez votre premier site web propulsé par l\'IA — c\'est gratuit !',
  export_html:
    'Exportez votre site en HTML et déployez-le où vous voulez. Passez au plan Starter pour débloquer cette fonctionnalité.',
  export_zip:
    'Téléchargez l\'intégralité de votre site en ZIP (HTML, CSS, JS, images). Disponible dès le plan Pro.',
  ai_images:
    'Générez des visuels professionnels sur mesure grâce à l\'IA. Débloquez cette fonctionnalité avec le plan Pro.',
  design_variations:
    'Obtenez jusqu\'à 12 variantes de design en un clic pour choisir celle qui convertit le mieux. Plan Pro requis.',
  smart_quote:
    'Intégrez un formulaire de devis intelligent et automatisé directement dans votre site. Disponible avec le plan Pro.',
  automations:
    'Automatisez vos relances, emails et WhatsApp pour ne jamais rater un prospect. Passez au plan Pro.',
  sales_pack:
    'Accédez au pack commercial complet : scripts de vente, objections-réponses, offres packagées. Plan Pro requis.',
  video_demo:
    'Générez une vidéo de présentation de votre site pour maximiser l\'impact client. Fonctionnalité Pro.',
  chatbot_simple:
    'Ajoutez un chatbot conversationnel à votre site pour capturer des leads 24h/24. Disponible avec le plan Pro.',
  chatbot_advanced:
    'Chatbot avancé avec lead scoring, CRM intégré et suivi multi-étapes. Réservé au plan Agency.',
  mini_crm:
    'Centralisez tous vos leads dans un mini-CRM intégré. Fonctionnalité exclusive du plan Agency.',
  lead_dashboard:
    'Visualisez et analysez vos leads en temps réel avec des tableaux de bord détaillés. Plan Agency uniquement.',
  remove_watermark:
    'Supprimez le filigrane SitePilot de votre site pour une image 100 % professionnelle. Passez au plan Starter.',
  save_project:
    'Sauvegardez vos projets et reprenez-les à tout moment. Disponible dès le plan Starter.',
  unlimited_projects:
    'Gérez un nombre illimité de projets clients sans aucune contrainte. Exclusivité du plan Agency.',
}

export function getRequiredPlan(feature: Feature): PlanId {
  return FEATURE_MIN_PLAN[feature]
}

export function canAccessFeature(planId: PlanId, feature: Feature): boolean {
  const requiredIndex = PLAN_ORDER.indexOf(FEATURE_MIN_PLAN[feature])
  const currentIndex = PLAN_ORDER.indexOf(planId)
  return currentIndex >= requiredIndex
}

export function canCurrentUserAccess(feature: Feature): boolean {
  return canAccessFeature(getCurrentPlanId(), feature)
}

export function getUpgradeMessage(feature: Feature): string {
  return UPGRADE_MESSAGES[feature]
}

export interface PlanLimitUsage {
  sitesGeneratedThisMonth?: number
  savedProjectsCount?: number
}

export interface PlanLimitResult {
  allowed: boolean
  message: string
}

export function enforcePlanLimit(planId: PlanId, usage: PlanLimitUsage): PlanLimitResult {
  const plan = PLANS[planId]

  if (
    usage.sitesGeneratedThisMonth !== undefined &&
    usage.sitesGeneratedThisMonth >= plan.maxSitesPerMonth
  ) {
    return {
      allowed: false,
      message: `Vous avez atteint la limite de ${plan.maxSitesPerMonth} site(s) généré(s) ce mois-ci avec le plan ${plan.name}. Passez à un plan supérieur pour continuer.`,
    }
  }

  if (
    usage.savedProjectsCount !== undefined &&
    plan.maxSavedProjects !== -1 &&
    usage.savedProjectsCount >= plan.maxSavedProjects
  ) {
    return {
      allowed: false,
      message: `Vous avez atteint la limite de ${plan.maxSavedProjects} projet(s) sauvegardé(s) avec le plan ${plan.name}. Passez au plan Agency pour des projets illimités.`,
    }
  }

  return { allowed: true, message: '' }
}
