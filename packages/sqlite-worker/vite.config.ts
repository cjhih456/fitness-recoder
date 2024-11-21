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
    rollupOptions: {
      treeshake: false,
      input: {
        index: './src/index.ts'
      },
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js'
      }
    }
  },
  worker: {
    format: 'iife',
    rollupOptions: {
      treeshake: false,
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js'
      },
    }
  }
})