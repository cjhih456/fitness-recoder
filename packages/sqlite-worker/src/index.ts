import type { SqliteMessage } from 'sqlite-message-types'
import sort from 'version-sort'
import Sqlite3 from './Sqlite3'
import createExerciseTable, { migrate as migrateExercise } from './create/Exercise'
import createExercisePresetTable, { migrate as migrateExercisePreset } from './create/ExercisePreset'
import createFitnessTable, { checkFitnessDataLength, insertFitnessData, migrate as migrateFitness } from './create/Fitness'
import createScheduleTable, { migrate as migrateSchedule } from './create/Schedule'
import createSetTable, { migrate as migrateSets } from './create/Sets'
import createVersionTable, { getVersion, updateVersion } from './create/Version'

export interface QueryType {
  sql: string,
  args: any[]
}
export type MigrationQueryBus = Map<Versions, (Promise<QueryType> | QueryType)[]>

self.addEventListener('message', async (e: MessageEvent) => {
  const db = new Sqlite3()
  const data = e.data as SqliteMessage.Message
  if (data.type === 'init') {
    db.init().then(async (create) => {
      if (create) {
        createVersionTable(db)
        createExerciseTable(db)
        createExercisePresetTable(db)
        createFitnessTable(db)
        createScheduleTable(db)
        createSetTable(db)
      }
      const currentVersion = getVersion(db)
      if (__APP_VERSION__ !== currentVersion) {

        const queryStacksByVersion: MigrationQueryBus = new Map()
        migrateFitness(queryStacksByVersion, currentVersion)
        migrateExercise(queryStacksByVersion, currentVersion)
        migrateExercisePreset(queryStacksByVersion, currentVersion)
        migrateSets(queryStacksByVersion, currentVersion)
        migrateSchedule(queryStacksByVersion, currentVersion)
        const result = sort<Versions>(Array.from(queryStacksByVersion.keys()))
        try {
          await db.exec('BEGIN TRANSACTION;')
          for (let v of result) {
            const list = queryStacksByVersion.get(v)
            if (list) {
              await Promise.all(list).then(async (quryObjList) => {
                for (let i = 0; i < quryObjList.length; i++) {
                  await db.exec(quryObjList[i].sql, quryObjList[i].args)
                }
              })
            }
          }
          updateVersion(db, __APP_VERSION__)
          await db.exec('COMMIT TRANSACTION;')
        } catch (e) {
          await db.exec('ROLLBACK TRANSACTION;')
          console.error(e)
        }
      }
      if (checkFitnessDataLength(db) === 0) {
        const { sql, value } = await insertFitnessData()
        db.exec(sql, value)
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
      const result = db?.exec(data.query + ' RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result || null : null,
        txid: data.txid,
        type: data.type
      } as SqliteMessage.Result)
    } break
    case 'select': {
      const result = db?.selectObject(data.query, data.bindArgs)
      self.postMessage({
        object: result,
        txid: data.txid,
        type: data.type
      } as SqliteMessage.Result)
    } break
    case 'selects': {
      const result = db?.selectObjects(data.query, data.bindArgs)
      self.postMessage({
        object: result || [],
        txid: data.txid,
        type: data.type
      } as SqliteMessage.Result)
    } break
    case 'delete':
    case 'update': {
      const result = db?.exec(data.query + ' RETURNING *', data.bindArgs)
      self.postMessage({
        object: result ? result : null,
        txid: data.txid,
        type: data.type
      } as SqliteMessage.Result)
    } break
  }
})
