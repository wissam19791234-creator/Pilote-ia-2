import type { GeneratedProject } from '@/types'

export type ComplexityLevel = 'simple' | 'moyenne' | 'avancée'
export type PerceivedValue = 'faible' | 'forte' | 'premium'

export interface AutomationSalesOption {
  key: string
  name: string
  problemSolved: string
  businessBenefit: string
  complexity: ComplexityLevel
  perceivedValue: PerceivedValue
  salesPitch: string
  recommended: boolean
  details: string[]
}

export interface RecommendedPack {
  id: 'pack-1' | 'pack-2' | 'pack-3'
  name: string
  includes: string[]
  positioning: string
}

export interface AutomationSalesModule {
  options: AutomationSalesOption[]
  recommendedPacks: RecommendedPack[]
  clientArgumentary: string[]
  priceScript: string
  readyToSendMessage: string
}

const sectorFormQuestions: Record<string, string[]> = {
  restaurant: ['Nombre de couverts souhaité', 'Date de l\'événement', 'Type de prestation (sur place/livraison)'],
  beauté: ['Type de soin souhaité', 'Préférences horaires', 'Événement prévu (mariage, soirée, etc.)'],
  immobilier: ['Type de bien', 'Budget visé', 'Délai de projet'],
  artisan: ['Type d\'intervention', 'Surface / métrage', 'Urgence de l\'intervention'],
  general: ['Type de besoin', 'Délai souhaité', 'Budget estimé'],
}

