import { useLazyQuery } from '@apollo/client';
import GetScheduleByDateGql from '@hooks/apollo/Schedule/graphql/query/GetScheduleByDateGql';

export default function useLazyGetScheduleByDate() {
  return useLazyQuery<
    GetScheduleByDateResponse,
    GetScheduleByDateVariable
  >(GetScheduleByDateGql)
}