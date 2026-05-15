'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItemData {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItemData[]
}

export default function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col divide-y divide-border">
      {items.map((item, i) => (
        <div key={i} className="py-1">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-syne font-semibold text-ink">{item.question}</span>
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all',
                open === i ? 'gradient-bg text-white' : 'bg-surface text-muted',
              )}
            >
              {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              open === i ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0',
            )}
          >
            <p className="text-muted leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
