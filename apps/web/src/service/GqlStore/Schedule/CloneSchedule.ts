import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData, ScheduleStoreType } from '.'
import { Schedule } from 'fitness-struct'
import { GetScheduleByDateResponse } from './GetScheduleByDate'


type CloneScheduleResponse = { cloneSchedule: ScheduleStoreType }
type CloneScheduleVariable = { id: number, targetDate: { year: number, month: number, date: number } }
const CloneScheduleGql = gql`
mutation CloneSchedule($id: Int!, $targetDate: TargetDateInput) {
  cloneSchedule(id: $id, targetDate: $targetDate) {
    ...ScheduleSimple
  }
}
`
export function useCloneSchedule() {
  return useMutation<CloneScheduleResponse, CloneScheduleVariable>(CloneScheduleGql, {
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
    query: CloneScheduleGql
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