import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export default {
  content: [
    './src/**/*.{tsx,ts,css,sass}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: 'light'
    })],
} as Config
