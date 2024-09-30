import { createHandler } from 'graphql-http/lib/use/fetch'
import { mergeSchemas } from '@graphql-tools/schema'
import Sqlite3 from './Sqlite3'
import SetsInit from './graphql/Sets'
import ExerciseInit from './graphql/Exercise'
import ScheduleInit from './graphql/Schedule'
import ExercisePresetInit from './graphql/ExercisePreset'
import MessageTransactionBus from './transaction/MessageTransactionBus'

declare const self: ServiceWorkerGlobalScope

export type Version = number

export const version: Version = 1

function baseURL(url?: string) {
  return (import.meta.env.VITE_URL_ROOT + (url ?? '')).replace(/\/\//g, '/')
}

let dbTransitionBus: MessageTransactionBus | undefined = undefined

const parent = { db: undefined, handlers: {}, origin: '' } as {
  db: Sqlite3 | undefined
  handlers: { set: (r: Request) => Promise<Response> }
  origin: string
}


self.oninstall = () => {
  self.skipWaiting()
}

self.onmessage = (e) => {
  if ('txid' in e.data && 'object' in e.data && 'type' in e.data) {
    const result = e.data as SqliteResultType
    dbTransitionBus && dbTransitionBus.gotResult(result.txid, result.object)
  }
}

self.onactivate = (event) => {
  event.waitUntil(self.clients.claim())
}

self.onfetch = async (event) => {
  const path = new URL(self.serviceWorker.scriptURL)
  if (!event.request.url.startsWith(path.origin + baseURL('/'))) return
  if (!(dbTransitionBus && parent.handlers.set)) {
    dbTransitionBus = new MessageTransactionBus()
    dbTransitionBus.setClients(self.clients)

    parent.handlers.set = createHandler({
      schema: mergeSchemas({
        schemas: [
          SetsInit(dbTransitionBus),
          ExerciseInit(dbTransitionBus),
          ExercisePresetInit(dbTransitionBus),
          ScheduleInit(dbTransitionBus)
        ]
      }),
      context: (req) => {
        if (typeof req.headers.get === 'function') {
          const client = req.headers.get('x-client')
          return { client }
        }
        return {}
      }
    })
  }
  const url = event.request.url
  if (url === path.origin + baseURL('/db')) {
    if (event.clientId) {
      const newHeaders = new Headers(event.request.headers)
      /**
       * Add Client Id on header.
       * That value are need when send message to client in GraphQL.
       */
      newHeaders.set('x-client', event.clientId)
      const request = new Request(event.request, {
        headers: newHeaders
      })
      event.respondWith(parent.handlers?.set(request))
    }
  } else {
    const r = event.request
    if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') {
      return
    }
    const request = r.mode === 'no-cors'
      ? new Request(r, {
        credentials: 'omit'
      })
      : r
    event.respondWith(fetch(request)
      .then((response) => {
        if (response.status === 0) {
          return response
        }
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
        newHeaders.set('Cross-Origin-Resource-Policy', 'same-origin')
        newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')
        // newHeaders.set('Access-Control-Allow-Origin', 'https://www.youtube.com')
        newHeaders.set('Service-Worker-Allowed', baseURL('/'))

        return new Response(response.body, {
          status: 200,
          statusText: 'OK',
          headers: newHeaders
        })
      }))
  }
}
