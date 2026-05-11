/**
 * NomadRoute Route Generation Engine
 * Algorithmic route planning — no AI required for basic generation.
 * AI is reserved for itinerary summaries and premium features.
 */

import { DESTINATIONS, DESTINATION_LIST } from '@/lib/data/destinations'
import { TRANSPORT_ROUTES, getCheapestTransport, getFastestTransport } from '@/lib/data/transport'
import { getBestHostelForDestination } from '@/lib/data/hostels'
import { calculateBudget } from './budget-calculator'
import { scoreDestination } from './scoring'
import type {
  RoutePlannerInput,
  GeneratedRoute,
  RouteStop,
  TransportLeg,
  Destination,
} from '@/lib/types'

// ─── Backpacker Corridors ─────────────────────────────────────────────────────
// Pre-defined popular backpacker route corridors based on real traveler behavior

const ROUTE_CORRIDORS: Record<string, string[][]> = {
  'classic-sea': [
    ['bangkok', 'chiang-mai', 'luang-prabang', 'vang-vieng', 'siem-reap', 'phnom-penh', 'ho-chi-minh', 'hoi-an', 'hanoi'],
    ['hanoi', 'halong-bay', 'hoi-an', 'ho-chi-minh', 'phnom-penh', 'siem-reap', 'bangkok', 'chiang-mai'],
  ],
  'vietnam-classic': [
    ['hanoi', 'halong-bay', 'hoi-an', 'ho-chi-minh'],
    ['ho-chi-minh', 'hoi-an', 'hue', 'hanoi', 'halong-bay'],
  ],
  'thailand-circuit': [
    ['bangkok', 'chiang-mai', 'pai', 'chiang-mai', 'koh-phangan', 'bangkok'],
    ['bangkok', 'koh-phangan', 'chiang-mai', 'pai'],
  ],
  'indochina-loop': [
    ['bangkok', 'siem-reap', 'phnom-penh', 'ho-chi-minh', 'hoi-an', 'hanoi', 'luang-prabang', 'vang-vieng', 'bangkok'],
  ],
  'bali-java': [
    ['bali', 'yogyakarta', 'bali'],
    ['singapore', 'bali', 'yogyakarta'],
  ],
  'malaysia-indonesia': [
    ['kuala-lumpur', 'penang', 'bali'],
    ['singapore', 'kuala-lumpur', 'penang', 'bali'],
  ],
  'digital-nomad': [
    ['bali', 'chiang-mai', 'penang', 'kuala-lumpur'],
    ['bangkok', 'chiang-mai', 'bali', 'singapore'],
  ],
}

// ─── Night Options per destination ────────────────────────────────────────────
const RECOMMENDED_NIGHTS: Record<string, { min: number; max: number; sweet: number }> = {
  'hanoi': { min: 2, max: 5, sweet: 3 },
  'halong-bay': { min: 1, max: 3, sweet: 2 },
  'hoi-an': { min: 2, max: 5, sweet: 3 },
  'ho-chi-minh': { min: 2, max: 4, sweet: 2 },
  'bangkok': { min: 2, max: 5, sweet: 3 },
  'chiang-mai': { min: 3, max: 7, sweet: 4 },
  'pai': { min: 2, max: 5, sweet: 3 },
  'koh-phangan': { min: 3, max: 7, sweet: 4 },
  'siem-reap': { min: 2, max: 4, sweet: 3 },
  'phnom-penh': { min: 1, max: 3, sweet: 2 },
  'luang-prabang': { min: 2, max: 5, sweet: 3 },
  'vang-vieng': { min: 2, max: 4, sweet: 3 },
  'bali': { min: 4, max: 14, sweet: 7 },
  'yogyakarta': { min: 2, max: 4, sweet: 2 },
  'kuala-lumpur': { min: 2, max: 4, sweet: 2 },
  'penang': { min: 2, max: 4, sweet: 3 },
  'singapore': { min: 1, max: 3, sweet: 2 },
  'bagan': { min: 2, max: 4, sweet: 3 },
}

// ─── Style Filters ────────────────────────────────────────────────────────────

function getDestinationTagsForStyle(style: string): string[] {
  const styleTagMap: Record<string, string[]> = {
    cheapest: ['budget'],
    backpacker: ['backpacker', 'culture', 'food', 'nature'],
    scenic: ['nature', 'scenic', 'photography'],
    adventure: ['adventure', 'nature', 'hiking'],
    nightlife: ['nightlife', 'party', 'city'],
    'digital-nomad': ['digital-nomad', 'coworking', 'city', 'food'],
    fastest: [],
  }
  return styleTagMap[style] || []
}

