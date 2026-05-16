import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <p className="text-5xl mb-6">📦</p>
        <h1 className="font-syne font-bold text-2xl text-ink mb-3">Cette section n&apos;est plus active</h1>
        <p className="text-muted mb-8 max-w-md">
          Les formations ne font plus partie de l&apos;offre SitePilot AI.
          Retrouvez tous les outils dont vous avez besoin directement dans le Studio.
        </p>
        <Link
          href="/studio"
          className="btn-primary px-6 py-3 rounded-xl font-syne font-bold"
        >
          Ouvrir le Studio →
        </Link>
      </div>
      <Footer />
    </div>
  )
}
