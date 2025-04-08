import type { MockedResponse } from '@apollo/client/testing';
import CreateSchedule from '@entities/schedule/api/graphql/mutation/CreateScheduleGql';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';

const CreateScheduleMock: MockedResponse<CreateScheduleResponse, CreateScheduleVariable> = {
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
export default CreateScheduleMock
