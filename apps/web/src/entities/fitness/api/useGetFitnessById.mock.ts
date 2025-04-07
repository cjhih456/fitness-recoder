import type { MockedResponse } from '@apollo/client/testing';
import GetFitnessById from './graphql/query/GetFitnessById';
import { FitnessMockData } from '.'

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