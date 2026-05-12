'use client'

import { use, useEffect, useState } from 'react'
import {
  MapPin, Clock, Wallet, Globe, Share2, Heart, Star,
  ArrowLeft, ChevronRight, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { RouteTimeline } from '@/components/route/RouteTimeline'
import { BudgetBreakdown } from '@/components/route/BudgetBreakdown'
import { ShareButton } from '@/components/shared/ShareButton'
import { Button } from '@/components/ui/Button'
import { Badge, TransportBadge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { usePlannerStore } from '@/lib/store/planner'
import { generateRoute } from '@/lib/engine/route-generator'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'
import { DESTINATIONS } from '@/lib/data/destinations'
import { cn } from '@/lib/utils/cn'
import type { GeneratedRoute } from '@/lib/types'

// ─── Load route ───────────────────────────────────────────────────────────────
async function loadRoute(id: string): Promise<GeneratedRoute | null> {
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(`route-${id}`)
    if (cached) return JSON.parse(cached)
  }
  const featured = FEATURED_ROUTES.find(r => r.slug === id || r.id === id)
  if (featured) {
    const startDest = Object.values(DESTINATIONS).find(d => d.country === featured.countries[0])
    if (startDest) {
      return generateRoute({
        startDestinationId: startDest.id,
        durationDays: featured.durationDays,
        budget: featured.budgetFrom * 1.3,
        travelStyle: featured.travelStyle,
        transportPreferences: ['bus', 'train', 'ferry', 'flight'],
        travelers: 1,
      })
    }
  }
  try {
    const res = await fetch(`/api/routes/${id}`)
    if (res.ok) return (await res.json()).data
  } catch {}
  return null
}

// ─── Map SVG (always dark — cinematic map look) ───────────────────────────────
function RouteMapSVG({ route }: { route: GeneratedRoute }) {
  const stops = route.stops
  const legs = route.transportLegs

  const TRANSPORT_COLORS: Record<string, string> = {
    bus: '#3b82f6', train: '#8b5cf6', ferry: '#06b6d4',
    flight: '#f59e0b', van: '#f97316', walk: '#10b981', 'tuk-tuk': '#ec4899',
  }

  const lats = stops.map(s => s.destination.lat)
  const lngs = stops.map(s => s.destination.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)

  const normalize = (lat: number, lng: number) => {
    const pad = 0.15
    const x = ((lng - minLng) / ((maxLng - minLng) || 1)) * (1 - 2 * pad) + pad
    const y = 1 - (((lat - minLat) / ((maxLat - minLat) || 1)) * (1 - 2 * pad) + pad)
    return { x: x * 800, y: y * 380 }
  }

  const points = stops.map(s => normalize(s.destination.lat, s.destination.lng))

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
      <svg viewBox="0 0 800 380" className="w-full" style={{ minHeight: 220, background: '#0d1117' }}>
        {/* Grid */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i*53} y1={0} x2={i*53} y2={380} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i*47} x2={800} y2={i*47} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}

        {/* Route lines */}
        {legs.map((leg, i) => {
          if (i >= points.length - 1) return null
          const from = points[i], to = points[i + 1]
          const color = TRANSPORT_COLORS[leg.type] ?? '#eab308'
          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2 - 28

          return (
            <g key={leg.id}>
              {leg.type === 'flight' ? (
                <path d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  stroke={color} strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.85" />
              ) : (
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={color} strokeWidth="2.5" opacity="0.75" />
              )}
              <circle r="3.5" fill={color} opacity="0.95">
                <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite"
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} />
              </circle>
            </g>
          )
        })}

        {/* City nodes */}
        {stops.map((stop, i) => {
          const { x, y } = points[i]
          const isFirst = i === 0, isLast = i === stops.length - 1
          return (
            <g key={stop.id}>
              <circle cx={x} cy={y} r="16" fill="#eab308" opacity="0.06">
                <animate attributeName="r" from="10" to="20" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.1" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={isFirst || isLast ? 8 : 6}
                fill={isFirst ? '#eab308' : isLast ? '#10b981' : '#fff'}
                stroke={isFirst || isLast ? 'transparent' : '#6366f1'} strokeWidth="2" />
              <text x={x} y={y - 14} textAnchor="middle" fontSize="10"
                fontFamily="Inter, system-ui" fontWeight="600" fill="rgba(255,255,255,0.92)">
                {stop.destination.name}
              </text>
              <text x={x} y={y + 22} textAnchor="middle" fontSize="8"
                fontFamily="Inter, system-ui" fill="rgba(255,255,255,0.35)">
                Day {stop.arrivalDay}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-xs">
        {[{ color: '#8b5cf6', l: 'Train' }, { color: '#06b6d4', l: 'Ferry' },
          { color: '#3b82f6', l: 'Bus' }, { color: '#f59e0b', l: 'Flight' }].map(({ color, l }) => (
          <div key={l} className="flex items-center gap-1">
            <div className="h-2 w-4 rounded-full" style={{ background: color }} />
            <span className="text-gray-500">{l}</span>
          </div>
        ))}
      </div>

      {/* Map label */}
      <div className="absolute top-3 right-3 text-xs text-gray-600 font-mono">Route map</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RouteResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const storeRoute = usePlannerStore(s => s.generatedRoute)
  const [route, setRoute] = useState<GeneratedRoute | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (storeRoute && storeRoute.shareSlug === id) {
      setRoute(storeRoute)
      setLoading(false)
      try { sessionStorage.setItem(`route-${id}`, JSON.stringify(storeRoute)) } catch {}
      return
    }
    loadRoute(id).then(r => {
      setRoute(r)
      setLoading(false)
      if (r) try { sessionStorage.setItem(`route-${id}`, JSON.stringify(r)) } catch {}
    })
  }, [id, storeRoute])

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-56 w-full" />
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}</div>
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // ── Not found ──
  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-5xl mb-4">🗺️</p>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Route not found</h2>
          <p className="text-slate-500 dark:text-gray-400 mb-6">This route may have expired or doesn't exist.</p>
          <Link href="/plan"><Button variant="primary"><Zap className="h-4 w-4" />Plan a new route</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── CINEMATIC HERO (always dark) ────────────────────────────────── */}
      <div className="relative bg-gray-950 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/8 via-transparent to-cyan-500/8" />
        <div className="absolute inset-0 dot-grid opacity-20" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* Back */}
          <Link href="/routes" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            All routes
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{route.emoji}</span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {route.title}
                </h1>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-5">
                {route.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                {[
                  { icon: Clock,  value: `${route.durationDays} days`,     color: 'text-brand-400' },
                  { icon: Wallet, value: `~$${route.budgetTotal} total`,   color: 'text-emerald-400' },
                  { icon: Globe,  value: route.countries.join(', '),       color: 'text-cyan-400' },
                  { icon: MapPin, value: `${route.stops.length} stops`,   color: 'text-violet-400' },
                ].map(({ icon: Icon, value, color }) => (
                  <span key={value} className="flex items-center gap-1.5 text-sm text-gray-300">
                    <Icon className={cn('h-4 w-4', color)} />
                    {value}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {route.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setSaved(!saved)}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-all',
                  saved
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                    : 'border-white/15 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white',
                )}
              >
                <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
                <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
              </button>
              <ShareButton slug={route.shareSlug} title={route.title} />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Route map */}
        <div className="mb-8">
          <RouteMapSVG route={route} />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">

          {/* Timeline */}
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-500" />
              Your itinerary
            </h2>
            <RouteTimeline route={route} />

            {/* CTA after timeline */}
            <div className="mt-8 rounded-2xl border border-brand-200 dark:border-brand-900/50 bg-brand-50 dark:bg-brand-900/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Want to tweak this route?</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Adjust budget, duration, or style and regenerate.</p>
              </div>
              <Link href="/plan">
                <Button variant="primary" size="sm">
                  <Zap className="h-4 w-4" />
                  Modify & regenerate
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Budget */}
            <BudgetBreakdown breakdown={route.budgetBreakdown} />

            {/* Transport overview */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Transport overview</h3>
              <div className="space-y-2">
                {route.transportLegs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TransportBadge type={leg.type} />
                    <span className="text-xs text-slate-500 dark:text-gray-400 flex-1 truncate">
                      {leg.fromName} → {leg.toName}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">
                      ${leg.priceEstimate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                Route highlights
              </h3>
              <ul className="space-y-2">
                {route.highlights.slice(0, 6).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-300">
                    <span className="text-brand-500 mt-0.5 flex-shrink-0">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Affiliate essentials */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-3">
              <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wider">Travel essentials</p>
              {[
                { label: 'Asia eSIM',        desc: 'Stay connected from $5',  icon: '📱', href: 'https://airalo.com' },
                { label: 'Travel Insurance', desc: 'SafetyWing from $42/mo',  icon: '🛡️', href: 'https://safetywing.com' },
                { label: 'Wise Card',        desc: 'Best FX rates abroad',    icon: '💳', href: 'https://wise.com' },
              ].map(({ label, desc, icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 p-3 hover:border-gray-300 dark:hover:border-gray-500 transition-colors group">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">{desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-gray-500 group-hover:text-slate-700 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
