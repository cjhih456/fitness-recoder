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
function between(min: number, num: number, max: number) {
  return Math.max(min, Math.min(num, max))
}
function isLeapYear(year: number) {
  if (year % 4 === 0) {
    return year % 100 === 0 && year % 400 !== 0 ? 0 : 1
  }
  return 0
}
function getDaysByYear(year: number) {
  return 365 + isLeapYear(year)
}
function getDaysByMonth(year: number) {
  const daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  daysCount[1] += isLeapYear(year)
  return daysCount
}

/**
 * Calculate D{date} from 1999-12-31.
 * @param dateString target date string
 */
function dateStringAsDateNumber(dateString: string) {
  const [year, month, date] = dateString.split('-').map(v => +v)
  let i = 2000
  let totalDays = 0
  while (true) {
    const daysByYear = getDaysByYear(i)
    if (i === year) {
      break
    } else if (i < year) {
      totalDays += daysByYear
      i = i + 1
    } else if (i > year) {
      totalDays -= daysByYear
      i = i - 1
    }
  }
  const daysByMonth = getDaysByMonth(year)
  const monthN = between(0, month - 1, 11)
  for (let i = 0; i < monthN; i++) {
    totalDays += daysByMonth[i]
  }
  totalDays += between(1, date, daysByMonth[month - 1])
  return totalDays
}

/**
 * Make Date string from D{date}.
 * @param daysNumber D{date}
 */
function dateNumberAsDateString(daysNumber: number) {
  let nowDate = daysNumber
  let year = 2000, month = 0, day = 0
  // TODO: calc Year
  if (daysNumber > 0) {
    while (true) {
      const yDate = getDaysByYear(year)
      if (nowDate <= yDate) {
        break
      }
      nowDate -= yDate
      year++
    }
  } else {
    while (true) {
      const yDate = getDaysByYear(year - 1)
      if (nowDate > 0) {
        break
      }
      nowDate += yDate
      year--
    }
  }

  // TODO: calc Month
  const daysByMonth = getDaysByMonth(year)
  let i = 0;
  while (!month) {
    if (nowDate > daysByMonth[i]) {
      nowDate -= daysByMonth[i++]
    } else {
      month = i + 1
    }
  }

  // TODO: calc Day
  day = nowDate
  return `${year}-${month}-${day}`
}
export default {
  between,
  calcWeek,
  isLeapYear,
  getDaysByMonth,
  dateStringAsDateNumber,
  dateNumberAsDateString
}