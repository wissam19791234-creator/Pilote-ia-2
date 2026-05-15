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
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            'flex gap-3 animate-fade-in',
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          {/* Avatar */}
          {msg.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Bubble */}
          <div
            className={cn(
              'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
              msg.role === 'user'
                ? 'bg-gradient-to-br from-orange to-rose text-white rounded-tr-sm'
                : 'bg-white border border-border text-ink shadow-card rounded-tl-sm',
            )}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            <p
              className={cn(
                'text-[10px] mt-1.5',
                msg.role === 'user' ? 'text-white/70 text-right' : 'text-muted',
              )}
            >
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
