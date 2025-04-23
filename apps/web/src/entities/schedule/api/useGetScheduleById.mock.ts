import type { GetScheduleByIdResponse, GetScheduleByIdVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import GetScheduleByIdGql from './query/GetScheduleByIdGql';
import { ScheduleMockData } from './schedule.mockData';

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
