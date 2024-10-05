import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'


type CreateScheduleResponse = { createSchedule: Schedule }
type CreaetScheduleVariable = { createSchedule: CreateSchedule }
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
  return useMutation<CreateScheduleResponse, CreaetScheduleVariable>(CreateScheduleGql)
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