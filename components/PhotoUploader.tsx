'use client'

import { useState, useCallback, useRef } from 'react'
import { ImageIcon, X, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoUploaderProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
}

export default function PhotoUploader({ photos, onChange, maxPhotos = 8 }: PhotoUploaderProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const readFiles = useCallback(
    (files: FileList) => {
      const remaining = maxPhotos - photos.length
      const toRead = Array.from(files).slice(0, remaining).filter((f) => f.type.startsWith('image/'))

      toRead.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (typeof result === 'string') {
            onChange([...photos, result])
          }
        }
        reader.readAsDataURL(file)
      })
    },
    [photos, onChange, maxPhotos],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      readFiles(e.dataTransfer.files)
    },
    [readFiles],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFiles(e.target.files)
    e.target.value = ''
  }

  const remove = (i: number) => {
    onChange(photos.filter((_, idx) => idx !== i))
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      {photos.length < maxPhotos && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all',
            dragging ? 'border-orange bg-orange/5' : 'border-border hover:border-orange/50 hover:bg-orange/5',
          )}
        >
          <Upload className="w-6 h-6 text-muted" />
          <p className="text-xs text-muted text-center">
            Glissez vos photos ici ou cliquez
          </p>
          <p className="text-[10px] text-muted/60">{photos.length}/{maxPhotos} photos · Première = image hero</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-orange/80 text-white text-[8px] text-center py-0.5">
                  Hero
                </div>
              )}
              <button
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ))}
          {photos.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="flex items-center gap-1 px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" />
              Tout supprimer
            </button>
          )}
        </div>
      )}

      {photos.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <ImageIcon className="w-4 h-4" />
          <span>Aucune photo — un placeholder sera utilisé</span>
        </div>
      )}
    </div>
  )
}
