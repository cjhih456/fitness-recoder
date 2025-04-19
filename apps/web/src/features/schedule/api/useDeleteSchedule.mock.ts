import type { MockedResponse } from '@apollo/client/testing';
import DeleteScheduleGql from '@features/schedule/api/mutation/DeleteScheduleGql';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';

const DeleteScheduleMock: MockedResponse<DeleteScheduleResponse, DeleteScheduleVariable> = {
  request: {
    query: DeleteScheduleGql
  },
  result: (v) => {
    delete ScheduleMockData[v.id]
    return {
      data: {
        deleteSchedule: `delete - schedule - ${v.id}`
      }
    }
  }
}
export default DeleteScheduleMock
