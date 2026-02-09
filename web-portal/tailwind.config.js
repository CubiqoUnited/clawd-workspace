/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e7',
          100: '#fde4c3',
          200: '#fbd09a',
          300: '#f9bc71',
          400: '#f8ad52',
          500: '#f79009', // Main orange (keep for admin)
          600: '#e08308',
          700: '#c97307',
          800: '#b26306',
          900: '#9b5405',
        },
        secondary: {
          50: '#e6f4ff',
          100: '#bae0ff',
          200: '#8dcfff',
          300: '#61bdff',
          400: '#3aafff',
          500: '#2e90fa', // Main blue (keep for admin)
          600: '#2a81e0',
          700: '#2671c7',
          800: '#2161ae',
          900: '#1d5295',
        },
        // CubiQo brand colors
        cubiqo: {
          purple: '#9333EA',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          dark: '#000000',
          'dark-gray': '#0a0a0a',
        },
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
