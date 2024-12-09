import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Exercise } from 'fitness-struct'
import { FitnessMockData } from '.'
import { MockedResponse } from '@apollo/client/testing'


type GetFitnessByIdResponse = { getFitnessById: Exercise.IFitness }
type GetFitnessByIdVariable = { id: number }
const getFitnessByIdGql = gql`
query GetFitnessById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessFragment
  }
}
`

export function useGetFitnessById(id: number) {
  return useQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql, {
    variables: { id }
  })
}

export function useLazyGetFitnessById() {
  return useLazyQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(getFitnessByIdGql)
}

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessByIdResponse,
  GetFitnessByIdVariable
> = {
  request: {
    query: getFitnessByIdGql
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}