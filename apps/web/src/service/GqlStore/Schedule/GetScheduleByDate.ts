import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'


type GetScheduleByDateResponse = { getScheduleByDate: Schedule[] }
type GetScheduleByDateVariable = { year: number, month: number, date: number }
const getScheduleByDateGql = gql`
query GetScheduleByDate($year: Int!, $month: Int!, $date: Int!) {
  getScheduleByDate(year: $year, month: $month, date: $date) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`
export function useGetScheduleByDate(year: number, month: number, date: number) {
  return useQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(getScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}
export function useLazyGetScheduleByDate() {
  return useLazyQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(getScheduleByDateGql)
}
export const GetScheduleByDateMock: MockedResponse<GetScheduleByDateResponse, GetScheduleByDateVariable> = {
  request: {
    query: getScheduleByDateGql
  },
  result: (v) => {
    return {
      data: {
        getScheduleByDate: Object.values(ScheduleMockData).filter(o => o.year === v.year && o.month === v.month && o.date === v.date)
      }
    }
  }
}