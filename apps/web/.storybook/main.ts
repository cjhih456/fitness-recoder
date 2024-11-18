import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    "storybook-addon-react-router-v6",
    '@storybook/addon-jest'
  ],
  framework: '@storybook/react-vite',
  staticDirs: ["../public"],
};
export default config;