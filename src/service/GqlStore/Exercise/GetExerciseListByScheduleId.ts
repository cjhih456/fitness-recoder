import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'


type GetExerciseListByScheduleIdResponse = {
  getExerciseListByScheduleId: ExerciseData[]
}
type GetExerciseListByScheduleIdVariable = {
  scheduleId: number
}
const GetExerciseListByScheduleIdGql = gql`
query GetExerciseListByScheduleId($scheduleId: ID) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    id
    deps
    exercise
  }
}
`
export function useGetExerciseListByScheduleId(scheduleId: number) {
  return useQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleIdGql, {
    variables: { scheduleId: Number(scheduleId) }
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
        getExerciseListByScheduleId: []
      }
    }
  }
}