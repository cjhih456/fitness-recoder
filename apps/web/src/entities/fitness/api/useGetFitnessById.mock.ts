import type { MockedResponse } from '@apollo/client/testing';
import type { GetFitnessByIdResponse, GetFitnessByIdVariable } from '@entities/fitness/model/types';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData'
import GetFitnessById from '@entities/fitness/api/query/GetFitnessById';

const useGetFitnessByIdMock: MockedResponse<
  GetFitnessByIdResponse,
  GetFitnessByIdVariable
> = {
  request: {
    query: GetFitnessById
  },
  result: (v) => {
    return {
      data: {
        getFitnessById: FitnessMockData[v.id - 1]
      }
    }
  }
}
export default useGetFitnessByIdMock