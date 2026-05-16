'use client'

import { useState } from 'react'
import {
  FileText, TrendingUp, MessageCircle, Mail, RefreshCw,
  Calendar, CreditCard, LayoutGrid, BarChart2,
  Check, Copy, ChevronDown, Star, Zap, Package,
  MessageSquare, CheckCircle,
} from 'lucide-react'
import type { GeneratedProject, AutomationOption, CommercialPack } from '@/types'
import { generateAutomationSales } from '@/lib/automationOptions'
import Badge from './Badge'
import { cn } from '@/lib/utils'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  'devis-auto': FileText,
  qualification: TrendingUp,
  whatsapp: MessageCircle,
  'reponse-auto': Mail,
  relances: RefreshCw,
  rdv: Calendar,
  acompte: CreditCard,
  crm: LayoutGrid,
  dashboard: BarChart2,
}

const COMPLEXITY_BADGE: Record<AutomationOption['complexity'], string> = {
  simple: 'green',
  moyenne: 'yellow',
  avancée: 'violet',
}

const VALUE_BADGE: Record<AutomationOption['perceivedValue'], string> = {
  faible: 'gray',
  forte: 'blue',
  premium: 'orange',
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text, label = 'Copier' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted hover:text-ink hover:border-primary/30 transition-all"
    >
      {copied ? <CheckCircle className="w-3.5 h-3.5 text-green" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copié !' : label}
    </button>
  )
}

// ─── Option card ──────────────────────────────────────────────────────────────

