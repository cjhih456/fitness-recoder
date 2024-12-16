import type { SqliteMessage } from 'sqlite-message-types'
import graphqlWorkerUrl from '@fitness/graphql-worker?worker&url'
import sqliteWorkerUrl from '@fitness/sqlite-worker?worker&url'
import { baseURL } from '@utils'
export default () => {
  return new Promise<boolean>((resolve) => {
    if (window) {
      if ('serviceWorker' in navigator) {
        (async () => {
          /**
           * Create Service worker & Sqlite Worker
           */
          const sqliteWorker = new Worker(sqliteWorkerUrl, { name: 'sqlite', credentials: 'same-origin', type: 'module' })
          sqliteWorker.postMessage({ type: 'init' })
          const workerRegistration = await navigator.serviceWorker.register(graphqlWorkerUrl, { type: 'module', updateViaCache: 'imports', scope: baseURL('/') }).then((registration) => {
            registration.addEventListener('updatefound', () => {
              console.log('Reloading page to update Graphql Service Worker.')
              window.location.reload()
            })
            if (registration.active && !navigator.serviceWorker.controller) {
              console.log('Reloading page to make use of GraphQL Service Worker.')
              window.location.reload()
            }
            return registration
          })
          const originServiceWorker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting

          /**
           * Bridge between Service worker & Sqlite Worker
           * used Message Channel
           */
          navigator.serviceWorker.addEventListener('message', async (e: MessageEvent<SqliteMessage.Message>) => {
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

          sqliteWorker.addEventListener('message', (e: MessageEvent<SqliteMessage.Result>) => {
            const worker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting
            worker?.postMessage(e.data)
          })
          resolve(true)
        })()

      }
    }
  })
}
