import type { MockedResponse } from '@apollo/client/testing';
import type { GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable } from '@entities/fitness/model/types';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData'
import GetFitnessSimpleById from '@entities/fitness/api/query/GetFitnessSimpleById';

const useGetFitnessSimpleByIdMock: MockedResponse<
  GetFitnessSimpleByIdResponse,
  GetFitnessSimpleByIdVariable
> = {
  request: {
    query: GetFitnessSimpleById,
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}
export default useGetFitnessSimpleByIdMock