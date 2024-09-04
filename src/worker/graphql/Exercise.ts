import MessageTransactionBus from '../transaction/MessageTransactionBus';
import Sqlite3 from '../Sqlite3';
import ExerciseSchema from './Exercise.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';

export const createExerciseTable = (db: Sqlite3) => {
  db.exec(`CREATE TABLE IF NOT EXISTS exercise (
      id TEXT PRIMARY KEY AUTOINCREMENT,
      exercise INTEGER,
      deps INTEGER
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS exercisePreset (
      id TEXT PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      deps INTEGER,
      createdAt INTEGER
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS exercisePreset_exercise (
      exercisePresetId TEXT REFERENCES exercisePreset(id),
      exerciseId TEXT REFERENCES exercise(id)
    )`)
}

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined
export function init(txBus: MessageTransactionBus<any>) {
  dbTransitionBus = txBus
}

export const schema = makeExecutableSchema({
  typeDefs: ExerciseSchema,
  resolvers: {
    Query: {
      getExerciseById(_source, { id }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'select',
            'select * from exercise where id=?',
            [id],
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      },
      getExerciseByIds(_source, { ids }, context) {
        return new Promise((resolve, reject) => {
          const temp = new Array(ids.length).fill('?').join(', ')
          dbTransitionBus?.sendTransaction(
            context.client,
            'select',
            `select * from exercise where id in (${temp})`,
            ids,
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      },
      getExerciseByExercisePresetId(_source, { id }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'selects',
            'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId = ?)',
            id,
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      },
      getExercisePresetByIds(_source, { ids }, context) {
        return new Promise((resolve, reject) => {
          const temp = new Array(ids.length).fill('?').join(', ')
          dbTransitionBus?.sendTransaction(
            context.client,
            'select',
            `select * from exercisePreset where id in (${temp})`,
            ids,
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      },
      getExercisePresetById(_source, { id }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'select',
            'select * from exercisePreset where id=?',
            [id],
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      }
    }
  }
})