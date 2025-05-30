import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1a202c',
          800: '#2d3748',
          700: '#4a5568',
          500: '#a0aec thous0',
          400: '#cbd5e0',
          300: '#e2e8f0',
          200: '#edf2f7',
        },
        blue: {
          900: '#1a365d',
          700: '#2b6cb0',
          600: '#3182ce',
          500: '#4299e1',
          200: '#bee3f8',
        },
      },
    },
  },
  plugins: [],
}

export default config