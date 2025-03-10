import type { MockedResponse } from '@apollo/client/testing';
import { useQuery } from '@apollo/client'
import GetScheduleStatusByDateGql from '@hooks/apollo/Schedule/graphql/query/GetScheduleStatusByDateGql';
import { ScheduleMockData } from '.'

export default function useGetScheduleStatusByDate(year: number, month: number) {
  return useQuery<GetScheduleStatusByDateResponse,
    GetScheduleStatusByDateVariable>(GetScheduleStatusByDateGql, {
      variables: {
        year,
        month
      },
      fetchPolicy: 'cache-first'
    })
}

export const GetScheduleStateByDateMock: MockedResponse<
  GetScheduleStatusByDateResponse,
  GetScheduleStatusByDateVariable
> = {
  request: {
    query: GetScheduleStatusByDateGql
  },
  result: (v) => {
    const list = Object.values(ScheduleMockData).filter(o => o.year === v.year && o.month === v.month)
    list.sort((a, b) => a.date - b.date)
    return {
      data: {
        getScheduleStatusByDate: list.reduce((acc, cur) => {
          acc[cur.date] = cur.type
          return acc
        }, [] as string[])
      }
    }
  }
}