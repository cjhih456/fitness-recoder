type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables
type Sets = import('fitness-struct').Sets.Sets
type SetsCreateType = import('fitness-struct').Sets.CreateType

declare type SetsStoreType = Sets & StoreObject

declare type CreateSetResponse = { createSet: SetsStoreType }
declare type CreateSetVariable = { sets: SetsCreateType }

declare type DeleteSetResponse = { deleteSetById: string }
declare type DeleteSetVariable = { id: number }

declare type GetSetListByExerciseIdResponse = { getSetListByExerciseId: SetsStoreType[] }
declare type GetSetListByExerciseIdVariable = { id: number }

declare type UpdateSetResponse = { updateSet: SetsStoreType }
declare type UpdateSetVariable = { sets: SetsStoreType }
