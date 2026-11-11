/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1380px',
      },
    },
    extend: {
      colors: {
        olive: {
          DEFAULT: '#443d23',
          dark: '#352f1b',
          light: '#5d5433',
        },
        burgundy: {
          DEFAULT: '#521418',
          dark: '#3e0e12',
          light: '#6d1d23',
        },
        beige: {
          DEFAULT: '#cab79f',
          dark: '#b39d83',
          light: '#ddcfbc',
        },
        cream: {
          DEFAULT: '#f7f3ed',
          light: '#faf8f5',
          dark: '#eee7dc',
        },
        sand: '#e8dfd5',
        dark: {
          DEFAULT: '#242018',
          subtle: '#3b3528',
        },
        muted: {
          DEFAULT: '#80796d',
          light: '#a6a095',
        },
        gold: {
          DEFAULT: '#c5a059',
          light: '#dfbe7d',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(68, 61, 35, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(82, 20, 24, 0.12)',
        'soft': '0 4px 20px rgba(36, 32, 24, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
