import type { CloneScheduleResponse, CloneScheduleVariable } from '../model';
import type { GetScheduleByDateResponse } from '@entities/schedule/model';
import { useMutation } from '@apollo/client'
import CloneSchedule from './mutation/CloneScheduleGql';

export default function useCloneSchedule() {
  return useMutation<CloneScheduleResponse, CloneScheduleVariable>(CloneSchedule, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.cloneSchedule) return prev
            const ref = toReference(result.data?.cloneSchedule, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}
