import type { MockedResponse } from '@apollo/client/testing';
import { FitnessMockData } from './fitness.mockData'
import GetFitnessListByKeywords from './graphql/query/GetFitnessListByKeywords';

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
