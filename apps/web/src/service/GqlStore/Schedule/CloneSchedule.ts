import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'


type CloneScheduleResponse = { cloneSchedule: Schedule }
type CloneScheduleVariable = { id: number, targetDate: { year: number, month: number, date: number } }
const CloneScheduleGql = gql`
mutation CloneSchedule($id: ID!, $targetDate: TargetDateInput) {
  cloneSchedule(id: $id, targetDate: $targetDate) {
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
export function useCloneSchedule() {
  return useMutation<CloneScheduleResponse, CloneScheduleVariable>(CloneScheduleGql)
}
export const CloneScheduleMock: MockedResponse<CloneScheduleResponse, CloneScheduleVariable> = {
  request: {
    query: CloneScheduleGql
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ScheduleMockData[v.id] as Schedule),
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