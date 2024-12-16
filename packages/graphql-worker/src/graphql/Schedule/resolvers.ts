import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { ExercisePreset, Schedule } from 'fitness-struct';
import { cloneExerciseList, deleteExerciseByIdsTemp, getExerciseListByExercisePresetIdTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    async getScheduleById(_source, { id }, context) {
      const schedule = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
        context.client,
        'select', 'select * from schedule where id=?',
        [id]
      )
      return schedule || null
    },
    async getScheduleByDate(_source, { year, month, date }, context) {
      const scheduleList = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
        context.client,
        'selects', 'select * from schedule where year=? and month=? and date=?',
        [year, month, date]
      )
      return scheduleList || []
    },
    async getScheduleStatusByDate(_source, { year, month }, context) {
      const result = await dbTransitionBus?.sendTransaction<{ year: number, month: number, date: number, type: string }>(
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
      const result = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
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
      const result = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
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
      const originalSchedule = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
        context.client,
        'select',
        'select * from schedule where id=?',
        [id]
      );

      if (!originalSchedule) {
        throw new Error('Cannot find Schedule');
      }

      const newSchedule = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
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
          'SCHEDULED'
        ]
      );

      if (!newSchedule || !newSchedule[0]) return null;

      const exercises = await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        id
      );

      if (exercises && exercises.length > 0) {
        const newExerciseList = await cloneExerciseList(dbTransitionBus, context.client, exercises)
        const values = newExerciseList.map(v => [newSchedule[0].id, v.id])
        const sqlPattern = Array(values.length).fill('(?,?)').join(',')
        await dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          `insert into schedule_exercise (scheduleId, exerciseId) values ${sqlPattern}`,
          values.flat()
        );
      }

      return newSchedule[0];
    },
    async cloneScheduleFromPreset(_source, { presetId, targetDate }, context) {
      const preset = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
        context.client,
        'select',
        'select * from exercisePreset where id=?',
        [presetId]
      )
      if (!preset) {
        throw new Error('Cannot find ExercisePreset')
      }

      const newSchedule = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
        context.client,
        'insert',
        'insert into schedule (year, month, date, beforeTime, start, breakTime, workoutTimes, type) values (?,?,?,?,?,?,?,?)',
        [targetDate.year, targetDate.month, targetDate.date, 0, 0, 0, 0, 'SCHEDULED']
      )

      if (!newSchedule || !newSchedule[0]) return null
      const exercises = await getExerciseListByExercisePresetIdTemp(
        dbTransitionBus,
        context.client,
        presetId
      );

      if (exercises && exercises.length > 0) {
        const newExerciseList = await cloneExerciseList(dbTransitionBus, context.client, exercises)
        const values = newExerciseList.map(v => [newSchedule[0].id, v.id])
        const sqlPattern = Array(values.length).fill('(?,?)').join(',')
        await dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          `insert into schedule_exercise (scheduleId, exerciseId) values ${sqlPattern}`,
          values.flat()
        );
      }

      return newSchedule[0];
    }
  }
})