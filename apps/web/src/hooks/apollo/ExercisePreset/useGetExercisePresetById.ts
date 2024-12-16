import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetExercisePresetById from '@graphQuery/Query/ExercisePreset/GetExercisePresetById';
import { ExercisePresetMockData } from '.'

export default function useGetExercisePresetById(id: number) {
  return useQuery<
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
