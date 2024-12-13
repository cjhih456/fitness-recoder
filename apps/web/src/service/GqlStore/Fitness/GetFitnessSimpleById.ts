import { gql, OperationVariables, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData, FitnessStoreType } from '.'
import { MockedResponse } from '@apollo/client/testing'


export type GetFitnessSimpleByIdResponse = { getFitnessSimpleById: FitnessStoreType }
export type GetFitnessSimpleByIdVariable = { id: number } & OperationVariables
const getFitnessSimpleByIdGql = gql`
query GetFitnessSimpleById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessSimpleFragment
  }
}
`

export function useGetFitnessSimpleById(id: number) {
  return useQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(getFitnessSimpleByIdGql, {
    variables: { id },
    fetchPolicy: 'cache-first',
  })
}
export function useLazyGetFitnessSimpleById() {
  return useLazyQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(getFitnessSimpleByIdGql, {
    fetchPolicy: 'cache-first',
  })
}

export const useGetFitnessSimpleByIdMock: MockedResponse<
  GetFitnessSimpleByIdResponse,
  GetFitnessSimpleByIdVariable
> = {
  request: {
    query: getFitnessSimpleByIdGql
  },
  result: (v) => {
    return {
      data: {
        getFitnessSimpleById: FitnessMockData[v.id - 1]
      }
    }
  }
}