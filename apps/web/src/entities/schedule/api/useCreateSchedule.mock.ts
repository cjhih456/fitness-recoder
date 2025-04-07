import type { MockedResponse } from '@apollo/client/testing';
import { ScheduleMockData } from '@entities/schedule/api';
import CreateSchedule from '@entities/schedule/api/graphql/mutation/CreateScheduleGql';

export const CreateScheduleMock: MockedResponse<CreateScheduleResponse, CreaetScheduleVariable> = {
  request: {
    query: CreateSchedule
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...v.createSchedule,
      id: id
    }
    return {
      data: {
        createSchedule: ScheduleMockData[id]
      }
    }
  }
} 