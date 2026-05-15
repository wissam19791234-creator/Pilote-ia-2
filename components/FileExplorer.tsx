'use client'

import { FileText, FileCode, FileJson, Folder, ImageIcon } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { cn } from '@/lib/utils'

interface FileExplorerProps {
  project: GeneratedProject
  selectedFile: string
  onSelect: (name: string) => void
}

function FileIcon({ type }: { type: string }) {
  if (type === 'html') return <FileCode className="w-4 h-4 text-orange" />
  if (type === 'css') return <FileText className="w-4 h-4 text-blue" />
  if (type === 'js') return <FileText className="w-4 h-4 text-yellow" />
  if (type === 'json') return <FileJson className="w-4 h-4 text-green" />
  return <FileText className="w-4 h-4 text-muted" />
}

export default function FileExplorer({ project, selectedFile, onSelect }: FileExplorerProps) {
  return (
    <div className="flex flex-col gap-1 p-4 font-mono text-sm">
      {/* Root */}
      <div className="flex items-center gap-2 text-muted font-semibold py-1">
        <Folder className="w-4 h-4 text-yellow" />
        generated-site/
      </div>

      {/* Files */}
      {project.files.map((file) => (
        <button
          key={file.name}
          onClick={() => onSelect(file.name)}
          className={cn(
            'flex items-center gap-2 pl-6 pr-3 py-1.5 rounded-lg text-left transition-colors w-full',
            selectedFile === file.name ? 'bg-orange/10 text-orange' : 'text-ink hover:bg-black/5',
          )}
        >
          <FileIcon type={file.type} />
          <span className="flex-1 truncate">{file.name}</span>
          <span className="text-[10px] text-muted shrink-0">{file.size}</span>
        </button>
      ))}

      {/* Assets folder */}
      <div className="flex items-center gap-2 text-muted py-1 pl-3">
        <Folder className="w-4 h-4 text-yellow/60" />
        assets/
      </div>
      <div className="flex items-center gap-2 pl-9 py-1 text-muted text-xs">
        <ImageIcon className="w-3.5 h-3.5" />
        {project.photos.length} photo{project.photos.length !== 1 ? 's' : ''} intégrée{project.photos.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
