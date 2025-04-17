type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables
type Preset = import('@fitness/struct').ExercisePreset.Data
type PresetWithExerciseList = import('@fitness/struct').ExercisePreset.WithExerciseList

declare type ExercisePresetStoreType = Preset & StoreObject
declare type ExercisePresetWithListStoreType = PresetWithExerciseList & StoreObject

declare interface CreateExercisePresetResponse { createExercisePreset: ExercisePresetStoreType }
declare interface CreateExercisePresetVariable { exercisePreset: { name: string } }

declare interface DeleteExercisePresetResponse { deleteExercisePreset: string }
declare interface DeleteExercisePresetVariable { id: number }

declare type GetExercisePresetWithListByIdResponse = { getExercisePresetWithListById: ExercisePresetWithListStoreType }
declare type GetExercisePresetWithListByIdVariable = { id: number } & OperationVariables

declare type GetExercisePresetWithListByOffsetResponse = { getExercisePresetWithListByOffset: ExercisePresetWithListStoreType[] }
declare type GetExercisePresetWithListByOffsetVariable = { offset: number, size: number }

declare type CopyExercisePresetFromScheduleResponse = { copyExercisePresetFromSchedule: ExercisePresetStoreType }
declare type CopyExercisePresetFromScheduleVariable = { scheduleId: number, name: string }