import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleById from '@hooks/apollo/Fitness/graphql/query/GetFitnessSimpleById';
import { FitnessMockData } from '.'

export default function useGetFitnessSimpleById(id: number) {
  return useSuspenseQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
    variables: { id },
    fetchPolicy: 'cache-first',
  })
}

export const useGetFitnessSimpleByIdMock: MockedResponse<
  GetFitnessSimpleByIdResponse,
  GetFitnessSimpleByIdVariable
> = {
  request: {
    query: GetFitnessSimpleById,
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}