import type { AutomationOption, CommercialPack, AutomationSalesData } from '@/types'

// ─── Sector-specific WhatsApp messages ───────────────────────────────────────

const WHATSAPP: Record<string, string> = {
  beauté: `Bonjour [PRÉNOM] ! 💆‍♀️\n\nMerci pour votre demande chez [NOM DU SALON].\nJe peux vous proposer un créneau [JOUR] à [HEURE].\n\nCela vous convient ? 🌸`,
  restaurant: `Bonjour ! 🍽️\n\nMerci pour votre demande de réservation.\nJe confirme votre table pour [N] personnes le [DATE] à [HEURE].\n\nÀ très bientôt !`,
  événementiel: `Bonjour [PRÉNOM] ! 🎊\n\nMerci pour votre demande concernant votre [TYPE D'ÉVÉNEMENT].\nJ'adorerais en discuter — je suis disponible [JOUR] à [HEURE] pour un appel rapide.\n\nÇa vous va ?`,
  automobile: `Bonjour [PRÉNOM] ! 🚗\n\nMerci pour votre demande. Je peux prendre en charge votre [MODÈLE] le [DATE] à [HEURE].\n\nCela vous convient ?`,
  coaching: `Bonjour [PRÉNOM] ! 🎯\n\nMerci pour votre intérêt pour mon accompagnement.\nJe vous propose un appel découverte GRATUIT de 30 min pour voir si je peux vraiment vous aider.\n\nQuand êtes-vous disponible cette semaine ?`,
  artisan: `Bonjour [PRÉNOM] ! 🔧\n\nMerci pour votre demande concernant [TRAVAUX].\nJe peux passer faire un état des lieux sans engagement le [DATE] à [HEURE].\n\nCela vous convient ?`,
  médical: `Bonjour [PRÉNOM] ! 👨‍⚕️\n\nMerci pour votre demande de rendez-vous.\nJe suis disponible le [DATE] à [HEURE].\n\nMerci de confirmer votre présence.`,
  fitness: `Bonjour [PRÉNOM] ! 💪\n\nBienvenue chez [NOM] !\nJe vous offre une séance d'essai GRATUITE pour découvrir nos cours.\n\nQuel jour vous conviendrait le mieux ?`,
  immobilier: `Bonjour [PRÉNOM] ! 🏠\n\nMerci pour votre demande.\nVotre projet [ACHAT/LOCATION] à [VILLE] m'intéresse beaucoup.\n\nJe suis disponible pour un appel de 15 min demain. Ça vous va ?`,
  hôtellerie: `Bonjour [PRÉNOM] ! 🏨\n\nMerci pour votre demande de réservation.\nJe confirme votre séjour du [DATE ARRIVÉE] au [DATE DÉPART].\n\nNous avons hâte de vous accueillir !`,
  général: `Bonjour [PRÉNOM] ! ✨\n\nMerci pour votre message.\nNotre équipe revient vers vous dans les 2h.\n\nÀ très bientôt !`,
}

// ─── Email templates ──────────────────────────────────────────────────────────

const EMAIL_PRO: Record<string, string> = {
  beauté: `Objet : Confirmation de votre demande — [NOM DU SALON]\n\nBonjour [PRÉNOM],\n\nNous avons bien reçu votre demande de rendez-vous pour [SERVICE].\n\nNous vous proposons le créneau suivant :\n📅 [DATE] à [HEURE]\n\nMerci de confirmer par retour d'email ou au [TÉLÉPHONE].\n\nCordialement,\nL'équipe [NOM DU SALON]`,
  coaching: `Objet : Votre demande de coaching — Prochaine étape\n\nBonjour [PRÉNOM],\n\nMerci pour l'intérêt que vous portez à mon accompagnement.\n\nAfin de mieux cerner votre situation, je vous propose un appel découverte de 30 minutes, entièrement gratuit et sans engagement.\n\n→ Choisissez votre créneau : [LIEN CALENDLY]\n\nÀ très bientôt,\n[PRÉNOM DU COACH]`,
  artisan: `Objet : Votre demande de devis — [ENTREPRISE]\n\nBonjour [PRÉNOM],\n\nNous avons bien reçu votre demande concernant [TRAVAUX].\n\nNous reviendrons vers vous dans les 24h avec un devis détaillé.\nPour toute urgence : [TÉLÉPHONE]\n\nCordialement,\n[NOM DE L'ARTISAN]`,
  général: `Objet : Confirmation de votre demande — [ENTREPRISE]\n\nBonjour [PRÉNOM],\n\nNous avons bien reçu votre demande et nous vous en remercions.\n\nNotre équipe va l'étudier et revient vers vous sous 2 heures ouvrées.\n\nCordialement,\nL'équipe [NOM]`,
}

