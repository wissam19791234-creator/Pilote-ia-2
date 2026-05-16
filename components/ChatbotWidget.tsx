'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ChatbotConfig } from '@/types'

interface ChatbotWidgetProps {
  config: ChatbotConfig
  interactive?: boolean
}

export default function ChatbotWidget({ config, interactive = false }: ChatbotWidgetProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [showResponse, setShowResponse] = useState(false)

  const primaryColor = config.primaryColor || '#7c3aed'
  const visibleQuestions = config.suggestedQuestions.slice(0, 3)

  function handleQuestionClick(question: string) {
    if (!interactive) return
    setSelectedQuestion(question)
    setShowResponse(true)
  }

  const simulatedResponse = selectedQuestion
    ? config.answers.find(
        (a) => a.trigger && selectedQuestion.toLowerCase().includes(a.trigger.toLowerCase())
      )?.response ?? "Merci pour votre question ! Un conseiller vous répond sous peu."
    : null

  return (
    <div className="relative w-[320px] h-[480px] select-none">
      {/* Chat window */}
      <div className="absolute inset-0 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: primaryColor }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
            {config.title.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{config.title}</p>
            <p className="text-white/70 text-xs">En ligne maintenant</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-gray-50">
          {/* Welcome bubble */}
          <div className="flex items-start gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
              style={{ background: primaryColor }}
            >
              {config.title.charAt(0).toUpperCase()}
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[220px]">
              <p className="text-gray-800 text-xs leading-relaxed">{config.welcomeMessage}</p>
            </div>
          </div>

          {/* Suggested questions */}
          <div className="flex flex-col gap-1.5 mt-1">
            {visibleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick(q)}
                className={cn(
                  'text-left text-xs px-3 py-2 rounded-xl border transition-all duration-150',
                  interactive
                    ? 'cursor-pointer hover:bg-opacity-10 active:scale-95'
                    : 'cursor-default',
                  selectedQuestion === q
                    ? 'border-transparent text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                )}
                style={
                  selectedQuestion === q
                    ? { background: primaryColor, borderColor: primaryColor }
                    : {}
                }
              >
                {q}
              </button>
            ))}
          </div>

          {/* Simulated response */}
          {interactive && showResponse && simulatedResponse && (
            <div className="flex items-start gap-2 mt-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: primaryColor }}
              >
                {config.title.charAt(0).toUpperCase()}
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[220px]">
                <p className="text-gray-800 text-xs leading-relaxed">{simulatedResponse}</p>
              </div>
            </div>
          )}
        </div>

        {/* Lead capture hint */}
        {config.leadCaptureFields.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-100 bg-white">
            <div className="flex gap-1.5 flex-wrap">
              {config.leadCaptureFields.slice(0, 3).map((field) => (
                <span
                  key={field}
                  className="text-[10px] px-2 py-0.5 rounded-full text-white/90"
                  style={{ background: primaryColor + 'cc' }}
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Input bar */}
        <div className="px-3 py-2.5 border-t border-gray-100 bg-white flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-xs text-gray-400">
            Écrivez votre message…
          </div>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{ background: primaryColor }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating button (visible below the widget as decoration) */}
      <div
        className="absolute -bottom-4 right-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-lg"
        style={{ background: primaryColor }}
      >
        💬
      </div>
    </div>
  )
}
