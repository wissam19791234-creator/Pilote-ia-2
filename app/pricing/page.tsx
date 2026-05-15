'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import FormationCard from '@/components/FormationCard'

const PLANS = [
  {
    name: 'Starter',
    price: 19,
    annualPrice: 15,
    description: 'Pour tester et démarrer',
    features: [
      '5 sites générés/mois',
      'Export HTML inclus',
      'Message client DM',
      'Templates de base (10 secteurs)',
      'Support email',
      '1 utilisateur',
    ],
    cta: 'Commencer gratuitement',
  },
  {
    name: 'Pro',
    price: 39,
    annualPrice: 31,
    description: 'Le plus populaire',
    highlighted: true,
    features: [
      '20 sites générés/mois',
      'Upload photos (8/site)',
      'Modifications par chat',
      'Templates premium (30+ secteurs)',
      'Automatisations IA',
      'Projets sauvegardés illimités',
      'Support prioritaire',
      '1 utilisateur',
    ],
    cta: 'Essayer Pro 14j offerts',
  },
  {
    name: 'Agence',
    price: 79,
    annualPrice: 63,
    description: 'Pour les équipes',
    features: [
      '60 sites générés/mois',
      'Workspace agence',
      'Variantes de design (3/site)',
      'Exports avancés (ZIP bientôt)',
      'Priorité de génération',
      '3 utilisateurs',
      'Account manager',
    ],
    cta: 'Contacter les ventes',
  },
]

const FORMATIONS = [
  {
    title: 'Sites IA Local',
    price: 97,
    description: 'Créez et vendez des sites pour commerces locaux',
    modules: ['12 modules', 'Accès à vie', 'Mises à jour incluses'],
    badge: 'best-seller' as const,
  },
  {
    title: 'Automatisation IA',
    price: 147,
    description: 'Packagisez des systèmes d\'automatisation',
    modules: ['10 modules', 'Accès à vie', 'Mises à jour incluses'],
  },
  {
    title: 'E-commerce IA',
    price: 197,
    description: 'Créez des boutiques rentables avec l\'IA',
    modules: ['13 modules', 'Accès à vie', 'Mises à jour incluses'],
    badge: 'nouveau' as const,
  },
  {
    title: 'IA Business System',
    price: 297,
    originalPrice: 441,
    description: 'Le bundle complet — tout inclus',
    modules: ['3 formations', '1 mois Pro offert', '50+ prompts', 'Groupe privé'],
    badge: 'best-seller' as const,
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="font-syne font-extrabold text-ink mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Des tarifs simples et transparents
        </h1>
        <p className="text-muted max-w-xl mx-auto mb-8">
          Commencez gratuitement avec 12 crédits offerts. Upgradez quand vous êtes prêt.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-surface border border-border">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${!annual ? 'bg-white shadow-card text-ink' : 'text-muted hover:text-ink'}`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${annual ? 'bg-white shadow-card text-ink' : 'text-muted hover:text-ink'}`}
          >
            Annuel
            <span className="ml-2 text-[10px] bg-green/20 text-green px-1.5 py-0.5 rounded-full font-bold">-20%</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                annualPrice={plan.annualPrice}
                isAnnual={annual}
                highlighted={plan.highlighted}
                features={plan.features}
                cta={plan.cta}
                description={plan.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-6 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="font-syne font-bold text-ink text-2xl mb-3">Garantie 14 jours satisfait ou remboursé</h2>
          <p className="text-muted">
            Si SitePilot AI ne répond pas à vos attentes dans les 14 premiers jours, nous vous remboursons intégralement, sans question.
          </p>
        </div>
      </section>

      {/* Formations */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-ink mb-3" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Formations (accès à vie)
            </h2>
            <p className="text-muted">Investissement unique, compétences pour toujours.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FORMATIONS.map((f) => (
              <FormationCard key={f.title} {...f} compact />
            ))}
          </div>
          <p className="text-center text-xs text-muted/70 mt-8 max-w-lg mx-auto">
            Les résultats présentés sont des exemples individuels et ne constituent pas une garantie de résultats futurs.
            Les performances varient selon les efforts, l&apos;expérience et le marché.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
