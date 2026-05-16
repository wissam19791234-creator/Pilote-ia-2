import type { PromptAnalysis } from '@/types'

const SECTOR_PATTERNS: [RegExp, string][] = [
  [/beauté|spa|institut|esthét|coiffur|onglerie|manucure|maquillage/i, 'beauté'],
  [/événementiel|mariage|wedding|fête|anniversaire|séminaire|cocktail/i, 'événementiel'],
  [/restaurant|brasserie|café|bistro|traiteur|cuisine|gastronomie/i, 'restaurant'],
  [/auto|garage|voiture|véhicule|mécanique|carrosserie/i, 'automobile'],
  [/immobilier|agence immo|maison|appartement|location|vente bien/i, 'immobilier'],
  [/coaching|coach|accompagnement|développement personnel|formation/i, 'coaching'],
  [/e-commerce|boutique|shop|vente en ligne|produit|cosmétique|parfum|skincare/i, 'e-commerce'],
  [/fitness|salle de sport|musculation|yoga|pilates|gym/i, 'fitness'],
  [/médical|médecin|dentiste|kiné|ostéo|pharmacie|santé/i, 'médical'],
  [/hôtel|chambre|hébergement|gîte|airbnb/i, 'hôtellerie'],
  [/artisan|plombier|électricien|menuisier|peintre|maçon/i, 'artisan'],
  [/avocat|notaire|comptable|expert|conseil/i, 'service professionnel'],
]

const STYLE_PATTERNS: [RegExp, string][] = [
  [/luxe|premium|haut de gamme|prestige|élégant/i, 'luxe premium'],
  [/minimaliste|épuré|simple|clean|minimal/i, 'minimaliste'],
  [/moderne|contemporain|tendance/i, 'moderne'],
  [/chaleureux|convivial|traditionnel|rustique/i, 'chaleureux'],
  [/coloré|dynamique|fun|pop/i, 'coloré dynamique'],
]

const CITY_PATTERN = /\b(paris|lyon|marseille|bordeaux|toulouse|nantes|nice|strasbourg|montpellier|lille|rennes|grenoble|tours|france)\b/i

function detectSector(text: string): string {
  for (const [pattern, sector] of SECTOR_PATTERNS) {
    if (pattern.test(text)) return sector
  }
  return 'service local'
}

function detectStyle(text: string): string {
  for (const [pattern, style] of STYLE_PATTERNS) {
    if (pattern.test(text)) return style
  }
  return 'moderne'
}

function detectCity(text: string): string {
  const match = CITY_PATTERN.exec(text)
  return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase() : 'France'
}

function extractBusinessName(text: string, sector: string): string {
  const patterns = [
    /(?:pour|client|commerce)\s+["']?([A-ZÀ-Ü][^.,!?]{2,30})["']?/,
    /["']([A-ZÀ-Ü][^.,!?]{2,30})["']/,
    /([A-ZÀ-Ü][a-zà-ü]+(?:\s+[A-ZÀ-Ü][a-zà-ü]+){1,3})/,
  ]
  for (const p of patterns) {
    const m = p.exec(text)
    if (m) return m[1].trim()
  }
  // Fallback based on sector
  const defaults: Record<string, string> = {
    beauté: 'Belle & Zen Studio',
    événementiel: 'Events Premium',
    restaurant: 'Le Gourmet',
    automobile: 'Auto Premium',
    immobilier: 'Prestige Immo',
    coaching: 'Coach Excellence',
    'e-commerce': 'Maison Cosmétique',
    fitness: 'Fit Studio',
    médical: 'Cabinet Médical',
    hôtellerie: 'Hotel Prestige',
    artisan: 'Artisan Expert',
  }
  return defaults[sector] ?? 'Mon Commerce'
}

function inferServices(sector: string, text: string): string[] {
  const serviceMap: Record<string, string[]> = {
    beauté: ['Soins visage', 'Massage', 'Manucure', 'Épilation', 'Maquillage'],
    événementiel: ['Mariage', 'Anniversaire', 'Séminaire', 'Cocktail', 'Décoration'],
    restaurant: ['Menu du jour', 'À la carte', 'Brunch', 'Plats végétariens', 'Click & Collect'],
    automobile: ['Diagnostic', 'Entretien', 'Carrosserie', 'Révision', 'Réparation'],
    immobilier: ['Vente', 'Location', 'Estimation', 'Gestion locative', 'Investissement'],
    coaching: ['Coaching individuel', 'Ateliers groupe', 'Programme en ligne', 'Bilan', 'Suivi'],
    'e-commerce': ['Sérum', 'Crème hydratante', 'Routine skincare', 'Coffret cadeau', 'Soin visage'],
    fitness: ['Musculation', 'Cardio', 'Cours collectifs', 'Coach personnel', 'Nutrition'],
    artisan: ['Devis gratuit', 'Rénovation', 'Installation', 'Urgences', 'Entretien'],
  }
  return serviceMap[sector] ?? ['Service 1', 'Service 2', 'Service 3']
}

export function analyzePrompt(prompt: string): PromptAnalysis {
  const sector = detectSector(prompt)
  const style = detectStyle(prompt)
  const city = detectCity(prompt)
  const businessName = extractBusinessName(prompt, sector)
  const services = inferServices(sector, prompt)

  const needsEcommerce = /e-commerce|boutique|shop|vente en ligne|panier/i.test(prompt) || sector === 'e-commerce'
  const needsBooking = /réservation|rdv|rendez-vous|booking|calendrier/i.test(prompt)
  const needsQuote = /devis|estimation|tarif|prix|budget/i.test(prompt)
  const needsWhatsapp = /whatsapp|wa|messenger|chat/i.test(prompt)
  const needsAutomation = /auto|relance|email auto|crm|suivi/i.test(prompt) || needsEcommerce

  const words = prompt.trim().split(/\s+/).length
  const confidenceScore = Math.min(100, words * 8 + (city !== 'France' ? 20 : 0))

  const missingInfo: string[] = []
  if (city === 'France') missingInfo.push('ville du commerce')
  if (words < 5) missingInfo.push('description du commerce')
  if (!needsBooking && !needsQuote && !needsEcommerce) missingInfo.push("objectif principal (réservation, devis, vente)")

  const goalMap: Record<string, string> = {
    'e-commerce': 'vente en ligne',
    beauté: 'prise de rendez-vous',
    restaurant: 'réservation table',
    immobilier: 'estimation gratuite',
    coaching: 'appel découverte',
    événementiel: 'demande de devis',
  }

  return {
    businessName,
    sector,
    city,
    style,
    goal: goalMap[sector] ?? 'contact',
    targetAudience: 'Clients locaux',
    services,
    products: needsEcommerce ? services : [],
    needsEcommerce,
    needsBooking,
    needsQuote,
    needsWhatsapp,
    needsAutomation,
    confidenceScore,
    missingInfo,
  }
}
