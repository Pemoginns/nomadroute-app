import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🗺️</div>
        <h1 className="text-4xl font-black text-white mb-3">Lost in Asia?</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          This page doesn't exist — but your perfect SEA route does. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/plan">
            <Button variant="primary" size="lg">Plan a route</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="lg">Go home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
