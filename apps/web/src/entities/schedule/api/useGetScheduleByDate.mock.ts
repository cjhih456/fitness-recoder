import type { MockedResponse } from '@apollo/client/testing';
import GetScheduleByDateGql from './graphql/query/GetScheduleByDateGql';
import { ScheduleMockData } from './schedule.mockData'

const GetScheduleByDateMock: MockedResponse<GetScheduleByDateResponse, GetScheduleByDateVariable> = {
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
export default GetScheduleByDateMock
