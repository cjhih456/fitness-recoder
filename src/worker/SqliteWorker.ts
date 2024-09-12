import Sqlite3 from './Sqlite3'
import createExercisePresetTable from './graphql/ExercisePreset/create'
import createExerciseTable from './graphql/Exercise/create'
import createSetTable from './graphql/Sets/create'
import createScheduleTable from './graphql/Schedule/create'

const parent = { db: undefined, handlers: {}, origin: '' } as {
  db: Sqlite3 | undefined
  handlers: { set: (r: Request) => Promise<Response> }
  origin: string
}

self.addEventListener('message', async (e: MessageEvent) => {
  const data = e.data as SqliteMessage
  if (!parent.db?.ready)
    await new Promise<void>((resolve) => {
      setInterval(() => {
        if (parent.db?.ready) {
          resolve()
        }
      }, 50)
    })


  switch (data.type) {
    case 'insert': {
      const result = parent.db?.exec(data.query + 'RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result || null : null,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'select': {
      const result = parent.db?.selectObject(data.query, data.bindArgs)
      self.postMessage({
        object: result,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'selects': {
      const result = parent.db?.selectObjects(data.query, data.bindArgs)
      self.postMessage({
        object: result || [],
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'delete':
    case 'update': {
      const result = parent.db?.exec(data.query + 'RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result : null,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
  }
})

parent.db = new Sqlite3()
parent.db.init().then(async () => {
  if (parent.db) {
    createExerciseTable(parent.db)
    createExercisePresetTable(parent.db)
    createScheduleTable(parent.db)
    createSetTable(parent.db)
  }
})