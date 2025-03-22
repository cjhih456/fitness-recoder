import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import { useState } from 'react';
import GetExercisePresetWithListList from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListList';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListList(offset: number, size: number) {
  const [hasNext, setHasNext] = useState(true)
  const query = useSuspenseQuery<
    GetExercisePresetWithListListResponse,
    GetExercisePresetWithListListVariable
  >(GetExercisePresetWithListList, {
    fetchPolicy: 'cache-first',
    variables: { offset, size }
  })
  const fetchMore = () => {
    query.fetchMore({
      variables: {
        offset: query.data.getExercisePresetWithListList.length
      }
    }).then((result) => {
      setHasNext(Boolean(result.data.getExercisePresetWithListList.length))
    })
  }
  return {
    ...query,
    fetchMore,
    hasNext
  }
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