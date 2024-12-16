type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables
type HistoryData = import('fitness-struct').Exercise.HistoryData
type Data = import('fitness-struct').Exercise.Data

type ExerciseDataStoreType = Data & Data

// GetExerciseFinishHistory
declare interface GetExerciseFinishHistoryResponse {
  getExerciseFinishHistory: HistoryData[]
}
declare interface GetExerciseFinishHistoryVariable {
  exerciseId: number
}


// DeleteExerciseById
declare interface DeleteExerciseByIdResponse {
  deleteExerciseById: string
}
declare interface DeleteExerciseByIdVariable {
  id: number
}

// CreateExerciseBySchedule
declare interface CreateExerciseByScheduleResponse {
  createExerciseBySchedule: ExerciseDataStoreType
}
declare interface CreateExerciseByScheduleVariable {
  exercise: { scheduleId: number, exerciseId: number[] }
}

// CreateExerciseByExercisePreset
declare interface CreateExerciseByExercisePresetResponse {
  createExerciseByExercisePreset: ExerciseDataStoreType
}
declare interface CreateExerciseByExercisePresetVariable {
  exercise: { exercisePreset: number, exerciseId: number[] }
}

// GetExerciseByExercisePresetId
declare interface GetExerciseByExercisePresetIdResponse {
  getExerciseListByExercisePresetId: ExerciseDataStoreType[]
}
declare interface GetExerciseByExercisePresetIdVariable {
  exercisePresetId: number
}

// GetExerciseListByScheduleId
declare interface GetExerciseListByScheduleIdResponse {
  getExerciseListByScheduleId: ExerciseDataStoreType[]
}
declare interface GetExerciseListByScheduleIdVariable {
  scheduleId: number
}

// UpdateExerciseListByExercisePresetId
declare interface UpdateExerciseListByExercisePresetIdResponse {
  updateExerciseListByExercisePresetId: ExerciseDataStoreType[]
}
declare interface UpdateExerciseListByExercisePresetIdVariable {
  exercisePresetId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}

// UpdateExerciseListByScheduleId
declare interface UpdateExerciseListByScheduleIdResponse {
  updateExerciseListByScheduleId: ExerciseDataStoreType[]
}
declare interface UpdateExerciseListByScheduleIdVariable {
  scheduleId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}
