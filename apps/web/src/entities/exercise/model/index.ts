import type { StoreObject } from '@apollo/client'
import type { Exercise, Fitness } from '@fitness/struct'

export type ExerciseDataStoreType = Exercise.Data & StoreObject & {
  fitness: Fitness.IFitness
}

// GetExerciseFinishHistory
export interface GetExerciseFinishHistoryResponse {
  getExerciseFinishHistory: Exercise.HistoryData[]
}
export interface GetExerciseFinishHistoryVariable {
  exerciseId: number
}

// GetExerciseByExercisePresetId
export interface GetExerciseByExercisePresetIdResponse {
  getExerciseListByExercisePresetId: ExerciseDataStoreType[]
}
export interface GetExerciseByExercisePresetIdVariable {
  exercisePresetId: number
}

// GetExerciseListByScheduleId
export interface GetExerciseListByScheduleIdResponse {
  getExerciseListByScheduleId: ExerciseDataStoreType[]
}
export interface GetExerciseListByScheduleIdVariable {
  scheduleId: number
}
