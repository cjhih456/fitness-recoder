import type { UpdateScheduleResponse, UpdateScheduleVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';
import UpdateScheduleGql from './mutation/UpdateScheduleGql';
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
