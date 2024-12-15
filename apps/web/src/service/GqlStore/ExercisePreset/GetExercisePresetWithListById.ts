import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { ExercisePresetMockData } from '.'

const getExercisePresetWithListByIdGql = gql`
query GetExercisePresetWithListById($id: Int) {
  getExercisePresetWithListById(id: $id) {
    ...ExercisePresetWithListFragment
  }
}`

export function useGetExercisePresetWithListById(id: number) {
  return useQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(getExercisePresetWithListByIdGql, {
    fetchPolicy: 'cache-first',
    variables: { id }
  })
}

export function useLazyGetExercisePresetWithListById() {
  return useLazyQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(getExercisePresetWithListByIdGql, {
    fetchPolicy: 'cache-first'
  })
}

export const GetExercisePresetWithListByIdMock: MockedResponse<
  GetExercisePresetWithListByIdResponse,
  GetExercisePresetWithListByIdVariable
> = {
  request: {
    query: getExercisePresetWithListByIdGql
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListById: ExercisePresetMockData[v.id]
      }
    }
  }
}