const EMAIL_CHALEUREUX: Record<string, string> = {
  beauté: `Objet : On a hâte de vous accueillir ! 💆‍♀️\n\nBonjour [PRÉNOM] !\n\nSuper nouvelle — votre demande pour [SERVICE] est bien arrivée 🌸\n\nOn vous propose le [DATE] à [HEURE]. Ça vous va ?\n\nÀ très vite,\nL'équipe [NOM] ✨`,
  coaching: `Objet : Votre transformation commence maintenant 🎯\n\nSalut [PRÉNOM] !\n\nBravo d'avoir fait le premier pas — c'est souvent le plus difficile ! 💪\n\nJe vous propose qu'on échange 30 min gratuitement pour voir si je peux vraiment vous aider.\n\n→ Choisissez votre créneau : [LIEN]\n\nÀ bientôt,\n[COACH]`,
  général: `Objet : On a reçu votre message ! 😊\n\nBonjour [PRÉNOM] !\n\nMerci pour votre demande, ça nous fait vraiment plaisir ! 🙏\n\nOn revient vers vous très vite (dans les 2h max).\n\nÀ très bientôt,\nL'équipe ✨`,
}

// ─── Follow-up sequences ──────────────────────────────────────────────────────

const FOLLOWUP: Record<string, { j1: string; j3: string; j7: string }> = {
  beauté: {
    j1: `Bonjour [PRÉNOM] 😊\n\nJuste un petit mot pour voir si vous avez trouvé ce que vous cherchiez.\n\nJe reste disponible pour répondre à vos questions. À bientôt ! 🌸`,
    j3: `Bonjour [PRÉNOM] !\n\nVotre [SERVICE] est toujours disponible cette semaine ✨\n\nPlus que quelques créneaux libres — souhaitez-vous que j'en réserve un pour vous ?\n\nRépondez juste "OUI" et je m'en occupe 🙂`,
    j7: `Bonjour [PRÉNOM] !\n\nDernière disponibilité avant fermeture de votre créneau 🌸\n\nNos agendas se remplissent vite. Souhaitez-vous confirmer ?\n\nUne petite réponse et c'est réglé ! ✅`,
  },
  coaching: {
    j1: `Bonjour [PRÉNOM] 🎯\n\nJ'espère que vous avez eu le temps de réfléchir à votre projet.\n\nMon appel découverte est toujours dispo — sans engagement. Vous souhaitez qu'on échange ?\n\nÀ bientôt !`,
    j3: `Bonjour [PRÉNOM] !\n\nJe pense à vous et à votre objectif [OBJECTIF]. Ce genre de décision prend du temps, c'est tout à fait normal.\n\nMais sachez que mes clients obtiennent [RÉSULTAT] en moyenne sous [DÉLAI] ✨\n\nJe vous laisse un dernier créneau cette semaine. Intéressé(e) ?`,
    j7: `Bonjour [PRÉNOM] !\n\nMon programme démarre la semaine prochaine — les premières places sont réservées.\n\nSi vous souhaitez rejoindre la prochaine session, il faut s'inscrire maintenant ⏰\n\nC'est votre dernier tour pour bénéficier du tarif actuel.`,
  },
  artisan: {
    j1: `Bonjour [PRÉNOM] 🔧\n\nJust un petit rappel — votre demande de devis pour [TRAVAUX] est bien en attente.\n\nJe peux me libérer rapidement si vous souhaitez avancer. Vous êtes toujours intéressé(e) ?`,
    j3: `Bonjour [PRÉNOM] !\n\nVotre projet [TRAVAUX] est toujours d'actualité ?\n\nJ'ai quelques créneaux libres cette semaine pour intervenir rapidement si besoin. N'hésitez pas !`,
    j7: `Bonjour [PRÉNOM] !\n\nDernier rappel pour votre projet [TRAVAUX] 🏠\n\nSi vous avez trouvé quelqu'un entre-temps, pas de problème. Mais si ce n'est pas encore fait, je peux vous proposer un devis cette semaine.`,
  },
  général: {
    j1: `Bonjour [PRÉNOM] 😊\n\nJuste un petit mot pour m'assurer que votre demande a bien été traitée.\n\nAvez-vous des questions ? Je reste disponible !\n\nBonne journée 🌟`,
    j3: `Bonjour [PRÉNOM] !\n\nVotre demande est toujours d'actualité ?\n\nNous avons des disponibilités cette semaine. N'hésitez pas à revenir vers nous !\n\nÀ très bientôt !`,
    j7: `Bonjour [PRÉNOM] !\n\nC'est notre dernier rappel — nous voulons vraiment vous aider !\n\nSi votre projet a évolué ou si vous avez trouvé une autre solution, pas de problème.\n\nMais si vous cherchez toujours, on est là 🙂`,
  },
}

