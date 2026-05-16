import type { GeneratedProject, SalesPack, CommercialPackV2, ObjectionAnswer } from '@/types'

const OBJECTIONS: ObjectionAnswer[] = [
  {
    objection: "C'est trop cher",
    responseShort: "Je comprends. Le site est conçu pour qu'il reçoive plus de demandes. Si une prestation supplémentaire par mois couvre l'investissement, est-ce que ça vous conviendrait ?",
    responsePremium: "La question n'est pas le coût du site, mais ce qu'il va vous rapporter. Un formulaire intelligent qui filtre les demandes non qualifiées vous fait déjà gagner du temps. Et plus de demandes entrantes, c'est plus de clients.",
    valueArgument: 'Le coût de ne pas avoir de système en place : clients perdus chaque semaine.',
  },
  {
    objection: "Je vais réfléchir",
    responseShort: "Bien sûr. Je vous envoie la maquette maintenant pour que vous puissiez la montrer à votre associé ou votre conjoint. Vous me donnez votre retour cette semaine ?",
    responsePremium: "Je comprends. Pour faciliter votre décision, je vous propose de commencer par le pack vitrine — sans engagement sur les automatisations — et d'y ajouter les options ensuite si vous en voyez la valeur.",
    valueArgument: 'La maquette est déjà prête. Il suffit de valider pour que je finalise et vous livre.',
  },
  {
    objection: "J'ai déjà Instagram",
    responseShort: "Instagram c'est excellent pour la visibilité. Le site, c'est ce qui transforme cette visibilité en demandes concrètes — avec un formulaire, un numéro WhatsApp bien placé et un CTA clair.",
    responsePremium: "Instagram et le site se complètent. Vos posts Instagram envoient du trafic vers le site, le site capture les coordonnées et envoie un email de bienvenue automatiquement. C'est un système, pas un outil isolé.",
    valueArgument: 'Instagram ne capture pas les emails. Le site si.',
  },
  {
    objection: "J'ai déjà un site",
    responseShort: "Je vois. Est-ce qu'il a un formulaire de devis automatique ? Des relances ? Un bouton WhatsApp intelligent ? C'est la différence entre un site vitrine et un site qui travaille pour vous.",
    responsePremium: "Le site que je vous propose n'est pas un site de plus. C'est un système de génération de demandes, avec formulaire intelligent, emails automatiques et suivi prospect. Ce que la plupart des sites n'ont pas.",
    valueArgument: 'Un site sans système de capture de leads, c\'est une vitrine sans caisse.',
  },
  {
    objection: "Je n'ai pas besoin",
    responseShort: "C'est possible ! Je vous pose une question : actuellement, quand quelqu'un vous trouve sur Google ou Instagram, que se passe-t-il ? Il vous appelle directement ? Il envoie un DM ?",
    responsePremium: "Beaucoup de commerçants pensent ne pas en avoir besoin jusqu'au moment où ils réalisent combien de prospects partent sans laisser leurs coordonnées. Le site résout exactement ça.",
    valueArgument: "Les clients qui ne savent pas comment vous contacter facilement vont chez le concurrent.",
  },
  {
    objection: "Envoyez-moi le prix",
    responseShort: "Bien sûr, je vous envoie la maquette avec les détails. Le pack vitrine démarre à 400€, le pack avec devis automatique à 700€. Je préfère vous la montrer d'abord pour que vous voyez ce que vous avez exactement.",
    responsePremium: "Je vous envoie la maquette et le détail des options maintenant. Mais je préfère qu'on l'étudie ensemble — 15 minutes suffisent — pour que vous choisissiez exactement ce qui correspond à votre activité.",
    valueArgument: 'Un prix sans voir le rendu, ça ressemble à de la méfiance. La maquette répond à la question.',
  },
]

function buildSimplePack(project: GeneratedProject): CommercialPackV2 {
  return {
    name: 'Site Vitrine Intelligent',
    tagline: 'La présence en ligne professionnelle',
    price: '400€',
    priceHigh: '600€',
    highlighted: false,
    features: [
      `Site ${project.sector} premium adapté à ${project.businessName}`,
      'Design sur-mesure adapté au secteur',
      'Galerie photos et services',
      'Formulaire de contact + WhatsApp',
      'Section avis clients et FAQ',
      'SEO local optimisé',
      'Export HTML hébergeable partout',
      'Livraison en 48h',
    ],
  }
}

function buildPremiumPack(project: GeneratedProject): CommercialPackV2 {
  const features = [
    ...buildSimplePack(project).features.slice(0, 5),
    'Formulaire de devis intelligent avec scoring prospect',
    'Email de confirmation automatique au client',
    'Résumé de la demande envoyé par email',
    'Relance automatique J+3 si pas de réponse',
    'Mini tableau de bord des demandes',
    'Mise à jour incluse 1 mois',
  ]

  return {
    name: 'Site + Devis Automatique',
    tagline: 'Le système qui qualifie vos prospects',
    price: '700€',
    priceHigh: '900€',
    highlighted: true,
    features,
  }
}

