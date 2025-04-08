import type { MockedResponse } from '@apollo/client/testing';
import CreateExerciseBySchedule from '@entities/exercise/api/graphql/mutation/CreateExerciseBySchedule';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';

const CreateExerciseByScheduleMock: MockedResponse<
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
export default CreateExerciseByScheduleMock
