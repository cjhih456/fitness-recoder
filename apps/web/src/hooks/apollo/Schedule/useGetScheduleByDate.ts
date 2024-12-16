import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetScheduleByDateGql from '@graphQuery/Query/Schedule/GetScheduleByDateGql';
import { ScheduleMockData } from '.'

export default function useGetScheduleByDate(year: number, month: number, date: number) {
  return useQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(GetScheduleByDateGql, {
    fetchPolicy: 'cache-first',
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