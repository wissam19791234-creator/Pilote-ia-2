'use client'

import { useState, useEffect } from 'react'
import { Zap, Globe, Download, CreditCard, TrendingUp } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import DashboardCard from '@/components/DashboardCard'
import ProjectCard from '@/components/ProjectCard'
import { getProjects, deleteProject } from '@/lib/storage'
import { getCredits } from '@/lib/credits'
import type { GeneratedProject } from '@/types'
import Link from 'next/link'

const ROADMAP = [
  { status: '🔄', label: 'Authentification Supabase', date: 'Q3 2025' },
  { status: '📅', label: 'Export ZIP', date: 'Q4 2025' },
  { status: '📅', label: 'Variantes de design (3/site)', date: 'Q4 2025' },
]

function MockProject(index: number): GeneratedProject {
  const examples = [
    {
      businessName: 'Beauty Studio Paris',
      city: 'Paris',
      sector: 'beauté',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      businessName: 'Le Gourmet Lyon',
      city: 'Lyon',
      sector: 'restaurant',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ]
  const ex = examples[index]
  return {
    id: `mock_${index}`,
    projectName: `Site ${ex.businessName}`,
    businessName: ex.businessName,
    city: ex.city,
    sector: ex.sector,
    style: 'moderne',
    goal: 'contact',
    tone: 'professionnel',
    audience: 'Clients locaux',
    valueProposition: 'Service premium',
    painPoints: [],
    services: [],
    products: [],
    automationNeeds: [],
    ecommerceNeeds: [],
    designSystem: {
      palette: { background: '#fffaf3', surface: '#fff8ee', primary: '#ff5a1f', secondary: '#ff4fb8', accent: '#8b5cf6', text: '#171717', muted: '#6b625b' },
      mood: 'moderne',
      typography: 'Syne',
      buttonStyle: 'gradient',
      cardStyle: 'white-shadow',
    },
    pages: [],
    sections: [],
    seo: { title: '', description: '', keywords: [] },
    copywriting: {
      heroTitle: '',
      heroSubtitle: '',
      ctaPrimary: '',
      ctaSecondary: '',
      faq: [],
      testimonials: [],
      clientMessage: '',
    },
    files: [],
    html: `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#fffaf3;"><h1>${ex.businessName}</h1></body></html>`,
    photos: [],
    createdAt: ex.createdAt,
    status: 'generated',
  }
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<GeneratedProject[]>([])
  const [credits, setCredits] = useState(12)

  useEffect(() => {
    const real = getProjects()
    setProjects(real.length > 0 ? real : [MockProject(0), MockProject(1)])
    setCredits(getCredits())
  }, [])

  const handleDelete = (id: string) => {
    if (id.startsWith('mock_')) return
    deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-syne font-bold text-3xl text-ink mb-1">Dashboard</h1>
            <p className="text-muted">Bienvenue sur SitePilot AI Studio</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <DashboardCard icon={<Zap className="w-5 h-5" />} label="Crédits restants" value={credits} color="green" positive change="+12 ce mois" />
            <DashboardCard icon={<Globe className="w-5 h-5" />} label="Sites générés" value={projects.filter((p) => !p.id.startsWith('mock_')).length} color="blue" />
            <DashboardCard icon={<Download className="w-5 h-5" />} label="Exports" value={projects.filter((p) => p.status === 'exported').length} color="violet" />
            <DashboardCard icon={<CreditCard className="w-5 h-5" />} label="Plan actuel" value="Starter" color="orange" />
          </div>

          {/* Recent projects */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold text-xl text-ink">Projets récents</h2>
              <Link href="/projects" className="text-sm text-primary-light hover:underline font-medium">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.slice(0, 4).map((p) => (
                <ProjectCard key={p.id} project={p} onDelete={handleDelete} />
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="font-syne font-bold text-xl text-ink mb-5">
              <TrendingUp className="w-5 h-5 inline-block mr-2 text-primary-light" />
              Prochaines fonctionnalités
            </h2>
            <div className="flex flex-col gap-3">
              {ROADMAP.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                  <span className="text-xl">{item.status}</span>
                  <span className="flex-1 font-medium text-ink">{item.label}</span>
                  <span className="text-xs text-muted bg-surface px-3 py-1 rounded-full">{item.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
