/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/sections/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // ─── Design Tokens ────────────────────────────────────────────
      // Edit these to retheme the entire site in one place
      colors: {
        lab: {
          bg:        '#050810',   // near-black base
          surface:   '#0a0f1e',   // card backgrounds
          border:    '#111827',   // subtle borders
          line:      '#1a2235',   // slightly visible dividers
          cyan:      '#00e5ff',   // primary neon accent
          purple:    '#a855f7',   // secondary accent
          pink:      '#f472b6',   // tertiary accent (sparingly)
          text:      '#e2e8f0',   // primary text
          muted:     '#64748b',   // secondary / muted text
          subtle:    '#1e293b',   // very subtle backgrounds
        },
      },
      fontFamily: {
        // JetBrains Mono for terminal feel, Geist Sans for body & display
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Geist Sans', 'sans-serif'],
        body:    ['Geist Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan':          'scan 3s linear infinite',
        'flicker':       'flicker 5s ease-in-out infinite',
        'grid-move':     'gridMove 20s linear infinite',
      },
      keyframes: {
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%':      { opacity: '1' },
          '93%':      { opacity: '0.7' },
          '94%':      { opacity: '1' },
          '95%':      { opacity: '0.9' },
          '96%':      { opacity: '1' },
        },
        gridMove: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
      },
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(0, 229, 255, 0.15), 0 0 60px rgba(0, 229, 255, 0.05)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.15), 0 0 60px rgba(168, 85, 247, 0.05)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
