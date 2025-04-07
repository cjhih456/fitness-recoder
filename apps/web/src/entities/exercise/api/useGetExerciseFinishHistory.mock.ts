import type { MockedResponse } from '@apollo/client/testing';
import GetExerciseFinishHistory from '@entities/exercise/api/graphql/query/GetExerciseFinishHistory';

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