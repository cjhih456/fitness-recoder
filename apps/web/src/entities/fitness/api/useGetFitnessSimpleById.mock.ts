import type { MockedResponse } from '@apollo/client/testing';
import GetFitnessSimpleById from './graphql/query/GetFitnessSimpleById';
import { FitnessMockData } from '.'

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