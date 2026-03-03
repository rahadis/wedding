/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#f0f4f8',
          100: '#e1e8f0',
          200: '#c3d1e1',
          300: '#a5bbd2',
          400: '#7a9bc7',
          500: '#4f7bbd',
          600: '#003d7a',
          700: '#001f3f',
          800: '#001833',
          900: '#000e1a',
        },
        'education': {
          primary: '#001f3f',
          secondary: '#003d7a',
          accent: '#0066cc',
          light: '#f5f7fa',
        }
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      borderRadius: {
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 31, 63, 0.15)',
        'lg': '0 12px 24px rgba(0, 31, 63, 0.15)',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
