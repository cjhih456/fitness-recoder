import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData, ScheduleStoreType } from '.'
import { GetScheduleByDateResponse } from './GetScheduleByDate'

type UpdateScheduleResponse = { updateSchedule: ScheduleStoreType }
type UpdateScheduleVariable = { updateSchedule: ScheduleStoreType }
const UpdateScheduleGql = gql`
mutation Mutation($updateSchedule: UpdateScheduleDataInput) {
  updateSchedule(schedule:$updateSchedule) {
    ...ScheduleWithTime
  }
}
`
export function useUpdateSchedule() {
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