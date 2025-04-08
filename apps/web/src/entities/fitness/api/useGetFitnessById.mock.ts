import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from './fitness.mockData'
import GetFitnessById from './graphql/query/GetFitnessById';

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