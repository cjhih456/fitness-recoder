import type { MockedResponse } from '@apollo/client/testing';
import type { GetFitnessListByKeywordsResponse, GetFitnessListByKeywordsVariable } from '@entities/fitness/model/types';
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData'
import GetFitnessListByKeywords from '@entities/fitness/api/query/GetFitnessListByKeywords';

const useGetFitnessListByKeywords: MockedResponse<
  GetFitnessListByKeywordsResponse,
  GetFitnessListByKeywordsVariable
> = {
  request: {
    query: GetFitnessListByKeywords
  },
  result: (v) => {
    return {
      data: {
        getFitnessListByKeywords: FitnessMockData.slice(v.offset, v.offset + v.limit)
      }
    }
  }
}
export default useGetFitnessListByKeywords
