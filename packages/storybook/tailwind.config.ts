import { heroui } from '@heroui/react';
import { Config } from 'tailwindcss';

export default {
  content: [
    "../../apps/web/src/**/*.{tsx,ts,css,sass}",
    './.storybook/**/*.{tsx,ts,css,sass}',
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /col-span-(\d+)/ }, // col-span-1 ~ col-span-N 사용 가능
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      addCommonColors: true,
      defaultTheme: 'light'
    })],
} as Config

