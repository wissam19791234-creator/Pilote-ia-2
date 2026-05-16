'use client'

import { useEffect, useRef, useState } from 'react'
import type { GeneratedProject } from '@/types'

interface RemotionPlayerProps {
  project: GeneratedProject
  onError?: () => void
}

export default function RemotionPlayerInner({ project, onError }: RemotionPlayerProps) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [playerMod, videoMod] = await Promise.all([
          import('@remotion/player'),
          import('@/remotion/SiteDemoVideo'),
        ])
        if (cancelled) return

        const { Player } = playerMod
        const { SiteDemoVideo } = videoMod

        if (!containerRef.current) return

        // Store cleanup reference
        setReady(true)
        // Mount the player into a sub-div we control
        const { createRoot } = await import('react-dom/client')
        const root = containerRef.current

        const reactRoot = createRoot(root)
        reactRoot.render(
          <Player
            component={SiteDemoVideo}
            durationInFrames={360}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            style={{ width: '100%', height: '100%' }}
            controls
            inputProps={{ project }}
          />,
        )

        playerRef.current = root as unknown as HTMLDivElement
      } catch {
        if (!cancelled) {
          setFailed(true)
          onError?.()
        }
      }
    }

    void load()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (failed) return null

  return <div ref={containerRef} className="w-full h-full" />
}
