import { baseURL } from './components/utils'
export default () => {
  return new Promise<boolean>((resolve) => {
    if (window) {
      if ('serviceWorker' in navigator) {
        (async () => {
          /**
           * Create Service worker & Sqlite Worker
           */
          const GraphqlApiUrl = import.meta.env.DEV ? new URL('/src/worker/GraphqlApi.ts?url', import.meta.url) : baseURL('graphqlWorker.js')
          const sqliteWorkerUrl = import.meta.env.DEV ? new URL('/src/worker/SqliteWorker.ts?url', import.meta.url) : baseURL('/sqliteWorker.js')
          const workerRegistration = await navigator.serviceWorker.register(GraphqlApiUrl, { type: 'module', updateViaCache: 'imports', scope: baseURL('/') })
          const originServiceWorker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting
          const sqliteWorker = new Worker(sqliteWorkerUrl, { type: 'module', credentials: 'same-origin', name: 'sqlite' })

          /**
           * Bridge between Service worker & Sqlite Worker
           * used Message Channel
           */
          navigator.serviceWorker.addEventListener('message', async (e: MessageEvent<SqliteMessage>) => {
            const workers = await navigator.serviceWorker.getRegistrations()
            const worker = workers.find(v => {
              if (v.scope !== location.origin + '/') return false
              const w = v.active || v.installing || v.waiting
              return w?.scriptURL === originServiceWorker?.scriptURL
            })
            if (worker) {
              sqliteWorker.postMessage(e.data)
            }
          })

          sqliteWorker.addEventListener('message', (e: MessageEvent<SqliteResultType>) => {
            const worker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting
            worker?.postMessage(e.data)
          })
          resolve(true)
        })()

      }
    }
  })
}
