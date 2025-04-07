import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import { FitnessMockData } from '@entities/fitness/api';
import GetExerciseListByScheduleId from '../api/graphql/query/GetExerciseListByScheduleId';

export default function useGetExerciseListByScheduleId(scheduleId: number) {
  return useSuspenseQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId, {
    variables: { scheduleId }
  })
}

export const GetExerciseListByScheduleIdMock: MockedResponse<
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