import type { DateButtonProps } from '../types';
import { Button } from '@heroui/react';
import { calenderColor } from '@entities/Calender/lib/color';
import DateService from '@entities/Calender/model/DateService';

export default function DateButton({
  value,
  display,
  dateRange,
  onChange,
  statesByDate = []
}: DateButtonProps) {
  const colorClass = calenderColor(DateService.isEqual(display, value), statesByDate)
  const inRange = DateService.isDateInRange(display, dateRange)
  return <Button
    isDisabled={!inRange}
    variant='bordered'
    onPress={() => onChange(display)}
    className={['flex-1 px-0 min-w-[40px]', colorClass].join(' ')}
    radius='full'
  >
    {display.date}
  </Button>
}