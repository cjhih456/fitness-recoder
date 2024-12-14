import type { GetScheduleByDateResponse } from './GetScheduleByDate';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'
import { ScheduleMockData } from '.'

type DeleteScheduleResponse = { deleteSchedule: string }
type DeleteScheduleVariable = { id: number }
const deleteScheduleGql = gql`
mutation DeleteSchedule($id: Int!) {
  deleteSchedule(id: $id)
}
`
export function useDeleteSchedule() {
  return useMutation<DeleteScheduleResponse, DeleteScheduleVariable>(deleteScheduleGql, {
    update: (cache, _r, { variables }) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { readField }) {
            if (!prev) return prev
            return prev.filter((p) => {
              const list = readField<number>('id', p)
              return list !== variables?.id
            })
          }
        }
      })
    }
  })
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