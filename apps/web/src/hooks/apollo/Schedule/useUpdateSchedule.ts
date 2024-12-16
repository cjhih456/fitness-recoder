import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import UpdateScheduleGql from '@graphQuery/Mutation/Schedule/UpdateScheduleGql';
import { ScheduleMockData } from '.'

export default function useUpdateSchedule() {
  return useMutation<UpdateScheduleResponse, UpdateScheduleVariable>(UpdateScheduleGql, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.updateSchedule) return prev
            toReference(result.data?.updateSchedule, true)
          }
        }
      })
    }
  })
}

export const UpdateScheduleMock: MockedResponse<UpdateScheduleResponse, UpdateScheduleVariable> = {
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