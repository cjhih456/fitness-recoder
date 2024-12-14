import type { ScheduleStoreType } from '.';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useQuery } from '@apollo/client'
import { ScheduleMockData } from '.'

type GetScheduleByIdResponse = { getScheduleById: ScheduleStoreType }
type GetScheduleByIdVAriable = { id: number }
const getScheduleByIdGql = gql`
query GetScheduleById($id: Int!) {
  getScheduleById(id: $id) {
    ...ScheduleWithTime
  }
}
`
export function useGetScheduleById(id: number) {
  return useQuery<GetScheduleByIdResponse, GetScheduleByIdVAriable>(getScheduleByIdGql, {
    variables: { id: Number(id) },
    fetchPolicy: 'cache-first'
  })
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