import type { GeneratedProject, SmartQuote, QuoteField } from '@/types'

interface FormDef {
  title: string
  subtitle: string
  responseTime: string
  fields: QuoteField[]
}

const SECTOR_FORMS: Record<string, FormDef> = {
  événementiel: {
    title: 'Demande de devis événement',
    subtitle: 'Décrivez votre projet pour recevoir un devis personnalisé sous 24h.',
    responseTime: '24h',
    fields: [
      { id: 'event_type', label: "Type d'événement", type: 'select', options: ['Mariage', 'Anniversaire', 'Séminaire d\'entreprise', 'Cocktail', 'Baby shower', 'Autre'], required: true },
      { id: 'event_date', label: "Date de l'événement", type: 'date', required: true },
      { id: 'event_location', label: 'Lieu (ville ou adresse)', type: 'text', placeholder: 'Paris, Lyon, ou adresse exacte', required: true },
      { id: 'guests', label: 'Nombre d\'invités', type: 'select', options: ['Moins de 50', '50–100', '100–200', '200–500', 'Plus de 500'], required: true },
      { id: 'theme', label: 'Thème ou ambiance souhaitée', type: 'text', placeholder: 'Ex: romantique, moderne, champêtre', required: false },
      { id: 'budget', label: 'Budget estimé', type: 'select', options: ['Moins de 2 000€', '2 000–5 000€', '5 000–15 000€', '15 000–30 000€', 'Plus de 30 000€'], required: false },
      { id: 'options', label: 'Options souhaitées', type: 'select', options: ['Décoration uniquement', 'Décoration + Traiteur', 'Décoration + Animation', 'Pack complet'], required: false },
      { id: 'message', label: 'Précisions supplémentaires', type: 'textarea', placeholder: 'Décrivez votre projet en détail…', required: false },
    ],
  },
  beauté: {
    title: 'Demande de rendez-vous',
    subtitle: 'Réservez votre prestation en quelques secondes.',
    responseTime: '2h',
    fields: [
      { id: 'service', label: 'Prestation souhaitée', type: 'select', options: ['Soin visage', 'Massage', 'Manucure / Pédicure', 'Épilation', 'Maquillage', 'Autre'], required: true },
      { id: 'date', label: 'Date souhaitée', type: 'date', required: true },
      { id: 'time', label: 'Créneau préféré', type: 'select', options: ['Matin (9h–12h)', 'Après-midi (13h–17h)', 'Soir (17h–19h)'], required: false },
      { id: 'experience', label: 'Première visite ?', type: 'select', options: ['Oui, première fois', 'Non, je suis cliente'], required: false },
      { id: 'goal', label: 'Objectif ou souhait particulier', type: 'text', placeholder: 'Ex: résultat naturel, occasion spéciale', required: false },
      { id: 'message', label: 'Message libre', type: 'textarea', placeholder: 'Questions, précisions…', required: false },
    ],
  },
  restaurant: {
    title: 'Réservation table',
    subtitle: 'Réservez votre table en ligne, confirmation par email.',
    responseTime: '1h',
    fields: [
      { id: 'date', label: 'Date de la réservation', type: 'date', required: true },
      { id: 'time', label: 'Heure souhaitée', type: 'select', options: ['12h00', '12h30', '13h00', '19h00', '19h30', '20h00', '20h30', '21h00'], required: true },
      { id: 'guests', label: 'Nombre de personnes', type: 'select', options: ['1', '2', '3–4', '5–6', '7–10', '10+'], required: true },
      { id: 'occasion', label: 'Occasion spéciale ?', type: 'select', options: ['Aucune', 'Anniversaire', 'Romantique', 'Affaires', 'Famille'], required: false },
      { id: 'menu', label: 'Préférence menu', type: 'select', options: ['Menu du jour', 'À la carte', 'Menu dégustation', 'Menu végétarien'], required: false },
      { id: 'message', label: 'Demandes particulières', type: 'textarea', placeholder: 'Allergies, chaise bébé, terrasse…', required: false },
    ],
  },
  automobile: {
    title: 'Demande de devis véhicule',
    subtitle: 'Décrivez votre besoin pour un devis rapide sous 24h.',
    responseTime: '24h',
    fields: [
      { id: 'vehicle', label: 'Marque et modèle du véhicule', type: 'text', placeholder: 'Ex: BMW Série 3 2020', required: true },
      { id: 'service', label: 'Prestation souhaitée', type: 'select', options: ['Révision', 'Entretien courant', 'Réparation', 'Carrosserie / Peinture', 'Diagnostic', 'Autre'], required: true },
      { id: 'state', label: 'État du véhicule', type: 'select', options: ['Bon état', 'Quelques défauts', 'Accidenté', 'Panne immobilisante'], required: false },
      { id: 'urgency', label: 'Délai souhaité', type: 'select', options: ['Urgent (< 48h)', '1 semaine', 'Dans le mois', 'Pas de contrainte'], required: false },
      { id: 'photos', label: 'Photos du véhicule', type: 'file', required: false },
      { id: 'message', label: 'Description du problème', type: 'textarea', placeholder: 'Décrivez le problème ou la prestation en détail…', required: false },
    ],
  },
  immobilier: {
    title: 'Estimation gratuite de votre bien',
    subtitle: 'Recevez une estimation de votre bien par un expert local sous 48h.',
    responseTime: '48h',
    fields: [
      { id: 'type', label: 'Type de bien', type: 'select', options: ['Appartement', 'Maison', 'Terrain', 'Local commercial', 'Immeuble'], required: true },
      { id: 'project', label: 'Votre projet', type: 'select', options: ['Vendre', 'Acheter', 'Louer mon bien', 'Estimer'], required: true },
      { id: 'city', label: 'Ville', type: 'text', placeholder: 'Ville du bien', required: true },
      { id: 'surface', label: 'Surface approximative', type: 'select', options: ['< 30m²', '30–50m²', '50–80m²', '80–120m²', '120–200m²', '> 200m²'], required: false },
      { id: 'rooms', label: 'Nombre de pièces', type: 'select', options: ['Studio', '2 pièces', '3 pièces', '4 pièces', '5 pièces et +'], required: false },
      { id: 'budget', label: 'Budget (achat) ou fourchette prix', type: 'text', placeholder: 'Ex: 200 000€ ou non défini', required: false },
      { id: 'message', label: 'Message libre', type: 'textarea', placeholder: 'Précisions sur votre projet…', required: false },
    ],
  },
  coaching: {
    title: 'Demande de séance découverte',
    subtitle: 'Parlez-nous de votre situation pour un appel découverte offert.',
    responseTime: '24h',
    fields: [
      { id: 'theme', label: 'Domaine de coaching', type: 'select', options: ['Développement personnel', 'Carrière / Reconversion', 'Leadership', 'Confiance en soi', 'Bien-être', 'Sport / Performance', 'Autre'], required: true },
      { id: 'situation', label: 'Votre situation actuelle', type: 'textarea', placeholder: 'Décrivez votre situation et vos enjeux actuels…', required: true },
      { id: 'goal', label: 'Votre objectif principal', type: 'text', placeholder: 'Ex: retrouver confiance, changer de carrière', required: true },
      { id: 'experience', label: 'Avez-vous déjà été accompagné(e) ?', type: 'select', options: ['Non, première fois', 'Oui, coaching', 'Oui, thérapie', 'Oui, autre'], required: false },
      { id: 'budget', label: 'Budget mensuel envisagé', type: 'select', options: ['< 150€/mois', '150–300€/mois', '300–600€/mois', '600€+/mois', 'À définir'], required: false },
    ],
  },
  'e-commerce': {
    title: 'Demande d\'informations produit',
    subtitle: 'Une question sur un produit ? Nous répondons sous 4h.',
    responseTime: '4h',
    fields: [
      { id: 'product', label: 'Produit(s) qui vous intéresse(nt)', type: 'text', placeholder: 'Ex: Sérum vitamine C, Crème hydratante', required: false },
      { id: 'skin_type', label: 'Type de peau (si applicable)', type: 'select', options: ['Normale', 'Sèche', 'Mixte', 'Grasse', 'Sensible', 'Mature'], required: false },
      { id: 'goal', label: 'Objectif beauté', type: 'text', placeholder: 'Ex: éclat, anti-âge, hydratation', required: false },
      { id: 'occasion', label: 'Achat pour', type: 'select', options: ['Moi-même', 'Cadeau', 'Routine complète', 'Offre pro/revendeur'], required: false },
      { id: 'message', label: 'Votre question', type: 'textarea', placeholder: 'Posez votre question ici…', required: false },
    ],
  },
}

