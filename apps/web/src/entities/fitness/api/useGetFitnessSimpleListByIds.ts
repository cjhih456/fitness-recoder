import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import { FitnessMockData } from '@entities/fitness/api';
import GetFitnessSimpleByIds from '@entities/fitness/api/graphql/query/GetFitnessSimpleByIds';

export default function useGetFitnessSimpleListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(GetFitnessSimpleByIds, {
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