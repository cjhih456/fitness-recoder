import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import DeleteExerciseById from '@hooks/apollo/Exercise/graphql/mutation/DeleteExerciseById';

export default function useDeleteExerciseById() {
  return useMutation<
    DeleteExerciseByIdResponse,
    DeleteExerciseByIdVariable
  >(DeleteExerciseById)
}
export const DeleteExerciseByIdMock: MockedResponse<
  DeleteExerciseByIdResponse,
  DeleteExerciseByIdVariable
> = {
  request: {
    query: DeleteExerciseById,
  },
  result: (v) => {
    return {
      data: {
        deleteExerciseById: `delete - exercise - ${v.id}`
      }
    }
  }
}