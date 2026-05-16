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
      '12 crédits par mois',
      'Export HTML standalone',
      'Message client généré',
      '10+ secteurs supportés',
      'Support email',
    ],
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 39,
    annualPrice: 31,
    description: 'Pour un usage régulier',
    features: [
      '20 crédits par mois',
      'Upload photos (8/site)',
      'Modifications par chat',
      '30+ secteurs supportés',
      'Onglet automations IA',
      'Projets sauvegardés illimités',
      'Support prioritaire',
    ],
    cta: 'Essayer 14 jours',
    highlight: true,
  },
  {
    name: 'Agence',
    price: 79,
    annualPrice: 63,
    description: 'Pour les équipes',
    features: [
      '60 crédits par mois',
      'Workspace partagé',
      'Variantes de design (bientôt)',
      'Export ZIP (bientôt)',
      'Priorité de génération',
      '3 utilisateurs',
      'Account manager',
    ],
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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center">
        <h1 className="font-syne font-extrabold text-ink mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Tarifs simples et transparents
        </h1>
        <p className="text-muted max-w-xl mx-auto mb-8">
          Commencez avec 12 crédits offerts, sans carte bancaire. Upgradez quand vous en avez besoin.
        </p>

        {/* Toggle annuel/mensuel */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-card border border-border">
          <button
            onClick={() => setAnnual(false)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
              !annual ? 'bg-primary text-white shadow-glow-sm' : 'text-muted hover:text-ink',
            )}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2',
              annual ? 'bg-primary text-white shadow-glow-sm' : 'text-muted hover:text-ink',
            )}
          >
            Annuel
            <span className="text-[10px] bg-green/20 text-green px-1.5 py-0.5 rounded-full font-bold">-20%</span>
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
                    ? 'bg-card border-primary/50 shadow-[0_0_40px_rgba(124,58,237,0.2)]'
                    : 'bg-card border-border hover:border-primary/20',
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold gradient-bg text-white px-4 py-1 rounded-full shadow-primary">
                      ✦ Populaire
                    </span>
                  </div>
                )}

                <div className="mb-2 mt-1">
                  <h3 className="font-syne font-bold text-xl text-ink">{plan.name}</h3>
                  <p className="text-xs text-muted mt-0.5">{plan.description}</p>
                </div>

                <div className="my-5">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-syne text-ink">{displayPrice}€</span>
                    <span className="text-muted text-sm mb-1">/mois</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-green mt-1">
                      Économisez {Math.round((1 - plan.annualPrice / plan.price) * 100)}% vs mensuel
                    </p>
                  )}
                </div>

                <ul className="flex flex-col gap-2.5 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <span className="text-ink">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Agence' ? 'mailto:contact@sitepilot.ai' : '/studio'}
                  className={cn(
                    'flex items-center justify-center gap-2 py-3 rounded-xl font-syne font-bold text-sm transition-all',
                    plan.highlight
                      ? 'gradient-bg text-white shadow-primary hover:shadow-primary-hover hover:-translate-y-0.5'
                      : 'bg-surface border border-border text-muted hover:text-ink hover:border-primary/30',
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-6 bg-surface/50 border-y border-border">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-green mx-auto mb-3" />
          <h2 className="font-syne font-bold text-ink text-xl mb-2">Remboursement sous 14 jours</h2>
          <p className="text-muted text-sm">
            Si SitePilot AI ne correspond pas à vos attentes dans les 14 premiers jours,
            nous vous remboursons intégralement, sans condition.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-ink text-center mb-10 text-2xl">
            Ce que vous obtenez avec chaque plan
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: <Zap className="w-4 h-4 text-primary-light" />, title: 'Génération par Claude AI', desc: "Maquette HTML générée par Claude claude-sonnet-4-6 à partir d'une description texte." },
              { icon: '📋', title: 'Copywriting adapté au secteur', desc: "Titre, accroche, services et CTA rédigés en fonction du secteur et de l'objectif." },
              { icon: '🎨', title: 'Design system personnalisé', desc: 'Palette de couleurs et typographie adaptées au style du commerce.' },
              { icon: '📱', title: 'HTML standalone responsive', desc: 'Fichier exportable, hébergeable sur n\'importe quel serveur sans dépendance.' },
              { icon: '💌', title: 'Message client inclus', desc: 'DM Instagram et email rédigés pour présenter la maquette au commerce.' },
              { icon: '🤖', title: 'Suggestions d\'automatisation', desc: "Options d'automatisation adaptées au secteur, présentées dans l'onglet Vendre." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-5 bg-card border border-border rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-base">
                  {typeof f.icon === 'string' ? f.icon : f.icon}
                </div>
                <div>
                  <p className="font-syne font-bold text-ink text-sm mb-1">{f.title}</p>
                  <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-surface/40 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-ink text-center mb-10 text-2xl">Questions fréquentes</h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-ink text-sm">{item.q}</span>
                  <span className="text-muted text-lg ml-4 shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-border pt-3">
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
