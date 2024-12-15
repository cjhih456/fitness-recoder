type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables
type Preset = import('fitness-struct').ExercisePreset.Preset
type PresetWithExerciseList = import('fitness-struct').ExercisePreset.PresetWithExerciseList

declare type ExercisePresetStoreType = Preset & StoreObject
declare type ExercisePresetWithListStoreType = PresetWithExerciseList & StoreObject

declare interface CreateExercisePresetResponse { createExercisePreset: ExercisePresetStoreType }
declare interface CreateExercisePresetVariable { exercisePreset: { name: string } }

declare interface DeleteExercisePresetResponse { deleteExercisePreset: string }
declare interface DeleteExercisePresetVariable { id: number }

declare interface GetExercisePresetResponse { getExercisePresetById: ExercisePresetStoreType }
declare type GetExercisePresetVariable = { id: number } & OperationVariables

declare type GetExercisePresetWithListByIdResponse = { getExercisePresetWithListById: ExercisePresetWithListStoreType }
declare type GetExercisePresetWithListByIdVariable = { id: number } & OperationVariables

declare type GetExercisePresetWithListListResponse = { getExercisePresetWithListList: ExercisePresetWithListStoreType[] }
declare type GetExercisePresetWithListListVariable = { offset: number, size: number }

declare type SaveScheduleAsExercisePresetResponse = { saveScheduleAsExercisePreset: ExercisePresetStoreType }
declare type SaveScheduleAsExercisePresetVariable = { scheduleId: number, name: string }