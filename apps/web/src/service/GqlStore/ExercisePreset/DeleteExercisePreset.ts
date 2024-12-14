import type { GetExercisePresetWithListListResponse } from './GetExercisePresetWithListList';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'
import { ExercisePresetMockData } from '.'

type DeleteExercisePresetResponse = { deleteExercisePreset: string }
type DeleteExercisePresetVariable = { id: number }
const deleteExercisePresetGql = gql`
mutation DeleteExercisePreset($id: Int!) {
  deleteExercisePreset(id: $id)
}
`
export function useDeleteExercisePreset() {
  return useMutation<DeleteExercisePresetResponse, DeleteExercisePresetVariable>(deleteExercisePresetGql, {
    update: (cache, _r, { variables }) => {
      cache.modify<{
        getExercisePresetWithListList: GetExercisePresetWithListListResponse['getExercisePresetWithListList']
      }>({
        fields: {
          getExercisePresetWithListList(prev, { readField }) {
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
    query: deleteExercisePresetGql,
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