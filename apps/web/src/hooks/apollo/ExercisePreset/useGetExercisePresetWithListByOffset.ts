import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import GetExercisePresetWithListByOffset from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListByOffset';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListByOffset(offset: number, size: number) {
  const query = useSuspenseQuery<
    GetExercisePresetWithListByOffsetResponse,
    GetExercisePresetWithListByOffsetVariable
  >(GetExercisePresetWithListByOffset, {
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
            getExercisePresetWithListByOffset: [...beforeResult.getExercisePresetWithListByOffset, ...fetchMoreResult.getExercisePresetWithListByOffset]
          }
        },
        variables: {
          offset: query.data.getExercisePresetWithListByOffset.length
        }
      }).then((result) => {
        setHasNext(Boolean(result.data.getExercisePresetWithListByOffset.length))
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
  GetExercisePresetWithListByOffsetResponse,
  GetExercisePresetWithListByOffsetVariable
> = {
  request: {
    query: GetExercisePresetWithListByOffset
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListByOffset: Object
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