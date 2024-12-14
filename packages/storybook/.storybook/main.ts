import type { StorybookConfig } from '@storybook/react-vite'
import tsConfigPaths from 'vite-tsconfig-paths'
const config: StorybookConfig = {
  viteFinal: async (config, option) => {
    config.plugins = [...(config.plugins || []), tsConfigPaths()]
    return config
  },
  stories: ["../../../apps/web/src/**/*.mdx", "../../../apps/web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    '@storybook/addon-jest',
    "@chromatic-com/storybook",
    "storybook-addon-remix-react-router",
  ],
  framework: '@storybook/react-vite',
  staticDirs: ["../../../apps/web/public"],
};
export default config;