import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    }),
  ],
  experimental: {
    renderBuiltUrl(filename) {
      return './' + filename
    }
  },
  build: {
    assetsInlineLimit: 0,
    assetsDir: '',
    rollupOptions: {
      treeshake: false,
      input: {
        index: './src/index.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  worker: {
    rollupOptions: {
      treeshake: false,
    }
  }
})