'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

/**
 * Lightweight CSS-based fade-in that avoids Framer Motion / React 19
 * hydration race where initial opacity:0 never animates.
 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const translateMap = {
    up: 'translateY(18px)',
    down: 'translateY(-18px)',
    left: 'translateX(24px)',
    right: 'translateX(-24px)',
    none: 'none',
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translateMap[direction],
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

/** Immediate fade-in on mount (for above-the-fold content) */
export function MountFadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
}: Omit<FadeInProps, 'once'>) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const translateMap = {
    up: 'translateY(18px)',
    down: 'translateY(-18px)',
    left: 'translateX(24px)',
    right: 'translateX(-24px)',
    none: 'none',
  }

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translateMap[direction],
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
