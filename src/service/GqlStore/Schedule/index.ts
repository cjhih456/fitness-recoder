import utils, { ScheduleType } from '../../../components/utils'
import { useCreateSchedule } from './CreateSchedule'
import { useDeleteSchedule } from './DeleteSchedule'
import { useGetScheduleByDate, useLazyGetScheduleByDate } from './GetScheduleByDate'
import { useGetScheduleById, useLazyGetScheduleById } from './GetScheduleById'
import { useLazyGetScheduleStateByDate } from './GetScheduleStatusByDate'
import { useUpdateSchedule } from './UpdateSchedule'
import { useCloneSchedule } from './CloneSchedule'
import { useCloneScheduleFromPreset } from './CloneScheduleFromPreset'

export {
  useCreateSchedule,
  useDeleteSchedule,
  useGetScheduleByDate,
  useLazyGetScheduleByDate,
  useGetScheduleById,
  useLazyGetScheduleById,
  useLazyGetScheduleStateByDate,
  useUpdateSchedule,
  useCloneSchedule,
  useCloneScheduleFromPreset
}
const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()
const daysByMonth = utils.getDaysByMonth(year)
const typeTemp = [ScheduleType.BREAK, ScheduleType.FINISH, ScheduleType.PAUSED, ScheduleType.SCHEDULED, ScheduleType.STARTED]
export const ScheduleMockData: { [key: number]: Schedule } = Array(daysByMonth[month] - 1).fill(0).reduce((acc, cur, i) => {
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
  } as Schedule
  return acc
}, {})
