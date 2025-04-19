import type { GetExerciseFinishHistoryResponse, GetExerciseFinishHistoryVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import GetExerciseFinishHistory from '@entities/exercise/api/query/GetExerciseFinishHistory';

const GetExerciseFinishHistoryMock: MockedResponse<
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
export default GetExerciseFinishHistoryMock
