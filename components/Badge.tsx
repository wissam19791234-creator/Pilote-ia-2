import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'orange' | 'rose' | 'violet' | 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  children: ReactNode
  className?: string
}

const variantStyles = {
  orange: 'bg-orange/10 text-orange border-orange/20',
  rose: 'bg-rose/10 text-rose border-rose/20',
  violet: 'bg-violet/10 text-violet border-violet/20',
  blue: 'bg-blue/10 text-blue border-blue/20',
  green: 'bg-green/10 text-green border-green/20',
  yellow: 'bg-yellow/10 text-yellow border-yellow/20',
  red: 'bg-red-100 text-red-600 border-red-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function Badge({ variant = 'orange', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
