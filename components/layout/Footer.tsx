import Link from 'next/link'
import { Globe, Twitter, Instagram, Youtube } from 'lucide-react'

const FOOTER_LINKS = {
  Routes: [
    { label: 'Vietnam Route', href: '/routes/vietnam-classic-2weeks' },
    { label: '4 Weeks SEA', href: '/routes/sea-budget-monster' },
    { label: 'Digital Nomad Thailand', href: '/routes/digital-nomad-thailand' },
    { label: 'Bali in 10 Days', href: '/routes/bali-ubud-canggu' },
    { label: 'Best Night Trains', href: '/routes/best-night-trains-asia' },
  ],
  Destinations: [
    { label: 'Vietnam', href: '/destination/vietnam' },
    { label: 'Thailand', href: '/destination/thailand' },
    { label: 'Bali', href: '/destination/bali' },
    { label: 'Cambodia', href: '/destination/cambodia' },
    { label: 'Laos', href: '/destination/laos' },
  ],
  Resources: [
    { label: 'Packing List', href: '/guides/packing' },
    { label: 'Budget Calculator', href: '/tools/budget' },
    { label: 'Visa Guide', href: '/guides/visas' },
    { label: 'Travel Insurance', href: '/tools/insurance' },
    { label: 'eSIM Guide', href: '/guides/esim' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600">
                <Globe className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white">
                Nomad<span className="text-brand-400">Route</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              The operating system for backpacking Asia. Free, open, community-powered.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © 2025 NomadRoute. Made with ♥ for backpackers.
          </p>
          <p className="text-xs text-slate-700">
            Some links are affiliate links. We earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