function OptionCard({ option }: { option: AutomationOption }) {
  const [open, setOpen] = useState(false)
  const Icon = ICONS[option.id] ?? Zap

  return (
    <div
      className={cn(
        'rounded-xl border transition-all',
        option.recommended
          ? 'border-primary/40 bg-primary/5 shadow-[0_0_20px_rgba(124,58,237,0.08)]'
          : 'border-border bg-card/50',
      )}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
          option.recommended ? 'bg-primary/20' : 'bg-surface',
        )}>
          <Icon className={cn('w-4 h-4', option.recommended ? 'text-primary-light' : 'text-muted')} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-syne font-bold text-sm text-ink">{option.name}</p>
            {option.recommended && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-primary/15 text-primary-light border border-primary/25 px-2 py-0.5 rounded-full">
                <Star className="w-2.5 h-2.5 fill-current" /> Recommandé
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={COMPLEXITY_BADGE[option.complexity] as 'green' | 'yellow' | 'violet'}>{option.complexity}</Badge>
            <Badge variant={VALUE_BADGE[option.perceivedValue] as 'gray' | 'blue' | 'orange'}>{option.perceivedValue} valeur</Badge>
            <span className="text-xs font-bold text-accent ml-auto">{option.price}</span>
          </div>
        </div>
        <ChevronDown className={cn('w-4 h-4 text-muted shrink-0 mt-1 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-border/50 pt-4">
          {/* Problem & Benefit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Problème résolu</p>
              <p className="text-xs text-muted leading-relaxed">{option.problem}</p>
            </div>
            <div className="bg-green/5 border border-green/15 rounded-lg p-3">
              <p className="text-[10px] font-bold text-green uppercase tracking-wider mb-1">Bénéfice client</p>
              <p className="text-xs text-muted leading-relaxed">{option.benefit}</p>
            </div>
          </div>

          {/* Sales pitch */}
          <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-primary-light uppercase tracking-wider">Phrase prête à dire</p>
              <CopyButton text={option.salesPitch} />
            </div>
            <p className="text-xs text-ink leading-relaxed italic">{option.salesPitch}</p>
          </div>

          {/* Details */}
          {option.details.formQuestions && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Questions du formulaire</p>
              <ul className="flex flex-col gap-1">
                {option.details.formQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <span className="text-primary mt-0.5 shrink-0">→</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {option.details.whatsappExample && (
            <div className="bg-[#25d366]/5 border border-[#25d366]/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-[#25d366] uppercase tracking-wider">Exemple WhatsApp</p>
                <CopyButton text={option.details.whatsappMessage ?? ''} label="Copier message" />
              </div>
              <p className="text-xs text-muted whitespace-pre-wrap leading-relaxed">{option.details.whatsappExample}</p>
            </div>
          )}

          {option.details.emailPro && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Email professionnel</p>
                <CopyButton text={option.details.emailPro} label="Copier email pro" />
              </div>
              <pre className="text-xs text-muted whitespace-pre-wrap bg-surface border border-border rounded-lg p-3 leading-relaxed font-sans">{option.details.emailPro}</pre>
            </div>
          )}

          {option.details.emailChalleureux && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Email chaleureux</p>
                <CopyButton text={option.details.emailChalleureux} label="Copier email warm" />
              </div>
              <pre className="text-xs text-muted whitespace-pre-wrap bg-surface border border-border rounded-lg p-3 leading-relaxed font-sans">{option.details.emailChalleureux}</pre>
            </div>
          )}

          {option.details.followupJ1 && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Séquence de relances</p>
              {[
                { label: 'J+1 — Message doux', key: 'followupJ1' as const, color: 'text-blue' },
                { label: 'J+3 — Message premium', key: 'followupJ3' as const, color: 'text-violet' },
                { label: 'J+7 — Message urgence', key: 'followupJ7' as const, color: 'text-orange' },
              ].map(({ label, key, color }) => option.details[key] && (
                <div key={key} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('text-[10px] font-semibold', color)}>{label}</span>
                    <CopyButton text={option.details[key] ?? ''} />
                  </div>
                  <pre className="text-xs text-muted whitespace-pre-wrap bg-surface border border-border rounded-lg p-2.5 leading-relaxed font-sans">{option.details[key]}</pre>
                </div>
              ))}
            </div>
          )}

          {option.details.scoreFields && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Critères de scoring</p>
              <ul className="flex flex-col gap-1.5">
                {option.details.scoreFields.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {option.details.crmColumns && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Colonnes Kanban</p>
              <div className="flex flex-wrap gap-2">
                {option.details.crmColumns.map((col) => (
                  <span key={col} className="text-xs bg-surface border border-border text-muted px-2.5 py-1 rounded-lg">{col}</span>
                ))}
              </div>
            </div>
          )}

          {option.details.dashboardMetrics && (
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Métriques du dashboard</p>
              <ul className="flex flex-col gap-1.5">
                {option.details.dashboardMetrics.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <BarChart2 className="w-3 h-3 text-accent shrink-0" />
                    <span className="text-ink">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {option.details.bookingInfo && (
            <pre className="text-xs text-muted whitespace-pre-wrap bg-surface border border-border rounded-lg p-3 leading-relaxed font-sans">{option.details.bookingInfo}</pre>
          )}

          {option.details.paymentInfo && (
            <pre className="text-xs text-muted whitespace-pre-wrap bg-surface border border-border rounded-lg p-3 leading-relaxed font-sans">{option.details.paymentInfo}</pre>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Pack card ────────────────────────────────────────────────────────────────

function PackCard({ pack }: { pack: CommercialPack }) {
  return (
    <div className={cn(
      'rounded-2xl border p-5 flex flex-col relative',
      pack.highlighted
        ? 'border-primary/50 bg-primary/5 shadow-[0_0_40px_rgba(124,58,237,0.15)]'
        : 'border-border bg-card',
    )}>
      {pack.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="text-[10px] font-bold bg-primary text-white px-4 py-1 rounded-full shadow-glow">
            ✦ Recommandé
          </span>
        </div>
      )}
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br', pack.color)}>
        <Package className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-syne font-bold text-ink mb-0.5">{pack.name}</h3>
      <p className="text-xs text-muted mb-3">{pack.tagline}</p>
      <div className="mb-4">
        <span className="text-2xl font-bold font-syne text-ink">{pack.price}</span>
        <span className="text-xs text-muted ml-1">– {pack.priceHigh}</span>
      </div>
      <ul className="flex flex-col gap-2 flex-1 mb-5">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs">
            <Check className="w-3.5 h-3.5 text-green shrink-0 mt-0.5" />
            <span className="text-ink">{f}</span>
          </li>
        ))}
      </ul>
      <div className="text-[10px] text-muted border-t border-border pt-3">
        Automations incluses : {pack.automationIds.length} modules
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AutomationSalesPanelProps {
  project: GeneratedProject
}

type PanelTab = 'options' | 'packs' | 'script'

export default function AutomationSalesPanel({ project }: AutomationSalesPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>('options')
  const [showAll, setShowAll] = useState(false)

  const data = project.automationSales ?? generateAutomationSales(
    project.sector,
    project.businessName,
    project.city,
    project.goal,
  )

  const recommended = data.options.filter((o) => o.recommended)
  const others = data.options.filter((o) => !o.recommended)

  const TABS: { id: PanelTab; label: string; icon: React.ElementType }[] = [
    { id: 'options', label: `Options (${data.options.length})`, icon: Zap },
    { id: 'packs', label: 'Packs & Tarifs', icon: Package },
    { id: 'script', label: 'Script de vente', icon: MessageSquare },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border bg-surface/50">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-glow-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-ink">Automatisations à vendre</h3>
            <p className="text-xs text-muted mt-0.5">
              {recommended.length} options recommandées pour <span className="text-primary-light font-semibold">{project.sector}</span> · {project.businessName}
            </p>
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { val: `${recommended.length}`, label: 'recommandées', color: 'text-primary-light bg-primary/10 border-primary/20' },
            { val: `${others.length}`, label: 'disponibles', color: 'text-muted bg-surface border-border' },
            { val: `${data.packs.length}`, label: 'packs', color: 'text-accent bg-accent/10 border-accent/20' },
          ].map((s) => (
            <span key={s.label} className={cn('text-xs font-semibold px-2.5 py-1 rounded-full border', s.color)}>
              {s.val} {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Inner tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-border bg-[#0a0a14]">
        {TABS.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                activeTab === t.id
                  ? 'bg-primary/15 text-primary-light border border-primary/20'
                  : 'text-muted hover:text-ink hover:bg-white/5',
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Options tab ── */}
        {activeTab === 'options' && (
          <div className="p-4 flex flex-col gap-4">
            {/* Recommended */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-3.5 h-3.5 text-yellow fill-yellow" />
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
                  Recommandées pour {project.sector} ({recommended.length})
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {recommended.map((opt) => <OptionCard key={opt.id} option={opt} />)}
              </div>
            </div>

            {/* Other options */}
            {others.length > 0 && (
              <div>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 mb-3 text-left w-full group"
                >
                  <ChevronDown className={cn('w-3.5 h-3.5 text-muted transition-transform', showAll && 'rotate-180')} />
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider group-hover:text-ink transition-colors">
                    Autres modules disponibles ({others.length})
                  </p>
                </button>
                {showAll && (
                  <div className="flex flex-col gap-2">
                    {others.map((opt) => <OptionCard key={opt.id} option={opt} />)}
                  </div>
                )}
              </div>
            )}

            {/* ROI hint */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <p className="text-xs font-bold text-ink">Estimation ROI</p>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Pack Devis (1 500€) + 2 clients/mois supplémentaires à 300€ chacun = rentabilisé en <span className="text-accent font-semibold">2,5 mois</span>. Chaque mois suivant = bénéfice pur.
              </p>
            </div>
          </div>
        )}

        {/* ── Packs tab ── */}
        {activeTab === 'packs' && (
          <div className="p-4 flex flex-col gap-4">
            <div className="grid gap-4">
              {data.packs.map((pack) => <PackCard key={pack.id} pack={pack} />)}
            </div>

            {/* Upsell note */}
            <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2">💡 Conseil commercial</p>
              <p className="text-xs text-muted leading-relaxed">
                Proposez toujours le <span className="text-primary-light font-semibold">Pack Vitrine d&apos;abord</span> pour réduire la résistance au prix. Une fois le client satisfait du résultat (1–2 mois), l&apos;upsell vers le Pack Devis ou Automatisation est naturel et accepté dans 60% des cas.
              </p>
            </div>
          </div>
        )}

        {/* ── Script tab ── */}
        {activeTab === 'script' && (
          <div className="p-4 flex flex-col gap-4">
            {/* Argumentaire */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Argumentaire client</p>
                <CopyButton text={data.clientArgument} label="Copier argumentaire" />
              </div>
              <pre className="text-xs text-muted whitespace-pre-wrap leading-relaxed font-sans">{data.clientArgument}</pre>
            </div>

            {/* Script prix */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Script pour le prix</p>
                <CopyButton text={data.priceScript} label="Copier script" />
              </div>
              <pre className="text-xs text-muted whitespace-pre-wrap leading-relaxed font-sans">{data.priceScript}</pre>
            </div>

            {/* Ready message */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  <p className="text-[10px] font-bold text-primary-light uppercase tracking-wider">Message prêt à envoyer</p>
                </div>
                <CopyButton text={data.readyMessage} label="Copier message" />
              </div>
              <pre className="text-xs text-muted whitespace-pre-wrap leading-relaxed font-sans">{data.readyMessage}</pre>
            </div>

            {/* Tips */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Conseils d&apos;envoi</p>
              {[
                'Envoyez en DM Instagram ou WhatsApp (pas email — trop formel)',
                'Joignez une capture d\'écran du site généré pour visualiser',
                'Proposez 2 créneaux pour l\'appel (augmente le taux de réponse)',
                'Relancez une seule fois si pas de réponse sous 48h',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary-light shrink-0 text-xs">✦</span>
                  <p className="text-xs text-muted">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
