import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { gql, useMutation } from '@apollo/client'

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
    ...ExerciseFragment
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