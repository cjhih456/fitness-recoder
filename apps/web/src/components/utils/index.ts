export { default as dayjs } from './dayjs'

export const enumify = <T extends { [index: string]: U }, U extends string>(x: T): T => x;

export function baseURL(url?: string) {
  return (import.meta.env.VITE_URL_ROOT + (url ?? '')).replace(/\/\//g, '/')
}

export const ScheduleType = enumify({
  BREAK: 'BREAK',
  SCHEDULED: 'SCHEDULED',
  STARTED: 'STARTED',
  PAUSED: 'PAUSED',
  FINISH: 'FINISH',
})

export const calanderColor = (year: number, month: number, date: number, selectedYear: number, selectedMonth: number, selectedDate: number, type: string) => {
  if (
    year === selectedYear &&
    month === selectedMonth &&
    date === selectedDate
  ) return 'bg-primary'
  const tempType = (type || '').split(',')
  if (tempType.length) {
    switch (tempType[0]) {
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

export default {
  enumify,
  ScheduleType,
  baseURL,
  calanderColor
}