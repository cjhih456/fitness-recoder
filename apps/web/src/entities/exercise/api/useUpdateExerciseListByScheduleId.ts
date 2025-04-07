import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import { FitnessMockData } from '@entities/fitness/api';
import UpdateExerciseListByScheduleId from './graphql/mutation/UpdateExerciseListByScheduleId';

export default function useUpdateExerciseListByScheduleId() {
  return useMutation<
    UpdateExerciseListByScheduleIdResponse,
    UpdateExerciseListByScheduleIdVariable
  >(UpdateExerciseListByScheduleId)

}
export const UpdateExerciseListByScheduleIdMock: MockedResponse<
  UpdateExerciseListByScheduleIdResponse,
  UpdateExerciseListByScheduleIdVariable
> = {
  request: {
    query: UpdateExerciseListByScheduleId,
  },
  result: () => {
    return {
      data: {
        updateExerciseListByScheduleId: [
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