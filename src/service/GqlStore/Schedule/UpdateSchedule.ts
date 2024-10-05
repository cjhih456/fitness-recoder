import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'

type UpdateScheduleResponse = { updateSchedule: Schedule }
type UpdateScheduleVariable = { updateSchedule: Schedule }
const UpdateScheduleGql = gql`
mutation Mutation($updateSchedule: UpdateScheduleDataInput) {
  updateSchedule(schedule:$updateSchedule) {
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
export function useUpdateSchedule() {
  return useMutation<UpdateScheduleResponse, UpdateScheduleVariable>(UpdateScheduleGql)
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