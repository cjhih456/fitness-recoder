import { ScheduleType } from '../../../components/utils'
import { useCreateExerciseBySchedule } from '../Exercise'
import { useCreateSchedule } from '../Schedule'

export function useCreateScheduleWithExercisePlans() {
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

    if (!schedule.errors && exerciseList.length) {
      const scheduleId = Number(schedule.data?.createSchedule.id)
      await createExerciseBySchedule({
        variables: {
          exercise: {
            scheduleId,
            exerciseId: exerciseList
          }
        }
      })
      return schedule.data?.createSchedule
    }
    return undefined
  }
}