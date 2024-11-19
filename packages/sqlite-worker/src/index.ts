import Sqlite3 from './Sqlite3'
import createExercisePresetTable from './create/ExercisePreset'
import createExerciseTable from './create/Exercise'
import createSetTable from './create/Sets'
import createScheduleTable from './create/Schedule'

self.addEventListener('message', async (e: MessageEvent) => {
  const db = new Sqlite3()
  const data = e.data as SqliteMessage
  if (data.type === 'init') {
    db.init().then(async (create) => {
      if (create) {
        createExerciseTable(db)
        createExercisePresetTable(db)
        createScheduleTable(db)
        createSetTable(db)
      }
    })
    return
  }

  if (!db?.ready)
    await new Promise<void>((resolve) => {
      setInterval(() => {
        if (db?.ready) {
          resolve()
        }
      }, 50)
    })

  switch (data.type) {
    case 'insert': {
      const result = db?.exec(data.query + 'RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result || null : null,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'select': {
      const result = db?.selectObject(data.query, data.bindArgs)
      self.postMessage({
        object: result,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'selects': {
      const result = db?.selectObjects(data.query, data.bindArgs)
      self.postMessage({
        object: result || [],
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
    case 'delete':
    case 'update': {
      const result = db?.exec(data.query + 'RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result : null,
        txid: data.txid,
        type: data.type
      } as SqliteResultType)
    } break
  }
})
