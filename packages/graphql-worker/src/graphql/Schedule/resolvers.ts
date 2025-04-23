import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { Schedule } from '@fitness/struct';
import type { IResolvers } from '@graphql-tools/utils';
import { getExerciseByScheduleId, createExerciseWithScheduleRelation, getExerciseByExercisePresetId } from '../Exercise/repository';
import { cloneExerciseList } from '../Exercise/service';
import {
  createSchedule,
  deleteSchedule,
  getScheduleByDate,
  getScheduleById,
  getScheduleStatusByMonth,
  updateSchedule
} from './repository';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => {
  const getScheduleByIdShell: ResponseResolver<{ id: number }, Schedule.Data | null> = async (_, { id }, { client }) => {
    return getScheduleById(dbTransitionBus, { client }, { id })
  }
  const getScheduleByDateShell: ResponseResolver<{ year: number, month: number, date: number }, Schedule.Data[] | null> = async (_, { year, month, date }, { client }) => {
    return getScheduleByDate(dbTransitionBus, { client }, { year, month, date })
  }
  const getScheduleStatusByMonthShell: ResponseResolver<{ year: number, month: number }, string[][] | null> = async (_, { year, month }, { client }) => {
    return getScheduleStatusByMonth(dbTransitionBus, { client }, { year, month })
  }
  const createScheduleShell: ResponseResolver<{ schedule: Schedule.CreateType }, Schedule.CreateType | null> = async (_, { schedule }, { client }) => {
    return createSchedule(dbTransitionBus, { client }, { schedule })
  }
  const updateScheduleShell: ResponseResolver<{ schedule: Schedule.Data }, Schedule.Data | null> = async (_, { schedule }, { client }) => {
    return updateSchedule(dbTransitionBus, { client }, { schedule })
  }
  const deleteScheduleShell: ResponseResolver<{ id: number }, string | null> = async (_, { id }, { client }) => {
    return deleteSchedule(dbTransitionBus, { client }, { id })
  }
  const cloneScheduleShell: ResponseResolver<{ id: number, targetDate: Schedule.CreateType }, Schedule.Data | null> = async (_, { id, targetDate }, { client }) => {
    const originalSchedule = await getScheduleById(dbTransitionBus, { client }, { id })
    if (!originalSchedule) {
      throw new Error('Cannot find Schedule')
    }
    const newSchedule = await createSchedule(dbTransitionBus, { client }, {
      schedule: {
        year: targetDate.year,
        month: targetDate.month,
        date: targetDate.date,
        type: 'SCHEDULED'
      }
    })
    if (!newSchedule) {
      throw new Error('Cannot create Schedule')
    }
    const exercises = await getExerciseByScheduleId(
      dbTransitionBus,
      { client },
      { scheduleId: originalSchedule.id }
    )
    if (exercises && exercises.length > 0) {
      const newExerciseList = await cloneExerciseList(dbTransitionBus, { client }, { exerciseList: exercises })
      await createExerciseWithScheduleRelation(
        dbTransitionBus,
        { client },
        {
          scheduleId: newSchedule.id,
          exerciseList: newExerciseList
        }
      )
    }
    return newSchedule
  }
  const cloneScheduleFromPresetShell: ResponseResolver<{ presetId: number, targetDate: Schedule.CreateType }, Schedule.Data | null> = async (_, { presetId, targetDate }, { client }) => {
    const newSchedule = await createSchedule(dbTransitionBus, { client }, {
      schedule: {
        year: targetDate.year,
        month: targetDate.month,
        date: targetDate.date,
        type: 'SCHEDULED'
      }
    })
    if (!newSchedule) {
      throw new Error('Cannot create Schedule')
    }
    const exerciseList = await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: presetId })
    if (exerciseList && exerciseList.length > 0) {
      const newExerciseList = await cloneExerciseList(dbTransitionBus, { client }, { exerciseList })
      await createExerciseWithScheduleRelation(
        dbTransitionBus,
        { client },
        {
          scheduleId: newSchedule.id,
          exerciseList: newExerciseList
        }
      )
    }
    return newSchedule
  }
  return {
    Query: {
      getScheduleById: getScheduleByIdShell,
      getScheduleByDate: getScheduleByDateShell,
      getScheduleStatusByMonth: getScheduleStatusByMonthShell,
    },
    Mutation: {
      createSchedule: createScheduleShell,
      updateSchedule: updateScheduleShell,
      deleteSchedule: deleteScheduleShell,
      cloneSchedule: cloneScheduleShell,
      cloneScheduleFromPreset: cloneScheduleFromPresetShell
    }
  }
}
