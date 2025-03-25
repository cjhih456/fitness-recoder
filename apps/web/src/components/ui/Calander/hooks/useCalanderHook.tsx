import { useCallback, useMemo } from 'react'
import DateUtil from '@utils/DateUtil'

export interface useCalanderHookProps {
  startDate?: string
  endDate?: string
}

const useCalanderHook = ({ startDate, endDate }: useCalanderHookProps) => {

  const cleanDate = useCallback((date: string) => {
    return DateUtil.dateNumberAsDateString(DateUtil.dateStringAsDateNumber(date))
  }, [])

  // StartDate
  const startDateDisplay = useMemo(() => cleanDate(startDate || '1900-1-1'), [startDate, cleanDate])
  const startDateObj = useMemo(() => {
    const [year, month, date] = startDateDisplay.split('-').map(v => +v)
    return {
      year, month, date
    }
  }, [startDateDisplay])
  const startNum = useMemo(() => {
    return DateUtil.dateStringAsDateNumber(startDateDisplay)
  }, [startDateDisplay])

  // EndDate
  const endDateDisplay = useMemo(() => cleanDate(endDate || '2100-12-31'), [endDate, cleanDate])
  const endDateObj = useMemo(() => {
    const [year, month, date] = endDateDisplay.split('-').map(v => +v)
    return {
      year, month, date
    }
  }, [endDateDisplay])
  const endNum = useMemo(() => {
    return DateUtil.dateStringAsDateNumber(endDateDisplay)
  }, [endDateDisplay])

  const validMonthWithValues = useCallback((year: number, month: number) => {
    const startDateByMonths = DateUtil.getDaysByMonth(startDateObj.year)
    const startNum = DateUtil.dateStringAsDateNumber(`${startDateObj.year}-${startDateObj.month}-${startDateByMonths[startDateObj.month - 1]}`)

    const endNum = DateUtil.dateStringAsDateNumber(`${endDateObj.year}-${endDateObj.month}-1`)
    const dateByMonths = DateUtil.getDaysByMonth(year)
    const targetSNum = DateUtil.dateStringAsDateNumber(`${year}-${month}-${dateByMonths[month]}`)
    const targetENum = DateUtil.dateStringAsDateNumber(`${year}-${month}-1`)
    return targetSNum < startNum || endNum < targetENum
  }, [startDateObj, endDateObj])
  /**
     * Validation Check between D{date} from 1999-12-31 is possible.
     */
  const checkIsPossibleDate = useCallback((date: number | string) => {
    const dateNumber = typeof date === 'number' ? date : DateUtil.dateStringAsDateNumber(date)
    return startNum <= dateNumber && dateNumber <= endNum
  }, [startNum, endNum])

  const calcPossibleDate = useCallback((date: string) => {
    const chooseNum = DateUtil.dateStringAsDateNumber(date)
    const possibleDateNum = Math.max(startNum, Math.min(chooseNum, endNum))

    return DateUtil.dateNumberAsDateString(possibleDateNum)

  }, [startNum, endNum])

  return {
    validMonthWithValues,
    checkIsPossibleDate,

    calcPossibleDate,
  }
}

export default useCalanderHook