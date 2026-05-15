'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

const icons = { success: CheckCircle, error: XCircle, info: Info, warning: AlertTriangle }
const colors = {
  success: 'border-green/30 bg-green/5 text-green',
  error: 'border-red-300 bg-red-50 text-red-600',
  info: 'border-blue/30 bg-blue/5 text-blue',
  warning: 'border-yellow/30 bg-yellow/5 text-yellow',
}

function ToastItem({ toast: t, onClose }: { toast: Toast; onClose: () => void }) {
  const Icon = icons[t.type]

  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-card animate-slide-up min-w-[280px] max-w-sm bg-white',
        colors[t.type],
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p className="text-sm font-medium text-ink flex-1">{t.message}</p>
      <button onClick={onClose} className="text-muted hover:text-ink transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((type: ToastType, message: string) => {
    const id = `toast_${Date.now()}`
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[9999]">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
