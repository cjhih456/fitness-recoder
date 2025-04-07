import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import DeleteExercisePresetGql from './graphql/mutation/DeleteExercisePresetGql';
import { ExercisePresetMockData } from '.'

export default function useDeleteExercisePreset() {
  return useMutation<DeleteExercisePresetResponse, DeleteExercisePresetVariable>(DeleteExercisePresetGql, {
    update: (cache, _r, { variables }) => {
      cache.modify<{
        getExercisePresetWithListByOffset: GetExercisePresetWithListByOffsetResponse['getExercisePresetWithListByOffset']
      }>({
        fields: {
          getExercisePresetWithListByOffset(prev, { readField }) {
            if (!prev) return prev
            return prev.filter((p) => {
              const list = readField<number>('id', p)
              return list !== variables?.id
            })
          }
        }
      })
    }
  })
}
export const DeleteExercisePresetMock: MockedResponse<
  DeleteExercisePresetResponse,
  DeleteExercisePresetVariable
> = {
  request: {
    query: DeleteExercisePresetGql,
  },
  result: (v) => {
    delete ExercisePresetMockData[v.id]
    return {
      data: {
        deleteExercisePreset: `delete - ExercisePreset - ${v.id}`
      }
    }
  }
}