export function buildAutomationSalesModule(project: GeneratedProject): AutomationSalesModule {
  const questions = sectorFormQuestions[project.sector] ?? sectorFormQuestions.general

  const options: AutomationSalesOption[] = [
    {
      key: 'smart-quote',
      name: 'Devis automatique intelligent',
      problemSolved: 'Les demandes arrivent incomplètes et font perdre du temps.',
      businessBenefit: 'Le commerce reçoit des demandes exploitables avec estimation simple et résumé prêt à traiter.',
      complexity: 'moyenne',
      perceivedValue: 'premium',
      salesPitch: 'On transforme chaque demande en pré-devis clair, donc vous répondez plus vite et signez plus.',
      recommended: true,
      details: [`Formulaire secteur: ${questions.join(' • ')}`, 'Résumé automatique prospect', 'Estimation de départ si infos suffisantes', 'Bénéfice client: réponse rapide et transparente'],
    },
    {
      key: 'lead-qualification',
      name: 'Qualification prospect',
      problemSolved: 'Difficile de savoir qui rappeler en priorité.',
      businessBenefit: 'Score 0-100 + niveau froid/tiède/chaud, urgence, budget, besoin principal et action conseillée.',
      complexity: 'simple',
      perceivedValue: 'forte',
      salesPitch: 'Vous savez immédiatement quels prospects sont chauds et rentables.',
      recommended: true,
      details: ['Score automatique 0-100', 'Niveau: froid / tiède / chaud', 'Recommandation: appeler, envoyer devis, relancer'],
    },
    {
      key: 'smart-whatsapp',
      name: 'WhatsApp intelligent',
      problemSolved: 'Les prospects hésitent à remplir un long formulaire.',
      businessBenefit: 'Bouton WhatsApp avec message pré-rempli adapté au secteur et exemple de message reçu côté commerce.',
      complexity: 'simple',
      perceivedValue: 'forte',
      salesPitch: 'Un clic WhatsApp réduit la friction et augmente les prises de contact.',
      recommended: project.goal === 'whatsapp' || project.sector !== 'médical',
      details: [`Message pré-rempli ${project.sector}`, 'Exemple prospect visible pour le commerce', 'Bénéfice: plus de conversations qualifiées'],
    },
    {
      key: 'auto-replies',
      name: 'Réponse automatique',
      problemSolved: 'Le prospect attend trop longtemps et part chez un concurrent.',
      businessBenefit: 'Email auto au prospect + résumé auto au commerce en version professionnelle et chaleureuse.',
      complexity: 'moyenne',
      perceivedValue: 'forte',
      salesPitch: 'Chaque demande est accusée immédiatement, ce qui rassure et améliore le taux de conversion.',
      recommended: true,
      details: ['Version professionnelle', 'Version chaleureuse', 'Résumé interne prêt à traiter'],
    },
    {
      key: 'follow-ups',
      name: 'Relances automatiques',
      problemSolved: 'Les devis restent sans réponse.',
      businessBenefit: 'Séquences J+1, J+3, J+7 avec message doux, premium et urgence/disponibilités.',
      complexity: 'avancée',
      perceivedValue: 'premium',
      salesPitch: 'On relance au bon moment sans effort manuel, donc moins de devis perdus.',
      recommended: true,
      details: ['Relance douce J+1', 'Relance premium J+3', 'Relance urgence/disponibilités J+7'],
    },
    {
      key: 'booking', name: 'Prise de rendez-vous', problemSolved: 'Allers-retours chronophages pour fixer un créneau.',
      businessBenefit: 'Bouton réservation, demande de créneau, confirmation automatique, intégration Calendly prévue.',
      complexity: 'moyenne', perceivedValue: 'forte', salesPitch: 'Le client choisit son horaire et reçoit sa confirmation sans intervention.', recommended: true,
      details: ['CTA réservation dédié', 'Demande de créneau structurée', 'Connecteur Calendly prévu'],
    },
    {
      key: 'deposit-payment', name: 'Paiement d’acompte', problemSolved: 'Faux clients et annulations de dernière minute.',
      businessBenefit: 'Lien de paiement d\'acompte (Stripe prévu) + confirmation pour sécuriser les demandes sérieuses.',
      complexity: 'avancée', perceivedValue: 'premium', salesPitch: 'L’acompte filtre les demandes non sérieuses et protège votre planning.', recommended: project.sector !== 'médical',
      details: ['Lien acompte prêt à envoyer', 'Confirmation automatique', 'Argument anti no-show inclus'],
    },
    {
      key: 'mini-crm', name: 'Mini CRM', problemSolved: 'Les demandes se perdent entre WhatsApp, email et téléphone.',
      businessBenefit: 'Pipeline local: nouveau, à rappeler, devis envoyé, gagné, perdu.',
      complexity: 'moyenne', perceivedValue: 'forte', salesPitch: 'Vous suivez chaque opportunité sans rien oublier.', recommended: true,
      details: ['Colonnes: nouveau → perdu', 'Sauvegarde locale fictive', 'Bénéfice: zéro demande oubliée'],
    },
    {
      key: 'requests-dashboard', name: 'Dashboard demandes', problemSolved: 'Aucune vision claire des performances commerciales.',
      businessBenefit: 'KPIs fictifs: demandes, prospects chauds, devis envoyés, conversion, chiffre potentiel, prestations demandées.',
      complexity: 'moyenne', perceivedValue: 'premium', salesPitch: 'Le commerce visualise immédiatement l\'impact business du site.', recommended: true,
      details: ['Nombre de demandes', 'Prospects chauds', 'Chiffre potentiel fictif'],
    },
  ]

  return {
    options,
    recommendedPacks: [
      { id: 'pack-1', name: 'Pack 1 — Site Vitrine Intelligent', includes: ['site premium', 'galerie', 'services', 'avis', 'FAQ', 'formulaire contact', 'WhatsApp intelligent'], positioning: 'Entrée de gamme orientée conversion.' },
      { id: 'pack-2', name: 'Pack 2 — Site + Devis Automatique', includes: ['tout le pack 1', 'formulaire devis intelligent', 'score prospect', 'email automatique', 'résumé demande', 'relance prête', 'Google Sheet ou CRM simple'], positioning: 'Pack recommandé pour accélérer les ventes.' },
      { id: 'pack-3', name: 'Pack 3 — Site + Automatisation Client', includes: ['tout le pack 2', 'relances automatiques', 'mini CRM', 'prise rendez-vous', 'paiement acompte', 'dashboard demandes', 'maintenance mensuelle'], positioning: 'Offre premium orientée pilotage complet.' },
    ],
    clientArgumentary: [
      'Vous gagnez du temps sur les demandes répétitives.',
      'Vous répondez plus vite, donc vous convertissez plus.',
      'Vous professionnalisez le suivi commercial avec des process clairs.',
    ],
    priceScript: 'Le prix n\'est pas seulement un site: c\'est un système qui capte, qualifie et relance vos prospects automatiquement.',
    readyToSendMessage: `Bonjour ${project.businessName}, j\'ai préparé votre site + des automatisations prêtes à l\'emploi pour générer plus de demandes qualifiées. Souhaitez-vous que je vous présente les 3 packs (Essentiel, Croissance, Premium) ?`,
  }
}
