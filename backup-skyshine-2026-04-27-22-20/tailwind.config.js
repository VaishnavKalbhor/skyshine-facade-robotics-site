/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        skyshine: {
          bg: '#05070f',
          surface: '#0d1424',
          panel: '#121b2f',
          electric: '#38bdf8',
          cyan: '#22d3ee',
          glow: '#818cf8',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.25)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(129,140,248,0.12), transparent 40%), linear-gradient(to bottom, rgba(5,7,15,1), rgba(5,7,15,0.95))',
      },
    },
  },
  plugins: [],
}

