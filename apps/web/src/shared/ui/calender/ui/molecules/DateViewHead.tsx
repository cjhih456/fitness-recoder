import type { DateViewHeadProps } from '../types';
import { Button } from '@heroui/react';
import { DateService } from '@shared/lib/dateService';

export default function DateViewHead({
  value,
  onChange,
  onModeChange,
  dateRange,
  prevMode = 'month'
}: DateViewHeadProps) {
  const beforeMonthNum = DateService.dateToNumber({ ...value, month: value.month - 1 })
  const beforeMonthValue = DateService.dateNumberToDateValue(beforeMonthNum)

  const nextMonthNum = DateService.dateToNumber({ ...value, month: value.month + 1 })
  const nextMonthValue = DateService.dateNumberToDateValue(nextMonthNum)

  return <div key='date-top' className="flex gap-2 justify-center content-center">
    <Button isIconOnly radius='full' disabled={!DateService.isMonthInRange(beforeMonthValue, dateRange)} onPress={() => onChange(beforeMonthValue)}> - </Button>
    <Button className='font-bold' onPress={() => onModeChange && onModeChange(prevMode)}>
      {`${value.year} - ${String(value.month).padStart(2, '0')}`}
    </Button>
    <Button isIconOnly radius='full' disabled={!DateService.isMonthInRange(beforeMonthValue, dateRange)} onPress={() => onChange(nextMonthValue)}> + </Button>
  </div>
}