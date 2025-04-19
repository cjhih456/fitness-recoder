import type { MockedResponse } from '@apollo/client/testing';
import type { GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable } from '@entities/set/model';
import GetSetListByExerciseIdGql from '@entities/set/api/query/GetSetListByExerciseIdGql';
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
