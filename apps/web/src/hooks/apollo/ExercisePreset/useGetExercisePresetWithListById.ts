import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetExercisePresetWithListById from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListById';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListById(id: number) {
  return useQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(GetExercisePresetWithListById, {
    fetchPolicy: 'cache-first',
    variables: { id }
  })
}

export const GetExercisePresetWithListByIdMock: MockedResponse<
  GetExercisePresetWithListByIdResponse,
  GetExercisePresetWithListByIdVariable
> = {
  request: {
    query: GetExercisePresetWithListById
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListById: ExercisePresetMockData[v.id]
      }
    }
  }
}