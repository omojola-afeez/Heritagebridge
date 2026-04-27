/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        earth: {
          50: '#fdf8f0',
          100: '#faefd8',
          200: '#f3d9a8',
          300: '#e8bc6e',
          400: '#da9b3a',
          500: '#c47f1f',
          600: '#a56317',
          700: '#874d16',
          800: '#6e3f18',
          900: '#5a3317',
        },
        forest: {
          50: '#f0f9f4',
          100: '#dcf0e5',
          200: '#bbe1cd',
          300: '#8dcaad',
          400: '#5aac86',
          500: '#38916b',
          600: '#287455',
          700: '#215d45',
          800: '#1e4a38',
          900: '#1a3d2f',
        },
        terracotta: {
          50: '#fdf3f0',
          100: '#fce4dc',
          200: '#facdb8',
          300: '#f5a88a',
          400: '#ed7a56',
          500: '#e05530',
          600: '#cd3f1f',
          700: '#ab321a',
          800: '#8c2c1b',
          900: '#74291b',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
