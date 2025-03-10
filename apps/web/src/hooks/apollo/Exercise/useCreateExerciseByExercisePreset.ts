import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { useMutation } from '@apollo/client'
import CreateExerciseByExercisePreset from '@hooks/apollo/Exercise/graphql/mutation/CreateExerciseByExercisePreset';
import { ExerciseMockData } from '.'

export default function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePreset)
}

export const CreateExerciseByExercisePresetMock: MockedResponse<
  CreateExerciseByExercisePresetResponse,
  CreateExerciseByExercisePresetVariable
> = {
  request: {
    query: CreateExerciseByExercisePreset,
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