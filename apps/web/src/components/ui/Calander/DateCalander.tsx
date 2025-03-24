import type { ReactNode } from 'react'
import { Button } from '@heroui/react'
import { useMemo } from 'react'
import { calanderColor } from '@utils'
import DateUtil from '@utils/DateUtil'
import useCalanderHook from './hooks/useCalanderHook'
interface DateCalanderProps {
  year: number
  month: number
  date: number
  startDate?: string
  endDate?: string
  statesByDate?: string[]
  onChange: (_v: number) => void
}

const dateStr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function DateCalander({ year, month, date, startDate, endDate, statesByDate = [], onChange }: DateCalanderProps) {

  const { checkIsPossibleDate } = useCalanderHook({ startDate, endDate })

  const thisMonthNumber = useMemo(() => DateUtil.dateStringAsDateNumber(`${year}-${month}-1`) - 1, [year, month])
  const daysCount = DateUtil.getDaysByMonth(year)
  const startTemp = useMemo(() => {
    return DateUtil.calcWeek(year, month)
  }, [year, month])

  const temp: ReactNode[][] = [[], [], [], [], [], []]
  const largeNum = daysCount[month - 1] + startTemp
  const times = 42
  for (let i = 0; i < times; i++) {
    if (i < startTemp || i >= largeNum) {
      temp[Math.floor(i / 7)].push(<div key={`date-empty-${i}`} className="flex-1 w-10 h-10"></div>)
    } else {
      const todayDate = i - startTemp + 1
      const disable = !checkIsPossibleDate(thisMonthNumber + todayDate)

      temp[Math.floor(i / 7)].push(<Button
        key={`date-${todayDate}`}
        isDisabled={disable}
        variant='bordered'
        onPress={() => onChange(todayDate)}
        className={['flex-1 px-0 min-w-[40px]', calanderColor(year, month, todayDate, year, month, date, statesByDate[todayDate])].join(' ')}
        radius='full'
      >{todayDate}</Button>)
    }
  }
  return <div className="grid grid-rows-7 grid-cols-7 gap-1 justify-items-stretch min-w-[320px]">
    {dateStr.map((v, i) => <div key={`date-week-${i}`} className="flex-1 flex justify-center items-center min-w-10 h-10">{v}</div>)}
    {temp}
  </div>
}