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
function getDaysByYear(year: number) {
  return 365 + isLeapYear(year)
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
function dateStringAsNumber(dateString: string) {
  const [year, month, date] = dateString.split('-').map(v => +v)
  let i = 2000
  let totalDays = date
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
  const monthN = month - 1
  for (let i = 0; i < monthN; i++) {
    totalDays += daysByMonth[i]
  }
  return totalDays
}
function numberAsDateString(daysNumber: number) {
  let nowDate = daysNumber
  let year = 2000, month = 0, day = 0
  if (daysNumber > 0) {
    while (true) {
      const yDate = getDaysByYear(year)
      if (nowDate < yDate) {
        break
      }
      nowDate -= yDate
      year++
    }
  } else {
    while (true) {
      const yDate = getDaysByYear(year)
      if (nowDate > 0) {
        break
      }
      nowDate += yDate
      year--
    }
  }

  const daysByMonth = getDaysByMonth(year)
  daysByMonth.forEach((m, i) => {
    if (nowDate > m) {
      nowDate -= m
    } else if (!month) {
      month = i + 1
    }
  })
  day = nowDate
  return `${year}-${month}-${day}`
}
export default {
  calcWeek,
  isLeapYear,
  getDaysByMonth,
  getDisplayYears,
  getDisplayMonths,
  getDisplayDates,
  dateStringAsNumber,
  numberAsDateString
}