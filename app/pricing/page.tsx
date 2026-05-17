'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Pour démarrer et tester',
    oldPrice: 39,
    price: 19,
    perDay: '0,65',
    badge: null,
    href: 'https://buy.stripe.com/eVq7sE0WSbZN7b52FyfjG04',
    cta: 'Choisir Starter',
    features: [
      '8 sites générés par mois',
      'Export HTML prêt à livrer',
      '5 styles de design',
      'Message client inclus',
      'Support par email',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Pour vendre sérieusement',
    oldPrice: 120,
    price: 59,
    perDay: '2',
    badge: '⭐ Le plus populaire',
    href: 'https://buy.stripe.com/bJe8wIdJEfbZdzt2FyfjG05',
    cta: 'Choisir Pro',
    features: [
      '25 sites par mois',
      'Export ZIP complet',
      'Images IA générées (DALL-E 3)',
      'Chatbot lead capture intégré',
      'Automatisations & devis intelligent',
      'Vidéo démo du site',
      'Pack commercial complet',
      'Support prioritaire',
    ],
    highlighted: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    tagline: 'Pour les agences qui scalent',
    oldPrice: 299,
    price: 149,
    perDay: '5',
    badge: null,
    href: 'https://buy.stripe.com/bJe7sEeNI1l9anh93WfjG06',
    cta: 'Choisir Agency',
    features: [
      '80 sites par mois',
      'Chatbot avancé avec lead scoring',
      'Mini CRM intégré',
      'Projets illimités',
      'Variantes design illimitées',
      'Support dédié',
      'Tout ce qui est dans Pro',
    ],
    highlighted: false,
  },
]

