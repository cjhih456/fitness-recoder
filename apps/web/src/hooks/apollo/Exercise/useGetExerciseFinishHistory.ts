import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetExerciseFinishHistory from '@hooks/apollo/Exercise/graphql/query/GetExerciseFinishHistory';

export default function useGetExerciseFinishHistory(exerciseId: number) {
  return useQuery<
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