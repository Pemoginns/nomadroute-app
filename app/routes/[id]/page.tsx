'use client'

import { use, useEffect, useState } from 'react'

import {
  MapPin, Clock, Wallet, Globe, Share2, Heart, Download,
  ChevronRight, Bookmark, Star, TrendingUp, ArrowLeft
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
import type { GeneratedRoute, FeaturedRoute } from '@/lib/types'

// ─── Convert featured route to GeneratedRoute ─────────────────────────────────
async function loadRoute(id: string): Promise<GeneratedRoute | null> {
  // Check if it's a cached generated route in session storage
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(`route-${id}`)
    if (cached) return JSON.parse(cached)
  }

  // Try to generate from a featured route template
  const featured = FEATURED_ROUTES.find(r => r.slug === id || r.id === id)
  if (featured) {
    const startDest = Object.values(DESTINATIONS).find(
      d => d.country === featured.countries[0]
    )
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

  // Try API
  try {
    const res = await fetch(`/api/routes/${id}`)
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  } catch {}

  return null
}

function RouteMapSVG({ route }: { route: GeneratedRoute }) {
  const stops = route.stops
  const legs = route.transportLegs

  const TRANSPORT_COLORS: Record<string, string> = {
    bus: '#3b82f6',
    train: '#8b5cf6',
    ferry: '#06b6d4',
    flight: '#f59e0b',
    van: '#f97316',
    walk: '#10b981',
    'tuk-tuk': '#ec4899',
  }

  // Simple coordinate normalization for our demo
  const lats = stops.map(s => s.destination.lat)
  const lngs = stops.map(s => s.destination.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const padFactor = 0.15

  const normalize = (lat: number, lng: number) => {
    const rangeX = (maxLng - minLng) || 1
    const rangeY = (maxLat - minLat) || 1
    const pad = padFactor
    const x = ((lng - minLng) / rangeX) * (1 - 2 * pad) + pad
    const y = 1 - (((lat - minLat) / rangeY) * (1 - 2 * pad) + pad)
    return { x: x * 800, y: y * 400 }
  }

  const points = stops.map(s => normalize(s.destination.lat, s.destination.lng))

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-bg-surface">
      <svg viewBox="0 0 800 400" className="w-full" style={{ minHeight: 240 }}>
        {/* Background */}
        <rect width="800" height="400" fill="#0F0F1A" />

        {/* Grid */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i * 53} y1={0} x2={i * 53} y2={400} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 50} x2={800} y2={i * 50} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}

        {/* Route lines */}
        {legs.map((leg, i) => {
          if (i >= points.length - 1) return null
          const from = points[i]
          const to = points[i + 1]
          const color = TRANSPORT_COLORS[leg.type] ?? '#6366f1'
          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2 - 30

          return (
            <g key={leg.id}>
              {leg.type === 'flight' ? (
                <path
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6 4"
                  opacity="0.8"
                />
              ) : (
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={color}
                  strokeWidth="2.5"
                  opacity="0.7"
                />
              )}
              {/* Animated dot */}
              <circle r="3" fill={color} opacity="0.9">
                <animateMotion
                  dur={`${2 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                />
              </circle>
            </g>
          )
        })}

        {/* Stop markers */}
        {stops.map((stop, i) => {
          const { x, y } = points[i]
          const isFirst = i === 0
          const isLast = i === stops.length - 1

          return (
            <g key={stop.id}>
              {/* Pulse ring */}
              <circle cx={x} cy={y} r="14" fill="#6366f1" opacity="0.1">
                <animate attributeName="r" from="10" to="18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.2" to="0" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Main dot */}
              <circle
                cx={x} cy={y} r={isFirst || isLast ? 8 : 6}
                fill={isFirst ? '#6366f1' : isLast ? '#10b981' : '#fff'}
                stroke={isFirst || isLast ? 'transparent' : '#6366f1'}
                strokeWidth="2"
              />

              {/* Label */}
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                fontSize="10"
                fontFamily="Inter, system-ui"
                fontWeight="600"
                fill="rgba(255,255,255,0.9)"
              >
                {stop.destination.name}
              </text>

              {/* Day label */}
              <text
                x={x}
                y={y + 22}
                textAnchor="middle"
                fontSize="8"
                fontFamily="Inter, system-ui"
                fill="rgba(255,255,255,0.4)"
              >
                Day {stop.arrivalDay}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-xs">
        {[
          { color: '#8b5cf6', label: 'Train' },
          { color: '#06b6d4', label: 'Ferry' },
          { color: '#3b82f6', label: 'Bus' },
          { color: '#f59e0b', label: 'Flight' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1">
            <div className="h-2 w-4 rounded-full" style={{ background: color }} />
            <span className="text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RouteResultsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const storeRoute = usePlannerStore(s => s.generatedRoute)
  const [route, setRoute] = useState<GeneratedRoute | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Check Zustand store first (same-session navigation from planner)
    if (storeRoute && storeRoute.shareSlug === id) {
      setRoute(storeRoute)
      setLoading(false)
      try { sessionStorage.setItem(`route-${id}`, JSON.stringify(storeRoute)) } catch {}
      return
    }
    loadRoute(id).then(r => {
      setRoute(r)
      setLoading(false)
      if (r) {
        try { sessionStorage.setItem(`route-${id}`, JSON.stringify(r)) } catch {}
      }
    })
  }, [id, storeRoute])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base pt-20">
        <div className="mx-auto max-w-6xl px-4 py-12 space-y-6">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-64 w-full" />
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-bg-base pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🗺️</p>
          <h2 className="text-2xl font-bold text-white mb-2">Route not found</h2>
          <p className="text-slate-400 mb-6">This route may have expired or doesn't exist.</p>
          <Link href="/plan">
            <Button variant="primary">Plan a new route</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Back nav */}
        <Link
          href="/plan"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to planner
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{route.emoji}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{route.title}</h1>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{route.description}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock className="h-4 w-4 text-brand-400" />
                {route.durationDays} days
              </span>
              <span className="flex items-center gap-1.5 text-sm text-emerald-400 font-medium">
                <Wallet className="h-4 w-4" />
                ~${route.budgetTotal}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Globe className="h-4 w-4 text-cyan-400" />
                {route.countries.join(', ')}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-violet-400" />
                {route.stops.length} stops
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSaved(!saved)}
              className={saved ? 'border-red-500/40 text-red-400' : ''}
            >
              <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
              {saved ? 'Saved' : 'Save'}
            </Button>
            <ShareButton slug={route.shareSlug} title={route.title} />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {route.tags.map(tag => (
            <Badge key={tag} variant="default" size="sm">{tag}</Badge>
          ))}
        </div>

        {/* Route map */}
        <div className="mb-8">
          <RouteMapSVG route={route} />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">

          {/* Timeline */}
          <div>
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-400" />
              Your itinerary
            </h2>
            <RouteTimeline route={route} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BudgetBreakdown breakdown={route.budgetBreakdown} />

            {/* Transport overview */}
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-5">
              <h3 className="font-semibold text-white mb-4 text-sm">Transport overview</h3>
              <div className="space-y-2">
                {route.transportLegs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TransportBadge type={leg.type} />
                    <span className="text-xs text-slate-400 flex-1 truncate">
                      {leg.fromName} → {leg.toName}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium flex-shrink-0">
                      ${leg.priceEstimate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-5">
              <h3 className="font-semibold text-white mb-4 text-sm flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400" />
                Route highlights
              </h3>
              <ul className="space-y-2">
                {route.highlights.slice(0, 6).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-brand-400 mt-0.5">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Affiliate products */}
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-5 space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Travel essentials</p>
              {[
                { label: 'Asia eSIM', desc: 'Stay connected', icon: '📱', partner: 'Airalo', href: 'https://airalo.com' },
                { label: 'Travel Insurance', desc: 'SafetyWing from $42/mo', icon: '🛡️', partner: 'SafetyWing', href: 'https://safetywing.com' },
                { label: 'Wise Card', desc: 'Best FX rates', icon: '💳', partner: 'Wise', href: 'https://wise.com' },
              ].map(({ label, desc, icon, partner, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-bg-overlay p-3 hover:border-white/15 transition-colors group"
                >
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
