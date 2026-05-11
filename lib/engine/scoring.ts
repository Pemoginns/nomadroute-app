import { DESTINATIONS } from '@/lib/data/destinations'
import type { TravelStyle } from '@/lib/types'

const STYLE_WEIGHTS: Record<TravelStyle, Record<string, number>> = {
  cheapest: { avgDailyBudgetUsd: -2, backpackerRating: 0.5, coworkingSpaces: 0 },
  backpacker: { avgDailyBudgetUsd: -1, backpackerRating: 2, coworkingSpaces: 0 },
  scenic: { avgDailyBudgetUsd: -0.5, backpackerRating: 1, coworkingSpaces: 0 },
  adventure: { avgDailyBudgetUsd: -0.5, backpackerRating: 1.5, coworkingSpaces: 0 },
  nightlife: { avgDailyBudgetUsd: -0.5, backpackerRating: 1, coworkingSpaces: 0 },
  'digital-nomad': { avgDailyBudgetUsd: -0.3, backpackerRating: 1, coworkingSpaces: 0.02 },
  fastest: { avgDailyBudgetUsd: 0, backpackerRating: 1, coworkingSpaces: 0 },
}

const STYLE_PREFERRED_TAGS: Record<TravelStyle, string[]> = {
  cheapest: [],
  backpacker: ['culture', 'food', 'history', 'nature'],
  scenic: ['nature', 'scenic', 'photography', 'mountains'],
  adventure: ['adventure', 'hiking', 'diving', 'caves'],
  nightlife: ['nightlife', 'party', 'city', 'bars'],
  'digital-nomad': ['digital-nomad', 'coworking', 'coffee', 'fast-wifi'],
  fastest: [],
}

export function scoreDestination(
  destinationId: string,
  style: TravelStyle,
  totalBudget: number,
  remainingDays: number,
): number {
  const dest = DESTINATIONS[destinationId]
  if (!dest) return 0

  const weights = STYLE_WEIGHTS[style]
  let score = 50 // base score

  // Budget fit
  score += weights.avgDailyBudgetUsd * dest.avgDailyBudgetUsd
  if (dest.avgDailyBudgetUsd * remainingDays <= totalBudget * 0.6) score += 10

  // Rating bonus
  score += weights.backpackerRating * dest.backpackerRating

  // Coworking (digital nomad)
  score += weights.coworkingSpaces * dest.coworkingSpaces

  // Tag match bonus
  const preferredTags = STYLE_PREFERRED_TAGS[style]
  const tagMatches = dest.tags.filter(t => preferredTags.includes(t)).length
  score += tagMatches * 5

  // Internet speed for digital nomads
  if (style === 'digital-nomad') {
    const speedScore = { slow: -10, medium: 0, fast: 10, 'very-fast': 20 }
    score += speedScore[dest.internetSpeed]
  }

  // Small random variance to add variety
  score += Math.random() * 5

  return score
}
