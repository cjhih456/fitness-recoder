import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetExerciseFinishHistory from '@hooks/apollo/Exercise/graphql/query/GetExerciseFinishHistory';

export default function useGetExerciseFinishHistory(exerciseId: number) {
  return useSuspenseQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistory, {
    variables: { exerciseId: Number(exerciseId) }
  })
}

export const GetExerciseFinishHistoryMock: MockedResponse<
  GetExerciseFinishHistoryResponse,
  GetExerciseFinishHistoryVariable
> = {
  request: {
    query: GetExerciseFinishHistory,
  },
  result: () => {
    return {
      data: {
        getExerciseFinishHistory: []
      }
    }
  }
}