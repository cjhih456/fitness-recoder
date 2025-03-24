import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { useSuspenseQuery } from '@apollo/client'
import { startTransition, useCallback, useState } from 'react';
import GetFitnessListByKeywords from '@hooks/apollo/Fitness/graphql/query/GetFitnessListByKeywords';
import { FitnessMockData } from '.'

export default function useGetFitnessListByKeywords(name: string, category: Exercise.ICategory[], muscle: Exercise.IMuscle[], limit: number, offset: number) {

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

export const useGetFitnessByIdMock: MockedResponse<
  GetFitnessListByKeywordsResponse,
  GetFitnessListByKeywordsVariable
> = {
  request: {
    query: GetFitnessListByKeywords
  },
  result: (v) => {
    return {
      data: {
        getFitnessListByKeywords: FitnessMockData.slice(v.offset, v.offset + v.limit)
      }
    }
  }
}