/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        caslon: ['var(--font-caslon)', 'serif'],
        dm: ['var(--font-dm)', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'sans-serif'],
      },
      colors: {
        'page-bg': '#F2E3EC',
        'button-bg': '#D4C7B9',
        'card-border': '#EAB6C2',
        'card-inner': '#FFF7FC',
        'card-text': '#451900',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scroll-left': 'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 40s linear infinite',
      },
    },
  },
  plugins: [],
}