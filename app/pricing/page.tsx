'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Shield, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

// ─── Table data ───────────────────────────────────────────────────────────────

const COLUMNS = [
  { id: 'free',    label: 'Free',    price: 0,   cta: 'Commencer gratuit', href: '/studio',                                                          recommended: false },
  { id: 'starter', label: 'Starter', price: 19,  cta: 'Choisir Starter',   href: 'https://buy.stripe.com/eVq7sE0WSbZN7b52FyfjG04', recommended: false },
  { id: 'pro',     label: 'Pro',     price: 59,  cta: 'Choisir Pro',       href: 'https://buy.stripe.com/bJe8wIdJEfbZdzt2FyfjG05', recommended: true  },
  { id: 'agency',  label: 'Agency',  price: 149, cta: 'Choisir Agency',    href: 'https://buy.stripe.com/bJe7sEeNI1l9anh93WfjG06', recommended: false },
]

type CellValue = string | boolean

interface TableRow {
  label: string
  values: CellValue[]
  highlight?: boolean
}

const ROWS: TableRow[] = [
  { label: 'Prix/mois',              values: ['0€', '19€', '59€', '149€'] },
  { label: 'Crédits/mois',           values: ['2', '8', '25', '80'] },
  { label: 'Sites/mois',             values: ['1', '8', '25', '80'] },
  { label: 'Projets sauvegardés',    values: ['1', '5', '50', 'Illimité'] },
  { label: 'Export HTML',            values: [false, true, true, true] },
  { label: 'Export ZIP',             values: [false, false, true, true] },
  { label: 'Images IA',              values: [false, false, true, true] },
  { label: 'Variantes design',       values: [false, false, true, true] },
  { label: 'Devis intelligent',      values: [false, false, true, true] },
  { label: 'Automatisations',        values: [false, false, true, true] },
  { label: 'Chatbot simple',         values: [false, false, true, true],  highlight: true },
  { label: 'Chatbot avancé',         values: [false, false, false, true], highlight: true },
  { label: 'Mini CRM',               values: [false, false, false, true] },
  { label: 'Vidéo démo',             values: [false, false, true, true] },
  { label: 'Watermark',              values: ['Oui', 'Non', 'Non', 'Non'] },
  { label: 'Support',                values: ['Communauté', 'Email', 'Prioritaire', 'Dédié'] },
]

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un crédit ?",
    a: "Un crédit correspond à une action réalisée par l'IA : générer un site coûte 1 crédit, une vidéo 3 crédits, un chatbot 2 crédits. Les crédits se renouvellent chaque mois selon votre plan.",
  },
  {
    q: 'Le plan Pro inclut-il le chatbot ?',
    a: 'Oui. Le plan Pro inclut le chatbot simple qui permet de capturer des leads 24h/24 sur les sites générés. Le chatbot avancé avec scoring prospect et mini-CRM est réservé au plan Agency.',
  },
  {
    q: 'Quelle est la différence entre chatbot simple et chatbot avancé ?',
    a: 'Le chatbot simple répond aux questions fréquentes et capture les coordonnées du visiteur. Le chatbot avancé (Agency) ajoute le lead scoring automatique, un mini-CRM intégré et un suivi multi-étapes.',
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: 'Oui, sans engagement. Vous pouvez annuler ou changer de plan à tout moment depuis votre espace Paramètres.',
  },
  {
    q: 'Les sites générés sont-ils hébergeables ?',
    a: "Oui. Le fichier HTML standalone contient tous les styles inline — il peut être hébergé sur n'importe quel serveur sans configuration.",
  },
  {
    q: 'Quand Stripe sera-t-il disponible ?',
    a: "Le paiement en ligne est prévu pour les prochaines semaines. En attendant, contactez-nous pour activer un plan supérieur.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Cell({ value, isProCol }: { value: CellValue; isProCol: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={cn('w-5 h-5 mx-auto', isProCol ? 'text-white' : 'text-green-500')} />
    ) : (
      <X className={cn('w-4 h-4 mx-auto', isProCol ? 'text-purple-300' : 'text-gray-300')} />
    )
  }
  return (
    <span className={cn('text-sm font-medium', isProCol ? 'text-white' : 'text-[#171717]')}>
      {value}
    </span>
  )
}

