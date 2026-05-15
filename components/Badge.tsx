import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'primary' | 'orange' | 'rose' | 'violet' | 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  children: ReactNode
  className?: string
}

const variantStyles = {
  primary: 'bg-primary/15 text-primary-light border-primary/25',
  orange: 'bg-orange/15 text-orange border-orange/25',
  rose: 'bg-rose/15 text-rose border-rose/25',
  violet: 'bg-violet/15 text-violet border-violet/25',
  blue: 'bg-blue/15 text-blue border-blue/25',
  green: 'bg-green/15 text-green border-green/25',
  yellow: 'bg-yellow/15 text-yellow border-yellow/25',
  red: 'bg-red-500/15 text-red-400 border-red-500/25',
  gray: 'bg-white/5 text-muted border-white/10',
}

export default function Badge({ variant = 'primary', children, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      variantStyles[variant],
      className,
    )}>
      {children}
    </span>
  )
}
