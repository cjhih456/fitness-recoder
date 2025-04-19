import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import UpdateExerciseListByExercisePresetId from '@features/exercise/api/mutation/UpdateExerciseListByExercisePresetId';

const UpdateExerciseListByExercisePresetIdMock: MockedResponse<
  UpdateExerciseListByExercisePresetIdResponse,
  UpdateExerciseListByExercisePresetIdVariable
> = {
  request: {
    query: UpdateExerciseListByExercisePresetId,
  },
  result: () => {
    return {
      data: {
        updateExerciseListByExercisePresetId: [
          {
            id: 1,
            deps: 0,
            fitness: FitnessMockData[0],
            fitnessId: FitnessMockData[0].id,
            __typename: 'ExerciseWithFitness',
          }
        ]
      }
    }
  }
}
export default UpdateExerciseListByExercisePresetIdMock
