'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Shield, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    name: 'Starter',
    price: 19,
    annualPrice: 15,
    description: 'Pour tester et démarrer',
    features: [
      '5 maquettes/mois',
      'Export HTML + ZIP',
      'Message client',
      '3 styles design',
      'Formulaire de contact',
    ],
    example: 'Ex : 1 site vendu à 1 600 € couvre l\'abonnement pour plusieurs mois.',
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 39,
    annualPrice: 31,
    description: 'Pour un usage régulier',
    badge: 'RECOMMANDÉ',
    features: [
      '20 maquettes/mois',
      'Variantes design',
      'Export HTML + ZIP',
      'Automatisations à vendre',
      'Devis intelligent',
      'Messages de prospection',
      'Offre commerciale',
      'Sauvegarde projets',
      'Vidéo démo preview',
    ],
    example: 'Ex : 1 site vendu à 1 600 € couvre l\'abonnement pour plusieurs mois.',
    cta: 'Essayer 14 jours',
    highlight: true,
  },
  {
    name: 'Agence',
    price: 79,
    annualPrice: 63,
    description: 'Pour les équipes',
    features: [
      '60 maquettes/mois',
      'Toutes les fonctions Pro',
      'Packs commerciaux avancés',
      'Exports avancés',
      'Templates premium',
      'Support prioritaire',
    ],
    example: 'Ex : 1 site vendu à 1 600 € couvre l\'abonnement pour plusieurs mois.',
    cta: 'Nous contacter',
    highlight: false,
  },
]

const FAQ = [
  {
    q: "Qu'est-ce qu'un crédit ?",
    a: "Un crédit correspond à une génération complète de site ou une modification par chat. Chaque appel à l'API Claude consomme un crédit.",
  },
  {
    q: 'Le plan Starter est-il suffisant pour démarrer ?',
    a: 'Oui. 12 crédits permettent de générer et tester plusieurs maquettes avant de décider si vous souhaitez upgrader.',
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: 'Oui, sans engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre espace client.',
  },
  {
    q: 'Les sites générés sont-ils prêts à héberger ?',
    a: "Oui. Le fichier HTML généré est standalone — tous les styles sont inline. Il peut être hébergé sur n'importe quel serveur sans configuration.",
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen" style={{ background: '#fffaf3' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center">
        <h1 className="font-syne font-extrabold text-[#171717] mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Tarifs simples et transparents
        </h1>
        <p className="text-[#6b625b] max-w-xl mx-auto mb-8">
          Commencez avec 12 crédits offerts, sans carte bancaire. Upgradez quand vous en avez besoin.
        </p>

        {/* Toggle annuel/mensuel */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-gray-200">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
              !annual ? 'bg-violet-600 text-white shadow-sm' : 'text-[#6b625b] hover:text-[#171717]',
            )}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2',
              annual ? 'bg-violet-600 text-white shadow-sm' : 'text-[#6b625b] hover:text-[#171717]',
            )}
          >
            Annuel
            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">-20%</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => {
            const displayPrice = annual ? plan.annualPrice : plan.price
            return (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col p-7 rounded-2xl border transition-all',
                  plan.highlight
                    ? 'border-violet-300 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-violet-200 shadow-sm hover:shadow-md',
                )}
                style={plan.highlight ? { background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold bg-white text-violet-700 px-4 py-1 rounded-full shadow-sm border border-violet-100">
                      ✦ Recommandé
                    </span>
                  </div>
                )}

                <div className="mb-2 mt-1">
                  <h3 className={cn('font-syne font-bold text-xl', plan.highlight ? 'text-white' : 'text-[#171717]')}>{plan.name}</h3>
                  <p className={cn('text-xs mt-0.5', plan.highlight ? 'text-violet-200' : 'text-[#6b625b]')}>{plan.description}</p>
                </div>

                <div className="my-5">
                  <div className="flex items-end gap-1">
                    <span className={cn('text-4xl font-bold font-syne', plan.highlight ? 'text-white' : 'text-[#171717]')}>{displayPrice}€</span>
                    <span className={cn('text-sm mb-1', plan.highlight ? 'text-violet-200' : 'text-[#6b625b]')}>/mois</span>
                  </div>
                  {annual && (
                    <p className={cn('text-xs mt-1', plan.highlight ? 'text-violet-200' : 'text-green-600')}>
                      Économisez {Math.round((1 - plan.annualPrice / plan.price) * 100)}% vs mensuel
                    </p>
                  )}
                </div>

                <ul className="flex flex-col gap-2.5 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={cn('w-4 h-4 shrink-0 mt-0.5', plan.highlight ? 'text-violet-200' : 'text-[#55c47a]')} />
                      <span className={plan.highlight ? 'text-violet-100' : 'text-[#171717]'}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Example line */}
                <p className={cn('text-xs italic mb-5 leading-relaxed', plan.highlight ? 'text-violet-200' : 'text-[#6b625b]')}>
                  {plan.example}
                </p>

                <Link
                  href={plan.name === 'Agence' ? 'mailto:contact@sitepilot.ai' : '/studio'}
                  className={cn(
                    'flex items-center justify-center gap-2 py-3 rounded-xl font-syne font-bold text-sm transition-all',
                    plan.highlight
                      ? 'bg-white text-violet-700 hover:bg-violet-50 hover:-translate-y-0.5 shadow-sm'
                      : 'bg-violet-600 text-white hover:bg-violet-700 hover:-translate-y-0.5 shadow-sm',
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Global disclaimer */}
        <div className="max-w-5xl mx-auto mt-6">
          <p className="text-center text-xs text-[#6b625b] italic">
            Les revenus ne sont pas garantis. Ces exemples sont indicatifs.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-[#55c47a] mx-auto mb-3" />
          <h2 className="font-syne font-bold text-[#171717] text-xl mb-2">Remboursement sous 14 jours</h2>
          <p className="text-[#6b625b] text-sm">
            Si SitePilot AI ne correspond pas à vos attentes dans les 14 premiers jours,
            nous vous remboursons intégralement, sans condition.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-[#171717] text-center mb-10 text-2xl">
            Ce que vous obtenez avec chaque plan
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: <Zap className="w-4 h-4 text-violet-500" />, title: 'Génération par Claude AI', desc: "Maquette HTML générée par Claude claude-sonnet-4-6 à partir d'une description texte." },
              { icon: '📋', title: 'Copywriting adapté au secteur', desc: "Titre, accroche, services et CTA rédigés en fonction du secteur et de l'objectif." },
              { icon: '🎨', title: 'Design system personnalisé', desc: 'Palette de couleurs et typographie adaptées au style du commerce.' },
              { icon: '📱', title: 'HTML standalone responsive', desc: 'Fichier exportable, hébergeable sur n\'importe quel serveur sans dépendance.' },
              { icon: '💌', title: 'Message client inclus', desc: 'DM Instagram et email rédigés pour présenter la maquette au commerce.' },
              { icon: '🤖', title: 'Suggestions d\'automatisation', desc: "Options d'automatisation adaptées au secteur, présentées dans l'onglet Vendre." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 text-base">
                  {typeof f.icon === 'string' ? f.icon : f.icon}
                </div>
                <div>
                  <p className="font-syne font-bold text-[#171717] text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-[#6b625b] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-[#171717] text-center mb-10 text-2xl">Questions fréquentes</h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-[#fffaf3] border border-gray-100 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#171717] text-sm">{item.q}</span>
                  <span className="text-[#6b625b] text-lg ml-4 shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-[#6b625b] leading-relaxed border-t border-gray-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
