import type { ExerciseDataStoreType } from '@entities/exercise/model'
import type { Exercise } from '@fitness/struct'

// CreateExerciseBySchedule
export interface CreateExerciseByScheduleResponse {
  createExerciseBySchedule: Exercise.Data[]
}
export interface CreateExerciseByScheduleVariable {
  exercise: { scheduleId: number, fitnessIds: number[] }
}

// CreateExerciseByExercisePreset
export interface CreateExerciseByExercisePresetResponse {
  createExerciseByExercisePreset: ExerciseDataStoreType[]
}
export interface CreateExerciseByExercisePresetVariable {
  exercise: { exercisePresetId: number, fitnessIds: number[] }
}

// UpdateExerciseListByExercisePresetId
export interface UpdateExerciseListByExercisePresetIdResponse {
  updateExerciseListByExercisePresetId: ExerciseDataStoreType[]
}
export interface UpdateExerciseListByExercisePresetIdVariable {
  exercisePresetId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}

// UpdateExerciseListByScheduleId
export interface UpdateExerciseListByScheduleIdResponse {
  updateExerciseListByScheduleId: ExerciseDataStoreType[]
}
export interface UpdateExerciseListByScheduleIdVariable {
  scheduleId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}

// DeleteExerciseById
export interface DeleteExerciseByIdResponse {
  deleteExerciseById: string
}
export interface DeleteExerciseByIdVariable {
  id: number
}