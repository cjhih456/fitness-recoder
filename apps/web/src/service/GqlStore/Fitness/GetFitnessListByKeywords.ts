import { gql, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'
import { FitnessMockData, FitnessStoreType } from '.'


export type GetFitnessListByKeywordsResponse = { getFitnessListByKeywords: FitnessStoreType[] }
type GetFitnessListByKeywordsVariable = {
  name: string,
  category: Exercise.ICategory[],
  muscle: Exercise.IMuscle[],
  limit: number,
  offset: number
}
const GetFitnessListByKeywordsGql = gql`
query getFitnessListByKeywords($name: String, $category: [ICategory], $muscle: [IMuscle], $limit: Int, $offset: Int) {
  getFitnessListByKeywords(name: $name, category: $category, muscle: $muscle, limit: $limit, offset: $offset) {
    ...FitnessSimpleFragment
  }
}
`

export function useGetFitnessListByKeywords(name: string, category: Exercise.ICategory[], muscle: Exercise.IMuscle[], limit: number, offset: number) {
  return useQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(GetFitnessListByKeywordsGql, {
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
    query: GetFitnessListByKeywordsGql
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