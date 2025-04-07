import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import { ScheduleMockData } from '@entities/schedule/api';
import CreateSchedule from '@entities/schedule/api/graphql/mutation/CreateScheduleGql';

export default function useCreateSchedule() {
  return useMutation<CreateScheduleResponse, CreaetScheduleVariable>(CreateSchedule, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleStatusByMonth: GetScheduleStatusByMonthResponse['getScheduleStatusByMonth']
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleStatusByMonth(prev) {
            if (!prev || !result.data?.createSchedule) return prev
            if (!Array.isArray(prev)) return prev
            const temp = [...prev]
            const dateTemp = temp[result.data.createSchedule.date] ? [...temp[result.data.createSchedule.date]] : []
            dateTemp.push(result.data.createSchedule.type)
            temp[result.data.createSchedule.date] = dateTemp
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