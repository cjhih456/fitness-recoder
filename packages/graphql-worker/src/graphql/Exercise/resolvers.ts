import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { Exercise } from '@fitness/struct'
import type { IResolvers } from '@graphql-tools/utils';
import {
  getExerciseByIds,
  getExerciseByScheduleId,
  getExerciseByExercisePresetId,
  createExerciseByIds,
  createExerciseWithScheduleRelation,
  deleteExerciseByIds,
  updateExercise,
  createExerciseWithExercisePresetRelation,
  getExerciseFinishHistory,
} from './repository';
import {
  loadFitnessByExerciseList,
  loadFitnessByExercise,
} from './service';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => {
  const getExerciseByIdShell: ResponseResolver<{ id: number }, Exercise.Data | null> = async (_, { id }, { client }) => {
    const data = await getExerciseByIds(dbTransitionBus, { client }, { ids: id })
    if (!data) return null
    return loadFitnessByExercise(dbTransitionBus, { client }, { exercise: data[0] })
  }
  const getExerciseListByIdsShell: ResponseResolver<{ ids: number[] }, Exercise.Data[]> = async (_, { ids }, { client }) => {
    const result = await getExerciseByIds(dbTransitionBus, { client }, { ids })
    return await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList: result })
  }
  const getExerciseListByScheduleIdShell: ResponseResolver<{ scheduleId: number }, Exercise.Data[]> = async (_, { scheduleId }, { client }) => {
    const result = await getExerciseByScheduleId(dbTransitionBus, { client }, { scheduleId })
    return await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList: result })
  }
  const getExerciseListByExercisePresetIdShell: ResponseResolver<{ exercisePresetId: number }, Exercise.Data[]> = async (_, { exercisePresetId }, { client }) => {
    const result = await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId })
    return await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList: result })
  }
  const getExerciseFinishHistoryShell: ResponseResolver<{ exerciseId: number }, Exercise.HistoryData[]> = async (_, { exerciseId }, { client }) => {
    return await getExerciseFinishHistory(dbTransitionBus, { client }, { exerciseId })
  }
  const createExerciseByScheduleShell: ResponseResolver<{
    exercise: {
      scheduleId: number,
      fitnessIds: number[]
    }
  }, Exercise.Data[] | null> = async (_, { exercise }, { client }) => {
    const { scheduleId, fitnessIds } = exercise
    if (!dbTransitionBus) return null
    const newExerciseList = await createExerciseByIds(
      dbTransitionBus,
      { client },
      { fitnessIds }
    )
    await createExerciseWithScheduleRelation(
      dbTransitionBus,
      { client },
      { scheduleId, exerciseList: newExerciseList }
    )
    return await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList: newExerciseList })
  }

  const createExerciseByExercisePresetShell: ResponseResolver<{
    exercise: {
      exercisePresetId: number,
      fitnessIds: number[]
    }
  }, Exercise.Data[] | null> = async (_, { exercise }, { client }) => {
    if (!dbTransitionBus) return null
    const { exercisePresetId, fitnessIds } = exercise
    const newExerciseList = await createExerciseByIds(
      dbTransitionBus,
      { client },
      { fitnessIds }
    )
    await createExerciseWithExercisePresetRelation(
      dbTransitionBus,
      { client },
      { exercisePresetId, exerciseList: newExerciseList }
    )
    return await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList: newExerciseList })
  }

  const updateExerciseShell: ResponseResolver<{ exercise: { id: number, fitnessId: number } }, Exercise.Data | null> = async (_, { exercise }, { client }) => {
    return await updateExercise(dbTransitionBus, { client }, exercise)
  }
  const deleteExerciseByIdShell: ResponseResolver<{ id: number }, string> = async (_, { id }, { client }) => {
    return await deleteExerciseByIds(dbTransitionBus, { client }, { ids: [id] })
  }
  const deleteExerciseByIdsShell: ResponseResolver<{ ids: number[] }, string> = async (_, { ids }, { client }) => {
    return await deleteExerciseByIds(dbTransitionBus, { client }, { ids })
  }
  return {
    Query: {
      getExerciseById: getExerciseByIdShell,
      getExerciseListByIds: getExerciseListByIdsShell,
      getExerciseListByScheduleId: getExerciseListByScheduleIdShell,
      getExerciseListByExercisePresetId: getExerciseListByExercisePresetIdShell,
      getExerciseFinishHistory: getExerciseFinishHistoryShell
    },
    Mutation: {
      createExerciseBySchedule: createExerciseByScheduleShell,
      createExerciseByExercisePreset: createExerciseByExercisePresetShell,
      updateExercise: updateExerciseShell,
      deleteExerciseById: deleteExerciseByIdShell,
      deleteExerciseByIds: deleteExerciseByIdsShell
    }
  }
}