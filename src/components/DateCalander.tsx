import { Button } from '@nextui-org/react'
import utils from './utils'
import { useMemo } from 'react'
import { Schedule } from '../service/Store/Schedule'
import { useScheduleStore } from '../service/Store/ScheduleStore'

interface DateCalanderProps {
  year: number
  month: number
  date: number
  startDate?: number
  endDate?: number
  onChange: (v: number) => void
}

const dateStr = ['일', '월', '화', '수', '목', '금', '토']

export default function DateCalander({ year, month, date, startDate, endDate, onChange }: DateCalanderProps) {
  // Store
  const scheduleStore = useScheduleStore(state => state.getScheduleData)

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
        onClick={() => onChange(todayDate)}
        className={['flex-1', Schedule.calanderColor(year, month, todayDate, year, month, date, scheduleStore(year, month, todayDate))].join(' ')}
        isIconOnly
        radius='full'
      >{todayDate}</Button>)
    }
  }
  return <div className="flex gap-y-2 flex-col">
    <div className="flex gap-x-2 flex-nowrap">
      {dateStr.map((v, i) => <div key={`date-week-${i}`} className="flex-1 flex justify-center items-center w-10 h-10">{v}</div>)}
    </div>
    {temp.map((r, i) => <div key={`date-row-${i}`} className="flex flex-nowrap gap-x-2">{r}</div>)}
  </div>
}