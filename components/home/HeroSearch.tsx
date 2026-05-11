'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Compass, Plane, Train, Ship, Building2,
  MapPin, Wallet, Zap, ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DESTINATION_LIST, POPULAR_START_DESTINATIONS } from '@/lib/data/destinations'
import { cn } from '@/lib/utils/cn'

const MODES = [
  { id: 'route',   label: 'Plan Route', icon: Compass,   color: 'text-brand-400' },
  { id: 'flights', label: 'Flights',    icon: Plane,     color: 'text-amber-400' },
  { id: 'trains',  label: 'Trains',     icon: Train,     color: 'text-violet-400' },
  { id: 'ferries', label: 'Ferries',    icon: Ship,      color: 'text-cyan-400' },
  { id: 'hostels', label: 'Hostels',    icon: Building2, color: 'text-emerald-400' },
] as const

type ModeId = (typeof MODES)[number]['id']

const POPULAR = POPULAR_START_DESTINATIONS
  .map(id => DESTINATION_LIST.find(d => d.id === id)!)
  .filter(Boolean)
  .slice(0, 6)

const BUDGET_PRESETS = [
  { label: '< $300', value: 300 },
  { label: '$500',   value: 500 },
  { label: '$1000',  value: 1000 },
  { label: '$2000+', value: 2000 },
]

export function HeroSearch() {
  const router = useRouter()
  const [mode, setMode] = useState<ModeId>('route')
  const [from, setFrom] = useState('bangkok')
  const [budget, setBudget] = useState(600)

  const handleSearch = () => {
    const params = new URLSearchParams({ from, budget: String(budget) })
    if (mode !== 'route') params.set('mode', mode)
    router.push(`/plan?${params.toString()}`)
  }

  const activeMode = MODES.find(m => m.id === mode)!

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* Mode tabs */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex gap-0.5 p-1 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
          {MODES.map(({ id, label, icon: Icon, color }) => {
            const active = mode === id
            return (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200',
                  active
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5',
                )}
              >
                <Icon className={cn('h-3.5 w-3.5 flex-shrink-0', active ? color : '')} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main search card */}
      <div className="rounded-2xl border border-white/12 bg-black/75 backdrop-blur-2xl shadow-elevated overflow-hidden">

        {/* Inputs row */}
        <div className="flex flex-col sm:flex-row">

          {/* From */}
          <div className="flex-1 relative border-b sm:border-b-0 sm:border-r border-white/8">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <MapPin className={cn('h-3.5 w-3.5 flex-shrink-0', activeMode.color)} />
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Departing from
              </span>
            </div>
            <div className="relative px-2 pb-2">
              <select
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="w-full bg-transparent px-2 py-1.5 text-white text-base font-semibold appearance-none focus:outline-none cursor-pointer"
              >
                {DESTINATION_LIST.map(d => (
                  <option key={d.id} value={d.id} className="bg-bg-elevated text-white">
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Budget */}
          <div className="sm:w-48 border-b sm:border-b-0 sm:border-r border-white/8">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1">
              <Wallet className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total budget</span>
            </div>
            <div className="relative px-4 pb-2">
              <span className="text-slate-400 text-base">$</span>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                min={100}
                max={10000}
                step={50}
                className="bg-transparent text-white text-base font-semibold w-24 focus:outline-none pl-0.5"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center p-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSearch}
              className="w-full sm:w-auto px-8 text-base font-bold"
            >
              <Zap className="h-5 w-5" />
              {mode === 'route' ? 'Build my route' : `Search ${activeMode.label}`}
            </Button>
          </div>
        </div>

        {/* Budget presets + popular cities */}
        <div className="border-t border-white/6 px-4 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          {/* Budget presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-600">Budget:</span>
            {BUDGET_PRESETS.map(preset => (
              <button
                key={preset.value}
                onClick={() => setBudget(preset.value)}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border transition-all',
                  budget === preset.value
                    ? 'border-brand-500/60 bg-brand-500/15 text-brand-300'
                    : 'border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20',
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-4 w-px bg-white/8" />

          {/* Popular starts */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-600">Popular:</span>
            {POPULAR.map(d => (
              <button
                key={d.id}
                onClick={() => setFrom(d.id)}
                className={cn(
                  'text-xs transition-colors',
                  from === d.id ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300',
                )}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-label */}
      <p className="text-center text-xs text-slate-600 mt-3">
        Free · No account required · Results in under 5 seconds
      </p>
    </div>
  )
}
