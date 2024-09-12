export default () => {
  return new Promise<boolean>((resolve) => {
    if (window) {
      // const url = new URL('/src/worker/GraphqlApi.ts', import.meta.url).href
      const sqliteUrl = new URL('/src/worker/SqliteWorker.ts', import.meta.url).href
      if ('serviceWorker' in navigator) {
        (async () => {
          /**
           * Create Service worker & Sqlite Worker
           */
          // const workerRegistration = await navigator.serviceWorker.register(url, { type: 'module', updateViaCache: 'imports', scope: import.meta.env.VITE_URL_ROOT })
          const sqliteWorker = new Worker(sqliteUrl, { type: 'module', credentials: 'same-origin', name: 'sqlite' })

          /**
           * Bridge between Service worker & Sqlite Worker
           * used Message Channel
           */
          // navigator.serviceWorker.addEventListener('message', async (e: MessageEvent<SqliteMessage>) => {
          //   const workers = await navigator.serviceWorker.getRegistrations()
          //   const worker = workers.find(v => {
          //     if (v.scope !== location.origin + '/') return false
          //     const w = v.active || v.installing || v.waiting
          //     return w?.scriptURL === url
          //   })
          //   if (worker) {
          //     sqliteWorker.postMessage(e.data)
          //   }
          // })

          sqliteWorker.addEventListener('message', (e: MessageEvent<SqliteResultType>) => {
            // const worker = workerRegistration.active || workerRegistration.installing || workerRegistration.waiting
            // worker?.postMessage(e.data)
          })
          resolve(true)
        })()

      }
    }
  })
}
