import type { StoreObject } from '@apollo/client'
import type { Sets } from '@fitness/struct'

export type SetsStoreType = Sets.Set & StoreObject

export type GetSetListByExerciseIdResponse = { getSetListByExerciseId: SetsStoreType[] }
export type GetSetListByExerciseIdVariable = { id: number }
