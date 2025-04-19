import type { MockedResponse } from '@apollo/client/testing';
import type { UpdateExerciseListByScheduleIdResponse, UpdateExerciseListByScheduleIdVariable } from '@features/exercise/model';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import UpdateExerciseListByScheduleId from './mutation/UpdateExerciseListByScheduleId';

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
            fitness: FitnessMockData[0],
            fitnessId: FitnessMockData[0].id,
            __typename: 'ExerciseWithFitness',
          }
        ]
      }
    }
  }
}
export default UpdateExerciseListByScheduleIdMock
