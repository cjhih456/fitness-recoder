import type { StoreObject, OperationVariables } from '@apollo/client'
import type { ExercisePreset } from '@fitness/struct'

export type ExercisePresetStoreType = ExercisePreset.Data & StoreObject
export type ExercisePresetWithListStoreType = ExercisePreset.WithExerciseList & StoreObject

export type GetExercisePresetWithListByIdResponse = { getExercisePresetWithListById: ExercisePresetWithListStoreType }
export type GetExercisePresetWithListByIdVariable = { id: number } & OperationVariables

export type GetExercisePresetWithListByOffsetResponse = { getExercisePresetWithListByOffset: ExercisePresetWithListStoreType[] }
export type GetExercisePresetWithListByOffsetVariable = { offset: number, size: number }
