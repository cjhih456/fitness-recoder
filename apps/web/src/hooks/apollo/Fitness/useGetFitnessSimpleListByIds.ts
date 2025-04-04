import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleByIds from '@hooks/apollo/Fitness/graphql/query/GetFitnessSimpleByIds';
import { FitnessMockData } from '.'

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