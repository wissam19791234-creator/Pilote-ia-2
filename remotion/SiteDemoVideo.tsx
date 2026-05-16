import { AbsoluteFill, Sequence } from 'remotion'
import { HeroScene } from './scenes/HeroScene'
import { ServicesScene } from './scenes/ServicesScene'
import { AutomationScene } from './scenes/AutomationScene'
import { ContactScene } from './scenes/ContactScene'
import type { GeneratedProject } from '@/types'

interface SiteDemoVideoProps {
  project: GeneratedProject
}

export function SiteDemoVideo({ project }: SiteDemoVideoProps) {
  const automations = project.automationSales?.options.slice(0, 4).map((o) => o.name) ?? project.automationNeeds.slice(0, 4)

  return (
    <AbsoluteFill>
      {/* Hero — 90 frames (3s at 30fps) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill>
          <HeroScene
            businessName={project.businessName}
            sector={project.sector}
            city={project.city}
            heroTitle={project.copywriting.heroTitle}
            heroSubtitle={project.copywriting.heroSubtitle}
            designSystem={project.designSystem}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Services — 90 frames */}
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill>
          <ServicesScene
            services={project.services}
            sector={project.sector}
            designSystem={project.designSystem}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Automations — 90 frames */}
      <Sequence from={180} durationInFrames={90}>
        <AbsoluteFill>
          <AutomationScene
            automations={automations}
            designSystem={project.designSystem}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Contact CTA — 90 frames */}
      <Sequence from={270} durationInFrames={90}>
        <AbsoluteFill>
          <ContactScene
            businessName={project.businessName}
            ctaPrimary={project.copywriting.ctaPrimary}
            designSystem={project.designSystem}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
