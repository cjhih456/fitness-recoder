import type { GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable } from '@entities/fitness/model/types';
import type { Fitness } from '@fitness/struct'
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import GetFitnessListByKeywords from '@entities/fitness/api/query/GetFitnessListByKeywords';

export interface UseGetFitnessListByKeywordsProps {
  name?: string,
  category?: Fitness.ICategory[],
  muscle?: Fitness.IMuscle[],
  limit?: number,
  offset?: number
}

export default function useGetFitnessListByKeywords({
  name = '',
  category = [],
  muscle = [],
  limit = 20,
  offset = 0
}: UseGetFitnessListByKeywordsProps) {
  const query = useSuspenseQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(GetFitnessListByKeywords, {
    variables: {
      name,
      category,
      muscle,
      limit,
      offset
    }
  })

  const [hasNext, setHasNext] = useState(Boolean(query.data.getFitnessListByKeywords.length))
  const refetch = useCallback((...args: Parameters<typeof query.refetch>) => {
    setHasNext(true)
    return query.refetch(...args)
  }, [query])
  const fetchMore = useCallback(() => {
    startTransition(() => {
      query.fetchMore({
        updateQuery: (beforeResult, { fetchMoreResult }) => {
          return {
            getFitnessListByKeywords: [...beforeResult.getFitnessListByKeywords, ...fetchMoreResult.getFitnessListByKeywords]
          }
        },
        variables: {
          offset: query.data.getFitnessListByKeywords.length
        }
      }).then((result) => {
        setHasNext(Boolean(result.data.getFitnessListByKeywords.length))
      })
    })
  }, [query])
  return {
    ...query,
    refetch,
    fetchMore,
    hasNext
  }
}
