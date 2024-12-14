import type { StoreObject } from '@apollo/client';
import type { Sets } from 'fitness-struct'
import { gql } from '@apollo/client'
import { useCreateSet } from './CreateSet'
import { useDeleteSet } from './DeleteSet'
import { useGetSetListByExerciseId, useLazyGetSetListByExerciseId } from './GetSetListByExerciseId'
import { useUpdateSet } from './UpdateSet'

export type SetsStoreType = Sets.Sets & StoreObject

export const SetsFragment = gql`
fragment SetsFragment on Sets {
  id
  exerciseId
  duration
  isDone
  repeat
  weight
  weightUnit
}`

export {
  useGetSetListByExerciseId,
  useLazyGetSetListByExerciseId,
  useCreateSet,
  useUpdateSet,
  useDeleteSet,
}

export const SetMockData: { [key: number]: SetsStoreType } = Array(20).fill(0).reduce<{ [k: number]: SetsStoreType }>((acc, _cur, idx) => {
  const id = idx + 1
  acc[id] = {
    id: id,
    exerciseId: idx,
    isDone: idx % 2 ? true : false,
    duration: 0,
    repeat: 10,
    weightUnit: 'kg',
    weight: 20
  }
  return acc
}, {})