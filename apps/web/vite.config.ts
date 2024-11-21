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
        outputPath: './src/i18n',
        defaultNS: 'common',
        useDts: true,
        langs: ['en', 'ko']
      }),
      makeManifest(),
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
        },
      }
    },
    base: process.env.VITE_URL_ROOT,
    worker: {
      rollupOptions: {
        treeshake: false,
        input: {
          graphqlWorker: '@fitness/graphql-worker',
          sqliteWorker: '@fitness/sqlite-worker'
        },
        output: {
          entryFileNames(info) {
            if (info.facadeModuleId?.includes('packages/graphql-worker')) {
              return '[name].js'
            } else if (info.facadeModuleId?.includes('packages/sqlite-worker')) {
              return '[name].js'
            }
            return 'assets/[name]-[hash].js'
          }
        }
      }
    }
  }
})
