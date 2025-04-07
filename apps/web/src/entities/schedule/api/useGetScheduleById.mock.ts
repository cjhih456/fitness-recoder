import type { MockedResponse } from '@apollo/client/testing';
import GetScheduleByIdGql from '../api/graphql/query/GetScheduleByIdGql';
import { ScheduleMockData } from '.';

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