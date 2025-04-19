import { useSuspenseQuery } from '@apollo/client'
import GetScheduleByIdGql from './query/GetScheduleByIdGql';

export default function useGetScheduleById(id: number) {
  return useSuspenseQuery<GetScheduleByIdResponse, GetScheduleByIdVariable>(GetScheduleByIdGql, {
    variables: { id: Number(id) }
  })
}