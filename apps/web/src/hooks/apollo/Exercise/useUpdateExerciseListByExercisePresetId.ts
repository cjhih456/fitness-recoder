import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import UpdateExerciseListByExercisePresetId from '@hooks/apollo/Exercise/graphql/mutation/UpdateExerciseListByExercisePresetId';
import { FitnessMockData } from '../Fitness';

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
            __typename: 'Exercise',
            fitness: FitnessMockData[0]
          }
        ]
      }
    }
  }
}