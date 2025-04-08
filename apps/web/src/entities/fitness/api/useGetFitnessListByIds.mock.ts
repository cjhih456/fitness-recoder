import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from './fitness.mockData'
import GetFitnessLisyByIds from './graphql/query/GetFitnessLisyByIds';

const useGetFitnessListByIdsMock: MockedResponse<
  GetFitnessListByIdsResponse,
  GetFitnessListByIdsVariable
> = {
  request: {
    query: GetFitnessLisyByIds
  },
  result: (v) => {
    return {
      data: {
        getFitnessListByIds: v.ids.map(v => {
          return FitnessMockData[v - 1]
        })
      }
    }
  }
}
export default useGetFitnessListByIdsMock