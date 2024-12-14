import type { Exercise } from 'fitness-struct'
import { gql } from '@apollo/client'
import { useCreateExerciseByExercisePreset } from './CreateExerciseByExercisePreset'
import { useCreateExerciseBySchedule } from './CreateExerciseBySchedule'
import { useDeleteExerciseById } from './DeleteExerciseById'
import { useGetExerciseFinishHistory, useLazyGetExerciseFinishHistory } from './GetExerciseFinishHistory'
import { useGetExerciseListByExercisePresetId, useLazyGetExerciseListByExercisePresetId } from './GetExerciseListByExercisePresetId'
import { useGetExerciseListByScheduleId, useLazyGetExerciseListByScheduleId } from './GetExerciseListByScheduleId'
import { useUpdateExerciseListByExercisePresetId } from './UpdateExerciseListByExercisePresetId'
import { useUpdateExerciseListByScheduleId } from './UpdateExerciseListByScheduleId'

export const ExerciseFragment = gql`
fragment ExerciseFragment on Exercise {
  id
  deps
  exercise
}`

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
