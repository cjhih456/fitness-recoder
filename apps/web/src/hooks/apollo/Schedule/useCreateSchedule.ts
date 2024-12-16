import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CreateSchedule from '@graphQuery/Mutation/Schedule/CreateScheduleGql';
import { ScheduleMockData } from '.'

export default function useCreateSchedule() {
  return useMutation<CreateScheduleResponse, CreaetScheduleVariable>(CreateSchedule, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleStatusByDate: GetScheduleStatusByDateResponse['getScheduleStatusByDate']
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleStatusByDate(prev) {
            if (!prev || !result.data?.createSchedule) return prev
            if (!Array.isArray(prev)) return prev
            const temp = [...prev]
            temp[result.data.createSchedule.date] = result.data.createSchedule.type
            return temp
          },
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.createSchedule) return prev
            const ref = toReference(result.data?.createSchedule, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}
export const CreateScheduleMock: MockedResponse<CreateScheduleResponse, CreaetScheduleVariable> = {
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