import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessById from '@hooks/apollo/Fitness/graphql/query/GetFitnessById';
import { FitnessMockData } from '.'

export default function useGetFitnessById(id: number) {
  return useSuspenseQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    variables: { id }
  })
}

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessByIdResponse,
  GetFitnessByIdVariable
> = {
  request: {
    query: GetFitnessById
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}