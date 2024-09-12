import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import GraphqlLoader from 'vite-plugin-graphql-loader'
import fs from 'fs'
import makeManifest from './vitePlugin/Manifest/MakeManifest'
import GraphqlServer from './vitePlugin/GraphqlServer'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
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
    preview: isPreview && mode === 'product' ? {
      cors: true,
      port: 443,
      https: {
        cert: fs.readFileSync('./ssl/server.crt'),
        key: fs.readFileSync('./ssl/server.key')
      },
    } : {},
    optimizeDeps: {
      exclude: ['@sqlite.org/sqlite-wasm'],
    },
    plugins: [
      Inspect(),
      makeManifest(mode),
      GraphqlLoader(),
      react(),
      GraphqlServer({
        path: '/__graphql',
        modulePath: [
          './workerSrc/graphql/Schedule',
          './workerSrc/graphql/Sets',
          './workerSrc/graphql/Exercise',
          './workerSrc/graphql/ExercisePreset'
        ]
      })
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        input: {
          app: './index.html',
          sqliteWorker: './workerSrc/SqliteWorker.ts',
          graphqlWorker: './workerSrc/GraphqlApi.ts',
        },
        output: {
          entryFileNames(info) {
            if (info.facadeModuleId?.endsWith('SqliteWorker.ts') || info.facadeModuleId?.endsWith('GraphqlApi.ts')) {
              return '[name].js'
            }
            return 'assets/[name]-[hash].js'
          }
        }
      }
    },
    base: env.VITE_URL_ROOT,
  }
})
