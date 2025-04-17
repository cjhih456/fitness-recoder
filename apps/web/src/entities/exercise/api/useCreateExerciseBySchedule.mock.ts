import type { MockedResponse } from '@apollo/client/testing';
import CreateExerciseBySchedule from '@entities/exercise/api/graphql/mutation/CreateExerciseBySchedule';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import { ExerciseMockData } from './exercise.mockData';

const CreateExerciseByScheduleMock: MockedResponse<
  CreateExerciseByScheduleResponse,
  CreateExerciseByScheduleVariable
> = {
  request: {
    query: CreateExerciseBySchedule,
  },
  result: () => {
    const idx = Math.max(...Object.keys(ExerciseMockData).map(Number)) + 1
    return {
      data: {
        createExerciseBySchedule: {
          id: idx,
          deps: 0,
          fitness: FitnessMockData[0],
          fitnessId: FitnessMockData[0].id,
          __typename: 'ExerciseWithFitness',
        }
      }
    }
  }
}
export default CreateExerciseByScheduleMock
