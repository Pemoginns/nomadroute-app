'use client'

import { useState } from 'react'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { Search, TrendingUp, Wallet, Sparkles } from 'lucide-react'
import { RouteCard } from '@/components/route/RouteCard'
import { Badge } from '@/components/ui/Badge'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'
import { cn } from '@/lib/utils/cn'
import type { TravelStyle } from '@/lib/types'

const STYLE_FILTERS: { value: TravelStyle | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🌏' },
  { value: 'cheapest', label: 'Cheapest', emoji: '💰' },
  { value: 'backpacker', label: 'Backpacker', emoji: '🎒' },
  { value: 'digital-nomad', label: 'Nomad', emoji: '💻' },
  { value: 'scenic', label: 'Scenic', emoji: '🏔️' },
  { value: 'adventure', label: 'Adventure', emoji: '⚡' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🌙' },
]

const COUNTRY_FILTERS = ['All', 'Vietnam', 'Thailand', 'Bali', 'Cambodia', 'Laos', 'Malaysia']

export default function RoutesPage() {
  const [styleFilter, setStyleFilter] = useState<TravelStyle | 'all'>('all')
  const [countryFilter, setCountryFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = FEATURED_ROUTES.filter(r => {
    const matchesStyle = styleFilter === 'all' || r.travelStyle === styleFilter
    const matchesCountry = countryFilter === 'All' || r.countries.includes(countryFilter)
    const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase())
    return matchesStyle && matchesCountry && matchesSearch
  })

  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <MountFadeIn direction="up" className="mb-10">
          <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-2">
            Community routes
          </p>
          <h1 className="text-4xl font-black text-white mb-3">
            Best backpacker routes
          </h1>
          <p className="text-slate-400 max-w-xl">
            Tried & tested routes from thousands of backpackers. Filter by style, country, or budget.
          </p>
        </MountFadeIn>

        {/* Search */}
        <div className="relative mb-6 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search routes..."
            className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>

        {/* Style filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {STYLE_FILTERS.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => setStyleFilter(value)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                styleFilter === value
                  ? 'border-brand-500/60 bg-brand-500/15 text-brand-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300',
              )}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Country filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COUNTRY_FILTERS.map(c => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-all',
                countryFilter === c
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                  : 'border-white/8 bg-transparent text-slate-500 hover:text-slate-300',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          {filtered.length} route{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((route, i) => (
              <RouteCard key={route.id} route={route} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-white mb-1">No routes found</h3>
            <p className="text-slate-400">Try changing your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
