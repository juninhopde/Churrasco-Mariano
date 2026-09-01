/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carvao: '#111111',
        grafite: '#1B1B1B',
        madeira: '#5A3825',
        fogo: '#A83220',
        dourado: '#C58B3A',
        creme: '#F4EBDD',
        zap: '#1DA851',
        'zap-dark': '#17853F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1200px' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(29,168,81,.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(29,168,81,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(29,168,81,0)' },
        },
        'hero-zoom': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.08) translateY(-1.5%)' },
        },
        'fire-flicker': {
          '0%, 100%': { opacity: '0.55' },
          '12%': { opacity: '0.48' },
          '25%': { opacity: '0.6' },
          '37%': { opacity: '0.52' },
          '50%': { opacity: '0.58' },
          '62%': { opacity: '0.45' },
          '75%': { opacity: '0.55' },
          '87%': { opacity: '0.5' },
        },
        'fire-glow': {
          '0%, 100%': { opacity: '0.22', transform: 'scale(1)' },
          '33%': { opacity: '0.35', transform: 'scale(1.02)' },
          '66%': { opacity: '0.18', transform: 'scale(0.98)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .8s ease both',
        ring: 'pulseRing 3.2s ease-out infinite',
        'hero-zoom': 'hero-zoom 5s ease-out forwards',
        'fire-flicker': 'fire-flicker 3s ease-in-out infinite',
        'fire-glow': 'fire-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