function FaqItem({ item, open, toggle }: { item: typeof FAQ_ITEMS[0]; open: boolean; toggle: () => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
        onClick={toggle}
      >
        <span className="font-semibold text-[#171717] text-sm">{item.q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#6b625b] shrink-0" />
          : <ChevronDown className="w-4 h-4 text-[#6b625b] shrink-0" />}
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

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5" />
          Tarifs MVP — Stripe à venir
        </div>
        <h1
          className="font-syne font-extrabold text-[#171717] mb-4"
          style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
        >
          Des offres claires pour chaque besoin
        </h1>
        <p className="text-[#6b625b] max-w-xl mx-auto mb-4">
          Commencez gratuitement avec 2 crédits. Upgradez quand vous en avez besoin — sans engagement.
        </p>
        <p className="text-xs text-[#6b625b] italic">
          Disclaimer : Les prix affichés sont indicatifs pour le MVP. Intégration Stripe à venir.
        </p>
      </section>

      {/* Chatbot highlights */}
      <section className="pb-8 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-200 rounded-xl">
            <span className="text-violet-600 text-lg shrink-0">💬</span>
            <p className="text-sm text-violet-800">
              <strong>Le chatbot est disponible à partir du plan Pro.</strong> Capturez des leads 24h/24 directement sur vos sites générés.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <span className="text-purple-600 text-lg shrink-0">🤖</span>
            <p className="text-sm text-purple-800">
              <strong>Le chatbot avancé avec scoring prospect est réservé au plan Agency.</strong> Mini-CRM, lead scoring automatique et suivi multi-étapes inclus.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table — desktop */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {/* Feature label column */}
                  <th className="w-52 bg-white px-5 py-5 text-left" />
                  {COLUMNS.map((col) => (
                    <th
                      key={col.id}
                      className={cn(
                        'px-4 py-5 text-center relative',
                        col.recommended
                          ? 'bg-gradient-to-b from-violet-600 to-violet-700'
                          : 'bg-white',
                      )}
                    >
                      {col.recommended && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-white text-violet-700 px-3 py-1 rounded-full shadow border border-violet-100 whitespace-nowrap">
                          ✦ Recommandé
                        </span>
                      )}
                      <p className={cn('font-syne font-bold text-base', col.recommended ? 'text-white' : 'text-[#171717]')}>
                        {col.label}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={cn(
                      ri % 2 === 0 ? 'bg-[#fffaf3]' : 'bg-white',
                      row.highlight && 'ring-1 ring-inset ring-violet-100',
                    )}
                  >
                    <td className={cn('px-5 py-3.5 text-sm font-medium', row.highlight ? 'text-violet-700 font-semibold' : 'text-[#6b625b]')}>
                      {row.label}
                      {row.highlight && <span className="ml-2 text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                    </td>
                    {row.values.map((val, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          'px-4 py-3.5 text-center',
                          COLUMNS[ci].recommended
                            ? ri % 2 === 0 ? 'bg-violet-600' : 'bg-violet-650'
                            : '',
                        )}
                        style={COLUMNS[ci].recommended && ri % 2 !== 0 ? { backgroundColor: '#7c3aed' } : {}}
                      >
                        <Cell value={val} isProCol={COLUMNS[ci].recommended} />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* CTA row */}
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-5 py-5" />
                  {COLUMNS.map((col) => (
                    <td key={col.id} className={cn('px-4 py-5 text-center', col.recommended && 'bg-violet-700')}>
                      <Link
                        href={col.href}
                        className={cn(
                          'inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold font-syne transition-all hover:-translate-y-0.5',
                          col.recommended
                            ? 'bg-white text-violet-700 shadow-sm hover:bg-violet-50'
                            : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm',
                        )}
                      >
                        {col.cta}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards — stacked */}
          <div className="md:hidden flex flex-col gap-6">
            {COLUMNS.map((col, ci) => (
              <div
                key={col.id}
                className={cn(
                  'relative rounded-2xl border overflow-hidden',
                  col.recommended
                    ? 'border-violet-300 shadow-lg'
                    : 'border-gray-200 bg-white shadow-sm',
                )}
              >
                {col.recommended && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
                )}
                <div className={cn('p-5', col.recommended && 'bg-gradient-to-b from-violet-600 to-violet-700')}>
                  {col.recommended && (
                    <span className="inline-block mb-2 text-[10px] font-bold bg-white text-violet-700 px-3 py-1 rounded-full">
                      ✦ Recommandé
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className={cn('font-syne font-bold text-xl', col.recommended ? 'text-white' : 'text-[#171717]')}>
                      {col.label}
                    </h3>
                    <span className={cn('font-syne font-bold text-2xl', col.recommended ? 'text-white' : 'text-[#171717]')}>
                      {col.price}€<span className={cn('text-sm font-normal', col.recommended ? 'text-violet-200' : 'text-[#6b625b]')}>/mois</span>
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  {ROWS.map((row) => (
                    <div key={row.label} className={cn('flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0', row.highlight && 'bg-violet-50 -mx-2 px-2 rounded')}>
                      <span className={cn('text-sm', row.highlight ? 'text-violet-700 font-semibold' : 'text-[#6b625b]')}>
                        {row.label}
                      </span>
                      <div className="shrink-0">
                        <Cell value={row.values[ci]} isProCol={false} />
                      </div>
                    </div>
                  ))}
                  <Link
                    href={col.href}
                    className={cn(
                      'mt-4 flex items-center justify-center py-3 rounded-xl font-syne font-bold text-sm transition-all hover:-translate-y-0.5',
                      col.recommended
                        ? 'bg-violet-600 text-white shadow-sm hover:bg-violet-700'
                        : 'bg-violet-600 text-white shadow-sm hover:bg-violet-700',
                    )}
                  >
                    {col.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h2 className="font-syne font-bold text-[#171717] text-xl mb-2">Remboursement sous 14 jours</h2>
          <p className="text-[#6b625b] text-sm">
            Si SitePilot AI ne correspond pas à vos attentes dans les 14 premiers jours,
            nous vous remboursons intégralement, sans condition.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
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

      {/* Bottom disclaimer */}
      <div className="pb-8 px-6 text-center">
        <p className="text-xs text-[#6b625b] italic">
          Les prix affichés sont indicatifs pour le MVP. Intégration Stripe à venir. Les revenus indiqués à titre d&apos;exemple ne sont pas garantis.
        </p>
      </div>

      <Footer />
    </div>
  )
}
