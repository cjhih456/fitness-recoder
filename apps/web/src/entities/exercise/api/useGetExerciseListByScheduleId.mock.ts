import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import GetExerciseListByScheduleId from './query/GetExerciseListByScheduleId';

const GetExerciseListByScheduleIdMock: MockedResponse<
  GetExerciseListByScheduleIdResponse,
  GetExerciseListByScheduleIdVariable
> = {
  request: {
    query: GetExerciseListByScheduleId,
  },
  result: () => {
    return {
      data: {
        getExerciseListByScheduleId: [
          {
            id: 1,
            deps: 0,
            fitness: FitnessMockData[0],
            fitnessId: FitnessMockData[0].id,
            __typename: 'ExerciseWithFitness',
          },
          {
            id: 2,
            deps: 0,
            fitness: FitnessMockData[1],
            fitnessId: FitnessMockData[1].id,
            __typename: 'ExerciseWithFitness',
          }
        ]
      }
    }
  }
}
export default GetExerciseListByScheduleIdMock
