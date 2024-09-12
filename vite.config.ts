import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import GraphqlLoader from 'vite-plugin-graphql-loader'
import fs from 'fs'
import makeManifest from './vitePlugin/Manifest/MakeManifest'
import GraphqlServer from './vitePlugin/GraphqlServer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
    preview: mode === 'development' ? {
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
    assetsInclude: [
      'worker/SqliteWorker.ts',
      'worker/GraphqlApi.ts'
    ],
    plugins: [
      makeManifest(env),
      GraphqlLoader(),
      react(),
      GraphqlServer({
        path: '/__graphql',
        modulePath: [
          './src/worker/graphql/Schedule',
          './src/worker/graphql/Sets',
          './src/worker/graphql/Exercise',
          './src/worker/graphql/ExercisePreset'
        ]
      })
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    build: {
      lib: {
        entry: ['./src/worker/SqliteWorker.ts', './src/worker/GraphqlApi.ts'],
        formats: ['es', 'es']
      },
      rollupOptions: {
        input: {
          app: './index.html',
          sqliteWorker: './src/worker/SqliteWorker.ts',
          graphqlWorker: './src/worker/GraphqlApi.ts'
        },
        output: {
          format: 'es'
        }
      }
    },
    base: env.VITE_URL_ROOT,
  }
})
