import { gql, StoreObject, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'
import { ExercisePreset } from 'fitness-struct'
import { GetExercisePresetListResponse } from './GetExercisePresetList'

type CreateExercisePresetResponse = { createExercisePreset: ExercisePreset.Preset & StoreObject }
type CreateExercisePresetVariable = { exercisePreset: { name: string } }
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
        getExercisePresetList: GetExercisePresetListResponse['getExercisePresetList']
      }>({
        fields: {
          getExercisePresetList(prev, { toReference }) {
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