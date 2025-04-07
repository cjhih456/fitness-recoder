import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '../../fitness/api';
import GetExerciseListByExercisePresetId from './graphql/query/GetExerciseListByExercisePresetId';

export const GetExerciseListByExercisePresetIdMock: MockedResponse<
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
            exercise: 1,
            deps: 0,
            __typename: 'ExerciseWithFitness',
            fitness: FitnessMockData[0]
          },
          {
            id: 2,
            exercise: 2,
            deps: 0,
            __typename: 'ExerciseWithFitness',
            fitness: FitnessMockData[1]
          }
        ]
      }
    }
  }
} 