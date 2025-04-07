import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import UpdateExerciseListByExercisePresetId from '@entities/exercise/api/graphql/mutation/UpdateExerciseListByExercisePresetId';
import { FitnessMockData } from '@entities/fitness/api';

export default function useUpdateExerciseListByExercisePresetId() {
  return useMutation<
    UpdateExerciseListByExercisePresetIdResponse,
    UpdateExerciseListByExercisePresetIdVariable
  >(UpdateExerciseListByExercisePresetId)
}
export const UpdateExerciseListByExercisePresetIdMock: MockedResponse<
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