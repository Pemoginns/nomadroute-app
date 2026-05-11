'use client'

import Link from 'next/link'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { Plus, Search, Filter, Heart, Clock, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RouteCard } from '@/components/route/RouteCard'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

const SAVED_ROUTES = FEATURED_ROUTES.slice(0, 6)

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">My Trips</h1>
            <p className="text-slate-400 mt-1">Your saved routes and past adventures</p>
          </div>
          <Link href="/plan">
            <Button variant="primary" size="md">
              <Plus className="h-4 w-4" />
              Plan new trip
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search trips..."
              className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Route grid */}
        {SAVED_ROUTES.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAVED_ROUTES.map((route, i) => (
              <RouteCard key={route.id} route={route} index={i} />
            ))}
          </div>
        ) : (
          <MountFadeIn direction="none" className="text-center py-24">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-xl font-bold text-white mb-2">No saved trips yet</h2>
            <p className="text-slate-400 mb-6">
              Plan your first SEA backpacker route and save it here.
            </p>
            <Link href="/plan">
              <Button variant="primary">Plan my first trip</Button>
            </Link>
          </MountFadeIn>
        )}
      </div>
    </div>
  )
}