const DEFAULT_FORM: FormDef = {
  title: 'Nous contacter',
  subtitle: 'Décrivez votre besoin et recevez une réponse rapide.',
  responseTime: '24h',
  fields: [
    { id: 'name', label: 'Votre nom', type: 'text', placeholder: 'Prénom Nom', required: true },
    { id: 'email', label: 'Email', type: 'text', placeholder: 'votre@email.com', required: true },
    { id: 'phone', label: 'Téléphone', type: 'text', placeholder: '06 XX XX XX XX', required: false },
    { id: 'message', label: 'Votre message', type: 'textarea', placeholder: 'Décrivez votre besoin…', required: true },
  ],
}

export function generateSmartQuote(project: GeneratedProject): SmartQuote {
  let formDef: FormDef = DEFAULT_FORM

  for (const key of Object.keys(SECTOR_FORMS)) {
    if (project.sector.toLowerCase().includes(key)) {
      formDef = SECTOR_FORMS[key]
      break
    }
  }

  // Always add name/email/phone at the start if not already there
  const hasName = formDef.fields.some((f) => f.id === 'name')
  const baseFields: QuoteField[] = hasName ? [] : [
    { id: 'name', label: 'Votre nom', type: 'text', placeholder: 'Prénom Nom', required: true },
    { id: 'email', label: 'Email', type: 'text', placeholder: 'votre@email.com', required: true },
    { id: 'phone', label: 'Téléphone', type: 'text', placeholder: '06 XX XX XX XX', required: false },
  ]

  const adminTemplate = `Nouvelle demande de ${project.businessName}
Date : {{date}}
Nom : {{name}}
Email : {{email}}
{{fields}}`

  const clientTemplate = `Merci pour votre demande, {{name}} !

Nous avons bien reçu votre message et vous répondrons sous ${formDef.responseTime}.

À très bientôt,
L'équipe ${project.businessName}`

  return {
    sector: project.sector,
    formTitle: formDef.title,
    formSubtitle: formDef.subtitle,
    fields: [...baseFields, ...formDef.fields],
    adminSummaryTemplate: adminTemplate,
    clientConfirmationTemplate: clientTemplate,
    estimatedResponseTime: formDef.responseTime,
  }
}
