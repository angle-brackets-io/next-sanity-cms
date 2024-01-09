/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {},
    fontSize: {},
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '4/3': '4 / 3',
        '5/4': '5 / 4',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
