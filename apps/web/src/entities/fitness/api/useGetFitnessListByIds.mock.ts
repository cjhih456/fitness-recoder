import type { MockedResponse } from '@apollo/client/testing';
import type { GetFitnessListByIdsResponse, GetFitnessListByIdsVariable } from '@entities/fitness/model/types';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData'
import GetFitnessLisyByIds from '@entities/fitness/api/query/GetFitnessLisyByIds';

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