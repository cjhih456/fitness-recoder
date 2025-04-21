import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { ExercisePreset } from '@fitness/struct';
import type { IResolvers } from '@graphql-tools/utils';
import {
  getExerciseByExercisePresetId
} from '../Exercise/repository';
import { loadFitnessByExerciseList } from '../Exercise/service';
import {
  getExercisePresetWithListById,
  getExercisePresetWithListByIds,
  getExercisePresetWithListByOffset,
  createExercisePreset,
  updateExercisePreset,
  deleteExercisePreset,
} from './repository';
import {
  copyExercisePresetFromSchedule
} from './service';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => {
  const getExercisePresetWithListByIdShell: ResponseResolver<{ id: number }, ExercisePreset.WithExerciseList | null> = async (_, { id }, { client }) => {
    const result = await getExercisePresetWithListById(dbTransitionBus, { client }, { id })
    if (!result) return null
    const exerciseList = await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: result.id })
    return Object.assign(result, {
      exerciseList: await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList })
    })
  }
  const getExercisePresetWithListByIdsShell: ResponseResolver<{ ids: number[] }, ExercisePreset.WithExerciseList[] | null> = async (_, { ids }, { client }) => {
    const result = await getExercisePresetWithListByIds(dbTransitionBus, { client }, { ids })
    if (!result) return null

    return await Promise.all(result.map(async (obj) => {
      const exerciseList = await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: obj.id })
      return Object.assign(obj, {
        exerciseList: await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList })
      })
    }))
  }
  const getExercisePresetWithListByOffsetShell: ResponseResolver<{ offset: number, size: number }, ExercisePreset.WithExerciseList[] | null> = async (_, { offset, size }, { client }) => {
    const result = await getExercisePresetWithListByOffset(dbTransitionBus, { client }, { offset, size })
    if (!result) return null
    return await Promise.all(result.map(async (obj) => {
      const exerciseList = await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: obj.id })
      return Object.assign(obj, {
        exerciseList: await loadFitnessByExerciseList(dbTransitionBus, { client }, { exerciseList })
      })
    }))
  }
  const createExercisePresetShell: ResponseResolver<{ exercisePreset: ExercisePreset.CreateType }, ExercisePreset.WithExerciseList | null> = async (_, { exercisePreset }, { client }) => {
    const result = await createExercisePreset(dbTransitionBus, { client }, { exercisePreset })
    if (!result) return null
    return Object.assign(result, {
      exerciseList: await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: result.id })
    })
  }
  const updateExercisePresetShell: ResponseResolver<{ exercisePreset: ExercisePreset.Data }, ExercisePreset.WithExerciseList | null> = async (_, { exercisePreset }, { client }) => {
    const result = await updateExercisePreset(dbTransitionBus, { client }, { exercisePreset })
    if (!result) return null
    return Object.assign(result, {
      exerciseList: await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: result.id })
    })
  }
  const deleteExercisePresetShell: ResponseResolver<{ id: number }, string | null> = async (_, { id }, { client }) => {
    return deleteExercisePreset(dbTransitionBus, { client }, { id })
  }
  const copyExercisePresetFromScheduleShell: ResponseResolver<{ scheduleId: number, name: string }, ExercisePreset.WithExerciseList | null> = async (_, { scheduleId, name }, { client }) => {
    const result = await copyExercisePresetFromSchedule(dbTransitionBus, { client }, { scheduleId, name })
    if (!result) return null
    return Object.assign(result, {
      exerciseList: await getExerciseByExercisePresetId(dbTransitionBus, { client }, { exercisePresetId: result.id })
    })
  }
  return {
    Query: {
      getExercisePresetWithListById: getExercisePresetWithListByIdShell,
      getExercisePresetWithListByIds: getExercisePresetWithListByIdsShell,
      getExercisePresetWithListByOffset: getExercisePresetWithListByOffsetShell,
    },
    Mutation: {
      createExercisePreset: createExercisePresetShell,
      updateExercisePreset: updateExercisePresetShell,
      deleteExercisePreset: deleteExercisePresetShell,
      copyExercisePresetFromSchedule: copyExercisePresetFromScheduleShell,
    }
  }
}
