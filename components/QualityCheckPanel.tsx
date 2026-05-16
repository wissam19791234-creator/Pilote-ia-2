'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, Info, XCircle, RotateCcw } from 'lucide-react'
import type { GeneratedProject, QualityIssue } from '@/types'
import { runQualityCheck, getScoreColor, getScoreLabel } from '@/lib/qualityChecker'

interface QualityCheckPanelProps {
  project: GeneratedProject
  onRegenerate?: () => void
}

function IssueRow({ issue }: { issue: QualityIssue }) {
  const icons = {
    error: <XCircle className="w-4 h-4 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
  }
  const colors = {
    error: 'border-l-red-500/50 bg-red-500/5',
    warning: 'border-l-yellow-400/50 bg-yellow-400/5',
    info: 'border-l-blue-400/50 bg-blue-400/5',
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border-l-4 border border-border ${colors[issue.severity]}`}>
      {icons[issue.severity]}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-ink">{issue.message}</p>
        {issue.fix && <p className="text-[10px] text-muted mt-0.5">→ {issue.fix}</p>}
      </div>
    </div>
  )
}

export default function QualityCheckPanel({ project, onRegenerate }: QualityCheckPanelProps) {
  const [result] = useState(() => project.qualityCheck ?? runQualityCheck(project))
  const scoreColor = getScoreColor(result.score)
  const scoreLabel = getScoreLabel(result.score)

  const errors = result.issues.filter((i) => i.severity === 'error')
  const warnings = result.issues.filter((i) => i.severity === 'warning')
  const infos = result.issues.filter((i) => i.severity === 'info')

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="max-w-2xl mx-auto">
        {/* Score */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex items-center gap-6">
          {/* Circle */}
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - result.score / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-syne font-bold text-xl" style={{ color: scoreColor }}>{result.score}</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-syne font-bold text-lg text-ink mb-1">Contrôle qualité</h2>
            <p className="text-sm font-semibold" style={{ color: scoreColor }}>{scoreLabel}</p>
            <p className="text-xs text-muted mt-1">
              {result.issues.length === 0 ? 'Aucun problème détecté' : `${result.issues.length} point${result.issues.length > 1 ? 's' : ''} à vérifier`}
            </p>
          </div>

          {result.score < 70 && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/15 border border-primary/30 text-primary-light text-xs font-bold hover:bg-primary/25 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Améliorer
            </button>
          )}
        </div>

        {/* Suggestions */}
        {result.suggestions.length > 0 && (
          <div className="flex flex-col gap-2 mb-5">
            {result.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/15 rounded-xl">
                <CheckCircle className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <p className="text-xs text-ink">{s}</p>
              </div>
            ))}
          </div>
        )}

        {/* Issues */}
        {errors.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Erreurs ({errors.length})</h3>
            <div className="flex flex-col gap-2">
              {errors.map((i) => <IssueRow key={i.id} issue={i} />)}
            </div>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Avertissements ({warnings.length})</h3>
            <div className="flex flex-col gap-2">
              {warnings.map((i) => <IssueRow key={i.id} issue={i} />)}
            </div>
          </div>
        )}

        {infos.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Informations ({infos.length})</h3>
            <div className="flex flex-col gap-2">
              {infos.map((i) => <IssueRow key={i.id} issue={i} />)}
            </div>
          </div>
        )}

        {result.issues.length === 0 && (
          <div className="flex items-center gap-3 p-4 bg-green/10 border border-green/20 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green" />
            <p className="text-sm text-ink font-semibold">Tous les contrôles sont passés. Le site est prêt.</p>
          </div>
        )}
      </div>
    </div>
  )
}
