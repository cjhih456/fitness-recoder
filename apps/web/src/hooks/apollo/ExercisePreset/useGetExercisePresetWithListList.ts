import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetExercisePresetWithListList from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListList';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListList(offset: number, size: number) {
  return useSuspenseQuery<
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
        getExercisePresetWithListList: Object
          .values(ExercisePresetMockData)
          .splice(v.offset, v.size)
          .map(v => {
            v.__typename = 'ExercisePresetWithList'
            return v
          })
      }
    }
  }
}