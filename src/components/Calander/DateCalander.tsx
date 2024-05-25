import { Button } from '@nextui-org/react'
import utils from '../utils'
import { useMemo } from 'react'
import useScheduleStore, { calanderColor } from '../../service/Store/ScheduleStoreHooks'

interface DateCalanderProps {
  year: number
  month: number
  date: number
  startDate?: number
  endDate?: number
  onChange: (v: number) => void
}

const dateStr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function DateCalander({ year, month, date, startDate, endDate, onChange }: DateCalanderProps) {
  // Store
  const scheduleStore = useScheduleStore()

  const displayStartDate = useMemo(() => startDate || 0, [startDate])
  const displayEndDate = useMemo(() => endDate || 32, [endDate])

  const daysCount = utils.getDaysByMonth(year)
  const startTemp = utils.calcWeek(year, month)

  const temp = [[], [], [], [], [], []] as JSX.Element[][]
  const largeNum = daysCount[month - 1] + startTemp
  const times = 42
  for (let i = 0; i < times; i++) {
    if (i < startTemp || i >= largeNum) {
      temp[Math.floor(i / 7)].push(<div key={`date-empty-${i}`} className="flex-1 w-10 h-10"></div>)
    } else {
      const todayDate = i - startTemp + 1
      const disable = todayDate < displayStartDate || todayDate > displayEndDate

      temp[Math.floor(i / 7)].push(<Button
        key={`date-${todayDate}`}
        isDisabled={disable}
        variant='bordered'
        onClick={() => onChange(todayDate)}
        className={['flex-1 px-0 max-w-[40px]', calanderColor(year, month, todayDate, year, month, date, scheduleStore.getScheduleByData(year, month, todayDate))].join(' ')}
        isIconOnly
        radius='full'
      >{todayDate}</Button>)
    }
  }
  return <div className="grid grid-rows-7 grid-cols-7 gap-y-2 flex-col">
    {dateStr.map((v, i) => <div key={`date-week-${i}`} className="flex-1 flex justify-center items-center w-10 h-10">{v}</div>)}
    {temp}
  </div>
}