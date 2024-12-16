import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { useQuery } from '@apollo/client'
import GetFitnessListByKeywords from '@graphQuery/Query/Fitness/GetFitnessListByKeywords';
import { FitnessMockData } from '.'

export default function useGetFitnessListByKeywords(name: string, category: Exercise.ICategory[], muscle: Exercise.IMuscle[], limit: number, offset: number) {
  return useQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(GetFitnessListByKeywords, {
    fetchPolicy: 'cache-first',
    variables: {
      name,
      category,
      muscle,
      limit,
      offset
    }
  })
}

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessListByKeywordsResponse,
  GetFitnessListByKeywordsVariable
> = {
  request: {
    query: GetFitnessListByKeywords
  },
  newData(v) {
    return {
      data: {
        getFitnessListByKeywords: FitnessMockData.slice(v.offset, v.offset + v.limit)
      }
    }
  },
  result: (v) => {
    return {
      data: {
        getFitnessListByKeywords: FitnessMockData.slice(v.offset, v.offset + v.limit)
      }
    }
  }
}