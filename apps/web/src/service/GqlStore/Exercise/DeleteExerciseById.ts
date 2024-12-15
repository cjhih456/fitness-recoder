import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'

const DeleteExerciseByIdGql = gql`
mutation DeleteExerciseById($id: Int) {
  deleteExerciseById(id: $id)
}
`
export function useDeleteExerciseById() {
  return useMutation<
    DeleteExerciseByIdResponse,
    DeleteExerciseByIdVariable
  >(DeleteExerciseByIdGql)
}
export const DeleteExerciseByIdMock: MockedResponse<
  DeleteExerciseByIdResponse,
  DeleteExerciseByIdVariable
> = {
  request: {
    query: DeleteExerciseByIdGql,
  },
  result: (v) => {
    return {
      data: {
        deleteExerciseById: `delete - exercise - ${v.id}`
      }
    }
  }
}