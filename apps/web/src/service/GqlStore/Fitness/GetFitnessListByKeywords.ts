import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'
import { FitnessMockData } from '.'


type GetFitnessListByKeywordsResponse = { getFitnessListByKeywords: Exercise.IFitness[] }
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
    id
    name
    aliases
    primaryMuscles
    secondaryMuscles
    force
    level
    mechanic
    equipment
    category
    instructions
    description
    tips
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
  result: (_v) => {
    return {
      data: {
        getFitnessListByKeywords: Object.values(FitnessMockData)
      }
    }
  }
}