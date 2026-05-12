'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronDown, Bed, Star, Clock, DollarSign, ExternalLink } from 'lucide-react'
import { TransportBadge, Badge } from '@/components/ui/Badge'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { formatDuration } from '@/lib/utils/formatting'
import { buildHostelAffiliateUrl, trackAffiliateClick } from '@/lib/utils/affiliate'
import type { GeneratedRoute, RouteStop, TransportLeg } from '@/lib/types'

export function RouteTimeline({ route }: { route: GeneratedRoute }) {
  return (
    <div className="space-y-0">
      {route.stops.map((stop, index) => (
        <div key={stop.id}>
          <StopCard stop={stop} index={index} />
          {index < route.transportLegs.length && (
            <TransportLegCard leg={route.transportLegs[index]} />
          )}
        </div>
      ))}
    </div>
  )
}

function StopCard({ stop, index }: { stop: RouteStop; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)

  const hostelUrl = stop.hostelSuggestion?.slug
    ? buildHostelAffiliateUrl(stop.destination.name, stop.hostelSuggestion.slug)
    : buildHostelAffiliateUrl(stop.destination.name)

  return (
    <FadeIn delay={index * 80} direction="right" className="relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 flex flex-col items-center">
        <div className={cn(
          'h-4 w-4 rounded-full border-2 transition-colors',
          stop.mustSee
            ? 'border-brand-500 bg-brand-500'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-950',
        )} />
      </div>

      <div className={cn(
        'mb-1 overflow-hidden rounded-2xl border transition-all duration-200',
        expanded
          ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm'
          : 'border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600',
      )}>
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-start gap-3 p-4 text-left"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Day {stop.arrivalDay}</span>
              {stop.mustSee && (
                <Badge variant="brand" size="sm">
                  <Star className="h-2.5 w-2.5 mr-0.5" />Must see
                </Badge>
              )}
              {stop.isHidden && <Badge variant="success" size="sm">💎 Hidden gem</Badge>}
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mt-1">
              {stop.destination.name}
              <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 font-normal">{stop.destination.country}</span>
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Bed className="h-3 w-3" />
                {stop.nights} nights
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <DollarSign className="h-3 w-3" />
                ~${stop.dailyCostEstimate}/day
              </span>
            </div>
          </div>
          <ChevronDown className={cn(
            'h-5 w-5 text-slate-400 dark:text-slate-500 flex-shrink-0 transition-transform mt-1',
            expanded && 'rotate-180',
          )} />
        </button>

        {/* Expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {stop.destination.description}
                </p>

                {/* Activities */}
                {stop.activities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Things to do</h4>
                    <ul className="space-y-1.5">
                      {stop.activities.map((act) => (
                        <li key={act.id} className="flex items-center gap-2 text-sm">
                          <span className={cn(
                            'h-1.5 w-1.5 rounded-full flex-shrink-0',
                            act.type === 'free' ? 'bg-emerald-500' : 'bg-brand-500',
                          )} />
                          <span className="text-slate-700 dark:text-slate-300 flex-1">{act.name}</span>
                          <span className={cn(
                            'text-xs font-semibold',
                            act.type === 'free' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400',
                          )}>
                            {act.type === 'free' ? 'Free' : `$${act.costUsd}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hostel */}
                {stop.hostelSuggestion && (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">Suggested hostel</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{stop.hostelSuggestion.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="text-amber-500">★ {stop.hostelSuggestion.rating}</span>
                          <span>from ${stop.hostelSuggestion.dormPrice}/night</span>
                        </div>
                      </div>
                      <Button variant="outline" size="xs" onClick={() => {
                        trackAffiliateClick('hostelworld', hostelUrl)
                        window.open(hostelUrl, '_blank')
                      }}>
                        Book <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Stop total */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>Estimated total for this stop</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    ${stop.dailyCostEstimate * stop.nights + stop.activities.reduce((s, a) => s + a.costUsd, 0)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  )
}

function TransportLegCard({ leg }: { leg: TransportLeg }) {
  return (
    <div className="relative pl-8 py-2">
      <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900/50">
        <TransportBadge type={leg.type} />
        <span className="text-xs text-slate-500 dark:text-slate-400 flex-1 truncate">
          {leg.fromName} → {leg.toName}
        </span>
        <div className="flex items-center gap-3 text-xs flex-shrink-0">
          <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            {formatDuration(leg.durationHours)}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">${leg.priceEstimate}</span>
        </div>
        {leg.affiliateUrl && (
          <Button variant="ghost" size="xs" onClick={() => {
            trackAffiliateClick('12go', leg.affiliateUrl!)
            window.open(leg.affiliateUrl, '_blank')
          }}>
            <ExternalLink className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
