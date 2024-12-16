import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetFitnessById from '@graphQuery/Query/Fitness/GetFitnessById';
import { FitnessMockData } from '.'

export default function useGetFitnessById(id: number) {
  return useQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    fetchPolicy: 'cache-first',
    variables: { id },
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