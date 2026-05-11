'use client'

import { useState } from 'react'
import { Share2, Link2, Twitter, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface ShareButtonProps {
  slug: string
  title: string
  className?: string
}

export function ShareButton({ slug, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/share/${slug}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitter = () => {
    const text = `Check out this backpacker route: ${title}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
    )
  }

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(!open)}
        className={className}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-xl border border-white/10 bg-bg-elevated p-2 shadow-elevated">
            <button
              onClick={handleCopy}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Link2 className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button
              onClick={handleTwitter}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 transition-colors"
            >
              <Twitter className="h-4 w-4 text-sky-400" />
              Share on Twitter
            </button>
          </div>
        </>
      )}
    </div>
  )
}
