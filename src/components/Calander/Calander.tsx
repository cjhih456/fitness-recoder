import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import utils from '../utils';
import DateCalander from './DateCalander';
import MonthCalander from './MonthCalander';
import YearCalander from './YearCalander';

type Mode = 'date' | 'month' | 'year'
export interface CalanderProps {
  startYear?: number
  endYear?: number
  startMonth?: number
  endMonth?: number
  startDate?: number
  endDate?: number
  mode?: Mode
  value: string
  onChange: (v: string) => void
}
export default function Calender({
  startYear,
  endYear,
  startMonth,
  endMonth,
  startDate,
  endDate,
  mode: startMode,
  value,
  onChange
}: CalanderProps) {
  const todayDate = new Date().getDate()
  const [mode, setMode] = useState<Mode>('year')
  const [choosenDay, setChoosenDay] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: todayDate
  })

  const { displayStartYear, displayEndYear } = useMemo(() => {
    return utils.getDisplayYears(startYear, endYear)
  }, [startYear, endYear])

  const { displayStartMonth, displayEndMonth } = useMemo(() => {
    const { displayStartMonth, displayEndMonth } = utils.getDisplayMonths(startMonth, endMonth)
    return {
      displayStartMonth: choosenDay.year === displayStartYear ? displayStartMonth : 1,
      displayEndMonth: choosenDay.year === displayEndYear ? displayEndMonth : 12
    }
  }, [startMonth, endMonth, choosenDay, displayStartYear, displayEndYear])

  const { displayStartDate, displayEndDate } = useMemo(() => {
    const { displayStartDate, displayEndDate } = utils.getDisplayDates(startDate, endDate)
    return {
      displayStartDate:
        choosenDay.year === displayStartYear && choosenDay.month === displayStartMonth ? displayStartDate : 1,
      displayEndDate: choosenDay.year === displayEndYear && choosenDay.month === displayEndMonth ? displayEndDate : 31
    }
  }, [startDate, endDate, displayStartYear, displayEndYear, choosenDay, displayStartMonth, displayEndMonth])

  const displayDate = useMemo(() => {
    const month = String(choosenDay.month).padStart(2, '0')
    const date = String(choosenDay.date).padStart(2, '0')
    return `${choosenDay.year}-${month}-${date}`
  }, [choosenDay])


  useEffect(() => {
    startMode && setMode(startMode)
  }, [])
  useEffect(() => {
    if (!value) return
    const [year, month, date] = value.split('-').map(v => +v)
    if (choosenDay.year === year && choosenDay.month === month && choosenDay.date === date) return;
    setChoosenDay({ year, month, date })
  }, [value])
  useEffect(() => {
    if (typeof onChange === 'function') onChange(displayDate)
  }, [displayDate, onChange])

  function changeYear(v: number, mode?: boolean) {
    setChoosenDay((pre) => ({ ...pre, year: Math.min(Math.max(displayStartYear, v), displayEndYear) }))
    if (mode) setMode('month')
  }
  function changeMonth(v: number) {
    if (v === 0) {
      if (choosenDay.year - 1 < displayStartYear) {
        return
      }
      setChoosenDay((pre) => ({ ...pre, year: pre.year - 1, month: 12 }))
      return
    } else if (v === 13) {
      if (choosenDay.year + 1 > displayEndYear) {
        return
      }
      setChoosenDay((pre) => ({ ...pre, year: pre.year + 1, month: 1 }))
    } else {
      setChoosenDay((pre) => ({ ...pre, month: Math.min(Math.max(displayStartMonth, v), displayEndMonth) }))
    }
    setMode('date')
  }
  function changeDate(v: number) {
    setChoosenDay((pre) => ({ ...pre, date: Math.min(Math.max(displayStartDate, v), displayEndDate) }))
  }


  return (
    <div className="h-min border-medium border-divider p-4 rounded-medium flex flex-col gap-4 transition-size">
      {mode === 'year' && <YearCalander startYear={displayStartYear} year={choosenDay.year} endYear={displayEndYear} onChange={(v) => changeYear(v, true)} />}
      {mode === 'month' && [
        <div key='month-top' className="flex gap-2 justify-center content-center">
          <Button isIconOnly radius='full' onClick={() => changeYear(choosenDay.year - 1)}> - </Button>
          <Button className='font-bold' onClick={() => setMode('year')}>{choosenDay.year}</Button>
          <Button isIconOnly radius='full' onClick={() => changeYear(choosenDay.year + 1)}> + </Button>
        </div>,
        <MonthCalander key="month-picker" startMonth={displayStartMonth} month={choosenDay.month} endMonth={displayEndMonth} onChange={changeMonth} />
      ]}
      {mode === 'date' && [
        <div key='date-top' className="flex gap-2 justify-center content-center">
          <Button isIconOnly radius='full' onClick={() => changeMonth(choosenDay.month - 1)}> - </Button>
          <Button className='font-bold' onClick={() => setMode('month')}>{`${choosenDay.year} - ${String(choosenDay.month).padStart(2, '0')}`}</Button>
          <Button isIconOnly radius='full' onClick={() => changeMonth(choosenDay.month + 1)}> + </Button>
        </div>,
        <DateCalander key="date-picker" year={choosenDay.year} month={choosenDay.month} startDate={displayStartDate} date={choosenDay.date} endDate={displayEndDate} onChange={changeDate} />
      ]}
    </div>
  );
}
