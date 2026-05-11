import type { AffiliatePartner, TransportType } from '@/lib/types'

export const AFFILIATE_PARTNERS = {
  hostelworld: {
    name: 'Hostelworld',
    baseUrl: 'https://www.hostelworld.com',
    commission: '4-10%',
    logo: '/icons/hostelworld.svg',
  },
  booking: {
    name: 'Booking.com',
    baseUrl: 'https://www.booking.com',
    commission: '4-25%',
    logo: '/icons/booking.svg',
  },
  kiwi: {
    name: 'Kiwi.com',
    baseUrl: 'https://www.kiwi.com',
    commission: '3-5%',
    logo: '/icons/kiwi.svg',
  },
  skyscanner: {
    name: 'Skyscanner',
    baseUrl: 'https://www.skyscanner.net',
    commission: '1-3%',
    logo: '/icons/skyscanner.svg',
  },
  '12go': {
    name: '12Go Asia',
    baseUrl: 'https://12go.asia',
    commission: '3-8%',
    logo: '/icons/12go.svg',
  },
  airalo: {
    name: 'Airalo eSIM',
    baseUrl: 'https://www.airalo.com',
    commission: '10-15%',
    logo: '/icons/airalo.svg',
  },
  'safety-wing': {
    name: 'SafetyWing Insurance',
    baseUrl: 'https://safetywing.com',
    commission: '10%',
    logo: '/icons/safetywing.svg',
  },
  wise: {
    name: 'Wise Money',
    baseUrl: 'https://wise.com',
    commission: '$15 per signup',
    logo: '/icons/wise.svg',
  },
}

export function buildTransportAffiliateUrl(
  fromName: string,
  toName: string,
  type: TransportType,
  date?: string,
): string {
  if (type === 'flight') {
    return `https://www.kiwi.com/en/search/results/${encodeURIComponent(fromName.toLowerCase())}/${encodeURIComponent(toName.toLowerCase())}/${date ?? 'anytime'}`
  }
  return `https://12go.asia/en/travel/${encodeURIComponent(fromName.toLowerCase())}/${encodeURIComponent(toName.toLowerCase())}`
}

export function buildHostelAffiliateUrl(destinationName: string, hostelSlug?: string): string {
  if (hostelSlug) {
    return `https://www.hostelworld.com/hosteldetails.php/${encodeURIComponent(hostelSlug)}`
  }
  return `https://www.hostelworld.com/findabed.php/ChosenCity.${encodeURIComponent(destinationName)}`
}

export function buildFlightAffiliateUrl(from: string, to: string, date?: string): string {
  return `https://www.kiwi.com/en/search/results/${encodeURIComponent(from)}/${encodeURIComponent(to)}/${date ?? 'anytime'}`
}

export function trackAffiliateClick(partner: AffiliatePartner, url: string, routeId?: string): void {
  // In production: send to analytics + our own tracking endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/affiliate/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partner, url, routeId, timestamp: Date.now() }),
    }).catch(() => {}) // fire and forget
  }
}
