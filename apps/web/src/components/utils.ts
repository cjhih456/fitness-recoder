
// Zeller’s congruence
function calcWeek(year: number, month: number, d: number = 1) {
  let m = month
  let y = year
  if (m < 3) {
    m += 12
    y -= 1
  }
  const c = Math.floor(y / 100)
  const k = y % 100
  const h = (Math.floor(c / 4) - 2 * c + k + Math.floor(k / 4) + Math.floor(13 * (m + 1) / 5) + d - 1) % 7
  return (h + 7) % 7
}
function isLeapYear(year: number) {
  if (year % 4 === 0) {
    return year % 100 === 0 && year % 400 !== 0 ? 0 : 1
  }
  return 0
}
function getDaysByMonth(year: number) {
  const daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  daysCount[1] += isLeapYear(year)
  return daysCount
}
function getDisplayYears(startYear?: number, endYear?: number) {
  return {
    displayStartYear: startYear || new Date().getFullYear() - 15,
    displayEndYear: endYear || new Date().getFullYear() + 15
  }
}
function getDisplayMonths(startMonth?: number, endMonth?: number) {
  const todayMonth = new Date().getMonth() + 1
  return {
    displayStartMonth: startMonth || todayMonth,
    displayEndMonth: endMonth || todayMonth
  }
}
function getDisplayDates(startDate?: number, endDate?: number) {
  const todayDate = new Date().getDate()
  return {
    displayStartDate: startDate || todayDate,
    displayEndDate: endDate || todayDate
  }
}

export function baseURL(url?: string) {
  return (import.meta.env.VITE_URL_ROOT + (url ?? '')).replace(/\/\//g, '/')
}

export const enum ScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
}

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
  calcWeek,
  isLeapYear,
  getDaysByMonth,
  getDisplayYears,
  getDisplayMonths,
  getDisplayDates,
  baseURL,
  calanderColor
}