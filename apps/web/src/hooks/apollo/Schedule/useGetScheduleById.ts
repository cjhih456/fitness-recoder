import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetScheduleByIdGql from '@graphQuery/Query/Schedule/GetScheduleByIdGql';
import { ScheduleMockData } from '.'

export default function useGetScheduleById(id: number) {
  return useQuery<GetScheduleByIdResponse, GetScheduleByIdVAriable>(GetScheduleByIdGql, {
    variables: { id: Number(id) },
    fetchPolicy: 'cache-first'
  })
}
export const GetScheduleByIdMock: MockedResponse<GetScheduleByIdResponse, GetScheduleByIdVAriable> = {
  request: {
    query: GetScheduleByIdGql
  },
  result: (v) => {
    return {
      data: {
        getScheduleById: ScheduleMockData[v.id]
      }
    }
  }
}