import type {
  GeneratedProject,
  DesignSystem,
  GeneratedPage,
  GeneratedSection,
  FAQItem,
  Testimonial,
  GeneratedFile,
} from '@/types'
import { buildAutomationSalesModule } from '@/lib/automationOptions'

// ─── Sector detection ────────────────────────────────────────────────────────

function detectSector(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/beauté|coiffeur|coiffure|esthétique|spa|bien.être|massage|onglerie|nail|beauty|salon/.test(p)) return 'beauté'
  if (/restaurant|café|cafe|brasserie|pizzeria|gastronomie|traiteur|cuisine|chef|bistro/.test(p)) return 'restaurant'
  if (/mariage|événementiel|evenement|event|wedding|photographe|photo/.test(p)) return 'événementiel'
  if (/automobile|garage|carrosserie|détailing|detailing|auto|voiture|mécanique/.test(p)) return 'automobile'
  if (/boutique|mode|prêt.à.porter|accessoires|fashion|vêtement|vetement/.test(p)) return 'mode'
  if (/parfum|cosmétique|cosmetique|luxe|luxury|premium|haut.de.gamme/.test(p)) return 'luxe'
  if (/immobilier|agence immobilière|logement|appartement|maison/.test(p)) return 'immobilier'
  if (/coach|coaching|formation|consultant|consulting|formateur/.test(p)) return 'coaching'
  if (/ostéopathe|kiné|kinesitherapie|dentiste|médecin|médical|santé/.test(p)) return 'médical'
  if (/fitness|sport|salle de sport|coach sportif|gym|musculation/.test(p)) return 'fitness'
  if (/hôtel|hotel|gîte|gite|chambre|hébergement/.test(p)) return 'hôtellerie'
  if (/e.commerce|ecommerce|dropshipping|shopify|boutique en ligne|vente en ligne/.test(p)) return 'e-commerce'
  if (/artisan|plombier|électricien|menuisier|bâtiment|renovation|peintre/.test(p)) return 'artisan'
  return 'general'
}

function detectStyle(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/luxe|premium|haut.de.gamme|élégant|elegant|raffiné|raffine/.test(p)) return 'luxe'
  if (/minimaliste|épuré|epure|simple|clean/.test(p)) return 'minimaliste'
  if (/coloré|colore|vibrant|dynamique|moderne/.test(p)) return 'coloré'
  if (/féminin|feminin|doux|romantique|rose/.test(p)) return 'féminin'
  if (/naturel|bio|éco|eco|organique/.test(p)) return 'naturel'
  if (/futuriste|tech|digital|technologie/.test(p)) return 'futuriste'
  if (/chaleureux|convivial|local|rustique/.test(p)) return 'chaleureux'
  return 'moderne'
}

function detectGoal(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/devis|devis auto/.test(p)) return 'devis'
  if (/réservation|reservation|rdv|rendez.vous/.test(p)) return 'réservation'
  if (/appel|téléphone|rappel|call/.test(p)) return 'appel'
  if (/whatsapp/.test(p)) return 'whatsapp'
  if (/vente en ligne|boutique|shopify|e.commerce/.test(p)) return 'ecommerce'
  return 'contact'
}

function detectCity(prompt: string): string {
  const cities = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
    'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Toulon', 'Grenoble',
    'Dijon', 'Angers', 'Nîmes', 'Aix-en-Provence', 'Brest', 'Le Mans',
  ]
  for (const city of cities) {
    if (prompt.toLowerCase().includes(city.toLowerCase())) return city
  }
  return 'France'
}

function detectAutomations(prompt: string): string[] {
  const p = prompt.toLowerCase()
  const automations: string[] = []
  if (/devis auto|formulaire intelligent/.test(p)) automations.push('Devis automatique')
  if (/chatbot|chat bot/.test(p)) automations.push('Chatbot IA')
  if (/whatsapp/.test(p)) automations.push('WhatsApp Business')
  if (/instagram|dm/.test(p)) automations.push('Instagram DM Auto')
  if (/email auto|relance/.test(p)) automations.push('Email automatisé')
  if (/crm|scoring/.test(p)) automations.push('CRM intelligent')
  if (/paiement/.test(p)) automations.push('Paiement en ligne')
  return automations
}

function detectEcommerce(prompt: string): string[] {
  const p = prompt.toLowerCase()
  if (!/vente en ligne|boutique|shopify|e.commerce|dropshipping/.test(p)) return []
  return ['Catalogue produits', 'Panier d\'achat', 'Paiement sécurisé', 'Livraison tracking']
}

function detectBusinessName(prompt: string, sector: string): string {
  const words = prompt.split(' ').filter((w) => w.length > 3 && /^[A-Z]/.test(w))
  if (words.length > 0) return words[0]
  const defaults: Record<string, string> = {
    beauté: 'Beauty Studio',
    restaurant: 'Le Gourmet',
    événementiel: 'Prestige Events',
    automobile: 'AutoPremium',
    mode: 'Fashion House',
    luxe: 'Maison de Luxe',
    immobilier: 'Immo Premium',
    coaching: 'Coach Excellence',
    médical: 'Cabinet Santé',
    fitness: 'FitLife Studio',
    hôtellerie: 'Maison d\'Hôtes',
    'e-commerce': 'Boutique Online',
    artisan: 'Artisan Expert',
    general: 'Business Pro',
  }
  return defaults[sector] ?? 'Business Pro'
}

// ─── Design system by sector ─────────────────────────────────────────────────

