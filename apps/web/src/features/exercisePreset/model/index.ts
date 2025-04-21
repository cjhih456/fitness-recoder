import type { ExercisePresetStoreType } from '@entities/exercisePreset/model'

export type CreateExercisePresetResponse = { createExercisePreset: ExercisePresetStoreType }
export type CreateExercisePresetVariable = { exercisePreset: { name: string } }

export type DeleteExercisePresetResponse = { deleteExercisePreset: string }
export type DeleteExercisePresetVariable = { id: number }
