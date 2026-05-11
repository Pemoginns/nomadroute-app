# NomadRoute 🌏

> The Backpacker OS for Southeast Asia

A production-ready startup-grade travel platform for backpackers planning routes through Southeast Asia. Built with Next.js 15, TypeScript, Tailwind CSS, and a custom algorithmic route engine — no expensive AI required for core functionality.

## Live at `http://localhost:3333`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v3, Framer Motion, CSS transitions |
| State | Zustand |
| Maps | Custom animated SVG (Mapbox GL JS ready) |
| Charts | Recharts |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis (in-memory fallback for dev) |
| Infra | Docker Compose |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero map, featured routes, budget showcase |
| `/plan` | Route planner — destination selector, style, budget, transport |
| `/routes` | Browse all routes with filters |
| `/routes/[id]` | Generated route results — SVG map, timeline, budget breakdown |
| `/share/[id]` | Public shareable route card |
| `/dashboard` | User dashboard with stats + upcoming trips |
| `/trips` | Saved routes |
| `/login` `/register` | Auth pages |

## Route Engine

The core route generation is **100% algorithmic** — no AI costs:

- `lib/engine/route-generator.ts` — corridor selection + stop generation
- `lib/engine/budget-calculator.ts` — accurate cost estimation by category
- `lib/engine/scoring.ts` — destination scoring by travel style

AI is optionally used only for premium features (itinerary summaries).

## Data Coverage

- **15 destinations** across Vietnam, Thailand, Cambodia, Laos, Malaysia, Indonesia, Singapore
- **25+ transport routes** (buses, night trains, ferries, flights, slow boats)
- **10+ hostels** with affiliate links
- **8 featured routes** with real photography

## Affiliate Model

Revenue via affiliate redirects:
- **Hostelworld** — hostel bookings (4-10% commission)
- **Booking.com** — backup accommodation
- **Kiwi.com** — flights
- **12Go Asia** — overland transport
- **Airalo** — eSIM
- **SafetyWing** — travel insurance
- **Wise** — travel money

## Quick Start

```bash
# Start database & Redis
docker-compose up postgres redis -d

# Install and run
npm install
npm run dev
```

Visit `http://localhost:3333`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_MAPBOX_TOKEN` — for interactive maps
- `NEXTAUTH_SECRET` — for auth
- Affiliate partner IDs

## Docker (full stack)

```bash
docker-compose up
```

## Project Structure

```
nomadroute/
├── app/                    # Next.js App Router pages + API
│   ├── (auth)/            # Login, Register
│   ├── (dashboard)/       # Dashboard, Trips
│   ├── api/               # Route generation, affiliate tracking
│   ├── plan/              # Route planner
│   ├── routes/[id]/       # Route results
│   └── share/[id]/        # Public share page
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── map/               # Map components
│   ├── route/             # Planner, Timeline, Budget, Cards
│   ├── shared/            # ShareButton, AffiliateButton
│   └── ui/                # Button, Badge, Skeleton, FadeIn
├── lib/
│   ├── data/              # Destinations, hostels, transport, routes
│   ├── engine/            # Route generation algorithms
│   ├── store/             # Zustand state
│   ├── types/             # TypeScript types
│   └── utils/             # Affiliate, formatting, cn
└── prisma/schema.prisma   # Database schema
```

## Monetization Roadmap

1. **Phase 1 (Now)** — Affiliate links on transport + hostel bookings
2. **Phase 2** — Premium subscription ($5/mo) for AI summaries + unlimited saves
3. **Phase 3** — Featured/sponsored routes from tour operators
4. **Phase 4** — Creator marketplace for travel influencer itineraries
