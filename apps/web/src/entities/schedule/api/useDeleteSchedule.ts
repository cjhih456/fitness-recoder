import { useMutation } from '@apollo/client'
import DeleteScheduleGql from '@entities/schedule/api/graphql/mutation/DeleteScheduleGql';

export default function useDeleteSchedule() {
  return useMutation<DeleteScheduleResponse, DeleteScheduleVariable>(DeleteScheduleGql, {
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