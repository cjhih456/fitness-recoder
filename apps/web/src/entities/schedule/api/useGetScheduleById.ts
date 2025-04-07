import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetScheduleByIdGql from '../api/graphql/query/GetScheduleByIdGql';
import { ScheduleMockData } from '.'

export default function useGetScheduleById(id: number) {
  return useSuspenseQuery<GetScheduleByIdResponse, GetScheduleByIdVAriable>(GetScheduleByIdGql, {
    variables: { id: Number(id) }
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