import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig(() => {
  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [
      dts({
        tsconfigPath: './tsconfig.json',
        rollupTypes: true
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
        input: {
          index: './src/index.ts'
        },
        output: {
          entryFileNames: '[name].js',
          manualChunks: {
            'data': ['./src/create/fitness-datas/fitness-flat-data.json']
          }
        }
      }
    }
  }
})