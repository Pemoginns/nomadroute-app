'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Calendar, Wallet, Compass, ChevronDown, Zap, Check,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePlannerStore } from '@/lib/store/planner'
import { DESTINATION_LIST, POPULAR_START_DESTINATIONS } from '@/lib/data/destinations'
import { cn } from '@/lib/utils/cn'
import type { TravelStyle, TransportType } from '@/lib/types'

const TRAVEL_STYLES: {
  value: TravelStyle
  label: string
  emoji: string
  desc: string
  border: string
  bg: string
  text: string
}[] = [
  {
    value: 'cheapest',
    label: 'Cheapest',
    emoji: '💰',
    desc: 'Maximize every dollar',
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    bg: 'data-[active=true]:bg-emerald-500/15 data-[active=true]:border-emerald-500/60',
    text: 'data-[active=true]:text-emerald-300',
  },
  {
    value: 'backpacker',
    label: 'Backpacker',
    emoji: '🎒',
    desc: 'Classic SEA circuit',
    border: 'border-brand-500/30 hover:border-brand-500/60',
    bg: 'data-[active=true]:bg-brand-500/15 data-[active=true]:border-brand-500/60',
    text: 'data-[active=true]:text-brand-300',
  },
  {
    value: 'scenic',
    label: 'Scenic',
    emoji: '🏔️',
    desc: 'Most beautiful routes',
    border: 'border-blue-500/30 hover:border-blue-500/60',
    bg: 'data-[active=true]:bg-blue-500/15 data-[active=true]:border-blue-500/60',
    text: 'data-[active=true]:text-blue-300',
  },
  {
    value: 'adventure',
    label: 'Adventure',
    emoji: '⚡',
    desc: 'Thrills & extremes',
    border: 'border-orange-500/30 hover:border-orange-500/60',
    bg: 'data-[active=true]:bg-orange-500/15 data-[active=true]:border-orange-500/60',
    text: 'data-[active=true]:text-orange-300',
  },
  {
    value: 'nightlife',
    label: 'Nightlife',
    emoji: '🌙',
    desc: 'Bars, clubs & parties',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    bg: 'data-[active=true]:bg-purple-500/15 data-[active=true]:border-purple-500/60',
    text: 'data-[active=true]:text-purple-300',
  },
  {
    value: 'digital-nomad',
    label: 'Digital Nomad',
    emoji: '💻',
    desc: 'Work & wander',
    border: 'border-cyan-500/30 hover:border-cyan-500/60',
    bg: 'data-[active=true]:bg-cyan-500/15 data-[active=true]:border-cyan-500/60',
    text: 'data-[active=true]:text-cyan-300',
  },
  {
    value: 'fastest',
    label: 'Fastest',
    emoji: '🚀',
    desc: 'Max countries, min time',
    border: 'border-pink-500/30 hover:border-pink-500/60',
    bg: 'data-[active=true]:bg-pink-500/15 data-[active=true]:border-pink-500/60',
    text: 'data-[active=true]:text-pink-300',
  },
]

const TRANSPORT_OPTIONS: { value: TransportType; label: string; emoji: string }[] = [
  { value: 'bus', label: 'Bus', emoji: '🚌' },
  { value: 'train', label: 'Train', emoji: '🚂' },
  { value: 'ferry', label: 'Ferry', emoji: '⛵' },
  { value: 'flight', label: 'Flight', emoji: '✈️' },
]

const GENERATION_STEPS = [
  { id: 1, label: 'Finding best cities for your style', icon: '🗺️' },
  { id: 2, label: 'Calculating transport connections', icon: '🚂' },
  { id: 3, label: 'Matching hostels to your budget', icon: '🏠' },
  { id: 4, label: 'Optimising day-by-day costs', icon: '💰' },
  { id: 5, label: 'Building your itinerary', icon: '✨' },
]

const POPULAR_STARTS = POPULAR_START_DESTINATIONS
  .map((id) => DESTINATION_LIST.find((d) => d.id === id)!)
  .filter(Boolean)

