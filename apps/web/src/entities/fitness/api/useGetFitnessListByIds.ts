import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessLisyByIds from './graphql/query/GetFitnessLisyByIds';
import { FitnessMockData } from '.'

export default function useGetFitnessListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    variables: { ids }
  })
}

export const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessListByIdsResponse,
  GetFitnessListByIdsVariable
> = {
  request: {
    query: GetFitnessLisyByIds
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