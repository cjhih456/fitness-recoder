

import { useScheduleInfoStore } from './ScheduleInfoStore'
import { useScheduleKeyStore } from './ScheduleKeyStore'


export const enum ScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
}

export const calanderColor = (year: number, month: number, date: number, selectedYear: number, selectedMonth: number, selectedDate: number, scheduleList: ScheduleData[]) => {
  if (
    year === selectedYear &&
    month === selectedMonth &&
    date === selectedDate
  ) return 'bg-primary'

  if (scheduleList.length) {
    switch (scheduleList[0].type) {
      case ScheduleType.BREAK:
        return 'bg-warning-500 text-default'
      case ScheduleType.FINISH:
        return 'bg-success-300'
      case ScheduleType.SCHEDULED:
        return 'bg-default'
      case ScheduleType.STARTED:
        return 'bg-success-700 text-success-100'
    }
  }
  return 'text-default-500'
}


const useScheduleStore = () => {
  const scheduleKeyStore = useScheduleKeyStore()
  const scheduleInfoStore = useScheduleInfoStore()
  const getScheduleByData = (year: number, month: number, date: number) => {
    const keyList = scheduleKeyStore.getRelationByDate(year, month, date)
    return keyList.map(v => scheduleInfoStore.getSchedule(v))
  }
  const getSchedule = (id: string) => {
    return scheduleInfoStore.getSchedule(id)
  }
  const createSchedule = (year: number, month: number, date: number) => {
    const id = scheduleInfoStore.createSchedule(year, month, date)
    scheduleKeyStore.addRelationByDate(year, month, date, id)
    return id
  }
  const setBreakDay = (year: number, month: number, date: number) => {
    const id = createSchedule(year, month, date)
    scheduleInfoStore.setBreakDay(id)
  }
  return {
    getScheduleByData,
    getSchedule,
    createSchedule,
    setBreakDay,
    getRelationByDate: scheduleKeyStore.getRelationByDate,
    addExercise: scheduleInfoStore.addExercise,
    startSchedule: scheduleInfoStore.startSchedule,
    pauseTimer: scheduleInfoStore.pauseTimer
  }
}

export default useScheduleStore