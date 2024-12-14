import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

type GetExerciseListByScheduleIdResponse = {
  getExerciseListByScheduleId: Exercise.Data[]
}
type GetExerciseListByScheduleIdVariable = {
  scheduleId: number
}
const GetExerciseListByScheduleIdGql = gql`
query GetExerciseListByScheduleId($scheduleId: Int) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    ...ExerciseFragment
  }
}
`
export function useGetExerciseListByScheduleId(scheduleId: number) {
  return useQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleIdGql, {
    variables: { scheduleId }
  })
}
export function useLazyGetExerciseListByScheduleId() {
  return useLazyQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleIdGql)
}
export const GetExerciseListByScheduleIdMock: MockedResponse<
  GetExerciseListByScheduleIdResponse,
  GetExerciseListByScheduleIdVariable
> = {
  request: {
    query: GetExerciseListByScheduleIdGql,
  },
  result: () => {
    return {
      data: {
        getExerciseListByScheduleId: [
          {
            id: 1,
            exercise: 1,
            deps: 0
          },
          {
            id: 2,
            exercise: 2,
            deps: 0
          }
        ]
      }
    }
  }
}