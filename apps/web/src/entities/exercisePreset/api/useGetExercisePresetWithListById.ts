import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetExercisePresetWithListById from './graphql/query/GetExercisePresetWithListById';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetWithListById(id: number) {
  return useSuspenseQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(GetExercisePresetWithListById, {
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
    const temp = ExercisePresetMockData[v.id]
    temp.__typename = 'ExercisePresetWithList'
    return {
      data: {
        getExercisePresetWithListById: temp
      }
    }
  }
}