import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'

type CreateExercisePresetResponse = { createExercisePreset: ExercisePreset }
type CreateExercisePresetVariable = { exercisePreset: { name: string } }
const createExercisePresetGql = gql`
mutation CreateExercisePreset($exercisePreset: CreateExercisePresetInput) {
  createExercisePreset(exercisePreset: $exercisePreset) {
    id
    name
    deps
  }
}
`
export function useCreateExercisePreset() {
  return useMutation<CreateExercisePresetResponse, CreateExercisePresetVariable>(createExercisePresetGql)
}
export const CreateExercisePresetMock: MockedResponse<
  CreateExercisePresetResponse,
  CreateExercisePresetVariable
> = {
  request: {
    query: createExercisePresetGql,
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ExercisePresetMockData).map(Number)) + 1
    ExercisePresetMockData[id] = {
      name: v.exercisePreset.name,
      id: id,
      deps: 0
    }
    return {
      data: {
        createExercisePreset: ExercisePresetMockData[id]
      }
    }
  }
}