function getDesignSystem(sector: string, style: string): DesignSystem {
  const palettes: Record<string, DesignSystem['palette']> = {
    beauté: { background: '#fdf8f3', surface: '#fff4ea', primary: '#c9956a', secondary: '#e8c4a0', accent: '#8b6f5e', text: '#2d1b0e', muted: '#8b7355' },
    événementiel: { background: '#1a1225', surface: '#241830', primary: '#d4af37', secondary: '#9b59b6', accent: '#ff69b4', text: '#ffffff', muted: '#a89bc0' },
    restaurant: { background: '#fdf6ec', surface: '#fff8f0', primary: '#c0392b', secondary: '#e67e22', accent: '#27ae60', text: '#2c1a0e', muted: '#8b6555' },
    luxe: { background: '#0d0d0d', surface: '#1a1a1a', primary: '#d4af37', secondary: '#c0a080', accent: '#ff69b4', text: '#ffffff', muted: '#a0947a' },
    automobile: { background: '#1a1a2e', surface: '#16213e', primary: '#e74c3c', secondary: '#95a5a6', accent: '#3498db', text: '#ffffff', muted: '#7f8c8d' },
    immobilier: { background: '#f8f9fa', surface: '#ffffff', primary: '#2c3e50', secondary: '#d4af37', accent: '#3498db', text: '#1a1a2e', muted: '#6c757d' },
    coaching: { background: '#f0f4ff', surface: '#ffffff', primary: '#4f8cff', secondary: '#8b5cf6', accent: '#55c47a', text: '#1a1a2e', muted: '#6b7280' },
    fitness: { background: '#0f172a', surface: '#1e293b', primary: '#f97316', secondary: '#fb923c', accent: '#22d3ee', text: '#ffffff', muted: '#94a3b8' },
    mode: { background: '#fafafa', surface: '#ffffff', primary: '#1a1a1a', secondary: '#d4af37', accent: '#ff69b4', text: '#1a1a1a', muted: '#6b7280' },
    hôtellerie: { background: '#fdf8f0', surface: '#ffffff', primary: '#8b6914', secondary: '#d4af37', accent: '#27ae60', text: '#2c1a0e', muted: '#8b7355' },
    médical: { background: '#f0f9ff', surface: '#ffffff', primary: '#0284c7', secondary: '#38bdf8', accent: '#10b981', text: '#0c1a2e', muted: '#6b7280' },
    'e-commerce': { background: '#fffaf3', surface: '#ffffff', primary: '#ff5a1f', secondary: '#ff4fb8', accent: '#8b5cf6', text: '#171717', muted: '#6b625b' },
    artisan: { background: '#fdf6ec', surface: '#ffffff', primary: '#92400e', secondary: '#d97706', accent: '#65a30d', text: '#1c1003', muted: '#78716c' },
    general: { background: '#fffaf3', surface: '#fff8ee', primary: '#ff5a1f', secondary: '#ff4fb8', accent: '#8b5cf6', text: '#171717', muted: '#6b625b' },
  }

  const palette = palettes[sector] ?? palettes.general

  if (style === 'luxe') {
    palette.background = '#0d0d0d'
    palette.primary = '#d4af37'
    palette.text = '#ffffff'
  }

  return {
    palette,
    mood: style,
    typography: sector === 'luxe' || style === 'luxe' ? 'Playfair Display, serif' : 'Syne, sans-serif',
    buttonStyle: style === 'minimaliste' ? 'outlined' : 'gradient',
    cardStyle: style === 'luxe' ? 'dark-glass' : 'white-shadow',
  }
}

// ─── Services by sector ───────────────────────────────────────────────────────

function getServices(sector: string): string[] {
  const map: Record<string, string[]> = {
    beauté: ['Coupe & Brushing', 'Coloration', 'Soins visage', 'Manucure & Pédicure', 'Épilation', 'Massage relaxant'],
    restaurant: ['Menu du jour', 'À la carte', 'Brunch du dimanche', 'Privatisation', 'Livraison', 'Click & Collect'],
    événementiel: ['Organisation mariage', 'Décoration florale', 'Animation soirée', 'Photographie', 'Traiteur', 'Location salle'],
    automobile: ['Entretien & révision', 'Carrosserie', 'Détailing intérieur', 'Polissage', 'Vitres teintées', 'Préparation vente'],
    mode: ['Prêt-à-porter femme', 'Prêt-à-porter homme', 'Accessoires', 'Retouches', 'Personal shopping', 'Créations sur-mesure'],
    luxe: ['Parfums exclusifs', 'Cosmétiques premium', 'Conseils beauté', 'Coffrets cadeaux', 'Click & Collect', 'Livraison express'],
    immobilier: ['Achat & vente', 'Location longue durée', 'Gestion locative', 'Estimation gratuite', 'Investissement', 'Conseils fiscaux'],
    coaching: ['Coaching individuel', 'Ateliers collectifs', 'Formation en ligne', 'Audit stratégique', 'Suivi mensuel', 'Masterclass'],
    médical: ['Consultation', 'Bilan complet', 'Suivi patient', 'Téléconsultation', 'Urgences', 'Prévention'],
    fitness: ['Coaching personnalisé', 'Cours collectifs', 'Nutrition sportive', 'Bilan forme', 'Programme en ligne', 'Suivi résultats'],
    hôtellerie: ['Chambres & suites', 'Petit-déjeuner', 'Table d\'hôtes', 'Spa & bien-être', 'Activités nature', 'Séminaires'],
    'e-commerce': ['Livraison rapide', 'Retours gratuits', 'Service client 7j/7', 'Paiement sécurisé', 'Programme fidélité', 'Ventes flash'],
    artisan: ['Diagnostic gratuit', 'Devis sans engagement', 'Intervention express', 'Garantie travaux', 'Matériaux premium', 'Suivi chantier'],
    general: ['Consultation gratuite', 'Service premium', 'Suivi personnalisé', 'Garantie satisfait', 'Support 7j/7', 'Devis rapide'],
  }
  return map[sector] ?? map.general
}

function getPainPoints(sector: string): string[] {
  const map: Record<string, string[]> = {
    beauté: ['Agenda toujours complet et pas de rappels automatiques', 'Des clients qui ne reviennent pas après la première visite', 'Aucun système pour fidéliser et relancer les clientes'],
    restaurant: ['Des tables vides en semaine malgré une bonne cuisine', 'Pas de système de réservation en ligne fonctionnel', 'Aucune stratégie pour fidéliser les clients réguliers'],
    événementiel: ['Des demandes de devis sans suite ni suivi automatique', 'Difficulté à showcaser vos réalisations passées', 'Pas de page qui présente clairement vos offres et tarifs'],
    automobile: ['Des clients qui comparent les prix sans venir vous voir', 'Aucun système de rappel pour les entretiens annuels', 'Pas de présence en ligne professionnelle pour rassurer'],
    mode: ['Une boutique physique limitée par sa zone géographique', 'Pas de vente en ligne pour toucher plus de clients', 'Aucune stratégie de fidélisation des acheteuses'],
    coaching: ['Des prospects qui disparaissent après le premier contact', 'Pas de funnel de vente automatisé pour votre offre', 'Difficulté à démontrer votre valeur avant la vente'],
    général: ['Pas de présence en ligne qui convertit vraiment', 'Des prospects perdus faute de suivi automatique', 'Aucun système pour générer des devis rapidement'],
  }
  return map[sector] ?? map['général'] ?? ['Pas de présence en ligne', 'Prospects non suivis', 'Pas de système de devis']
}

