import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import GetExercisePresetWithListList from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListList';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListList(offset: number, size: number) {
  const query = useSuspenseQuery<
    GetExercisePresetWithListListResponse,
    GetExercisePresetWithListListVariable
  >(GetExercisePresetWithListList, {
    fetchPolicy: 'cache-first',
    variables: { offset, size }
  })

  const [hasNext, setHasNext] = useState(true)
  const refetch = useCallback((...args: Parameters<typeof query.refetch>) => {
    setHasNext(true)
    return query.refetch(...args)
  }, [query])
  const fetchMore = useCallback(() => {
    startTransition(() => {
      query.fetchMore({
        updateQuery: (beforeResult, { fetchMoreResult }) => {
          return {
            getExercisePresetWithListList: [...beforeResult.getExercisePresetWithListList, ...fetchMoreResult.getExercisePresetWithListList]
          }
        },
        variables: {
          offset: query.data.getExercisePresetWithListList.length
        }
      }).then((result) => {
        setHasNext(Boolean(result.data.getExercisePresetWithListList.length))
      })
    })
  }, [query])
  return {
    ...query,
    fetchMore,
    refetch,
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