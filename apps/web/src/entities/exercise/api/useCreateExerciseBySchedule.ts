import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CreateExerciseBySchedule from '@entities/exercise/api/graphql/mutation/CreateExerciseBySchedule';
import { FitnessMockData } from '@entities/fitness/api';

export default function useCreateExerciseBySchedule() {
  return useMutation<
    CreateExerciseByScheduleResponse,
    CreateExerciseByScheduleVariable
  >(CreateExerciseBySchedule)
}
export const CreateExerciseByScheduleMock: MockedResponse<
  CreateExerciseByScheduleResponse,
  CreateExerciseByScheduleVariable
> = {
  request: {
    query: CreateExerciseBySchedule,
  },
  result: () => {
    return {
      data: {
        createExerciseBySchedule: {
          id: 1,
          deps: 0,
          exercise: 1,
          __typename: 'ExerciseWithFitness',
          fitness: FitnessMockData[0]
        }
      }
    }
  }
}