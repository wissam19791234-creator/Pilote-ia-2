'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem { question: string; answer: string }

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-syne font-semibold text-ink">{item.question}</span>
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all',
              open === i ? 'gradient-bg text-white shadow-glow-sm' : 'bg-card border border-border text-muted',
            )}>
              {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </div>
          </button>
          <div className={cn(
            'overflow-hidden transition-all duration-300',
            open === i ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0',
          )}>
            <p className="text-muted leading-relaxed text-sm">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
