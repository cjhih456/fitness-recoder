import type { DeleteScheduleResponse, DeleteScheduleVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';
import DeleteScheduleGql from '@features/schedule/api/mutation/DeleteScheduleGql';

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