function getFAQ(sector: string, businessName: string): FAQItem[] {
  const base: FAQItem[] = [
    { question: `Quels sont vos horaires d'ouverture ?`, answer: `Nous sommes ouverts du lundi au samedi de 9h à 19h. Contactez-nous pour un rendez-vous en dehors de ces horaires.` },
    { question: `Comment prendre rendez-vous ?`, answer: `Vous pouvez réserver directement via notre formulaire en ligne, par téléphone ou par WhatsApp. Réponse garantie sous 2h.` },
    { question: `Proposez-vous des devis gratuits ?`, answer: `Oui, tous nos devis sont gratuits et sans engagement. Décrivez votre projet et nous vous répondons sous 24h.` },
    { question: `Quels modes de paiement acceptez-vous ?`, answer: `Nous acceptons les paiements par carte bancaire, virement, espèces et PayPal. Un acompte de 30% est requis à la réservation.` },
    { question: `Êtes-vous disponibles en urgence ?`, answer: `Selon disponibilités, nous pouvons traiter les demandes urgentes. Contactez-nous directement par téléphone pour toute urgence.` },
    { question: `Avez-vous des avis clients vérifiés ?`, answer: `${businessName} est noté 4.9/5 sur Google avec plus de 50 avis. Tous nos avis sont authentiques et vérifiés par Google.` },
  ]
  return base
}

function getTestimonials(sector: string): Testimonial[] {
  const map: Record<string, Testimonial[]> = {
    beauté: [
      { name: 'Sophie M.', role: 'Cliente fidèle depuis 3 ans', content: 'Une adresse incontournable ! Le service est impeccable et les résultats dépassent toujours mes attentes. Je recommande les yeux fermés.', rating: 5 },
      { name: 'Camille R.', role: 'Nouvelle cliente', content: 'J\'avais peur de changer de salon mais c\'était la meilleure décision. Accueil chaleureux, expertise parfaite. Je reviens chaque mois !', rating: 5 },
      { name: 'Marie-Laure T.', role: 'Cliente depuis 1 an', content: 'Des professionnels à l\'écoute qui savent vraiment ce qu\'ils font. Mon look a été complètement transformé. Merci !', rating: 5 },
    ],
    restaurant: [
      { name: 'Jean-Pierre D.', role: 'Client régulier', content: 'La meilleure table du quartier sans hésitation. Des produits frais, une cuisine authentique et un service aux petits soins. On y retourne chaque semaine.', rating: 5 },
      { name: 'Amélie F.', role: 'Occasion spéciale', content: 'Repas d\'anniversaire parfait ! Le chef a préparé un menu personnalisé et toute l\'équipe a été aux petits soins. Un souvenir inoubliable.', rating: 5 },
      { name: 'Thomas B.', role: 'Business lunch', content: 'Idéal pour les déjeuners d\'affaires. Cadre élégant, cuisine raffinée et service discret. Nos clients adorent !', rating: 5 },
    ],
    général: [
      { name: 'Alexandre D.', role: 'Client Premium', content: 'Un service d\'exception, une équipe professionnelle et des résultats qui dépassent les attentes. Je recommande vivement !', rating: 5 },
      { name: 'Isabelle M.', role: 'Cliente fidèle', content: 'La qualité est au rendez-vous à chaque fois. Disponibles, réactifs et à l\'écoute. C\'est rare de nos jours !', rating: 5 },
      { name: 'Nicolas R.', role: 'Nouveau client', content: 'J\'avais des doutes au départ mais le résultat est bluffant. Service premium, prix justes et équipe adorable !', rating: 5 },
    ],
  }
  return (map[sector] ?? map['général']) as Testimonial[]
}

// ─── Copywriting ─────────────────────────────────────────────────────────────

function generateCopywriting(businessName: string, sector: string, city: string, style: string, goal: string) {
  const sectorLabels: Record<string, string> = {
    beauté: 'beauté & bien-être', restaurant: 'gastronomie', événementiel: 'événementiel',
    automobile: 'automobile', mode: 'mode', luxe: 'luxe & cosmétique', immobilier: 'immobilier',
    coaching: 'coaching', médical: 'santé', fitness: 'fitness', hôtellerie: 'hôtellerie',
    'e-commerce': 'e-commerce', artisan: 'artisan', general: 'services',
  }
  const label = sectorLabels[sector] ?? 'services'

  const heroTitles: Record<string, string> = {
    luxe: `L'excellence ${label} redéfinie par ${businessName}`,
    minimaliste: `${businessName} — ${label} à ${city}`,
    féminin: `Votre espace ${label} de confiance à ${city}`,
    naturel: `${businessName} — ${label} naturel & éco-responsable`,
    chaleureux: `Bienvenue chez ${businessName}, votre expert ${label} à ${city}`,
    futuriste: `${businessName} — L'avenir du ${label} commence ici`,
    coloré: `${businessName} — L'énergie du ${label} à ${city}`,
    moderne: `${businessName} — Expert ${label} à ${city}`,
  }

  const goalCTA: Record<string, { primary: string; secondary: string }> = {
    devis: { primary: 'Obtenir mon devis gratuit →', secondary: 'Voir nos réalisations' },
    réservation: { primary: 'Réserver maintenant →', secondary: 'Voir les disponibilités' },
    appel: { primary: 'Nous appeler maintenant →', secondary: 'En savoir plus' },
    whatsapp: { primary: 'Contacter sur WhatsApp →', secondary: 'Voir nos services' },
    ecommerce: { primary: 'Découvrir la boutique →', secondary: 'Voir les promotions' },
    contact: { primary: 'Nous contacter →', secondary: 'Découvrir nos services' },
  }

  return {
    heroTitle: heroTitles[style] ?? heroTitles.moderne,
    heroSubtitle: `Découvrez une expérience ${label} d'exception à ${city}. Qualité premium, service personnalisé et résultats garantis. Plus de 200 clients satisfaits nous font confiance.`,
    ctaPrimary: goalCTA[goal]?.primary ?? 'Nous contacter →',
    ctaSecondary: goalCTA[goal]?.secondary ?? 'En savoir plus',
  }
}

// ─── HTML generation ──────────────────────────────────────────────────────────

