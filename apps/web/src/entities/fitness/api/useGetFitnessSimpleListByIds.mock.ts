import type { MockedResponse } from '@apollo/client/testing';
import type { GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable } from '@entities/fitness/model/types';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData';
import GetFitnessSimpleByIds from '@entities/fitness/api/query/GetFitnessSimpleByIds';

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