function buildAutomationPack(project: GeneratedProject): CommercialPackV2 {
  const sectorFeatures: Record<string, string[]> = {
    beauté: ['Rappel RDV automatique par email', 'Paiement acompte en ligne', 'Carte cadeau digitale'],
    événementiel: ['Calendrier disponibilités', 'Acompte Stripe intégré', 'CRM événements partagé'],
    restaurant: ['Système de réservation en ligne', 'Email confirmation + rappel', 'Gestion des avis automatisée'],
    automobile: ['Upload photos véhicule', 'WhatsApp devis intelligent', 'Suivi dossier client'],
    'e-commerce': ['Email panier abandonné', 'Recommandations produit', 'Email post-achat + avis'],
    coaching: ['Calendrier prise de RDV', 'Accès espace client', 'Suivi programme automatisé'],
  }

  let extraFeatures: string[] = []
  for (const key of Object.keys(sectorFeatures)) {
    if (project.sector.toLowerCase().includes(key)) {
      extraFeatures = sectorFeatures[key]
      break
    }
  }

  return {
    name: 'Site + Automatisation Client',
    tagline: "Le pack qui s'occupe de vos clients à votre place",
    price: '1 200€',
    priceHigh: '1 800€',
    highlighted: false,
    features: [
      ...buildPremiumPack(project).features.slice(0, 8),
      'Relances automatiques J+1, J+3, J+7',
      'Dashboard demandes et statistiques',
      'Maintenance mensuelle incluse 3 mois',
      ...extraFeatures,
    ],
  }
}

export function generateSalesPack(project: GeneratedProject): SalesPack {
  const simplePack = buildSimplePack(project)
  const premiumPack = buildPremiumPack(project)
  const automationPack = buildAutomationPack(project)

  const pitchScript = `
Bonjour [Prénom], je m'appelle [Votre nom] et je vous contacte parce que j'ai préparé une démo complète pour ${project.businessName}.

J'ai généré une maquette de site adaptée à votre secteur ${project.sector} — avec un formulaire de devis, une galerie, vos services et un bouton WhatsApp. Le tout exportable et hébergeable en 24h.

Je vous la montre en 5 minutes et vous me dites ce que vous en pensez.
`.trim()

  const dmShort = `Bonjour ! J'ai préparé une maquette de site pour ${project.businessName}. Ça prend 5 min à regarder. Je vous l'envoie ?`

  const dmPremium = `Bonjour [Prénom],

Je suis [Prénom], je crée des sites pour des ${project.sector}s locaux avec un système de demandes automatique.

J'ai préparé une démo complète pour ${project.businessName} — site premium + formulaire de devis + email automatique.

5 minutes pour vous montrer ça ?`

  const emailProfessional = `Objet : Démo site web pour ${project.businessName}

Bonjour,

Je me permets de vous contacter car j'ai préparé une maquette de site web pour ${project.businessName}.

Elle comprend :
- Un design adapté à votre secteur ${project.sector}
- Un formulaire de demande de ${project.goal}
- Une galerie de vos services
- Un bouton WhatsApp intelligent

Je vous l'envoie dès maintenant et reste disponible pour en discuter.

Cordialement,
[Votre nom]`

  return {
    recommendedOffer: premiumPack.name,
    simplePack,
    premiumPack,
    automationPack,
    priceJustification: [
      "Le site est livré en 48h, pas en 3 semaines",
      "Design sur-mesure adapté au secteur, pas un template générique",
      "Formulaire intelligent qui qualifie les prospects avant que vous les rappelliez",
      "Emails automatiques qui répondent même quand vous dormez",
      "Tout inclus : hébergement, maintenance, mise à jour initiale",
    ],
    objectionHandling: OBJECTIONS,
    pitchScript,
    dmShort,
    dmPremium,
    emailProfessional,
    followUps: [
      "J+1 : Bonjour [Prénom], je voulais m'assurer que vous avez bien reçu la maquette. Des questions ?",
      "J+3 : [Prénom], avez-vous eu l'occasion de regarder la démo ? Je suis disponible pour en parler ce soir ou cette semaine.",
      "J+7 : Dernière relance — je mets votre slot de côté jusqu'à vendredi. Après je la propose à un autre [secteur] de [ville].",
    ],
    depositMessage: `Parfait ! Pour démarrer, je vous demande un acompte de 30% — ${Math.round(parseInt(premiumPack.price) * 0.3)}€ — par virement ou Stripe. Je vous envoie le lien de paiement maintenant et je commence dès réception.`,
  }
}
