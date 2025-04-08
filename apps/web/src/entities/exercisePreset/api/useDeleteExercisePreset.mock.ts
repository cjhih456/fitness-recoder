import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from './exercisePreset.mockData'
import DeleteExercisePresetGql from './graphql/mutation/DeleteExercisePresetGql';

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