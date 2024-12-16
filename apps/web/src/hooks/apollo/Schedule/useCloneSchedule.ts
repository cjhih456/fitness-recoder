import type { MockedResponse } from '@apollo/client/testing';
import type { Schedule } from 'fitness-struct'
import { useMutation } from '@apollo/client'
import CloneSchedule from '@graphQuery/Mutation/Schedule/CloneScheduleGql';
import { ScheduleMockData } from '.'

export default function useCloneSchedule() {
  return useMutation<CloneScheduleResponse, CloneScheduleVariable>(CloneSchedule, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.cloneSchedule) return prev
            const ref = toReference(result.data?.cloneSchedule, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}
export const CloneScheduleMock: MockedResponse<CloneScheduleResponse, CloneScheduleVariable> = {
  request: {
    query: CloneSchedule
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ScheduleMockData[v.id] as Schedule.Schedule),
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