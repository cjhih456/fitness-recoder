import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData, ScheduleStoreType } from '.'
import { Schedule } from 'fitness-struct'
import { GetScheduleByDateResponse } from './GetScheduleByDate'
import { GetScheduleStatusByDateResponse } from './GetScheduleStatusByDate'


type CreateScheduleResponse = { createSchedule: ScheduleStoreType }
type CreaetScheduleVariable = { createSchedule: Schedule.ICreate }
const CreateScheduleGql = gql`
mutation CreateSchedule($createSchedule: CreateScheduleDataInput) {
  createSchedule(schedule: $createSchedule) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`
export function useCreateSchedule() {
  return useMutation<CreateScheduleResponse, CreaetScheduleVariable>(CreateScheduleGql, {
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
    query: CreateScheduleGql
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