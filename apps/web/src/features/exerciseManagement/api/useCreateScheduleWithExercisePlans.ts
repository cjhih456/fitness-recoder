import { useCreateExerciseBySchedule } from '@entities/exercise/api'
import { useCreateSchedule } from '@entities/schedule/api'
import { ScheduleType } from '@entities/schedule/model/ScheduleType';

export default function useCreateScheduleWithExercisePlans() {
  const [createSchedule] = useCreateSchedule()
  const [createExerciseBySchedule] = useCreateExerciseBySchedule()
  return async (year: number, month: number, date: number, exerciseList: number[]) => {
    const schedule = await createSchedule({
      variables: {
        createSchedule: {
          beforeTime: 0,
          breakTime: 0,
          year,
          date,
          month,
          start: 0,
          type: ScheduleType.SCHEDULED,
          workoutTimes: 0
        }
      }
    })

    if (schedule.errors || !schedule.data) {
      throw Error('Schedule Create Failed')
    }

    const scheduleId = Number(schedule.data.createSchedule.id)
    if (exerciseList.length) {
      await createExerciseBySchedule({
        variables: {
          exercise: {
            scheduleId,
            fitnessIds: exerciseList
          }
        }
      })
    }
    return schedule.data.createSchedule
  }
}