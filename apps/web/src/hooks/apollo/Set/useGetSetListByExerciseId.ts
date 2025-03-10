import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetSetListByExerciseIdGql from '@hooks/apollo/Set/graphql/query/GetSetListByExerciseIdGql';
import { SetMockData } from '.'

export default function useGetSetListByExerciseId(id: number) {
  return useQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(GetSetListByExerciseIdGql, {
    variables: { id }
  })
}

export const GetSetListByExerciseIdMock: MockedResponse<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable> = {
  request: {
    query: GetSetListByExerciseIdGql,
  },
  variableMatcher: () => true,
  result: () => {
    return {
      data: {
        getSetListByExerciseId: Array(4).fill(0).map((_v, i) => {
          return SetMockData[i + 1]
        })
      }
    }
  }
}