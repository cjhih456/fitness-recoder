import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';
import { deleteExerciseByIdsTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    getScheduleById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction<Schedule>(
          context.client,
          'select', 'select * from schedule where id=?',
          [id],
          (result) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    getScheduleByDate(_source, { year, month, date }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction<Schedule[]>(
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
      const result = await dbTransitionBus?.sendTransaction<{ year: number, month: number, date: number, type: string }[]>(
        context.client,
        'selects', 'select year, month, date, group_concat(type) as type from schedule where year=? and month=? group by year, month, date',
        [year, month]
      )
      return result?.reduce((acc, cur) => {
        acc[cur.date] = cur.type
        return acc
      }, [] as string[])
    }
  },
  Mutation: {
    async createSchedule(_source, { schedule }, context) {
      const result = await dbTransitionBus?.sendTransaction<Schedule[]>(
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
        ]
      )
      return result && result[0] ? { ...result[0], ...schedule } : null
    },
    async updateSchedule(_source, { schedule }, context) {
      const result = await dbTransitionBus?.sendTransaction<Schedule[]>(
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
        ]
      )
      return result && result[0] || null
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
    },
    async cloneSchedule(_source, { id, targetDate }, context) {
      const originalSchedule = await dbTransitionBus?.sendTransaction<Schedule>(
        context.client,
        'select',
        'select * from schedule where id=?',
        [id]
      );

      if (!originalSchedule) {
        throw new Error('Cannot find Schedule');
      }

      const newSchedule = await dbTransitionBus?.sendTransaction<Schedule[]>(
        context.client,
        'insert',
        'insert into schedule (year, month, date, beforeTime, start, breakTime, workoutTimes, type) values (?,?,?,?,?,?,?,?)',
        [
          targetDate.year,
          targetDate.month,
          targetDate.date,
          originalSchedule.beforeTime,
          originalSchedule.start,
          originalSchedule.breakTime,
          originalSchedule.workoutTimes,
          originalSchedule.type
        ]
      );

      if (!newSchedule || !newSchedule[0]) return null;

      const exercises = await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        id
      );

      if (exercises && exercises.length > 0) {
        for (const exercise of exercises) {
          const newExercise = await dbTransitionBus?.sendTransaction<ExerciseData[]>(
            context.client,
            'insert',
            'insert into exercise (exercise) values (?)',
            [exercise.exercise]
          );

          if (newExercise && newExercise[0]) {
            await dbTransitionBus?.sendTransaction(
              context.client,
              'insert',
              'insert into schedule_exercise (scheduleId, exerciseId) values (?,?)',
              [newSchedule[0].id, newExercise[0].id]
            );

            await dbTransitionBus?.sendTransaction(
              context.client,
              'insert',
              'insert into sets (repeat, isDone, weightUnit, weight, duration, exerciseId) select repeat, 0, weightUnit, weight, duration, ? from sets where exerciseId=?',
              [
                newExercise[0].id,
                exercise.id
              ]
            )
          }

        }
      }

      return newSchedule[0];
    }
  }
})