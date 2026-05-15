import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
  children: ReactNode
  className?: string
}

export default function Card({ hover = true, padding = 'md', children, className }: CardProps) {
  const pads = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div
      className={cn(
        'bg-white border border-border rounded-2xl shadow-card',
        hover && 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
        pads[padding],
        className,
      )}
    >
      {children}
    </div>
  )
}
