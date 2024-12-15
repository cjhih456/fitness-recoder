type IFitness = import('fitness-struct').Exercise.IFitness
type ICategory = import('fitness-struct').Exercise.ICategory
type IMuscle = import('fitness-struct').Exercise.IMuscle
type StoreObject = import('@apollo/client').StoreObject
type OperationVariables = import('@apollo/client').OperationVariables

declare type FitnessStoreType = IFitness & StoreObject
declare type GetFitnessByIdResponse = { getFitnessById: FitnessStoreType }
declare type GetFitnessByIdVariable = { id: number } & OperationVariables

declare type GetFitnessListByIdsResponse = { getFitnessListByIds: FitnessStoreType[] }
declare type GetFitnessListByIdsVariable = { ids: number[] }

declare type GetFitnessListByKeywordsResponse = { getFitnessListByKeywords: FitnessStoreType[] }
declare type GetFitnessListByKeywordsVariable = {
  name: string,
  category: ICategory[],
  muscle: IMuscle[],
  limit: number,
  offset: number
}

declare type GetFitnessSimpleByIdResponse = { getFitnessById: FitnessStoreType }
declare type GetFitnessSimpleByIdVariable = { id: number } & OperationVariables

declare type GetFitnessSimpleListByIdsResponse = { getFitnessListByIds: FitnessStoreType[] }
declare type GetFitnessSimpleListByIdsVariable = { ids: number[] }
