'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, Trash2, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import ProjectCard from '@/components/ProjectCard'
import { getProjects, deleteProject, clearProjects } from '@/lib/storage'
import type { GeneratedProject } from '@/types'

function makeMock(i: number): GeneratedProject {
  const examples = [
    { businessName: 'Beauty Studio Paris', city: 'Paris', sector: 'beauté' },
    { businessName: 'Le Gourmet Lyon', city: 'Lyon', sector: 'restaurant' },
    { businessName: 'Prestige Events', city: 'Marseille', sector: 'événementiel' },
  ]
  const ex = examples[i % examples.length]
  return {
    id: `mock_${i}`,
    projectName: `Site ${ex.businessName}`,
    businessName: ex.businessName,
    city: ex.city,
    sector: ex.sector,
    style: 'moderne',
    goal: 'contact',
    tone: 'professionnel',
    audience: 'Clients locaux',
    valueProposition: '',
    painPoints: [],
    services: [],
    products: [],
    automationNeeds: [],
    ecommerceNeeds: [],
    designSystem: {
      palette: { background: '#fffaf3', surface: '#fff8ee', primary: '#ff5a1f', secondary: '#ff4fb8', accent: '#8b5cf6', text: '#171717', muted: '#6b625b' },
      mood: 'moderne', typography: 'Syne', buttonStyle: 'gradient', cardStyle: 'white-shadow',
    },
    pages: [], sections: [],
    seo: { title: '', description: '', keywords: [] },
    copywriting: { heroTitle: '', heroSubtitle: '', ctaPrimary: '', ctaSecondary: '', faq: [], testimonials: [], clientMessage: '' },
    files: [],
    html: `<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#fffaf3;"><h1>${ex.businessName}</h1></body></html>`,
    photos: [],
    createdAt: new Date(Date.now() - 86400000 * (i + 1)).toISOString(),
    status: 'generated',
  }
}

const SECTORS = ['Tous', 'beauté', 'restaurant', 'événementiel', 'automobile', 'mode', 'coaching', 'immobilier', 'fitness', 'e-commerce']
const SORTS = ['Date', 'Nom', 'Secteur'] as const
type SortKey = typeof SORTS[number]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<GeneratedProject[]>([])
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('Tous')
  const [sort, setSort] = useState<SortKey>('Date')
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    const real = getProjects()
    setProjects(real.length > 0 ? real : [makeMock(0), makeMock(1), makeMock(2)])
  }, [])

  const handleDelete = (id: string) => {
    if (!id.startsWith('mock_')) deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const handleClear = () => {
    clearProjects()
    setProjects([makeMock(0), makeMock(1), makeMock(2)])
    setConfirmClear(false)
  }

  const filtered = projects
    .filter((p) => {
      const matchSector = sector === 'Tous' || p.sector === sector
      const matchSearch = !search || p.businessName.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase())
      return matchSector && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'Date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sort === 'Nom') return a.businessName.localeCompare(b.businessName)
      return a.sector.localeCompare(b.sector)
    })

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-syne font-bold text-3xl text-ink mb-1">Mes projets</h1>
              <p className="text-muted">{projects.length} site{projects.length !== 1 ? 's' : ''} généré{projects.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-3">
              {confirmClear ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-500">Vider tous les projets ?</span>
                  <button onClick={handleClear} className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold">Confirmer</button>
                  <button onClick={() => setConfirmClear(false)} className="px-3 py-1.5 rounded-lg border border-border text-sm">Annuler</button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-muted hover:text-red-500 hover:border-red-300 text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Vider
                </button>
              )}
              <Link
                href="/studio"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-sm shadow-orange hover:-translate-y-0.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Nouveau projet
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            {/* Sector */}
            <div className="relative">
              <SlidersHorizontal className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-orange appearance-none cursor-pointer"
              >
                {SECTORS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
              {SORTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${sort === s ? 'bg-white text-orange shadow-sm' : 'text-muted hover:text-ink'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-syne font-bold text-ink text-lg mb-2">Aucun projet trouvé</p>
              <p className="text-muted text-sm">Modifiez vos filtres ou créez un nouveau projet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
