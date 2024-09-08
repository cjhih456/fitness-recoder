import { useCreateExercise } from '../Exercise'
import { useCreateSchedule } from '../Schedule'

export function useCreateScheduleWithExercisePlans() {
  const [createSchedule] = useCreateSchedule()
  const [createExercise] = useCreateExercise()
  return async (year: number, month: number, date: number, exerciseList: number[]) => {
    const schedule = await createSchedule({
      variables: {
        'schedule': {
          'beforeTime': 0,
          'breakTime': 0,
          'year': year,
          'date': date,
          'month': month,
          'start': 0,
          'type': 'SCHEDULED',
          workoutTimes: 0
        } as Schedule
      }
    })

    if (!schedule.errors && exerciseList.length) {
      const scheduleId = Number(schedule.data?.createSchedule.id)

      await Promise.all(exerciseList.map((exerciseId) => {
        return createExercise({
          variables: {
            exercise: {
              scheduleId,
              exerciseId
            }
          }
        })
      }))
    }
  }
}