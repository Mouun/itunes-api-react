const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'gray': {
          50: '#f8f8fc',
          100: '#f0f0f4',
          200: '#e6e6ea',
          300: '#d5d5d9',
          400: '#b0b0b5',
          500: '#909094',
          600: '#68686c',
          700: '#555559',
          800: '#37373a',
          900: '#17171a'
        },
        'lime': {
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
          700: '#4D7C0F',
          800: '#3F6212',
          900: '#365314'
        }
      },
      maxWidth: {
        '48': '12rem'
      },
      fontSize: {
        'xxs': '0.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
