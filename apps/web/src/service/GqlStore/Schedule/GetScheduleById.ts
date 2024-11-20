import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'
import { Schedule } from 'fitness-struct'


type GetScheduleByIdResponse = { getScheduleById: Schedule.Schedule }
type GetScheduleByIdVAriable = { id: number }
const getScheduleByIdGql = gql`
query GetScheduleById($id: ID!) {
  getScheduleById(id: $id) {
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
export function useGetScheduleById(id: number) {
  return useQuery<GetScheduleByIdResponse, GetScheduleByIdVAriable>(getScheduleByIdGql, {
    variables: { id: Number(id) }
  })
}
export function useLazyGetScheduleById() {
  return useLazyQuery<GetScheduleByIdResponse, GetScheduleByIdVAriable>(getScheduleByIdGql)
}
export const GetScheduleByIdMock: MockedResponse<GetScheduleByIdResponse, GetScheduleByIdVAriable> = {
  request: {
    query: getScheduleByIdGql
  },
  result: (v) => {
    return {
      data: {
        getScheduleById: ScheduleMockData[v.id]
      }
    }
  }
}