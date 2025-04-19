import type { ExercisePresetStoreType } from '@entities/exercisePreset/model'

export type CreateExercisePresetResponse = { createExercisePreset: ExercisePresetStoreType }
export type CreateExercisePresetVariable = { exercisePreset: { name: string } }

export type DeleteExercisePresetResponse = { deleteExercisePreset: string }
export type DeleteExercisePresetVariable = { id: number }

export type CopyExercisePresetFromScheduleResponse = { copyExercisePresetFromSchedule: ExercisePresetStoreType }
export type CopyExercisePresetFromScheduleVariable = { scheduleId: number, name: string }