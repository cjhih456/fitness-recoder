import type { MockedResponse } from '@apollo/client/testing';
import type { DeleteExerciseByIdResponse, DeleteExerciseByIdVariable } from '@features/exercise/model';
import DeleteExerciseById from '@features/exercise/api/mutation/DeleteExerciseById';
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
