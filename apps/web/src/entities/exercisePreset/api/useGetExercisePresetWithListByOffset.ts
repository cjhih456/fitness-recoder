import type { GetExercisePresetWithListByOffsetResponse, GetExercisePresetWithListByOffsetVariable } from '@entities/exercisePreset/model';
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import GetExercisePresetWithListByOffset from './query/GetExercisePresetWithListByOffset';

export default function useGetExercisePresetWithListByOffset(offset: number, size: number) {
  const query = useSuspenseQuery<
    GetExercisePresetWithListByOffsetResponse,
    GetExercisePresetWithListByOffsetVariable
  >(GetExercisePresetWithListByOffset, {
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
