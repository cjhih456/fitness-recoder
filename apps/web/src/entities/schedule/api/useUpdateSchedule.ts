import { useMutation } from '@apollo/client'
import UpdateScheduleGql from '../api/graphql/mutation/UpdateScheduleGql';

export default function useUpdateSchedule() {
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