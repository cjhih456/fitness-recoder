import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'


type UpdateExerciseListByExercisePresetIdResponse = {
  updateExerciseListByExercisePresetId: ExerciseData[]
}
type UpdateExerciseListByExercisePresetIdVariable = {
  exercisePresetId: number,
  newExercise: number[],
  deleteExerciseId: number[]
}
const UpdateExerciseListByExercisePresetIdGql = gql`
mutation UpdateExerciseListByExercisePresetId($exercisePresetId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId) {
    id
    deps
    exercise
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
        updateExerciseListByExercisePresetId: []
      }
    }
  }
}