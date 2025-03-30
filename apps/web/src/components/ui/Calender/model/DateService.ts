import type { DateRange, DateValue } from '../types'
import type { CalendarMode } from '../ui/types'

export default class DateService {
  static takeTodayDateValue(time: Date = new Date()): DateValue {
    return {
      year: time.getFullYear(),
      month: time.getMonth() + 1,
      date: time.getDate(),
    }
  }

  private static getUTC(year: number, month: number, day?: number) {
    return Date.UTC(year, month - 1, day)
  }

  /**
   * 특정 날짜가 무슨 요일인지 알려줍니다.
   * @param year 년도
   * @param month 월 1~12
   * @param day 일
   * @returns (0: 일요일, 6: 토요일)
   */
  private static calcWeek(year: number, month: number, day: number = 1) {
    return new Date(this.getUTC(year, month, day)).getUTCDay()
  }

  /**
   * DateService.calcWeek 를 기반으로 yyyy-mm의 1일이 무슨 요일인지 계산합니다.
   * @param year 년도
   * @param month 월 1~12
   * @returns (0: 일요일, 6: 토요일)
   */
  static getFirstDayOfMonth(year: number, month: number) {
    return this.calcWeek(year, month, 1)
  }

  /**
   * 날짜 문자열을 DateValue 객체로 변환합니다.
   * @param dateString yyyy-mm-dd 문자열 혹은 DateValue 객체
   * @returns DateValue 객체
   */
  static parseDateString(dateString: string | DateValue): DateValue {
    if (typeof dateString !== 'string') {
      return dateString
    }
    const [year, month, date] = dateString.split('-').map(v => +v);
    return { year, month, date };
  }

  /**
   * DateValue 객체를 날짜 문자열로 변환합니다.
   * @param dateValue DateValue 객체
   * @returns yyyy-mm-dd
   */
  static formatDateValue(dateValue: DateValue) {
    const { year, month, date } = dateValue;
    return `${year}-${month}-${date}`;
  }

  /**
   * 년도가 윤년인지 확인합니다
   * @param year 년도
   * @returns boolean
   */
  private static isLeapYear(year: number) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
  }

  /**
   * yyyy-mm의 날수를 반환합니다
   * @param year 년
   * @param month 월
   * @returns day number
   */
  static getDaysInMonth(year: number, month: number) {
    const temp = [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    return temp[month - 1]
  }

  static dateToNumber(date: DateValue | string): number {
    let v = date
    if (typeof v === 'string') {
      v = this.parseDateString(v)
    }
    return this.getUTC(v.year, v.month, v.date)
  }

  static dateNumberToDateValue(dateNumber: number): DateValue {
    const date = new Date(dateNumber)
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      date: date.getUTCDate()
    }
  }

  static dateNumberToDateString(dateNumber: number): string {
    return this.formatDateValue(this.dateNumberToDateValue(dateNumber))
  }

  static adjustDateToRange(date: string | DateValue, range: DateRange): DateValue {
    const max = this.dateToNumber(range.endDate)
    const min = this.dateToNumber(range.startDate)
    const num = this.dateToNumber(date)
    return this.dateNumberToDateValue(Math.max(min, Math.min(num, max)))
  }

  static isYearInRange(target: string | DateValue, range: DateRange) {
    const { year: startYear } = range.startDate
    const { year: endYear } = range.endDate
    const { year: targetYear } = this.parseDateString(target)
    return startYear <= targetYear && targetYear <= endYear;
  }

  static isMonthInRange(target: string | DateValue, range: DateRange) {
    const startNum = this.dateToNumber({ ...range.startDate, date: 1 })
    const endNum = this.dateToNumber({ ...range.endDate, date: 1 })

    const targetDateValue = this.parseDateString(target)
    const targetNum = this.dateToNumber({ ...targetDateValue, date: 1 })
    return startNum <= targetNum && targetNum <= endNum;
  }

  static isDateInRange(target: string | DateValue, range: DateRange) {
    const endNum = this.dateToNumber(range.endDate)
    const startNum = this.dateToNumber(range.startDate)
    const targetNum = this.dateToNumber(target)
    return startNum <= targetNum && targetNum <= endNum;
  }

  static isEqual(a: DateValue, b: DateValue, mode: CalendarMode = 'date') {
    switch (mode) {
      case 'year':
        return a.year === b.year
      case 'month':
        return a.month === b.month && a.year === b.year
      case 'date':
        return a.date === b.date && a.month === b.month && a.year === b.year
      default:
        return false
    }
  }
}
