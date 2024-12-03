import { ScheduleType } from '../../../components/utils'
import { useCreateSchedule } from './CreateSchedule'
import { useDeleteSchedule } from './DeleteSchedule'
import { useGetScheduleByDate, useLazyGetScheduleByDate } from './GetScheduleByDate'
import { useGetScheduleById } from './GetScheduleById'
import { useGetScheduleStatusByDate } from './GetScheduleStatusByDate'
import { useUpdateSchedule } from './UpdateSchedule'
import { useCloneSchedule } from './CloneSchedule'
import { useCloneScheduleFromPreset } from './CloneScheduleFromPreset'
import { Schedule } from 'fitness-struct'
import { gql, StoreObject } from '@apollo/client'
import DateUtil from '../../../components/utils/DateUtil'

export const ScheduleSimpleFragment = gql`
fragment ScheduleSimple on ScheduleData{
  id
  type
  year
  month
  date
}
`
export const ScheduleTimeFragment = gql`
fragment ScheduleTime on ScheduleData{
  start
  beforeTime
  breakTime
  workoutTimes
}
`

export type ScheduleStoreType = Schedule.Schedule & StoreObject
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
