import type { MockedResponse } from '@apollo/client/testing';
import DeleteExerciseById from '@entities/exercise/api/graphql/mutation/DeleteExerciseById';

const DeleteExerciseByIdMock: MockedResponse<
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
export default DeleteExerciseByIdMock
