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
      case ScheduleType.PAUSED:
        return 'bg-blue-100 text-default'
    }
  }
  return 'text-default-500'
}
