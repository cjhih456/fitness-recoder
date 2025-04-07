import type { MockedResponse } from '@apollo/client/testing';
import DeleteExercisePresetGql from './graphql/mutation/DeleteExercisePresetGql';
import { ExercisePresetMockData } from '.'

const DeleteExercisePresetMock: MockedResponse<
  DeleteExercisePresetResponse,
  DeleteExercisePresetVariable
> = {
  request: {
    query: DeleteExercisePresetGql,
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
export default DeleteExercisePresetMock