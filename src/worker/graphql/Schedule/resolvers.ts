import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';
import { deleteExerciseByIdsTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
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
    },
    async getScheduleStatusByDate(_source, { year, month }, context) {
      const result = await dbTransitionBus?.sendTransaction(
        context.client,
        'selects', 'select year, month, date, group_concat(type) as type from schedule where year=? and month=? group by year, month, date',
        [year, month]
      ) as { year: number, month: number, date: number, type: string }[]
      return result.reduce((acc, cur) => {
        acc[cur.date] = cur.type
        return acc
      }, [] as string[])
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
            return result ? resolve({ ...result[0], ...schedule }) : reject(null)
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
    async deleteSchedule(_source, { id }, context) {
      const list = await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        id
      )
      await deleteExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        list?.map(v => v.id) || []
      )
      await dbTransitionBus?.sendTransaction(
        context.client,
        'delete',
        'delete from schedule where id=?',
        [id]
      )
      return `delete - schedule - ${id}`
    }
  }
})