import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '../../fitness/api/fitness.mockData';
import GetExerciseListByExercisePresetId from './query/GetExerciseListByExercisePresetId';

const GetExerciseListByExercisePresetIdMock: MockedResponse<
  GetExerciseByExercisePresetIdResponse,
  GetExerciseByExercisePresetIdVariable
> = {
  request: {
    query: GetExerciseListByExercisePresetId,
  },
  result: () => {
    return {
      data: {
        getExerciseListByExercisePresetId: [
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
export default GetExerciseListByExercisePresetIdMock
