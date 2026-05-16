export interface ComparisonPoint {
  category: string
  competitor: string
  yours: string
}

export interface CompetitorComparison {
  competitorLabel: string
  competitorEmoji: string
  yourEmoji: string
  headline: string
  points: ComparisonPoint[]
}

const COMPARISONS: Record<string, CompetitorComparison> = {
  restaurant: {
    competitorLabel: "McDonald's · KFC · O'Tacos",
    competitorEmoji: '🍟',
    yourEmoji: '🍽️',
    headline: 'Pourquoi venir chez vous plutôt que dans une chaîne ?',
    points: [
      {
        category: 'Ingrédients',
        competitor: 'Surgelés livrés en camion, mêmes recettes dans 3 000 restaurants',
        yours: 'Marché local chaque matin, recettes du chef, produits de saison',
      },
      {
        category: 'Expérience',
        competitor: 'Plateau plastique, file d\'attente, musique à fond, décor identique partout',
        yours: 'Table dressée, ambiance unique, service attentionné, souvenir mémorable',
      },
      {
        category: 'Valeur',
        competitor: '12–15 € pour un repas vite expédié que vous oubliez en sortant',
        yours: '20–30 € pour une expérience que vous recommandez à vos amis',
      },
      {
        category: 'Histoire',
        competitor: 'Franchise #4 821, directeur régional inconnu, logo imposé',
        yours: 'Chef passionné, recettes de famille, histoire locale vraie',
      },
      {
        category: 'Fidélité',
        competitor: 'Application de points que personne n\'ouvre, coupons automatiques',
        yours: 'On connaît votre prénom dès la 2ᵉ visite, votre table favorite réservée',
      },
      {
        category: 'Livraison',
        competitor: '30 % de commission à Uber Eats, contact client zéro',
        yours: 'Commande directe, frais réduits, relation client préservée',
      },
    ],
  },

  beauté: {
    competitorLabel: 'Yves Rocher · Body Shop · Institut en chaîne',
    competitorEmoji: '🏪',
    yourEmoji: '💆',
    headline: 'Pourquoi choisir votre institut plutôt qu\'une grande chaîne ?',
    points: [
      {
        category: 'Personnalisation',
        competitor: 'Protocole standard pour tous, bilan peau en 3 minutes sous pression commerciale',
        yours: 'Diagnostic complet, programme sur mesure, évolution suivie visite après visite',
      },
      {
        category: 'Produits',
        competitor: 'Gamme maison imposée par le siège, objectif vente additionnelle',
        yours: 'Sélection premium adaptée à votre peau, sans pression d\'achat',
      },
      {
        category: 'Relation',
        competitor: 'Esthéticienne différente à chaque visite, aucune continuité',
        yours: 'Votre praticienne vous connaît, suit vos résultats, s\'adapte',
      },
      {
        category: 'Résultats',
        competitor: 'Résultats génériques, photos "avant/après" retouchées en vitrine',
        yours: 'Résultats réels visibles, photos authentiques de vraies clientes',
      },
      {
        category: 'Tarifs',
        competitor: 'Promotions permanentes trompeuses, prix "barrés" gonflés',
        yours: 'Tarifs clairs et stables, devis envoyé avant chaque soin',
      },
      {
        category: 'Accueil',
        competitor: 'Accueil scripted, objectifs de vente affiché sur l\'écran du conseiller',
        yours: 'Café à l\'arrivée, ambiance zen, vous prenez soin de vous sans stress',
      },
    ],
  },

  automobile: {
    competitorLabel: 'Norauto · Midas · Speedy · Feu Vert',
    competitorEmoji: '🏭',
    yourEmoji: '🔧',
    headline: 'Pourquoi confier votre voiture à votre garage plutôt qu\'à une chaîne ?',
    points: [
      {
        category: 'Diagnostic',
        competitor: 'Technicien pressé, devis gonflé avec pièces inutiles, forfait de vente',
        yours: 'Mécanicien qui explique, photos du problème, devis transparent',
      },
      {
        category: 'Pièces',
        competitor: 'Pièces d\'origine forcées, marge maximale, alternatives cachées',
        yours: 'Choix entre pièces origine et équivalent qualité, vous décidez',
      },
      {
        category: 'Délais',
        competitor: 'Créneau imposé à une semaine, voiture rendue en retard',
        yours: 'Rendez-vous adapté à votre agenda, délai tenu ou vous êtes prévenu',
      },
      {
        category: 'Confiance',
        competitor: 'Technicien anonyme, responsable régional jamais joignable',
        yours: 'Vous connaissez le mécanicien par son prénom, il répond au téléphone',
      },
      {
        category: 'Suivi',
        competitor: 'Zéro suivi, relance promo pour pneus tous les 3 mois',
        yours: 'Rappel entretien personnalisé, historique de votre véhicule conservé',
      },
      {
        category: 'Prix',
        competitor: 'Tarifs nationaux sans marge de négociation, gestes commerciaux rares',
        yours: 'Juste prix, fidélité récompensée, premier devis offert',
      },
    ],
  },

  immobilier: {
    competitorLabel: 'Leboncoin · SeLoger · Bien\'ici · Portails en ligne',
    competitorEmoji: '💻',
    yourEmoji: '🏠',
    headline: 'Pourquoi passer par votre agence plutôt que par un portail ?',
    points: [
      {
        category: 'Connaissance locale',
        competitor: 'Algorithme sans expertise terrain, prix nationaux sans nuance de quartier',
        yours: 'Expert du secteur depuis des années, prix réels, micro-marchés connus',
      },
      {
        category: 'Biens exclusifs',
        competitor: 'Annonces publiques vues par 50 000 personnes, concurrence maximale',
        yours: 'Biens off-market en avant-première, avant la mise en ligne',
      },
      {
        category: 'Accompagnement',
        competitor: 'Formulaire en ligne, bot de mise en relation, zéro conseil',
        yours: 'Accompagnement de A à Z : visite, compromis, notaire, remise des clés',
      },
      {
        category: 'Négociation',
        competitor: 'Vous seul face au vendeur ou acheteur, asymétrie d\'information',
        yours: 'Négociateur professionnel qui défend vos intérêts',
      },
      {
        category: 'Garanties',
        competitor: '"Gratuit" pour l\'acheteur… mais qui paye les honoraires vendeur ?',
        yours: 'Honoraires clairs, mission précise, engagement de résultat écrit',
      },
      {
        category: 'Réseau',
        competitor: 'Votre annonce parmi 300 000, noyée en 24h',
        yours: 'Réseau d\'acquéreurs qualifiés, acheteurs sérieux déjà en base',
      },
    ],
  },

  coaching: {
    competitorLabel: 'Coursera · Udemy · YouTube · Apps de développement',
    competitorEmoji: '📱',
    yourEmoji: '🎯',
    headline: 'Pourquoi un coaching individuel plutôt qu\'une app ou formation en ligne ?',
    points: [
      {
        category: 'Personnalisation',
        competitor: 'Contenu identique pour 50 000 inscrits, aucune adaptation à votre situation',
        yours: 'Programme construit autour de vous, de votre histoire, de vos blocages',
      },
      {
        category: 'Résultats',
        competitor: 'Taux de complétion < 8 %, vidéos regardées mais rien ne change',
        yours: 'Objectifs définis, jalons mesurables, résultats concrets en semaines',
      },
      {
        category: 'Engagement',
        competitor: 'Aucune accountability, facile de reporter à demain indéfiniment',
        yours: 'Rendez-vous hebdomadaire, suivi entre les séances, progression visible',
      },
      {
        category: 'Soutien',
        competitor: 'Forum communautaire avec réponses en 72h, bot de support',
        yours: 'Accès direct, réponse rapide, soutien dans les moments difficiles',
      },
      {
        category: 'Investissement',
        competitor: 'Abonnement mensuel sans fin, sensation de toujours manquer quelque chose',
        yours: 'Programme défini dans le temps, ROI clair, objectif atteint = terminé',
      },
      {
        category: 'Transformation',
        competitor: 'Connaissances accumulées, mais comportements qui ne changent pas',
        yours: 'Changement profond, réel, qui dure après la fin du coaching',
      },
    ],
  },

  'e-commerce': {
    competitorLabel: 'Amazon · ASOS · Shein · Grandes marketplaces',
    competitorEmoji: '📦',
    yourEmoji: '✨',
    headline: 'Pourquoi commander chez vous plutôt que sur Amazon ou Shein ?',
    points: [
      {
        category: 'Qualité',
        competitor: 'Produits d\'entrée de gamme, photos retouchées, avis achetés par milliers',
        yours: 'Sélection rigoureuse, photos authentiques, retours clients vérifiés',
      },
      {
        category: 'Origine',
        competitor: 'Entrepôts en Chine, délais 3–8 semaines, emballage plastique',
        yours: 'Produits sourcés avec soin, livraison rapide, packaging éco-responsable',
      },
      {
        category: 'Service',
        competitor: 'Support bot, retour à vos frais, remboursement sous 30 jours si tout va bien',
        yours: 'Vraie personne, retour facilité, échange ou remboursement sans friction',
      },
      {
        category: 'Conseil',
        competitor: 'Algorithme de recommandation basé sur votre historique d\'achat',
        yours: 'Conseil personnalisé selon votre profil, vos besoins, vos préférences',
      },
      {
        category: 'Impact',
        competitor: 'Commerce qui optimise la fiscalité, emplois délocalisés',
        yours: 'Commerce local, emplois réels, contribution à l\'économie française',
      },
      {
        category: 'Expérience',
        competitor: 'Colis générique au fond d\'un sac, aucune émotion',
        yours: 'Unboxing soigné, mot personnel, fidélité vraiment récompensée',
      },
    ],
  },

  fitness: {
    competitorLabel: 'Basic-Fit · Fitness Park · Salle low-cost',
    competitorEmoji: '🏭',
    yourEmoji: '💪',
    headline: 'Pourquoi votre salle plutôt qu\'une grande chaîne low-cost ?',
    points: [
      {
        category: 'Suivi',
        competitor: 'Bilan initial en 10 min puis débrouille-toi, coach disponible 5% du temps',
        yours: 'Suivi régulier, programme ajusté, coach qui connaît vos limites',
      },
      {
        category: 'Ambiance',
        competitor: '800 abonnés aux heures de pointe, machines occupées, vestiaires bondés',
        yours: 'Groupe taille humaine, ambiance bienveillante, vraie communauté',
      },
      {
        category: 'Résultats',
        competitor: '73 % des abonnés n\'y vont plus après 3 mois, abonnement prélevé quand même',
        yours: 'Objectifs fixés ensemble, accountability, résultats mesurés',
      },
      {
        category: 'Abonnement',
        competitor: '25 €/mois mais engagement 12 mois, frais de résiliation cachés',
        yours: 'Tarif transparent, formules flexibles, pas de mauvaises surprises',
      },
      {
        category: 'Equipement',
        competitor: 'Machines en panne non réparées, attente de cardio aux heures de pointe',
        yours: 'Matériel entretenu, espace disponible, conditions optimales',
      },
    ],
  },

  artisan: {
    competitorLabel: 'Grandes enseignes · Travaux.com · Marketplaces travaux',
    competitorEmoji: '🏭',
    yourEmoji: '🔨',
    headline: 'Pourquoi votre artisan plutôt qu\'une plateforme ou grande enseigne ?',
    points: [
      {
        category: 'Devis',
        competitor: 'Devis gonflé, postes incompréhensibles, fournitures surestimées',
        yours: 'Devis détaillé poste par poste, matériaux expliqués, juste prix',
      },
      {
        category: 'Interlocuteur',
        competitor: 'Franchise ou sous-traitant inconnu, responsable jamais sur place',
        yours: 'L\'artisan lui-même présent, responsable du début à la fin',
      },
      {
        category: 'Délais',
        competitor: 'Planning géré à distance, retards non communiqués',
        yours: 'Planning partagé, prévenu en cas d\'imprévu, délais respectés',
      },
      {
        category: 'Garanties',
        competitor: 'SAV qui renvoie vers le fabricant, garantie décennale introuvable',
        yours: 'Garantie décennale active, joignable après travaux, SAV réactif',
      },
      {
        category: 'Qualité',
        competitor: 'Standardisé, matériaux d\'entrée de gamme pour marge maximale',
        yours: 'Matériaux choisis selon le chantier, finitions soignées, fierté du travail',
      },
    ],
  },
}