function selectCorridor(input: RoutePlannerInput): string[] {
  const { startDestinationId, endDestinationId, travelStyle, durationDays } = input

  // Try to find a corridor that starts near the input
  for (const corridorKey of Object.keys(ROUTE_CORRIDORS)) {
    const corridors = ROUTE_CORRIDORS[corridorKey]
    for (const corridor of corridors) {
      if (corridor[0] === startDestinationId) {
        // Found a matching start - optionally trim to fit duration
        return trimCorridorToDuration(corridor, durationDays)
      }
    }
  }

  // Fallback: build a corridor from nearby destinations
  return buildDynamicCorridor(input)
}

function trimCorridorToDuration(corridor: string[], durationDays: number): string[] {
  let totalDays = 0
  const result: string[] = []

  for (const destId of corridor) {
    const nights = RECOMMENDED_NIGHTS[destId]?.sweet ?? 2
    if (totalDays + nights > durationDays) break
    result.push(destId)
    totalDays += nights
  }

  return result.length >= 2 ? result : corridor.slice(0, Math.min(3, corridor.length))
}

function buildDynamicCorridor(input: RoutePlannerInput): string[] {
  const { startDestinationId, durationDays, travelStyle, budget } = input
  const startDest = DESTINATIONS[startDestinationId]
  if (!startDest) return [startDestinationId]

  const corridor: string[] = [startDestinationId]
  let remainingDays = durationDays - (RECOMMENDED_NIGHTS[startDestinationId]?.sweet ?? 2)
  let currentId = startDestinationId

  const visited = new Set<string>([startDestinationId])

  while (remainingDays > 3) {
    // Find destinations reachable from current
    const reachable = TRANSPORT_ROUTES
      .filter(t => t.fromId === currentId && !visited.has(t.toId))
      .map(t => t.toId)

    if (reachable.length === 0) break

    // Score destinations
    const scored = reachable
      .map(id => ({ id, score: scoreDestination(id, travelStyle, budget, remainingDays) }))
      .sort((a, b) => b.score - a.score)

    const nextId = scored[0]?.id
    if (!nextId || !DESTINATIONS[nextId]) break

    corridor.push(nextId)
    visited.add(nextId)
    currentId = nextId
    remainingDays -= RECOMMENDED_NIGHTS[nextId]?.sweet ?? 2
  }

  return corridor
}

// ─── Activity Generation ──────────────────────────────────────────────────────

