import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Wallet, Globe, MapPin, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge, TransportBadge } from '@/components/ui/Badge'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const route = FEATURED_ROUTES.find(r => r.slug === id)
  return {
    title: route ? `${route.title} — NomadRoute` : 'Shared Route — NomadRoute',
    description: route
      ? `${route.subtitle} · ${route.durationDays} days · from $${route.budgetFrom}`
      : 'A backpacker route shared on NomadRoute',
    openGraph: {
      images: route ? [{ url: route.coverImage }] : [],
    },
  }
}

export default async function SharePage({ params }: Props) {
  const { id } = await params
  const route = FEATURED_ROUTES.find(r => r.slug === id)

  if (!route) {
    return (
      <div className="min-h-screen bg-bg-base pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔗</p>
          <h2 className="text-2xl font-bold text-white mb-2">Route not found</h2>
          <p className="text-slate-400 mb-6">This shared route link may have expired.</p>
          <Link href="/plan"><Button variant="primary">Plan your own route</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Share card */}
        <div className="rounded-3xl border border-white/10 bg-bg-surface overflow-hidden shadow-elevated">
          {/* Cover */}
          <div
            className="relative h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${route.coverImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/20 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="text-5xl">{route.emoji}</span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <h1 className="text-2xl font-black text-white">{route.title}</h1>
              <p className="text-slate-400 mt-1">{route.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-4 w-4 text-brand-400" />
                {route.durationDays} days
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Wallet className="h-4 w-4" />
                from ${route.budgetFrom}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Globe className="h-4 w-4 text-cyan-400" />
                {route.countries.join(', ')}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {route.tags.map(tag => (
                <Badge key={tag} variant="default" size="sm">{tag}</Badge>
              ))}
            </div>

            {/* Highlights */}
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Highlights</p>
              <ul className="space-y-1.5">
                {route.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-brand-400">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-2 space-y-3">
              <Link href={`/routes/${route.slug}`} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  View full itinerary
                  <MapPin className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/plan" className="block">
                <Button variant="secondary" size="lg" className="w-full">
                  <Zap className="h-4 w-4" />
                  Plan my own route — free
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-slate-600">
              Shared via{' '}
              <Link href="/" className="text-brand-400 hover:text-brand-300">NomadRoute</Link>
              {' '}— The Backpacker OS for Asia
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
