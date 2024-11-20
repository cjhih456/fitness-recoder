import { useGetSetListByExerciseId, useLazyGetSetListByExerciseId } from './GetSetListByExerciseId'
import { useCreateSet } from './CreateSet'
import { useUpdateSet } from './UpdateSet'
import { useDeleteSet } from './DeleteSet'
import { Sets } from 'fitness-struct'

export {
  useGetSetListByExerciseId,
  useLazyGetSetListByExerciseId,
  useCreateSet,
  useUpdateSet,
  useDeleteSet,
}

export const SetMockData: { [key: number]: Sets.Sets } = Array(20).fill(0).reduce((acc, cur, idx) => {
  const id = idx + 1
  acc[id] = {
    id: id,
    exerciseId: idx,
    isDone: idx % 2 ? true : false,
    repeat: 10,
    weightUnit: 'kg',
    weight: 20
  }
  return acc
}, {})