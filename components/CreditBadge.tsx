'use client'

import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { getCredits } from '@/lib/credits'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function CreditBadge() {
  const [credits, setCredits] = useState(12)

  useEffect(() => {
    setCredits(getCredits())
    const handler = () => setCredits(getCredits())
    window.addEventListener('credits-updated', handler)
    return () => window.removeEventListener('credits-updated', handler)
  }, [])

  const color =
    credits <= 1 ? 'text-red-500 bg-red-50 border-red-200' :
    credits <= 4 ? 'text-yellow border-yellow/30 bg-yellow/10' :
    'text-green border-green/30 bg-green/10'

  return (
    <Link href="/pricing">
      <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-105', color)}>
        <Zap className="w-3 h-3" />
        {credits} crédit{credits !== 1 ? 's' : ''}
      </div>
    </Link>
  )
}
