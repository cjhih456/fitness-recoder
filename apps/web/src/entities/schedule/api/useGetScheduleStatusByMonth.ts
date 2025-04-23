import type { GetScheduleStatusByMonthResponse, GetScheduleStatusByMonthVariable } from '../model';
import { useSuspenseQuery } from '@apollo/client'
import GetScheduleStatusByMonthGql from '@entities/schedule/api/query/GetScheduleStatusByMonthGql';

export default function useGetScheduleStatusByMonth(year: number, month: number) {
  return useSuspenseQuery<GetScheduleStatusByMonthResponse,
    GetScheduleStatusByMonthVariable>(GetScheduleStatusByMonthGql, {
      variables: {
        year,
        month
      }
    })
}
