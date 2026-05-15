import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#08080e',
        surface: '#0d0d18',
        card: '#111120',
        'card-hover': '#161628',
        border: '#1e1e32',
        'border-bright': 'rgba(139,92,246,0.2)',
        ink: '#ede8ff',
        muted: '#6b6880',
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        accent: '#06b6d4',
        violet: '#8b5cf6',
        rose: '#ec4899',
        blue: '#3b82f6',
        green: '#10b981',
        orange: '#f97316',
        yellow: '#f59e0b',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        dm: ['var(--font-dm)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        card: '0 0 0 1px rgba(139,92,246,0.08), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px rgba(124,58,237,0.15)',
        glow: '0 0 24px rgba(124,58,237,0.4)',
        'glow-sm': '0 0 12px rgba(124,58,237,0.3)',
        'glow-cyan': '0 0 24px rgba(6,182,212,0.4)',
        primary: '0 4px 20px rgba(124,58,237,0.35)',
        'primary-hover': '0 8px 32px rgba(124,58,237,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        float: 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
