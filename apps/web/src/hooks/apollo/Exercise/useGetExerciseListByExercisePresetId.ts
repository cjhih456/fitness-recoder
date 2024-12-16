import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetExerciseListByExercisePresetId from '@graphQuery/Query/Exercise/GetExerciseListByExercisePresetId';

export default function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetId, {
    variables: { exercisePresetId: Number(exercisePresetId) }
  })
}

export const GetExerciseListByExercisePresetIdMock: MockedResponse<
  GetExerciseByExercisePresetIdResponse,
  GetExerciseByExercisePresetIdVariable
> = {
  request: {
    query: GetExerciseListByExercisePresetId,
  },
  result: () => {
    return {
      data: {
        getExerciseListByExercisePresetId: [
          {
            id: 1,
            exercise: 1,
            deps: 0
          },
          {
            id: 2,
            exercise: 2,
            deps: 0
          }
        ]
      }
    }
  }
}