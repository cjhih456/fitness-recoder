import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import makeManifest from './vitePlugin/Manifest/MakeManifest'
import Inspect from 'vite-plugin-inspect'
import LanguagePackExporter from 'vite-plugin-i18next-language-pack-loader'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isPreview }) => {
  return {
    server: mode === 'development' ? {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        // 'Access-Control-Allow-Origin': '*',
        'Service-Worker-Allowed': '/'
      },
      cors: true,
      port: 443,
      https: {
        cert: fs.readFileSync('./ssl/server.crt'),
        key: fs.readFileSync('./ssl/server.key')
      },
    } : undefined,
    preview: isPreview && mode === 'production' ? {
      cors: true,
      port: 443,
      https: {
        cert: fs.readFileSync('./ssl/server.crt'),
        key: fs.readFileSync('./ssl/server.key')
      },
    } : {},
    optimizeDeps: {
      exclude: ['@fitness/sqlite-worker']
    },
    plugins: [
      Inspect(),
      LanguagePackExporter({
        fileName: './LanguagePack.xlsx',
        outputPath: './src/i18n'
      }),
      makeManifest(mode),
      react()
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        input: {
          app: './index.html',
          graphqlWorker: './workerSrc/GraphqlApi.ts',
        },
        output: {
          entryFileNames(info) {
            if (info.facadeModuleId?.endsWith('GraphqlApi.ts')) {
              return '[name].js'
            }
            return 'assets/[name]-[hash].js'
          }
        }
      }
    },
    base: process.env.VITE_URL_ROOT,
    worker: {
      rollupOptions: {
        treeshake: false
      }
    }
  }
})
