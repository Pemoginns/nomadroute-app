'use client'

import { Component, type ReactNode } from 'react'
import Link from 'next/link'

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error) {
    console.error('[NomadRoute]', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-400 mb-5">{this.state.message || 'An unexpected error occurred.'}</p>
            <Link href="/" className="text-brand-400 text-sm hover:text-brand-300">← Back to home</Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
