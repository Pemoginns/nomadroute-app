'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Calendar, Wallet, Compass, Users,
  ChevronDown, Zap, RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePlannerStore } from '@/lib/store/planner'
import { DESTINATION_LIST, POPULAR_START_DESTINATIONS } from '@/lib/data/destinations'
import { cn } from '@/lib/utils/cn'
import type { TravelStyle, TransportType } from '@/lib/types'

const TRAVEL_STYLES: { value: TravelStyle; label: string; emoji: string; desc: string }[] = [
  { value: 'cheapest', label: 'Cheapest', emoji: '💰', desc: 'Maximize every dollar' },
  { value: 'backpacker', label: 'Backpacker', emoji: '🎒', desc: 'Classic SEA experience' },
  { value: 'scenic', label: 'Scenic', emoji: '🏔️', desc: 'Most beautiful routes' },
  { value: 'adventure', label: 'Adventure', emoji: '⚡', desc: 'Thrills & activities' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🌙', desc: 'Bars, clubs & parties' },
  { value: 'digital-nomad', label: 'Digital Nomad', emoji: '💻', desc: 'Work & travel' },
  { value: 'fastest', label: 'Fastest', emoji: '🚀', desc: 'Cover maximum ground' },
]

const TRANSPORT_OPTIONS: { value: TransportType; label: string; emoji: string }[] = [
  { value: 'bus', label: 'Bus', emoji: '🚌' },
  { value: 'train', label: 'Train', emoji: '🚂' },
  { value: 'ferry', label: 'Ferry', emoji: '⛵' },
  { value: 'flight', label: 'Flight', emoji: '✈️' },
]

const POPULAR_STARTS = POPULAR_START_DESTINATIONS.map(id => DESTINATION_LIST.find(d => d.id === id)!).filter(Boolean)

export function RoutePlanner({ compact = false }: { compact?: boolean }) {
  const router = useRouter()
  const { input, setInput, setGenerating, setError, setGeneratedRoute } = usePlannerStore()
  const [isGenerating, setIsGeneratingLocal] = useState(false)
  const [step, setStep] = useState<'form' | 'generating'>('form')

  const handleGenerate = async () => {
    setIsGeneratingLocal(true)
    setGenerating(true)
    setError(null)

    try {
      const res = await fetch('/api/routes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      const data = await res.json()
      if (data.route) {
        const slug = data.route.shareSlug
        // Persist route so results page can load it without an API call
        try {
          sessionStorage.setItem(`route-${slug}`, JSON.stringify(data.route))
        } catch {}
        setGeneratedRoute(data.route)
        // Use href so state is committed before navigation
        window.location.href = `/routes/${slug}?preview=true`
      } else {
        throw new Error('No route returned')
      }
    } catch {
      setError('Failed to generate route. Please try again.')
      setIsGeneratingLocal(false)
      setGenerating(false)
    }
  }

  const toggleTransport = (type: TransportType) => {
    const current = input.transportPreferences
    if (current.includes(type)) {
      if (current.length > 1) setInput({ transportPreferences: current.filter(t => t !== type) })
    } else {
      setInput({ transportPreferences: [...current, type] })
    }
  }

  return (
    <div className={cn('w-full', compact ? 'space-y-4' : 'space-y-6')}>
      {!compact && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1">Plan your route</h2>
          <p className="text-slate-400 text-sm">Tell us your dream trip — we'll build the perfect itinerary</p>
        </div>
      )}

      {/* Start Destination */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
          <MapPin className="h-4 w-4 text-brand-400" />
          Starting from
        </label>
        <div className="relative">
          <select
            value={input.startDestinationId}
            onChange={(e) => setInput({ startDestinationId: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50"
          >
            {DESTINATION_LIST.map(d => (
              <option key={d.id} value={d.id} className="bg-bg-elevated">
                {d.name}, {d.country}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Quick select popular starts */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_STARTS.map(dest => (
            <button
              key={dest.id}
              onClick={() => setInput({ startDestinationId: dest.id })}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium border transition-all',
                input.startDestinationId === dest.id
                  ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300',
              )}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Duration & Budget row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
            <Calendar className="h-4 w-4 text-brand-400" />
            Duration
          </label>
          <div className="relative">
            <input
              type="number"
              min={3}
              max={90}
              value={input.durationDays}
              onChange={(e) => setInput({ durationDays: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              days
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
            <Wallet className="h-4 w-4 text-brand-400" />
            Budget
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input
              type="number"
              min={100}
              max={10000}
              step={50}
              value={input.budget}
              onChange={(e) => setInput({ budget: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </div>
      </div>

      {/* Travel Style */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
          <Compass className="h-4 w-4 text-brand-400" />
          Travel style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => setInput({ travelStyle: style.value })}
              className={cn(
                'flex flex-col items-start gap-0.5 rounded-xl border p-3 text-left transition-all',
                input.travelStyle === style.value
                  ? 'border-brand-500/60 bg-brand-500/10 text-white'
                  : 'border-white/8 bg-bg-elevated text-slate-400 hover:border-white/15 hover:text-slate-300',
              )}
            >
              <span className="text-base">{style.emoji}</span>
              <span className="text-xs font-medium leading-tight">{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transport */}
      {!compact && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Transport preferences</label>
          <div className="flex gap-2 flex-wrap">
            {TRANSPORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleTransport(opt.value)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
                  input.transportPreferences.includes(opt.value)
                    ? 'border-brand-500/50 bg-brand-500/15 text-brand-300'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20',
                )}
              >
                <span>{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full text-base"
        loading={isGenerating}
        onClick={handleGenerate}
      >
        <Zap className="h-5 w-5" />
        Generate my route
      </Button>

      {compact && (
        <p className="text-center text-xs text-slate-600">
          Free • No account required • Instant results
        </p>
      )}
    </div>
  )
}
