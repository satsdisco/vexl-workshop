/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vexl-black': '#000000',
        'vexl-white': '#FFFFFF',
        'vexl-yellow': '#FCCD6C',
        'vexl-green': {
          'dark': '#28332A',
          'mid': '#3D4D41',
          'base': '#5D7763',
          'light': '#ACD9B7',
        },
        'vexl-pink': '#FCC5F3',
        'vexl-gray': {
          100: '#FBFBFB',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#6B6F7E',
          600: '#4B4F5E',
          700: '#2B2F3E',
          800: '#161616',
          900: '#000000',
        },
      },
      fontFamily: {
        'satoshi': ['TT Satoshi', 'system-ui', 'sans-serif'],
        'sans': ['TT Satoshi', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'base': '18px',
      },
      borderRadius: {
        'none': '0px',
      },
      backgroundImage: {
        'vexl-pattern': "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23161616' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}