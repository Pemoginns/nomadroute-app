'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Clock, Wallet, TrendingUp, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
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
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-bg-elevated transition-all duration-300 hover:border-white/15 hover:shadow-elevated hover:-translate-y-1 flex flex-col h-full">
          {/* Cover image */}
          <div className="relative aspect-square overflow-hidden flex-shrink-0">
            <Image
              src={route.coverImage}
              alt={route.title}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {route.isTrending && (
                <span className="flex items-center gap-1 rounded-full bg-orange-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </span>
              )}
              {route.isNew && (
                <span className="flex items-center gap-1 rounded-full bg-brand-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  New
                </span>
              )}
              {route.isCheapest && (
                <span className="flex items-center gap-1 rounded-full bg-green-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  💰 Budget pick
                </span>
              )}
            </div>

            {/* Emoji */}
            <div className="absolute bottom-3 right-3 text-3xl">{route.emoji}</div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 flex flex-col flex-1">
            <div>
              <h3 className="font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                {route.title}
              </h3>
              <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{route.subtitle}</p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {route.durationDays} days
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Wallet className="h-3 w-3" />
                from ${route.budgetFrom}
              </span>
              <span className="flex items-center gap-1 ml-auto">
                <Heart className="h-3 w-3" />
                {route.saves.toLocaleString()}
              </span>
            </div>

            {/* Countries */}
            <div className="flex flex-wrap gap-1.5">
              {route.countries.slice(0, 3).map((c) => (
                <Badge key={c} variant="default" size="sm">{c}</Badge>
              ))}
              {route.countries.length > 3 && (
                <Badge variant="default" size="sm">+{route.countries.length - 3}</Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  )
}
