import type { StoreObject } from '@apollo/client'
import type { Sets } from '@fitness/struct'

export type SetsStoreType = Sets.Set & StoreObject

export type CreateSetResponse = { createSet: SetsStoreType }
export type CreateSetVariable = { sets: Sets.CreateType }

export type DeleteSetResponse = { deleteSetById: string }
export type DeleteSetVariable = { id: number }

export type GetSetListByExerciseIdResponse = { getSetListByExerciseId: SetsStoreType[] }
export type GetSetListByExerciseIdVariable = { id: number }

export type UpdateSetResponse = { updateSet: SetsStoreType }
export type UpdateSetVariable = { sets: SetsStoreType }
