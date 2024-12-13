import { useCallback, useMemo } from 'react'
import DateUtil from '../../components/utils/DateUtil'

export interface useCalanderHookProps {
  startDate?: string
  endDate?: string
}

export const useCalanderHook = ({ startDate, endDate }: useCalanderHookProps) => {

  const cleanDate = useCallback((date: string) => {
    return DateUtil.numberAsDateString(DateUtil.dateStringAsNumber(date))
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
    return DateUtil.dateStringAsNumber(startDateDisplay)
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
    return DateUtil.dateStringAsNumber(endDateDisplay)
  }, [endDateDisplay])

  const validMonthWithValues = useCallback((year: number, month: number) => {
    const startDateByMonths = DateUtil.getDaysByMonth(startDateObj.year)
    const startNum = DateUtil.dateStringAsNumber(`${startDateObj.year}-${startDateObj.month}-${startDateByMonths[startDateObj.month]}`)
    const endNum = DateUtil.dateStringAsNumber(`${endDateObj.year}-${endDateObj.month}-1`)
    const dateByMonths = DateUtil.getDaysByMonth(year)
    const targetSNum = DateUtil.dateStringAsNumber(`${year}-${month}-${dateByMonths[month]}`)
    const targetENum = DateUtil.dateStringAsNumber(`${year}-${month}-1`)
    return (targetSNum < startNum || endNum < targetENum)
  }, [startDateObj, endDateObj])

  /**
   * Validation Check between D{date} from 1999-12-31 is possible.
   */
  const validDateWithNumber = useCallback((date: number) => {
    return startNum <= date && date <= endNum
  }, [startNum, endNum])
  /**
     * Validation Check between D{date} from 1999-12-31 is possible.
     */
  const validDateWithString = useCallback((date: string) => {
    const num = DateUtil.dateStringAsNumber(date)
    return validDateWithNumber(num)
  }, [validDateWithNumber])

  const calcPossibleDate = useCallback((date: string) => {
    const chooseNum = DateUtil.dateStringAsNumber(date)
    const possibleDateNum = Math.max(startNum, Math.min(chooseNum, endNum))

    return DateUtil.numberAsDateString(possibleDateNum)

  }, [startNum, endNum])

  return {
    startNum,
    endNum,

    startDateObj,
    endDateObj,

    validMonthWithValues,
    validDateWithString,
    validDateWithNumber,

    calcPossibleDate,
  }
}