// ─── Form questions by sector ─────────────────────────────────────────────────

const FORM_QUESTIONS: Record<string, string[]> = {
  beauté: ['Quel service souhaitez-vous ?', 'Êtes-vous déjà client(e) chez nous ?', 'Avez-vous des allergies ou contre-indications ?', 'Préférez-vous matin ou après-midi ?', 'Comment avez-vous connu le salon ?'],
  restaurant: ['Pour combien de personnes ?', 'Quelle occasion (anniversaire, professionnel, romantique…) ?', 'Avez-vous des allergies alimentaires ?', 'Souhaitez-vous un menu spécial ?', 'Préférez-vous salle ou terrasse ?'],
  événementiel: ['Type d\'événement ?', 'Date envisagée ?', 'Nombre d\'invités ?', 'Lieu prévu ou à trouver ?', 'Budget approximatif ?', 'Services souhaités (traiteur, déco, photo…) ?'],
  automobile: ['Marque et modèle du véhicule ?', 'Kilométrage actuel ?', 'Type de prestation (entretien, carrosserie, détailing…) ?', 'Date souhaitée ?', 'Problème spécifique constaté ?'],
  coaching: ['Quel est votre objectif principal ?', 'Depuis combien de temps cherchez-vous une solution ?', 'Avez-vous déjà travaillé avec un coach ?', 'Budget mensuel envisagé ?', 'Disponible pour démarrer dans les 2 semaines ?'],
  artisan: ['Type de travaux (plomberie, électricité, peinture…) ?', 'Surface concernée ?', 'Urgence ou projet planifié ?', 'Propriétaire ou locataire ?', 'Budget estimé ?'],
  médical: ['Motif de consultation ?', 'Avez-vous une mutuelle ?', 'Avez-vous déjà consulté pour ce problème ?', 'Urgence ou consultation de suivi ?', 'Date de disponibilité ?'],
  fitness: ['Objectif (perte de poids, musculation, bien-être…) ?', 'Niveau actuel (débutant, intermédiaire, avancé) ?', 'Disponibilités dans la semaine ?', 'Cours collectifs ou coaching perso ?', 'Limitations physiques éventuelles ?'],
  immobilier: ['Achat ou location ?', 'Type de bien (appartement, maison…) ?', 'Budget maximum ?', 'Secteur géographique souhaité ?', 'Délai du projet ?', 'Situation actuelle (locataire, propriétaire) ?'],
  général: ['Quel service vous intéresse ?', 'Budget approximatif ?', 'Disponibilité souhaitée ?', 'Avez-vous déjà une idée précise de votre besoin ?', 'Comment avez-vous connu notre établissement ?'],
}

// ─── Recommendations by sector ────────────────────────────────────────────────

