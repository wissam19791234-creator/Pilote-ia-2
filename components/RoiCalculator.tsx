'use client'

import { useState, useEffect } from 'react'

const PLANS = [
  { label: 'Starter — 19€/mois', monthly: 19 },
  { label: 'Pro — 39€/mois', monthly: 39 },
  { label: 'Agence — 79€/mois', monthly: 79 },
]

function formatEur(n: number) {
  return n.toLocaleString('fr-FR') + ' €'
}

export default function RoiCalculator() {
  const [pricePerSite, setPricePerSite] = useState(1600)
  const [sitesPerMonth, setSitesPerMonth] = useState(3)
  const [planIndex, setPlanIndex] = useState(1)

  const [displayed, setDisplayed] = useState({
    monthly: 0,
    annual: 0,
    toolCost: 0,
    roi: 0,
  })

  const monthlyRevenue = pricePerSite * sitesPerMonth
  const annualRevenue = monthlyRevenue * 12
  const toolCost = PLANS[planIndex].monthly * 12
  const roi = annualRevenue - toolCost

  useEffect(() => {
    const target = { monthly: monthlyRevenue, annual: annualRevenue, toolCost, roi }
    const steps = 20
    const duration = 400
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplayed({
        monthly: Math.round(target.monthly * ease),
        annual: Math.round(target.annual * ease),
        toolCost: Math.round(target.toolCost * ease),
        roi: Math.round(target.roi * ease),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [monthlyRevenue, annualRevenue, toolCost, roi])

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
          Simulateur de ROI
        </div>
        <h3 className="font-syne font-bold text-[#171717] text-2xl mb-1">
          Calculez votre potentiel
        </h3>
        <p className="text-[#6b625b] text-sm">
          Estimez le retour sur investissement selon votre activité.
        </p>
      </div>

      {/* Inputs */}
      <div className="px-8 py-6 grid md:grid-cols-3 gap-6 bg-[#fffaf3]">
        {/* Prix moyen */}
        <div>
          <label className="block text-xs font-semibold text-[#6b625b] mb-2 uppercase tracking-wide">
            Prix moyen / site
          </label>
          <div className="relative">
            <input
              type="number"
              min={100}
              max={20000}
              step={100}
              value={pricePerSite}
              onChange={(e) => setPricePerSite(Math.max(0, Number(e.target.value)))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#171717] font-bold text-lg bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b625b] font-semibold">€</span>
          </div>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={pricePerSite}
            onChange={(e) => setPricePerSite(Number(e.target.value))}
            className="w-full mt-2 accent-violet-500"
          />
        </div>

        {/* Sites/mois */}
        <div>
          <label className="block text-xs font-semibold text-[#6b625b] mb-2 uppercase tracking-wide">
            Sites vendus / mois
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={sitesPerMonth}
              onChange={(e) => setSitesPerMonth(Math.max(1, Number(e.target.value)))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#171717] font-bold text-lg bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b625b] font-semibold">sites</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={sitesPerMonth}
            onChange={(e) => setSitesPerMonth(Number(e.target.value))}
            className="w-full mt-2 accent-violet-500"
          />
        </div>

        {/* Plan */}
        <div>
          <label className="block text-xs font-semibold text-[#6b625b] mb-2 uppercase tracking-wide">
            Votre plan
          </label>
          <select
            value={planIndex}
            onChange={(e) => setPlanIndex(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#171717] font-semibold bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
          >
            {PLANS.map((p, i) => (
              <option key={p.label} value={i}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-4 text-center">
          <p className="text-xs text-[#6b625b] font-semibold uppercase tracking-wide mb-2">CA mensuel</p>
          <p className="font-syne font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatEur(displayed.monthly)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl p-4 text-center">
          <p className="text-xs text-[#6b625b] font-semibold uppercase tracking-wide mb-2">CA annuel</p>
          <p className="font-syne font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatEur(displayed.annual)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-4 text-center">
          <p className="text-xs text-[#6b625b] font-semibold uppercase tracking-wide mb-2">Coût outil/an</p>
          <p className="font-syne font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #ff5a1f, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatEur(displayed.toolCost)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 text-center">
          <p className="text-xs text-[#6b625b] font-semibold uppercase tracking-wide mb-2">ROI potentiel</p>
          <p className="font-syne font-extrabold text-xl" style={{ background: 'linear-gradient(135deg, #55c47a, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {formatEur(displayed.roi)}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-8 pb-6">
        <p className="text-xs text-[#6b625b] bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 leading-relaxed">
          <strong>Simulation donnée à titre d&apos;exemple.</strong> Les résultats dépendent de votre prospection, de votre offre et du marché. Aucun revenu n&apos;est garanti.
        </p>
      </div>
    </div>
  )
}
