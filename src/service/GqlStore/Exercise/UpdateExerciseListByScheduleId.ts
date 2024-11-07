import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'


type UpdateExerciseListByScheduleIdResponse = {
  updateExerciseListByScheduleId: ExerciseData[]
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
        updateExerciseListByScheduleId: []
      }
    }
  }
}