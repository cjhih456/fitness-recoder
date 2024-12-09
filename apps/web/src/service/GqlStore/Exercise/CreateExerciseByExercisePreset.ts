import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExerciseMockData } from '.'
import { Exercise } from 'fitness-struct'

type CreateExerciseByExercisePresetResponse = {
  createExerciseByExercisePreset: Exercise.Data
}
type CreateExerciseByExercisePresetVariable = {
  exercise: { exercisePreset: number, exerciseId: number[] }
}
const CreateExerciseByExercisePresetGql = gql`
mutation CreateExerciseByExercisePreset($exercise: CreateExerciseByExercisePresetInput!) {
  createExerciseByExercisePreset(exercise: $exercise) {
    ...ExerciseFragment
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
  result: (args) => {
    const idx = Math.max(...Object.keys(ExerciseMockData).map(Number)) + 1
    const obj: Exercise.Data = {
      id: idx,
      deps: 0,
      exercise: args.exercise.exerciseId[0]
    }
    return {
      data: {
        createExerciseByExercisePreset: obj
      }
    }
  }
}