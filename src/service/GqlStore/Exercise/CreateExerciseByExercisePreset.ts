import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'

type CreateExerciseByExercisePresetResponse = {
  createExerciseByExercisePreset: ExerciseData
}
type CreateExerciseByExercisePresetVariable = {
  exercise: { exercisePreset: number, exerciseId: number[] }
}
const CreateExerciseByExercisePresetGql = gql`
mutation CreateExerciseByExercisePreset($exercise: CreateExerciseByExercisePresetInput!) {
  createExerciseByExercisePreset(exercise: $exercise) {
    id
    deps
    exercise
  }
}`
export function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePresetGql)
}

export const CreateExerciseByExercisePresetMock: MockedResponse<
  CreateExerciseByExercisePresetResponse,
  CreateExerciseByExercisePresetVariable
> = {
  request: {
    query: CreateExerciseByExercisePresetGql,
  },
  result: () => {
    return {
      data: {
        createExerciseByExercisePreset: {} as ExerciseData
      }
    }
  }
}