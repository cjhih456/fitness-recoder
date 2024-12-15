import type { MockedResponse } from '@apollo/client/testing';
import { gql, useBackgroundQuery, useLazyQuery, useQuery } from '@apollo/client'
import { FitnessMockData } from '.'

const getFitnessSimpleByIdsGql = gql`
query GetFitnessSimpleListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    ...FitnessSimpleFragment
  }
}`

export function useBackgroundGetFitnessSimpleListByIds(ids: number[]) {
  return useBackgroundQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(getFitnessSimpleByIdsGql, {
    fetchPolicy: 'cache-first',
    variables: { ids }
  })
}

export function useGetFitnessSimpleListByIds(ids: number[]) {
  return useQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(getFitnessSimpleByIdsGql, {
    fetchPolicy: 'cache-first',
    variables: { ids }
  })
}

export function useLazyGetFitnessSimpleListByIds() {
  return useLazyQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(getFitnessSimpleByIdsGql, {
    fetchPolicy: 'cache-first',
  })
}

export const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessSimpleListByIdsResponse,
  GetFitnessSimpleListByIdsVariable
> = {
  request: {
    query: getFitnessSimpleByIdsGql
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