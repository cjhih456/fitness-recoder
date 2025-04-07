import type { MockedResponse } from '@apollo/client/testing';
import GetFitnessLisyByIds from './graphql/query/GetFitnessLisyByIds';
import { FitnessMockData } from '.'

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