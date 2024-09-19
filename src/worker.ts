import { baseURL } from './components/utils'
export default () => {
  return new Promise<boolean>((resolve) => {
    if (window) {
      if ('serviceWorker' in navigator) {
        (async () => {
          let graphqlApiUrl = '../workerSrc/GraphqlApi.ts'
          let sqliteWorkerUrl = '../workerSrc/SqliteWorker.ts'
          if (!import.meta.env.DEV) {
            graphqlApiUrl = baseURL('/graphqlWorker.js')
            sqliteWorkerUrl = baseURL('/sqliteWorker.js')
          } else {
            graphqlApiUrl = new URL(graphqlApiUrl, import.meta.url).href
            sqliteWorkerUrl = new URL(sqliteWorkerUrl, import.meta.url).href
          }
          /**
           * Create Service worker & Sqlite Worker
           */
          const workerRegistration = await navigator.serviceWorker.register(graphqlApiUrl, { type: 'module', updateViaCache: 'imports', scope: baseURL('/') })
          const originServiceWorker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting
          const sqliteWorker = new Worker(sqliteWorkerUrl, { type: 'module', credentials: 'same-origin', name: 'sqlite' })

          /**
           * Bridge between Service worker & Sqlite Worker
           * used Message Channel
           */
          navigator.serviceWorker.addEventListener('message', async (e: MessageEvent<SqliteMessage>) => {
            const workers = await navigator.serviceWorker.getRegistrations()
            const worker = workers.find(v => {
              if (v.scope !== location.origin + baseURL('/')) return false
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
