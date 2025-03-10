import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CreateExercisePresetGql from '@hooks/apollo/ExercisePreset/graphql/mutation/CreateExercisePresetGql';
import { ExercisePresetMockData } from '.'

export default function useCreateExercisePreset() {
  return useMutation<CreateExercisePresetResponse, CreateExercisePresetVariable>(CreateExercisePresetGql, {
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
    query: CreateExercisePresetGql,
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