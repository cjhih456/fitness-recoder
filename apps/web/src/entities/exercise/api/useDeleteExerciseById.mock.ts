import type { MockedResponse } from '@apollo/client/testing';
import DeleteExerciseById from '@entities/exercise/api/graphql/mutation/DeleteExerciseById';

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