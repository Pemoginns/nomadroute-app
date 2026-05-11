import type { TransportOption } from '@/lib/types'

export const TRANSPORT_ROUTES: TransportOption[] = [
  // ─── Vietnam internal ─────────────────────────────────────────────────────
  {
    id: 'hanoi-hoi-an-train',
    fromId: 'hanoi', fromName: 'Hanoi',
    toId: 'hoi-an', toName: 'Hoi An',
    type: 'train', provider: 'Vietnam Railways',
    durationHours: 16, priceMin: 18, priceMax: 45,
    frequency: 'daily', isSleeper: true, isPopular: true,
    departureTimes: ['06:00', '21:00'],
    affiliateUrl: 'https://12go.asia/en',
    notes: 'Sleeper berths available. One of Asia\'s great rail journeys.',
    distance: 860,
  },
  {
    id: 'hanoi-halong-bus',
    fromId: 'hanoi', fromName: 'Hanoi',
    toId: 'halong-bay', toName: 'Ha Long Bay',
    type: 'bus', provider: 'Multiple operators',
    durationHours: 3.5, priceMin: 8, priceMax: 15,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    distance: 165,
  },
  {
    id: 'hoi-an-hcmc-flight',
    fromId: 'hoi-an', fromName: 'Hoi An',
    toId: 'ho-chi-minh', toName: 'Ho Chi Minh City',
    type: 'flight', provider: 'VietJet / Bamboo',
    durationHours: 1.5, priceMin: 20, priceMax: 85,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    notes: 'Fly from Da Nang (45min transfer from Hoi An)',
    distance: 760,
  },
  {
    id: 'hoi-an-hcmc-train',
    fromId: 'hoi-an', fromName: 'Hoi An',
    toId: 'ho-chi-minh', toName: 'Ho Chi Minh City',
    type: 'train', provider: 'Vietnam Railways',
    durationHours: 14, priceMin: 20, priceMax: 50,
    frequency: 'daily', isSleeper: true, isPopular: false,
    affiliateUrl: 'https://12go.asia/en',
    distance: 1000,
  },
  // ─── Vietnam → Cambodia ───────────────────────────────────────────────────
  {
    id: 'hcmc-phnom-penh-bus',
    fromId: 'ho-chi-minh', fromName: 'Ho Chi Minh City',
    toId: 'phnom-penh', toName: 'Phnom Penh',
    type: 'bus', provider: 'Mekong Express / Giant Ibis',
    durationHours: 6, priceMin: 12, priceMax: 25,
    frequency: 'daily', isSleeper: false, isPopular: true,
    departureTimes: ['07:00', '09:00', '13:00'],
    affiliateUrl: 'https://12go.asia/en',
    distance: 230,
  },
  // ─── Cambodia internal ────────────────────────────────────────────────────
  {
    id: 'phnom-penh-siem-reap-bus',
    fromId: 'phnom-penh', fromName: 'Phnom Penh',
    toId: 'siem-reap', toName: 'Siem Reap',
    type: 'bus', provider: 'Giant Ibis / Mekong Express',
    durationHours: 6, priceMin: 8, priceMax: 18,
    frequency: 'daily', isSleeper: false, isPopular: true,
    departureTimes: ['07:00', '08:00', '12:30'],
    affiliateUrl: 'https://12go.asia/en',
    distance: 315,
  },
  // ─── Cambodia → Thailand ──────────────────────────────────────────────────
  {
    id: 'siem-reap-bangkok-bus',
    fromId: 'siem-reap', fromName: 'Siem Reap',
    toId: 'bangkok', toName: 'Bangkok',
    type: 'bus', provider: 'Nattakan / Capitol',
    durationHours: 9, priceMin: 15, priceMax: 28,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    distance: 390,
  },
  {
    id: 'siem-reap-bangkok-flight',
    fromId: 'siem-reap', fromName: 'Siem Reap',
    toId: 'bangkok', toName: 'Bangkok',
    type: 'flight', provider: 'AirAsia / Bangkok Air',
    durationHours: 1.2, priceMin: 35, priceMax: 120,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 390,
  },
  // ─── Thailand internal ────────────────────────────────────────────────────
  {
    id: 'bangkok-chiang-mai-train',
    fromId: 'bangkok', fromName: 'Bangkok',
    toId: 'chiang-mai', toName: 'Chiang Mai',
    type: 'train', provider: 'State Railway of Thailand',
    durationHours: 12, priceMin: 12, priceMax: 35,
    frequency: 'daily', isSleeper: true, isPopular: true,
    departureTimes: ['18:00', '19:00'],
    affiliateUrl: 'https://12go.asia/en',
    notes: 'Overnight sleeper — one of Asia\'s classic rail journeys.',
    distance: 750,
  },
  {
    id: 'bangkok-chiang-mai-flight',
    fromId: 'bangkok', fromName: 'Bangkok',
    toId: 'chiang-mai', toName: 'Chiang Mai',
    type: 'flight', provider: 'AirAsia / Thai Lion',
    durationHours: 1.2, priceMin: 15, priceMax: 60,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 700,
  },
  {
    id: 'chiang-mai-pai-bus',
    fromId: 'chiang-mai', fromName: 'Chiang Mai',
    toId: 'pai', toName: 'Pai',
    type: 'bus', provider: 'Aya Service / Prempracha',
    durationHours: 3.5, priceMin: 4, priceMax: 8,
    frequency: 'daily', isSleeper: false, isPopular: true,
    notes: '762 mountain curves — get sea sickness tablets!',
    affiliateUrl: 'https://12go.asia/en',
    distance: 130,
  },
  {
    id: 'bangkok-koh-phangan-ferry',
    fromId: 'bangkok', fromName: 'Bangkok',
    toId: 'koh-phangan', toName: 'Koh Phangan',
    type: 'ferry', provider: 'Lomprayah / Raja Ferry',
    durationHours: 8.5, priceMin: 22, priceMax: 45,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    notes: 'Bus + ferry combo ticket from Bangkok.',
    distance: 600,
  },
  // ─── Thailand → Laos ──────────────────────────────────────────────────────
  {
    id: 'chiang-mai-luang-prabang-flight',
    fromId: 'chiang-mai', fromName: 'Chiang Mai',
    toId: 'luang-prabang', toName: 'Luang Prabang',
    type: 'flight', provider: 'Lao Airlines',
    durationHours: 1.5, priceMin: 50, priceMax: 130,
    frequency: 'twice-daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 360,
  },
  {
    id: 'chiang-mai-luang-prabang-slowboat',
    fromId: 'chiang-mai', fromName: 'Chiang Mai',
    toId: 'luang-prabang', toName: 'Luang Prabang',
    type: 'ferry', provider: 'Slow Boat via Huay Xai',
    durationHours: 48, priceMin: 45, priceMax: 70,
    frequency: 'daily', isSleeper: false, isPopular: true,
    notes: '2-day Mekong slow boat — the most scenic journey in SEA. Includes bus to border.',
    affiliateUrl: 'https://12go.asia/en',
    distance: 900,
  },
  // ─── Laos internal ────────────────────────────────────────────────────────
  {
    id: 'luang-prabang-vang-vieng-bus',
    fromId: 'luang-prabang', fromName: 'Luang Prabang',
    toId: 'vang-vieng', toName: 'Vang Vieng',
    type: 'bus', provider: 'VIP Bus',
    durationHours: 4.5, priceMin: 14, priceMax: 22,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    distance: 220,
  },
  {
    id: 'luang-prabang-vang-vieng-train',
    fromId: 'luang-prabang', fromName: 'Luang Prabang',
    toId: 'vang-vieng', toName: 'Vang Vieng',
    type: 'train', provider: 'Laos-China Railway',
    durationHours: 2, priceMin: 24, priceMax: 30,
    frequency: 'daily', isSleeper: false, isPopular: true,
    notes: 'New high-speed railway — stunning tunnel and viaduct scenery.',
    affiliateUrl: 'https://12go.asia/en',
    distance: 220,
  },
  // ─── Malaysia internal ────────────────────────────────────────────────────
  {
    id: 'kuala-lumpur-penang-bus',
    fromId: 'kuala-lumpur', fromName: 'Kuala Lumpur',
    toId: 'penang', toName: 'Penang',
    type: 'bus', provider: 'Transnasional / Plusliner',
    durationHours: 4.5, priceMin: 8, priceMax: 18,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    distance: 370,
  },
  // ─── Malaysia → Indonesia ─────────────────────────────────────────────────
  {
    id: 'kuala-lumpur-bali-flight',
    fromId: 'kuala-lumpur', fromName: 'Kuala Lumpur',
    toId: 'bali', toName: 'Bali',
    type: 'flight', provider: 'AirAsia / Malindo',
    durationHours: 2.5, priceMin: 25, priceMax: 90,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 1800,
  },
  // ─── Indonesia internal ───────────────────────────────────────────────────
  {
    id: 'bali-yogyakarta-flight',
    fromId: 'bali', fromName: 'Bali',
    toId: 'yogyakarta', toName: 'Yogyakarta',
    type: 'flight', provider: 'Citilink / Lion Air',
    durationHours: 1.2, priceMin: 18, priceMax: 60,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 700,
  },
  // ─── Singapore hub ────────────────────────────────────────────────────────
  {
    id: 'singapore-kuala-lumpur-bus',
    fromId: 'singapore', fromName: 'Singapore',
    toId: 'kuala-lumpur', toName: 'Kuala Lumpur',
    type: 'bus', provider: 'Aeroline / Transtar',
    durationHours: 5, priceMin: 18, priceMax: 40,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://12go.asia/en',
    distance: 350,
  },
  {
    id: 'singapore-bali-flight',
    fromId: 'singapore', fromName: 'Singapore',
    toId: 'bali', toName: 'Bali',
    type: 'flight', provider: 'Scoot / SilkAir',
    durationHours: 2.5, priceMin: 30, priceMax: 110,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 1550,
  },
  {
    id: 'singapore-bangkok-flight',
    fromId: 'singapore', fromName: 'Singapore',
    toId: 'bangkok', toName: 'Bangkok',
    type: 'flight', provider: 'Scoot / AirAsia',
    durationHours: 2.5, priceMin: 28, priceMax: 95,
    frequency: 'daily', isSleeper: false, isPopular: true,
    affiliateUrl: 'https://www.kiwi.com',
    distance: 1450,
  },
]

