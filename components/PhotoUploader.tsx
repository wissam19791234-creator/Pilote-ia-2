'use client'

import { useState, useCallback, useRef } from 'react'
import { ImageIcon, X, Upload, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoUploaderProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
  videos?: string[]
  onVideosChange?: (videos: string[]) => void
  onVideoFrames?: (frames: string[]) => void
  maxVideos?: number
}

async function extractVideoFrame(dataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video')
      video.src = dataUrl
      video.muted = true
      video.currentTime = 0.5
      video.onloadeddata = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = Math.min(video.videoWidth, 1280)
          canvas.height = Math.min(video.videoHeight, 720)
          const ctx = canvas.getContext('2d')
          if (!ctx) { resolve(null); return }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL('image/jpeg', 0.85))
        } catch { resolve(null) }
      }
      video.onerror = () => resolve(null)
    } catch { resolve(null) }
  })
}

export default function PhotoUploader({
  photos,
  onChange,
  maxPhotos = 8,
  videos = [],
  onVideosChange,
  onVideoFrames,
  maxVideos = 3,
}: PhotoUploaderProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [videoFramesState, setVideoFramesState] = useState<string[]>([])

  const readFiles = useCallback(
    (files: FileList) => {
      const toRead = Array.from(files)

      toRead.forEach((file) => {
        // Size check: max 50MB
        if (file.size > 50 * 1024 * 1024) {
          console.warn(`[PhotoUploader] File too large (${file.name}), skipping.`)
          return
        }

        if (file.type.startsWith('image/')) {
          if (photos.length >= maxPhotos) return
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result
            if (typeof result === 'string') {
              onChange([...photos, result])
            }
          }
          reader.readAsDataURL(file)
        } else if (file.type.startsWith('video/')) {
          if (videos.length >= maxVideos) return
          if (!onVideosChange) return
          const reader = new FileReader()
          reader.onload = async (e) => {
            const result = e.target?.result
            if (typeof result === 'string') {
              const newVideos = [...videos, result]
              onVideosChange(newVideos)

              // Extract first frame for Claude Vision
              if (onVideoFrames) {
                const frame = await extractVideoFrame(result)
                const newFrames = [...videoFramesState, frame].filter((f): f is string => f !== null)
                setVideoFramesState(newFrames)
                onVideoFrames(newFrames)
              }
            }
          }
          reader.readAsDataURL(file)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photos, onChange, maxPhotos, videos, onVideosChange, onVideoFrames, videoFramesState, maxVideos],
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

  const removePhoto = (i: number) => {
    onChange(photos.filter((_, idx) => idx !== i))
  }

  const removeVideo = (i: number) => {
    if (!onVideosChange) return
    const newVideos = videos.filter((_, idx) => idx !== i)
    onVideosChange(newVideos)
    // Also remove corresponding frame
    if (onVideoFrames) {
      const newFrames = videoFramesState.filter((_, idx) => idx !== i)
      setVideoFramesState(newFrames)
      onVideoFrames(newFrames)
    }
  }

  const canAddMore = photos.length < maxPhotos || (onVideosChange && videos.length < maxVideos)

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      {canAddMore && (
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
            Glissez vos photos &amp; vidéos ici ou cliquez
          </p>
          <p className="text-[10px] text-muted/60">
            {photos.length}/{maxPhotos} photos · {videos.length}/{maxVideos} vidéos · Première photo = image hero
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Photo thumbnails */}
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
                onClick={() => removePhoto(i)}
                className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Video thumbnails */}
      {videos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((src, i) => (
            <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-border bg-black">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={src}
                muted
                className="w-full h-full object-cover opacity-70"
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 text-white text-[8px] text-center py-0.5">
                Vidéo {i + 1}
              </div>
              <button
                onClick={() => removeVideo(i)}
                className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Clear all button */}
      {(photos.length > 0 || videos.length > 0) && (
        <button
          onClick={() => {
            onChange([])
            if (onVideosChange) onVideosChange([])
            if (onVideoFrames) { setVideoFramesState([]); onVideoFrames([]) }
          }}
          className="flex items-center gap-1 px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors w-fit"
        >
          <X className="w-3 h-3" />
          Tout supprimer
        </button>
      )}

      {photos.length === 0 && videos.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-muted">
          <ImageIcon className="w-4 h-4" />
          <span>Aucun média — un placeholder sera utilisé</span>
        </div>
      )}
    </div>
  )
}
