import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

export default (dbTransitionBus: MessageTransactionBus<any> | undefined): IResolvers<any, any> => ({
  Query: {
    getScheduleById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'select', 'select * from schedule where id=?',
          [id],
          (result: any) => {
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
            result ? resolve(result) : reject([])
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
          'insert into schedule (year, month, date, beforeTime, start, breakTime, workoutTimes, type) values (?,?,?,?,?,?,?,?)',
          [
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
            return result ? resolve({ ...result, ...schedule }) : reject(null)
          }
        )

      })
    },
    updateSchedule(_source, { schedule }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'update',
          'update schedule set year=?, month=?, date=?, beforeTime=?, start=?, breakTime=?, workoutTimes=?, type=? where id=?',
          [
            schedule.year,
            schedule.month,
            schedule.date,
            schedule.beforeTime,
            schedule.start,
            schedule.breakTime,
            schedule.workoutTimes,
            schedule.type,
            schedule.id
          ],
          (result) => {
            return result && result[0] ? resolve(result[0]) : reject(null)
          }
        )
      })
    },
    deleteSchedule() {

    }
  }
})