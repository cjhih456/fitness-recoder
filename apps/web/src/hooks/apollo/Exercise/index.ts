import useCreateExerciseByExercisePreset from './useCreateExerciseByExercisePreset'
import useCreateExerciseBySchedule from './useCreateExerciseBySchedule'
import useDeleteExerciseById from './useDeleteExerciseById'
import useGetExerciseFinishHistory from './useGetExerciseFinishHistory'
import useGetExerciseListByExercisePresetId from './useGetExerciseListByExercisePresetId'
import useGetExerciseListByScheduleId from './useGetExerciseListByScheduleId'
import useLazyGetExerciseFinishHistory from './useLazyGetExerciseFinishHistory'
import useUpdateExerciseListByExercisePresetId from './useUpdateExerciseListByExercisePresetId'
import useUpdateExerciseListByScheduleId from './useUpdateExerciseListByScheduleId'

export {
  useCreateExerciseBySchedule,
  useCreateExerciseByExercisePreset,

  useGetExerciseFinishHistory,
  useLazyGetExerciseFinishHistory,
  useGetExerciseListByScheduleId,
  useGetExerciseListByExercisePresetId,

  useDeleteExerciseById,
  useUpdateExerciseListByScheduleId,
  useUpdateExerciseListByExercisePresetId,
}

export const ExerciseMockData: { [key: number]: ExerciseDataStoreType } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  const temp: ExerciseDataStoreType = {
    deps: 0,
    exercise: i,
    id,
    __typename: 'Exercise'
  }
  acc[id] = temp
  return acc
}, {})
