/** @type {import('tailwindcss').Config} */

import tailwindcss from 'tailwindcss';

tailwindcss.Config();

export default {
  content: ['./index.html', "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class', 
  plugins: [],
};