import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetFitnessSimpleById from '@graphQuery/Query/Fitness/GetFitnessSimpleById';
import { FitnessMockData } from '.'

export default function useGetFitnessSimpleById(id: number) {
  return useQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
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
  variableMatcher: () => true,
  newData: (v) => {
    console.log('getFitnessSimpleByIdGql called: ', FitnessMockData[v.id - 1])

    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  },
  result: (v) => {
    console.log('getFitnessSimpleByIdGql called: ', FitnessMockData[v.id - 1])
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}