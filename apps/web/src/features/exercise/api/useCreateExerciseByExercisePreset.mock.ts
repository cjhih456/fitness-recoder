import type { MockedResponse } from '@apollo/client/testing';
import type { CreateExerciseByExercisePresetResponse, CreateExerciseByExercisePresetVariable } from '@features/exercise/model';
import { ExerciseMockData } from '@entities/exercise/api/exercise.mockData';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import CreateExerciseByExercisePreset from '@features/exercise/api/mutation/CreateExerciseByExercisePreset';

const CreateExerciseByExercisePresetMock: MockedResponse<
  CreateExerciseByExercisePresetResponse,
  CreateExerciseByExercisePresetVariable
> = {
  request: {
    query: CreateExerciseByExercisePreset,
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
        createExerciseByExercisePreset: createdObjs
      }
    }
  }
}
export default CreateExerciseByExercisePresetMock