'use client'

interface LeadScoreBadgeProps {
  score: number
  level: 'cold' | 'warm' | 'hot'
  showScore?: boolean
}

export default function LeadScoreBadge({ score, level, showScore = false }: LeadScoreBadgeProps) {
  if (level === 'hot') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
        🔥 HOT{showScore && ` · ${score}/100`}
      </span>
    )
  }

  if (level === 'warm') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
        ⚡ WARM{showScore && ` · ${score}/100`}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
      ❄️ COLD{showScore && ` · ${score}/100`}
    </span>
  )
}
