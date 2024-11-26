import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'
import { ExercisePreset } from 'fitness-struct'


export type GetExercisePresetResponse = { getExercisePresetById: ExercisePreset.Preset }
export type GetExercisePresetVariable = { id: number }
export const getExercisePresetByIdGql = gql`
query GetExercisePresetById($id: Int!) {
  getExercisePresetById(id:$id) {
    id
    name
  }
}
`
export function useGetExercisePresetById(id: number) {
  return useQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(getExercisePresetByIdGql, { variables: { id: id } })
}
export function useLazyGetExercisePresetById() {
  return useLazyQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(getExercisePresetByIdGql)
}
export const GetExercisePresetByIdMock: MockedResponse<
  GetExercisePresetResponse,
  GetExercisePresetVariable
> = {
  request: {
    query: getExercisePresetByIdGql
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetById: ExercisePresetMockData[v.id]
      }
    }
  }
}