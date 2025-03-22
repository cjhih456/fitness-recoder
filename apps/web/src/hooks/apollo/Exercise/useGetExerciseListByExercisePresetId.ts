import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByExercisePresetId from '@hooks/apollo/Exercise/graphql/query/GetExerciseListByExercisePresetId';

export default function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useSuspenseQuery<
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
            deps: 0,
            __typename: 'Exercise'
          },
          {
            id: 2,
            exercise: 2,
            deps: 0,
            __typename: 'Exercise'
          }
        ]
      }
    }
  }
}