const FAQ_ITEMS = [
  {
    q: "C'est quoi un crédit ?",
    a: "1 crédit = 1 site généré complet avec copywriting, design et export. Les crédits se renouvellent chaque mois selon votre plan.",
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: "Oui, sans engagement ni frais. Annulez quand vous voulez depuis votre espace Paramètres. Aucune question posée.",
  },
  {
    q: 'Le chatbot est inclus dans Pro ?',
    a: "Oui. Le plan Pro inclut le chatbot lead capture qui collecte les coordonnées de vos visiteurs 24h/24 directement sur les sites générés.",
  },
  {
    q: 'Faut-il des compétences techniques ?',
    a: "Non. Vous décrivez le commerce en 3 lignes, SitePilot génère le site complet. Aucun code, aucune configuration, aucune compétence requise.",
  },
  {
    q: "Que se passe-t-il après 7 jours d'essai ?",
    a: "Vous choisissez le plan qui vous convient et continuez. Si vous ne souhaitez pas continuer, votre compte est simplement désactivé. Aucun débit automatique.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({
  item,
  open,
  toggle,
}: {
  item: (typeof FAQ_ITEMS)[0]
  open: boolean
  toggle: () => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
        onClick={toggle}
      >
        <span className="font-semibold text-[#171717] text-sm">{item.q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#6b625b] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#6b625b] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 text-sm text-[#6b625b] leading-relaxed border-t border-gray-100">
          {item.a}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen" style={{ background: '#fffaf3' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-28 pb-10 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold mb-6">
          🎁 Essai gratuit 7 jours — aucune carte bancaire requise
        </div>
        <h1
          className="font-syne font-extrabold text-[#171717] mb-4"
          style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
        >
          Créez des sites qui convertissent.
          <br />
          Vendez plus. Automatiquement.
        </h1>
        <p className="text-[#6b625b] max-w-xl mx-auto mb-8 text-lg">
          Rejoignez les agences et freelances qui génèrent des sites premium en 5 minutes avec
          l&apos;IA.
        </p>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-syne font-bold text-white text-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)' }}
        >
          Commencer gratuitement →
        </Link>
      </section>

      {/* ── Bandeau preuve sociale ── */}
      <div className="py-4 px-6 text-center">
        <p className="text-sm text-[#6b625b]">
          <span className="font-semibold text-[#171717]">✓</span> Aucune compétence technique
          requise &nbsp;·&nbsp;
          <span className="font-semibold text-[#171717]">✓</span> Site livré en 5 minutes
          &nbsp;·&nbsp;
          <span className="font-semibold text-[#171717]">✓</span> Annulable à tout moment
        </p>
      </div>

      {/* ── Plans ── */}
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-2xl flex flex-col overflow-visible transition-all',
                  plan.highlighted
                    ? 'border-2 border-violet-600 shadow-lg md:scale-105 bg-white'
                    : 'border border-gray-200 bg-white shadow-sm',
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block text-xs font-bold bg-violet-600 text-white px-4 py-1.5 rounded-full shadow whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Plan name */}
                  <h2 className="font-syne font-bold text-[#171717] text-xl mb-0.5 mt-2">
                    {plan.name}
                  </h2>
                  <p className="text-sm text-[#6b625b] mb-5">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="text-sm text-[#6b625b] line-through mb-0.5">
                      {plan.oldPrice}€/mois
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="font-syne font-extrabold text-[#171717] text-4xl">
                        {plan.price}€
                      </span>
                      <span className="text-[#6b625b] text-sm mb-1">/mois</span>
                    </div>
                    <p className="text-xs text-[#6b625b] italic mt-1">
                      soit moins de {plan.perDay}€/jour
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                        <span className="text-[#171717]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.highlighted ? (
                    <Link
                      href={plan.href}
                      className="flex items-center justify-center py-3 rounded-xl font-syne font-bold text-sm text-white transition-all hover:-translate-y-0.5 shadow"
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)' }}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <Link
                      href={plan.href}
                      className="flex items-center justify-center py-3 rounded-xl font-syne font-bold text-sm border border-violet-600 text-violet-700 transition-all hover:bg-violet-50 hover:-translate-y-0.5"
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bloc Essai gratuit ── */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center bg-violet-50 border border-violet-200 rounded-2xl px-8 py-10">
          <p className="text-2xl font-syne font-bold text-[#171717] mb-2">
            🎁 Pas encore convaincu ?
          </p>
          <p className="text-[#6b625b] mb-6">
            Testez gratuitement pendant 7 jours — aucune carte bancaire, aucun engagement.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-syne font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)' }}
          >
            Commencer l&apos;essai gratuit →
          </Link>
        </div>
      </section>

      {/* ── Ce que vous évitez (avant/après) ── */}
      <section className="py-20 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-syne font-bold text-[#171717]"
              style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}
            >
              Ce que vous évitez avec SitePilot
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sans */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-sm">
                  ❌
                </div>
                <h3 className="font-syne font-bold text-[#171717]">Sans SitePilot</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  '10-14h de travail par site',
                  '800-2000€ pour un développeur',
                  'Résultat générique peu convaincant',
                  'Pas de chatbot, pas de capture lead',
                  'Aucun suivi prospect automatique',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6b625b]">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Avec */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-sm">
                  ✅
                </div>
                <h3 className="font-syne font-bold text-[#171717]">Avec SitePilot</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  '5 minutes, site livré',
                  'À partir de 19€/mois seulement',
                  'Site sur-mesure généré par IA',
                  'Chatbot intégré dès le plan Pro',
                  'Leads automatiques envoyés dans Resend',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#171717]">
                    <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Garantie ── */}
      <section className="py-14 px-6" style={{ background: '#fffaf3' }}>
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-10 h-10 text-green-500 mx-auto mb-4" />
          <h2 className="font-syne font-bold text-[#171717] text-2xl mb-2">
            🛡️ Satisfait ou remboursé 7 jours
          </h2>
          <p className="text-[#6b625b]">
            Si le premier site généré ne vous convient pas, on vous rembourse. Sans question.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-[#171717] text-center mb-10 text-2xl">
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                open={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
