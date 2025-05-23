import type { SetsStoreType } from '@entities/set/model'
import type { Sets } from '@fitness/struct'

export type CreateSetResponse = { createSet: SetsStoreType }
export type CreateSetVariable = { sets: Sets.CreateType }

export type DeleteSetResponse = { deleteSetById: string }
export type DeleteSetVariable = { id: number }

export type UpdateSetResponse = { updateSet: SetsStoreType }
export type UpdateSetVariable = { sets: SetsStoreType }
