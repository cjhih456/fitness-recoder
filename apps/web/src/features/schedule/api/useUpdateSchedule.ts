import type { UpdateScheduleResponse, UpdateScheduleVariable } from '../model';
import { useMutation } from '@apollo/client'
import updateScheduleCache from '@entities/schedule/lib/updateScheduleCache';
import UpdateScheduleGql from './mutation/UpdateScheduleGql';

export default function useUpdateSchedule() {
  return useMutation<UpdateScheduleResponse, UpdateScheduleVariable>(UpdateScheduleGql, {
    update: (cache, result) => {
      if (!result.data) return
      const { updateSchedule } = result.data
      if (!updateSchedule) return
      const { id } = updateSchedule
      updateScheduleCache(id, cache, (schedule) => {
        if (!schedule) return schedule
        return {
          ...schedule,
          type: updateSchedule.type,
          beforeTime: updateSchedule.beforeTime,
          workoutTimes: updateSchedule.workoutTimes,
          breakTime: updateSchedule.breakTime,
          start: updateSchedule.start,
        }
      })
    }
  })
}