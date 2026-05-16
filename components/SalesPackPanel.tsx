'use client'

import { useState } from 'react'
import { Copy, Check, MessageSquare, Mail, Phone, Package } from 'lucide-react'
import type { GeneratedProject, SalesPack, ObjectionAnswer } from '@/types'
import { generateSalesPack } from '@/lib/salesPackBuilder'
import { cn } from '@/lib/utils'

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    void navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-xs text-muted hover:text-primary-light px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary/30 transition-all shrink-0">
      {copied ? <Check className="w-3.5 h-3.5 text-green" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copié !' : (label ?? 'Copier')}
    </button>
  )
}

function PackCard({ pack, highlighted }: { pack: SalesPack['simplePack']; highlighted?: boolean }) {
  return (
    <div className={cn('p-5 rounded-xl border flex flex-col gap-3', highlighted ? 'bg-primary/10 border-primary/40' : 'bg-card border-border')}>
      {highlighted && <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider">⭐ Recommandé</span>}
      <div>
        <h3 className="font-syne font-bold text-ink">{pack.name}</h3>
        <p className="text-xs text-muted mt-0.5">{pack.tagline}</p>
      </div>
      <div>
        <span className="font-syne font-bold text-2xl text-ink">{pack.price}</span>
        <span className="text-xs text-muted ml-1">→ {pack.priceHigh}</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {pack.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-ink">
            <Check className="w-3.5 h-3.5 text-green shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

type Tab = 'packs' | 'scripts' | 'objections'

export default function SalesPackPanel({ project }: { project: GeneratedProject }) {
  const [tab, setTab] = useState<Tab>('packs')
  const pack = project.salesPack ?? generateSalesPack(project)

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Sub-tabs */}
      <div className="flex items-center gap-1 px-4 py-2.5 border-b border-border bg-[#0a0a14]">
        {(['packs', 'scripts', 'objections'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize', tab === t ? 'bg-primary/15 text-primary-light border border-primary/20' : 'text-muted hover:text-ink hover:bg-white/5')}
          >
            {t === 'packs' ? '📦 Packs' : t === 'scripts' ? '💬 Scripts' : '🛡️ Objections'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'packs' && (
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-muted mb-5">Proposez ces packs au commerce avec la maquette. Adaptez les prix selon votre marché local.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <PackCard pack={pack.simplePack} />
              <PackCard pack={pack.premiumPack} highlighted />
              <PackCard pack={pack.automationPack} />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-syne font-bold text-ink text-sm mb-3">Justification du prix</h4>
              <ul className="flex flex-col gap-2">
                {pack.priceJustification.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <span className="text-green shrink-0">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'scripts' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-primary-light" /> Pitch téléphone</h4>
                <CopyButton text={pack.pitchScript} />
              </div>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{pack.pitchScript}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4 text-green" /> DM court</h4>
                <CopyButton text={pack.dmShort} />
              </div>
              <p className="text-xs text-muted leading-relaxed">{pack.dmShort}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary-light" /> DM premium</h4>
                <CopyButton text={pack.dmPremium} />
              </div>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{pack.dmPremium}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> Email professionnel</h4>
                <CopyButton text={pack.emailProfessional} />
              </div>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line">{pack.emailProfessional}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-syne font-bold text-ink text-sm mb-3">Relances</h4>
              <div className="flex flex-col gap-3">
                {pack.followUps.map((fu, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary-light shrink-0 mt-0.5">J+{[1,3,7][i]}</span>
                    <p className="text-xs text-muted flex-1">{fu}</p>
                    <CopyButton text={fu} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'objections' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <p className="text-xs text-muted mb-1">Réponses prêtes pour les objections les plus courantes.</p>
            {pack.objectionHandling.map((obj, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="font-syne font-bold text-ink text-sm mb-3">
                  <span className="text-muted mr-2">💬</span>&ldquo;{obj.objection}&rdquo;
                </p>
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-[10px] text-primary-light font-bold mb-1 uppercase tracking-wider">Réponse courte</p>
                    <p className="text-xs text-muted leading-relaxed">{obj.responseShort}</p>
                    <CopyButton text={obj.responseShort} label="Copier" />
                  </div>
                  <div className="p-3 bg-surface rounded-lg border border-border">
                    <p className="text-[10px] text-muted font-bold mb-1 uppercase tracking-wider">Argument valeur</p>
                    <p className="text-xs text-muted/80 italic">{obj.valueArgument}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
