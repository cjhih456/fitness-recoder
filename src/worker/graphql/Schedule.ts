import MessageTransactionBus from '../transaction/MessageTransactionBus';
import Sqlite3 from '../Sqlite3';
import ScheduleSchema from './Schedule.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';

export function createScheduleTable(db: Sqlite3) {
  db.exec(`CREATE TABLE IF NOT EXISTS schedule (
      id TEXT PRIMARY KEY,
      year INTEGER,
      month INTEGER,
      date INTEGER,
      beforeTime INTEGER,
      breakTime INTEGER,
      workoutTimes INTEGER,
      type TEXT
    )`)
  db.exec(`CREATE TABLE IF NOT EXISTS schedule_exercise (
      scheduleId TEXT REFERENCES schedule(id),
      exerciseId TEXT REFERENCES exercise(id)
    )`)
}

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined

export function init(txBus: MessageTransactionBus<any>) {
  dbTransitionBus = txBus
}

export const schema = makeExecutableSchema({
  typeDefs: ScheduleSchema,
  resolvers: {
    Query: {
      getScheduleById(_source, { id }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'select', 'select * from schedule where id=?',
            [id],
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      },
      getScheduleByDate(_source, { year, month, date }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'selects', 'select * from schedule where year=? and month=? and date=?',
            [year, month, date],
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      }
    },
    Mutation: {
      createSchedule(_source, { schedule }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'insert',
            'insert into schedule (id, year, month, date, beforeTime, start, breakTime, workoutTimes, type) values (?,?,?,?,?,?,?,?,?)',
            [
              schedule.id,
              schedule.year,
              schedule.month,
              schedule.date,
              schedule.beforeTime,
              schedule.start,
              schedule.breakTime,
              schedule.workoutTimes,
              schedule.type
            ],
            (result) => {
              return result ? resolve(schedule) : reject(null)
            }
          )
        })
      },
      updateSchedule() {

      },
      deleteSchedule() {

      }
    }
  }
})

