'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Zap } from 'lucide-react'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { RouteCard } from '@/components/route/RouteCard'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { TravelStyle } from '@/lib/types'

const STYLE_FILTERS: { value: TravelStyle | 'all'; label: string; emoji: string }[] = [
  { value: 'all',          label: 'All',         emoji: '🌏' },
  { value: 'cheapest',     label: 'Cheapest',    emoji: '💰' },
  { value: 'backpacker',   label: 'Backpacker',  emoji: '🎒' },
  { value: 'digital-nomad',label: 'Nomad',       emoji: '💻' },
  { value: 'scenic',       label: 'Scenic',      emoji: '🏔️' },
  { value: 'adventure',    label: 'Adventure',   emoji: '⚡' },
  { value: 'nightlife',    label: 'Nightlife',   emoji: '🌙' },
]

const COUNTRY_FILTERS = ['All', 'Vietnam', 'Thailand', 'Bali', 'Cambodia', 'Laos', 'Malaysia']

export default function RoutesPage() {
  const [styleFilter, setStyleFilter] = useState<TravelStyle | 'all'>('all')
  const [countryFilter, setCountryFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = FEATURED_ROUTES.filter(r => {
    const matchesStyle   = styleFilter   === 'all'  || r.travelStyle === styleFilter
    const matchesCountry = countryFilter === 'All'  || r.countries.includes(countryFilter)
    const matchesSearch  = !search       || r.title.toLowerCase().includes(search.toLowerCase())
    return matchesStyle && matchesCountry && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MountFadeIn direction="up">
            <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-widest mb-2">
              Community routes
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
              Best backpacker routes
            </h1>
            <p className="text-slate-500 dark:text-gray-400 max-w-xl mb-6">
              Tried & tested routes from thousands of backpackers. Filter by style, country, or budget.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 mb-6">
              {[
                { value: '47K+', label: 'routes planned' },
                { value: '16',   label: 'countries covered' },
                { value: '$28',  label: 'avg daily budget' },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-900 dark:text-white">{value}</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search routes, destinations…"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 pl-10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors text-sm"
              />
            </div>
          </MountFadeIn>
        </div>
      </div>

      {/* ── Filters + Grid ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Style filter — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-2 sm:pb-0">
            {STYLE_FILTERS.map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => setStyleFilter(value)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all flex-shrink-0',
                  styleFilter === value
                    ? 'border-brand-500/60 bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
                )}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Country filter — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1 sm:pb-0">
            {COUNTRY_FILTERS.map(c => (
              <button
                key={c}
                onClick={() => setCountryFilter(c)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-all flex-shrink-0',
                  countryFilter === c
                    ? 'border-cyan-500/50 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                    : 'border-gray-200 dark:border-gray-700/50 bg-white dark:bg-transparent text-slate-500 dark:text-gray-500 hover:border-gray-300 dark:hover:text-gray-300',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-5">
          <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span>{' '}
          route{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((route, i) => (
              <RouteCard key={route.id} route={route} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No routes found</h3>
            <p className="text-slate-500 dark:text-gray-400 mb-6">Try changing your filters or search term.</p>
            <button onClick={() => { setStyleFilter('all'); setCountryFilter('All'); setSearch('') }}
              className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors">
              Clear all filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <FadeIn direction="up" className="mt-12 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <p className="text-slate-500 dark:text-gray-400 text-sm">
                Don't see what you're looking for?
              </p>
              <Link href="/plan">
                <Button variant="primary" size="lg">
                  <Zap className="h-5 w-5" />
                  Generate a custom route
                </Button>
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}
