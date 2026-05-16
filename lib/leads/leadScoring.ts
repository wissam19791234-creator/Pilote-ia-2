import type { LeadData, LeadScore } from '@/lib/resend/resendTypes'

const URGENT_DELAYS = ['immédiat', 'urgent', 'semaine', 'cette semaine', 'asap', 'rapidement', 'dès que possible']

function isUrgentDelay(delay?: string): boolean {
  if (!delay) return false
  const lower = delay.toLowerCase()
  return URGENT_DELAYS.some((d) => lower.includes(d))
}

function getSectorTag(sector: string): string {
  const s = sector.toLowerCase()
  if (s.includes('beauté') || s.includes('beauty') || s.includes('coiffure') || s.includes('esthétique')) return 'sector:beauty'
  if (s.includes('événementiel') || s.includes('event') || s.includes('mariage')) return 'sector:event'
  if (s.includes('restaurant') || s.includes('food') || s.includes('traiteur') || s.includes('café')) return 'sector:restaurant'
  if (s.includes('auto') || s.includes('voiture') || s.includes('garage') || s.includes('mécanique')) return 'sector:auto'
  if (s.includes('ecommerce') || s.includes('e-commerce') || s.includes('boutique') || s.includes('vente en ligne')) return 'sector:ecommerce'
  if (s.includes('immobilier') || s.includes('immo') || s.includes('real estate') || s.includes('agence')) return 'sector:realestate'
  if (s.includes('bien-être') || s.includes('wellness') || s.includes('spa') || s.includes('yoga') || s.includes('coach')) return 'sector:wellness'
  return 'sector:local-service'
}

function getNeedTag(needType: string): string | null {
  const n = needType.toLowerCase()
  if (n.includes('devis') || n.includes('quote')) return 'need:quote'
  if (n.includes('réservation') || n.includes('booking') || n.includes('rdv')) return 'need:booking'
  if (n.includes('whatsapp')) return 'need:whatsapp'
  if (n.includes('ecommerce') || n.includes('e-commerce') || n.includes('achat')) return 'need:ecommerce'
  if (n.includes('rappel') || n.includes('callback') || n.includes('appel')) return 'need:callback'
  return null
}

function getUrgencyTag(delay?: string): string {
  if (!delay) return 'urgency:low'
  const lower = delay.toLowerCase()
  if (URGENT_DELAYS.some((d) => lower.includes(d))) return 'urgency:high'
  if (lower.includes('mois') || lower.includes('bientôt') || lower.includes('prochainement')) return 'urgency:medium'
  return 'urgency:low'
}

export function calculateLeadScore(lead: LeadData): LeadScore {
  let score = 0

  // Email valide: +10
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(lead.email)) score += 10

  // Téléphone renseigné: +15
  if (lead.phone && lead.phone.trim().length > 0) score += 15

  // Budget renseigné: +20
  if (lead.budget && lead.budget.trim().length > 0) score += 20

  // Délai urgent: +20
  if (isUrgentDelay(lead.delay)) score += 20

  // Message > 50 chars: +15
  if (lead.message && lead.message.trim().length > 50) score += 15

  // Besoin précis (pas 'contact'): +15
  if (lead.needType && lead.needType.toLowerCase() !== 'contact') score += 15

  // Ville renseignée: +5
  if (lead.city && lead.city.trim().length > 0) score += 5

  // Clamp to 100
  score = Math.min(100, Math.max(0, score))

  // Level
  let level: 'cold' | 'warm' | 'hot'
  if (score >= 70) level = 'hot'
  else if (score >= 40) level = 'warm'
  else level = 'cold'

  // Tags
  const tags: string[] = []

  tags.push(getSectorTag(lead.sector))
  tags.push(`lead:${level}`)

  const needTag = getNeedTag(lead.needType)
  if (needTag) tags.push(needTag)

  tags.push(getUrgencyTag(lead.delay))
  tags.push('source:generated-site')
  tags.push('source:sitepilot-form')

  // Recommended action
  let recommendedAction: string
  if (level === 'hot') recommendedAction = "Répondre dans l'heure — proposer un appel"
  else if (level === 'warm') recommendedAction = 'Envoyer infos + relancer dans 24h'
  else recommendedAction = 'Demander plus d\'informations'

  return { score, level, tags, recommendedAction }
}
