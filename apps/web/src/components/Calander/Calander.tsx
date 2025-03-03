import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import useCalanderHook from '@hooks/useCalanderHook';
import StateRender from '@utils/StateRender';
import DateCalander from './DateCalander';
import MonthCalander from './MonthCalander';
import YearCalander from './YearCalander';

export type Mode = 'date' | 'month' | 'year'
export interface CalanderProps {
  value: string
  onChange: (_v: string) => void
  mode: Mode
  onChangeMode: (_v: Mode) => void
  statesByDate?: string[],
  startDate?: string,
  endDate?: string
}
export default function Calender({
  startDate = '1900-1-1',
  endDate = '2100-12-31',
  mode,
  value,
  statesByDate = [],
  onChange,
  onChangeMode
}: CalanderProps) {

  const { calcPossibleDate, startDateObj, endDateObj } = useCalanderHook({ startDate, endDate })

  const choosenDay = useMemo(() => {
    const [year, month, date] = value.split('-').map(v => +v)
    return {
      year,
      month,
      date
    }
  }, [value])

  function changeYear(v: number, mode?: boolean) {
    onChange(calcPossibleDate(`${v}-${choosenDay.month}-${choosenDay.date}`))
    if (mode) onChangeMode('month')
  }

  function changeMonth(v: number) {
    if (v === 0) {
      onChange(calcPossibleDate(`${choosenDay.year - 1}-${12}-${choosenDay.date}`))
      return
    } else if (v === 13) {
      onChange(calcPossibleDate(`${choosenDay.year + 1}-${1}-${choosenDay.date}`))
    } else {
      onChange(calcPossibleDate(`${choosenDay.year}-${v}-${choosenDay.date}`))
    }
    onChangeMode('date')
  }
  function changeDate(v: number) {
    onChange(calcPossibleDate(`${choosenDay.year}-${choosenDay.month}-${v}`))
  }

  return (
    <div className="h-min border-medium border-divider p-4 rounded-medium flex flex-col gap-4 transition-size">
      <StateRender
        condition={mode}
        render={{
          year: <YearCalander
            startYear={startDateObj.year}
            year={choosenDay.year}
            endYear={endDateObj.year}
            onChange={(v) => changeYear(v, true)}
          />,
          month: [
            <div key='month-top' className="flex gap-2 justify-center content-center">
              <Button isIconOnly radius='full' onClick={() => changeYear(choosenDay.year - 1)}> - </Button>
              <Button className='font-bold' onClick={() => onChangeMode('year')}>{choosenDay.year}</Button>
              <Button isIconOnly radius='full' onClick={() => changeYear(choosenDay.year + 1)}> + </Button>
            </div>,
            <MonthCalander
              key="month-picker"
              year={choosenDay.year}
              month={choosenDay.month}
              startDate={startDate}
              endDate={endDate}
              onChange={changeMonth}
            />
          ],
          date: [
            <div key='date-top' className="flex gap-2 justify-center content-center">
              <Button isIconOnly radius='full' onClick={() => changeMonth(choosenDay.month - 1)}> - </Button>
              <Button className='font-bold' onClick={() => onChangeMode('month')}>
                {`${choosenDay.year} - ${String(choosenDay.month).padStart(2, '0')}`}
              </Button>
              <Button isIconOnly radius='full' onClick={() => changeMonth(choosenDay.month + 1)}> + </Button>
            </div>,
            <DateCalander
              key="date-picker"
              year={choosenDay.year}
              month={choosenDay.month}
              startDate={startDate}
              date={choosenDay.date}
              endDate={endDate}
              statesByDate={statesByDate}
              onChange={changeDate}
            />
          ]
        }}
      />
    </div>
  );
}
