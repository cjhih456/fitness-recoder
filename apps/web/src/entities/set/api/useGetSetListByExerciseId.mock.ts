import type { MockedResponse } from '@apollo/client/testing';
import GetSetListByExerciseIdGql from '@entities/set/api/graphql/query/GetSetListByExerciseIdGql';
import { SetMockData } from '@entities/set/api/set.mockData';

const GetSetListByExerciseIdMock: MockedResponse<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable> = {
  request: {
    query: GetSetListByExerciseIdGql
  },
  result: () => {
    return {
      data: {
        getSetListByExerciseId: Array(4).fill(0).map((_v, i) => {
          return SetMockData[i + 1]
        })
      }
    }
  }
}
export default GetSetListByExerciseIdMock
