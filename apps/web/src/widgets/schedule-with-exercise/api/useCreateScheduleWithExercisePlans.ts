import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import { useCreateExerciseBySchedule } from '@features/exercise/api'
import { useCreateSchedule } from '@features/schedule/api'

export default function useCreateScheduleWithExercisePlans() {
  const [createSchedule] = useCreateSchedule()
  const [createExerciseBySchedule] = useCreateExerciseBySchedule()
  return async (year: number, month: number, date: number, exerciseList: number[]) => {
    const schedule = await createSchedule({
      variables: {
        createSchedule: {
          year,
          date,
          month,
          type: ScheduleType.SCHEDULED
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