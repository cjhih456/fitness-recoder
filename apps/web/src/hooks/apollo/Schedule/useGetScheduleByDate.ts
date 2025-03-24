import type { MockedResponse } from '@apollo/client/testing';
import { useSuspenseQuery } from '@apollo/client'
import GetScheduleByDateGql from '@hooks/apollo/Schedule/graphql/query/GetScheduleByDateGql';
import { ScheduleMockData } from '.'

export default function useGetScheduleByDate(year: number, month: number, date: number) {
  return useSuspenseQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(GetScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}

export const GetScheduleByDateMock: MockedResponse<GetScheduleByDateResponse, GetScheduleByDateVariable> = {
  request: {
    query: GetScheduleByDateGql
  },
  result: (v) => {
    return {
      data: {
        getScheduleByDate: Object.values(ScheduleMockData).filter(o => o.year === v.year && o.month === v.month && o.date === v.date)
      }
    }
  }
}