const SECTOR_RECO: Record<string, string[]> = {
  beauté: ['rdv', 'whatsapp', 'reponse-auto', 'relances'],
  restaurant: ['rdv', 'whatsapp', 'reponse-auto'],
  événementiel: ['devis-auto', 'qualification', 'reponse-auto', 'relances', 'acompte'],
  automobile: ['devis-auto', 'whatsapp', 'reponse-auto', 'relances'],
  mode: ['whatsapp', 'reponse-auto', 'dashboard'],
  luxe: ['whatsapp', 'rdv', 'reponse-auto', 'acompte'],
  immobilier: ['qualification', 'devis-auto', 'reponse-auto', 'relances', 'crm'],
  coaching: ['qualification', 'rdv', 'relances', 'acompte', 'reponse-auto'],
  médical: ['rdv', 'reponse-auto', 'whatsapp'],
  fitness: ['rdv', 'whatsapp', 'reponse-auto', 'acompte', 'relances'],
  hôtellerie: ['rdv', 'whatsapp', 'reponse-auto', 'acompte'],
  'e-commerce': ['reponse-auto', 'dashboard', 'relances'],
  artisan: ['devis-auto', 'qualification', 'whatsapp', 'reponse-auto', 'relances'],
  general: ['whatsapp', 'reponse-auto', 'rdv', 'devis-auto'],
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateAutomationSales(
  sector: string,
  businessName: string,
  city: string,
  goal: string,
): AutomationSalesData {
  const recommended = SECTOR_RECO[sector] ?? SECTOR_RECO.general ?? []

  const wa = WHATSAPP[sector] ?? WHATSAPP.général ?? ''
  const emailPro = EMAIL_PRO[sector] ?? EMAIL_PRO.général ?? ''
  const emailChal = EMAIL_CHALEUREUX[sector] ?? EMAIL_CHALEUREUX.général ?? ''
  const fu = FOLLOWUP[sector] ?? FOLLOWUP.général ?? { j1: '', j3: '', j7: '' }
  const fq = FORM_QUESTIONS[sector] ?? FORM_QUESTIONS.général ?? []

  const sectorLabel = sector === 'general' ? 'commerce' : sector

  const options: AutomationOption[] = [
    {
      id: 'devis-auto',
      name: 'Devis automatique intelligent',
      category: 'Génération de leads',
      problem: 'Vos clients attendent 24–48h pour un devis. La plupart n\'attendent pas.',
      benefit: 'Chaque demande génère un devis estimatif immédiat adapté au secteur. 3× plus de prospects convertis.',
      complexity: 'moyenne',
      perceivedValue: 'forte',
      salesPitch: `"Avec ce formulaire, vos clients obtiennent une estimation en 2 minutes au lieu d'attendre 48h. Résultat : 70% de moins d'abandons et votre agenda qui se remplit tout seul."`,
      recommended: recommended.includes('devis-auto'),
      price: '+300€',
      details: {
        formQuestions: fq,
        emailPro: `📥 Nouveau devis reçu !\n\nClient : [NOM]\nService : [SERVICE]\nBudget estimé : [BUDGET]\nUrgence : [URGENCE]\n\n→ Répondre dans les 2h recommandé.`,
      },
    },
    {
      id: 'qualification',
      name: 'Qualification prospect',
      category: 'Qualification',
      problem: 'Impossible de distinguer les prospects sérieux des curieux. Perte de temps garantie.',
      benefit: 'Chaque prospect reçoit un score de 0 à 100. Vous ne gérez que les leads chauds (>70).',
      complexity: 'moyenne',
      perceivedValue: 'forte',
      salesPitch: `"Ce système note chaque prospect de 0 à 100 selon son urgence, son budget et son sérieux. Vous passez votre temps uniquement sur les clients qui ont vraiment envie d'acheter."`,
      recommended: recommended.includes('qualification'),
      price: '+200€',
      details: {
        scoreFields: [
          'Urgence déclarée (0–30 pts)',
          'Budget cohérent avec l\'offre (0–25 pts)',
          'Projet bien défini (0–25 pts)',
          'Disponibilité rapide (0–20 pts)',
        ],
        emailPro: `🎯 Prospect qualifié !\n\nScore : [SCORE]/100 — [FROID / TIÈDE / CHAUD]\nNom : [NOM]\nBesoin : [BESOIN]\nBudget : [BUDGET]\nUrgence : [URGENCE]\n\nAction recommandée : [APPELER / ENVOYER DEVIS / ATTENDRE]`,
      },
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp intelligent',
      category: 'Communication',
      problem: 'Les prospects contactent par WhatsApp puis disparaissent faute de réponse rapide.',
      benefit: 'Message de bienvenue automatique dès la demande. 3× plus de conversions vs email seul.',
      complexity: 'simple',
      perceivedValue: 'forte',
      salesPitch: `"Dès qu'un prospect envoie sa demande, il reçoit un message WhatsApp personnalisé en moins d'une minute. Même à 22h. Même le week-end. Vous ne perdez plus jamais un lead."`,
      recommended: recommended.includes('whatsapp'),
      price: '+150€',
      details: {
        whatsappMessage: wa,
        whatsappExample: `✅ Exemple de message reçu par le commerce :\n"Bonjour, je suis [PRÉNOM] depuis votre site. J'aimerais [SERVICE]"\n\n→ Réponse automatique envoyée en < 1 min :\n\n${wa}`,
      },
    },
    {
      id: 'reponse-auto',
      name: 'Réponse automatique',
      category: 'Communication',
      problem: 'Aucun accusé de réception = prospect qui s\'inquiète et cherche ailleurs.',
      benefit: 'Chaque prospect reçoit une réponse professionnelle en < 1 minute, 24h/24 7j/7.',
      complexity: 'simple',
      perceivedValue: 'forte',
      salesPitch: `"Chaque client qui remplit le formulaire reçoit immédiatement un email de confirmation. Même la nuit. Même le dimanche. Résultat : vous paraissez plus réactif que n'importe quel concurrent."`,
      recommended: recommended.includes('reponse-auto'),
      price: '+100€',
      details: {
        emailPro,
        emailChalleureux: emailChal,
      },
    },
    {
      id: 'relances',
      name: 'Relances automatiques',
      category: 'Suivi & Conversion',
      problem: '80% des deals se concluent après 5+ contacts. Personne ne relance manuellement.',
      benefit: 'Séquence J+1, J+3, J+7 automatique. Récupérez 30% de prospects que vous pensiez perdus.',
      complexity: 'avancée',
      perceivedValue: 'premium',
      salesPitch: `"La majorité des clients ont besoin d'être relancés pour décider. Ce système envoie 3 messages automatiques aux prospects silencieux. Vous récupérez des ventes que vous aviez déjà perdues."`,
      recommended: recommended.includes('relances'),
      price: '+400€',
      details: {
        followupJ1: fu.j1,
        followupJ3: fu.j3,
        followupJ7: fu.j7,
      },
    },
    {
      id: 'rdv',
      name: 'Prise de rendez-vous',
      category: 'Réservation',
      problem: 'Les allers-retours téléphoniques pour fixer un RDV font fuir les clients pressés.',
      benefit: 'Réservation en ligne 24h/24. Le client choisit son créneau sans appeler. 40% de no-shows en moins.',
      complexity: 'simple',
      perceivedValue: 'forte',
      salesPitch: `"Votre client choisit son créneau directement sur le site, à 23h si ça lui chante. Plus d'appels pour 'est-ce que mardi ça vous va'. Votre agenda se remplit tout seul."`,
      recommended: recommended.includes('rdv'),
      price: '+250€',
      details: {
        bookingInfo: `Intégration Calendly ou système natif\n\n✓ Sélection de créneau en ligne\n✓ Confirmation automatique email + SMS\n✓ Rappel automatique 24h avant\n✓ Annulation possible en ligne\n✓ Synchronisation Google Calendar`,
      },
    },
    {
      id: 'acompte',
      name: 'Paiement d\'acompte',
      category: 'Conversion & Sécurité',
      problem: 'Faux clients, no-shows, réservations fantômes → temps et argent perdus.',
      benefit: 'Demandez 30% d\'acompte à la réservation. 95% de no-shows en moins. Clients sérieux uniquement.',
      complexity: 'avancée',
      perceivedValue: 'premium',
      salesPitch: `"Avec ce système, seuls les clients qui paient l'acompte confirment vraiment. Fini les journées gâchées à attendre quelqu'un qui n'arrive pas. Et vos clients se sentent plus engagés."`,
      recommended: recommended.includes('acompte'),
      price: '+500€',
      details: {
        paymentInfo: `Intégration Stripe (2.9% + 0.30€/transaction)\n\n✓ Lien de paiement sécurisé\n✓ Confirmation immédiate par email\n✓ Remboursement simple si annulation\n✓ Tableau de bord des paiements\n✓ Argument anti-faux-clients inclus`,
      },
    },
    {
      id: 'crm',
      name: 'Mini CRM',
      category: 'Organisation',
      problem: 'Les demandes arrivent de partout et se perdent dans les messages et emails.',
      benefit: 'Tableau Kanban pour suivre chaque prospect. Ne perdez plus jamais une demande ou un deal.',
      complexity: 'avancée',
      perceivedValue: 'premium',
      salesPitch: `"Toutes vos demandes dans un seul tableau : Nouveau → Devis envoyé → Gagné. Vous savez en un coup d'œil où en est chaque client. Plus simple qu'un CRM classique, 100% adapté à votre activité."`,
      recommended: recommended.includes('crm'),
      price: '+400€',
      details: {
        crmColumns: ['🆕 Nouveau', '📞 À rappeler', '📄 Devis envoyé', '✅ Gagné', '❌ Perdu'],
      },
    },
    {
      id: 'dashboard',
      name: 'Dashboard demandes',
      category: 'Analytics',
      problem: 'Impossible de mesurer l\'impact du site ou d\'optimiser les conversions.',
      benefit: 'Tableau de bord avec métriques clés. Montrez des chiffres concrets à votre client chaque mois.',
      complexity: 'avancée',
      perceivedValue: 'premium',
      salesPitch: `"Chaque mois, votre client voit combien de demandes le site a générées, quels services sont les plus populaires et ce que ça lui a rapporté. C'est ce qui justifie la maintenance mensuelle et renouvelle le contrat."`,
      recommended: recommended.includes('dashboard'),
      price: '+350€',
      details: {
        dashboardMetrics: [
          'Nombre de demandes ce mois',
          'Prospects chauds (score > 70)',
          'Devis envoyés',
          'Taux de conversion estimé',
          'Chiffre d\'affaires potentiel généré',
          'Services les plus demandés',
        ],
      },
    },
  ]

  const packs: CommercialPack[] = [
    {
      id: 'pack-vitrine',
      name: 'Site Vitrine Intelligent',
      tagline: 'L\'essentiel pour être professionnel en ligne',
      price: '800€',
      priceHigh: '1 200€',
      features: [
        'Site premium adapté au secteur',
        'Galerie photos (8 photos)',
        'Présentation des services',
        'Section avis clients',
        'FAQ interactive accordéon',
        'Formulaire de contact',
        'WhatsApp intelligent',
        'Réponse automatique prospect',
        'SEO local optimisé',
        'Export HTML standalone',
      ],
      automationIds: ['whatsapp', 'reponse-auto'],
      highlighted: false,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'pack-devis',
      name: 'Site + Devis Automatique',
      tagline: 'Pour générer et qualifier des leads automatiquement',
      price: '1 500€',
      priceHigh: '2 000€',
      features: [
        'Tout le Pack Vitrine Intelligent',
        'Formulaire devis intelligent',
        'Score prospect 0–100',
        'Email automatique pro au prospect',
        'Résumé de demande au commerce',
        'Relance J+1 prête à l\'envoi',
        'Export Google Sheets / CSV',
        'Mini CRM Kanban simple',
        'Formation 1h incluse',
        'Support 30 jours',
      ],
      automationIds: ['devis-auto', 'qualification', 'reponse-auto', 'relances', 'crm'],
      highlighted: true,
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'pack-auto',
      name: 'Site + Automatisation Client',
      tagline: 'Le système complet pour ne plus perdre un seul client',
      price: '2 500€',
      priceHigh: '3 500€',
      features: [
        'Tout le Pack Devis Automatique',
        'Relances automatiques J+1, J+3, J+7',
        'Mini CRM complet multi-colonnes',
        'Prise de RDV en ligne (Calendly)',
        'Paiement d\'acompte Stripe',
        'Dashboard demandes mensuel',
        'Rapport mensuel client PDF',
        'Maintenance 3 mois incluse',
        'Support prioritaire 7j/7',
        'Revue stratégique trimestrielle',
      ],
      automationIds: ['relances', 'crm', 'rdv', 'acompte', 'dashboard'],
      highlighted: false,
      color: 'from-emerald-500 to-green-600',
    },
  ]

  const clientArgument = `Pourquoi un simple site ne suffit plus pour un ${sectorLabel} en ${new Date().getFullYear()} :

📊 Les chiffres qui parlent :
• 78% des prospects contactent 3 prestataires avant de choisir
• Le premier à répondre gagne le client dans 80% des cas
• Un prospect non relancé sous 24h est perdu à 67%
• Seulement 2% des ventes se font au 1er contact

🎯 Ce que fait le site avec les automatisations :
• Chaque demande reçoit une réponse immédiate (même la nuit)
• Les prospects sont qualifiés automatiquement par score
• Les clients hésitants sont relancés sans aucun effort
• ${businessName} garde le contrôle avec un tableau de bord clair

💡 Valeur concrète pour ${businessName} à ${city} :
Si le site génère 10 demandes/mois et que vous en convertissez 3 avec les automatisations vs 1 sans, c'est 2 clients supplémentaires par mois. À [PRIX MOYEN] la prestation, le système se rembourse en quelques semaines.`

  const priceScript = `Script pour expliquer le prix à ${businessName} :

— "Je vous propose quelque chose de concret. Votre site, c'est votre vitrine. Mais la vitrine seule ne suffit pas — il faut que les gens qui s'arrêtent devant entrent dans le magasin.

C'est pour ça que j'ai inclus [OPTION 1] et [OPTION 2] dans votre pack. Ces systèmes travaillent pour vous 24h/24.

Regardez ce calcul simple : votre prestation moyenne, c'est [PRIX]. Si ce système vous ramène 2 clients de plus par mois, il est rentabilisé en [X semaines]. La maintenance mensuelle, c'est le prix d'un café par jour.

La vraie question, ce n'est pas 'est-ce que ça coûte cher'. C'est 'est-ce que je peux me permettre de perdre 2 clients par mois ?'"

— Si objection prix :
"Je comprends. C'est pour ça que je propose aussi le Pack Vitrine à 800€ pour commencer. On ajoute les automatisations dans 3 mois quand vous voyez les premiers résultats."`

  const readyMessage = `💬 Message prêt à envoyer à ${businessName} (WhatsApp ou DM Instagram) :

---

Bonjour [NOM] !

Je viens de terminer votre maquette de site — et franchement le résultat est top pour un ${sectorLabel} à ${city} 🔥

Voici ce que j'ai créé pour vous :
✓ Site premium adapté à votre secteur
✓ Copywriting persuasif (textes inclus)
✓ Design 100% adapté à votre style
✓ Formulaire de contact intelligent${recommended.includes('whatsapp') ? '\n✓ WhatsApp avec message automatique' : ''}${recommended.includes('rdv') ? '\n✓ Système de réservation en ligne' : ''}${recommended.includes('devis-auto') ? '\n✓ Formulaire devis automatique' : ''}${recommended.includes('reponse-auto') ? '\n✓ Email de confirmation automatique' : ''}

Je peux vous montrer tout ça en partage d'écran — ça prend 15 min chrono.

Vous êtes dispo [JOUR] à [HEURE] ?

À très vite 🚀

---`

  return { options, packs, clientArgument, priceScript, readyMessage }
}
