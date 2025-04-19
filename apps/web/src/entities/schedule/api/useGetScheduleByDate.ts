import { useSuspenseQuery } from '@apollo/client'
import GetScheduleByDateGql from './query/GetScheduleByDateGql';

export default function useGetScheduleByDate(year: number, month: number, date: number) {
  return useSuspenseQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(GetScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}
