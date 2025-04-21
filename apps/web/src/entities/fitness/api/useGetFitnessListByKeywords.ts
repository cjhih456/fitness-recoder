import type { GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable } from '@entities/fitness/model/types';
import type { Fitness } from '@fitness/struct'
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import GetFitnessListByKeywords from '@entities/fitness/api/query/GetFitnessListByKeywords';
import { useDebounce } from '@shared/hooks/useDebounce';

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
  const debouncedValue = useDebounce({
    name,
    category,
    muscle,
    limit,
    offset
  }, 500)
  const query = useSuspenseQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(GetFitnessListByKeywords, {
    variables: debouncedValue
  })

  const [hasNext, setHasNext] = useState(Boolean(query.data.getFitnessListByKeywords.length))
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
    fetchMore,
    hasNext
  }
}
