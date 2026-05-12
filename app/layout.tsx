import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://nomadroute.app'),
  title: {
    default: 'NomadRoute — The Backpacker OS for Asia',
    template: '%s | NomadRoute',
  },
  description:
    'Plan your perfect Southeast Asia backpacker route. Instant AI-assisted itineraries, transport discovery, hostel suggestions, and budget calculation for Vietnam, Thailand, Bali, Cambodia & more.',
  keywords: [
    'backpacker route planner',
    'southeast asia travel',
    'vietnam travel route',
    'thailand backpacker',
    'bali travel guide',
    'budget travel asia',
    'digital nomad asia',
    'cambodia travel',
    'laos travel',
    'sea travel planner',
  ],
  authors: [{ name: 'NomadRoute' }],
  creator: 'NomadRoute',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nomadroute.app',
    siteName: 'NomadRoute',
    title: 'NomadRoute — The Backpacker OS for Asia',
    description: 'Plan your perfect Southeast Asia backpacker route. Free, instant, beautiful.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NomadRoute' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomadRoute — The Backpacker OS for Asia',
    description: 'Plan your perfect Southeast Asia backpacker route.',
    creator: '@nomadroute',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-base text-slate-900 dark:bg-gray-950 dark:text-slate-100 antialiased transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="pb-16 md:pb-0">{children}</main>
          <div className="pb-16 md:pb-0"><Footer /></div>
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
