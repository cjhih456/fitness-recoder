import type { CreateExercisePresetResponse, CreateExercisePresetVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from '@entities/exercisePreset/api/exercisePreset.mockData'
import CreateExercisePresetGql from '@features/exercisePreset/api/mutation/CreateExercisePresetGql';
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
      exerciseList: [],
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