const DEFAULT_COMPARISON: CompetitorComparison = {
  competitorLabel: 'Grande chaîne · Plateforme nationale · Concurrent générique',
  competitorEmoji: '🏭',
  yourEmoji: '⭐',
  headline: 'Pourquoi vous choisir plutôt qu\'une grande structure ?',
  points: [
    {
      category: 'Personnalisation',
      competitor: 'Service identique pour tous, process standardisé, aucune adaptation',
      yours: 'Accompagnement sur mesure, adapté à votre situation spécifique',
    },
    {
      category: 'Relation',
      competitor: 'Interlocuteur changeant, numéro de dossier, centre d\'appel',
      yours: 'Votre interlocuteur unique, qui vous connaît et suit votre dossier',
    },
    {
      category: 'Réactivité',
      competitor: 'Délai de traitement 5–10 jours ouvrés, formulaire en ligne uniquement',
      yours: 'Réponse rapide, contact direct, disponible sur WhatsApp',
    },
    {
      category: 'Expertise locale',
      competitor: 'Connaissance générale sans ancrage terrain, conseils génériques',
      yours: 'Expert de votre secteur et de votre zone, connaissance fine du marché',
    },
    {
      category: 'Prix',
      competitor: 'Tarifs rigides fixés nationalement, aucune flexibilité',
      yours: 'Tarif juste, adapté à votre projet, devis gratuit et transparent',
    },
  ],
}

export function getComparison(sector: string): CompetitorComparison {
  const normalized = sector.toLowerCase().trim()
  for (const key of Object.keys(COMPARISONS)) {
    if (normalized.includes(key)) return COMPARISONS[key]
  }
  return DEFAULT_COMPARISON
}
