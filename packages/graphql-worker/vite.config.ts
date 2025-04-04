import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import GraphqlLoader from 'vite-plugin-graphql-loader'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true
    }),
    wasm(),
    topLevelAwait(),
    GraphqlLoader()
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
    },
    plugins: () => [
      wasm(),
      topLevelAwait()
    ]
  }
})