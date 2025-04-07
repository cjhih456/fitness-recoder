import type { MockedResponse } from '@apollo/client/testing';
import type { Schedule } from 'fitness-struct';
import { ScheduleMockData } from '@entities/schedule/api';
import GetScheduleStatusByMonthGql from '@entities/schedule/api/graphql/query/GetScheduleStatusByMonthGql';

const GetScheduleStateByDateMock: MockedResponse<
  GetScheduleStatusByMonthResponse,
  GetScheduleStatusByMonthVariable
> = {
  request: {
    query: GetScheduleStatusByMonthGql
  },
  result: (v) => {
    const list = Object.values(ScheduleMockData).filter(o => o.year === v.year && o.month === v.month)
    list.sort((a, b) => a.date - b.date)
    return {
      data: {
        getScheduleStatusByMonth: list.reduce((acc, cur) => {
          const temp = acc[cur.date] ?? []
          temp.push(cur.type)
          return acc
        }, [] as Schedule.IType[][])
      }
    }
  }
}
export default GetScheduleStateByDateMock
