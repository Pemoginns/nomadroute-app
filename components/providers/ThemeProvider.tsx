'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  isAuto: boolean
}

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {}, isAuto: true })

/** Returns 'dark' before 6 AM or after 7 PM local time, else 'light'. */
function autoTheme(): Theme {
  const h = new Date().getHours()
  return h < 6 || h >= 19 ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [isAuto, setIsAuto] = useState(true)

  // On mount: read stored preference or fall back to time-of-day
  useEffect(() => {
    const stored = localStorage.getItem('nr-theme') as Theme | null
    const manual = localStorage.getItem('nr-theme-manual') === '1'
    const t = manual && stored ? stored : autoTheme()
    setTheme(t)
    setIsAuto(!manual)
  }, [])

  // Apply / remove dark class whenever theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('nr-theme', next)
      localStorage.setItem('nr-theme-manual', '1')
      return next
    })
    setIsAuto(false)
  }, [])

  return <Ctx.Provider value={{ theme, toggle, isAuto }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
