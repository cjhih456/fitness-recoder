import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'


type UpdateExerciseListByExercisePresetIdResponse = {
  updateExerciseListByExercisePresetId: Exercise.Data[]
}
type UpdateExerciseListByExercisePresetIdVariable = {
  exercisePresetId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}
const UpdateExerciseListByExercisePresetIdGql = gql`
mutation UpdateExerciseListByExercisePresetId($exercisePresetId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId) {
    ...ExerciseFragment
  }
}`
export function useUpdateExerciseListByExercisePresetId() {
  return useMutation<
    UpdateExerciseListByExercisePresetIdResponse,
    UpdateExerciseListByExercisePresetIdVariable
  >(UpdateExerciseListByExercisePresetIdGql)
}
export const UpdateExerciseListByExercisePresetIdMock: MockedResponse<
  UpdateExerciseListByExercisePresetIdResponse,
  UpdateExerciseListByExercisePresetIdVariable
> = {
  request: {
    query: UpdateExerciseListByExercisePresetIdGql,
  },
  result: () => {
    return {
      data: {
        updateExerciseListByExercisePresetId: [
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