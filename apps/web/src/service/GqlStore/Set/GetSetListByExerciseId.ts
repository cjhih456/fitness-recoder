import type { SetsStoreType } from '.';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { SetMockData } from '.'

type GetSetListByExerciseIdResponse = { getSetListByExerciseId: SetsStoreType[] }
type GetSetListByExerciseIdVariable = { id: number }
const getSetListByExerciseIdGql = gql`
query GetSetListByExerciseId($id: Int!) {
  getSetListByExerciseId(id: $id) {
    ...SetsFragment
  }
}
`
export function useGetSetListByExerciseId(id: number) {
  return useQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(getSetListByExerciseIdGql, {
    variables: { id }
  })
}
export function useLazyGetSetListByExerciseId() {
  return useLazyQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(getSetListByExerciseIdGql)
}
export const GetSetListByExerciseIdMock: MockedResponse<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable> = {
  request: {
    query: getSetListByExerciseIdGql,
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