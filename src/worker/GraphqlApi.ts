import { createHandler } from 'graphql-http/lib/use/fetch'
import { mergeSchemas } from '@graphql-tools/schema'
import Sqlite3 from './Sqlite3'
import SetsInit from './graphql/Sets'
import ExerciseInit from './graphql/Exercise'
import ScheduleInit from './graphql/Schedule'

import MessageTransactionBus from './transaction/MessageTransactionBus'
import { TimestampSchema } from './graphql/ScalaType/Timestamp'

declare const self: ServiceWorkerGlobalScope

export type Version = number

export const version: Version = 1

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined

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
  if (!(dbTransitionBus && parent.handlers.set)) {
    dbTransitionBus = new MessageTransactionBus<any>()
    dbTransitionBus.setClients(self.clients)

    parent.handlers.set = createHandler({
      schema: mergeSchemas({
        schemas: [
          TimestampSchema,
          SetsInit(dbTransitionBus),
          ExerciseInit(dbTransitionBus),
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
  if (url.match(/\/db/)) {
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
  }
}
