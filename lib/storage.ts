import type { GeneratedProject } from '@/types'

const STORAGE_KEY = 'sitepilot_projects'

export function saveProject(project: GeneratedProject): void {
  if (typeof window === 'undefined') return
  try {
    const projects = getProjects()
    const idx = projects.findIndex((p) => p.id === project.id)
    if (idx >= 0) {
      projects[idx] = project
    } else {
      projects.unshift(project)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    // storage unavailable
  }
}

export function getProjects(): GeneratedProject[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as GeneratedProject[]) : []
  } catch {
    return []
  }
}

export function getProject(id: string): GeneratedProject | null {
  if (typeof window === 'undefined') return null
  try {
    return getProjects().find((p) => p.id === id) ?? null
  } catch {
    return null
  }
}

export function deleteProject(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const projects = getProjects().filter((p) => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    // storage unavailable
  }
}

export function clearProjects(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // storage unavailable
  }
}
