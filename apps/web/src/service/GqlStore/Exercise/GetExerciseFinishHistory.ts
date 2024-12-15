import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'

const GetExerciseFinishHistoryGql = gql`
query GetExerciseFinishHistory($exerciseId: Int) {
  getExerciseFinishHistory(exerciseId: $exerciseId) {
    id
    type
    year
    month
    date
    exercise
    cnt
    hasDone
    weights
    repeats
    weightUnit
  }
}
`
export function useGetExerciseFinishHistory(exerciseId: number) {
  return useQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistoryGql, {
    variables: { exerciseId: Number(exerciseId) }
  })
}
export function useLazyGetExerciseFinishHistory() {
  return useLazyQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistoryGql)
}
export const GetExerciseFinishHistoryMock: MockedResponse<
  GetExerciseFinishHistoryResponse,
  GetExerciseFinishHistoryVariable
> = {
  request: {
    query: GetExerciseFinishHistoryGql,
  },
  result: () => {
    return {
      data: {
        getExerciseFinishHistory: []
      }
    }
  }
}