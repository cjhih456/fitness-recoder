import type { StorybookConfig } from '@storybook/react-vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { PluginOption } from 'vite';

const webRootPath = resolve(__dirname, '../../../apps/web')

const config: StorybookConfig = {
  viteFinal: async (config) => {
    config.plugins = [
      ...(config.plugins || []),
      tsConfigPaths({
        projects: [resolve(webRootPath, 'tsconfig.json')],
      }) as PluginOption
    ]

    return config
  },
  stories: [resolve(webRootPath, "src/**/*.mdx"), resolve(webRootPath, "src/**/*.stories.@(js|jsx|mjs|ts|tsx)")],
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
  staticDirs: [resolve(webRootPath, "public")],
};
export default config;