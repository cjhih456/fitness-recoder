import type { MockedResponse } from '@apollo/client/testing';
import UpdateExerciseListByExercisePresetId from '@entities/exercise/api/graphql/mutation/UpdateExerciseListByExercisePresetId';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';

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
            exercise: 1,
            __typename: 'ExerciseWithFitness',
            fitness: FitnessMockData[0]
          }
        ]
      }
    }
  }
}
export default UpdateExerciseListByExercisePresetIdMock
