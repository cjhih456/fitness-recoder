import type { StorybookConfig } from '@storybook/react-vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

const webRootPath = resolve(__dirname, '../../../apps/web')
console.log('webRootPath: ', webRootPath)
const config: StorybookConfig = {
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), tsConfigPaths({
      projects: [resolve(webRootPath, 'tsconfig.json')],
    })]

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