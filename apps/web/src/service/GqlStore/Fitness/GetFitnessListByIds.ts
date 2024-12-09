import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Exercise } from 'fitness-struct'
import { FitnessMockData } from '.'
import { MockedResponse } from '@apollo/client/testing'


type GetFitnessListByIdsResponse = { getFitnessListByIds: Exercise.IFitness[] }
type GetFitnessListByIdsVariable = { ids: number[] }
const getFitnessByIdGql = gql`
query GetFitnessListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    ...FitnessFragment
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
  result: (v) => {
    return {
      data: {
        getFitnessListByIds: v.ids.map(v => {
          return FitnessMockData[v - 1]
        })
      }
    }
  }
}