export function getTransportBetween(fromId: string, toId: string): TransportOption[] {
  return TRANSPORT_ROUTES.filter(
    t => (t.fromId === fromId && t.toId === toId) ||
         (t.fromId === toId && t.toId === fromId)
  )
}

export function getCheapestTransport(fromId: string, toId: string): TransportOption | undefined {
  const options = getTransportBetween(fromId, toId)
  return options.sort((a, b) => a.priceMin - b.priceMin)[0]
}

export function getFastestTransport(fromId: string, toId: string): TransportOption | undefined {
  const options = getTransportBetween(fromId, toId)
  return options.sort((a, b) => a.durationHours - b.durationHours)[0]
}

export const TRANSPORT_TYPE_LABELS: Record<string, string> = {
  bus: 'Bus',
  train: 'Train',
  ferry: 'Ferry / Boat',
  flight: 'Flight',
  van: 'Minivan',
  'tuk-tuk': 'Tuk-Tuk',
  walk: 'Walk',
}

export const TRANSPORT_TYPE_COLORS: Record<string, string> = {
  bus: '#3b82f6',
  train: '#8b5cf6',
  ferry: '#06b6d4',
  flight: '#f59e0b',
  van: '#f97316',
  'tuk-tuk': '#ec4899',
  walk: '#10b981',
}
