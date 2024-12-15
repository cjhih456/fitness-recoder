import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData } from '.'

export const getFitnessByIdGql = gql`
query GetFitnessById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessFragment
  }
}`

export function useGetFitnessById(id: number) {
  return useQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql, {
    fetchPolicy: 'cache-first',
    variables: { id },
  })
}

export function useLazyGetFitnessById() {
  return useLazyQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql, {
    fetchPolicy: 'cache-first',
  })
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