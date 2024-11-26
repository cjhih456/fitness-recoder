import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Exercise } from 'fitness-struct'
import { FitnessMockData } from '.'
import { MockedResponse } from '@apollo/client/testing'


type GetFitnessListByIdsResponse = { getFitnessListByIds: Exercise.IFitness[] }
type GetFitnessListByIdsVariable = { ids: number[] }
const getFitnessByIdGql = gql`
query GetFitnessListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    id
    name
    aliases
    primaryMuscles
    secondaryMuscles
    force
    level
    mechanic
    equipment
    category
    instructions
    description
    tips
  }
}
`

export function useGetFitnessListByIds(ids: number[]) {
  return useQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(getFitnessByIdGql, {
    variables: { ids }
  })
}

export function useLazyGetFitnessListByIds() {
  return useLazyQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(getFitnessByIdGql)
}

export const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessListByIdsResponse,
  GetFitnessListByIdsVariable
> = {
  request: {
    query: getFitnessByIdGql
  },
  result: (_v) => {
    return {
      data: {
        getFitnessListByIds: Object.values(FitnessMockData)
      }
    }
  }
}