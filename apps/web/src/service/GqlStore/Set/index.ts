import { useGetSetListByExerciseId, useLazyGetSetListByExerciseId } from './GetSetListByExerciseId'
import { useCreateSet } from './CreateSet'
import { useUpdateSet } from './UpdateSet'
import { useDeleteSet } from './DeleteSet'
import { Sets } from 'fitness-struct'
import { gql, StoreObject } from '@apollo/client'

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