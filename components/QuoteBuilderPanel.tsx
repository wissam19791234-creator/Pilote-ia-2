'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { GeneratedProject, QuoteField } from '@/types'
import { generateSmartQuote } from '@/lib/quoteBuilder'
import { cn } from '@/lib/utils'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    void navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-xs text-muted hover:text-primary-light px-3 py-1.5 rounded-lg bg-surface border border-border hover:border-primary/30 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copié !' : 'Copier'}
    </button>
  )
}

function FieldPreview({ field }: { field: QuoteField }) {
  return (
    <div className={cn('p-3 bg-surface rounded-xl border', field.required ? 'border-primary/20' : 'border-border')}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-ink">{field.label}</label>
        <div className="flex items-center gap-1.5">
          {field.required && <span className="text-[9px] text-red-400 font-bold uppercase">Requis</span>}
          <span className="text-[9px] text-muted bg-card px-1.5 py-0.5 rounded-full border border-border">{field.type}</span>
        </div>
      </div>
      {field.type === 'select' && field.options ? (
        <div className="flex flex-wrap gap-1">
          {field.options.slice(0, 4).map((opt) => (
            <span key={opt} className="text-[10px] px-2 py-0.5 rounded-full bg-card border border-border text-muted">{opt}</span>
          ))}
          {field.options.length > 4 && <span className="text-[10px] text-muted">+{field.options.length - 4}</span>}
        </div>
      ) : field.type === 'textarea' ? (
        <div className="h-8 bg-card border border-border rounded-lg opacity-50" />
      ) : (
        <div className="h-7 bg-card border border-border rounded-lg flex items-center px-2">
          <span className="text-[10px] text-muted">{field.placeholder ?? '...'}</span>
        </div>
      )}
    </div>
  )
}

export default function QuoteBuilderPanel({ project }: { project: GeneratedProject }) {
  const quote = project.smartQuote ?? generateSmartQuote(project)
  const [tab, setTab] = useState<'form' | 'emails'>('form')

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex items-center gap-1 px-4 py-2.5 border-b border-border bg-[#0a0a14]">
        {(['form', 'emails'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold transition-all', tab === t ? 'bg-primary/15 text-primary-light border border-primary/20' : 'text-muted hover:text-ink hover:bg-white/5')}
          >
            {t === 'form' ? '📋 Formulaire' : '📧 Emails'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'form' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-5">
              <h2 className="font-syne font-bold text-lg text-ink">{quote.formTitle}</h2>
              <p className="text-xs text-muted mt-1">{quote.formSubtitle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-green font-bold bg-green/10 border border-green/20 px-2 py-0.5 rounded-full">
                  Réponse sous {quote.estimatedResponseTime}
                </span>
                <span className="text-[10px] text-muted">{quote.fields.length} champs</span>
              </div>
            </div>

            <div className="grid gap-3">
              {quote.fields.map((field) => (
                <FieldPreview key={field.id} field={field} />
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-xl">
              <p className="text-[10px] text-muted">
                Ce formulaire intelligent est intégré dans le site exporté. Chaque soumission envoie un résumé au commerçant et une confirmation au prospect.
              </p>
            </div>
          </div>
        )}

        {tab === 'emails' && (
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm">📬 Email de confirmation client</h4>
                <CopyButton text={quote.clientConfirmationTemplate} />
              </div>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line font-mono bg-surface rounded-lg p-3 border border-border">
                {quote.clientConfirmationTemplate}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-syne font-bold text-ink text-sm">📊 Résumé admin (nouvelle demande)</h4>
                <CopyButton text={quote.adminSummaryTemplate} />
              </div>
              <p className="text-xs text-muted leading-relaxed whitespace-pre-line font-mono bg-surface rounded-lg p-3 border border-border">
                {quote.adminSummaryTemplate}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
