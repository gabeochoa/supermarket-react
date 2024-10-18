/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [require('daisyui')],
};
