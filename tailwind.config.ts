import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#f9fafb',
          surface: '#ffffff',
          elevated: '#ffffff',
          overlay: '#f3f4f6',
        },
        brand: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        violet: {
          glow: '#7c3aed',
        },
        amber: {
          glow: '#eab308',
        },
        sea: {
          teal: '#14b8a6',
          cyan: '#06b6d4',
        },
        transport: {
          bus: '#3b82f6',
          train: '#8b5cf6',
          ferry: '#06b6d4',
          flight: '#f59e0b',
          walk: '#10b981',
          taxi: '#f97316',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        'gradient-brand': 'linear-gradient(135deg, #eab308 0%, #facc15 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
        'gradient-glow-top': 'radial-gradient(ellipse at top, rgba(234, 179, 8, 0.12) 0%, transparent 60%)',
        'gradient-glow-bottom': 'radial-gradient(ellipse at bottom, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
        'glass-border': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
        'gradient-pricing': 'linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(251,191,36,0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        'glow-sm': '0 0 15px rgba(234, 179, 8, 0.3)',
        'glow': '0 0 30px rgba(234, 179, 8, 0.4)',
        'glow-lg': '0 0 60px rgba(234, 179, 8, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 48px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-a': 'floatA 7s ease-in-out infinite',
        'float-b': 'floatB 9s ease-in-out infinite',
        'float-c': 'floatC 11s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'route-draw': 'routeDraw 2s ease-in-out forwards',
        'ping-slow': 'ping 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'step-in': 'stepFadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatA: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.5deg)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translateY(0px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        floatC: {
          '0%, 100%': { transform: 'translateY(-6px) rotate(0.5deg)' },
          '50%': { transform: 'translateY(6px) rotate(-0.5deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        routeDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(234, 179, 8, 0.5), 0 0 80px rgba(234, 179, 8, 0.15)' },
        },
        stepFadeIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
