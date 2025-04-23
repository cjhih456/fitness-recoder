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

// DeleteExerciseById
export interface DeleteExerciseByIdResponse {
  deleteExerciseById: string
}
export interface DeleteExerciseByIdVariable {
  id: number
}

// DeleteExerciseByIds
export interface DeleteExerciseByIdsResponse {
  deleteExerciseByIds: string
}
export interface DeleteExerciseByIdsVariable {
  ids: number[]
}