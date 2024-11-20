import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'


type GetExerciseFinishHistoryResponse = {
  getExerciseFinishHistory: Exercise.HistoryData[]
}
type GetExerciseFinishHistoryVariable = {
  exerciseId: number
}
const GetExerciseFinishHistoryGql = gql`
query GetExerciseFinishHistory($exerciseId: ID) {
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