import type { MockedResponse } from '@apollo/client/testing';
import { ExerciseMockData } from '@entities/exercise/api';
import CreateExerciseByExercisePreset from '@entities/exercise/api/graphql/mutation/CreateExerciseByExercisePreset';
import { FitnessMockData } from '@entities/fitness/api';

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
      exercise: args.exercise.exerciseId[0],
      fitness: FitnessMockData[args.exercise.exerciseId[0] - 1],
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