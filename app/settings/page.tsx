'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CreditCard, Zap, Globe, AlertTriangle, Lock, RefreshCw, ExternalLink,
  CheckCircle2, XCircle, BarChart3,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { getCurrentPlan } from '@/lib/plans'
import { getCredits, getCreditHistory, resetCredits } from '@/lib/credits'
import type { Plan } from '@/lib/plans'
import type { CreditHistoryEntry } from '@/lib/credits'
import { cn } from '@/lib/utils'

// Note: metadata cannot be exported from 'use client'. Use layout.tsx or a wrapper for title.
// export const metadata = { title: 'Paramètres — SitePilot AI' }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_BADGE: Record<string, string> = {
  free:    'bg-gray-100 text-gray-600',
  starter: 'bg-blue-50 text-blue-700',
  pro:     'bg-violet-50 text-violet-700',
  agency:  'bg-purple-50 text-purple-700',
}

function renewalDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 1, 1)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTimestamp(ts: string): string {
  return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [plan, setPlan]               = useState<Plan | null>(null)
  const [credits, setCredits]         = useState(0)
  const [history, setHistory]         = useState<CreditHistoryEntry[]>([])
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetDone, setResetDone]     = useState(false)

  useEffect(() => {
    const p = getCurrentPlan()
    setPlan(p)
    setCredits(getCredits())
    setHistory(getCreditHistory())
  }, [])

  function handleReset() {
    if (!confirmReset) { setConfirmReset(true); return }
    resetCredits()
    setCredits(getCredits())
    setHistory(getCreditHistory())
    setConfirmReset(false)
    setResetDone(true)
    setTimeout(() => setResetDone(false), 3000)
  }

  if (!plan) return null

  const usedCredits      = plan.monthlyCredits - credits
  const progressPct      = plan.monthlyCredits > 0 ? Math.max(0, Math.min(100, Math.round((credits / plan.monthlyCredits) * 100))) : 0
  const limitRows = [
    { label: 'Sites/mois',          used: 0, max: plan.maxSitesPerMonth,                 icon: <Globe className="w-4 h-4" /> },
    { label: 'Projets sauvegardés', used: 0, max: plan.maxSavedProjects === -1 ? null : plan.maxSavedProjects, icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Chatbots',            used: 0, max: plan.canUseChatbot ? null : 0,          icon: <Zap className="w-4 h-4" /> },
    { label: 'Images IA',           used: 0, max: plan.canUseAiImages ? null : 0,         icon: <Zap className="w-4 h-4" /> },
    { label: 'Vidéos démo',         used: 0, max: plan.canUseVideoDemo ? null : 0,        icon: <Zap className="w-4 h-4" /> },
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-syne font-bold text-3xl text-ink mb-1">Paramètres</h1>
            <p className="text-muted">Gérez votre abonnement, vos crédits et vos connexions API.</p>
          </div>

          {/* ── 1. Mon abonnement ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-light" />
              Mon abonnement
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', PLAN_BADGE[plan.id] ?? 'bg-gray-100 text-gray-600')}>
                      {plan.name}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-1">
                    Renouvellement le <strong className="text-ink">{renewalDate()}</strong>
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold font-syne hover:bg-violet-700 transition-colors shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Changer de plan
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">Crédits mensuels</p>
                  <p className="text-sm font-bold text-ink">{plan.monthlyCredits}/mois</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">Crédits restants</p>
                  <p className="text-sm font-bold text-ink">{credits}</p>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-700"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="text-xs text-muted text-right">{usedCredits < 0 ? 0 : usedCredits} crédits utilisés ce mois</p>
              </div>
            </div>
          </section>

          {/* ── 2. Limites du plan ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-light" />
              Limites du plan
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
              {limitRows.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <span className="text-primary-light">{item.icon}</span>
                      {item.label}
                    </div>
                    <span className="text-sm font-semibold text-ink">
                      {item.max === null
                        ? 'Illimité'
                        : item.max === 0
                        ? 'Non disponible'
                        : `${item.used} / ${item.max}`}
                    </span>
                  </div>
                  {item.max !== null && item.max > 0 && (
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-violet-400 transition-all"
                        style={{ width: `${Math.min(100, Math.round((item.used / item.max) * 100))}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Historique des crédits ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Historique des crédits
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {history.length === 0 ? (
                <div className="p-6 text-center text-muted text-sm italic">
                  Aucune transaction enregistrée pour le moment.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-soft">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-muted">Action</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-muted">Date</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold text-muted">Montant</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold text-muted">Solde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry, i) => (
                      <tr key={entry.id} className={cn('border-b border-border last:border-0', i % 2 === 0 ? 'bg-card' : 'bg-surface-soft')}>
                        <td className="px-5 py-3 text-ink truncate max-w-[180px]">{entry.reason}</td>
                        <td className="px-5 py-3 text-muted">{formatTimestamp(entry.timestamp)}</td>
                        <td className={cn('px-5 py-3 text-right font-semibold', entry.amount < 0 ? 'text-red-500' : 'text-green-600')}>
                          {entry.amount > 0 ? '+' : ''}{entry.amount}
                        </td>
                        <td className="px-5 py-3 text-right text-muted">{entry.balanceAfter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* ── 4. Connexions API ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-ink mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary-light" />
              Connexions API
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-base">🤖</div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Claude AI (Anthropic)</p>
                    <p className="text-xs text-muted">Génération de sites et contenu</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Connecté via clé serveur
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-base">🧠</div>
                  <div>
                    <p className="text-sm font-semibold text-ink">OpenAI</p>
                    <p className="text-xs text-muted">Images et analyse avancée</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <XCircle className="w-4 h-4 text-gray-300" />
                  Non connecté · Disponible prochainement
                </div>
              </div>
              <p className="text-xs text-muted italic pt-2 border-t border-border">
                Les clés API ne sont jamais affichées pour des raisons de sécurité.
              </p>
            </div>
          </section>

          {/* ── 5. Danger zone ── */}
          <section className="mb-8">
            <h2 className="font-syne font-bold text-lg text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Zone dangereuse
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">Réinitialiser les crédits du mois</p>
                  <p className="text-xs text-muted">
                    Remet votre compteur à 2 crédits (valeur par défaut). Cette action est irréversible.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className={cn(
                    'shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-syne transition-all',
                    confirmReset
                      ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                      : 'bg-white border border-red-300 text-red-600 hover:bg-red-50',
                  )}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {confirmReset ? 'Confirmer la réinitialisation' : 'Réinitialiser'}
                </button>
              </div>
              {resetDone && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Crédits réinitialisés avec succès.
                </div>
              )}
              {confirmReset && !resetDone && (
                <button
                  onClick={() => setConfirmReset(false)}
                  className="mt-2 text-xs text-muted hover:text-ink underline"
                >
                  Annuler
                </button>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
