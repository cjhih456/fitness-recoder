import type { MockedResponse } from '@apollo/client/testing';
import UpdateScheduleGql from './mutation/UpdateScheduleGql';
import { ScheduleMockData } from '../../../entities/schedule/api/schedule.mockData';

const UpdateScheduleMock: MockedResponse<UpdateScheduleResponse, UpdateScheduleVariable> = {
  request: {
    query: UpdateScheduleGql
  },
  result: (v) => {
    ScheduleMockData[v.updateSchedule.id] = v.updateSchedule
    return {
      data: {
        updateSchedule: ScheduleMockData[v.updateSchedule.id]
      }
    }
  }
}
export default UpdateScheduleMock
