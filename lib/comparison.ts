export interface ComparisonPoint {
  category: string
  before: string
  after: string
}

export interface SectorComparison {
  sector: string
  points: ComparisonPoint[]
}

const DEFAULT_POINTS: ComparisonPoint[] = [
  { category: 'Présentation', before: 'Page Facebook ou site vitrine basique sans mise à jour', after: 'Maquette HTML structurée avec copywriting adapté au secteur' },
  { category: 'Contact', before: 'Numéro de téléphone dans la bio, sans formulaire', after: 'Formulaire de contact intelligent avec champs adaptés à l\'activité' },
  { category: 'SEO local', before: 'Aucune balise title/meta, non référencé localement', after: 'Title, meta description et keywords générés pour le référencement local' },
  { category: 'Mobile', before: 'Site non adapté au mobile, difficile à naviguer', after: 'Design responsive mobile-first inclus dans le HTML généré' },
  { category: 'Crédibilité', before: 'Peu d\'éléments de réassurance visibles', after: 'Avis, certifications et arguments de confiance intégrés dans le copywriting' },
]

const SECTOR_OVERRIDES: Record<string, ComparisonPoint[]> = {
  restaurant: [
    { category: 'Menu', before: 'PDF non lisible sur mobile ou absent du site', after: 'Menu intégré et lisible, mis en valeur dans la maquette' },
    { category: 'Réservation', before: 'Appel téléphonique uniquement, souvent manqué', after: 'Formulaire de réservation en ligne intégré' },
    { category: 'Photos', before: 'Peu de visuels, qualité variable', after: 'Galerie intégrée dans le hero et la section plats' },
    { category: 'Horaires', before: 'Non affiché ou difficile à trouver', after: 'Horaires d\'ouverture visibles dans le header et footer' },
    { category: 'Livraison', before: 'Aucune info sur les options de commande', after: 'Section dédiée avec liens click & collect ou livraison' },
  ],
  beauté: [
    { category: 'Services', before: 'Liste de prestations sans prix ni description', after: 'Grille de services avec descriptions et tarifs estimatifs' },
    { category: 'Réservation', before: 'Prise de RDV uniquement par appel ou DM', after: 'Formulaire de réservation en ligne avec créneaux' },
    { category: 'Galerie', before: 'Photos avant/après éparses sur Instagram', after: 'Galerie avant/après intégrée dans la maquette' },
    { category: 'Avis', before: 'Google My Business sans mise en avant', after: 'Section témoignages clients générée par Claude AI' },
    { category: 'Contact', before: 'Numéro dans la bio, WhatsApp non mis en avant', after: 'Bouton WhatsApp et formulaire de contact visibles' },
  ],
  immobilier: [
    { category: 'Annonces', before: 'Listings peu structurés, photos de qualité inégale', after: 'Présentation structurée avec sections propriétés et services' },
    { category: 'Estimation', before: 'Aucun outil en ligne, contact uniquement par email', after: 'Formulaire d\'estimation en ligne avec questions ciblées' },
    { category: 'Confiance', before: 'Peu de preuves sociales ou références visibles', after: 'Section ventes réalisées et avis clients générée' },
    { category: 'Contact', before: 'Formulaire générique sans qualification du prospect', after: 'Formulaire avec scoring automatique du projet client' },
    { category: 'Local', before: 'Aucune mise en avant de la connaissance du secteur', after: 'Zones géographiques et arguments locaux dans le copywriting' },
  ],
  coaching: [
    { category: 'Offre', before: 'Description vague des services proposés', after: 'Présentation claire des programmes avec bénéfices concrets' },
    { category: 'Crédibilité', before: 'Pas de diplômes ou certifications visibles', after: 'Section parcours et certifications intégrée' },
    { category: 'Témoignages', before: 'Avis sur Google peu visibles', after: 'Section témoignages clients avec résultats concrets' },
    { category: 'Prise de RDV', before: 'Email ou DM pour demander un appel découverte', after: 'Bouton appel découverte avec formulaire pré-qualification' },
    { category: 'Contenu', before: 'Blog ou ressources absents du site', after: 'Section ressources ou FAQ générée par Claude AI' },
  ],
}

export function getComparison(sector: string): ComparisonPoint[] {
  const normalized = sector.toLowerCase().trim()
  for (const key of Object.keys(SECTOR_OVERRIDES)) {
    if (normalized.includes(key)) return SECTOR_OVERRIDES[key]
  }
  return DEFAULT_POINTS
}
