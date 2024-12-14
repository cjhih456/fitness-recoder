import type { FitnessStoreType } from '.';
import type { OperationVariables } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData } from '.'

export type GetFitnessByIdResponse = { getFitnessById: FitnessStoreType }
export type GetFitnessByIdVariable = { id: number } & OperationVariables
export const getFitnessByIdGql = gql`
query GetFitnessById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessSimpleFragment
    ...FitnessDetailFragment
  }
}
`

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