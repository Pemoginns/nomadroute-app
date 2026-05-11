'use client'

import { create } from 'zustand'
import type { RoutePlannerInput, GeneratedRoute, TravelStyle, TransportType } from '@/lib/types'

interface PlannerState {
  input: RoutePlannerInput
  generatedRoute: GeneratedRoute | null
  isGenerating: boolean
  error: string | null

  setInput: (updates: Partial<RoutePlannerInput>) => void
  setGeneratedRoute: (route: GeneratedRoute | null) => void
  setGenerating: (value: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const DEFAULT_INPUT: RoutePlannerInput = {
  startDestinationId: 'bangkok',
  endDestinationId: undefined,
  durationDays: 14,
  budget: 600,
  travelStyle: 'backpacker',
  transportPreferences: ['bus', 'train', 'ferry'],
  travelers: 1,
}

export const usePlannerStore = create<PlannerState>((set) => ({
  input: DEFAULT_INPUT,
  generatedRoute: null,
  isGenerating: false,
  error: null,

  setInput: (updates) =>
    set((state) => ({ input: { ...state.input, ...updates } })),

  setGeneratedRoute: (route) => set({ generatedRoute: route }),
  setGenerating: (value) => set({ isGenerating: value }),
  setError: (error) => set({ error }),
  reset: () => set({ input: DEFAULT_INPUT, generatedRoute: null, error: null }),
}))
