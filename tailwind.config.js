/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Screens/*.{js,jsx,ts,tsx}',
    './Utilities/*.{js,jsx,ts,tsx}',
    './Components/*.{js,jsx,ts,tsx}',
    './DrawerComponents/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      background: {
        DEFAULT: '#1F1D36',
      },
      customColor1: {
        DEFAULT: '#9C4A8B',
      },
      customColor2: {
        DEFAULT: '#E9A6A6',
      },
      customColor3: {
        DEFAULT: '#FFFFFF',
      },
      customColor4: {
        DEFAULT: '#EC2626',
      },
    },
  },
  plugins: [],
};
