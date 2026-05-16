'use client'

import { calculateLeadScore } from '@/lib/leads/leadScoring'
import type { LeadData } from '@/lib/resend/resendTypes'
import LeadScoreBadge from './LeadScoreBadge'

interface LeadCapturePreviewProps {
  sector: string
  businessName: string
}

function buildFakeLead(sector: string, businessName: string): LeadData {
  const s = sector.toLowerCase()

  if (s.includes('beauté') || s.includes('beauty') || s.includes('coiffure')) {
    return {
      name: 'Sophie Martin',
      email: 'sophie.martin@gmail.com',
      phone: '06 12 34 56 78',
      sector,
      needType: 'réservation',
      budget: '50-100€',
      delay: 'cette semaine',
      message: 'Je souhaite réserver un soin visage complet pour me préparer pour un mariage. Quelles sont vos disponibilités ?',
      businessName,
      city: 'Paris',
      source: 'generated-site',
      preferredContact: 'email',
    }
  }

  if (s.includes('restaurant') || s.includes('food') || s.includes('traiteur')) {
    return {
      name: 'Marc Dubois',
      email: 'marc.dubois@gmail.com',
      phone: '06 98 76 54 32',
      sector,
      needType: 'réservation',
      budget: '200€',
      delay: 'ce weekend',
      message: 'Souhaitons réserver une table pour 8 personnes samedi soir pour un anniversaire. Menu spécial possible ?',
      businessName,
      city: 'Lyon',
      source: 'generated-site',
      preferredContact: 'téléphone',
    }
  }

  if (s.includes('immobilier') || s.includes('immo')) {
    return {
      name: 'Pierre Lefebvre',
      email: 'pierre.lefebvre@hotmail.com',
      phone: '06 55 44 33 22',
      sector,
      needType: 'devis',
      budget: '350 000€',
      delay: 'dans 3 mois',
      message: 'Cherche appartement 3 pièces dans le quartier centre. Budget max 350k€, idéalement avec parking.',
      businessName,
      city: 'Bordeaux',
      source: 'generated-site',
    }
  }

  if (s.includes('auto') || s.includes('garage') || s.includes('voiture')) {
    return {
      name: 'Jean Dupont',
      email: 'jean.dupont@gmail.com',
      phone: '06 11 22 33 44',
      sector,
      needType: 'devis',
      budget: '500€',
      delay: 'urgent',
      message: 'Mon véhicule fait un bruit bizarre au démarrage. Besoin d\'un diagnostic rapide et d\'une réparation.',
      businessName,
      city: 'Marseille',
      source: 'generated-site',
      preferredContact: 'téléphone',
    }
  }

  // Default / local service
  return {
    name: 'Claire Moreau',
    email: 'claire.moreau@gmail.com',
    phone: '06 77 88 99 00',
    sector,
    needType: 'devis',
    budget: '1000-2000€',
    delay: 'cette semaine',
    message: 'Intéressée par vos services. Pouvez-vous me contacter pour discuter de mon projet et obtenir un devis ?',
    businessName,
    city: 'Nantes',
    source: 'generated-site',
    preferredContact: 'email',
  }
}

export default function LeadCapturePreview({ sector, businessName }: LeadCapturePreviewProps) {
  const fakeLead = buildFakeLead(sector, businessName)
  const score = calculateLeadScore(fakeLead)

  return (
    <div className="rounded-xl border border-border bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Exemple de lead capturé</p>
        <LeadScoreBadge score={score.score} level={score.level} showScore />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          ['Nom', fakeLead.name],
          ['Email', fakeLead.email],
          ['Téléphone', fakeLead.phone ?? '—'],
          ['Besoin', fakeLead.needType],
          ['Budget', fakeLead.budget ?? '—'],
          ['Délai', fakeLead.delay ?? '—'],
          ['Ville', fakeLead.city ?? '—'],
        ].map(([label, value]) => (
          <div key={label} className="bg-surface-soft rounded-lg p-2">
            <p className="text-muted font-medium">{label}</p>
            <p className="text-ink truncate">{value}</p>
          </div>
        ))}
      </div>

      {fakeLead.message && (
        <div className="bg-surface-soft rounded-lg p-2 text-xs">
          <p className="text-muted font-medium mb-1">Message</p>
          <p className="text-ink line-clamp-2">{fakeLead.message}</p>
        </div>
      )}

      <div className="pt-1 border-t border-border">
        <p className="text-xs text-muted mb-1.5 font-medium">Action recommandée</p>
        <p className="text-xs text-ink font-semibold">{score.recommendedAction}</p>
      </div>
    </div>
  )
}
