// ─── Core Domain Types ────────────────────────────────────────────────────────

export type TransportType = 'bus' | 'train' | 'ferry' | 'flight' | 'van' | 'tuk-tuk' | 'walk'

export type TravelStyle =
  | 'cheapest'
  | 'backpacker'
  | 'scenic'
  | 'adventure'
  | 'nightlife'
  | 'digital-nomad'
  | 'fastest'

export type Region = 'sea' | 'east-asia' | 'south-asia'

// ─── Destination ──────────────────────────────────────────────────────────────

export interface Destination {
  id: string
  slug: string
  name: string
  country: string
  countryCode: string
  region: string
  lat: number
  lng: number
  timezone: string
  currency: string
  currencySymbol: string
  description: string
  heroImage: string
  tags: string[]
  avgDailyBudgetUsd: number // full dollars
  visaInfo?: VisaInfo
  highlights: string[]
  bestMonths: number[]
  internetSpeed: 'slow' | 'medium' | 'fast' | 'very-fast'
  coworkingSpaces: number
  backpackerRating: number // 1-10
}

export interface VisaInfo {
  freeFor: string[]
  onArrivalFor: string[]
  maxDays: number
  notes?: string
}

// ─── Hostel ───────────────────────────────────────────────────────────────────

export interface Hostel {
  id: string
  name: string
  slug: string
  destinationId: string
  destinationName: string
  country: string
  lat: number
  lng: number
  address: string
  description: string
  heroImage: string
  images: string[]
  rating: number
  reviewCount: number
  pricePerNight: number // USD
  dormPrice: number
  privatePrice?: number
  amenities: string[]
  tags: string[]
  affiliateUrl: string
  provider: 'hostelworld' | 'booking'
  isSponsored?: boolean
  vibes: string[]
  nearbyAttractions: string[]
}

// ─── Transport ────────────────────────────────────────────────────────────────

export interface TransportOption {
  id: string
  fromId: string
  fromName: string
  toId: string
  toName: string
  type: TransportType
  provider?: string
  durationHours: number
  priceMin: number // USD
  priceMax: number
  frequency: string
  isSleeper: boolean
  isPopular: boolean
  departureTimes?: string[]
  affiliateUrl?: string
  notes?: string
  distance?: number // km
}

// ─── Route Planning ───────────────────────────────────────────────────────────

export interface RoutePlannerInput {
  startDestinationId: string
  endDestinationId?: string
  startDate?: string
  durationDays: number
  budget: number // USD total
  travelStyle: TravelStyle
  transportPreferences: TransportType[]
  mustVisit?: string[] // destination IDs
  avoidDestinations?: string[] // destination IDs
  includeCountries?: string[] // country codes
  travelers: number
}

export interface RouteStop {
  id: string
  destinationId: string
  destination: Destination
  arrivalDay: number
  departureDayoffset: number // days spent here
  nights: number
  hostelSuggestion?: Hostel
  activities: Activity[]
  dailyCostEstimate: number
  notes?: string
  isHidden?: boolean // hidden gem
  mustSee?: boolean
}

export interface TransportLeg {
  id: string
  fromStopId: string
  toStopId: string
  fromName: string
  toName: string
  type: TransportType
  durationHours: number
  priceEstimate: number
  isSleeper: boolean
  departureTime?: string
  arrivalTime?: string
  provider?: string
  affiliateUrl?: string
  bookingUrl?: string
  notes?: string
  distance?: number
}

export interface GeneratedRoute {
  id: string
  shareSlug: string
  title: string
  description: string
  emoji: string
  startLocation: string
  endLocation: string
  durationDays: number
  budgetTotal: number
  budgetBreakdown: BudgetBreakdown
  travelStyle: TravelStyle
  countries: string[]
  stops: RouteStop[]
  transportLegs: TransportLeg[]
  totalDistance: number
  viewCount: number
  shareCount: number
  isPublic: boolean
  isFeatured?: boolean
  createdAt: string
  tags: string[]
  highlights: string[]
}

export interface BudgetBreakdown {
  accommodation: number
  transport: number
  food: number
  activities: number
  misc: number
  total: number
  perDay: number
  currency: 'USD' | 'EUR' | 'GBP'
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export interface Activity {
  id: string
  name: string
  type: 'free' | 'paid' | 'optional'
  costUsd: number
  durationHours: number
  description: string
  tags: string[]
}

// ─── Featured Content ─────────────────────────────────────────────────────────

export interface FeaturedRoute {
  id: string
  slug: string
  title: string
  subtitle: string
  emoji: string
  coverImage: string
  countries: string[]
  durationDays: number
  budgetFrom: number
  travelStyle: TravelStyle
  tags: string[]
  highlights: string[]
  saves: number
  views: number
  isNew?: boolean
  isTrending?: boolean
  isCheapest?: boolean
}

// ─── Affiliate ────────────────────────────────────────────────────────────────

export type AffiliatePartner =
  | 'hostelworld'
  | 'booking'
  | 'kiwi'
  | 'skyscanner'
  | '12go'
  | 'airalo'
  | 'safety-wing'
  | 'wise'

export interface AffiliateLink {
  partner: AffiliatePartner
  url: string
  label: string
  description?: string
  commission?: string
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  meta?: {
    total?: number
    page?: number
    perPage?: number
  }
}

export interface RouteGenerationRequest {
  input: RoutePlannerInput
  cached?: boolean
}

export interface RouteGenerationResponse {
  route: GeneratedRoute
  alternatives?: GeneratedRoute[]
  processingTime: number
  cached: boolean
}

// ─── UI Types ─────────────────────────────────────────────────────────────────

export interface MapViewport {
  longitude: number
  latitude: number
  zoom: number
  bearing?: number
  pitch?: number
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}
