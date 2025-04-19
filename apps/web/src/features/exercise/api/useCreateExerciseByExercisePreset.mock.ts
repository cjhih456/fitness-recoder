import type { MockedResponse } from '@apollo/client/testing';
import { ExerciseMockData } from '@entities/exercise/api/exercise.mockData';
import CreateExerciseByExercisePreset from '@entities/exercise/api/mutation/CreateExerciseByExercisePreset';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';

const CreateExerciseByExercisePresetMock: MockedResponse<
  CreateExerciseByExercisePresetResponse,
  CreateExerciseByExercisePresetVariable
> = {
  request: {
    query: CreateExerciseByExercisePreset,
  },
  result: (args) => {
    const idx = Math.max(...Object.keys(ExerciseMockData).map(Number)) + 1
    const obj: ExerciseDataStoreType = {
      id: idx,
      deps: 0,
      fitness: FitnessMockData[args.exercise.fitnessIds[0] - 1],
      fitnessId: FitnessMockData[args.exercise.fitnessIds[0] - 1].id,
      __typename: 'ExerciseWithFitness'
    }
    return {
      data: {
        createExerciseByExercisePreset: obj
      }
    }
  }
}
export default CreateExerciseByExercisePresetMock