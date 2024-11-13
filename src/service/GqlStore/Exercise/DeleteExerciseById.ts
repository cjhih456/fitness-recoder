import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'


type DeleteExerciseByIdResponse = {
  deleteExerciseById: string
}
type DeleteExerciseByIdVariable = {
  id: number
}
const DeleteExerciseByIdGql = gql`
mutation DeleteExerciseById($id: ID) {
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