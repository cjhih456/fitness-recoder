import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { useSuspenseQuery } from '@apollo/client'
import { useState } from 'react';
import GetFitnessListByKeywords from '@hooks/apollo/Fitness/graphql/query/GetFitnessListByKeywords';
import { FitnessMockData } from '.'

export default function useGetFitnessListByKeywords(name: string, category: Exercise.ICategory[], muscle: Exercise.IMuscle[], limit: number, offset: number) {
  const query = useSuspenseQuery<GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable>(GetFitnessListByKeywords, {
    fetchPolicy: 'cache-first',
    variables: {
      name,
      category,
      muscle,
      limit,
      offset
    }
  })

  const [hasNext, setHasNext] = useState(true)
  const fetchMore = () => {
    query.fetchMore({
      variables: {
        offset: query.data.getFitnessListByKeywords.length
      }
    }).then((result) => {
      setHasNext(Boolean(result.data.getFitnessListByKeywords.length))
    })
  }
  return {
    ...query,
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