import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    }),
    wasm(),
    topLevelAwait()
  ],
  experimental: {
    renderBuiltUrl(filename, type) {
      console.log(filename)
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
    format: "iife",
    rollupOptions: {
      treeshake: false,
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js'
      },
    },
    plugins: () => [
      wasm(),
      topLevelAwait()
    ]
  }
})