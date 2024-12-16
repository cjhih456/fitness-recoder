import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetFitnessSimpleByIds from '@graphQuery/Query/Fitness/GetFitnessSimpleByIds';
import { FitnessMockData } from '.'

export default function useGetFitnessSimpleListByIds(ids: number[]) {
  return useQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(GetFitnessSimpleByIds, {
    fetchPolicy: 'cache-first',
    variables: { ids }
  })
}

export const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessSimpleListByIdsResponse,
  GetFitnessSimpleListByIdsVariable
> = {
  request: {
    query: GetFitnessSimpleByIds
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