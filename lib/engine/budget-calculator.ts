import type { RouteStop, TransportLeg, BudgetBreakdown } from '@/lib/types'

const FOOD_MULTIPLIER: Record<string, number> = {
  cheapest: 0.6,
  backpacker: 0.8,
  scenic: 1.0,
  adventure: 0.9,
  nightlife: 1.2,
  'digital-nomad': 1.1,
  fastest: 1.0,
}

export function calculateBudget(
  stops: RouteStop[],
  legs: TransportLeg[],
  travelers: number = 1,
): BudgetBreakdown {
  let accommodation = 0
  let food = 0
  let activities = 0
  let transport = 0

  for (const stop of stops) {
    const hostel = stop.hostelSuggestion
    const nightlyRate = hostel?.dormPrice ?? stop.destination.avgDailyBudgetUsd * 0.35
    accommodation += nightlyRate * stop.nights

    const foodPerDay = stop.destination.avgDailyBudgetUsd * 0.45
    food += foodPerDay * stop.nights

    const activityCost = stop.activities.reduce((sum, a) => sum + a.costUsd, 0)
    activities += activityCost
  }

  for (const leg of legs) {
    transport += leg.priceEstimate
  }

  const subtotal = accommodation + food + activities + transport
  const misc = Math.round(subtotal * 0.08) // 8% buffer for misc costs
  const total = Math.round(subtotal + misc)

  return {
    accommodation: Math.round(accommodation),
    transport: Math.round(transport),
    food: Math.round(food),
    activities: Math.round(activities),
    misc,
    total,
    perDay: Math.round(total / Math.max(stops.reduce((d, s) => d + s.nights, 0), 1)),
    currency: 'USD',
  }
}

export function formatBudget(amount: number, currency: 'USD' | 'EUR' | 'GBP' = 'USD'): string {
  const symbols = { USD: '$', EUR: '€', GBP: '£' }
  return `${symbols[currency]}${amount.toLocaleString()}`
}

export function getBudgetTier(perDay: number): { label: string; color: string; emoji: string } {
  if (perDay < 25) return { label: 'Ultra Budget', color: 'text-green-400', emoji: '💚' }
  if (perDay < 40) return { label: 'Budget', color: 'text-emerald-400', emoji: '✅' }
  if (perDay < 70) return { label: 'Mid-range', color: 'text-yellow-400', emoji: '⭐' }
  if (perDay < 120) return { label: 'Comfort', color: 'text-orange-400', emoji: '🌟' }
  return { label: 'Luxury', color: 'text-purple-400', emoji: '💫' }
}
