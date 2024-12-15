import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'
import { ExercisePresetMockData } from '.'

const createExercisePresetGql = gql`
mutation CreateExercisePreset($exercisePreset: CreateExercisePresetInput) {
  createExercisePreset(exercisePreset: $exercisePreset) {
    ...ExercisePresetFragment
  }
}
`
export function useCreateExercisePreset() {
  return useMutation<CreateExercisePresetResponse, CreateExercisePresetVariable>(createExercisePresetGql, {
    update: (cache, result) => {
      cache.modify<{
        getExercisePresetWithListList: GetExercisePresetWithListListResponse['getExercisePresetWithListList']
      }>({
        fields: {
          getExercisePresetWithListList(prev, { toReference }) {
            if (!prev || !result.data?.createExercisePreset) return prev
            const ref = toReference(result.data?.createExercisePreset, true)
            return [ref, ...prev]
          }
        }
      })
    }
  })
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
      deps: 0,
    }
    return {
      data: {
        createExercisePreset: ExercisePresetMockData[id]
      }
    }
  }
}