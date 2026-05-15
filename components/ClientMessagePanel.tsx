'use client'

import { useState } from 'react'
import { Copy, Check, Instagram, Mail, MessageCircle } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { cn } from '@/lib/utils'

interface ClientMessagePanelProps {
  project: GeneratedProject
}

const VARIANTS = [
  { id: 'dm', label: 'DM Instagram', icon: Instagram, color: 'rose' },
  { id: 'email', label: 'Email Pro', icon: Mail, color: 'blue' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'green' },
] as const

type VariantId = typeof VARIANTS[number]['id']

function buildMessage(project: GeneratedProject, variant: VariantId): string {
  const { businessName, city, sector, automationNeeds, goal } = project
  const autoStr = automationNeeds.slice(0, 2).join(' + ')

  if (variant === 'dm') {
    return `Bonjour 👋

J'ai créé une maquette pour ${businessName} à ${city}.

✅ Design sur-mesure ${sector}
✅ Formulaire ${goal === 'devis' ? 'devis auto' : goal === 'réservation' ? 'réservation' : 'contact'}
${automationNeeds.length ? `✅ ${autoStr}\n` : ''}✅ Export HTML prêt

On discute 15 min cette semaine ? 🚀`
  }

  if (variant === 'email') {
    return `Objet : Maquette de site créée pour ${businessName} — ${city}

Bonjour,

Je me permets de vous contacter car j'ai réalisé une maquette complète pour ${businessName}.

Le site inclut :
• Design premium adapté au secteur ${sector}
• Copywriting persuasif (textes, titres, accroches)
• Formulaire ${goal === 'devis' ? 'de devis automatique' : goal === 'réservation' ? 'de réservation' : 'de contact intelligent'}
${automationNeeds.map((a) => `• ${a}`).join('\n')}
• Optimisation SEO pour ${city}
• Responsive mobile

Je peux mettre le site en ligne sous 48h chrono.

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?

Cordialement,
[Votre nom]
[Votre téléphone]`
  }

  return `Bonjour ! 😊

Je vous contacte car j'ai créé une maquette complète pour ${businessName} à ${city} !

Ce que j'ai préparé :
🎨 Design premium ${sector}
📋 Tous les textes déjà écrits
📱 Version mobile incluse
${automationNeeds.length ? `🤖 ${autoStr}\n` : ''}⚡ Site livrable en 48h

Je vous montre ? Un appel de 15 min suffit 🙂`
}

export default function ClientMessagePanel({ project }: ClientMessagePanelProps) {
  const [active, setActive] = useState<VariantId>('dm')
  const [copied, setCopied] = useState(false)

  const message = buildMessage(project, active)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable
    }
  }

  const lengthLabel =
    message.length < 200 ? 'Court' :
    message.length < 500 ? 'Moyen' : 'Long'

  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <h3 className="font-syne font-bold text-ink mb-1">Message client</h3>
        <p className="text-sm text-muted">Prêt à copier-coller pour closer la vente.</p>
      </div>

      {/* Variant selector */}
      <div className="flex gap-2">
        {VARIANTS.map((v) => {
          const Icon = v.icon
          return (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border',
                active === v.id
                  ? 'bg-orange/10 border-orange text-orange'
                  : 'border-border text-muted hover:border-orange/50',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {v.label}
            </button>
          )
        })}
      </div>

      {/* Message card */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-muted">
            {message.length} caractères · {lengthLabel}
          </span>
          <button
            onClick={copy}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              copied ? 'bg-green/10 text-green' : 'bg-orange/10 text-orange hover:bg-orange/20',
            )}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
        <pre className="text-sm text-ink whitespace-pre-wrap leading-relaxed font-dm">{message}</pre>
      </div>
    </div>
  )
}
