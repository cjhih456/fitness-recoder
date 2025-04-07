import type { MockedResponse } from '@apollo/client/testing';
import UpdateScheduleGql from '../api/graphql/mutation/UpdateScheduleGql';
import { ScheduleMockData } from '.';

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
