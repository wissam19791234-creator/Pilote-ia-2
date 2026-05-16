'use client'

import { useState, useEffect } from 'react'
import { Zap, Globe, Download, TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DashboardCard from '@/components/DashboardCard'
import ProjectCard from '@/components/ProjectCard'
import { getProjects, deleteProject } from '@/lib/storage'
import { getCredits, getCreditHistory, CREDIT_COSTS } from '@/lib/credits'
import { getCurrentPlan } from '@/lib/plans'
import type { GeneratedProject } from '@/types'
import { cn } from '@/lib/utils'

// ─── Constants ────────────────────────────────────────────────────────────────

const ROADMAP = [
  { status: '🔄', label: 'Authentification Supabase', date: 'Q3 2025' },
  { status: '📅', label: 'Export ZIP', date: 'Q4 2025' },
  { status: '📅', label: 'Variantes de design (3/site)', date: 'Q4 2025' },
]

const ACTION_COSTS = [
  { label: 'Générer un site', cost: CREDIT_COSTS.generate_site },
  { label: 'Site e-commerce', cost: CREDIT_COSTS.generate_site_ecommerce },
  { label: 'Images IA', cost: CREDIT_COSTS.generate_ai_images },
  { label: 'Chatbot simple', cost: CREDIT_COSTS.generate_chatbot_simple },
  { label: 'Chatbot avancé', cost: CREDIT_COSTS.generate_chatbot_advanced },
  { label: 'Vidéo démo', cost: CREDIT_COSTS.generate_video },
  { label: 'Variante design', cost: CREDIT_COSTS.generate_variation },
  { label: 'Export ZIP', cost: CREDIT_COSTS.export_zip },
]

const PLAN_BADGE_COLORS: Record<string, string> = {
  free:    'bg-gray-100 text-gray-600',
  starter: 'bg-blue-50 text-blue-700',
  pro:     'bg-violet-50 text-violet-700',
  agency:  'bg-purple-50 text-purple-700',
}

// ─── Mock helpers ─────────────────────────────────────────────────────────────

function MockProject(index: number): GeneratedProject {
  const examples = [
    { businessName: 'Beauty Studio Paris', city: 'Paris', sector: 'beauté', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { businessName: 'Le Gourmet Lyon', city: 'Lyon', sector: 'restaurant', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  ]
  const ex = examples[index]
  return {
    id: `mock_${index}`,
    projectName: `Site ${ex.businessName}`,
    businessName: ex.businessName,
    city: ex.city,
    sector: ex.sector,
    style: 'moderne',
    goal: 'contact',
    tone: 'professionnel',
    audience: 'Clients locaux',
    valueProposition: 'Service premium',
    painPoints: [],
    services: [],
    products: [],
    automationNeeds: [],
    ecommerceNeeds: [],
    designSystem: {
      palette: { background: '#fffaf3', surface: '#fff8ee', primary: '#ff5a1f', secondary: '#ff4fb8', accent: '#8b5cf6', text: '#171717', muted: '#6b625b' },
      mood: 'moderne',
      typography: 'Syne',
      buttonStyle: 'gradient',
      cardStyle: 'white-shadow',
    },
    pages: [],
    sections: [],
    seo: { title: '', description: '', keywords: [] },
    copywriting: { heroTitle: '', heroSubtitle: '', ctaPrimary: '', ctaSecondary: '', faq: [], testimonials: [], clientMessage: '' },
    files: [],
    html: `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#fffaf3;"><h1>${ex.businessName}</h1></body></html>`,
    photos: [],
    createdAt: ex.createdAt,
    status: 'generated',
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [projects, setProjects]         = useState<GeneratedProject[]>([])
  const [credits, setCredits]           = useState(0)
  const [planId, setPlanId]             = useState<string>('free')
  const [planName, setPlanName]         = useState<string>('Gratuit')
  const [monthlyCredits, setMonthlyCredits] = useState<number>(2)
  const [creditHistory, setCreditHistory] = useState<ReturnType<typeof getCreditHistory>>([])

  useEffect(() => {
    const real = getProjects()
    setProjects(real.length > 0 ? real : [MockProject(0), MockProject(1)])
    setCredits(getCredits())

    const plan = getCurrentPlan()
    setPlanId(plan.id)
    setPlanName(plan.name)
    setMonthlyCredits(plan.monthlyCredits)
    setCreditHistory(getCreditHistory())
  }, [])

  const realProjects = projects.filter((p) => !p.id.startsWith('mock_'))
  const creditUsed   = monthlyCredits - credits
  const progressPct  = monthlyCredits > 0 ? Math.max(0, Math.min(100, Math.round((credits / monthlyCredits) * 100))) : 0

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-syne font-bold text-3xl text-ink mb-1">Dashboard</h1>
            <p className="text-muted">Bienvenue sur SitePilot AI Studio</p>
          </div>

          {/* ── Section Mon abonnement ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-light" />
              Mon abonnement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Carte 1 — Plan & crédits */}
              <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider">Plan actuel</p>
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', PLAN_BADGE_COLORS[planId] ?? 'bg-gray-100 text-gray-600')}>
                    {planName}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold font-syne text-ink">{credits}</p>
                  <p className="text-xs text-muted mt-0.5">crédits restants sur {monthlyCredits}/mois</p>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <Link
                  href="/pricing"
                  className="mt-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold font-syne hover:bg-violet-700 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Upgrade
                </Link>
              </div>

              {/* Carte 2 — Usage */}
              <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">Usage ce mois</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Sites générés', used: realProjects.length, max: getCurrentPlan().maxSitesPerMonth },
                    { label: 'Projets sauvegardés', used: realProjects.length, max: getCurrentPlan().maxSavedProjects === -1 ? null : getCurrentPlan().maxSavedProjects },
                    { label: 'Chatbots', used: 0, max: getCurrentPlan().canUseChatbot ? null : 0 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className="text-xs font-semibold text-ink">
                          {item.used} / {item.max === null ? '∞' : item.max === 0 ? '—' : item.max}
                        </span>
                      </div>
                      {item.max !== null && item.max > 0 && (
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-violet-400 rounded-full"
                            style={{ width: `${Math.min(100, Math.round((item.used / item.max) * 100))}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/settings" className="mt-auto text-xs text-primary-light hover:underline font-medium">
                  Voir les paramètres →
                </Link>
              </div>

              {/* Carte 3 — Historique rapide */}
              <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider">Crédits utilisés</p>
                  <span className="text-sm font-bold text-ink">{creditUsed < 0 ? 0 : creditUsed}</span>
                </div>
                <p className="text-xs text-muted">3 dernières actions :</p>
                <div className="flex flex-col gap-2">
                  {creditHistory.length === 0 ? (
                    <p className="text-xs text-muted italic">Aucune action enregistrée</p>
                  ) : (
                    creditHistory.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between text-xs">
                        <span className="text-muted truncate max-w-[140px]">{entry.reason}</span>
                        <span className={cn('font-semibold shrink-0 ml-2', entry.amount < 0 ? 'text-red-500' : 'text-green-600')}>
                          {entry.amount > 0 ? '+' : ''}{entry.amount}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <Link href="/settings" className="mt-auto text-xs text-primary-light hover:underline font-medium">
                  Historique complet →
                </Link>
              </div>
            </div>
          </section>

          {/* ── Section Coût des actions ── */}
          <section className="mb-10">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Coût des actions
            </h2>
            <div className="flex flex-wrap gap-2">
              {ACTION_COSTS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white border border-border rounded-xl shadow-sm text-sm"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-muted">{item.label}</span>
                  <span className="font-bold text-ink">{item.cost} crédits</span>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <DashboardCard icon={<Zap className="w-5 h-5" />} label="Crédits restants" value={credits} color="green" positive change="+12 ce mois" />
            <DashboardCard icon={<Globe className="w-5 h-5" />} label="Sites générés" value={realProjects.length} color="blue" />
            <DashboardCard icon={<Download className="w-5 h-5" />} label="Exports" value={projects.filter((p) => p.status === 'exported').length} color="violet" />
            <DashboardCard icon={<CreditCard className="w-5 h-5" />} label="Plan actuel" value={planName} color="orange" />
          </div>

          {/* Recent projects */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold text-xl text-ink">Projets récents</h2>
              <Link href="/projects" className="text-sm text-primary-light hover:underline font-medium">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.slice(0, 4).map((p) => (
                <ProjectCard key={p.id} project={p} onDelete={(id) => {
                  if (id.startsWith('mock_')) return
                  deleteProject(id)
                  setProjects((prev) => prev.filter((x) => x.id !== id))
                }} />
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="font-syne font-bold text-xl text-ink mb-5">
              <TrendingUp className="w-5 h-5 inline-block mr-2 text-primary-light" />
              Prochaines fonctionnalités
            </h2>
            <div className="flex flex-col gap-3">
              {ROADMAP.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                  <span className="text-xl">{item.status}</span>
                  <span className="flex-1 font-medium text-ink">{item.label}</span>
                  <span className="text-xs text-muted bg-surface px-3 py-1 rounded-full">{item.date}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
