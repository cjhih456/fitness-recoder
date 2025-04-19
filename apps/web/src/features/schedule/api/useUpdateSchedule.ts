import type { UpdateScheduleResponse, UpdateScheduleVariable } from '../model';
import { useMutation } from '@apollo/client'
import UpdateScheduleGql from './mutation/UpdateScheduleGql';

export default function useUpdateSchedule() {
  return useMutation<UpdateScheduleResponse, UpdateScheduleVariable>(UpdateScheduleGql, {
    update: (cache, result) => {
      if (!result.data) return
      const { updateSchedule } = result.data
      if (!updateSchedule) return
      cache.modify({
        id: cache.identify(updateSchedule),
        fields: {
          type: () => updateSchedule.type,
          beforeTime: () => updateSchedule.beforeTime,
          workoutTimes: () => updateSchedule.workoutTimes,
          breakTime: () => updateSchedule.breakTime,
          start: () => updateSchedule.start,
        }
      })
    }
  })
}