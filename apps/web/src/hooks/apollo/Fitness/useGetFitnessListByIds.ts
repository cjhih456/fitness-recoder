import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetFitnessLisyByIds from '@hooks/apollo/Fitness/graphql/query/GetFitnessLisyByIds';
import { FitnessMockData } from '.'

export default function useGetFitnessListByIds(ids: number[]) {
  return useQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    variables: { ids },
    fetchPolicy: 'cache-first',
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