import { gql, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'
import { ExercisePreset } from 'fitness-struct'

export type GetExercisePresetListResponse = { getExercisePresetList: ExercisePreset.PresetWithExerciseList[] }
type GetExercisePresetListVariable = { offset: number, size: number }
const getExercisePresetListGql = gql`
query GetExercisePresetList($offset: Int, $size: Int) {
  getExercisePresetList(offset: $offset, size: $size) {
    id
    name
    exerciseList {
      id
      exercise
    }
  }
}
`
export function useGetExercisePresetList(offset: number, size: number) {
  return useQuery<
    GetExercisePresetListResponse,
    GetExercisePresetListVariable
  >(getExercisePresetListGql, {
    variables: { offset, size }
  })
}
export const GetExercisePresetListMock: MockedResponse<
  GetExercisePresetListResponse,
  GetExercisePresetListVariable
> = {
  request: {
    query: getExercisePresetListGql
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetList: Object.values(ExercisePresetMockData).splice(v.offset, v.size)
      }
    }
  }
}