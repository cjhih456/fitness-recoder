import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'
import { FitnessMockData, FitnessStoreType } from '.'


type GetFitnessListByKeywordsResponse = { getFitnessListByKeywords: FitnessStoreType[] }
type GetFitnessListByKeywordsVariable = {
  name: string,
  category: Exercise.ICategory[],
  muscle: Exercise.IMuscle[],
  limit: number,
  offset: number
}
const getFitnessListByKeywordsGql = gql`
query GetFitnessListByKeywords($name: String, $category: [ICategory], $muscle: [IMuscle], $limit: Int, $offset: Int) {
  getFitnessListByKeywords(name: $name, category: $category, muscle: $muscle, limit: $limit, offset: $offset) {
    ...FitnessSimpleFragment
  }
}
`

export function useGetFitnessListByKeywords(name: string, category: Exercise.ICategory[], muscle: Exercise.IMuscle[], limit: number, offset: number) {
  return useQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(getFitnessListByKeywordsGql, {
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

export function useLazyGetFitnessListByKeywords() {
  return useLazyQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(getFitnessListByKeywordsGql)
}

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessListByKeywordsResponse,
  GetFitnessListByKeywordsVariable
> = {
  request: {
    query: getFitnessListByKeywordsGql
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