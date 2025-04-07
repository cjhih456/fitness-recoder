import type { MockedResponse } from '@apollo/client/testing';
import CreateExercisePresetGql from './graphql/mutation/CreateExercisePresetGql';
import { ExercisePresetMockData } from '.'

const CreateExercisePresetMock: MockedResponse<
  CreateExercisePresetResponse,
  CreateExercisePresetVariable
> = {
  request: {
    query: CreateExercisePresetGql,
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ExercisePresetMockData).map(Number)) + 1
    ExercisePresetMockData[id] = {
      name: v.exercisePreset.name,
      id: id,
      deps: 0,
      __typename: 'ExercisePreset'
    }
    return {
      data: {
        createExercisePreset: ExercisePresetMockData[id]
      }
    }
  }
}
export default CreateExercisePresetMock