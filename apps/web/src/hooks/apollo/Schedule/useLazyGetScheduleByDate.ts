import { useLazyQuery } from '@apollo/client';
import GetScheduleByDateGql from '@graphQuery/Query/Schedule/GetScheduleByDateGql';

export default function useLazyGetScheduleByDate() {
  return useLazyQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(GetScheduleByDateGql)
}