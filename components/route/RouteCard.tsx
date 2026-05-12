'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'
import type { FeaturedRoute } from '@/lib/types'

interface RouteCardProps {
  route: FeaturedRoute
  index?: number
}

export function RouteCard({ route, index = 0 }: RouteCardProps) {
  return (
    <FadeIn delay={index * 50} direction="up" className="h-full">
      <Link href={`/routes/${route.slug}`} className="group block h-full">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1.5 hover:shadow-lg">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden flex-shrink-0">
            <Image
              src={route.coverImage}
              alt={route.title}
              fill
              priority={index < 2}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
              {route.isTrending && (
                <span className="rounded-full bg-orange-500/95 backdrop-blur-sm px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">🔥 Hot</span>
              )}
              {route.isNew && (
                <span className="rounded-full bg-brand-500/95 backdrop-blur-sm px-2.5 py-0.5 text-xs font-bold text-black shadow-lg">✨ New</span>
              )}
              {route.isCheapest && (
                <span className="rounded-full bg-emerald-500/95 backdrop-blur-sm px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">💰 Budget</span>
              )}
            </div>

            {/* Save count */}
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1">
              <Heart className="h-3 w-3 text-rose-400" />
              <span className="text-xs text-white font-medium">{(route.saves / 1000).toFixed(1)}k</span>
            </div>

            {/* Budget overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/60 leading-none mb-1">{route.durationDays} days</p>
                  <p className="text-2xl font-black text-white leading-none">from ${route.budgetFrom}</p>
                </div>
                <div className="text-3xl leading-none">{route.emoji}</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-0.5">
              {route.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-1 flex-1 mb-3">{route.subtitle}</p>
            <div className="flex flex-wrap gap-1">
              {route.countries.slice(0, 3).map((c) => (
                <span key={c} className="text-xs rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-0.5 text-slate-500 dark:text-gray-300">
                  {c}
                </span>
              ))}
              {route.countries.length > 3 && (
                <span className="text-xs text-slate-400 dark:text-gray-500 self-center">+{route.countries.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  )
}
