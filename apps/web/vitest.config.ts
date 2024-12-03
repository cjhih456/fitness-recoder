import { defineConfig, mergeConfig, } from 'vitest/config'
import viteConfig from './vite.config.ts'
export default defineConfig((env) => mergeConfig(viteConfig(env), defineConfig({
  test: {
    browser: {
      enabled: false,
      name: 'chromium',
      provider: 'playwright'
    }
  }
})))