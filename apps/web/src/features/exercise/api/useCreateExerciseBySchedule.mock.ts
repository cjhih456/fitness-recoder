import type { CreateExerciseByScheduleResponse, CreateExerciseByScheduleVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import { ExerciseMockData } from '@entities/exercise/api/exercise.mockData';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import CreateExerciseBySchedule from '@features/exercise/api/mutation/CreateExerciseBySchedule';

const CreateExerciseByScheduleMock: MockedResponse<
  CreateExerciseByScheduleResponse,
  CreateExerciseByScheduleVariable
> = {
  request: {
    query: CreateExerciseBySchedule,
  },
  result: (args) => {
    const idx = Math.max(...Object.keys(ExerciseMockData).map(Number)) + 1
    const createdObjs = args.exercise.fitnessIds.map((v, i) => {
      return {
        id: idx + i,
        deps: 0,
        fitness: FitnessMockData[v - 1],
        fitnessId: FitnessMockData[v - 1].id,
        __typename: 'ExerciseWithFitness'
      }
    })
    return {
      data: {
        createExerciseBySchedule: createdObjs
      }
    }
  }
}
export default CreateExerciseByScheduleMock