export function RoutePlanner({ compact = false }: { compact?: boolean }) {
  const { input, setInput, setGenerating, setError, setGeneratedRoute } = usePlannerStore()
  const [isGenerating, setIsGeneratingLocal] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState(0)

  const handleGenerate = async () => {
    setIsGeneratingLocal(true)
    setGenerating(true)
    setError(null)
    setCompletedSteps([])
    setActiveStep(0)

    // Animate steps while API runs
    const stepTimings = [0, 900, 1800, 2700, 3600]
    stepTimings.forEach((delay, i) => {
      setTimeout(() => {
        setActiveStep(i + 1)
        if (i > 0) setCompletedSteps((prev) => [...prev, i])
      }, delay)
    })

    try {
      const res = await fetch('/api/routes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      const data = await res.json()
      if (data.route) {
        const slug = data.route.shareSlug
        setCompletedSteps([1, 2, 3, 4, 5])
        try { sessionStorage.setItem(`route-${slug}`, JSON.stringify(data.route)) } catch {}
        setGeneratedRoute(data.route)
        setTimeout(() => { window.location.href = `/routes/${slug}?preview=true` }, 400)
      } else {
        throw new Error('No route returned')
      }
    } catch {
      setError('Failed to generate route. Please try again.')
      setIsGeneratingLocal(false)
      setGenerating(false)
      setCompletedSteps([])
      setActiveStep(0)
    }
  }

  const toggleTransport = (type: TransportType) => {
    const current = input.transportPreferences
    if (current.includes(type)) {
      if (current.length > 1) setInput({ transportPreferences: current.filter((t) => t !== type) })
    } else {
      setInput({ transportPreferences: [...current, type] })
    }
  }

  return (
    <div className={cn('w-full', compact ? 'space-y-4' : 'space-y-6')}>
      <AnimatePresence mode="wait">
        {isGenerating ? (
          /* ── CINEMATIC GENERATION STATE ── */
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6 py-2"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl mb-3 inline-block"
              >
                🗺️
              </motion.div>
              <h3 className="text-lg font-bold text-white">Building your route…</h3>
              <p className="text-sm text-slate-500 mt-1">Sit tight — this takes about 5 seconds</p>
            </div>

            <div className="space-y-3">
              {GENERATION_STEPS.map((step, i) => {
                const isDone = completedSteps.includes(step.id)
                const isActive = activeStep === step.id
                const isPending = activeStep < step.id

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 border transition-all',
                      isDone && 'border-emerald-500/20 bg-emerald-500/5',
                      isActive && 'border-brand-500/30 bg-brand-500/8',
                      isPending && 'border-white/5 bg-transparent',
                    )}
                  >
                    <div className={cn(
                      'h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs transition-all',
                      isDone && 'border-emerald-500 bg-emerald-500',
                      isActive && 'border-brand-400 bg-transparent',
                      isPending && 'border-white/15 bg-transparent',
                    )}>
                      {isDone ? (
                        <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                      ) : isActive ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="h-3 w-3 rounded-full border-2 border-brand-400 border-t-transparent"
                        />
                      ) : null}
                    </div>
                    <span className={cn(
                      'text-sm',
                      isDone && 'text-emerald-400',
                      isActive && 'text-white font-medium',
                      isPending && 'text-slate-600',
                    )}>
                      {step.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            <p className="text-center text-xs text-slate-600">
              Powered by real backpacker data from 47K+ routes
            </p>
          </motion.div>
        ) : (
          /* ── FORM STATE ── */
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(compact ? 'space-y-4' : 'space-y-6')}
          >
            {!compact && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-1">Plan your route</h2>
                <p className="text-slate-400 text-sm">
                  Tell us your dream trip — we'll build the perfect itinerary
                </p>
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
                  className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-colors"
                >
                  {DESTINATION_LIST.map((d) => (
                    <option key={d.id} value={d.id} className="bg-bg-elevated">
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {POPULAR_STARTS.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setInput({ startDestinationId: dest.id })}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium border transition-all',
                      input.startDestinationId === dest.id
                        ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                        : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300',
                    )}
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Budget */}
            <div className="grid grid-cols-2 gap-3">
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
                    className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
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
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    min={100}
                    max={10000}
                    step={50}
                    value={input.budget}
                    onChange={(e) => setInput({ budget: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-7 text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors"
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
              <div className="grid grid-cols-2 gap-2">
                {TRAVEL_STYLES.slice(0, compact ? 6 : 7).map((style) => {
                  const isActive = input.travelStyle === style.value
                  return (
                    <button
                      key={style.value}
                      data-active={isActive}
                      onClick={() => setInput({ travelStyle: style.value })}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all',
                        'border-white/8 bg-bg-elevated text-slate-400',
                        style.border,
                        isActive && style.bg,
                      )}
                    >
                      <span className="text-lg leading-none">{style.emoji}</span>
                      <div>
                        <p className={cn(
                          'text-xs font-semibold leading-tight',
                          isActive ? 'text-white' : 'text-slate-300',
                        )}>
                          {style.label}
                        </p>
                        {!compact && (
                          <p className="text-xs text-slate-600 leading-tight mt-0.5">{style.desc}</p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Transport (full mode only) */}
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
                          : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-300',
                      )}
                    >
                      <span>{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full text-base font-bold"
              onClick={handleGenerate}
            >
              <Zap className="h-5 w-5" />
              Generate my route
            </Button>

            {compact && (
              <p className="text-center text-xs text-slate-600">
                Free · No account required · Instant results
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
