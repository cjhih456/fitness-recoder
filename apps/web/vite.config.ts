import fs from 'fs'
import GraphqlServer from '@fitness/vite-plugin-graphql-server'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import LanguagePackExporter from 'vite-plugin-i18next-language-pack-loader'
import Inspect from 'vite-plugin-inspect'
import tsConfigPaths from 'vite-tsconfig-paths'
import makeManifest from './vitePlugin/Manifest/MakeManifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isPreview }) => {
  return {
    server: mode === 'development' ? {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        // 'Access-Control-Allow-Origin': '*',
        'Service-Worker-Allowed': '/'
      },
      cors: true,
      port: 4443,
      https: {
        cert: fs.readFileSync('./ssl/server.crt'),
        key: fs.readFileSync('./ssl/server.key')
      },
    } : undefined,
    preview: isPreview && mode === 'production' ? {
      cors: true,
      port: 4443,
      https: {
        cert: fs.readFileSync('./ssl/server.crt'),
        key: fs.readFileSync('./ssl/server.key')
      },
    } : {},
    optimizeDeps: {
      exclude: ['@fitness/sqlite-worker']
    },
    plugins: [
      tsConfigPaths(),
      Inspect(),
      GraphqlServer({
        modulePath: [
          '../../packages/graphql-worker/src/graphql/Schedule/query.gql',
          '../../packages/graphql-worker/src/graphql/Sets/query.gql',
          '../../packages/graphql-worker/src/graphql/Exercise/query.gql',
          '../../packages/graphql-worker/src/graphql/ExercisePreset/query.gql'
        ],
        path: '/__graphql',
        autoGenTypePath: './src/hooks/apollo/possibleTypes.json'
      }),
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
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        input: {
          app: './index.html'
        },
      }
    },
    base: process.env.VITE_URL_ROOT,
    worker: {
      format: 'es',
      rollupOptions: {
        output: {
          entryFileNames(info) {
            if (info.facadeModuleId?.includes('packages/graphql-worker')) {
              return 'gql-[name].js'
            }
            return 'assets/[name]-[hash].js'
          }
        }
      }
    }
  }
})
