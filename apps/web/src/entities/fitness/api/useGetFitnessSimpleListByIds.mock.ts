import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from '@entities/fitness/api';
import GetFitnessSimpleByIds from '@entities/fitness/api/graphql/query/GetFitnessSimpleByIds';

const useGetFitnessSimpleListByIdsMock: MockedResponse<
  GetFitnessSimpleListByIdsResponse,
  GetFitnessSimpleListByIdsVariable
> = {
  request: {
    query: GetFitnessSimpleByIds
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
export default useGetFitnessSimpleListByIdsMock