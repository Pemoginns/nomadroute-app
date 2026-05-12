import Link from 'next/link'
import { Globe, Twitter, Instagram, Youtube } from 'lucide-react'

const FOOTER_LINKS = {
  Routes: [
    { label: 'Vietnam Route',         href: '/routes/vietnam-classic-2-weeks' },
    { label: '4 Weeks SEA',           href: '/routes/southeast-asia-budget-4-weeks' },
    { label: 'Digital Nomad Thailand',href: '/routes/digital-nomad-thailand-circuit' },
    { label: 'Bali in 10 Days',       href: '/routes/bali-ubud-to-canggu' },
    { label: 'Best Night Trains',     href: '/routes/best-night-trains-sea' },
  ],
  Destinations: [
    { label: 'Vietnam',  href: '/destination/vietnam' },
    { label: 'Thailand', href: '/destination/thailand' },
    { label: 'Bali',     href: '/destination/bali' },
    { label: 'Cambodia', href: '/destination/cambodia' },
    { label: 'Laos',     href: '/destination/laos' },
  ],
  Resources: [
    { label: 'Packing List',     href: '/guides/packing' },
    { label: 'Budget Calculator',href: '/tools/budget' },
    { label: 'Visa Guide',       href: '/guides/visas' },
    { label: 'Travel Insurance', href: '/tools/insurance' },
    { label: 'eSIM Guide',       href: '/guides/esim' },
  ],
  Company: [
    { label: 'About',   href: '/about' },
    { label: 'Blog',    href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms',   href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600">
                <Globe className="h-4 w-4 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                Nomad<span className="text-brand-600 dark:text-brand-400">Route</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-gray-400 mb-5 leading-relaxed">
              The operating system for backpacking Asia. Free, instant, community-powered.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400 dark:text-gray-500">
            © 2025 NomadRoute. Made with ♥ for backpackers.
          </p>
          <p className="text-xs text-slate-400 dark:text-gray-600">
            Some links are affiliate links. We earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
