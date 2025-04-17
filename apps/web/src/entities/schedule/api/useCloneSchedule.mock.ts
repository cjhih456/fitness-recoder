import type { MockedResponse } from '@apollo/client/testing';
import type { Schedule } from '@fitness/struct'
import CloneSchedule from './graphql/mutation/CloneScheduleGql';
import { ScheduleMockData } from './schedule.mockData';

const CloneScheduleMock: MockedResponse<CloneScheduleResponse, CloneScheduleVariable> = {
  request: {
    query: CloneSchedule
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ScheduleMockData[v.id] as Schedule.Data),
      id,
      year: v.targetDate.year,
      month: v.targetDate.month,
      date: v.targetDate.date
    }
    return {
      data: {
        cloneSchedule: ScheduleMockData[id]
      }
    }
  }
}
export default CloneScheduleMock
