import type { StoreObject, OperationVariables } from '@apollo/client'
import type { Fitness } from '@fitness/struct'

export type FitnessStoreType = Fitness.IFitness & StoreObject
export type GetFitnessByIdResponse = { getFitnessById: FitnessStoreType }
export type GetFitnessByIdVariable = { id: number } & OperationVariables

export type GetFitnessListByIdsResponse = { getFitnessListByIds: FitnessStoreType[] }
export type GetFitnessListByIdsVariable = { ids: number[] }

export type GetFitnessListByKeywordsResponse = { getFitnessListByKeywords: FitnessStoreType[] }
export type GetFitnessListByKeywordsVariable = {
  name: string,
  category: Fitness.ICategory[],
  muscle: Fitness.IMuscle[],
  limit: number,
  offset: number
}

export type GetFitnessSimpleByIdResponse = { getFitnessById: FitnessStoreType }
export type GetFitnessSimpleByIdVariable = { id: number } & OperationVariables

export type GetFitnessSimpleListByIdsResponse = { getFitnessListByIds: FitnessStoreType[] }
export type GetFitnessSimpleListByIdsVariable = { ids: number[] }
