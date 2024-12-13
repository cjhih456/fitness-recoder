import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData, FitnessStoreType } from '.'
import { MockedResponse } from '@apollo/client/testing'


export type GetFitnessListByIdsResponse = { getFitnessListByIds: FitnessStoreType[] }
export type GetFitnessListByIdsVariable = { ids: number[] }
export const getFitnessByIdsGql = gql`
query GetFitnessListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    ...FitnessSimpleFragment
    ...FitnessDetailFragment
  }
}
`

export function useGetFitnessListByIds(ids: number[]) {
  return useQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(getFitnessByIdsGql, {
    variables: { ids },
    fetchPolicy: 'cache-first',
  })
}

export function useLazyGetFitnessListByIds() {
  return useLazyQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(getFitnessByIdsGql, {
    fetchPolicy: 'cache-first',
  })
}

export const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessListByIdsResponse,
  GetFitnessListByIdsVariable
> = {
  request: {
    query: getFitnessByIdsGql
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