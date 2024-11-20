import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { SetMockData } from '.'
import { Sets } from 'fitness-struct'

type GetSetListByExerciseIdResponse = { getSetListByExerciseId: Sets.Sets[] }
type GetSetListByExerciseIdVariable = { id: number }
const getSetListByExerciseIdGql = gql`
query GetSetListByExerciseId($id: ID!) {
  getSetListByExerciseId(id: $id) {
    duration
    exerciseId
    id
    isDone
    repeat
    weight
    weightUnit
  }
}
`
export function useGetSetListByExerciseId(id: number) {
  return useQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(getSetListByExerciseIdGql, {
    variables: { id }
  })
}
export function useLazyGetSetListByExerciseId() {
  return useLazyQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(getSetListByExerciseIdGql)
}
export const GetSetListByExerciseIdMock: MockedResponse<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable> = {
  request: {
    query: getSetListByExerciseIdGql,
  },
  variableMatcher: () => true,
  result: () => {
    return {
      data: {
        getSetListByExerciseId: Array(4).fill(0).map((v, i) => {
          return SetMockData[i + 1]
        })
      }
    }
  }
}