import useCreateSet from './useCreateSet'
import useDeleteSet from './useDeleteSet'
import useGetSetListByExerciseId from './useGetSetListByExerciseId'
import useUpdateSet from './useUpdateSet'

export {
  useGetSetListByExerciseId,
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
    weight: 20,
    __typename: 'Sets'
  }
  return acc
}, {})