import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'

type DeleteExercisePresetResponse = { deleteExercisePreset: string }
type DeleteExercisePresetVariable = { id: number }
const deleteExercisePresetGql = gql`
mutation DeleteExercisePreset($id: ID!) {
  deleteExercisePreset(id: $id)
}
`
export function useDeleteExercisePreset() {
  return useMutation<DeleteExercisePresetResponse, DeleteExercisePresetVariable>(deleteExercisePresetGql)
}
export const DeleteExercisePresetMock: MockedResponse<
  DeleteExercisePresetResponse,
  DeleteExercisePresetVariable
> = {
  request: {
    query: deleteExercisePresetGql,
  },
  result: (v) => {
    delete ExercisePresetMockData[v.id]
    return {
      data: {
        deleteExercisePreset: `delete - ExercisePreset - ${v.id}`
      }
    }
  }
}