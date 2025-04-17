import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Exercise } from '@fitness/struct'
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
    scheduleId: number,
    fitnessIds: number[]
  }, Exercise.Data | null> = async (_, { scheduleId, fitnessIds }, { client }) => {
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
    return newExerciseList[0] || null
  }

  const updateExerciseListByScheduleIdShell: ResponseResolver<{
    scheduleId: number,
    newExercise: number[],
    deleteExerciseId: number[]
  }, Exercise.Data[]> = async (_, { scheduleId, newExercise, deleteExerciseId }, { client }) => {
    await deleteExerciseByIds(dbTransitionBus, { client }, { ids: deleteExerciseId })
    const createdExercise = await createExerciseByIds(dbTransitionBus, { client }, { fitnessIds: newExercise })
    await createExerciseWithScheduleRelation(dbTransitionBus, { client }, { scheduleId, exerciseList: createdExercise })
    return await getExerciseByScheduleId(dbTransitionBus, { client }, { scheduleId })
  }
  const createExerciseByExercisePresetShell: ResponseResolver<{
    exercisePresetId: number,
    fitnessIds: number[]
  }, Exercise.Data | null> = async (_, { exercisePresetId, fitnessIds }, { client }) => {
    if (!dbTransitionBus) return null
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
    return newExerciseList[0] || null
  }
  const updateExerciseListByExercisePresetIdShell: ResponseResolver<{
    exercisePresetId: number,
    newExercise: number[],
    deleteExerciseId: number[]
  }, Exercise.Data[]> = async (_, { exercisePresetId, newExercise, deleteExerciseId }, { client }) => {
    if (deleteExerciseId.length) {
      await deleteExerciseByIds(dbTransitionBus, { client }, { ids: deleteExerciseId })
    }
    if (newExercise.length) {
      const createdExercise = await createExerciseByIds(dbTransitionBus, { client }, { fitnessIds: newExercise })
      await createExerciseWithExercisePresetRelation(dbTransitionBus, { client }, { exercisePresetId, exerciseList: createdExercise })
    }
    return await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId })
  }
  const updateExerciseShell: ResponseResolver<{ id: number, fitnessId: number }, Exercise.Data | null> = async (_, { id, fitnessId }, { client }) => {
    return await updateExercise(dbTransitionBus, { client }, { id, fitnessId })
  }
  const deleteExerciseByIdShell: ResponseResolver<{ id: number }, string> = async (_, { id }, { client }) => {
    return await deleteExerciseByIds(dbTransitionBus, { client }, { ids: id })
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
      updateExerciseListByScheduleId: updateExerciseListByScheduleIdShell,
      createExerciseByExercisePreset: createExerciseByExercisePresetShell,
      updateExerciseListByExercisePresetId: updateExerciseListByExercisePresetIdShell,
      updateExercise: updateExerciseShell,
      deleteExerciseById: deleteExerciseByIdShell
    }
  }
}