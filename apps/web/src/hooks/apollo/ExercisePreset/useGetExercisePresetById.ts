import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetExercisePresetById from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetById';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetById(id: number) {
  return useSuspenseQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(GetExercisePresetById, { variables: { id: id }, fetchPolicy: 'cache-first' })
}

export const GetExercisePresetByIdMock: MockedResponse<
  GetExercisePresetResponse,
  GetExercisePresetVariable
> = {
  request: {
    query: GetExercisePresetById
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetById: ExercisePresetMockData[v.id]
      }
    }
  }
}
