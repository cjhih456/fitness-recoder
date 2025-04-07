import type { MockedResponse } from '@apollo/client/testing';
import { ScheduleMockData } from '@entities/schedule/api';
import DeleteScheduleGql from '@entities/schedule/api/graphql/mutation/DeleteScheduleGql';

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
