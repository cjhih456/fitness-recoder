import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData, FitnessStoreType } from '.'
import { MockedResponse } from '@apollo/client/testing'


type GetFitnessByIdResponse = { getFitnessById: FitnessStoreType }
type GetFitnessByIdVariable = { id: number }
const getFitnessByIdGql = gql`
query GetFitnessById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessFragment
  }
}
`

export function useGetFitnessById(id: number) {
  return useQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql, {
    variables: { id }
  })
}

export function useLazyGetFitnessById() {
  return useLazyQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql)
}

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessByIdResponse,
  GetFitnessByIdVariable
> = {
  request: {
    query: getFitnessByIdGql
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}