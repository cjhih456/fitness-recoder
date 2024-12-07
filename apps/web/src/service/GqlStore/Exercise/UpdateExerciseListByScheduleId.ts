import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'


type UpdateExerciseListByScheduleIdResponse = {
  updateExerciseListByScheduleId: Exercise.Data[]
}
type UpdateExerciseListByScheduleIdVariable = {
  scheduleId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}
const UpdateExerciseListByScheduleIdGql = gql`
mutation UpdateExerciseListByScheduleId($scheduleId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByScheduleId(scheduleId: $scheduleId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId){
    id
    deps
    exercise
  }
}`
export function useUpdateExerciseListByScheduleId() {
  return useMutation<UpdateExerciseListByScheduleIdResponse, UpdateExerciseListByScheduleIdVariable>(UpdateExerciseListByScheduleIdGql)
}
export const UpdateExerciseListByScheduleIdMock: MockedResponse<
  UpdateExerciseListByScheduleIdResponse,
  UpdateExerciseListByScheduleIdVariable
> = {
  request: {
    query: UpdateExerciseListByScheduleIdGql,
  },
  result: () => {
    return {
      data: {
        updateExerciseListByScheduleId: [
          {
            id: 1,
            deps: 0,
            exercise: 1
          }
        ]
      }
    }
  }
}