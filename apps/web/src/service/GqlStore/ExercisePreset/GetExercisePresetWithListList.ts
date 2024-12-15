import type { MockedResponse } from '@apollo/client/testing';
import { gql, useQuery } from '@apollo/client'
import { ExercisePresetMockData } from '.'

const getExercisePresetWithListListGql = gql`
query GetExercisePresetWithListList($offset: Int, $size: Int) {
  getExercisePresetWithListList(offset: $offset, size: $size) {
    ...ExercisePresetWithListFragment
  }
}`

export function useGetExercisePresetWithListList(offset: number, size: number) {
  return useQuery<
    GetExercisePresetWithListListResponse,
    GetExercisePresetWithListListVariable
  >(getExercisePresetWithListListGql, {
    fetchPolicy: 'cache-first',
    variables: { offset, size }
  })
}
export const GetExercisePresetWithListListMock: MockedResponse<
  GetExercisePresetWithListListResponse,
  GetExercisePresetWithListListVariable
> = {
  request: {
    query: getExercisePresetWithListListGql
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListList: Object.values(ExercisePresetMockData).splice(v.offset, v.size)
      }
    }
  }
}