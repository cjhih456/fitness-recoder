import type { MonthViewHeadProps } from '../types';
import { Button } from '@heroui/react';
import { DateService } from '@shared/lib/dateService';

export default function MonthViewHead({
  value,
  onChange,
  onModeChange,
  dateRange,
  prevMode = 'year'
}: MonthViewHeadProps) {
  const todayValue = DateService.parseDateString(value)

  const beforeYearNum = DateService.dateToNumber({ ...todayValue, year: todayValue.year - 1 })
  const beforeYear = DateService.dateNumberToDateValue(beforeYearNum)

  const nextYearNum = DateService.dateToNumber({ ...todayValue, year: todayValue.year + 1 })
  const nextYear = DateService.dateNumberToDateValue(nextYearNum)

  return <div key='month-top' className="flex gap-2 justify-center content-center">
    <Button isIconOnly radius='full' disabled={!DateService.isYearInRange(beforeYear, dateRange)} onPress={() => onChange(beforeYear)}> - </Button>
    <Button className='font-bold' onPress={() => onModeChange && onModeChange(prevMode)}>{todayValue.year}</Button>
    <Button isIconOnly radius='full' disabled={!DateService.isYearInRange(nextYear, dateRange)} onPress={() => onChange(nextYear)}> + </Button>
  </div>
}