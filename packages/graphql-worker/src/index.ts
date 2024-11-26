import { createHandler } from 'graphql-http/lib/use/fetch'
import { mergeSchemas } from '@graphql-tools/schema'
import SetsInit from './graphql/Sets'
import ExerciseInit from './graphql/Exercise'
import ScheduleInit from './graphql/Schedule'
import ExercisePresetInit from './graphql/ExercisePreset'
import FitnessInit from './graphql/Fitness'
import MessageTransactionBus from './transaction/MessageTransactionBus'
import { SqliteMessage } from 'sqlite-message-types'

declare const self: ServiceWorkerGlobalScope

export type Version = number

export const version: Version = 1

function baseURL(url?: string) {
  return (import.meta.env.VITE_URL_ROOT + (url ?? '')).replace(/\/\//g, '/')
}

let dbTransitionBus: MessageTransactionBus | undefined = undefined

const parent: {
  handlers?: (_r: Request) => Promise<Response>
} = { handlers: undefined }


self.oninstall = () => {
  self.skipWaiting()
}

self.onmessage = (e) => {
  if ('txid' in e.data && 'object' in e.data && 'type' in e.data) {
    const result = e.data as SqliteMessage.Result
    dbTransitionBus && dbTransitionBus.gotResult(result.txid, result.object)
  }
}

self.onactivate = (event) => {
  if (!dbTransitionBus) {
    dbTransitionBus = new MessageTransactionBus()
  }
  dbTransitionBus.setClients(self.clients)
  event.waitUntil(self.clients.claim())
}

function timeout() {
  return new Promise<Response>(resolve => {
    setTimeout(() => {
      resolve(new Response(null, {
        status: 408,
      }))
    }, 3000)
  })
}

self.onfetch = async (event) => {
  const path = new URL(self.serviceWorker.scriptURL)
  if (event.request.url.match(/(json|svg|(j|t)sx?|css|wasm)/)) return
  if (!dbTransitionBus) {
    dbTransitionBus = new MessageTransactionBus()
  }
  if (!parent.handlers) {
    parent.handlers = createHandler({
      schema: mergeSchemas({
        schemas: [
          SetsInit(dbTransitionBus),
          ExerciseInit(dbTransitionBus),
          ExercisePresetInit(dbTransitionBus),
          ScheduleInit(dbTransitionBus),
          FitnessInit(dbTransitionBus)
        ]
      }),
      context: (req) => {
        const obj = Object.create(null)
        if (typeof req.headers.get === 'function') {
          obj.client = req.headers.get('x-client')
        }
        return obj
      }
    })
  }
  dbTransitionBus?.setClients(self.clients)
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
      event.respondWith(
        Promise.race([
          timeout(),
          parent.handlers(request)
        ])
      )
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
    event.respondWith(
      Promise.race([
        timeout(),
        fetch(request)
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
          })
      ])
    )
  }
}