export function generateHTMLSite(project: GeneratedProject, photos: string[]): string {
  const { designSystem, copywriting, seo, sector, businessName, city, services, automationNeeds, ecommerceNeeds } = project
  const { palette } = designSystem
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  const fontUrl = isDark
    ? 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap'
  const headingFont = isDark ? "'Playfair Display', serif" : "'Syne', sans-serif"
  const bodyFont = "'DM Sans', sans-serif"

  const heroImage = photos.length > 0
    ? `<img src="${photos[0]}" alt="Hero" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">`
    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,${palette.primary}22,${palette.secondary}22);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:5rem;">
        ${sector === 'beauté' ? '💆' : sector === 'restaurant' ? '🍽️' : sector === 'événementiel' ? '🎊' : sector === 'automobile' ? '🚗' : sector === 'fitness' ? '💪' : sector === 'coaching' ? '🎯' : '✨'}
      </div>`

  const galleryHtml = photos.length > 1
    ? photos.slice(1).map((p, i) => `<div style="border-radius:12px;overflow:hidden;aspect-ratio:1;"><img src="${p}" alt="Photo ${i + 2}" style="width:100%;height:100%;object-fit:cover;"></div>`).join('')
    : ['#f0f0f0', '#e8e8e8', '#f8f8f8', '#efefef'].map((c, i) => `<div style="background:${c};border-radius:12px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:2rem;color:#ccc;">📸</div>`).join('')

  const automationSection = automationNeeds.length > 0 ? `
  <section style="padding:80px 5%;background:${isDark ? '#111' : '#f8f8ff'};">
    <div style="max-width:1100px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:48px;">
        <span style="background:linear-gradient(135deg,${palette.primary},${palette.secondary});color:white;padding:6px 16px;border-radius:20px;font-size:0.85rem;font-weight:600;">IA Powered</span>
        <h2 style="font-family:${headingFont};font-size:clamp(28px,4vw,42px);color:${palette.text};margin-top:16px;">Automatisez votre croissance</h2>
        <p style="color:${palette.muted};max-width:600px;margin:0 auto;">Des systèmes intelligents qui travaillent pour vous, même quand vous dormez.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;">
        ${automationNeeds.map((a) => `
        <div style="background:${isDark ? '#1a1a1a' : 'white'};border:1px solid ${palette.primary}33;border-radius:16px;padding:28px;transition:transform 0.2s;">
          <div style="font-size:2rem;margin-bottom:12px;">🤖</div>
          <span style="background:${palette.primary}22;color:${palette.primary};padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">Nouveau</span>
          <h3 style="font-family:${headingFont};color:${palette.text};margin:12px 0 8px;">${a}</h3>
          <p style="color:${palette.muted};font-size:0.9rem;">Système automatisé qui génère des résultats sans intervention manuelle.</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  const salesAutomationSection = project.automationSalesOptions.length > 0 ? `
  <section style="padding:80px 5%;background:${isDark ? '#0f0f14' : '#f7f8ff'};">
    <div style="max-width:1100px;margin:0 auto;">
      <h2 style="font-family:${headingFont};font-size:clamp(28px,4vw,42px);color:${palette.text};text-align:center;margin-bottom:18px;">Automatisations à vendre</h2>
      <p style="text-align:center;color:${palette.muted};max-width:700px;margin:0 auto 36px;">Options commerciales prêtes pour générer plus de demandes qualifiées.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;">
        ${project.automationSalesOptions.filter((o) => o.recommended).slice(0, 6).map((o) => `
        <div style="background:${isDark ? '#1a1a1f' : '#fff'};border:1px solid ${palette.primary}33;border-radius:14px;padding:18px;">
          <div style="font-weight:700;color:${palette.text};margin-bottom:6px;">${o.name}</div>
          <p style="color:${palette.muted};font-size:0.9rem;margin-bottom:8px;">${o.businessBenefit}</p>
          <p style="color:${palette.primary};font-size:0.85rem;">${o.salesPitch}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  const ecommerceSection = ecommerceNeeds.length > 0 ? `
  <section style="padding:80px 5%;background:${isDark ? '#0a0a0a' : '#fffaf3'};">
    <div style="max-width:1100px;margin:0 auto;">
      <h2 style="font-family:${headingFont};font-size:clamp(28px,4vw,42px);color:${palette.text};text-align:center;margin-bottom:48px;">Notre boutique</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
        ${['Produit Premium A', 'Produit Exclusif B', 'Pack Découverte C', 'Offre Spéciale D'].map((p, i) => `
        <div style="background:${isDark ? '#1a1a1a' : 'white'};border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">
          <div style="height:180px;background:linear-gradient(135deg,${palette.primary}22,${palette.secondary}22);display:flex;align-items:center;justify-content:center;font-size:3rem;">
            ${['🛍️', '✨', '📦', '🎁'][i]}
          </div>
          <div style="padding:16px;">
            <span style="background:#55c47a22;color:#55c47a;font-size:0.75rem;padding:2px 8px;border-radius:20px;">En stock</span>
            <h3 style="font-family:${headingFont};color:${palette.text};margin:8px 0 4px;font-size:1rem;">${p}</h3>
            <p style="color:${palette.muted};font-size:0.85rem;margin-bottom:12px;">Description courte du produit avec ses avantages clés.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;color:${palette.primary};font-size:1.1rem;">${29 + i * 10}€</span>
              <button style="background:linear-gradient(135deg,${palette.primary},${palette.secondary});color:white;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.85rem;">Ajouter</button>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''

  const faqItems = copywriting.faq.map((f, i) => `
  <div class="faq-item" style="border-bottom:1px solid ${isDark ? '#333' : '#e8e0d5'};">
    <button onclick="toggleFaq(${i})" style="width:100%;text-align:left;padding:20px 0;background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:${headingFont};font-size:1rem;color:${palette.text};font-weight:600;">
      ${f.question}
      <span id="faq-icon-${i}" style="font-size:1.4rem;color:${palette.primary};transition:transform 0.3s;">+</span>
    </button>
    <div id="faq-answer-${i}" style="display:none;padding-bottom:20px;color:${palette.muted};line-height:1.7;">${f.answer}</div>
  </div>`).join('')

  const testimonialCards = copywriting.testimonials.map((t) => `
  <div style="background:${isDark ? '#1a1a1a' : 'white'};border-radius:16px;padding:28px;box-shadow:0 2px 16px rgba(0,0,0,0.06);">
    <div style="color:#ffbe2e;font-size:1.2rem;margin-bottom:12px;">${'⭐'.repeat(t.rating)}</div>
    <p style="color:${palette.muted};line-height:1.7;margin-bottom:16px;font-style:italic;">"${t.content}"</p>
    <div style="border-top:1px solid ${isDark ? '#333' : '#e8e0d5'};padding-top:16px;">
      <div style="font-weight:700;color:${palette.text};">${t.name}</div>
      <div style="color:${palette.muted};font-size:0.85rem;">${t.role}</div>
    </div>
  </div>`).join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}">
  <meta name="keywords" content="${seo.keywords.join(', ')}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.description}">
  <meta name="theme-color" content="${palette.primary}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${fontUrl}" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
    body{background:${palette.background};color:${palette.text};font-family:${bodyFont};line-height:1.6;}
    a{color:inherit;text-decoration:none;}
    .container{max-width:1100px;margin:0 auto;padding:0 5%;}
    .btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,${palette.primary},${palette.secondary});color:white;padding:14px 28px;border-radius:12px;font-weight:700;font-family:${headingFont};border:none;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 16px ${palette.primary}44;font-size:1rem;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${palette.primary}66;}
    .btn-secondary{display:inline-flex;align-items:center;gap:8px;background:transparent;color:${palette.text};padding:14px 28px;border-radius:12px;font-weight:600;font-family:${headingFont};border:1.5px solid ${isDark ? '#444' : '#e8e0d5'};cursor:pointer;transition:all 0.2s;font-size:1rem;}
    .btn-secondary:hover{border-color:${palette.primary};color:${palette.primary};transform:translateY(-1px);}
    @media(max-width:768px){.hide-mobile{display:none!important;}.grid-2{grid-template-columns:1fr!important;}.hero-grid{grid-template-columns:1fr!important;}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
    .fade-in{animation:fadeIn 0.6s ease-out forwards;}
  </style>
</head>
<body>

<!-- HEADER -->
<header style="position:sticky;top:0;z-index:100;background:${palette.background}cc;backdrop-filter:blur(12px);border-bottom:1px solid ${isDark ? '#333' : '#e8e0d5'};padding:16px 5%;">
  <div style="max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
    <a href="#" style="font-family:${headingFont};font-size:1.4rem;font-weight:800;background:linear-gradient(135deg,${palette.primary},${palette.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${businessName}</a>
    <nav style="display:flex;gap:32px;align-items:center;" class="hide-mobile">
      <a href="#services" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Services</a>
      <a href="#galerie" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Galerie</a>
      <a href="#avis" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Avis</a>
      <a href="#contact" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Contact</a>
    </nav>
    <a href="#contact" class="btn-primary" style="padding:10px 20px;font-size:0.9rem;">${copywriting.ctaPrimary.replace(' →', '')}</a>
  </div>
</header>

<!-- HERO -->
<section style="padding:80px 5% 60px;min-height:90vh;display:flex;align-items:center;background:radial-gradient(ellipse 800px 600px at 60% 40%, ${palette.primary}11, transparent),radial-gradient(ellipse 600px 400px at 20% 80%, ${palette.secondary}0d, transparent);">
  <div style="max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" class="hero-grid">
    <div class="fade-in">
      <span style="display:inline-block;background:linear-gradient(135deg,${palette.primary},${palette.secondary});color:white;padding:6px 16px;border-radius:20px;font-size:0.85rem;font-weight:600;margin-bottom:24px;">✦ ${sector.charAt(0).toUpperCase() + sector.slice(1)} · ${city}</span>
      <h1 style="font-family:${headingFont};font-size:clamp(36px,5vw,64px);line-height:1.15;margin-bottom:20px;color:${palette.text};">
        ${copywriting.heroTitle.replace(/([^.!?]+)$/, `<span style="background:linear-gradient(135deg,${palette.primary},${palette.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">$1</span>`)}
      </h1>
      <p style="font-size:1.15rem;color:${palette.muted};line-height:1.7;margin-bottom:36px;max-width:520px;">${copywriting.heroSubtitle}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <a href="#contact" class="btn-primary">${copywriting.ctaPrimary}</a>
        <a href="#services" class="btn-secondary">${copywriting.ctaSecondary}</a>
      </div>
      <div style="display:flex;gap:32px;margin-top:40px;padding-top:32px;border-top:1px solid ${isDark ? '#333' : '#e8e0d5'};">
        <div><div style="font-family:${headingFont};font-size:1.8rem;font-weight:800;color:${palette.primary};">200+</div><div style="color:${palette.muted};font-size:0.85rem;">Clients satisfaits</div></div>
        <div><div style="font-family:${headingFont};font-size:1.8rem;font-weight:800;color:${palette.primary};">4.9★</div><div style="color:${palette.muted};font-size:0.85rem;">Note Google</div></div>
        <div><div style="font-family:${headingFont};font-size:1.8rem;font-weight:800;color:${palette.primary};">5 ans</div><div style="color:${palette.muted};font-size:0.85rem;">D'expérience</div></div>
      </div>
    </div>
    <div style="animation:float 3s ease-in-out infinite;border-radius:20px;overflow:hidden;box-shadow:0 24px 64px ${palette.primary}33;aspect-ratio:4/3;">
      ${heroImage}
    </div>
  </div>
</section>

<!-- PROBLÈME -->
<section style="padding:80px 5%;background:${isDark ? '#111' : '#fff8ee'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;">
      <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};">Vous reconnaissez-vous ?</h2>
      <p style="color:${palette.muted};max-width:600px;margin:12px auto 0;">Ces défis freinent la croissance de nombreux ${sector === 'général' ? 'commerces' : `commerces ${sector}`}.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${getPainPoints(sector).map((p) => `
      <div style="background:${isDark ? '#1a1a1a' : 'white'};border:1px solid #ff5a1f22;border-radius:16px;padding:28px;border-left:4px solid #ff5a1f;">
        <div style="font-size:1.8rem;margin-bottom:12px;">❌</div>
        <p style="color:${palette.text};font-weight:500;line-height:1.6;">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- SOLUTION -->
<section style="padding:80px 5%;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" class="grid-2">
      <div>
        <span style="background:${palette.primary}22;color:${palette.primary};padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:600;">La solution</span>
        <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};margin:16px 0 20px;">Pourquoi choisir ${businessName} ?</h2>
        <p style="color:${palette.muted};line-height:1.7;margin-bottom:28px;">${copywriting.heroSubtitle}</p>
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${['Expertise reconnue dans le secteur', 'Service personnalisé et à l\'écoute', 'Résultats garantis ou remboursé', 'Réponse sous 2h garantie', 'Équipe de professionnels certifiés'].map((v) => `
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:24px;height:24px;background:${palette.primary}22;border-radius:50%;display:flex;align-items:center;justify-content:center;color:${palette.primary};font-weight:700;flex-shrink:0;">✓</div>
            <span style="color:${palette.text};">${v}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:32px;">
          <a href="#contact" class="btn-primary">${copywriting.ctaPrimary}</a>
        </div>
      </div>
      <div style="background:linear-gradient(135deg,${palette.primary}11,${palette.secondary}11);border-radius:20px;padding:40px;border:1px solid ${palette.primary}22;">
        <div style="font-size:4rem;text-align:center;margin-bottom:20px;">⭐</div>
        <p style="font-family:${headingFont};font-size:1.3rem;color:${palette.text};text-align:center;font-style:italic;">"${businessName} a complètement transformé notre façon de travailler. Un service exceptionnel."</p>
        <p style="color:${palette.muted};text-align:center;margin-top:16px;">— Client Premium</p>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" style="padding:80px 5%;background:${isDark ? '#111' : '#fffaf3'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;">
      <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};">Nos services</h2>
      <p style="color:${palette.muted};max-width:600px;margin:12px auto 0;">Une gamme complète de services adaptés à vos besoins.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${services.map((s, i) => `
      <div style="background:${isDark ? '#1a1a1a' : 'white'};border-radius:16px;padding:28px;box-shadow:0 2px 16px rgba(0,0,0,0.06);transition:all 0.2s;cursor:pointer;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='';this.style.boxShadow='0 2px 16px rgba(0,0,0,0.06)'">
        <div style="font-size:2rem;margin-bottom:12px;">${['✂️','💅','🌿','💆','🪄','⭐','🎯','💎','🔥','✨','🎊','🌟'][i % 12]}</div>
        <h3 style="font-family:${headingFont};color:${palette.text};margin-bottom:8px;">${s}</h3>
        <p style="color:${palette.muted};font-size:0.9rem;line-height:1.6;">Service professionnel réalisé par nos experts avec des produits de qualité supérieure.</p>
        <div style="margin-top:16px;font-weight:700;color:${palette.primary};">${30 + i * 15}€ <span style="font-weight:400;color:${palette.muted};font-size:0.85rem;">/ session</span></div>
      </div>`).join('')}
    </div>
  </div>
</section>

${automationSection}

${project.automationSalesOptions?.length ? `
<section style="padding:80px 5%;background:${isDark ? '#0f0f14' : '#f7f8ff'};">
  <div style="max-width:1100px;margin:0 auto;">
    <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};text-align:center;margin-bottom:12px;">Automatisations à vendre</h2>
    <p style="text-align:center;color:${palette.muted};max-width:700px;margin:0 auto 36px;">Options recommandées pour gagner du temps et convertir plus de prospects.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;">
      ${project.automationSalesOptions.filter((o) => o.recommended).slice(0, 6).map((o) => `
      <div style="background:${isDark ? '#1a1a1f' : 'white'};border:1px solid ${palette.primary}33;border-radius:14px;padding:18px;">
        <div style="font-weight:700;color:${palette.text};margin-bottom:6px;">${o.name}</div>
        <p style="color:${palette.muted};font-size:0.9rem;margin-bottom:8px;">${o.businessBenefit}</p>
        <p style="color:${palette.primary};font-size:0.85rem;">${o.salesPitch}</p>
      </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${ecommerceSection}

<!-- GALERIE -->
<section id="galerie" style="padding:80px 5%;background:${isDark ? '#0a0a0a' : '#fff8ee'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;">
      <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};">Nos réalisations</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      ${galleryHtml}
    </div>
  </div>
</section>

<!-- AVIS -->
<section id="avis" style="padding:80px 5%;">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;">
      <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};">Ce que disent nos clients</h2>
      <p style="color:${palette.muted};font-size:0.85rem;margin-top:8px;">Exemples d'avis représentatifs</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${testimonialCards}
    </div>
  </div>
</section>

<!-- FAQ -->
<section style="padding:80px 5%;background:${isDark ? '#111' : '#fffaf3'};">
  <div style="max-width:720px;margin:0 auto;">
    <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};text-align:center;margin-bottom:48px;">Questions fréquentes</h2>
    <div>${faqItems}</div>
  </div>
</section>

<!-- CONTACT / FORMULAIRE -->
<section id="contact" style="padding:80px 5%;background:${isDark ? '#0a0a0a' : '#fff8ee'};">
  <div style="max-width:640px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:40px;">
      <h2 style="font-family:${headingFont};font-size:clamp(24px,4vw,40px);color:${palette.text};">Contactez-nous</h2>
      <p style="color:${palette.muted};margin-top:8px;">Réponse garantie sous 2h en jours ouvrés.</p>
    </div>
    <form onsubmit="submitForm(event)" style="background:${isDark ? '#1a1a1a' : 'white'};border-radius:20px;padding:40px;box-shadow:0 4px 32px rgba(0,0,0,0.08);">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;" class="grid-2">
        <div style="position:relative;">
          <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a1a' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Prénom & Nom *</label>
          <input required type="text" placeholder="Marie Dupont" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${bodyFont};font-size:1rem;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
        </div>
        <div style="position:relative;">
          <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a1a' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Téléphone *</label>
          <input required type="tel" placeholder="06 00 00 00 00" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${bodyFont};font-size:1rem;outline:none;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
        </div>
      </div>
      <div style="position:relative;margin-bottom:20px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a1a' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Email *</label>
        <input required type="email" placeholder="marie@email.com" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${bodyFont};font-size:1rem;outline:none;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
      </div>
      <div style="position:relative;margin-bottom:20px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a1a' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Type de besoin</label>
        <select style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:${isDark ? '#1a1a1a' : 'white'};color:${palette.muted};font-family:${bodyFont};font-size:1rem;outline:none;appearance:none;">
          ${services.slice(0, 4).map((s) => `<option>${s}</option>`).join('')}
          <option>Autre demande</option>
        </select>
      </div>
      <div style="position:relative;margin-bottom:28px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a1a' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Votre message</label>
        <textarea placeholder="Décrivez votre projet ou votre besoin..." rows="4" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${bodyFont};font-size:1rem;outline:none;resize:vertical;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'"></textarea>
      </div>
      <button type="submit" style="width:100%;background:linear-gradient(135deg,${palette.primary},${palette.secondary});color:white;padding:16px;border-radius:12px;border:none;cursor:pointer;font-family:${headingFont};font-size:1.1rem;font-weight:700;transition:all 0.2s;box-shadow:0 4px 16px ${palette.primary}44;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        ${copywriting.ctaPrimary}
      </button>
      <p id="form-success" style="display:none;text-align:center;color:#55c47a;margin-top:16px;font-weight:600;">✓ Message envoyé ! Nous vous répondons sous 2h.</p>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer style="background:${isDark ? '#050505' : '#171717'};color:#e5e5e5;padding:64px 5% 32px;">
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;" class="grid-2">
      <div>
        <div style="font-family:${headingFont};font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,${palette.primary},${palette.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;">${businessName}</div>
        <p style="color:#9ca3af;line-height:1.7;max-width:280px;margin-bottom:24px;">Votre expert ${sector} à ${city}. Qualité, professionnalisme et satisfaction garantis.</p>
        <div style="display:flex;gap:16px;">
          ${['Instagram', 'Facebook', 'TikTok'].map((s) => `<a href="#" style="width:36px;height:36px;background:#ffffff11;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:0.75rem;transition:all 0.2s;" onmouseover="this.style.background='${palette.primary}';this.style.color='white'" onmouseout="this.style.background='#ffffff11';this.style.color='#9ca3af'">${s[0]}</a>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-family:${headingFont};font-weight:700;margin-bottom:16px;color:white;">Services</div>
        ${services.slice(0, 4).map((s) => `<a href="#services" style="display:block;color:#9ca3af;margin-bottom:8px;font-size:0.9rem;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='#9ca3af'">${s}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:${headingFont};font-weight:700;margin-bottom:16px;color:white;">Navigation</div>
        ${['Accueil', 'Services', 'Galerie', 'Avis', 'Contact'].map((n) => `<a href="#${n.toLowerCase()}" style="display:block;color:#9ca3af;margin-bottom:8px;font-size:0.9rem;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='#9ca3af'">${n}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:${headingFont};font-weight:700;margin-bottom:16px;color:white;">Contact</div>
        <div style="color:#9ca3af;font-size:0.9rem;line-height:2;">
          <div>📍 ${city}, France</div>
          <div>📞 06 00 00 00 00</div>
          <div>✉️ contact@${businessName.toLowerCase().replace(/\s/g, '')}.fr</div>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid #ffffff11;padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:gap;gap:12px;">
      <p style="color:#6b7280;font-size:0.85rem;">© ${new Date().getFullYear()} ${businessName}. Tous droits réservés.</p>
      <div style="display:flex;gap:24px;">
        <a href="#" style="color:#6b7280;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#6b7280'">Mentions légales</a>
        <a href="#" style="color:#6b7280;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#6b7280'">CGV</a>
        <a href="#" style="color:#6b7280;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#6b7280'">Confidentialité</a>
      </div>
    </div>
  </div>
</footer>

<!-- WhatsApp FAB -->
${automationNeeds.includes('WhatsApp Business') ? `<a href="https://wa.me/33600000000" style="position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 4px 16px rgba(37,211,102,0.4);z-index:9999;transition:all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform=''">💬</a>` : ''}

<script>
  function toggleFaq(i) {
    const ans = document.getElementById('faq-answer-' + i);
    const icon = document.getElementById('faq-icon-' + i);
    const isOpen = ans.style.display === 'block';
    document.querySelectorAll('[id^="faq-answer-"]').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('[id^="faq-icon-"]').forEach(function(el) { el.textContent = '+'; el.style.transform = ''; });
    if (!isOpen) {
      ans.style.display = 'block';
      icon.textContent = '−';
      icon.style.transform = 'rotate(180deg)';
    }
  }

  function submitForm(e) {
    e.preventDefault();
    document.getElementById('form-success').style.display = 'block';
    e.target.reset();
    setTimeout(function() { document.getElementById('form-success').style.display = 'none'; }, 5000);
  }

  // Intersection observer for animations
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
</script>
</body>
</html>`
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateProject(prompt: string, photos: string[]): GeneratedProject {
  const trimmedPrompt = prompt.trim().slice(0, 500)
  const sector = detectSector(trimmedPrompt)
  const style = detectStyle(trimmedPrompt)
  const goal = detectGoal(trimmedPrompt)
  const city = detectCity(trimmedPrompt)
  const businessName = detectBusinessName(trimmedPrompt, sector)
  const automationNeeds = detectAutomations(trimmedPrompt)
  const ecommerceNeeds = detectEcommerce(trimmedPrompt)
  const designSystem = getDesignSystem(sector, style)
  const services = getServices(sector)
  const painPoints = getPainPoints(sector)
  const copywritingBase = generateCopywriting(businessName, sector, city, style, goal)
  const faq = getFAQ(sector, businessName)
  const testimonials = getTestimonials(sector)

  const sectorKeywords: Record<string, string[]> = {
    beauté: ['salon beauté', 'coiffure', 'esthétique', 'bien-être', city.toLowerCase()],
    restaurant: ['restaurant', 'gastronomie', 'menu', 'réservation', city.toLowerCase()],
    général: ['services', 'professionnel', 'qualité', city.toLowerCase()],
  }
  const keywords = sectorKeywords[sector] ?? sectorKeywords['général'] ?? ['services', city.toLowerCase()]

  const pages: GeneratedPage[] = [
    { name: 'Accueil', slug: '/', sections: ['hero', 'probleme', 'solution', 'services', 'galerie', 'avis', 'faq', 'contact'] },
    { name: 'Services', slug: '/services', sections: ['services', 'tarifs'] },
    { name: 'Contact', slug: '/contact', sections: ['contact', 'map'] },
  ]

  const sections: GeneratedSection[] = [
    { id: 'hero', type: 'hero', title: 'Hero principal', content: copywritingBase.heroTitle },
    { id: 'probleme', type: 'problem', title: 'Section problème', content: 'Identification des points de douleur' },
    { id: 'solution', type: 'solution', title: 'Section solution', content: 'Présentation de la valeur' },
    { id: 'services', type: 'services', title: 'Nos services', content: services.join(', ') },
    { id: 'galerie', type: 'gallery', title: 'Galerie photos', content: `${photos.length} photos intégrées` },
    { id: 'avis', type: 'testimonials', title: 'Avis clients', content: '3 témoignages' },
    { id: 'faq', type: 'faq', title: 'FAQ accordéon', content: '6 questions' },
    { id: 'contact', type: 'form', title: 'Formulaire de contact', content: `Objectif : ${goal}` },
  ]

  const projectId = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const baseProject: Partial<GeneratedProject> = {
    id: projectId,
    projectName: `Site ${businessName} — ${city}`,
    businessName,
    city,
    sector,
    style,
    goal,
    tone: style === 'luxe' ? 'premium' : style === 'chaleureux' ? 'convivial' : 'professionnel',
    audience: sector === 'coaching' ? 'Entrepreneurs et professionnels' : `Clients ${sector} à ${city}`,
    valueProposition: `${businessName} offre une expérience ${sector} d'exception à ${city} avec un service personnalisé et des résultats garantis.`,
    painPoints,
    services,
    products: ecommerceNeeds.length > 0 ? ['Produit Premium A', 'Produit Exclusif B', 'Pack Découverte C', 'Offre Spéciale D'] : [],
    automationNeeds,
    ecommerceNeeds,
    designSystem,
    pages,
    sections,
  }

  const automationModule = buildAutomationSalesModule(baseProject as GeneratedProject)

  const project: GeneratedProject = {
    ...baseProject,
    seo: {
      title: `${businessName} — Expert ${sector} à ${city}`,
      description: `${businessName}, votre expert ${sector} à ${city}. ${copywritingBase.heroSubtitle.slice(0, 120)}...`,
      keywords,
    },
    copywriting: {
      heroTitle: copywritingBase.heroTitle,
      heroSubtitle: copywritingBase.heroSubtitle,
      ctaPrimary: copywritingBase.ctaPrimary,
      ctaSecondary: copywritingBase.ctaSecondary,
      faq,
      testimonials,
      clientMessage: generateClientMessage({ id: projectId, businessName, city, sector, automationNeeds } as GeneratedProject),
    },
    files: [],
    html: '',
    photos,
    automationSalesOptions: automationModule.options,
    recommendedPacks: automationModule.recommendedPacks,
    automationArgumentary: automationModule.clientArgumentary,
    automationPriceScript: automationModule.priceScript,
    automationReadyMessage: automationModule.readyToSendMessage,
    createdAt: new Date().toISOString(),
    status: 'draft',
  }

  project.html = generateHTMLSite(project, photos)

  const htmlSize = new Blob([project.html]).size
  const humanSize = htmlSize > 1024 * 1024
    ? `${(htmlSize / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(htmlSize / 1024)} KB`

  project.files = [
    { name: 'index.html', type: 'html', content: project.html, size: humanSize },
    { name: 'styles.css', type: 'css', content: '/* Styles extraits du HTML inline */', size: '< 1 KB' },
    { name: 'script.js', type: 'js', content: '// Scripts extraits du HTML inline', size: '< 1 KB' },
    {
      name: 'config.json', type: 'json',
      content: JSON.stringify({ id: project.id, businessName, sector, city, style, goal, createdAt: project.createdAt }, null, 2),
      size: '< 1 KB',
    },
  ]

  project.status = 'generated'
  return project
}

export function refineProject(project: GeneratedProject, instruction: string): GeneratedProject {
  const i = instruction.toLowerCase()
  const updated = { ...project, designSystem: { ...project.designSystem, palette: { ...project.designSystem.palette } } }

  if (/luxe|premium|doré|haut.de.gamme/.test(i)) {
    updated.designSystem.palette.background = '#0d0d0d'
    updated.designSystem.palette.primary = '#d4af37'
    updated.designSystem.palette.text = '#ffffff'
    updated.designSystem.mood = 'luxe'
    updated.style = 'luxe'
  } else if (/coloré|vibrant|dynamique/.test(i)) {
    updated.designSystem.palette.primary = '#ff5a1f'
    updated.designSystem.palette.secondary = '#ff4fb8'
    updated.designSystem.mood = 'coloré'
  } else if (/bleu/.test(i)) {
    updated.designSystem.palette.primary = '#4f8cff'
    updated.designSystem.palette.secondary = '#8b5cf6'
  } else if (/vert|nature|bio/.test(i)) {
    updated.designSystem.palette.primary = '#55c47a'
    updated.designSystem.palette.secondary = '#059669'
  } else if (/rose|féminin/.test(i)) {
    updated.designSystem.palette.primary = '#ff4fb8'
    updated.designSystem.palette.secondary = '#8b5cf6'
  }

  if (/whatsapp/.test(i) && !updated.automationNeeds.includes('WhatsApp Business')) {
    updated.automationNeeds = [...updated.automationNeeds, 'WhatsApp Business']
  }
  if (/devis/.test(i) && !updated.automationNeeds.includes('Devis automatique')) {
    updated.automationNeeds = [...updated.automationNeeds, 'Devis automatique']
    updated.goal = 'devis'
  }
  if (/ecommerce|boutique|shop/.test(i) && updated.ecommerceNeeds.length === 0) {
    updated.ecommerceNeeds = ['Catalogue produits', 'Panier d\'achat', 'Paiement sécurisé']
  }

  if (/vendeur|conversion|persuasif/.test(i)) {
    updated.copywriting = {
      ...updated.copywriting,
      ctaPrimary: 'Réserver ma place maintenant →',
      heroSubtitle: `Ne laissez pas vos concurrents prendre l'avance. ${updated.copywriting.heroSubtitle}`,
    }
  }

  updated.html = generateHTMLSite(updated, updated.photos)
  updated.status = 'generated'
  return updated
}

export function generateClientMessage(project: GeneratedProject): string {
  const { businessName, city, sector, automationNeeds } = project
  const autoList = automationNeeds.length > 0 ? `avec ${automationNeeds.slice(0, 2).join(' et ')}` : ''

  return `Bonjour,

Je viens de créer une maquette complète pour ${businessName} à ${city} — secteur ${sector}.

Le site inclut :
✓ Design premium adapté à votre secteur
✓ Textes copywriting persuasifs
✓ Formulaire ${project.goal === 'devis' ? 'de devis automatique' : project.goal === 'réservation' ? 'de réservation' : 'de contact intelligent'}
${automationNeeds.length > 0 ? `✓ Automatisations : ${automationNeeds.join(', ')}\n` : ''}✓ SEO optimisé pour ${city}
✓ Responsive mobile

La maquette est prête à livrer ${autoList}. Je peux avoir le site en ligne sous 48h.

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?

Cordialement`
}
