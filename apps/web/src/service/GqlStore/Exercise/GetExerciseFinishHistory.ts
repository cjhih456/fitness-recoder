import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

type GetExerciseFinishHistoryResponse = {
  getExerciseFinishHistory: Exercise.HistoryData[]
}
type GetExerciseFinishHistoryVariable = {
  exerciseId: number
}
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