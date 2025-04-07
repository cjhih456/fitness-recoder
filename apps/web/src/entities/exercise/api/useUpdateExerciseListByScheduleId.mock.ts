import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '@entities/fitness/api';
import UpdateExerciseListByScheduleId from './graphql/mutation/UpdateExerciseListByScheduleId';

const UpdateExerciseListByScheduleIdMock: MockedResponse<
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
export default UpdateExerciseListByScheduleIdMock
