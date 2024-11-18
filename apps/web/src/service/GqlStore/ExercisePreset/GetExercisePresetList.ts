import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'

type GetExercisePresetListResponse = { getExercisePresetList: ExercisePresetWithExerciseList[] }
type GetExercisePresetListVariable = { page: number, size: number }
const getExercisePresetListGql = gql`
query GetExercisePresetList($page: Int, $size: Int) {
  getExercisePresetList(page: $page, size: $size) {
    id
    name
    exerciseList {
      id
      exercise
    }
  }
}
`
export function useGetExercisePresetList(page: number, size: number) {
  return useQuery<
    GetExercisePresetListResponse,
    GetExercisePresetListVariable
  >(getExercisePresetListGql, {
    variables: { page, size }
  })
}
export function useLazyGetExercisePresetList() {
  return useLazyQuery<
    GetExercisePresetListResponse,
    GetExercisePresetListVariable
  >(getExercisePresetListGql)
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
        getExercisePresetList: Object.values(ExercisePresetMockData).splice(0, v.size)
      }
    }
  }
}