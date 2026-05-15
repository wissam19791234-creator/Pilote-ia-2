'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { cn } from '@/lib/utils'

interface CodePanelProps {
  project: GeneratedProject
  selectedFile: string
}

function highlight(code: string, type: string): string {
  if (type === 'html') {
    return code
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(&lt;\/?[\w\s="'./:#-]+&gt;)/g, '<span style="color:#ff5a1f">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#8b625b">$1</span>')
  }
  return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function CodePanel({ project, selectedFile }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

  const file = project.files.find((f) => f.name === selectedFile) ?? project.files[0]
  if (!file) return null

  const content = selectedFile === 'index.html' ? project.html : file.content
  const lines = content.split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-mono">{file.name}</span>
          <span className="text-[10px] text-gray-600">{file.size}</span>
        </div>
        <button
          onClick={copy}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
            copied ? 'bg-green/20 text-green' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700',
          )}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto bg-gray-950">
        <pre className="flex min-w-0">
          {/* Line numbers */}
          <div className="select-none border-r border-gray-800 px-3 py-4 text-right font-mono text-xs text-gray-600 leading-6">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Content */}
          <code
            className="flex-1 px-4 py-4 font-mono text-xs leading-6 text-gray-300 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlight(content, file.type) }}
          />
        </pre>
      </div>
    </div>
  )
}