function generateActivities(destinationId: string, style: string, nights: number) {
  const dest = DESTINATIONS[destinationId]
  if (!dest) return []

  return dest.highlights.slice(0, Math.min(nights + 1, 4)).map((h, i) => ({
    id: `${destinationId}-act-${i}`,
    name: h,
    type: (i % 3 === 0 ? 'free' : 'paid') as 'free' | 'paid' | 'optional',
    costUsd: i % 3 === 0 ? 0 : Math.floor(Math.random() * 20 + 5),
    durationHours: 3,
    description: `Explore ${h} in ${dest.name}`,
    tags: dest.tags.slice(0, 2),
  }))
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export async function generateRoute(input: RoutePlannerInput): Promise<GeneratedRoute> {
  const { startDestinationId, travelStyle, durationDays, budget, transportPreferences } = input

  // 1. Select corridor
  const corridor = selectCorridor(input)

  // 2. Build stops with nights distribution
  const stops: RouteStop[] = []
  let currentDay = 1

  for (let i = 0; i < corridor.length; i++) {
    const destId = corridor[i]
    const dest = DESTINATIONS[destId]
    if (!dest) continue

    const nightsConfig = RECOMMENDED_NIGHTS[destId] ?? { min: 2, max: 4, sweet: 2 }
    const remaining = durationDays - currentDay
    const nights = Math.min(nightsConfig.sweet, Math.max(nightsConfig.min, Math.floor(remaining / (corridor.length - i))))

    const hostel = getBestHostelForDestination(destId)
    const activities = generateActivities(destId, travelStyle, nights)
    const dailyCost = dest.avgDailyBudgetUsd

    stops.push({
      id: `stop-${i}`,
      destinationId: destId,
      destination: dest,
      arrivalDay: currentDay,
      departureDayoffset: nights,
      nights,
      hostelSuggestion: hostel,
      activities,
      dailyCostEstimate: dailyCost,
      isHidden: dest.backpackerRating > 9.2 && Math.random() > 0.7,
      mustSee: dest.backpackerRating >= 9.5,
    })

    currentDay += nights
    if (currentDay >= durationDays) break
  }

  // 3. Build transport legs
  const legs: TransportLeg[] = []
  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i]
    const to = stops[i + 1]

    let transport =
      travelStyle === 'cheapest'
        ? getCheapestTransport(from.destinationId, to.destinationId)
        : travelStyle === 'fastest'
        ? getFastestTransport(from.destinationId, to.destinationId)
        : getCheapestTransport(from.destinationId, to.destinationId)

    if (!transport) {
      // Fallback transport leg
      transport = {
        id: `fallback-${from.destinationId}-${to.destinationId}`,
        fromId: from.destinationId,
        fromName: from.destination.name,
        toId: to.destinationId,
        toName: to.destination.name,
        type: 'bus',
        durationHours: 6,
        priceMin: 15,
        priceMax: 25,
        frequency: 'daily',
        isSleeper: false,
        isPopular: false,
        distance: 300,
      }
    }

    legs.push({
      id: `leg-${i}`,
      fromStopId: from.id,
      toStopId: to.id,
      fromName: from.destination.name,
      toName: to.destination.name,
      type: transport.type,
      durationHours: transport.durationHours,
      priceEstimate: transport.priceMin,
      isSleeper: transport.isSleeper,
      provider: transport.provider,
      affiliateUrl: transport.affiliateUrl,
      notes: transport.notes,
      distance: transport.distance,
    })
  }

  // 4. Calculate budget
  const budgetBreakdown = calculateBudget(stops, legs, input.travelers)

  // 5. Build route metadata
  const countries = [...new Set(stops.map(s => s.destination.country))]
  const totalDistance = legs.reduce((acc, l) => acc + (l.distance ?? 0), 0)

  const styleEmojis: Record<string, string> = {
    cheapest: '💰',
    backpacker: '🎒',
    scenic: '🏔️',
    adventure: '⚡',
    nightlife: '🌙',
    'digital-nomad': '💻',
    fastest: '⚡',
  }

  const startDest = DESTINATIONS[startDestinationId]
  const endDest = stops[stops.length - 1]?.destination

  const title = generateRouteTitle(stops, travelStyle, durationDays, budgetBreakdown.total)

  return {
    id: `route-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    shareSlug: `${travelStyle}-${durationDays}d-${Date.now().toString(36)}`,
    title,
    description: generateRouteDescription(stops, travelStyle, budgetBreakdown.total),
    emoji: styleEmojis[travelStyle] ?? '🌏',
    startLocation: startDest?.name ?? 'Unknown',
    endLocation: endDest?.name ?? 'Unknown',
    durationDays,
    budgetTotal: budgetBreakdown.total,
    budgetBreakdown,
    travelStyle,
    countries,
    stops,
    transportLegs: legs,
    totalDistance,
    viewCount: 0,
    shareCount: 0,
    isPublic: false,
    createdAt: new Date().toISOString(),
    tags: generateTags(stops, travelStyle),
    highlights: stops.flatMap(s => s.destination.highlights.slice(0, 2)),
  }
}

function generateRouteTitle(stops: RouteStop[], style: string, days: number, budget: number): string {
  const countries = [...new Set(stops.map(s => s.destination.country))]
  const city1 = stops[0]?.destination.name
  const cityLast = stops[stops.length - 1]?.destination.name

  const styleLabels: Record<string, string> = {
    cheapest: `${days} Days in ${countries.join(' & ')} for $${budget}`,
    backpacker: `${days}-Day Backpacker Route`,
    scenic: `${days} Days of Scenic ${countries.join(' & ')}`,
    adventure: `${days}-Day ${countries[0]} Adventure`,
    nightlife: `${days} Nights in ${countries.join(' & ')}`,
    'digital-nomad': `${days}-Day Digital Nomad Route`,
    fastest: `${days} Days, ${stops.length} Destinations`,
  }

  return styleLabels[style] ?? `${city1} → ${cityLast} (${days} days)`
}

function generateRouteDescription(stops: RouteStop[], style: string, budget: number): string {
  const cities = stops.map(s => s.destination.name).join(' → ')
  const countries = [...new Set(stops.map(s => s.destination.country))]

  return `Explore ${countries.join(', ')} along the ${cities} corridor. Budget: ~$${budget} total.`
}

function generateTags(stops: RouteStop[], style: string): string[] {
  const tags = new Set<string>()
  tags.add(style)
  stops.forEach(s => s.destination.tags.forEach(t => tags.add(t)))
  return [...tags].slice(0, 8)
}
