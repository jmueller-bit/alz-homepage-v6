/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#5e9345',
          foreground: '#FFFFFF',
          50: '#F0F5EE',
          100: '#e0ebd9',
          200: '#c2d6b3',
          300: '#a3c28e',
          400: '#85ad68',
          500: '#5e9345',
          600: '#4b7537',
          700: '#385829',
          800: '#263b1c',
          900: '#131d0e',
        },
        secondary: {
          DEFAULT: '#f7a600',
          foreground: '#3d3d3c',
          50: '#FEF8E7',
          100: '#ffeebb',
          200: '#ffdd77',
          300: '#ffcc33',
          400: '#fbbc11',
          500: '#f7a600',
          600: '#c58500',
          700: '#946400',
          800: '#634200',
          900: '#312100',
        },
        accent: {
          DEFAULT: '#c73729',
          foreground: '#FFFFFF',
          50: '#f9ebea',
          100: '#f3c4bf',
          200: '#ec9d94',
          300: '#e67568',
          400: '#df4e3d',
          500: '#c73729',
          600: '#9f2c21',
          700: '#772119',
          800: '#501610',
          900: '#280b08',
        },
        schule: {
          DEFAULT: '#b3b60d',
          mid: '#d5d462',
          light: '#edf0bc',
        },
        kolleg: {
          DEFAULT: '#008ea8',
          mid: '#66aecc',
          light: '#b1d6e3',
        },
        werkstaetten: {
          DEFAULT: '#8d4f99',
          mid: '#9d79a5',
          light: '#e2d0e7',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        cream: '#FDFAF4',
        charcoal: '#3d3d3c',
        alzgray: {
          dark: '#80807f',
          mid: '#bababa',
          light: '#dedede',
        },
        highlight: '#f6c052',
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
    },
  },
}
