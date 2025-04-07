import type { MockedResponse } from '@apollo/client/testing';
import GetScheduleByIdGql from '../api/graphql/query/GetScheduleByIdGql';
import { ScheduleMockData } from '.';

const GetScheduleByIdMock: MockedResponse<GetScheduleByIdResponse, GetScheduleByIdVariable> = {
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
export default GetScheduleByIdMock
