import { nextui } from '@nextui-org/react';
import { Config } from 'tailwindcss';

export default {
  content: [
    "../../apps/web/src/**/*.{tsx,ts,css,sass}",
    './.storybook/**/*.{tsx,ts,css,sass}',
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

