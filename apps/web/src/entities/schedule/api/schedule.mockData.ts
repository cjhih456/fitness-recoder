import { ScheduleType } from '@entities/schedule/model/ScheduleType'
import { DateService } from '@shared/lib/dateService'

const { month, year } = DateService.takeTodayDateValue()
const daysByMonth = DateService.getDaysInMonth(year, month)

const typeTemp = [ScheduleType.BREAK, ScheduleType.FINISH, ScheduleType.PAUSED, ScheduleType.SCHEDULED, ScheduleType.STARTED]
export const ScheduleMockData: { [key: number]: ScheduleStoreType } = Array(daysByMonth).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    date: id,
    month,
    year,
    id: id,
    type: typeTemp[i % 5],
    beforeTime: 0,
    breakTime: 0,
    start: 0,
    workoutTimes: 0
  } as ScheduleStoreType
  return acc
}, {})
