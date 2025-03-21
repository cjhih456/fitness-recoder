import type { Exercise } from 'fitness-struct'
import useCreateExerciseByExercisePreset from './useCreateExerciseByExercisePreset'
import useCreateExerciseBySchedule from './useCreateExerciseBySchedule'
import useDeleteExerciseById from './useDeleteExerciseById'
import useGetExerciseFinishHistory from './useGetExerciseFinishHistory'
import useGetExerciseListByExercisePresetId from './useGetExerciseListByExercisePresetId'
import useGetExerciseListByScheduleId from './useGetExerciseListByScheduleId'
import useLazyGetExerciseFinishHistory from './useLazyGetExerciseFinishHistory'
import useLazyGetExerciseListByExercisePresetId from './useLazyGetExerciseListByExercisePresetId'
import useLazyGetExerciseListByScheduleId from './useLazyGetExerciseListByScheduleId'
import useUpdateExerciseListByExercisePresetId from './useUpdateExerciseListByExercisePresetId'
import useUpdateExerciseListByScheduleId from './useUpdateExerciseListByScheduleId'

export {
  useCreateExerciseBySchedule,
  useCreateExerciseByExercisePreset,

  useGetExerciseFinishHistory,
  useLazyGetExerciseFinishHistory,
  useGetExerciseListByScheduleId,
  useLazyGetExerciseListByScheduleId,
  useGetExerciseListByExercisePresetId,
  useLazyGetExerciseListByExercisePresetId,

  useDeleteExerciseById,
  useUpdateExerciseListByScheduleId,
  useUpdateExerciseListByExercisePresetId,
}

export const ExerciseMockData: { [key: number]: Exercise.Data } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  const temp: Exercise.Data = {
    deps: 0,
    exercise: i,
    id
  }
  acc[id] = temp
  return acc
}, {})
