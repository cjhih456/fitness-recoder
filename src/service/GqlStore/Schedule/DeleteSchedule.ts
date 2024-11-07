import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'


type DeleteScheduleResponse = { deleteSchedule: string }
type DeleteScheduleVariable = { id: number }
const deleteScheduleGql = gql`
mutation DeleteSchedule($id: ID!) {
  deleteSchedule(id: $id) {
    id
  }
}
`
export function useDeleteSchedule() {
  return useMutation<DeleteScheduleResponse, DeleteScheduleVariable>(deleteScheduleGql)
}
export const DeleteScheduleMock: MockedResponse<DeleteScheduleResponse, DeleteScheduleVariable> = {
  request: {
    query: deleteScheduleGql
  },
  result: (v) => {
    delete ScheduleMockData[v.id]
    return {
      data: {
        deleteSchedule: `delete - schedule - ${v.id}`
      }
    }
  }
}