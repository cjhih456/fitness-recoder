import { gql, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'


export type GetScheduleStatusByDateResponse = { getScheduleStatusByDate: string[] }
type GetScheduleStatusByDateVariable = { year: number, month: number }
const getScheduleStatusByDateGql = gql`
query GetScheduleStatusByDate($year: Int!, $month: Int!) {
  getScheduleStatusByDate(year: $year, month: $month)
}
`

export function useGetScheduleStatusByDate(year: number, month: number) {
  return useQuery<GetScheduleStatusByDateResponse,
    GetScheduleStatusByDateVariable>(getScheduleStatusByDateGql, {
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
    query: getScheduleStatusByDateGql
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