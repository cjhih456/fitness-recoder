import { useCreateExerciseByExercisePreset } from './CreateExerciseByExercisePreset'
import { useCreateExerciseBySchedule } from './CreateExerciseBySchedule'
import { useDeleteExerciseById } from './DeleteExerciseById'
import { useGetExerciseListByExercisePresetId, useLazyGetExerciseListByExercisePresetId } from './GetExerciseByExercisePresetId'
import { useGetExerciseFinishHistory, useLazyGetExerciseFinishHistory } from './GetExerciseFinishHistory'
import { useGetExerciseListByScheduleId, useLazyGetExerciseListByScheduleId } from './GetExerciseListByScheduleId'
import { useUpdateExerciseListByExercisePresetId } from './UpdateExerciseListByExercisePresetId'
import { useUpdateExerciseListByScheduleId } from './UpdateExerciseListByScheduleId'


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

export const ExerciseMockData: { [key: number]: ExerciseData } = Array(20).fill(0).reduce((acc, cur, i) => {
  const id = i + 1
  acc[id] = {
    deps: 0,
    exercise: i,
    id
  } as ExerciseData
  return acc
}, {})
