import { ScheduleType } from '@utils'
import DateUtil from '@utils/DateUtil'
import useCloneSchedule from './useCloneSchedule'
import useCloneScheduleFromPreset from './useCloneScheduleFromPreset'
import useCreateSchedule from './useCreateSchedule'
import useDeleteSchedule from './useDeleteSchedule'
import useGetScheduleByDate from './useGetScheduleByDate'
import useGetScheduleById from './useGetScheduleById'
import useGetScheduleStatusByDate from './useGetScheduleStatusByDate'
import useLazyGetScheduleByDate from './useLazyGetScheduleByDate'
import useUpdateSchedule from './useUpdateSchedule'

export {
  useCreateSchedule,
  useDeleteSchedule,
  useGetScheduleByDate,
  useLazyGetScheduleByDate,
  useGetScheduleById,
  useGetScheduleStatusByDate,
  useUpdateSchedule,
  useCloneSchedule,
  useCloneScheduleFromPreset
}
const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()
const daysByMonth = DateUtil.getDaysByMonth(year)

const typeTemp = [ScheduleType.BREAK, ScheduleType.FINISH, ScheduleType.PAUSED, ScheduleType.SCHEDULED, ScheduleType.STARTED]
export const ScheduleMockData: { [key: number]: ScheduleStoreType } = Array(daysByMonth[month - 1]).fill(0).reduce((acc, _cur, i) => {
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
