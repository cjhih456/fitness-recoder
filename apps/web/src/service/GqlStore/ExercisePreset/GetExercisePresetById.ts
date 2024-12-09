import { gql, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'
import { ExercisePreset } from 'fitness-struct'


export type GetExercisePresetResponse = { getExercisePresetById: ExercisePreset.Preset }
export type GetExercisePresetVariable = { id: number }
export const getExercisePresetByIdGql = gql`
query GetExercisePresetById($id: Int!) {
  getExercisePresetById(id:$id) {
    ...ExercisePresetFragment
  }
}
`
export function useGetExercisePresetById(id: number) {
  return useQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(getExercisePresetByIdGql, { variables: { id: id }, fetchPolicy: 'cache-first' })
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