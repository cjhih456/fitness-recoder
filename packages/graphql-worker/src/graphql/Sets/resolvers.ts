import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Sets } from '@fitness/struct';
import { getSetByIds, getSetById, getSetListByExerciseId, createSet, updateSet, deleteSetById } from './service';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => {
  const getSetByIdsShell: ResponseResolver<{ ids: number[] }, Sets.Set[]> = async (_, { ids }, { client }) => {
    return getSetByIds(dbTransitionBus, { client }, { ids })
  }
  const getSetByIdShell: ResponseResolver<{ id: number }, Sets.Set | null> = async (_, { id }, { client }) => {
    return getSetById(dbTransitionBus, { client }, { id })
  }
  const getSetListByExerciseIdShell: ResponseResolver<{ id: number }, Sets.Set[]> = async (_, { id }, { client }) => {
    return getSetListByExerciseId(dbTransitionBus, { client }, { id })
  }
  const createSetShell: ResponseResolver<{ sets: Sets.CreateType }, Sets.Set | null> = async (_, { sets }, { client }) => {
    return createSet(dbTransitionBus, { client }, { sets })
  }
  const updateSetShell: ResponseResolver<{ sets: Sets.Set }, Sets.Set | null> = async (_, { sets }, { client }) => {
    return updateSet(dbTransitionBus, { client }, { sets })
  }
  const deleteSetByIdShell: ResponseResolver<{ id: number }, string | null> = async (_, { id }, { client }) => {
    return deleteSetById(dbTransitionBus, { client }, { id })
  }
  return {
    Query: {
      getSetByIds: getSetByIdsShell,
      getSetById: getSetByIdShell,
      getSetListByExerciseId: getSetListByExerciseIdShell
    },
    Mutation: {
      createSet: createSetShell,
      updateSet: updateSetShell,
      deleteSetById: deleteSetByIdShell
    }
  }
}