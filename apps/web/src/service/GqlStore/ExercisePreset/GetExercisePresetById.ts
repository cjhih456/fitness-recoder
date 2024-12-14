import type { ExercisePresetStoreType } from '.';
import type { OperationVariables } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { ExercisePresetMockData } from '.'

export type GetExercisePresetResponse = { getExercisePresetById: ExercisePresetStoreType }
export type GetExercisePresetVariable = { id: number } & OperationVariables
export const getExercisePresetByIdGql = gql`
query GetExercisePresetById($id: Int!) {
  getExercisePresetById(id:$id) {
    ...ExercisePresetFragment
  }
}`

export function useGetExercisePresetById(id: number) {
  return useQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(getExercisePresetByIdGql, { variables: { id: id }, fetchPolicy: 'cache-first' })
}

export function useLazyGetExercisePresetById() {
  return useLazyQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(getExercisePresetByIdGql, { fetchPolicy: 'cache-first' })
}

export const GetExercisePresetByIdMock: MockedResponse<
  GetExercisePresetResponse,
  GetExercisePresetVariable
> = {
  request: {
    query: getExercisePresetByIdGql
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetById: ExercisePresetMockData[v.id]
      }
    }
  }
}
