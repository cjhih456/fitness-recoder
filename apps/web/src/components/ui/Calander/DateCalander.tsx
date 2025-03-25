import type { BaseCalanderProps } from './Calander'
import { Button } from '@heroui/react'
import { useCallback, useMemo } from 'react'
import { calanderColor } from '@utils'
import DateUtil from '@utils/DateUtil'
import StateRender from '@utils/StateRender'
import useCalanderHook from './hooks/useCalanderHook'

interface DateCalanderProps extends BaseCalanderProps {
  statesByDate?: string[]
}

const dateStr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function DateCalander({ value, statesByDate = [], onChange, ...props }: DateCalanderProps) {
  const { checkIsPossibleDate } = useCalanderHook(props)
  const [year, month, date] = value.split('-').map(v => +v)

  const thisMonthNumber = useMemo(() => DateUtil.dateStringAsDateNumber(`${year}-${month}-1`) - 1, [year, month])
  const daysCount = useMemo(() => DateUtil.getDaysByMonth(year), [year])
  const startTemp = useMemo(() => DateUtil.calcWeek(year, month), [year, month])

  const todayDate = (i: number) => i + 1

  const changeDate = useCallback((date: number) => {
    onChange([year, month, date].join('-'))
  }, [onChange, year, month])

  return <div className="grid grid-rows-7 grid-cols-7 gap-1 justify-items-stretch min-w-[320px]">
    {dateStr.map((v, i) => <div key={`date-week-${i}`} className="flex-1 flex justify-center items-center min-w-10 h-10">{v}</div>)}
    <StateRender.Boolean
      state={Boolean(startTemp)}
      render={{
        true: <div className={`col-span-${startTemp}`}></div>
      }}
    />
    {Array(daysCount[month - 1]).fill(0).map((_v, i) => <Button
      key={`date-btn-${i}`}
      isDisabled={!checkIsPossibleDate(thisMonthNumber + todayDate(i))}
      variant='bordered'
      onPress={() => changeDate(todayDate(i))}
      className={['flex-1 px-0 min-w-[40px]', calanderColor(todayDate(i) === date, statesByDate[todayDate(i)])].join(' ')}
      radius='full'
    >{todayDate(i)}</Button>)}
  </div>
}