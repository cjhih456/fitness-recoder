import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetExercisePresetWithListList from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListList';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListList(offset: number, size: number) {
  return useQuery<
    GetExercisePresetWithListListResponse,
    GetExercisePresetWithListListVariable
  >(GetExercisePresetWithListList, {
    fetchPolicy: 'cache-first',
    variables: { offset, size }
  })
}
export const GetExercisePresetWithListListMock: MockedResponse<
  GetExercisePresetWithListListResponse,
  GetExercisePresetWithListListVariable
> = {
  request: {
    query: GetExercisePresetWithListList
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListList: Object.values(ExercisePresetMockData).splice(v.offset, v.size)
      }
    }
  }
}