import type { DeleteExercisePresetResponse, DeleteExercisePresetVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from '@entities/exercisePreset/api/exercisePreset.mockData'
import DeleteExercisePresetGql from '@features/exercisePreset/api/mutation/DeleteExercisePresetGql';

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