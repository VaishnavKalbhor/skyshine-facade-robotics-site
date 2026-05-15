/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        skyshine: {
          bg: '#f8fffc',
          surface: '#eef9f6',
          panel: '#ffffff',
          mint: '#dff4ef',
          teal: '#53c7b3',
          tealDark: '#1fa896',
          text: '#071817',
          muted: '#4b5f5c',
          border: '#d7ece8',
          /** 3D viewer: dark surface in the same teal family as the brand */
          viewer: '#0a1412',
          viewerDeep: '#060d0c',
          viewerLine: '#1a2e2a',
        },
      },
      boxShadow: {
        glow: '0 18px 45px rgba(31, 168, 150, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 10%, rgba(83,199,179,0.2), transparent 45%), radial-gradient(circle at 90% 0%, rgba(31,168,150,0.12), transparent 40%), linear-gradient(to bottom, #f8fffc, #f6fbfa)',
      },
    },
  },
  plugins: [],
}

