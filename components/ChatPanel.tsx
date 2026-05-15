'use client'

import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

interface ChatPanelProps {
  messages: ChatMessage[]
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPanel({ messages }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            'flex gap-2.5 animate-fade-in',
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          {msg.role === 'assistant' && (
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center shrink-0 mt-0.5 shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          <div
            className={cn(
              'max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
              msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-sm shadow-primary'
                : 'bg-card border border-border text-ink rounded-tl-sm',
            )}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            <p className={cn(
              'text-[10px] mt-1',
              msg.role === 'user' ? 'text-white/50 text-right' : 'text-muted',
            )}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
